$(document).ready( function () {
	$('#account').css('display','none');
	console.log('ready');
});
	$('#login_button').click( function (){
		loginRequest();
	});
	$('#register_button').click( function (){
		registerRequest();
	});
    $('#sbmincart-submit').click( function(){
        cartRequest();
    });
    $('#add-button').click( function(){
        addRequest();
    });
    $('#del-button').click( function(){
        delRequest();
    });
    $('#edit-button').click( function(){
        editRequest();
    });

function loginRequest() {
	var username = $('#login_username').val();
	var password = $('#login_password').val();
	if(!username || !password) return;
	$.post("https://fe.craftandharvest.com/rest-auth/login/",
    {
        'username': username,
        'password': password
    },
    function(result){
        $('#login').css('display','none');
        $('#account').css('display','inline');
        window.location.replace('shop.html');

    });
}

function registerRequest() {
	var username = $('#register_username').val();
	var email = $('#register_email').val();
	var password1 = $('#register_password1').val();
	var password2 = $('#register_password2').val();
	if(!username || !password || !password1 || !password2) return;
	$.post("https://be.craftandharvest.com/rest-auth/registeration/",
    {
        'username': username,
        'email': email,
        'password1':password1,
        'password2': password2
    },
    function(result){
    	$('#login').css('display','none');
    	$('#account').css('display','inline');
    	window.location.replace('shop.html');
    });
}

function cartRequest() {
    var date = new Date();
    var creation_date = date.format('YYYY-MM-DDThh:mm');
    var check_out = true;
    $.post("http://fe.craftandharvest.com/carts/?format=api",
    {
        'date':date,
        'check_out':check_out
    },
    function(result){
        window.location.replace('checkout.html');
    });
}

function addRequest() {
    var name = $('#name').val();
    var description = $('#description').val();
    var image = $('#image').val();
    var price = $('#price').val();
    var sku = $('#sku').val();
    var product_tag = $('#product_tag').val();
    $.post("http://be.craftandharvest.com/products/?format=api",
    {
        'name':name,
        'description':description,
        'image':image,
        'price':price,
        'sku':sku,
        'product_tag':product_tag
    },
    function(result){
        window.location.replace('admin.html');
    });
}

function delRequest() {
    var name = $('#name').val();
    var description = $('#description').val();
    var image = $('#image').val();
    var price = $('#price').val();
    var sku = $('#sku').val();
    var product_tag = $('#product_tag').val();
    $.post("http://be.craftandharvest.com/products/?format=api",
    {
        'name':name,
        'description':description,
        'image':image,
        'price':price,
        'sku':sku,
        'product_tag':product_tag
    },
    function(result){
        window.location.replace('admin.html');
    });
}

function editRequest() {
    var name = $('#name').val();
    var description = $('#description').val();
    var image = $('#image').val();
    var price = $('#price').val();
    var sku = $('#sku').val();
    var product_tag = $('#product_tag').val();
    $.post("http://be.craftandharvest.com/products/?format=api",
    {
        'name':name,
        'description':description,
        'image':image,
        'price':price,
        'sku':sku,
        'product_tag':product_tag
    },
    function(result){
        window.location.replace('admin.html');
    });
}












