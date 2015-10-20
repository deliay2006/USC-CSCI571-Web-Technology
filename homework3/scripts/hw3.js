var xmlhttp = new XMLHttpRequest();
var employeeListData;
var categoryListData;
var productListData;
var saleListData;
var cartListData;
var orderListData;

function login(isCustomer) {
    var loading = document.getElementById("loading");
    loading.style.display = "block";
    if(validate()) {
        xmlhttp.onreadystatechange = handleLoginReady;
        if(isCustomer) {
            xmlhttp.open("POST", "/customerLogin.php", true);
        } else {
            xmlhttp.open("POST", "/login.php", true);
        }
        
        xmlhttp.send(new FormData(document.forms["loginForm"]));
    }
}

function logout() {
    xmlhttp.onreadystatechange = handleLogoutReady;
    xmlhttp.open("GET", "/pages/logout.php", true);
    xmlhttp.send();
}

function signUp() {
    window.location.assign("http://cs-server.usc.edu:10211/pages/profiles.html");
}

function addProfilePageReady() {
    window.location.assign("http://cs-server.usc.edu:10211/pages/profiles.html");
}

function orderPageReady(reload) {
    if(reload) {
        var page = document.getElementById("listOrders");
        page.style.display = "block";
        page = document.getElementById("viewOrder");
        page.style.display = "none";
        $("#viewOrderButton").show();
        $("#orderListButton").hide();
    }
    xmlhttp.open("GET", "/pages/listOrders.php", true);
    xmlhttp.onreadystatechange = handleListOrdersReady;
    xmlhttp.send();
}

function editProfilePageReady() {
    xmlhttp.onreadystatechange = handleEditProfilePageReady;
    xmlhttp.open("POST", "/pages/editProfile.php", true);
    xmlhttp.send(new FormData(document.forms["addProfileForm"]));
}

var checkPermissions = function(msg) {
        if(msg == "TIMEOUT") {
            var r= confirm("Session timout, please login again.");
            if(r) {
                window.location.assign("http://cs-server.usc.edu:10211/login.html");
            }
        } else if(msg == "NOPERMISSION") {
            var r=confirm("You do not have permission to do this operation, please login with another account.");
            if(r) {
                window.location.assign("http://cs-server.usc.edu:10211/login.html");
            }
        } 
}

var handleLogoutReady = function() {
    if(xmlhttp.readyState == 4) {
        window.location.assign("http://cs-server.usc.edu:10211/customerLogin.html");
    }
}

var handleLoginReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        var loading = document.getElementById("loading");
        loading.style.display = "none";
        if(result == "Invalid Login." ) {
            updateMsg(result);
            return;
        }
        var loginInfo = JSON.parse(xmlhttp.responseText);
        USERNAME = loginInfo["USERNAME"];

        if(loginInfo["USERTYPE"] == 1) {
            window.location.assign("http://cs-server.usc.edu:10211/pages/users.html");
        } else if(loginInfo["USERTYPE"] == 2) {
            window.location.assign("http://cs-server.usc.edu:10211/pages/reports.html");
        } else if(loginInfo["USERTYPE"] == 3) {
            window.location.assign("http://cs-server.usc.edu:10211/pages/products.html");
        } else if(loginInfo["USERTYPE"] == 4) {
            window.location.assign("http://cs-server.usc.edu:10211/pages/shopProducts.html");
        }
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

function validateOrder() {
    return true;
}

function validateAddEmployee() {
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

    var salary = document.getElementById("salary");
    if(!salary.checkValidity()) {
        updateMsg("Invalid salary");
        return false;
    }

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

function validateAddCategory() {
    var cn = $("#categoryName").val();
    if(!cn || cn.trim() == "") {
       updateMsg("Category name cannot be empty.");
       return false;
    }
    return true;
}

function validateAddProduct() {
    var pn = $("#productName").val();
    var price = document.getElementById("price");
    if(!pn || pn.trim() == "") {
        updateMsg("Product name cannot be empty");
        return false;
    }

    if(!price.checkValidity()) {
        updateMsg("Invalid price");
        return false;
    }

    return true;
}

function validateAddSale() {
    var sn = $("#saleName").val();
    if(!sn || sn.trim() == "") {
       updateMsg("Sale name cannot be empty.");
       return false;
    }

    if($("#startDate").val() && $("#startDate").val().trim() != "") {
        var dates = $("#startDate").val().split('-');
        var date = new Date();
        date.setDate(dates[1]);
        date.setMonth(dates[0]-1);
        date.setFullYear(dates[2]);
        date.setHours(0);
        date.setMinutes(0);
        $("#startdate").val(date.getTime());

        if(!(date.getFullYear() == dates[2] && date.getMonth() == dates[0]-1 && date.getDate() == dates[1])) {
            updateMsg("No such day exist: "+$("#startDate").val());
            return false;
        }
    }

    if($("#endDate").val() && $("#endDate").val().trim() != "") {
        var dates = $("#endDate").val().split('-');
        var date = new Date();
        date.setDate(dates[1]);
        date.setMonth(dates[0]-1);
        date.setFullYear(dates[2]);
        date.setHours(0);
        date.setMinutes(0);
        $("#enddate").val(date.getTime());
        if(!(date.getFullYear() == dates[2] && date.getMonth() == dates[0]-1 && date.getDate() == dates[1])) {
            updateMsg("No such day exist: "+$("#endDate").val());
            return false;
        }
    }

    return true;
}

function clearFields() {
    $("#userId").val("");
    $("#username").val("");
    $("#password").val("");
    $("#firstname").val("");
    $("#lastname").val("");
    $("#age").val("");
    document.getElementById("male").checked = true;
    document.getElementById("sales").checked = true;
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
    // $("#categorySelect").val();
    document.getElementById("categorySelect").options[0].selected = true;
}

function addOrder() {
    if(validateOrder()) {
        xmlhttp.onreadystatechange = handleAddOrderReady;
        xmlhttp.open("POST", "/pages/addOrder.php", true);
        xmlhttp.send();
    }
}

function addProfile() {
    if(validateAddProfile()) {
        xmlhttp.onreadystatechange = handleAddProfileReady;
        xmlhttp.open("POST", "/pages/addProfile.php", true);
        xmlhttp.send(new FormData(document.forms["addProfileForm"]));
    }
}

function updateProfile() {
    if(validateAddProfile()) {
        xmlhttp.onreadystatechange = handleUpdateProfileReady;
        xmlhttp.open("POST", "/pages/updateProfile.php", true);
        xmlhttp.send(new FormData(document.forms["addProfileForm"]));
    }
}

function handleAddOrderReady() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            checkPermissions(result);
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

function handleAddProfileReady() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
            clearProfileFields();
        } else {
            checkPermissions(result);
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

function handleUpdateProfileReady() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            checkPermissions(result);
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

var handleEditProfilePageReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "Database Issue.") {
            updateInfoMsg("");
            updateMsg(result);
        } else {
            var data = JSON.parse(result);
            $("#userId").val(data["USERID"]);
            $("#username").val(data["USERNAME"]);
            $("#password").val(data["PASSWORD"]);
            $("#firstname").val(data["FIRSTNAME"]);
            $("#lastname").val(data["LASTNAME"]);
            $("#age").val(data["AGE"]);
            if(data["GENDER"] == "1" || data["GENDER"] == 1) {
                document.getElementById("male").checked = true;
            } else {
                document.getElementById("female").checked = true;
            }
            $("#creditCard").val(data["CARDNO"]);
            $("#securityNo").val(data["SECURITYCODE"]);
            $("#month").val(data["EXPIREMONTH"]);
            $("#year").val(data["EXPIREYEAR"]);
            $("#address").val(data["ADDRESS"]);
            $("#bAddress").val(data["BILLINGADDR"]);
        }
    }
}

function handleAddCategoryReady() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
            clearCategoryFields();
        } else {
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

var handleAddProductReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
            clearProductFields();
        } else {
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

function editEmployee() {
    var selectedUser = $("input:radio[name=userListRadio]:checked").val();
    var data = employeeListData[selectedUser];
    if(data) {
        var page = document.getElementById("listForm");
        page.style.display = "none";
        page = document.getElementById("addForm");
        page.style.display = "inline-block";
        $("#addUserButton").hide();
        $("#updateUserButton").show();

        $("#userId").val(data["USERID"]);
        $("#username").val(data["USERNAME"]);
        $("#password").val(data["PASSWORD"]);
        $("#firstname").val(data["FIRSTNAME"]);
        $("#lastname").val(data["LASTNAME"]);
        $("#age").val(data["AGE"]);
        if(data["GENDER"] == "1" || data["GENDER"] == 1) {
            document.getElementById("male").checked = true;
        } else {
            document.getElementById("female").checked = true;
        }
        
        if(data["USERTYPE"] == 1 || data["USERTYPE"] == "1") {
            document.getElementById("admin").checked = true;
        } else if(data["USERTYPE"] == 2 || data["USERTYPE"] == "2") {
            document.getElementById("manager").checked = true;
        } else {
            document.getElementById("sales").checked = true;
        }
    } else {
        updateInfoMsg("");
        updateMsg('No user exist.');
    }
}

function editCategory() {
    var selectedItem = $("input:radio[name=categoryListRadio]:checked").val();
    var data = categoryListData[selectedItem];
    if(data) {
        var page = document.getElementById("listForm");
        page.style.display = "none";
        page = document.getElementById("addForm");
        page.style.display = "inline-block";
        $("#addCategoryButton").hide();
        $("#updateCategoryButton").show();

        $("#categoryId").val(data["CATEGORYID"]);
        $("#categoryName").val(data["CATEGORYNAME"]);
        $("#desc").val(data["CATEGORYDESC"]);
    } else {
        updateInfoMsg("");
        updateMsg('No user exist.');
    }
}

function viewOrder() {
    var selectedItem = $("input:radio[name=orderListRadio]:checked").val();
    $("#orderId").val(selectedItem);
    xmlhttp.onreadystatechange = handleViewOrderReady;
    xmlhttp.open("POST", "/pages/viewOrder.php", true);
    xmlhttp.send(new FormData(document.forms["listForm"]));
}

function handleViewOrderReady() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var page = document.getElementById("listOrders");
        page.style.display = "none";
        page = document.getElementById("viewOrder");
        page.style.display = "block";
        $("#viewOrderButton").hide();
        $("#orderListButton").show();

        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listSelect = document.getElementById("viewOrder");
        listSelect.innerHTML = "";
        // cartListData = {};
        var html="";
        if(!result || result == "") {
            html = "Nothing in your shopping cart.";
        }
        for(var i in list) {
            var data = list[i];
            var orderDate = data["ORDERDATE"];
            var name = data["PRODUCTNAME"];
            var desc = data["PRODUCTDESC"];
            var price = data["PRICE"];
            var productId = data["PRODUCTID"];
            var quantity = data["QUANTITY"];
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

function editProduct() {
    var selectedItem = $("input:radio[name=productListRadio]:checked").val();
    var data = productListData[selectedItem];
    if(data) {
        var page = document.getElementById("listForm");
        page.style.display = "none";
        page = document.getElementById("addForm");
        page.style.display = "inline-block";
        $("#addProductButton").hide();
        $("#updateProductButton").show();

        $("#productId").val(data["PRODUCTID"]);
        $("#productName").val(data["PRODUCTNAME"]);
        $("#desc").val(data["PRODUCTDESC"]);
        $("#price").val(data["PRICE"]);
    } else {
        updateInfoMsg("");
        updateMsg('No user exist.');
    }
}

function updateEmployee() {
    xmlhttp.open("POST", "/pages/updateUser.php", true);
    xmlhttp.onreadystatechange = handleUpdateEmployeeReady;
    xmlhttp.send(new FormData(document.forms["addUserForm"]));
}

function updateCategory() {
    xmlhttp.open("POST", "/pages/updateCategories.php", true);
    xmlhttp.onreadystatechange = handleUpdateCategoryReady;
    xmlhttp.send(new FormData(document.forms["addCategoryForm"]));
}

function updateProduct() {
    xmlhttp.open("POST", "/pages/updateProducts.php", true);
    xmlhttp.onreadystatechange = handleUpdateProductReady;
    xmlhttp.send(new FormData(document.forms["addProductForm"]));
}

function updateSale() {
    xmlhttp.open("POST", "/pages/updateSales.php", true);
    xmlhttp.onreadystatechange = handleUpdateSaleReady;
    xmlhttp.send(new FormData(document.forms["addSaleForm"]));
}

var handleUpdateSaleReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            updateInfoMsg("");
            updateMsg("Save Error:"+result);
        }
    }
}

var handleUpdateEmployeeReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            updateInfoMsg("");
            updateMsg("Save Error:"+result);
        }
    }
}

var handleUpdateCategoryReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            updateInfoMsg("");
            updateMsg("Save Error:"+result);
        }
    }
}

var handleUpdateProductReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            updateInfoMsg("");
            updateMsg("Save Error:"+result);
        }
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

function gotoAddPage(pageType) {
    var pageTitle = document.getElementById("editPage");
    pageTitle.style.display = "none";
    pageTitle = document.getElementById("delPage");
    pageTitle.style.display = "none";
    pageTitle = document.getElementById("addPage");
    pageTitle.style.display = "block";

    var page = document.getElementById("addForm");
    page.style.display = "inline-block";
    page = document.getElementById("listForm");
    page.style.display = "none";
    page = document.getElementById("delForm");
    page.style.display = "none";

    updateInfoMsg("");
    updateMsg("");

    if(pageType == 1) {
        clearCategoryFields();
        $("#updateCategoryButton").hide();
        $("#addCategoryButton").show();
    } else if(pageType == 2) {
        clearProductFields();
        $("#updateProductButton").hide();
        $("#addProductButton").show();
        xmlhttp.open("GET", "/pages/listCategories.php", true);
        xmlhttp.onreadystatechange = handleListCategoryReadyForSelect;
        xmlhttp.send();
    } else if(pageType == 3) {
        clearSaleFields();
        $("#updateSaleButton").hide();
        $("#addSaleButton").show();
        xmlhttp.open("GET", "/pages/listProducts.php", true);
        xmlhttp.onreadystatechange = handleListProductReadyForSelect;
        xmlhttp.send();
    } else {
        clearFields();
        $("#updateUserButton").hide();
        $("#addUserButton").show();
    }
}

function categoryPageReady() {
    xmlhttp.open("GET", "/pages/categoryPageReady.php", true);
    xmlhttp.onreadystatechange = handleCategoryPageReady;
    xmlhttp.send();
}



function handleCategoryPageReady() {
    checkPermissions(xmlhttp.responseText);
}

function usersPageReady() {
    xmlhttp.open("GET", "/pages/usersPageReady.php", true);
    xmlhttp.onreadystatechange = handleCategoryPageReady;
    xmlhttp.send();
}

function productPageReady() {
    xmlhttp.open("GET", "/pages/listCategories.php", true);
    xmlhttp.onreadystatechange = handleListCategoryReadyForSelect;
    xmlhttp.send();
}

function orderReportsPageReady() {
    xmlhttp.open("GET", "/pages/listCategories.php", true);
    xmlhttp.onreadystatechange = handleListCategoryReadyForSelect;
    xmlhttp.send();
}

function shopProductsPageReady() {
    xmlhttp.onreadystatechange = handleShopProductsReady;
    xmlhttp.open("GET", "/pages/shopProducts.php", true);
    xmlhttp.send();
}

function cartPageReady() {
    xmlhttp.onreadystatechange = handleListCartReady;
    xmlhttp.open("GET", "/pages/listCart.php", true);
    xmlhttp.send();
}

function salesPageReady() {
    xmlhttp.open("GET", "/pages/listProducts.php", true);
    xmlhttp.onreadystatechange = handleListProductReadyForSelect;
    xmlhttp.send();
}

function gotoEditPage(pageType) {
    var pageTitle = document.getElementById("editPage");
    pageTitle.style.display = "block";
    pageTitle = document.getElementById("delPage");
    pageTitle.style.display = "none";
    pageTitle = document.getElementById("addPage");
    pageTitle.style.display = "none";

    var page = document.getElementById("addForm");
    page.style.display = "none";
    page = document.getElementById("listForm");
    page.style.display = "block";
    page = document.getElementById("delForm");
    page.style.display = "none";

    updateInfoMsg("");
    updateMsg("");
    if(pageType == 1) {
        xmlhttp.open("GET", "/pages/listCategories.php", true);
        xmlhttp.onreadystatechange = handleListCategoryReady;
        xmlhttp.send();
    } else if(pageType == 2) {
        xmlhttp.open("GET", "/pages/listProducts.php", true);
        xmlhttp.onreadystatechange = handleListProductReady;
        xmlhttp.send();
    } else if(pageType == 3) {
        xmlhttp.open("GET", "/pages/listSales.php", true);
        xmlhttp.onreadystatechange = handleListSaleReady;
        xmlhttp.send();
    } else {
        xmlhttp.open("GET", "/pages/listUser.php", true);
        xmlhttp.onreadystatechange = handleListEmployeeReady;
        xmlhttp.send();
    }
}

var handleListOrdersReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listForm = document.getElementById("listOrders");
        listForm.innerHTML = "";
        orderListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('p');
            // var date = new Date();
            var name = "Order at: "+data["ORDERDATE"];
            // date.setTime(data["ORDERDATE"]);
            // var name = "Order at: "+date.getHours()+':'+date.getMinutes()+" "+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getFullYear();
            var orderId = data["ORDERID"];
            orderListData[orderId] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele.innerHTML = '<input type="radio" name="orderListRadio" value="'
                            +orderId
                            +'"'+checked+'/><label>'
                            +name
                            +'</label>';
            listForm.appendChild(ele);
        }
    }
}

var handleListCategoryReadyForSelect = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
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
            var name = data["CATEGORYNAME"];
            var categoryId = data["CATEGORYID"];
            categoryListData[categoryId] = data;
            ele.text = name;
            ele.value = categoryId;
            listSelect.add(ele);
        }
    }
}

var handleListCartReady = function () {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listSelect = document.getElementById("shopProducts");
        listSelect.innerHTML = "";
        cartListData = {};
        var html="";
        if(!result || result == "") {
            html = "Nothing in your shopping cart.";
        }
        for(var i in list) {
            var data = list[i];
            var name = data["productName"];
            var desc = data["productDesc"];
            var price = data["price"];
            var productId = data["productId"];
            var quantity = data["quantity"];
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
    var quantity = $("#QUT"+productId).val();
    $("#quantity").val(quantity);
    $("#productId").val(productId);
    xmlhttp.onreadystatechange = handleupdateQuantityInCartReady;
    xmlhttp.open("POST", "/pages/updateQuantityInCart.php", true);
    xmlhttp.send(new FormData(document.forms["listForm"]));
}

var removeItemFromCart = function(productId) {
    $("#productId").val(productId);
    xmlhttp.onreadystatechange = handleRemoveItemFromCartReady();
    xmlhttp.open("POST", "/pages/removeItemFromCart.php", true);
    xmlhttp.send(new FormData(document.forms["listForm"]));
}

function clearShoppingCart() {
    xmlhttp.onreadystatechange = handleClearShoppingCartReady;
    xmlhttp.open("POST", "/pages/clearShoppingCart.php", true);
    xmlhttp.send(new FormData(document.forms["listForm"]));
}

var handleClearShoppingCartReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "success") {
            updateInfoMsg("All items in shopping cart has been deleted.");
            $("#shopProducts").html("");
            updateMsg("");
        } else {
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

var handleupdateQuantityInCartReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "success") {
            updateInfoMsg("The quantity has been successfully updated.");
            updateMsg("");
        } else {
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

var handleRemoveItemFromCartReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

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

var handleSelectShopCategoryReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var result = JSON.parse(xmlhttp.responseText);//JSON.parse
        var list = result[0];
        listSelect = document.getElementById("shopProducts");
        listSelect.innerHTML = "";
        productListData = {};
        var html="";
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var name = data["PRODUCTNAME"];
            var desc = data["PRODUCTDESC"];
            var price = data["PRICE"];
            var cat = data["CATEGORYID"]
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
        
        list = result[1];
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

var handleShopProductsReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var result = JSON.parse(xmlhttp.responseText);//JSON.parse
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
            var name = data["CATEGORYNAME"];
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
            var name = data["PRODUCTNAME"];
            var desc = data["PRODUCTDESC"];
            var price = data["PRICE"];
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
    $("#productId").val(productId);
    $("#productName").val(name);
    $("#produceDesc").val(desc);
    $("#price").val(price);
    $("#quantity").val($("#QUT"+productId).val());
    xmlhttp.onreadystatechange = handleAddItemToShoppingCartReady;
    xmlhttp.open("POST", "/pages/addToShoppingCart.php", true);
    xmlhttp.send(new FormData(document.forms["listForm"]));
}

var handleAddItemToShoppingCartReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        result = JSON.parse(result);
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
            // } else {
            //     $("#alsoBought").html("No purchased together items.");
            }
            updateMsg("");
        } else {
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

var handleListCategoryReadyForSelectForSalePage = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listSelect = document.getElementById("categorySelectForSale");
        categorySelect.innerHTML = "";
        categoryListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('option');
            var name = data["CATEGORYNAME"];
            var categoryId = data["CATEGORYID"];
            categoryListData[categoryId] = data;
            ele.text = name;
            ele.value = categoryId;
            if(i==0) {
                ele.selected = true;
            }
            listSelect.add(ele);
        }
    }
}

var handleListProductReadyForSelect = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listSelect = document.getElementById("applyProducts");
        listSelect.innerHTML = "";
        productListData = {};
        var html="";
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            // var ele = document.createElement('p');

            var name = data["PRODUCTNAME"];
            var productId = data["PRODUCTID"];
            productListData[name] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            html = html + '<div><input type="checkbox" name="productListCheckbox[]" value="'
                            +productId+'"'
                            +checked+'/><label>'
                            +name
                            +'</label></div>';
        }
        listSelect.innerHTML = html;
    }
}

var handleListEmployeeReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listForm = document.getElementById("listEmployees");
        listForm.innerHTML = "";
        employeeListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('p');
            var username = data["USERNAME"];
            employeeListData[username] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele.innerHTML = '<input type="radio" name="userListRadio" value="'
                            +username
                            +'"'+checked+'/><label>'
                            +username
                            +'</label>';
            listForm.appendChild(ele);
        }
    }
}

function gotoDelPage(pageType) {
    var pageTitle = document.getElementById("editPage");
    pageTitle.style.display = "none";
    pageTitle = document.getElementById("delPage");
    pageTitle.style.display = "block";
    pageTitle = document.getElementById("addPage");
    pageTitle.style.display = "none";
    
    var page = document.getElementById("addForm");
    page.style.display = "none";
    page = document.getElementById("listForm");
    page.style.display = "none";
    page = document.getElementById("delForm");
    page.style.display = "block";
    
    updateInfoMsg("");
    updateMsg("");
    if(pageType == 1) {
        xmlhttp.open("GET", "/pages/listCategories.php", true);
        xmlhttp.onreadystatechange = handleListCategoryReadyForDel;
        xmlhttp.send();
    } else if(pageType == 2) {
        xmlhttp.open("GET", "/pages/listProducts.php", true);
        xmlhttp.onreadystatechange = handleListProductReadyForDel;
        xmlhttp.send();
    } else if(pageType == 3){
        xmlhttp.open("GET", "/pages/listSales.php", true);
        xmlhttp.onreadystatechange = handleListSaleReadyForDel;
        xmlhttp.send();
    } else {
        xmlhttp.open("GET", "/pages/listUser.php", true);
        xmlhttp.onreadystatechange = handleListEmployeeReadyForDel;
        xmlhttp.send();
    }
}

function handleListEmployeeReadyForDel() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loadingInDel").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listForm = document.getElementById("delEmployees");
        listForm.innerHTML = "";
        employeeListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('p');
            var username = data["USERNAME"];
            var userId = data["USERID"];
            employeeListData[username] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele.innerHTML = '<input type="checkbox" name="userListCheckbox[]" value='
                            +userId
                            +checked+'/><label>'
                            +username
                            +'</label>';
            listForm.appendChild(ele);
        }
    }
}

var handleListCategoryReadyForDel = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loadingInDel").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listForm = document.getElementById("delCategories");
        listForm.innerHTML = "";
        categoryListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('p');
            var name = data["CATEGORYNAME"];
            var categoryId = data["CATEGORYID"];
            categoryListData[categoryId] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele.innerHTML = '<input type="checkbox" name="categoryListCheckbox[]" value='
                            +categoryId
                            +checked+'/><label>'
                            +name
                            +'</label>';
            listForm.appendChild(ele);
        }
    }
}

var handleListSaleReadyForDel = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loadingInDel").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);
        
        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listForm = document.getElementById("delSales");
        listForm.innerHTML = "";
        saleListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('p');
            var name = data["SALENAME"];
            var saleId = data["SALESID"];
            saleListData[name] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele.innerHTML = '<input type="checkbox" name="saleListCheckbox[]" value='
                            +saleId
                            +checked+'/><label>'
                            +name
                            +'</label>';
            listForm.appendChild(ele);
        }
    }
}

var handleListProductReadyForDel = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loadingInDel").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);
        
        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listForm = document.getElementById("delProducts");
        listForm.innerHTML = "";
        productListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('p');
            var name = data["PRODUCTNAME"];
            var productId = data["PRODUCTID"];
            productListData[name] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele.innerHTML = '<input type="checkbox" name="productListCheckbox[]" value='
                            +productId
                            +checked+'/><label>'
                            +name
                            +'</label>';
            listForm.appendChild(ele);
        }
    }
}

function delEmployee() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        xmlhttp.onreadystatechange = handleDeleteEmployeeReady;
        xmlhttp.open("POST", "/pages/deleteUsers.php", true);
        xmlhttp.send(new FormData(document.forms["delUserForm"]));
    }
}

function delCategories() {
    xmlhttp.onreadystatechange = handleDeleteCategoryReady;
    xmlhttp.open("POST", "/pages/deleteCategories.php", true);
    xmlhttp.send(new FormData(document.forms["delCategoryForm"]));
}

function delProducts() {
    xmlhttp.onreadystatechange = handleDeleteProductReady;
    xmlhttp.open("POST", "/pages/deleteProducts.php", true);
    xmlhttp.send(new FormData(document.forms["delProductForm"]));    
}

function delSales() {
    xmlhttp.onreadystatechange = handleDeleteSaleReady;
    xmlhttp.open("POST", "/pages/deleteSales.php", true);
    xmlhttp.send(new FormData(document.forms["delSaleForm"]));    
}

var handleDeleteSaleReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        
        if(result == "success") {
            gotoDelPage(3);
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            updateInfoMsg("");
            updateMsg("Save Error:"+result);
        }
    }
}

var handleDeleteProductReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);

        if(result == "success") {
            gotoDelPage(2);
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            updateInfoMsg("");
            updateMsg("Save Error:"+result);
        }
    }
}

var handleDeleteCategoryReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);

        if(result == "success") {
            gotoDelPage(1);
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            updateInfoMsg("");
            updateMsg("Save Error:"+result);
        }
    }
}

function handleDeleteEmployeeReady() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);

        if(result == "success") {
            gotoDelPage();
            updateMsg("");
            updateInfoMsg("Save Successfully.");
        } else {
            updateInfoMsg("");
            updateMsg("Save Error:"+result);
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

function clearProductReportFields() {
    $("#productName").val("");
    $("#startSalary").val("");
    $("#toSalary").val("");
    document.getElementById("searchResult").style.display = "none";
}

function clearEmployeeReportFields() {
    
}

function clearSaleReportFields() {

}

function reportsPageReady() {
    xmlhttp.open("GET", "/pages/listCategories.php", true);
    xmlhttp.onreadystatechange = handleListCategoryReadyForSelect;
    xmlhttp.send();
}

function viewProductReport() {
    displaySearchResult();
    xmlhttp.open("POST", "/pages/viewProducts.php", true);
    xmlhttp.onreadystatechange = handleViewProductsReady;
    xmlhttp.send(new FormData(document.forms["productReportForm"]));
}

var customerLoginPageReady = function() {
    xmlhttp.open("GET", "/pages/advertisments.php", true);
    xmlhttp.onreadystatechange = handleCustomerLoginPageReady;
    xmlhttp.send();
}

function selectShopCategory() {
    var selectedCat = $("#categorySelect option:selected").val();
    if(selectedCat == "") {
        shopProductsPageReady();
        $("#advertisments").html("");
    } else {
        xmlhttp.onreadystatechange = handleSelectShopCategoryReady;
        xmlhttp.open("GET", "/pages/listProductsByCategory.php?categoryId="+selectedCat, true);
        xmlhttp.send();
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
            $("#startdate").val(startDateStr);
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
            $("#enddate").val(endDateStr);
        }
    } else {
        $("#enddate").val("");
    }
    if(totalSaleOnly){
        $("#totalSale").val("1");
    } else {
        $("#totalSale").val("0");
    }
    xmlhttp.open("POST", "/pages/viewOrdersReport.php", true);
    xmlhttp.onreadystatechange = handleViewOrdersReportReady;
    xmlhttp.send(new FormData(document.forms["orderReportForm"]));
}

function displayOrderSearchResult() {

}

function displaySearchResult(displayType) {
    var displayStr = '<tr><th>Product Id</th><th>Product Name</th><th>Category</th><th>Description</th><th>Price $</th></tr>';
    if(displayType == 2) {
        displayStr = '<tr><th>Id</th><th>Username</th><th>First Name</th><th>Last Name</th><th>Password</th><th>Employee Type</th><th>Age</th><th>Gender</th><th>Salary $</th></tr>';
    } else if(displayType == 3) {
        displayStr = '<tr><th>Id</th><th>Sale Name</th><th>Description</th><th>Percentage</th><th>Start Date</th><th>End Date</th><th>Affects on Products</th></tr>';
    }

    document.getElementById("searchResult").style.display = "block";
    document.getElementById("searchResultRows").innerHTML = displayStr;
    document.getElementById("loadingInSearchResult").style.display = "block";
}

function viewEmployeeReport() {
    displaySearchResult(2);
    xmlhttp.open("POST", "/pages/viewEmployees.php", true);
    xmlhttp.onreadystatechange = handleViewEmployeesReady;
    xmlhttp.send(new FormData(document.forms["employeeReportForm"]));
}

function viewSaleReport() {
    var dates = $("#startDate").val().trim();
    if(dates.length > 0) {
        dates = dates.split('-');
        var date = new Date();
        date.setDate(dates[1]);
        date.setMonth(dates[0]-1);
        date.setFullYear(dates[2]);
        date.setHours(0);
        date.setMinutes(0);
        $("#startdate").val(date.getTime());
    } else {
        $("#startdate").val("");
    }

    dates = $("#endDate").val().trim();
    if(dates.length > 0) {
        dates = dates.split('-');
        var date = new Date();
        date.setDate(dates[1]);
        date.setMonth(dates[0]-1);
        date.setFullYear(dates[2]);
        date.setHours(0);
        date.setMinutes(0);
        $("#enddate").val(date.getTime());
    } else {
        $("#enddate").val("");
    }

    displaySearchResult(3);
    xmlhttp.open("POST", "/pages/viewSales.php", true);
    xmlhttp.onreadystatechange = handleViewSalesReady;
    xmlhttp.send(new FormData(document.forms["saleReportForm"]));
}

function gotoProductReport() {
    var pageTitle = document.getElementById("viewSale");
    pageTitle.style.display = "none";
    pageTitle = document.getElementById("viewEmployee");
    pageTitle.style.display = "none";
    pageTitle = document.getElementById("viewProduct");
    pageTitle.style.display = "block";

    var page = document.getElementById("productReport");
    page.style.display = "inline-block";
    page = document.getElementById("employeeReport");
    page.style.display = "none";
    page = document.getElementById("saleReport");
    page.style.display = "none";

    updateInfoMsg("");
    updateMsg("");
    xmlhttp.open("GET", "/pages/listCategories.php", true);
    xmlhttp.onreadystatechange = handleListCategoryReadyForSelect;
    xmlhttp.send();
    clearProductReportFields();
}

function gotoSaleReport() {
    var pageTitle = document.getElementById("viewSale");
    pageTitle.style.display = "block";
    pageTitle = document.getElementById("viewEmployee");
    pageTitle.style.display = "none";
    pageTitle = document.getElementById("viewProduct");
    pageTitle.style.display = "none";

    var page = document.getElementById("productReport");
    page.style.display = "none";
    page = document.getElementById("employeeReport");
    page.style.display = "none";
    page = document.getElementById("saleReport");
    page.style.display = "inline-block";

    updateInfoMsg("");
    updateMsg("");

    xmlhttp.open("GET", "/pages/listCategories.php", true);
    xmlhttp.onreadystatechange = handleListCategoryReadyForSelectForSalePage;
    xmlhttp.send();

    clearSaleReportFields();
}

function gotoUserReport() {
    var pageTitle = document.getElementById("viewSale");
    pageTitle.style.display = "none";
    pageTitle = document.getElementById("viewEmployee");
    pageTitle.style.display = "block";
    pageTitle = document.getElementById("viewProduct");
    pageTitle.style.display = "none";

    var page = document.getElementById("productReport");
    page.style.display = "none";
    page = document.getElementById("employeeReport");
    page.style.display = "inline-block";
    page = document.getElementById("saleReport");
    page.style.display = "none";

    updateInfoMsg("");
    updateMsg("");
    clearSaleFields();
}

var handleCustomerLoginPageReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
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

var handleViewEmployeesReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var loading = document.getElementById("loadingInSearchResult");
        if(result == "empty" ) {
            loading.innerHTML = "No result match the search option.";
            return;
        }
        var list = JSON.parse(xmlhttp.responseText);
        var resultDiv = document.getElementById("searchResultRows");
        if(list.length < 1) {
            loading.innerHTML = "No result match the search option.";
        } else {
            for(var i=0; i<list.length; i++) {
                var row = document.createElement('tr');
                var item = list[i];
                var userType = "Administrator";
                if(item["USERTYPE"] == 2 || item["USERTYPE"] == "2") {
                    userType = "Manager";
                } else if(item["USERTYPE"] == 3 || item["USERTYPE"] == "3") {
                    userType = "Sales";
                }

                var gender = "Male";
                if(item["GENDER"] == 2 || item["GENDER"] == "2") {
                    gender = "Female";
                }
                row.innerHTML = '<td>'+item["USERID"]+'</td>'
                                + '<td>'+item["USERNAME"]+'</td>'
                                + '<td>'+item["FIRSTNAME"]+'</td>'
                                + '<td>'+item["LASTNAME"]+'</td>'
                                + '<td>'+'******'+'</td>'
                                + '<td>'+userType+'</td>'
                                + '<td>'+item["AGE"]+'</td>'
                                + '<td>'+gender+'</td>'
                                + '<td>'+item["SALARY"]+'</td>';
                resultDiv.appendChild(row);
            }
            loading.innerHTML = "";
        }
    }
}

var handleViewSalesReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var loading = document.getElementById("loadingInSearchResult");
        if(result == "empty" ) {
            loading.innerHTML = "No result match the search option.";
            return;
        }
        var list = JSON.parse(xmlhttp.responseText);
        var resultDiv = document.getElementById("searchResultRows");
        if(list.length < 1) {
            loading.innerHTML = "No result match the search option.";
        } else {
            for(var i=0; i<list.length; i++) {
                var row = document.createElement('tr');
                var item = list[i];
                var startDateInput = $("#startdate").val()-0;
                var endDateInput = $("#enddate").val()-0;
                if(startDateInput>0 && item["STARTDATE"]-startDateInput<0) {
                    continue;
                }
                if(endDateInput>0 && endDateInput-item["ENDDATE"]<0) {
                    continue;
                }
                var startDateStr = "";
                if(item["STARTDATE"].length > 0) {
                    var startDate = new Date();
                    startDate.setTime(item["STARTDATE"]);
                    startDateStr = (startDate.getMonth()+1)+'-'+startDate.getDate()+'-'+startDate.getFullYear();
                }
                var endDateStr = "";
                if(item["ENDDATE"].length > 0) {
                    var endDate = new Date();
                    endDate.setTime(item["ENDDATE"]);
                    endDateStr = (endDate.getMonth()+1)+'-'+endDate.getDate()+'-'+endDate.getFullYear();
                }
                row.innerHTML = '<td>'+item["SALESID"]+'</td>'
                                + '<td>'+item["SALENAME"]+'</td>'
                                + '<td>'+item["SALEDESC"]+'</td>'
                                + '<td>'+item["PERCENTAGE"]+'</td>'
                                + '<td>'+startDateStr+'</td>'
                                + '<td>'+endDateStr+'</td>'
                                + '<td>'+item["PRODUCTNAME"]+'</td>';
                resultDiv.appendChild(row);
            }
            loading.innerHTML = "";
        }
    }
}

var handleViewOrdersReportReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        
        var loading = document.getElementById("loadingInSearchResult");
        if(result == "empty" ) {
            loading.innerHTML = "No result match the search option.";
            return;
        }
        var list = JSON.parse(xmlhttp.responseText);
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

var handleViewProductsReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        
        var loading = document.getElementById("loadingInSearchResult");
        if(result == "empty" ) {
            loading.innerHTML = "No result match the search option.";
            return;
        }
        var list = JSON.parse(xmlhttp.responseText);
        var resultDiv = document.getElementById("searchResultRows");
        if(list.length < 1) {
            loading.innerHTML = "No result match the search option.";
        } else {
            for(var i=0; i<list.length; i++) {
                var row = document.createElement('tr');
                var item = list[i];
                var categoryStr = categoryListData[item["CATEGORYID"]]["CATEGORYNAME"];
                row.innerHTML = '<td>'+item["PRODUCTID"]+'</td>'
                                + '<td>'+item["PRODUCTNAME"]+'</td>'
                                + '<td>'+categoryStr+'</td>'
                                + '<td>'+item["PRODUCTDESC"]+'</td>'
                                + '<td>'+item["PRICE"]+'</td>';
                resultDiv.appendChild(row);
            }
            loading.innerHTML = "";
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