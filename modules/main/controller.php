<?php
/**
 * @author Elmor
 * @copyright 2011

 * @module main
 * @file controller.php
 * controller of the main module
*/

    $params['x']  = 100;
    $params['y'] = 100;
    $params['row']  = '22';
    $params['number']  = '55';
    $params['delimiter']  = '/';
    $params['categoryID']  = 2;
    $params['id'] = 7;
    $params['name'] = 'ASD';
    $params['seatcolor'] = 'violet';
    

    $params['label']  = '!2222222222222222222222222222';
    $params['selected'] = '120,121';
    $hallid = 1;
    
    
    
   

 
/**
 * chesking the passkey ;)
*/
    if( !defined('SITE_KEY') )
    {
        header('./101 404 Not Found');
        exit( file_get_contents(SITE_ROOT . '404.html') );
    }
    
    
    
    $halleditor = new HallEditor;

?>