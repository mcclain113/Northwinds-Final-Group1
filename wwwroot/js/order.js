$(function () {
  getOrders()
  function getOrders() {
    $.getJSON({
      url: `../../api/order`,
      success: function (response, textStatus, jqXhr) {
        console.log(response);
        $('#order_rows').html("");
        for (var i = 0; i < response.length; i++) {
        var row = `<tr>
        <td>${response[i].OrderId}</td>
        </tr>`;
          
          $('#order_rows').append(row);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // log the error to the console
        console.log("The following error occured: " + textStatus, errorThrown);
      }
    });
  }
});
