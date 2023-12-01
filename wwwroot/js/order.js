$(function () {
  getOrders()
  function getOrders() {
    $.getJSON({
      url: `../../api/order`,
      success: function (response, textStatus, jqXhr) {
        console.log(response);
        $('#orders').html("");
        for (var i = 0; i < response.length; i++) {
          var requiredDate = new Date(response[i].requiredDate);
          var orderedDate = new Date(response[i].orderDate);
          let requiredDateNum = requiredDate.valueOf();
          let start = Date.now();
          let sevenDaysFromNow = start + 604800000;
          var css = requiredDateNum < start 
          ? " class='lateOrder'" 
          : requiredDate > start && requiredDate < sevenDaysFromNow
          ?" class='upcomingOrder'"
          : "";
          var item = `<li  class="list-group-item">
        <h3>${"Order ID: " + response[i].orderId} </h3>
       <p ${css}>${"Required Date:  " + requiredDate.toDateString()}</p>
       <p>${"Ordered Date:  " + orderedDate.toDateString()}</p>
        </li>`;
          
          $('#orders').append(item);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log("The following error occured: " + textStatus, errorThrown);
      }
    });
  }
});
