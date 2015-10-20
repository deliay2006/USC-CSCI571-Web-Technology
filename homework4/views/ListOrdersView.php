<html>
<head>
    <link href="/css/hw4.css" rel="stylesheet">
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="/scripts/hw4.js"></script>
    <script>
        $(document).ready(orderPageReady);
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
                        <a href="http://cs-server.usc.edu:10211/CodeIgniter/index.php/EditProfile">Edit My Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container" id="pageContainer">
        <header class="pageHeader">

            <div>
            <h1 style="text-align:center;">My Orders</h1>
            <p>Use this page to view all your orders.</p>
            </div>

            <p><label id="errorMsg" class="errorMsg"></label></p>
            <p><label id="infoMsg" class="infoMsg"></label></p>

            <!-- list page-->
            <div id="listForm" style="">
            <div id="loading" class="loading">Loading...</div>
            <form method="POST" name="listForm" id="lForm">
            <input type="hidden" id="orderId" name="orderId"/>
            <div id="listOrders" class="listCategories">

            </div>
            <div id="viewOrder" class="listCategories" style="display:none;">
            </div>
            </form>
            <p></p>
            <p><a class="loginButton" style="margin-top:50px;" id="viewOrderButton" onClick="viewOrder()">View Order</a>
            </p>
            <p><a class="loginButton" style="margin-top:50px;display:none;" id="orderListButton" onClick="orderPageReady(true)">Back to Order List</a>
            </p>
            </div>
            
        </header>
        <p style="text-align:center;">Copyright &copy; Delia's Chocolate Shop 2015</p>
    </div>
</body>

</html>
