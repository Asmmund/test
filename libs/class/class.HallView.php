<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    class HallView
    {
        private $hall;
        private $string;
        public $min_x = 1;
        public $max_x = 10;
        public $min_y = 1;
        public $max_y = 10;
        private $table;

        
        public function __construct(Hall $hall)
        {
            $this->hall = $hall;
            $this->getMinMax();
        }

        private function getMinMax()
        {
            foreach($this->hall->seats as $seat)
            {
                if($seat ->x > $this->max_x )
                    $this->max_x = $seat ->x;
                if($seat ->x < $this->min_x )
                    $this->min_x = $seat ->x;
                    
                if($seat ->y > $this->max_y )
                    $this->max_y = $seat ->y;
                if($seat ->y < $this->min_y )
                    $this->min_y = $seat ->y;
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
            $this->string = ' <div id = "content">
                                 <div id="up_div" >
                                     <img id="up_arrow" src="' . SITE_HOST . 
                                         'skins/images/up_arrow.jpg" width="75" height="42" title="Add one row to the beggining of the hall" />
                                  </div>
                                  
                                 <div id="left_div" >
                                     <img id="left_arrow"  src="' . SITE_HOST . 
                                         'skins/images/left_arrow.jpg"  width="42" height="75" title="Add one column to the beggining  of the hall" />
                                 </div>' . 
                                 $this->string . 
                                 '<div id="right_direction_div">
                                     <img id="right_arrow"  src="' . SITE_HOST . 
                                         'skins/images/right_arrow.jpg" width="42" height="75" title="Add one column to the end  of the hall" />
                                 </div>
                                         
                                <div id="down_div">
                                    <img id="down_arrow" src="' . SITE_HOST . 
                                        'skins/images/down_arrow.jpg" width="75" height="42" title="Add one row to the end  of the hall" />
                                </div>
                                </div>
                             </div>';
        }


        public function DrawGrid()
        {
            $this->string = '<div id="grid" >
                                <table id="table">';
            $this->table = '';
            //find out how many rows and cols are there at all
            
            
            //go through each row of the hall
            for($i= $this->min_x; $i<=$this->max_x; $i++)
            {
                $this->table.='<tr>';
                
                //go through each place & deside is it empty or not...
                for($j= $this->min_y; $j <=$this->max_y;$j++)
                {

                    if($seat = $this->getSeat($i,$j))
                        $this->table .= '<td id="' . $i . '_' . $j .'">'. $this->drawSeat($seat) . '</td>';
                    else
                        $this->table .= '<td id="' . $i . '_' . $j .'"><img class="seat" src="skins/images/seat/empty.jpg" 
                                           title="" alt="'. $this->hall->hallid . '" /></td>';

                }
                $this->table .= '</tr>';
            }
             $this->string .= $this->table . '  </table>
                            </div>';
             
             return $this->table. '  </table>
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
            $seat = '<img  class="seat" id="' .$seat->seatID . '"
                      src="skins/images/seat/' . $seat->color  . '.jpg" 
                      title="'. $seat->label  . '" 
                      alt="' . $seat->hallid . '" />';
            
            return $seat;
            
        }
         
        private function FillGrid()
        {
            
        }
        

        
    }    
?>