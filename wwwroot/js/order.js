$(function () {
  getOrders()
 function getOrders() {
    $.getJSON({
      url: `../../api/order`,
      success: function (response, textStatus, jqXhr) {
        console.log(response);
        $('#orders').html("");
        var late = $('#LateOrders').prop('checked') ? "late" : "";
        var nextFutrue = $('#NextFutureOrders').prop('checked') ? "nextFuture" : "";
        var allFutrue = $('#AllFutureOrders').prop('checked') ? "allFuture" : "";
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
          : requiredDate > start
          ?" class='allUpcomingOrder'"
          : "";
          var item = `<li  class="list-group-item">
        <h3>${"Order ID: " + response[i].orderId} </h3>
       <p ${css}>${"Required Date:  " + requiredDate.toDateString()}</p>
       <p>${"Ordered Date:  " + orderedDate.toDateString()}</p>
        </li>`;
          
        // var test = late;
        // late === "" && nextFutrue === "" && allFutrue === ""
        // ?  $('#orders').append(item) 
        // : late === "late"
        // ? $('#orders').append(item)
        // : nextFutrue === "nextFuture"
        // ? $('#orders').append(item)
        // : allFutrue === "allFuture"
        // ? $('#orders').append(item)
        // : ""; 

        if (late === "" && nextFutrue === "" && allFutrue === "") {
          $('#orders').append(item);
        } else if (late === "late" && css=== " class='lateOrder'") {
          $('#orders').append(item) ;
        } else if (nextFutrue === "nextFuture" && css=== " class='upcomingOrder'") {
          $('#orders').append(item) ;
        } else if (allFutrue === "allFuture" && css=== " class='allUpcomingOrder'") {
          $('#orders').append(item) ;
        } else {
        ;
        }
        }
        
       
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log("The following error occured: " + textStatus, errorThrown);
      }
    });
  }

  $('#LateOrders').on('change', function(){
    getOrders();
  });

  $('#NextFutureOrders').on('change', function(){
    getOrders();
  });

  $('#AllFutureOrders').on('change', function(){
    getOrders();
  });

});
