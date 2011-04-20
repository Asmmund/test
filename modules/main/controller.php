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
    
    
    //hall object
    $hall = new Hall(1);
    
    $halleditor = new HallEditor;
    
    $params['x']  = 100;
    $params['y'] = 100;
    $params['label']  = 'Inserted by HallEditor';
    $params['row']  = 11;
    $params['number']  = 11;
    $params['delimiter']  = '/';
    $params['categoryID']  = 1;
   // $halleditor->seatEditorAjax(1,'addchair',$params);
   
    
    

    

    
?>