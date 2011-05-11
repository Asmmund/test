<?php
/**
 * chesking the passkey ;)
*/
    if( !defined('SITE_KEY') )
    {
        header('./101 404 Not Found');
        exit( file_get_contents(SITE_ROOT . '404.html') );
    };


/** //////////////////////////////////////////////////
 
 * function of removing the 'magic' quotes
 * @param array to be cleared of slashes
 * @return array cleared of slashes
   
////////////////////////////////////////////////// */
    function stripslashesDeep( $data)
    {
        return is_array($data) ? array_map( 'stripslashesDeep', $data) : stripslashes($data) ;
    }    
    
/** using this function */
    if( get_magic_quotes_gpc())
    {
        $_POST = stripslashesDeep($_POST);
        $_COOKIE = stripslashesDeep($_COOKIE);
    };    
    





/////////////////////////////////////////////////////





/** /////////////////////////////////////////////
 *         Array of $_POST params 
 * Rermember - value1 etc 
///////////////////////////////////////////// */
$POST = array (
               'value1' => '',
               'value2' => '',
               'value3' => '',
               
               'array1' => array(),
               'array2' => array(),
               'array3' => array()
               );
               
               
/** ////////////////////////////////////////////////
 * Getting $_POST params
//////////////////////////////////////////////// */
// if the $_POST['form']  exists, then we
if( !empty( $_POST['form'] ))
    $POST = array_merge( $_POST['form'], array_diff_key($POST, $_POST['form']) );





/** ///////////////////////////////////////////////////////////////////
 *                            Buttons
/////////////////////////////////////////////////////////////////// */
$ok = !empty( $_POST['ok'] ) ? true : false;
$delete = !empty( $_POST['delete'] ) ? true : false;

////////////////////////////////////////////////////////////////////////////////////

/** /////////////////////////////////////////////
 *         Other variables
///////////////////////////////////////////////*/

?>