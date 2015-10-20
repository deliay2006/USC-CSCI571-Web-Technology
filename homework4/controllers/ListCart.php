<?php	

    class ListCart extends CI_Controller {
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
            $this->load->view('CartView');
        }

        public function listCart() {
            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }

            $this->load->view('AjaxResponseView', array("data"=>$_SESSION['CARTS']));
        }

        public function clearShoppingCart() {
            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }
            $_SESSION['CARTS']=null;
            $this->load->view('AjaxResponseView', array("data"=>"success"));
        }//clear Shopping Cart

        public function removeItemFromCart($productId) {
            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }

            $productId = htmlentities($productId);

            if(empty($productId) || !is_numeric($productId)) {
                $GLOBALS['errorMsg'] = "The product Id is invalid.";
            }

            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }
        
            $row = array("productId"=>$productId, "price"=>$price, "quantity"=>$quantity, "productName"=>$name, "productDesc"=>$desc);
            if($_SESSION['CARTS']) {
                for($i=0; $i<count($_SESSION['CARTS']); $i++) {
                    $row = $_SESSION['CARTS'][$i];
                    if($row['productId'] == $productId) {
                        $_SESSION['CARTS'][$i]=null;
                    }
                }
            }
            $this->load->view('AjaxResponseView', array("data"=>"success"));
        }//removeItemFromCart

        public function updateQuantityInCart($productId, $quantity) {
            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }

            $productId = htmlentities($productId);
            $quantity = htmlentities($quantity);
            if(empty($productId) || !is_numeric($productId)) {
                $GLOBALS['errorMsg'] = "The product Id is invalid.";
            }

            if(empty($quantity) || $quantity<0 || $quantity>100) {
                $GLOBALS['errorMsg'] = "The quantity has to larger than 0 and smaller than 100.";
            }

            if(strlen($GLOBALS['errorMsg']) > 0) {
                $this->load->view('AjaxResponseView', array("data"=>$GLOBALS['errorMsg']));
                return;
            }
    
            if($_SESSION['CARTS']) {
                for($i=0; $i<count($_SESSION['CARTS']); $i++) {
                    $row = $_SESSION['CARTS'][$i];
                    if($row['productId'] == $productId) {
                        $_SESSION['CARTS'][$i]['quantity'] = $quantity;
                    }
                }
            }
            $this->load->view('AjaxResponseView', array("data"=>"success"));
        }//updateQuantityInCart
    }//class
?>