<?php
/**
 * @author Elmor
 * @copyright 2011
 */
       private function DrawGrid()
        {
            $this->string = '<div>
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
                      </div>';
                      
        } 
?>