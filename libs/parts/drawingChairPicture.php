<?php
/**
 * @author Elmor
 * @copyright 2011
 */
        protected function Image()
        {
            $image = '<img  class="chair_seat" id="' .$this->id . '"
                      src="' . SITE_HOST .  'skins/images/blue_chair.jpg" title="Seat:'
                      . $this->row .$this->delimiter . ''  . $this->number .' L:' . $this->label . '"
                      alt="Seat:'. $this->row .$this->delimiter . ''  . $this->number .' L:' . $this->label . '" />';
                      
            return $image;
        }
        
        public function Draw()
        {
            return $this->Image();
        }
        

?>