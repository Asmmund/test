<?php
/**
 * @author Elmor
 * @copyright 2011
 */
    class HallView
    {
        private $hall;
        private $string;
        
        public function __construct($hall)
        {
            $this->hall = $hall;
        }
        
        public function DrawHall()
        {
            $this->DrawGrid();
            $this->DrawArrows();
            $this->FillGrid();
            return $this->string;
        }
        
        private function DrawArrows()
        {
            $this->string = "<img src='" . SITE_HOST . "skins/images/up_arrow.jpg' /><br />" .
                           "<img src='" . SITE_HOST . "skins/images/left_arrow.jpg' />"  .
                           $this->string . 
                           "<img src='" . SITE_HOST . "skins/images/right_arrow.jpg' /><br />" .
                          "<img src='" . SITE_HOST . "skins/images/down_arrow.jpg' />" ;
            
        }

        private function DrawGrid()
        {
            $this->string = '
                         <table border="2">';
            for($i=0; $i<$this->GetRows(); $i++)
            {
                $this->string .= '<tr>';
                for($j=0; $j <$this->GetNumber(); $j++)
                {
                    $this->string .= "<td height='60' width='65'><img src='" . SITE_HOST . "skins/images/empty_grid.jpg' /></td>";
                }
                $this->string .= '</tr>';
                
            }
                      
            $this->string .= '   </table>
                      ';
                      
        } 
        
        //function getting number of rows of the hall
        private function GetRows()
        {
            return 5;
        }
        
        //function getting number of chairs per row
        private function GetNumber()
        {
            return 6;
        }
        
        private function FillGrid()
        {
            
        }
    }    
?>