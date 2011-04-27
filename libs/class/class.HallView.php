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
        private $table;
        const MIN_X = 10;
        const MIN_Y = 10;

        
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


        public function DrawGrid()
        {
            $this->string = '<div id="grid" >
                                <table id="table">';
            $this->table = '';
            //find out how many rows and cols are there at all
            $used_x = ($this->x > self::MIN_X)?$this->x: self::MIN_X;
            $used_y = ($this->y > self::MIN_Y)?$this->y: self::MIN_Y;
            
            
            //go through each row of the hall
            for($i=1; $i<=$used_x; $i++)
            {
                $this->table.='<tr>';
                
                //go through each place & deside is it empty or not...
                for($j=1; $j <=$used_y;$j++)
                {
                    $this->table .= '<td>';

                    if($seat = $this->getSeat($i,$j))
                        $this->table .= $this->drawSeat($seat);
                    else
                        $this->table .= '<img class="seat" src="skins/images/empty_chair.jpg" 
                                           title="'.$i .'|' . $j . '" alt="'. $this->hall->hallid . '" />';

                    $this->table .= '</td>';
                }
                $this->table .= '</tr>';
            }
             $this->string .= $this->table . '  </table>
                            </div>';
             
             return $this->table;
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
                      src="skins/images/green_chair.jpg" 
                      title="'. $seat->x .'|'. $seat->y .' L:' . $seat->label . '" 
                      alt="' . $seat->hallid . '" />';
            
            return $image;
            
        }
         
        private function FillGrid()
        {
            
        }
        

        
    }    
?>