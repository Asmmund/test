<?php
/**
 * Default funcitons & etc
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
 * setting __autoload function 
 /////////////////////////////////////////////////////////////////////////////////////////////////// */
     function __autoload($className)
     {
        if(file_exists( SITE_ROOT . 'libs/class/class.' . $className . '.php'))
        {
            require SITE_ROOT . 'libs/class/class.' . $className . '.php';
            return true;
        }
        elseif(file_exists( SITE_ROOT . 'libs/interface/interface.' . $className . '.php'))
        {
            require SITE_ROOT . 'libs/interface/interface.' . $className . '.php';
            return true;
            
        }
        else
            die('Class <b>' . $className . '</b> couldn\'t be autoloaded!');
     }        
     
  

?>