<?php
/**
 * Website's configuration file
 * @author Elmor
 * @copyright 2011
 */
/**
 * chesking the passkey ;)
*/
    if( !defined('SITE_KEY') )
    {
        header('./101 404 Not Found');
        exit( file_get_contents(SITE_ROOT . '404.html') );
    }
   



/** ////////////////////////////////////////////////////////////////////////////////////////////////
 * switching on the CRAFT FREE URL's
 * used in $GET and so on...
//////////////////////////////////////////////////////////////////////////////////////////////// */
    define('SITE_REWRITE','on');
    
    
    

/** //////////////////////////////////////////////////////////////////////////////////////////////// 
 * setting the const for use in require & so on . .. 
 /////////////////////////////////////////////////////////////////////////////////////////////////// */    
    //establishing a physical path to the root of the server
    define( 'SITE_ROOT', str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) .'/' )  ;      
    
    // establishing the root of the site for HTTP
     define('SITE_HOST', 'http://'. $_SERVER['HTTP_HOST'] .'/' );
     
/** //////////////////////////////////////////////////////////////////////////////////////////////// 
 *  MySql settings
 /////////////////////////////////////////////////////////////////////////////////////////////////// */
    define('MYSQL_SERVER', 'localhost');
 
    define('MYSQL_USER', 'root');

    define('MYSQL_PASS', '');

    define('MYSQL_DB', 'outsourcing');
    

     
?>