<?php
$url='http://192.168.1.108/oduobao/_example/highadmin/_api/redirection.php';
$data='';
$postfield='data='.urlencode(serialize($data)).'&verifymd5='.$verifymd5;
echo $postfield;
echo file_get_contents($url);
?>
<?
function data_md5encode(&$data,&$verifymd5){
	//根据源明文来生成[安全验证MD5]编码函数
	$salt='1231';
	$time=time();//当前服务器时间
	$data['md5encode_time']=$time;//MD5编码时间
	$verifymd5=md5(serialize($data).'|'.md5($salt));
	return(1);
}
?>
