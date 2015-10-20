<html>
<head>
    <link href="/css/hw4.css" rel="stylesheet">
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="/scripts/hw4.js"></script>
    <script>
        $(document).ready(orderReportsPageReady);
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
    <nav class="navigationBar">
        <div class="container">
            <div>
                <ul class="navigation">
                    <!-- <li>
                        <a href="http://cs-server.usc.edu:10211/pages/reports.html">Products Report</a>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>

    <div class="container" id="pageContainer">
        <header class="pageHeader">
            <div id="viewProduct">
            <h1 style="text-align:center;">View Sales Report</h1>
            <p>Use this page to view sales and orders report of our company.</p>
            </div>

            <p><label id="errorMsg" class="errorMsg"></label></p>
            <p><label id="infoMsg" class="infoMsg"></label></p>
            
            <!-- view sale report options-->
            <div class="fillForm" id="orderReport">
            <form name="orderReportForm" id="orderReportForm" method="POST">
            <p>
            <label>Start Date(MM-DD-YYYY):</label></p><p>
            <input type="text" class="input" id="startDate" name="startDate" size="30"/>
            <input type="hidden" id="startdate" name="startdate"/>
            </p>
            <p>
            <label>End Date(MM-DD-YYYY):</label></p><p>
            <input type="text" class="input" id="endDate" name="endDate" size="30"/>
            <input type="hidden" id="enddate" name="enddate"/>
            </p>
            <p>
            <label>Report of:</label></p><p style="width: 55%;">
            <input type="radio" class="radio" name="reportGroupRadio" value="product" checked/>
            <label>Product</label>

            <input type="radio" class="radio" name="reportGroupRadio" value="productCategory"/>
            <label>Product Category</label>

            <input type="radio" class="radio" name="reportGroupRadio" value="sales"/>
            <label>Special Sales</label>
            </p>

            <p></p>
            <p>
            <select class="input" id="categorySelect" name="categorySelect">
            </select>
            </p>
        
            <p>
            <label>Number of:</label></p><p style="width: 55%;">
            <input type="radio" class="radio" name="noGroupRadio" value="quantity" checked/>
            <label>Quantity Sold</label>

            <input type="radio" class="radio" name="noGroupRadio" value="price"/>
            <label>Price (Sales in $)</label>
            </p>

            <p>
            <label>Sort Order:</label></p><p style="width: 55%;">
            <input type="radio" class="radio" name="orderRadio" value="ASC"/>
            <label>Ascending</label>

            <input type="radio" class="radio" name="orderRadio" value="DESC" checked/>
            <label>Desending</label>
            </p>

            <!-- <input type="radio" class="radio" name="orderRadio" value="totalSales"/> -->
            <p></p>
            <p><a class="loginButton" style="width: 100%;margin:0;" onClick="viewOrderReport(true)">View Total Sales</a></p>
            <input type="hidden" name="totalSale" id="totalSale" value="0"/>
            
            </form><!-- end of order report form-->
            <p></p>
            <p><a class="loginButton" style="margin-top:50px;" onClick="viewOrderReport()">View Sales Report</a>
            </p>
            </div>
            
            <!-- result list page-->
            <div id="searchResult" style="display:block;">
            <table id="searchResultRows" class="reportTable">
            <!-- <tr><th>Product Id</th><th>Product Name</th><th>Category</th><th>Description</th><th>Price $</th></tr> -->
            </table>
            <div id="loadingInSearchResult" class="loading" style="display:none">Loading...</div>
            </div>

        </header>
        <p style="text-align:center;">Copyright &copy; Delia's Chocolate Shop 2015</p>
    </div>
</body>

</html>
