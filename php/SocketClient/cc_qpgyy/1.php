<?php
include('inc_http.php');
date_default_timezone_set('PRC');//设置为中国时间
$icount=50;
$socket=array();
$data='POST /?s=video/search HTTP/1.1
Host: qpgyy.com
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:11.0) Gecko/20100101 Firefox/11.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Connection: keep-alive
Referer: http://qpgyy.com/?s=video/search
Cookie: PHPSESSID=np2qbteuv5ntm5uh6qitm47c43; jiathis_rdc=%7B%22http%3A//qpgyy.com/%22%3A3%7C1336184839927%2C%22http%3A//qpgyy.com/%3Fs%3Dvideo/search%22%3A%220%7C1336184860123%22%7D; cnzz_a4080047=1; sin4080047=; rtime=0; ltime=1336184864928; cnzz_eid=47063177-1336179596-

wd=1&x=34&y=16&__gxcmsform__=c7fc3d32580e00879304e3e0f1ae4733';


while(1){
	$header['URI']='/';
	$header['Host']='qpgyy.com';
	if(($ret=get_http_info('96.47.233.183',80,$header,$content,2))==1){
		//print_r($header);
	}else{
		echo 'error:'.$ret;
	}
}
?>