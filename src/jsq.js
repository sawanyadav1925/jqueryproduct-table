var lst = [];
var dict = {};
$(function () {
  $(document).on("click", ".close", function () {
    $(this).parent("div").hide();
  });
  $(document).on("click", ".devare", function () {
    var sku = $(this).parent("td").siblings("#sku").html();
    del(sku);
  });
  $(document).on("click", ".edit", function () {
    $("#product_sku").val($(this).parent("td").siblings("#sku").html());
    $("#product_name").val($(this).parent("td").siblings("#name").html());
    $("#product_price").val($(this).parent("td").siblings("#price").html());
    $("#product_quantity").val($(this).parent("td").siblings("#qty").html());
    $("#product_sku").prop("readonly", true);
    var sku = $(this).parent("td").siblings("#sku").html();
    $("#add_product").val("Update");
    del(sku);
  });
  $("#add_product").click(function (){
    var prod = {};
    if (!$("#product_sku").val()){
      error("fill the SKU field!! ");
    } 
    else if(!$("#product_name").val()){
      error("fill the name field!!");
    } 
    else if(isNaN(parseFloat($("#product_sku").val()))){
      error("SKU should be a number so enter valid number");
    } 
    else if(!isNaN(parseFloat($("#product_name").val()))){
      error("Name should be string!!!");
    } 
    else {
      prod.sku = $("#product_sku").val();
      prod.name = $("#product_name").val();
      prod.qty = $("#product_quantity").val();
      prod.price = $("#product_price").val();
     checkunique(prod);
      $("#product_sku").val("");
      $("#product_name").val("");
      $("#product_quantity").val("");
      $("#product_price").val("");
      $("#product_sku").prop("readonly", false);
      success();
    }
  });
  $(".error").hide();
  $(".success").hide();
});
function checkunique(p) {
  if (lst.length < 1){
    success();
    lst.push(p);
    display();
    return true;
  }
  for (var i of lst){
    if (i.sku == p.sku){
      error("SKU duplicate");
      return false;
    }
  }
  lst.push(p);
  success();
  display();
  return true;
}
function display(){
  $("#table_body").html("");
  for (i of lst) {
    var prodStr = `<tr><td id="sku">${i.sku}</td><td id="name">${i.name}</td><td id="price">${i.price}</td><td id="qty">${i.qty}</td><td><a href="#" class="edit">Edit </a> <a href="#" class="devare">Delete</a></td></tr>`;
    $("#table_body").html($("#table_body").html() + prodStr);
  }
}
function del(id){
  temp = [];
  for (var i = 0; i < lst.length; i++){
    if (lst[i]["sku"] != id) {
      temp.push(lst[i]);
    }
    else {
      dict = lst[i];
    }
  }
  lst = temp;
  display();
}
function error(str) {
  $(".error").html(`${str}.<a href="#" class="close">X</a>`);
  $(".error").show();
  $(".success").hide();
  if (!$.isEmptyObject(dict)) {
    $("#product_sku").val("");
    $("#product_name").val("");
    $("#product_price").val("");
    $("#product_qty").val("");
    lst.push(dict);
    display();
  }
}
function success() {
  $("#add_product").val("Add Product");
  $(".error").hide();
  $(".success").show();
}