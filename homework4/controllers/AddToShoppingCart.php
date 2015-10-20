<?php
    class AddToShoppingCart extends CI_Controller {
        public function __construct() {
            parent::__construct();

            session_save_path("/home/scf-33/juncheny");
            session_start();
            
            $GLOBALS['errorMsg'] = "";
            $sessionTime = $_SESSION['ACCESSTIME'];
            $t = time();

            if($sessionTime!=null && $t - $sessionTime > 1200) {
                $GLOBALS['errorMsg'] = "TIMEOUT";
                $_SESSION['ACCESSTIME'] = null;
                $_SESSION['ACCESSTIME'] = null;
                $_SESSION['USERID'] = null;
                $_SESSION['USERTYPE'] = null;
                $_SESSION['CUSTOMERID'] = null;
            } else {
                $type = $_SESSION['USERTYPE'];
                if($type."" != "4" ) {
                    $GLOBALS['errorMsg'] = "NOPERMISSION";
                }
            }
        }

        public function index() {
            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }

            $productId = htmlentities($_POST['productId']);
            $price = htmlentities($_POST['price']);
            $quantity = htmlentities($_POST['quantity']);
            $name = htmlentities($_POST['productName']);
            $desc = htmlentities($_POST['productDesc']);

            if(empty($productId) || !is_numeric($productId)) {
                $GLOBALS['errorMsg'] = "The product Id is invalid.";
            }

            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }

            $row = array("productId"=>$productId, "price"=>$price, "quantity"=>$quantity, "productName"=>$name, "productDesc"=>$desc);
            if(!$_SESSION['CARTS']) {
                $_SESSION['CARTS'] = array($row);
            } else {
                $alreadyInArray = false;
                for($i=0; $i<count($_SESSION['CARTS']); $i++) {
                    if($_SESSION['CARTS'][$i]['productId'] == $productId) {
                        $_SESSION['CARTS'][$i]['quantity']+=$quantity;
                        $alreadyInArray = true;
                    }
                }
                if(!$alreadyInArray) {
                    array_push($_SESSION['CARTS'], $row);
                }
            }//added to cart

            $this->load->model('Ads_model', 'model');
            $result = $this->model->index($productId);
            $this->load->view('AjaxResponseView', array("data"=>$result));
        }
    }
?>