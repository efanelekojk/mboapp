<?php
$time1=microtime(true);
$folderRoot='webfile';
$GLOBALS['filehexlist']='';
filelist($folderRoot);
file_put_contents('filecrc32.txt',$GLOBALS['filehexlist']);
echo "time: ".intval((microtime(true)-$time1)*1000)." ms\r\n";
?>
<?php
function filelist($folderRoot,$folder=''){
	$handle=opendir($folderRoot.'/'.$folder);
	while($file=readdir($handle)){
		if(is_dir($folderRoot.'/'.$folder.'/'.$file)){
			if($file=='.'||$file=='..'){
			}else{
				$p=$file;
				if($folder>'')$p=$folder.'/'.$p;
				filelist($folderRoot,$p);
			}
		}else{
			$filehex=$folder.'/'.$file."\t".crc32_file3($folderRoot.'/'.$folder.'/'.$file);
			$GLOBALS['filehexlist'].=$filehex."\r\n";
		}
	}
}
function crc32_file3($filename){
	$str=crc32(file_get_contents($filename));
	$str=str_pad(dechex($str),8,'0',STR_PAD_LEFT);
	return($str);
}
function crc32_file2($filename){
	return(dechex(crc32_file($filename)));
}
function crc32_file($filename)
{
   $f = @fopen($filename,'rb');
   if (!$f) return false;
   
   static $CRC32Table, $Reflect8Table;
   if (!isset($CRC32Table))
   {
      $Polynomial = 0x04c11db7;
      $topBit = 1 << 31;
       
      for($i = 0; $i < 256; $i++) 
      { 
         $remainder = $i << 24;
         for ($j = 0; $j < 8; $j++)
         {
            if ($remainder & $topBit)
               $remainder = ($remainder << 1) ^ $Polynomial;
            else $remainder = $remainder << 1;
         }
         
         $CRC32Table[$i] = $remainder;
         
         if (isset($Reflect8Table[$i])) continue;
         $str = str_pad(decbin($i), 8, '0', STR_PAD_LEFT);
         $num = bindec(strrev($str));
         $Reflect8Table[$i] = $num;
         $Reflect8Table[$num] = $i;
      }
   }
   
   $remainder = 0xffffffff;
   while ($data = fread($f,1024))
   {
      $len = strlen($data);
      for ($i = 0; $i < $len; $i++)
      {
         $byte = $Reflect8Table[ord($data[$i])];
         $index = (($remainder >> 24) & 0xff) ^ $byte;
         $crc = $CRC32Table[$index];
         $remainder = ($remainder << 8) ^ $crc;
      }
   }
   
   $str = decbin($remainder);
   $str = str_pad($str, 32, '0', STR_PAD_LEFT);
   $remainder = bindec(strrev($str));
   return $remainder ^ 0xffffffff;
}
?>
