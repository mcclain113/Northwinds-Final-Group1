$(function () {
  getOrders()
  function getOrders() {
    $.getJSON({
      url: `../../api/order`,
      success: function (response, textStatus, jqXhr) {
        console.log(response);
        $('#orders').html("");
        for (var i = 0; i < response.length; i++) {
        var item = `<li class="list-group-item">
        <h3>${"Order ID: " + response[i].orderId} </h3>
        <p>${"Required Date:  " + response[i].requiredDate} </p>
        <p>${"Ordered Date:  " + response[i].orderDate}</p>
        
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
