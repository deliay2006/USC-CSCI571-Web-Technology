<html>
<head>
    <link href="/css/hw4.css" rel="stylesheet">
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="/scripts/hw4.js"></script>
    <script>
        $(document).ready(customerLoginPageReady);
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>

<body>
    <nav class="navigationBar">
        <div class="container">
            <div>
                <a class="navigationHome" href="#">Home</a>
            </div>
            <div>
                <ul class="navigation">
                    <li>
                        <a href="http://cs-server.usc.edu:10211/CodeIgniter/index.php/CustomerLogin">Login</a>
                    </li>
                    <li>
                        <a onClick="signUp()">Register an Account</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container" id="pageContainer">
    <form name="loginForm" id="loginForm" method="POST">
        <header class="pageHeader">
            <h1 style="text-align:center;">A Warm Welcome!</h1>
            <p>Welcome to Delia's chocolate shop. Here we have all kinds of chocolates from different countires and different brands.</p>
           
            <p>
            <label>Username:</label>
            <input type="text" class="input" id="username" name="username" size="30"/>
        </p><p>
            <label>Password:</label>
            <input type="password" class="input" id="password" name="password" size="30"/>
            </p>
            <p><label id="errorMsg" class="errorMsg"></label></p>
            <p><label id="loading" style="display:none;">Loading...</label></p>
            <p>
            <a class="loginButton" onClick="signUp()">Sign Up</a>
            <a class="loginButton" onClick="login(true)">Login</a>
            </p>

            <div id="advertisments" style="display:inline-block;width: 100%;color: purple;">
            </div>
        </header>
        <p style="text-align:center;">Copyright &copy; Delia's Chocolate Shop 2015</p>
    </form>
    </div>
</body>

</html>
