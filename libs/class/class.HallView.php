<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    class HallView
    {
        private $hall;
        private $string;
        public $x = 0;
        public $y = 0;
        

        
        public function __construct(Hall $hall)
        {
            $this->hall = $hall;
            $this->getMax();
        }

        private function getMax()
        {
            foreach($this->hall->seats as $seat)
            {
                if($seat ->x > $this->x )
                    $this->x = $seat ->x;
                    
                if($seat->y > $this->y)
                    $this->y = $seat->y;
            }
        }
        
        public function DrawHall()
        {
            $this->DrawGrid();
            $this->DrawArrows();
            return $this->string;
        }
        

        private function DrawArrows()
        {
            $this->string = ' 
                                 <div id="up_arrow">
                                     <img src="' . SITE_HOST . 
                                         'skins/images/up_arrow.jpg" width="75" height="42" />
                                  </div> <br />
                                  
                                 <div id="left_arrow" >
                                     <img  src="' . SITE_HOST . 
                                         'skins/images/left_arrow.jpg"  width="42" height="75" />
                                 </div>' . 
                                 $this->string . 
                                 '<div id="right_arrow" style="">
                                     <img  src="' . SITE_HOST . 
                                         'skins/images/right_arrow.jpg" width="42" height="75" />
                                 </div><br />
                                         
                                <div id="down_arrow" style="">
                                    <img src="' . SITE_HOST . 
                                        'skins/images/down_arrow.jpg" width="75" height="42" />
                                </div>
                             </div>';
        }


        private function DrawGrid()
        {
            $this->string = '<div id="grid" >
                                <table id="table">';
            //go through each row of the hall
            for($i=1; $i<=$this->x; $i++)
            {
                $this->string .='<tr>';
                
                //go through each place & deside is it empty or not...
                for($j=1; $j <=$this->y;$j++)
                {
                    $this->string .= '<td>';

                    if($seat = $this->getSeat($i,$j))
                        $this->string .= $this->drawSeat($seat);
                    else
                        $this->string .= '<img class="seat" src="' . SITE_HOST . 'skins/images/empty_chair.jpg" 
                                           alt="'.$i .'|' . $j . '" />';

                    $this->string .= '</td>';
                }
                $this->string .= '</tr>';
            }
            $this->string .= '  </table>
                            </div>';
        }
        
        private function getSeat($x,$y)
        {
            foreach($this->hall->seats as $seat)
            {
                if( ($seat->x == $x) && ($seat->y == $y) )
                    return $seat;
                
                
            }
            return false;
            
        }
        
        private function drawSeat( $seat)
        {
            $image = '<img  class="seat" id="' .$seat->seatID . '"
                      src="' . SITE_HOST .  'skins/images/green_chair.jpg" title="Seat:'
                      . $seat->row .$seat->delimiter . $seat->number .' L:' . $seat->label . '"
                      title="Seat:'. $seat->row .$seat->delimiter . $seat->number .' L:' . $seat->label . '" 
                      alt="' . $seat->hallid . '" />';
            
            return $image;
            
        }
         
        private function FillGrid()
        {
            
        }
        

        
    }    
?>