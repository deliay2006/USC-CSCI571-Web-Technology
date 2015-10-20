<?php
    require 'sessionTime.php';
    require 'sessionSales.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $pn = $_POST['productName'];
    $desc = $_POST['desc'];
    $price = $_POST['price'];
    $category = $_POST['categorySelect'];

    $errorMsg = "";
    if(strlen($pn) == 0) {
        $errorMsg = "Product name cannot be empty.";
    }

    if($category < 1) {
        $errorMsg = "Category cannot be empty.";
    }

    if(!empty($price)) {
        if(!is_numeric($price)||$price<0||$price>100000000) {
            $errorMsg = "Invalid price.";
        }
    } else {
        $price=0;
    }
    
    //file upload
    $image = "";
    if($_FILES["fileToUpload"]["name"] && strlen($_FILES["fileToUpload"]["name"])>0) {
        $target_dir = "productImages/";
    $target_file = $target_dir.basename($_FILES["fileToUpload"]["name"]);
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check == false) {
        $errorMsg = "File is not an image.";
    } 

    // Check if file already exists
    if (file_exists($target_file)) {
        $errorMsg = "Sorry, file already exists.";
    }

     // Check file size
    if ($_FILES["fileToUpload"]["size"] > 5000000) {
        $errorMsg = "Sorry, your file is too large.";
    }

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
        $errorMsg = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    }
    //end of file upload

    $image = "";
    if (!move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $errorMsg = "Sorry, there was an error uploading your file.";
    } else {
        $image = "/pages/productImages/".basename($_FILES["fileToUpload"]["name"]);
    }
    }

    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }

    $con = mysql_connect("cs-server.usc.edu:10212", "root", "");               
    if(!$con) {
        die("Connection failed: ".$con->connect_error);
    }
    mysql_select_db('homework', $con);

    $sql = "insert into PRODUCTS (PRODUCTNAME, PRODUCTDESC, CATEGORYID, PRICE, IMAGE) values ('".$pn."', '".$desc."', ".$category.", ".$price.", '".$image."')";
    $res = mysql_query($sql);
    if(!$res) {
        $errorMsg = "Database Issue.";
    }
    
    if(strlen($errorMsg) > 0) {
        echo $errorMsg;
        // echo $sql;
    } else {
    	echo "success";
    }
    mysql_close($con);
?>