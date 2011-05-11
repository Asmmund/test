<?php
/**
 * @author Elmor
 * @copyright 2011
 * MySql PDO
 */
/**
 * chesking the passkey ;)
*/
    if( !defined('SITE_KEY') )
    {
        header('./101 404 Not Found');
        exit( file_get_contents(SITE_ROOT . '404.html') );
    }
    
    try
    {
        if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
            throw new Exception('Error connecting to the Database!');
    }
    catch(PDOException $e)
    {
        echo '<b>' . $e->getMessage() . '</b>';
    }
    
    
      
?>