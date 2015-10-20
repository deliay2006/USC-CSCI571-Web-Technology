// var xmlhttp = new XMLHttpRequest();
var categoryListData;
var productListData;
var cartListData;
var orderListData;

function login() {
    $("#loading").show();
    if(validate()) {
        $.post("/CodeIgniter/index.php/CustomerLogin/login", $("#loginForm").serializeArray(), handleLoginReady);
    }
}

function validate() {
    var un = $("#username").val();
    var pw = $("#password").val();
    
    if(!un || un.trim() == "" || !pw || pw.trim() == "") {
        updateMsg("Invalid Login.");
        return false;
    } else {
        updateMsg("");
        return true;
    }
}

function logout() {
    $.post("/CodeIgniter/index.php/CustomerLogin/logout", handleLogoutReady);
}

var handleLogoutReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        window.location.assign("http://cs-server.usc.edu:10211/CodeIgniter/index.php/CustomerLogin/showLogin");
    }
}

function signUp() {
    window.location.assign("http://cs-server.usc.edu:10211/CodeIgniter/index.php/AddProfile");
}

function orderPageReady(reload) {
    if(reload) {
        $("#listOrders").show();
        $("#viewOrder").hide();
        $("#viewOrderButton").show();
        $("#orderListButton").hide();
    }
    $.post("/CodeIgniter/index.php/ListOrders/listOrders", handleListOrdersReady);
}

function editProfilePageReady() {
    $.post("/CodeIgniter/index.php/EditProfile/editProfile", $("#addProfileForm").serializeArray(), handleEditProfilePageReady);
}

var checkPermissions = function(msg) {
        if(msg == "TIMEOUT") {
            var r= confirm("Session timout, please login again.");
            if(r) {
                window.location.assign("http://cs-server.usc.edu:10211/CodeIgniter/index.php/CustomerLogin");
            }
        } else if(msg == "NOPERMISSION") {
            var r=confirm("You do not have permission to do this operation, please login with another account.");
            if(r) {
                window.location.assign("http://cs-server.usc.edu:10211/CodeIgniter/index.php/CustomerLogin");
            }
        } 
}

var handleLoginReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success"){
        var result = responseTxt;
        $("#loading").hide();
        if(result == "Invalid Login" ) {
            updateMsg(result);
            return;
        }
        var loginInfo = JSON.parse(result);
        if(loginInfo["USERTYPE"] == 2) {
            window.location.assign("http://cs-server.usc.edu:10211/CodeIgniter/index.php/ViewOrdersReport");
        } else if(loginInfo["USERTYPE"] == 4) {
            window.location.assign("http://cs-server.usc.edu:10211/CodeIgniter/index.php/ShopProducts");
        } else {
            updateMsg("Invalid Login");
        }
    }
}

function validateOrder() {
    return true;
}

function validateAddProfile() {
    var un = $("#username").val();
    var pw = $("#password").val();
    if(!un || un.trim() == "") {
       updateMsg("Username cannot be empty.");
       return false;
    } else if(!pw || pw.trim() == "") {
        updateMsg("Password cannot be empty.");
        return false;
    }
    var age = document.getElementById("age");
    if(!age.checkValidity()) {
        updateMsg("Invalid age.");
        return false;
    }

    var card = $("#creditCard").val();
    var code = $("#securityNo").val();
    if(card && card.trim() !="") {
        if(!Number.isInteger(card-0) || card.length !=16) {
            updateMsg("Invalid Credit Card Number.");
            return false;
        }
    } else if(code && code.trim() !="") {
        updateMsg("Please inupt the credit card number.");
        return false;
    }

    if(card && card.trim() !="") {
        if(code && code.trim() !="") {
            if(!Number.isInteger(code-0) || code.length != 3) {
                updateMsg("Invalid Security Code.");
                return false;
            }
        } else {
            updateMsg("Please inupt the security code for your credit card.");
            return false;
        }
    }

    return true;
}

function clearProfileFields() {

}

function clearCategoryFields() {
    $("#categoryName").val("");
    $("#desc").val("");
}

function clearProductFields() {
    $("#productName").val("");
    $("#desc").val("");
    $("#price").val("");
    $("#productId").val("");
    $("#fileToUpload").val("");
    document.getElementById("categorySelect").options[0].selected = true;
}

function addOrder() {
    if(validateOrder()) {
        $.post("/CodeIgniter/index.php/AddOrder", handleAddOrderReady);
    }
}

function addProfile() {
    if(validateAddProfile()) {
        $.post("/CodeIgniter/index.php/AddProfile/addProfile", $("#addProfileForm").serializeArray(), handleAddProfileReady);
    }
}

function updateProfile() {
    if(validateAddProfile()) {
        $.post("/CodeIgniter/index.php/AddProfile/updateProfile", $("#addProfileForm").serializeArray(), handleUpdateProfileReady);
    }
}

function handleAddOrderReady(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        if(responseTxt == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            checkPermissions(responseTxt);
            updateInfoMsg("");
            updateMsg(responseTxt);
        }
    }
}

function handleAddProfileReady(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        if(responseTxt == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
            clearProfileFields();
        } else {
            checkPermissions(responseTxt);
            updateInfoMsg("");
            updateMsg(responseTxt);
        }
    }
}

function handleUpdateProfileReady(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        if(responseTxt == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            checkPermissions(responseTxt);
            updateInfoMsg("");
            updateMsg(responseTxt);
        }
    }
}

var handleEditProfilePageReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        checkPermissions(responseTxt);
        if(responseTxt == "Database Issue") {
            updateInfoMsg("");
            updateMsg(responseTxt);
        } else {
            var data = JSON.parse(responseTxt);
            $("#userId").val(decodeURIComponent(data["USERID"]));
            $("#username").val(decodeURIComponent(data["USERNAME"]));
            $("#password").val(decodeURIComponent(data["PASSWORD"]));
            $("#firstname").val(decodeURIComponent(data["FIRSTNAME"]));
            $("#lastname").val(decodeURIComponent(data["LASTNAME"]));
            $("#age").val(decodeURIComponent(data["AGE"]));
            if(data["GENDER"] == "1" || data["GENDER"] == 1) {
                document.getElementById("male").checked = true;
            } else {
                document.getElementById("female").checked = true;
            }
            $("#creditCard").val(decodeURIComponent(data["CARDNO"]));
            $("#securityNo").val(decodeURIComponent(data["SECURITYCODE"]));
            $("#month").val(decodeURIComponent(data["EXPIREMONTH"]));
            $("#year").val(decodeURIComponent(data["EXPIREYEAR"]));
            $("#address").val(decodeURIComponent(data["ADDRESS"]));
            $("#bAddress").val(decodeURIComponent(data["BILLINGADDR"]));
        }
    }
}

function viewOrder() {
    var selectedItem = $("input:radio[name=orderListRadio]:checked").val();
    $.post("/CodeIgniter/index.php/ViewOrder/index/"+selectedItem,handleViewOrderReady);
}

function handleViewOrderReady(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        var page = document.getElementById("listOrders");
        page.style.display = "none";
        page = document.getElementById("viewOrder");
        page.style.display = "block";
        $("#viewOrderButton").hide();
        $("#orderListButton").show();

        checkPermissions(responseTxt);

        var list = JSON.parse(responseTxt);//JSON.parse
        var listSelect = document.getElementById("viewOrder");
        listSelect.innerHTML = "";
        var html="";
        if(!responseTxt || responseTxt == "" || responseTxt.length < 1) {
            html = "Nothing in your shopping cart.";
        }
        for(var i in list) {
            var data = list[i];
            var orderDate = decodeURIComponent(data["ORDERDATE"]);
            var name = decodeURIComponent(data["PRODUCTNAME"]);
            var desc = decodeURIComponent(data["PRODUCTDESC"]);
            var price = decodeURIComponent(data["PRICE"]);
            var productId = decodeURIComponent(data["PRODUCTID"]);
            var quantity = decodeURIComponent(data["QUANTITY"]);
            // cartListData[productId] = data;
            html = html + '<div class="shopProduct"><div id="'
                            +productId+'"><div class="nameField"><div style="font-size:20px;">'
                            +name
                            +'</div><div style="font-size:12px;">'+desc
                            +'</div></div><div class="price">$'+price
                            +'</div></div><label style="float: left;margin-left: 20px;">Quantity: '+quantity
                            +'</label></div>';
        }
        listSelect.innerHTML = html;
    }
}

function updateInfoMsg(msg){
    $("#infoMsg").html(msg);
    window.scroll(0,findPos(document.getElementById("pageContainer")));
}

function updateMsg(msg){
    $("#errorMsg").html(msg);
    window.scroll(0,findPos(document.getElementById("pageContainer")));
}

function orderReportsPageReady() {
    $.post("/CodeIgniter/index.php/ListCategories", handleListCategoryReadyForSelect);
}

function shopProductsPageReady() {
    $.post("/CodeIgniter/index.php/ShopProducts/listProducts", handleShopProductsReady);
}

function cartPageReady() {
    $.post("/CodeIgniter/index.php/ListCart/listCart", handleListCartReady);
}

var handleListOrdersReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        $("#loading").hide();
        checkPermissions(responseTxt);
        var list = JSON.parse(responseTxt);//JSON.parse
        
        $("#listOrders").html("");
        $("#listOrders").show();
        orderListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var orderId = data["ORDERID"];
            orderListData[orderId] = data;
            var ele = '<p>';
            var name = "Order at: "+data["ORDERDATE"];
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele += '<input type="radio" name="orderListRadio" value="'
                    +orderId+'"'+checked+'/><label>'+name+'</label></p>';
            $("#listOrders").append(ele);
        }
    }
}

var handleListCategoryReadyForSelect = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        checkPermissions(responseTxt);

        var list = JSON.parse(responseTxt);//JSON.parse
        var listSelect = document.getElementById("categorySelect");
        categorySelect.innerHTML = "";
        categoryListData = {};

        var ele = document.createElement('option');
        ele.text = "Select a Category";
        ele.value = "";
        ele.selected = true;
        listSelect.add(ele);

        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('option');
            var name = decodeURIComponent(data["CATEGORYNAME"]);
            var categoryId = data["CATEGORYID"];
            categoryListData[categoryId] = data;
            ele.text = name;
            ele.value = categoryId;
            listSelect.add(ele);
        }
    }
}

var handleListCartReady = function (responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        $("#loading").html("");
        checkPermissions(responseTxt);

        var list = JSON.parse(responseTxt);//JSON.parse
        var listSelect = document.getElementById("shopProducts");
        listSelect.innerHTML = "";
        cartListData = {};
        var html="";
        if(!list || list == "") {
            html = "Nothing in your shopping cart.";
        }
        for(var i in list) {
            var data = list[i];
            if(!data) {
                continue;
            }
            var name = decodeURIComponent(data["productName"]);
            var desc = decodeURIComponent(data["productDesc"]);
            var price = decodeURIComponent(data["price"]);
            var productId = decodeURIComponent(data["productId"]);
            var quantity = decodeURIComponent(data["quantity"]);
            cartListData[productId] = data;
            html = html + '<div class="shopProduct" id="'+productId+
                            '"><div><div class="nameField"><div style="font-size:20px;">'
                            +name
                            +'</div><div style="font-size:12px;">'+desc
                            +'</div></div><div class="price">$'+price
                            +'</div></div><input id="QUT'+productId+'" class="qtyInput" type="number" min="1" max="100" value="'+quantity
                            +'"/><input type="button" onClick="updateQuantity('+productId
                            +')" value="Update Quantity" class="shopButton"/><input type="button" class="shopButton" onClick="removeItemFromCart('+productId
                            +')" value="Remove"/></div>';
        }
        listSelect.innerHTML = html;
    }
}

function updateQuantity(productId) {
    var quantity = encodeURIComponent($("#QUT"+productId).val());
    productId = encodeURIComponent(productId);
    $.post("/CodeIgniter/index.php/ListCart/updateQuantityInCart/"+productId+'/'+quantity, handleupdateQuantityInCartReady);
}

var removeItemFromCart = function(productId) {
    productId = encodeURIComponent(productId);
    $.post("/CodeIgniter/index.php/ListCart/removeItemFromCart/"+productId, handleRemoveItemFromCartReady);

}

function clearShoppingCart() {
    $.post("/CodeIgniter/index.php/ListCart/clearShoppingCart", handleClearShoppingCartReady);
}

var handleClearShoppingCartReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        $("#loading").html("");
        checkPermissions(responseTxt);
        if(responseTxt == "success") {
            updateInfoMsg("All items in shopping cart has been deleted.");
            $("#shopProducts").html("");
            updateMsg("");
        } else {
            updateInfoMsg("");
            updateMsg(responseTxt);
        }
    }
}

var handleupdateQuantityInCartReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        $("#loading").html("");
        checkPermissions(responseTxt);
        if(responseTxt == "success") {
            updateInfoMsg("The quantity has been successfully updated.");
            updateMsg("");
        } else {
            updateInfoMsg("");
            updateMsg(responseTxt);
        }
    }
}

var handleRemoveItemFromCartReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        $("#loading").html("");
        checkPermissions(responseTxt);

        // result = JSON.parse(result);
        // if(result == "success") {
            updateInfoMsg("The product has been successfully removed from your shopping cart.");
            document.getElementById($("#productId").val()).innerHTML = "";
            // $("#"+$("#productId").val()).html("");
            updateMsg("");
        // } else {
        //     updateInfoMsg("");
        //     updateMsg(result);
        // }
    }
}

var handleSelectShopCategoryReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        $("#loading").html("");
        checkPermissions(responseTxt);

        var result = JSON.parse(responseTxt);//JSON.parse
        var list = result[0];
        listSelect = document.getElementById("shopProducts");
        listSelect.innerHTML = "";
        productListData = {};
        var html="";
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var name = decodeURIComponent(data["PRODUCTNAME"]);
            var desc = decodeURIComponent(data["PRODUCTDESC"]);
            var price = decodeURIComponent(data["PRICE"]);
            var cat = decodeURIComponent(data["CATEGORYID"]);
            var productId = decodeURIComponent(data["PRODUCTID"]);
            productListData[productId] = data;
            html = html + '<div class="shopProduct"><div id="'
                            +productId+'"><div class="nameField"><div style="font-size:20px;">'
                            +name
                            +'</div><div style="font-size:12px;">'+desc
                            +'</div></div><div class="cateField">'+cat
                            +'</div><div class="price">$'+price
                            +'</div></div><input id="QUT'+productId
                            +'" class="qtyInput" type="number" min="1" max="100" value="1"/><input type="button" class="shopButton" onClick="addItemToCart('+productId
                            +', '+price+', \''+ name+'\', \''+ desc+'\')" value="Add to Shopping Cart"/></div>';
        }
        listSelect.innerHTML = html;
        
        list = result[1];
        var listSelect = document.getElementById("advertisments");
        listSelect.innerHTML = "";
        var html="";
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var name = decodeURIComponent(data["PRODUCTNAME"]);
            var productId = data["PRODUCTID"];
            var salePrice = ((data["PRICE"]-0)*(1-(data["PERCENTAGE"]-0)*0.01)).toFixed(2);
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            html = html + '<label style="display:block;">'+name+' Now in Sale Price$:'+salePrice+'</label>';
        }
        listSelect.innerHTML = html;

    }
}

var handleShopProductsReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        $("#loading").html("");
        checkPermissions(responseTxt);

        var result = JSON.parse(responseTxt);//JSON.parse
        var list = result[0];
        var listSelect = document.getElementById("categorySelect");
        categorySelect.innerHTML = "";
        categoryListData = {};

        var ele = document.createElement('option');
        ele.text = "Select a Category";
        ele.value = "";
        ele.selected = true;

        listSelect.add(ele);
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('option');
            var name = decodeURIComponent(data["CATEGORYNAME"]);
            var categoryId = data["CATEGORYID"];
            categoryListData[categoryId] = data;
            ele.text = name;
            ele.value = categoryId;
            listSelect.add(ele);
        }

        list = result[1];
        listSelect = document.getElementById("shopProducts");
        listSelect.innerHTML = "";
        productListData = {};
        var html="";
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var name = decodeURIComponent(data["PRODUCTNAME"]);
            var desc = decodeURIComponent(data["PRODUCTDESC"]);
            var price = decodeURIComponent(data["PRICE"]);
            var cat = categoryListData[data["CATEGORYID"]]["CATEGORYNAME"];
            var productId = data["PRODUCTID"];
            productListData[productId] = data;
            html = html + '<div class="shopProduct"><div id="'
                            +productId+'"><div class="nameField"><div style="font-size:20px;">'
                            +name
                            +'</div><div style="font-size:12px;">'+desc
                            +'</div></div><div class="cateField">'+cat
                            +'</div><div class="price">$'+price
                            +'</div></div><input id="QUT'+productId
                            +'" class="qtyInput" type="number" min="1" max="100" value="1"/><input type="button" class="shopButton" onClick="addItemToCart('+productId
                            +', '+price+', \''+ name+'\', \''+ desc+'\')" value="Add to Shopping Cart"/></div>';
        }
        listSelect.innerHTML = html;
    }
}

function addItemToCart(productId, price, name, desc) {
    $("#productId").val(encodeURIComponent(productId));
    $("#productName").val(encodeURIComponent(name));
    $("#produceDesc").val(encodeURIComponent(desc));
    $("#price").val(encodeURIComponent(price));
    $("#quantity").val(encodeURIComponent($("#QUT"+productId).val()));
    $.post("/CodeIgniter/index.php/AddToShoppingCart", $("#lForm").serializeArray(), handleAddItemToShoppingCartReady);
}

var handleAddItemToShoppingCartReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        $("#loading").html("");
        // var result = responseTxt;
        checkPermissions(responseTxt);

        result = JSON.parse(responseTxt);
        if(result[0] == "success") {
            updateInfoMsg("The product has been added to your shopping cart.");
            var list = result[1];
            if(list && list.length>0) {
                var str = "Other customer who bought this product, also bought: ";
                for(var i=0; i<list.length; i++) {
                    if(i>0) {
                       str+=", ";
                    }
                    str+=list[i]["PRODUCTNAME"];
                }
                $("#alsoBought").html(str);
            }
            updateMsg("");
        } else {
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

var customerLoginPageReady = function() {
    $.post("/CodeIgniter/index.php/Advertisments", handleCustomerLoginPageReady);
}

function selectShopCategory() {
    var selectedCat = $("#categorySelect option:selected").val();
    if(selectedCat == "") {
        shopProductsPageReady();
        $("#advertisments").html("");
    } else {
        selectedCat = encodeURIComponent(selectedCat);
        $.post("/CodeIgniter/index.php/ShopProducts/listProductsByCategory/"+selectedCat, handleSelectShopCategoryReady);
    }
}

function viewOrderReport(totalSaleOnly) {
    displayOrderSearchResult();
    var startDate = $("#startDate").val();
    if(startDate && startDate.trim() != "") {
        var startDateStr = validateDateStr(startDate.trim());
        if(startDateStr == false) {
            updateMsg("Invalid Start Date.");
            return;
        } else {
            $("#startdate").val(encodeURIComponent(startDateStr));
        }
    } else {
        $("#startdate").val("");
    }

    var endDate = $("#endDate").val();
    if(endDate && endDate.trim() != "") {
        var endDateStr = validateDateStr(endDate.trim());
        if(endDateStr == false) {
            updateMsg("Invalid End Date.");
            return;
        } else if($("#startdate").val() && (endDateStr-$("#startdate").val()) < 0) {
            updateMsg("End date cannot be previous than start date.");
            return;
        } else {
            $("#enddate").val(encodeURIComponent(endDateStr));
        }
    } else {
        $("#enddate").val("");
    }
    if(totalSaleOnly){
        $("#totalSale").val("1");
    } else {
        $("#totalSale").val("0");
    }
    $.post("/CodeIgniter/index.php/ViewOrdersReport/search", $("#orderReportForm").serializeArray(), handleViewOrdersReportReady);
}

function displayOrderSearchResult() {

}

var handleCustomerLoginPageReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        checkPermissions(responseTxt);

        var list = JSON.parse(responseTxt);//JSON.parse
        var listSelect = document.getElementById("advertisments");
        listSelect.innerHTML = "";
        var html="";
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var name = data["PRODUCTNAME"];
            var productId = data["PRODUCTID"];
            var salePrice = ((data["PRICE"]-0)*(1-(data["PERCENTAGE"]-0)*0.01)).toFixed(2);
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            html = html + '<label style="display:block;">'+name+' Now in Sale Price$:'+salePrice+'</label>';
        }
        listSelect.innerHTML = html;
    }
}

var handleViewOrdersReportReady = function(responseTxt, statusTxt, xhr) {
    if(statusTxt == "success") {
        checkPermissions(responseTxt);
        
        var loading = document.getElementById("loadingInSearchResult");
        if(responseTxt == "empty" ) {
            loading.innerHTML = "No result match the search option.";
            return;
        }
        var list = JSON.parse(responseTxt);
        var resultDiv = document.getElementById("searchResultRows");
        if(list.length < 1) {
            resultDiv.innerHTML = "";
            loading.innerHTML = "No result match the search option.";
        } else {
            resultDiv.innerHTML = "";
            var startDate = $("#startDate").val();
            var endDate = $("#endDate").val();
            var groupByColumn = $('input[name=reportGroupRadio]:radio:checked').val();
            var selectByColumn = $('input[name=noGroupRadio]:radio:checked').val();
            var orderByColumn = $('input[name=orderRadio]:radio:checked').val();
            var category = $("#categorySelect option:selected").val();
            var totalSale = $("#totalSale").val();
            
            var header = document.createElement('tr');
            if(totalSale == "1") {
                header.innerHTML = '<th>Total Sale</th>';
            } else {
                var headerStr = "";
                if(groupByColumn == "productCategory") {
                    headerStr = '<th>Category Id</th><th>Category Name</th>';
                } else if(groupByColumn == "sales") {
                    headerStr = '<th>Sale Id</th><th>Sale Name</th>';
                } else {
                    headerStr = '<th>Product Id</th><th>Product Name</th>';
                }
                
                if(category>0 && groupByColumn != "productCategory") {
                    headerStr += '<th>Category</th>';
                }
                if(selectByColumn == "price") {
                    headerStr += '<th>Sales in $</th>';
                } else {
                    headerStr += '<th>Total Quantity</th>';
                }
                
                headerStr += '<th>Order Id</th><th>Order Date</th>';

                if(groupByColumn != "productCategory") {
                    headerStr += '<th>Price $</th>';
                    if(groupByColumn == "sales") {
                        headerStr += '<th>Percentage %</th>';
                    }
                }
                
                header.innerHTML = headerStr;
            }
            
            resultDiv.appendChild(header);

            var totalSaleNum = 0;
            for(var i=0; i<list.length; i++) {
                var row = document.createElement('tr');
                var item = list[i];
                if(totalSale == "1") {
                    totalSaleNum = item["TOTALSALE"]-0+totalSaleNum;
                } else {
                    var idStr = "";
                    if(groupByColumn == "productCategory") {
                        idStr = '<td>'+item["CATEGORYID"]+'</td>';
                    } else if(groupByColumn == "sales") {
                        idStr = '<td>'+item["SALESID"]+'</td>'
                    } else {
                        idStr = '<td>'+item["PRODUCTID"]+'</td>';
                    }

                    var categoryStr = "";
                    if(category>0 || groupByColumn == "productCategory") {
                        categoryStr = '<td>'+item["CATEGORYNAME"]+'</td>';
                    } else if(groupByColumn == "sales") {
                        categoryStr = '<td>'+item["SALENAME"]+'</td>';
                    } else {
                        categoryStr = '<td>'+item["PRODUCTNAME"]+'</td>';
                    }

                    var priceStr = "";
                    if(groupByColumn != "productCategory") {
                        priceStr = '<td>'+item["PRICE"]+'</td>';
                        if(groupByColumn == "sales") {
                            priceStr += '<td>'+item["PERCENTAGE"]+'</td>';
                        }
                    }
                    row.innerHTML = idStr + categoryStr
                                + '<td>'+item["SUMQTY"]+'</td>'
                                + '<td>'+item["ORDERID"]+'</td>'
                                + '<td>'+item["ORDERDATE"]+'</td>'
                                + priceStr;
                    resultDiv.appendChild(row);
                }
            }
            if(totalSale == "1") {
                var row = document.createElement('tr');
                row.innerHTML = '<td style="text-align:center;">'+totalSaleNum+'</td>';
                resultDiv.appendChild(row);
            }
            loading.innerHTML = "";
            window.scroll(0,findPos(resultDiv));
        }
    }
}

function validateDateStr(dateStr) {
    var dates = dateStr.split('-');
    var date = new Date();
    date.setDate(dates[1]);
    date.setMonth(dates[0]-1);
    date.setFullYear(dates[2]);
    date.setHours(0);
    date.setMinutes(0);

    if(!(date.getFullYear() == dates[2] && date.getMonth() == dates[0]-1 && date.getDate() == dates[1])) {
        return false;
    }
    return date.getTime();
}