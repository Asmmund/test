<?php
/**
 * @author Elmor
 * @copyright 2011
 * AJAX MySql PDO
*/
    //define const to grand  access only through index.php
    define('SITE_KEY', true);
    
    // connecting to the config file
    require_once '../../../config.php';
      
    //using PDO to connect to MySql
    //try{}catch(){} block
    try
    {
        if(!$connect = new PDO('mysql:host=' . MYSQL_SERVER . ';dbname=' . MYSQL_DB,MYSQL_USER, MYSQL_PASS))
            throw new Exception('Error connecting to the Database!');
    }
    catch(PDOException $e)
    {
    echo $e->getMessage();
    }
?>