$(function () {
    getProducts()
    function getProducts() {
      var discontinued = $('#Discontinued').prop('checked') ? "" : "/discontinued/false";
      $.getJSON({
        url: `../../api/category/${$('#product_rows').data('id')}/product` + discontinued,
        success: function (response, textStatus, jqXhr) {
          $('#product_rows').html("");
            for (var i = 0; i < response.length; i++){
              var css = response[i].discontinued ? " class='discontinued'" : "";
              var row = `<tr${css} data-id="${response[i].productId}" data-name="${response[i].productName}" data-price="${response[i].unitPrice}">
                <td>${response[i].productName}</td>
                <td class="text-right">${response[i].unitPrice.toFixed(2)}</td>
                <td class="text-right">${response[i].unitsInStock}</td>
              </tr>`;
              $('#product_rows').append(row);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // log the error to the console
          console.log("The following error occured: " + textStatus, errorThrown);
        }
      });
    }
    $('#CategoryId').on('change', function(){
      $('#product_rows').data('id', $(this).val());
      getProducts();
    });
    $('#Discontinued').on('change', function(){
      getProducts();
    });
});
