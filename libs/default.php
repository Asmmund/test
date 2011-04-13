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
     

?>