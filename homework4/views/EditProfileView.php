<html>
<head>
    <link href="/css/hw4.css" rel="stylesheet">
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="/scripts/hw4.js"></script>
    <script>
        $(document).ready(editProfilePageReady);
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
    <nav class="navigationBar">
        <div class="container">
            <div>
                <ul class="navigation">
                    <li>
                        <a href="http://cs-server.usc.edu:10211/CodeIgniter/index.php/ShopProducts">Continue Shopping</a>
                    </li>
                    <li>
                        <a href="http://cs-server.usc.edu:10211/CodeIgniter/index.php/ListCart">Shopping Cart</a>
                    </li>
                    <li>
                        <a href="http://cs-server.usc.edu:10211/CodeIgniter/index.php/ListOrders">My Orders</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container" id="pageContainer">
        <header class="pageHeader">
            <div>
            <h1 style="text-align:center;">Edit Profile</h1>
            <p>Use this page to edit your profile to shopping with us.</p>
            </div>

            <p><label id="errorMsg" class="errorMsg"></label></p>
            <p><label id="infoMsg" class="infoMsg"></label></p>
            
            <div class="fillForm" id="addForm">
            <form name="addProfileForm" id="addProfileForm" action="addProfile.php" method="POST" enctype="multipart/form-data">
            <input type="hidden" id="userId" name="userId"/>
            <p>
            <label>Username:</label></p><p>
            <input type="text" class="input" id="username" name="username" size="30"/>
            </p><p>
            <label>Password:</label></p><p>
            <input type="text" class="input" id="password" name="password" size="30"/>
            </p><p>
            <label>First Name:</label></p><p>
            <input type="text" class="input" id="firstname" name="firstname" size="30"/>
            </p><p>
            <label>Last Name:</label></p><p>
            <input type="text" class="input" id="lastname" name="lastname" size="30"/>
            </p><p>
            <label>Age:</label></p><p>
            <input type="number" class="input" id="age" name="age" min="10" max="100"/>
            </p><p>
            <label>Gender:</label></p><p class="radio" >
            <input type="radio" name="gender" id="male" value="male" checked/><label>Male</label>
            <input type="radio" name="gender" id="female" value="female"/><label>Female</label>
            </p><p>
            <label>Credit Card #:</label></p><p>
            <input type="text" class="input" id="creditCard" name="creditCard" size="30"/>
            </p><p>
            <label>Security Code:</label></p><p>
            <input type="number" class="input" style="width:40px;" id="securityNo" name="securityNo" maxLength="3" size="3"/>
            </p><p>
            <label>Expire At:</label></p><p>
            <select name="month" id="month">
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
                <option value="8">08</option>
                <option value="9">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
            <select name="year" id="year">
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
            </select>
            </p><p>
            <label>Home Address:</label></p><p>
            <input type="text" id="address" class="input" name="address" size="60"/>
            </p><p>
            <label>Billing Address:</label></p><p>
            <input type="text" id="bAddress" class="input" name="bAddress" size="60"/>
            </p>
            </form>
            <p></p>
            <p><a class="loginButton" style="margin-top:50px;" onClick="updateProfile()">Save</a>
            </p>
            </div>
        </header>
        <p style="text-align:center;">Copyright &copy; Delia's Chocolate Shop 2015</p>
    </div>
</body>

</html>
