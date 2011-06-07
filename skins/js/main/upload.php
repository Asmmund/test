<?php
    //establishing a physical path to the root of the server
    require_once '../../../config.php';      

$uploaddir = SITE_ROOT . 'upload/' ;
$uploadfile = $uploaddir . basename($_FILES['file']['name']);
if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
    echo '{"success":"true","filename":"'.$_FILES['file']['name'].'"}';
} else {
    echo "Possible file upload attack!n";
}
?>