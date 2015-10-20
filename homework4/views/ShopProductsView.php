<html>
<head>
    <link href="/css/hw4.css" rel="stylesheet">
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="/scripts/hw4.js"></script>
    <script>
        $(document).ready(shopProductsPageReady);
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
    <nav class="navigationBar">
        <div class="container">
            <div>
                <ul class="navigation">
                    <li>
                        <a href="http://cs-server.usc.edu:10211/CodeIgniter/index.php/ListCart">Shopping Cart</a>
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
            <h1 style="text-align:center;">Welcome to Shop with Us.</h1>
            <p>Use this page to order our products.</p>
            </div>

            <p><label id="errorMsg" class="errorMsg"></label></p>
            <p><label id="infoMsg" class="infoMsg"></label></p>
            <div id="alsoBought" class="alsoBought"></div>
            
            <div class="fillForm">
            <form name="filterForm" id="filterForm" method="POST">
            <input type="hidden" id="customerId" name="customerId"/>
            <p>
            <label>Category:</label></p><p>
            <select class="input" id="categorySelect" name="categorySelect" onChange="selectShopCategory()">
            </select>
            </p>
            <div id="advertisments" style="display:inline-block;width: 100%;color:purple;">
            </div>
            </form>
            </div> 

            <!-- list page-->
            <div id="listForm">
            <div id="loading" class="loading">Loading...</div>
            <form name="listForm" id="lForm" method="POST">
            <input type="hidden" id="productId" name="productId"/>
            <input type="hidden" id="price" name="price"/>
            <input type="hidden" id="quantity" name="quantity"/>
            <input type="hidden" id="productName" name="productName"/>
            <input type="hidden" id="productDesc" name="productDesc"/>
            <div id="shopProducts" class="shopProducts">

            </div>
            </form>
            </div>

        </header>
        <p style="text-align:center;">Copyright &copy; Delia's Chocolate Shop 2015 <a href="" onclick="logout()">logout</a></p>
    </div>
</body>

</html>
