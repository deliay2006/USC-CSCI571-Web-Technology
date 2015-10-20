<?php
    if($data == "success") {
        echo "success";
    } else if($data == "TIMEOUT" || $data == "NOPERMISSION") {
        echo $data;
    } else if(is_string($data)){
        echo $data;
    } else {
        echo json_encode($data);
    }
?>