<?php
/**
 * @author Elmor
 * @copyright 2011

 * @module main
 * @file controller.php
 * controller of the main module


    $params['x']  = 100;
    $params['y'] = 100;
    $params['label']  = '123';
    $params['row']  = '22';
    $params['number']  = '55';
    $params['delimiter']  = '/';
    $params['categoryID']  = 1;
    $params['id'] = 7;
    $params['name'] = 'ASD';
    $params['seatcolor'] = 'violet';
    $params['array_id'][] = 75;
    $params['array_id'][] = 73;
    $params['array_id'][] = 74;
    
    
   // SeatRepository::updateCategory($params);
   // SeatRepository::deleteSeats($params);

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

?>