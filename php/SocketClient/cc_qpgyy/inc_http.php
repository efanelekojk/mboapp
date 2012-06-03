<?php
function get_http_info($ip,$port,&$header,&$content,$isdebug=0){
	$header_input=$header;
	$execute_start=microtime(true);
	$accept='image/png,image/*;q=0.8,*/*;q=0.5';
	$accept='text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
	if(!isset($header_input['User-Agent']))$header_input['User-Agent']='Mozilla/5.0 (Windows NT 5.2; rv:10.0.2) Gecko/20100101 Firefox/10.0.2';
	if(!isset($header_input['Accept']))$header_input['Accept']=$accept;
	$language='zh-cn,zh;q=0.5';
	$language='zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3';
	if(!isset($header_input['Accept-Language']))$header_input['Accept-Language']=$language;
	if(!isset($header_input['Accept-Encoding']))$header_input['Accept-Encoding']='gzip, deflate';
	if(!isset($header_input['Connection']))$header_input['Connection']='keep-alive';
	if($isdebug>=2)echo("step1: start connect [$ip] ...\r\n");
	$fp=fsockopen($ip,$port);//199.36.73.39
	if($isdebug>=2)echo("step1: connect [$ip] ok!\r\n");
	if(!$fp){
		return(-1);//错误：无法连接
	}
	while(1){
		$execute_start=microtime(true);
		$data='GET '.$header_input['URI']." HTTP/1.1\r\n";
		foreach($header_input as $key=>$value){
			if($key!='URI')$data.="{$key}: {$value}\r\n";
		}
		$data.="\r\n";
		if(isset($header_input['Post'])){
		}
		if($isdebug>=3)print_r($data);
		//if($isdebug>=2)echo("step2: send ".strlen($data)." Byte ...\r\n");
		fwrite($fp,$data);
		if($isdebug>=2)echo("step2: sent ".strlen($data)." Byte ok!\r\n");
		//====已提交上去了！下面开始获取数据=========
		$header='';//初始化
		if($isdebug>=2)echo("step3: get header ...\r\n");
		while($line=fgets($fp)){
			if($line=="\r\n"){break;}
			$header.=$line;
			//echo $line;
		}
		if($isdebug>=2)echo("step3: get header ok!(".strlen($header)." Byte)\r\n");
		$header=explode("\r\n",$header);
		if($isdebug>=3)print_r($header);
		$header=getArrFromPreArr($header,': ',1);
		$content_length=intval($header['Content-Length']);
		$fread_length=1024;
		$content='';
		if($isdebug>=2)echo("step4: get content ...\r\n");
		if($content_length==0){
			while($line=fread($fp,$fread_length)){
				$content.=$line;
			}
		}else{
			if($content_length==0){
				return(-2);//错误：无内容
			}
			//echo 'content_length='.$content_length.';';
			while($line=fread($fp,$fread_length)){
				$content.=$line;
				$surplus_length=$content_length-strlen($content);
				if($surplus_length<$fread_length){
					$fread_length=$surplus_length;
				}
				//echo strlen($content).'.';
				if(strlen($content)>=$content_length){
					break;
				}
			}
		}
		$executeTime=intval((microtime(true)-$execute_start)*1000);
		if($isdebug>=1)echo("step4: get content ok! (".strlen($content)." Byte) time: {$executeTime}ms\r\n");
		if($isdebug>=2)echo("\r\n");
		sleep(1);
	}
	return(1);
}
function getArrFromPreArr($rnArr,$symbol2='=',$decode=0){
	//用于读取COOKIE或HEADER里的字符串
	$outarr=array();
	foreach($rnArr as $rnRow){
		//检测是否存在[=]号，如果存在就标出位置
		if(is_int($i=strpos($rnRow,$symbol2))){
			$symbol2Len=strlen($symbol2);
			$newdata=substr($rnRow,$i+$symbol2Len,strlen($rnRow)-$i+$symbol2Len);
			if($decode==1){
				$newdata=urldecode($newdata);
			}
			//到这里已经取到[$newdata]，下面要判断如何放进去
			$name=substr($rnRow,0,$i);//数组的key
			if(isset($outarr[$name])){
				//如果数组已经存在
				$data=$outarr[$name];
				if(count($data)==1){
					//如果是字符串，那就转换成数组
					$outarr[$name]=array();
					$outarr[$name][]=$data;
				}
				//把新的数组加进去(现在是2个了)
				$outarr[$name][]=$newdata;
			}else{
				$outarr[$name]=$newdata;
			}
		}
	}
	return($outarr);
}

?>