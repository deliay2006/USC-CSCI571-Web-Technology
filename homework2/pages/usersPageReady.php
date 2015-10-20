<?php
    require 'sessionTime.php';
    require 'sessionAdmin.php';
    if(strlen($errorMsg)>0) {
        echo $errorMsg;
        return;
    }
?>