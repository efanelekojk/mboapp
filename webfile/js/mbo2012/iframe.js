
function getUrlPar(strName) {
    var svalue = location.search.match(new RegExp("[\?\&]" + strName + "=([^\&]*)(\&?)", "i"));
    return svalue ? svalue[1] : svalue;
};


function SetWinHeight(obj){
 var win=obj;
 if (document.getElementById){
  if (win && !window.opera){
   if (win.contentDocument && win.contentDocument.body.offsetHeight) 
    win.height = win.contentDocument.body.offsetHeight; 
   else if(win.Document && win.Document.body.scrollHeight)
    win.height = win.Document.body.scrollHeight;
  }
 }
}
function SetIframeHeight(){
	SetWinHeight(document.getElementById('mainFrame'));
}
