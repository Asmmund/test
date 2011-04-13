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
     
/**
 * @author Elmor
 * @copyright 2011
 * function for forming GET links  ;) 
 * @param params to set
 * @return Link..
 * 
 * works with Cruft Free URLs or without it
*/


  function href()  
   {  
        

//we call $GET - an array, formed before, a global - accesseble from outside        
       global $GET;    
       
// create a buffer array not to affect global array.       
       $tmp = $GET;     
       
// create an empty output 
       $href = '';  
       
// prepare the output of the function
// IF it's part of the site- write to where it's set here..
       $host = SITE_HOST; 
         
// get an array comprising arguments of the function. 
       $arg = func_get_args(); 

// If the first element is an array, then we set the first element as a first element of the array
       if(is_array($arg[0])) 
           $arg = $arg[0];      

        
//if the beggining argument is  host, than we return with site host!
       if($arg[0] == 'host')  
           return SITE_HOST . $href;  
                      
// work with $arg array, go through it etc...            
        foreach($arg as $var)     
        {  
//devide the name & the meaning of param                
            $param = explode('=', $var);   
           
 // if there ara a key(previous line) in $tmp array, then we set this value    
// else the error message is outputted!                          
            if(array_key_exists($param[0], $tmp))  
                $tmp[$param[0]] = $param[1];    
            else  
                die('The variable <b class=imp>'. $param[0] .'</b> is not defined');    
        }  
          

// based on what Kind of links we must get...
//we return tha appropriate link - cruft free urls or not...               
        foreach($tmp as $var => $val)   
           if(SITE_REWRITE == 'on')   
              $href .= '/'. $val;         
           elseif(!empty($val))  
              $href .= '&'. $var .'='. $val;  


// clear the final links from the symblols                    
       if(SITE_REWRITE == 'on')  
           return $host . trim($href, '/');  
       else  
           return $host .'?'. trim($href, '&');         
   }
   
   
/**
 * @author Elmor
 * @copyright 2011
 * function for of redirecting pages... ;) 
 * @param page to be redirected to!
 * @return Link..
 * 
 * uses href() function & is allmost identical to it
*/ 
    function reDirect()
    {
// getting array of arguments of the function!        
        $arguments = func_get_args();
        
// if there are arguments of the function
// then to to the target destination & exit from work of skript        
        if( count($arguments) )
        {
            header('location: '. href($arguments) );
            exit();
        }
/* if there are no args, then we go to the page where we came from*/        
        else
        {
            header('location: '.str_replace('/index.php', '', $_SERVER['HTTP_REFERER']) );
            exit();
        }
        
    }  
   

?>