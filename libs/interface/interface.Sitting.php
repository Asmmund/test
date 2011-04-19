<?php
/**
 * @author Elmor
 * @copyright 2011
 * interface represents sitting place (chair)
 * @method public __get($variable) - returns the variable on query
 * @method Draw() - returns a picture of the chair with correct titile
 * @method Load() - load place params
 */
  interface Sitting
  {
    public function __set($variable,$value);
    public function __isset($name);
    public function __get($variable);
    public function Draw();
    public function Load($r,$number, $hallid);
  }

?>