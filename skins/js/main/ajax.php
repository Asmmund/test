<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    define('SITE_KEY', true);
    require_once '../../../config.php';
    require_once SITE_ROOT . 'libs/default.php';

    $hallid = $_POST['hallid'];
    $action = $_POST['action'];
    $params = $_POST['params'];
    
    HallEditor::seatEditorAjax($hallid,$action, $params);
    
?>