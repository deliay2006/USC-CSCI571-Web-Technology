<?php
    class AddProfile extends CI_Controller {
        public function __construct() {
            parent::__construct();
        }

        public function index() {
            $this->load->view('ProfileView');
        }

        public function addProfile() {
            $un = htmlentities($_POST['username']);
            $pw = htmlentities($_POST['password']);
            $fn = htmlentities($_POST['firstname']);
            $ln = htmlentities($_POST['lastname']);
            $age = htmlentities($_POST['age']);
            $gender = htmlentities($_POST['gender']);
            $type = 4;
            $card = htmlentities($_POST['creditCard']);
            $code = htmlentities($_POST['securityNo']);
            $month = htmlentities($_POST['month']);
            $year = htmlentities($_POST['year']);
            $address = htmlentities($_POST['address']);
            $billing = htmlentities($_POST['bAddress']);
        
            $errorMsg = "";
            if(strlen($un) == 0) {
                $errorMsg = "Username cannot be empty.";
            }
            if(strlen($pw) == 0) {
                $errorMsg = "Password cannot be empty";
            }
            if(!$gender) {
                $errorMsg = "Must select a gender.";
            }
            if(!empty($age)) {
                if(!is_numeric($age)||$age<10||$age>100) {
                    $errorMsg = "Invalid age.";
                }
            } else {
                $age = 0;
            }
            if(!empty($salary)) {
                if(!is_numeric($salary)||$salary<100||$salary>100000000) {
                    $errorMsg = "Invalid salary.";
                }
            } else {
                $salary=0;
            }

            if(!empty($card)) {
                if(!is_numeric($card) || strlen($card) != 16) {
                    $errorMsg = "Invalid Credit Card Number.";
                }
            } else if(!empty($code)) {
                $errorMsg = "Please inupt the credit card number.";
            }

            if(!empty($card)) {
                if(!empty($code)) {
                    if(!is_numeric($code) || strlen($code) != 3) {
                        $errorMsg = "Invalid Security Code.";
                    }
                } else {
                    $errorMsg = "Please inupt the security code for your credit card.";
                }
            }

            if(strlen($errorMsg)>0) {
                echo $errorMsg;
                return;
            }

            if($gender == "male") {
                $gender = 1;
            } else {
                $gender = 2;
            }
            
            $params = array("password"=>$pw, "username"=>$un, "firstname"=>$fn, "lastname"=>$ln,
                            "age"=>$age, "gender"=>$gender, "type"=>$type, "card"=>$card,
                            "code"=>$code, "month"=>$month, "year"=>$year, "address"=>$address,
                            "billing"=>$billing);

            $this->load->model("Profile_model", "model");
            $result = $this->model->addProfile($params);
            $this->load->view('AjaxResponseView', array("data"=>$result));
        }//addProfile

        public function updateProfile() {
            $un = htmlentities($_POST['username']);
            $pw = htmlentities($_POST['password']);
            $fn = htmlentities($_POST['firstname']);
            $ln = htmlentities($_POST['lastname']);
            $age = htmlentities($_POST['age']);
            $gender = htmlentities($_POST['gender']);
            $card = htmlentities($_POST['creditCard']);
            $code = htmlentities($_POST['securityNo']);
            $month = htmlentities($_POST['month']);
            $year = htmlentities($_POST['year']);
            $address = htmlentities($_POST['address']);
            $billing = htmlentities($_POST['bAddress']);
        
            $errorMsg = "";
            if(strlen($un) == 0) {
                $errorMsg = "Username cannot be empty.";
            }
            if(strlen($pw) == 0) {
                $errorMsg = "Password cannot be empty";
            }
            if(!$gender) {
                $errorMsg = "Must select a gender.";
            }
            if(!empty($age)) {
                if(!is_numeric($age)||$age<10||$age>100) {
                    $errorMsg = "Invalid age.";
                }
            } else {
                $age = 0;
            }
            if(!empty($salary)) {
                if(!is_numeric($salary)||$salary<100||$salary>100000000) {
                    $errorMsg = "Invalid salary.";
                }
            } else {
                $salary=0;
            }

            if(!empty($card)) {
                if(!is_numeric($card) || strlen($card) != 16) {
                    $errorMsg = "Invalid Credit Card Number.";
                }
            } else if(!empty($code)) {
                $errorMsg = "Please inupt the credit card number.";
            }

            if(!empty($card)) {
                if(!empty($code)) {
                    if(!is_numeric($code) || strlen($code) != 3) {
                        $errorMsg = "Invalid Security Code.";
                    }
                } else {
                    $errorMsg = "Please inupt the security code for your credit card.";
                }
            }

            if(strlen($errorMsg)>0) {
                echo $errorMsg;
                return;
            }

            if($gender == "male") {
                $gender = 1;
            } else {
                $gender = 2;
            }

            $params = array("password"=>$pw, "username"=>$un, "firstname"=>$fn, "lastname"=>$ln,
                            "age"=>$age, "gender"=>$gender, "type"=>$type, "card"=>$card,
                            "code"=>$code, "month"=>$month, "year"=>$year, "address"=>$address,
                            "billing"=>$billing);

            $this->load->model("Profile_model", "model");
            $result = $this->model->updateProfile($params);
            $this->load->view('AjaxResponseView', array("data"=>$result));
        } 
    }
?>