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
    
    
    
    $halleditor = new HallEditor;

    $params['x']  = 100;
    $params['y'] = 100;
    $params['label']  = '123';
    $params['row']  = '22';
    $params['number']  = '55';
    $params['delimiter']  = '/';
    $params['categoryID']  = 1;
    $params['id'] = 54;
    

    

    
?>