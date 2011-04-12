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
    
    try{
        $connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS);
        echo 'Connected!';
    }
    catch(PDOException $e)
    {
    echo $e->getMessage();
    }
    
    
      
?>