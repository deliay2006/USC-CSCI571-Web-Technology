var xmlhttp = new XMLHttpRequest();
var employeeListData;
var categoryListData;
var productListData;
var saleListData;

function login() {
    var loading = document.getElementById("loading");
    loading.style.display = "block";
    if(validate()) {
        xmlhttp.onreadystatechange = handleLoginReady;
        xmlhttp.open("POST", "/login.php", true);
        xmlhttp.send(new FormData(document.forms["loginForm"]));
    }
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

        if(loginInfo["USERTYPE"] == 1) {
            window.location.assign("http://cs-server.usc.edu:10211/pages/users.html");
        } else if(loginInfo["USERTYPE"] == 2) {
            window.location.assign("http://cs-server.usc.edu:10211/pages/reports.html");
        } else if(loginInfo["USERTYPE"] == 3) {
             window.location.assign("http://cs-server.usc.edu:10211/pages/products.html");
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

function clearSaleFields() {
    $("#saleName").val("");
    $("#desc").val("");
    $("#percentage").val("");
    $("#startDate").val("");
    $("#startdate").val("");
    $("#endDate").val("");
    $("#enddate").val("");

    var list = document.forms[0].elements["productListCheckbox[]"];
    for(var i=0; i<list.length; i++) {
        if(i==0) {
            list[i].checked = true;
        } else {
            list[i].checked = false;
        }
    }
}

function addEmployee() {
    if(validateAddEmployee()) {
        xmlhttp.onreadystatechange = handleAddEmployeeReady;
        xmlhttp.open("POST", "/pages/addUser.php", true);
        xmlhttp.send(new FormData(document.forms["addUserForm"]));
    }
}

function addCategory() {
    if(validateAddCategory()) {
        xmlhttp.onreadystatechange = handleAddCategoryReady;
        xmlhttp.open("POST", "/pages/addCategories.php", true);
        xmlhttp.send(new FormData(document.forms["addCategoryForm"]));
    }
}

function addProduct() {
    if(validateAddProduct()) {
        xmlhttp.onreadystatechange = handleAddProductReady;
        xmlhttp.open("POST", "/pages/addProducts.php", true);
        xmlhttp.send(new FormData(document.forms["addProductForm"]));
    }
}

function addSale() {
    if(validateAddSale()) {
        xmlhttp.onreadystatechange = handleAddSaleReady;
        xmlhttp.open("POST", "/pages/addSales.php", true);
        xmlhttp.send(new FormData(document.forms["addSaleForm"]));
    }
}

function handleAddSaleReady() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        checkPermissions(result);
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
            clearSaleFields();
        } else {
            updateInfoMsg("");
            updateMsg(result);
        }
    }
}

function handleAddEmployeeReady() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var result = xmlhttp.responseText;
        if(result == "success") {
            updateMsg("");
            updateInfoMsg("Save Successfully.");
            clearFields();
        } else {
            checkPermissions(result);
            updateInfoMsg("");
            updateMsg(result);
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

function editSale() {
    var selectedItem = $("input:radio[name=saleListRadio]:checked").val();
    var data = saleListData[selectedItem];
    if(data) {
        var page = document.getElementById("listForm");
        page.style.display = "none";
        page = document.getElementById("addForm");
        page.style.display = "inline-block";
        $("#addSaleButton").hide();
        $("#updateSaleButton").show();

        $("#saleId").val(data["SALESID"]);
        $("#saleName").val(data["SALENAME"]);
        $("#desc").val(data["SALEDESC"]);
        $("#percentage").val(data["PERCENTAGE"]);
        
        if(data["STARTDATE"].length > 0) {
            $("#startdate").val(data["STARTDATE"]);
            var startDate = new Date();
            startDate.setTime(data["STARTDATE"]);
            $("#startDate").val((startDate.getMonth()+1)+'-'+startDate.getDate()+'-'+startDate.getFullYear());
        }

        if(data["ENDDATE"].length > 0) {
            $("#enddate").val(data["ENDDATE"]);
            var endDate = new Date();
            endDate.setTime(data["ENDDATE"]);
            $("#endDate").val((endDate.getMonth()+1)+'-'+endDate.getDate()+'-'+endDate.getFullYear());
        }

        var productIdList = data["PRODUCTID"].split(",");
        var productIdMap = {};
        for(var i=0; i<productIdList.length; i++) {
            productIdMap[productIdList[i]] = true;
        }
        var list = document.forms[0].elements["productListCheckbox[]"];
        for(var i=0; i<list.length; i++) {
            if(productIdMap[list[i].value]) {
                list[i].checked = true;
            } else {
                list[i].checked = false;
            }
        }
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

var handleListProductReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listForm = document.getElementById("listProducts");
        listForm.innerHTML = "";
        productListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('p');
            var name = data["PRODUCTNAME"];
            productListData[name] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele.innerHTML = '<input type="radio" name="productListRadio" value="'
                            +name
                            +'"'+checked+'/><label>'
                            +name
                            +'</label>';
            listForm.appendChild(ele);
        }
    }
}

var handleListCategoryReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listForm = document.getElementById("listCategories");
        listForm.innerHTML = "";
        categoryListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('p');
            var name = data["CATEGORYNAME"];
            categoryListData[name] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele.innerHTML = '<input type="radio" name="categoryListRadio" value="'
                            +name
                            +'"'+checked+'/><label>'
                            +name
                            +'</label>';
            listForm.appendChild(ele);
        }
    }
}

var handleListSaleReady = function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        $("#loading").html("");
        var result = xmlhttp.responseText;
        checkPermissions(result);

        var list = JSON.parse(xmlhttp.responseText);//JSON.parse
        var listForm = document.getElementById("listSales");
        listForm.innerHTML = "";
        saleListData = {};
        for(var i=0; i<list.length; i++) {
            var data = list[i];
            var ele = document.createElement('p');
            var name = data["SALENAME"];
            saleListData[name] = data;
            var checked = '';
            if(i==0) {
                checked = " checked";
            }
            ele.innerHTML = '<input type="radio" name="saleListRadio" value="'
                            +name
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