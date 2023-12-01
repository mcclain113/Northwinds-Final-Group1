$(function () {
    getOrders()
    function getOrders() {
      $.getJSON({
        url: `../../api/order`,
        success: function (response, textStatus, jqXhr) {
          console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // log the error to the console
          console.log("The following error occured: " + textStatus, errorThrown);
        }
      });
    }
});
