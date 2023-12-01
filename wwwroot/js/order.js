$(function () {
  getOrders()
  function getOrders() {
    $.getJSON({
      url: `../../api/order`,
      success: function (response, textStatus, jqXhr) {
        console.log(response);
        $('#orders').html("");
        for (var i = 0; i < response.length; i++) {
          var item = `<li>
          ${response[i].orderId}
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
