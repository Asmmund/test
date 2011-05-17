<?php
/**
 * @author Elmor
 * @copyright 2011
 */

    define('SITE_KEY', true);
    require_once '../../../config.php';
    require_once SITE_ROOT . 'libs/default.php';
    
    $hall_id = (int) $_POST['hallid'];
    $hall = new Hall($hall_id);
    $hallview = new HallView($hall);
    echo $hallview->DrawGrid();
    
?>