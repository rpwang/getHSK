<?php

$fh = fopen('example.txt','r');
while ($line = fgets($fh)) {
  // <... Do You work with the line ...>
echo "$line lalala<br />";
}
fclose($fh)



function parseFile(){
      $pattern='/(?<time>\d+)\s+(?<time_unit>\w+)\s+(?<direction>\w+)\s+(.*?)(?<rate>\d+)\s+(?<rate_unit>\w+)(.*?)(?<packets>\d+)/i';
       $lines = file('var/www/datakom/data.txt');
       $title = 'data';
       $json_data=array();
       foreach ($lines as $line_num => $line) {
         preg_match($pattern,$line,$result);
         $json_data[]=preg_grep_keys('/time|time_unit|direction|rate|rate_unit|packets/',$result);
       }
    return json_encode($json_data);
}

?>