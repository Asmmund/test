<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    define('SITE_KEY', true);
    require_once '../../../config.php';
    require_once SITE_ROOT . 'libs/default.php';

    $hallid = (int)$_POST['hallid'];
    $action = $_POST['action'];
    $params = $_POST['params'];
    
 //   if($hallid>10)
   //     echo 'TRUE!';
//        echo '{"success":"true", "text":"Id >10"}';
    HallEditor::seatEditorAjax($hallid,$action, $params);
    
?>