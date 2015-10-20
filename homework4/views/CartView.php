<html>
<head>
    <link href="/css/hw4.css" rel="stylesheet">
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="/scripts/hw4.js"></script>
    <script>
        $(document).ready(cartPageReady);
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
                        <a href="http://cs-server.usc.edu:10211/CodeIgniter/index.php/ListOrders">My Orders</a>
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
            <div id="addPage">
            <h1 style="text-align:center;">Your Shopping Cart</h1>
            <p>Use this page to view, edit or delete items in your shopping cart.</p>
            </div>
            
            <p><input type="button" class="deleteAllButton" onClick="clearShoppingCart()" value="Delete All"/></p>
            <p><label id="errorMsg" class="errorMsg"></label></p>
            <p><label id="infoMsg" class="infoMsg"></label></p>

            <!-- list page-->
            <div id="listForm">
            <div id="loading" class="loading">Loading...</div>
            <form name="listForm" id="lForm" method="POST">
            <input type="hidden" id="productId" name="productId"/>
            <input type="hidden" id="quantity" name="quantity"/>
            <div id="shopProducts" class="shopProducts">

            </div>
            </form>
            </div>
            <p><input type="button" class="deleteAllButton" onClick="addOrder()" value="Place Order"/></p>

        </header>
        <p style="text-align:center;">Copyright &copy; Delia's Chocolate Shop 2015</p>
    </div>
</body>

</html>
