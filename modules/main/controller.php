<?php
/**
 * @author Elmor
 * @copyright 2011

 * @module main
 * @file controller.php
 * controller of the main module
 */
/**
 * chesking the passkey ;)
*/
    if( !defined('SITE_KEY') )
    {
        header('./101 404 Not Found');
        exit( file_get_contents(SITE_ROOT . '404.html') );
    }
    
    //chair tryouts
    $chair = new Chair(10,0,'ready','Testing Chair');
    $chair->row = ' 0';
    echo $chair->labelfds;
    
    $row = new chairRow(5,'First','row', 'first row');

    $area = new rowArea(5,5,'special', 'first area');
    
?>