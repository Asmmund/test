<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    
    // Report all PHP errors
    error_reporting(-1);
    
    //define const to grand  access only through index.php
    define('SITE_KEY', true);
    
    //set the default encoding for usage in mb_ functions
    mb_internal_encoding("UTF-8");
    
    /** /////////////////////////////////////////////////
     *  requiring files (may be switched later on to include)
     *  Begin
    ///////////////////////////////////////////////// */ 
    //requesting the config.php - file with configuration
    require 'config.php';
    
    // variables: get, post, forms &etc
    require SITE_ROOT . 'variables.php';

    
    
    //default variables 
    require SITE_ROOT . 'libs/default.php';
    
    //pdo object
    require SITE_ROOT . 'libs/mysql.php';
    
    
    
    
    
    
    
    
    
    
    
    
    
    /** /////////////////////////////////////////////////
     *  End
    ///////////////////////////////////////////////// */ 
    // start of buffering of the output
    //so headers can be passed
    ob_start();
    
    
    // getting the output & cleaning the buffer    
    $content = ob_get_contents();
    ob_end_clean(); 
    
    
    // the default skin of index.php
    require_once SITE_ROOT . 'skins/tpl/index.tpl';
?>