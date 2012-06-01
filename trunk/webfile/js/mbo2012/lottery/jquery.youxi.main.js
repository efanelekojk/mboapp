/*
* lottery of highgame
*
* version: 1.0.0 (01/21/2010)
* @ jQuery v1.3 or later ,suggest use 1.4
*
* Copyright 2010 James [ jameskerr2009[at]gmail.com ] 
*  
*/
var is_select=0;
;(function($){//start
    //check the version, need 1.3 or later , suggest use 1.4
    if (/^1.2/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
    	alert('requires jQuery v1.3 or later !  You are using v' + $.fn.jquery);
    	return;
    }
    $.gameInit = function(opts){//整个购彩界面的初始化
        var ps = {//整个JS的初试化默认参数
            data_label      : [],
            data_id : {
                        id_cur_issue    : '#current_issue',//装载当前期的ID
                        id_cur_end      : '#current_endtime',//装载当前期结束时间的ID
                        id_count_down   : '#count_down',//装载倒计时的ID
						//id_labelbox     : '#lt_big_label', //装载大标签的元素ID
                        id_labelbox     : '#lotteryType', //装载大标签的元素ID(原来的是:lt_big_label)
                        id_smalllabel   : '#lt_samll_label',//装载小标签的元素ID
                        id_methoddesc   : '#lt_desc',//装载玩法描述的ID
                        id_methodhelp   : '#lt_help',//玩法帮助
                        id_helpdiv      : '#lt_help_div',//玩法帮助弹出框
                        id_selector     : '#lt_selector',//装载选号区的ID
                        id_sel_num      : '#lt_sel_nums',//装载选号区投注倍数的ID
                        id_sel_money    : '#lt_sel_money',//装载选号区投注金额的ID
                        id_sel_times    : '#lt_sel_times',//选号区倍数输入框ID
                        id_sel_insert   : '#lt_sel_insert',//添加按钮
                        id_sel_modes    : '#lt_sel_modes',//元角模式选择
                        id_cf_count     : '#lt_cf_count', //统计投注单数
                        id_cf_clear     : '#lt_cf_clear', //清空确认区数据的按钮ID
                        id_cf_content   : '#lt_cf_content',//装载确认区数据的TABLE的ID
                        id_cf_num       : '#lt_cf_nums',//装载确认区总投注注数的ID
                        id_cf_money     : '#lt_cf_money',//装载确认区总投注金额的ID
                        id_issues       : '#lt_issues',//装载起始期的ID
                        id_sendok       : '#lt_sendok',  //立即购买按钮
                        id_tra_if       : '#lt_trace_if',//是否追号的div
                        id_tra_ifb      : '#lt_trace_if_button',//是否追号的hidden input
                        id_tra_stop     : '#lt_trace_stop',//是否追中即停的checkbox ID
                        id_tra_box1     : '#lt_trace_box1',//装载整个追号内容的ID，主要是隐藏和显示
                        id_tra_box2     : '#lt_trace_box2',//装载整个追号内容的ID，主要是隐藏和显示
                        id_tra_today    : '#lt_trace_today',//今天按钮的ID
                        id_tra_tom      : '#lt_trace_tomorrow',//明天按钮的ID
                        id_tra_alct     : '#lt_trace_alcount',//装载可追号期数的ID
                        id_tra_label    : '#lt_trace_label',//装载同倍，翻倍，利润追号等元素的ID
                        id_tra_lhtml    : '#lt_trace_labelhtml',//装载同倍翻倍等标签所表示的内容
                        id_tra_ok       : '#lt_trace_ok',//立即生成按钮
                        id_tra_issues   : '#lt_trace_issues',//装载追号的一系列期数的ID
                        id_beishuselect : '#lt_beishuselect'//jack 增加的下拉框选择倍数ID
                    },
                         
            cur_issue : {issue:'20100210-001',endtime:'2010-02-10 09:10:00'},  //当前期
            issues    : {//所有的可追号期数集合
                         today:[],
                         tomorrow: []
                        },
            servertime : '2010-02-10 09:09:40',//服务器时间[与服务器同步]
            ajaxurl    : '',    //提交的URL地址,获取下一期的地址是后面加上flag=read,提交是后面加上flag=save
            lotteryid  : 1,//彩种ID
            ontimeout  : function(){},//时间结束后执行的函数
            onfinishbuy: function(){},//购买成功后调用的函数
            test : ''
        }
        opts = $.extend( {}, ps, opts || {} ); //根据参数初始化默认配置
        /*************************************全局参数配置 **************************/
		$.extend({
			lt_id_data : opts.data_id,
			lt_method_data : {},//当前所选择的玩法数据
			lt_method : {2:'ZX3',3:'ZXHZ',5:'ZX3',6:'ZXHZ',8:'ZUS',9:'ZUL',10:'HHZX',11:'ZUHZ',13:'ZUS',14:'ZUL',15:'HHZX',16:'ZUHZ',18:'BDW1',20:'BDW2',513:'BDW2',22:'ZX2',26:'ZU2',24:'ZX2',28:'ZU2',30:'DWD',31:'DWD',32:'DWD',33:'DWD',34:'DWD',36:'DXDS',38:'DXDS',
			89:'ZX3',92:'ZXHZ',102:'ZX3',103:'ZXHZ',104:'ZUS',105:'ZUL',106:'HHZX',107:'ZUHZ',108:'ZUS',109:'ZUL',110:'HHZX',111:'ZUHZ',112:'BDW1',113:'BDW2',114:'ZX2',115:'ZX2',116:'ZU2',117:'ZU2',118:'DWD',119:'DWD',120:'DWD',121:'DWD',122:'DWD',123:'DXDS',124:'DXDS',
			126:'ZX3',127:'ZXHZ',129:'ZX3',130:'ZXHZ',132:'ZUS',133:'ZUL',134:'HHZX',135:'ZUHZ',137:'ZUS',138:'ZUL',139:'HHZX',140:'ZUHZ',142:'BDW1',144:'BDW2',146:'ZX2',148:'ZX2',150:'ZU2',152:'ZU2',154:'DWD',155:'DWD',156:'DWD',157:'DWD',158:'DWD',160:'DXDS',162:'DXDS',
			265:'ZX3',266:'ZXHZ',268:'ZX3',269:'ZXHZ',271:'ZUS',272:'ZUL',273:'HHZX',274:'ZUHZ',276:'ZUS',277:'ZUL',278:'HHZX',279:'ZUHZ',281:'BDW1',283:'BDW2',285:'ZX2',287:'ZX2',289:'ZU2',291:'ZU2',293:'DWD',294:'DWD',295:'DWD',296:'DWD',297:'DWD',299:'DXDS',301:'DXDS',
			189:'ZX3',190:'ZXHZ',192:'ZUS',193:'ZUL',194:'HHZX',195:'ZUHZ',197:'BDW1',199:'ZX2',201:'ZX2',203:'ZU2',205:'ZU2',261:'DWD',262:'DWD',263:'DWD',//上海时时乐
			220:'SDZX3',222:'SDZU3',224:'SDZX2',226:'SDZU2',228:'SDBDW',230:'SDDWD',231:'SDDWD',232:'SDDWD',234:'SDDDS',236:'SDCZW',238:'SDRX1',240:'SDRX2',243:'SDRX3',246:'SDRX4',249:'SDRX5',252:'SDRX6',255:'SDRX7',258:'SDRX8',
			303:'SDZX3',305:'SDZU3',307:'SDZX2',309:'SDZU2',311:'SDBDW',313:'SDDWD',314:'SDDWD',315:'SDDWD',317:'SDDDS',319:'SDCZW',321:'SDRX1',323:'SDRX2',325:'SDRX3',327:'SDRX4',329:'SDRX5',331:'SDRX6',333:'SDRX7',335:'SDRX8',
			337:'SDZX3',339:'SDZU3',341:'SDZX2',343:'SDZU2',345:'SDBDW',347:'SDDWD',348:'SDDWD',349:'SDDWD',351:'SDDDS',353:'SDCZW',355:'SDRX1',357:'SDRX2',359:'SDRX3',361:'SDRX4',363:'SDRX5',365:'SDRX6',367:'SDRX7',369:'SDRX8',
			393:'SDZX3',395:'SDZU3',397:'SDZX2',399:'SDZU2',401:'SDBDW',403:'SDDWD',404:'SDDWD',405:'SDDWD',407:'SDDDS',409:'SDCZW',411:'SDRX1',413:'SDRX2',415:'SDRX3',417:'SDRX4',419:'SDRX5',421:'SDRX6',423:'SDRX7',425:'SDRX8',
			371:'BJRX1',373:'BJRX2',375:'BJRX3',377:'BJRX4',379:'BJRX5',381:'BJRX6',383:'BJRX7',385:'BJHZDS',387:'BJHZDX',389:'BJSXP',391:'BJJOP',
			1189:'ZX3',1190:'ZXHZ',1192:'ZUS',1193:'ZUL',1194:'HHZX',1195:'ZUHZ',1197:'BDW1',1199:'ZX2',1201:'ZX2',1203:'ZU2',1205:'ZU2',1261:'DWD',1262:'DWD',1263:'DWD',//福彩3D
			2189:'ZX3',2190:'ZXHZ',2192:'ZUS',2193:'ZUL',2194:'HHZX',2195:'ZUHZ',2197:'BDW1',2199:'ZX2',2201:'ZX2',2203:'ZU2',2205:'ZU2',2261:'DWD',2262:'DWD',2263:'DWD'//体彩P3
		},
            lt_issues : opts.issues,//所有的可追号期的初始集合
            lt_ajaxurl: opts.ajaxurl,
            lt_lottid : opts.lotteryid,
            lt_total_nums : 0,//总投注注数
            lt_total_money: 0,//总投注金额[非追号]
            lt_time_leave : 0, //本期剩余时间
            lt_same_code  : [],//用于限制一个方法里不能投相同单
            lt_ontimeout  : opts.ontimeout,
            lt_onfinishbuy: opts.onfinishbuy,
            lt_trace_base : 0,//追号的基本金额.
            lt_submiting  : false,//是否正在提交表单
            lt_prizes   : [] //投注内容的奖金情况
        });
        ps = null;
        opts.data_id = null;
        opts.issues  = null;
        opts.ajaxurl = null;
        opts.lotteryid = null;
        if( $.browser.msie ){//&& /MSIE 6.0/.test(navigator.userAgent)
            CollectGarbage();//释放内存
        }
        //开始倒计时
        $($.lt_id_data.id_count_down).lt_timer(opts.servertime,opts.cur_issue.endtime);
        //装载模式选择
        $('<select name="lt_project_modes" id="lt_project_modes"></select>').appendTo($.lt_id_data.id_sel_modes);
        var bhtml = ''; //大标签HTML
		var data_label_count=opts.data_label.length;
        $.each(opts.data_label, function(i,n){//生成标签
            if(typeof(n)=='object'){
                if( i == 0 ){//第一个标签自动选择
					//bhtml += '<div value="'+i+'"><div class="menu_01a"></div><div class="menu_02a"><a href="javascript:">'+n.title+'</a></div><div class="menu_03a"></div></div>';
					bhtml += '<li value="'+i+'" id="two'+(i+1)+'" class="hover"><span class="m">'+n.title+'</span></li>';
                    lt_smalllabel({//生成该标签下的小标签
                            title:n.title,
                            label:n.label });
                }else{
                    bhtml += '<li value="'+i+'" id="two'+(i+1)+'"><span class="m">'+n.title+'</span></li>';
                }
            }
        });
		//alert(bhtml);
        $bhtml = $(bhtml);
        $(bhtml).appendTo($.lt_id_data.id_labelbox);
		//*
		//下面是对【小标签】进行切换（例如：前三、后三、二码）
        $($.lt_id_data.id_labelbox).children().click(function(){//切换标签
            if( $($(this).children()[0]).attr("class").indexOf('a')>=0 ){//如果已经是当前标签则不切换
                return;
            }
			/*
            $.each($($.lt_id_data.id_labelbox).children().children(), function(){
            	if($(this).attr('class').indexOf('a') >= 0)
            	{
            		var bbbbbb = $(this).attr('class').replace('a','');
            		$(this).removeAttr('class').addClass(bbbbbb);
            	}
            	else
            	{
            		return;  
            	}
            });
            $.each($(this).children(),function(i,n){
            	var cls = $(n).attr('class');
            	$(n).removeClass(cls).addClass(cls+'a');
            });
			//*/
            var index = parseInt($(this).attr("value"),10);
			if(opts.data_label[index].label.length>0){
				lt_smalllabel({
					title:opts.data_label[index].title,
					label:opts.data_label[index].label
				});
				setTab('two',(index+1),data_label_count);
			}else{
				jjtc();
			}
        });//*/
        //写入当前期
        $($.lt_id_data.id_cur_issue).html(opts.cur_issue.issue);
        //写入当前期结束时间
        $($.lt_id_data.id_cur_end).html(opts.cur_issue.endtime);
        //生成并写入起始期内容
        var chtml = '<select name="lt_issue_start" id="lt_issue_start">';
        $.each($.lt_issues.today,function(i,n){
            chtml += '<option value="'+n.issue+'">'+n.issue+(n.issue==opts.cur_issue.issue?lot_lang.dec_s7:'')+'</option>';
        });
        var t = $.lt_issues.tomorrow.length-$.lt_issues.today.length;
        if( t > 0 ){//如果当天的期数小于每天的固定期数则继续增加显示
            for( i=0; i<t; i++ ){
                chtml += '<option value="'+$.lt_issues.tomorrow[i].issue+'">'+$.lt_issues.tomorrow[i].issue+'</option>';
            }
        }
        chtml += '</select><input type="hidden" name="lt_total_nums" id="lt_total_nums" value="0"><input type="hidden" name="lt_total_money" id="lt_total_money" value="0">';
        $(chtml).appendTo($.lt_id_data.id_issues);
        //确认区事件
        $("tr",$($.lt_id_data.id_cf_content)).live("mouseover",function(){//确认区行颜色变化效果
            $(this).children().addClass("temp");
        }).live("mouseout",function(){
            $(this).children().removeClass("temp");
        });
        $($.lt_id_data.id_cf_clear).click(function(){//清空按钮
            $.confirm(lot_lang.am_s5,function(){
                $.lt_total_nums  = 0;//总注数清零
                $.lt_total_money = 0;//总金额清零
                $.lt_trace_base  = 0;//追号金额基数清零
                $.lt_same_code   = [];//已在确认区的数据
                $($.lt_id_data.id_cf_num).html(0);//显示数据清零
                $($.lt_id_data.id_cf_money).html(0);//显示数据清零
                $($.lt_id_data.id_cf_count).html(0);//总投注项清零
                $($.lt_id_data.id_cf_content).children().empty();
                cleanTraceIssue();//清空追号区数据
            });
        });
        //追号区
        $($.lt_id_data.id_tra_if).lt_trace({issues:opts.issues});
        
        //确认投注按钮事件
		
		$($.lt_id_data.id_sendok).lt_ajaxSubmit();
					
        
        //帮助中心
        $($.lt_id_data.id_methodhelp).hover(function(){
            if($($.lt_id_data.id_helpdiv).html().length > 2){
                var offset = $(this).offset();
                if($($.lt_id_data.id_helpdiv).html().length > 30){
                    $($.lt_id_data.id_helpdiv).css({"width":"300px"});
                }else{
                    $($.lt_id_data.id_helpdiv).css({"width":($.browser.msie ? "300px" : "auto")});
                }
                $($.lt_id_data.id_helpdiv).css({"left":(offset.left+$(this).width()+2)+"px","top":(offset.top-20)+"px"}).show();
            }
        },function(){
            $($.lt_id_data.id_helpdiv).hide();
        });
        
    }
    
    var lt_smalllabel = function(opts){//动态载入小标签
		//alert(opts);
        var ps = {title:'',label:[]};    //标签数据
        opts   = $.extend( {}, ps, opts || {} ); //根据参数初始化默认配置
		//alert(opts.title);
        var html = '';
        var modelhtml = '';
        function addItem(o, t, v){
            var i = new Option(t, v);      
            o.options.add(i);
        }
        function SelectItem(obj,value){
            for(var i=0;i<obj.options.length;i++){
                if(obj.options[i].value == value){
                    obj.options[i].selected = true;
                    return true;
                }
            }
        }
        $.each(opts.label, function(i,n){
				html += '<span class="methodgroupname">'+n.gtitle+'</span>：';
				$.each(n.label, function(ii,nn){
					if(typeof(nn)=='object'){
						if( ii > 0 && ii % 10 == 0 ){//4个小标签一换行
							html += '</div><div>';
						}
						if( i == 0 && ii == 0){//第一个标签自动选择
							html += '<label for="smalllabel_'+i+'_'+ii+'"><input type="radio" id="smalllabel_'+i+'_'+ii+'" name="smalllabel" value="'+i+'-'+ii+'" checked="checked" />'+nn.desc+'</label>&nbsp;';
							if( nn.methoddesc.length >0 ){
								$($.lt_id_data.id_methoddesc).html(nn.methoddesc).parent().show();
							}else{
								$($.lt_id_data.id_methoddesc).parent().hide();
							}
							if( nn.methodhelp && nn.methodhelp.length > 0 ){
								$($.lt_id_data.id_helpdiv).html(nn.methodhelp);
							}else{
								$($.lt_id_data.id_helpdiv).html("");
							}
							lt_selcountback();//选号区的统计归零
							$.lt_method_data = {
												methodid : nn.methodid,
												title: opts.title,
												name : nn.name,
												str  : nn.show_str,
												prize: nn.prize,
												modes: $.lt_method_data.modes ? $.lt_method_data.modes : {},
												sp   : nn.code_sp
											  };
							$($.lt_id_data.id_selector).lt_selectarea(nn.selectarea);//生成选号界面
							//生成模式选择

							selmodes  = getCookie("modes");
//*
//SELECT框就会用到，单选框就没用到了。
if(is_select)$("#lt_project_modes").empty();
$.each(nn.modes,function(j,m){
	$.lt_method_data.modes[m.modeid]= {name:m.name,rate:Number(m.rate)};
	if(is_select)addItem($("#lt_project_modes")[0],''+m.name+'',m.modeid);
});
if(is_select)SelectItem($("#lt_project_modes")[0],selmodes);
//*/
						}else{
							html += '<label for="smalllabel_'+i+'_'+ii+'"><input type="radio" id="smalllabel_'+i+'_'+ii+'" name="smalllabel" value="'+i+'-'+ii+'" />'+nn.desc+'</label>&nbsp;';
							if(ii == n.label.length-1)
							{
								html += '&nbsp;&nbsp;&nbsp;';
							}
						}
					}
			});
        });
        html += '<input type="hidden">';
        $html = $('<div>'+html+'</div>');
        $($.lt_id_data.id_smalllabel).empty();
        $html.appendTo($.lt_id_data.id_smalllabel);
		//==============3 levels by floyd=============
        //if( opts.label.length == 1 ){
            //$($.lt_id_data.id_smalllabel).empty();
        //}
		//==============/3 levels by floyd=============
        $("input[name='smalllabel']:first").attr("checked",true).data("ischecked",'yes');//第一个标签自动选择[兼容各种浏览器]
        $("input[name='smalllabel']").click(function(){
            if( $(this).data("ischecked") == 'yes' ){//如果已经选择则无任何动作
                return;
            }
            var index = $(this).val().split('-');
            if( opts.label[index[0]].label[index[1]].methoddesc.length >0 ){
                $($.lt_id_data.id_methoddesc).html(opts.label[index[0]].label[index[1]].methoddesc).parent().show();
            }else{
                $($.lt_id_data.id_methoddesc).parent().hide();
            }
            if( opts.label[index[0]].label[index[1]].methodhelp && opts.label[index[0]].label[index[1]].methodhelp.length>0 ){
                $($.lt_id_data.id_helpdiv).html(opts.label[index[0]].label[index[1]].methodhelp);
            }else{
				$($.lt_id_data.id_helpdiv).html("");
            }
            lt_selcountback();//选号区的统计归零
            $.lt_method_data = {
                                methodid : opts.label[index[0]].label[index[1]].methodid,
                                title: opts.title,
                                name : opts.label[index[0]].label[index[1]].name,
                                str  : opts.label[index[0]].label[index[1]].show_str,
                                prize: opts.label[index[0]].label[index[1]].prize,
                                modes: $.lt_method_data.modes ? $.lt_method_data.modes : {},
                                sp   : opts.label[index[0]].label[index[1]].code_sp
                              };
            $("input[name='smalllabel']").removeData("ischecked");
            $(this).data("ischecked",'yes'); //标记为已选择
            $($.lt_id_data.id_selector).lt_selectarea(opts.label[index[0]].label[index[1]].selectarea);//生成选号界面
            //生成模式选择
            //modelhtml = '<select name="lt_project_modes" id="lt_project_modes">';
            //modelhtml = '';
            $("#lt_project_modes").empty();
            //$("#lt_project_modes")[0].options.length ==0;
            selmodes  = getCookie("modes");
            $.each(opts.label[index[0]].label[index[1]].modes,function(j,m){
                $.lt_method_data.modes[m.modeid]= {name:m.name,rate:Number(m.rate)};
                //modelhtml += '<option value="'+m.modeid+'" '+(selmodes==m.modeid ? 'selected="selected"' : '')+' >&nbsp;&nbsp;'+m.name+'&nbsp;&nbsp;</option>';
                if(is_select)addItem($("#lt_project_modes")[0],''+m.name+'',m.modeid);
            });
            if(is_select)SelectItem($("#lt_project_modes")[0],selmodes);
            //$("#lt_project_modes").empty();
            //$("#lt_project_modes")[0].options.length ==0;
            //$(modelhtml).appendTo("#lt_project_modes");
            /*modelhtml += '</select>';
            $($.lt_id_data.id_sel_modes).empty();
            $(modelhtml).appendTo($.lt_id_data.id_sel_modes);*/
        });
    };
    
    var lt_selcountback = function(){
        $($.lt_id_data.id_sel_times).val(1);
        $($.lt_id_data.id_sel_money).html(0);
        $($.lt_id_data.id_sel_num).html(0);
    };
    
    

    /*
    //清空追号方案(弄到game_play_header.html去了)
    var cleanTraceIssue =function(){
        $("input[name^='lt_trace_issues']",$($.lt_id_data.id_tra_issues)).attr("checked",false);
        $("input[name^='lt_trace_times_']",$($.lt_id_data.id_tra_issues)).val(0).attr("disabled",true);
        $("span[id^='lt_trace_money_']",$($.lt_id_data.id_tra_issues)).html('0.00');                
        $("td",$($.lt_id_data.id_tra_issues)).removeClass("selected");
        $('#lt_trace_hmoney').html(0);
        $('#lt_trace_money').val(0);
        $('#lt_trace_count').html(0);
        $.lt_trace_issue = 0;
        $.lt_trace_money = 0;
    };
    //*/
	
    //倒计时
    $.fn.lt_timer = function(start,end){//服务器开始时间，服务器结束时间
        var me = this;
        if( start == "" || end == "" ){
            $.lt_time_leave = 0;
        }else{
            $.lt_time_leave = (format(end).getTime()-format(start).getTime())/1000;//总秒数
        }
        function fftime(n){
            return Number(n)<10 ? ""+0+Number(n) : Number(n); 
        }
        function format(dateStr){//格式化时间
            return new Date(dateStr.replace(/[\-\u4e00-\u9fa5]/g, "/"));
        }
        function diff(t){//根据时间差返回相隔时间
            return t>0 ? {
    			day : Math.floor(t/86400),
    			hour : Math.floor(t%86400/3600),
    			minute : Math.floor(t%3600/60),
    			second : Math.floor(t%60)
    		} : {day:0,hour:0,minute:0,second:0};
        }
        var timerno = window.setInterval(function(){
            if($.lt_time_leave > 0 && ($.lt_time_leave % 240 == 0 || $.lt_time_leave == 60 )){//每隔4分钟以及最后一分钟重新读取服务器时间
                $.ajax({
                        type: 'POST',
                        URL : $.lt_ajaxurl,
                        timeout : 30000,
                        data: "lotteryid="+$.lt_lottid+"&issue="+$($.lt_id_data.id_cur_issue).html()+"&flag=gettime",
                        success : function(data){//成功
                            data = parseInt(data,10);
                            data = isNaN(data) ? 0 : data;
                            data = data <= 0 ? 0 : data;
                            $.lt_time_leave = data;
                        }
                });
            }

            if( $.lt_time_leave <= 0 ){//结束
                clearInterval(timerno);
                if( $.lt_submiting == false ){//如果没有正在提交数据则弹出对话框,否则主动权交给提交表单
                    $.unblockUI({fadeInTime: 0, fadeOutTime: 0});
					if($($.lt_id_data.id_cur_issue).html()>''){
						$.alert(lot_lang.am_s15);
							$.lt_reset(true);
							$.lt_ontimeout();
					/*	$.confirm(lot_lang.am_s15,function(){//确定
							$.lt_reset(false);
							$.lt_ontimeout();
						},function(){//取消
							$.lt_reset(true);
							$.lt_ontimeout();
						});*/
					}else{
						/*if($.lt_lottid == '4'){
						$.alert('该彩种已经停止销售！敬请留意网站公告！');
						return false;
						}else{*/
						$.alert(lot_lang.am_s15_2);
						//}
					}
                }
            }
            var oDate = diff($.lt_time_leave--);
            $(me).html(""+(oDate.day>0 ? oDate.day+(lot_lang.dec_s21)+" " : "")+fftime(oDate.hour)+":"+fftime(oDate.minute)+":"+fftime(oDate.second));
        },1000);
    };
	//根据投单完成和本期销售时间结束，进行重新更新整个投注界面
	$.lt_reset = function(iskeep){
	    if( iskeep && iskeep === true ){
            iskeep = true;
        }else{
            iskeep = false;
        }
        if( $.lt_time_leave <= 0 ){//本期结束后的刷新
            //01:刷新选号区
            if( iskeep == false ){
                $(":radio:checked",$($.lt_id_data.id_smalllabel)).removeData("ischecked").click();
            }
            //02:刷新确认区
            if( iskeep == false ){
                $.lt_total_nums  = 0;//总注数清零
                $.lt_total_money = 0;//总金额清零
                $.lt_trace_base  = 0;//追号基础数据
                $.lt_same_code   = [];//已在确认区的数据
                $($.lt_id_data.id_cf_num).html(0);//显示数据清零
                $($.lt_id_data.id_cf_money).html(0);//显示数据清零
                $($.lt_id_data.id_cf_content).children().empty();
                $($.lt_id_data.id_cf_count).html(0);
                $("#times").attr('selected');
            }
            //读取新数据刷新必须刷新的内容
            $.ajax({
                type: 'POST',
                URL : $.lt_ajaxurl,
                data: "lotteryid="+$.lt_lottid+"&flag=read",
                success : function(data){//成功
                                if( data.length <= 0 ){
                                    $.alert(lot_lang.am_s16);
                                    return false;
                                }
                                var partn = /<script.*>.*<\/script>/;
                                if( partn.test(data) ){
                                    alert(lot_lang.am_s17);
        							top.location.href="../?controller=default";
        							return false;
                                }
                                if( data == "empty" ){
									//未到销售时间
									//$.alert(lot_lang.am_s15_2);
                                    $.alert(lot_lang.am_s18);
                                    //window.location.href="./?controller=default&action=start";
                                    return false;
                                }
                                eval("data="+data);
                                //03:刷新当前期的信息
                                $($.lt_id_data.id_cur_issue).html(data.issue);
                                $($.lt_id_data.id_cur_end).html(data.saleend);
                                //04:重新开始计时
                                $($.lt_id_data.id_count_down).lt_timer(data.nowtime, data.saleend);
                                var l = $.lt_issues.today.length;
                                //05:更新起始期
                                while(true){
                                    if( data.issue == $.lt_issues.today.shift().issue ){
                                        break;
                                    }
                                }
                                $.lt_issues.today.unshift({issue:data.issue,endtime:data.saleend});
                                //重新生成并写入起始期内容
                                //var chtml = '<select name="lt_issue_start" id="lt_issue_start">';
                                var chtml = '';
                                $.each($.lt_issues.today,function(i,n){
                                    chtml += '<option value="'+n.issue+'">'+n.issue+(n.issue==data.issue?lot_lang.dec_s7:'')+'</option>';
                                });
                                var t = $.lt_issues.tomorrow.length-$.lt_issues.today.length;
                                if( t > 0 ){//如果当天的期数小于每天的固定期数则继续增加显示
                                    for( i=0; i<t; i++ ){
                                        chtml += '<option value="'+$.lt_issues.tomorrow[i].issue+'">'+$.lt_issues.tomorrow[i].issue+'</option>';
                                    }
                                }
                                /*chtml += '</select>';
                                $("#lt_issue_start").remove();
                                $(chtml).appendTo($.lt_id_data.id_issues);*/
                                $("#lt_issue_start").empty();
                                $(chtml).appendTo("#lt_issue_start");
                                //06:更新可追号期数
                                t_count = $.lt_issues.tomorrow.length;
                                $($.lt_id_data.id_tra_alct).html(t_count);
                                //07:更新追号数据
                                cleanTraceIssue();//清空追号区数据
                                while(true){//删除追号列表里已经过期的数据
                                    $j = $("tr:first",$("#lt_trace_issues_today"));
                                    if($j.length <= 0){
                                        break;
                                    }
                                    if( $j.find(":checkbox").val() == data.issue ){
                                        break;
                                    }
                                    $j.remove();
                                }
                          },
                error : function(){//失败
                    $.alert(lot_lang.am_s16);
                    cleanTraceIssue();//清空追号区数据
                    return false;
                }
            });
        }else{//提交表单成功后的刷新
            //01:刷新选号区
            if( iskeep == false ){
                $(":radio:checked",$($.lt_id_data.id_smalllabel)).removeData("ischecked").click();
            }
            //02:刷新确认区
            if( iskeep == false ){
                $.lt_total_nums  = 0;//总注数清零
                $.lt_total_money = 0;//总金额清零
                $.lt_trace_base  = 0;//追号基数
                $.lt_same_code   = [];//已在确认区的数据
                $($.lt_id_data.id_cf_num).html(0);//显示数据清零
                $($.lt_id_data.id_cf_money).html(0);//显示数据清零
                $($.lt_id_data.id_cf_content).children().empty();
                $($.lt_id_data.id_cf_count).html(0);
            }
            //03:刷新追号区
            if( iskeep == false ){
                cleanTraceIssue();//清空追号区数据
            }
        }
	};
	//提交表单
	$.fn.lt_ajaxSubmit = function(){
	    var me = this;
	
	    $(this).click(function(){
			/*if($.lt_lottid == '4'){
			$.alert('该彩种已经停止销售！敬请留意网站公告！');
			return;
			}*/
	        if( checkTimeOut() == false ){
	            return;
	        }
	        $.lt_submiting = true;//倒计时提示的主动权转移到这里
	        //var istrace = $($.lt_id_data.id_tra_if).hasClass("clicked");//是否追号
			var istrace = $($.lt_id_data.id_tra_ifb).attr("checked")=='checked'?1:0;//是否追号
			//alert(istrace);
            if( $.lt_total_nums <= 0 || $.lt_total_money <= 0 ){//检查是否有投注内容
                $.lt_submiting = false;
                $.alert(lot_lang.am_s6);
                return;
            }
            if( istrace == true ){
	            if( $.lt_trace_issue <= 0 || $.lt_trace_money <= 0 ){//检查是否有追号内容
	                $.lt_submiting = false;
	                $.alert(lot_lang.am_s20);
                    return;
	            }
	            var terr = "";
	            $("input[name^='lt_trace_issues']:checked",$($.lt_id_data.id_tra_issues)).each(function(){
	                if( Number($(this).closest("tr").find("input[name^='lt_trace_times_']").val()) <= 0 ){
	                    terr += $(this).val()+'\n';
	                }
	            });
	            if( terr.length > 0 ){//有错误倍数的奖期
	                $.lt_submiting = false;
	                $.alert(lot_lang.am_s21.replace("[errorIssue]",terr));
                    return;
	            }
	        }
            if( istrace == true ){
                var msg = lot_lang.am_s14.replace("[count]",$.lt_trace_issue);
            }else{
                var msg = lot_lang.dec_s8.replace("[issue]",$("#lt_issue_start").val());
            }
            msg += '<div class="floatarea" style="height:150px;">';
            var modesmsg = [];
            var modes=0;
            $.each($('tr',$($.lt_id_data.id_cf_content)),function(i,n){
                modes = $(n).data('data').modes;
                if( modesmsg[modes] == undefined ){
                    modesmsg[modes] = [];
                }
                modesmsg[modes].push($("th",n).html().replace(lot_lang.dec_s5,"")+"\n");
            });
            $.each(modesmsg,function(i,n){
                if( $.lt_method_data.modes[i] != undefined && n != undefined && n.length>0 ){
                    msg += '<strong>'+$.lt_method_data.modes[i].name+"</strong>\n"+n.join("");
                }
            });
            msg += '</div>';
            $.lt_trace_money = Math.round($.lt_trace_money*1000)/1000;
            msg += lot_lang.dec_s9+': '+(istrace==true ? $.lt_trace_money : $.lt_total_money)+' '+lot_lang.dec_s3;
            $.confirm(msg,function(){//点确定[提交]
            	
                if( checkTimeOut() == false ){//正式提交前再检查1下时间
                    $.lt_submiting = false;
    	            return;
    	        }
    	        $("#lt_total_nums").val($.lt_total_nums);
    	        $("#lt_total_money").val($.lt_total_money);
                ajaxSubmit();
            },function(){//点取消
                $.lt_submiting = false;
                return checkTimeOut();
            },'',400);
        });
        //检查时间是否结束，然后做处理
        function checkTimeOut(){
            if( $.lt_time_leave <= 0 ){//结束
				if($($.lt_id_data.id_cur_issue).html()>''){
					$.confirm(lot_lang.am_s15,function(){//确定
						$.lt_reset(false);
						$.lt_ontimeout();
					},function(){//取消
						$.lt_reset(true);
						$.lt_ontimeout();
					});
				}else{
					$.alert(lot_lang.am_s15_2);
				}
                return false;
            }else{
                return true;
            }
        };
        //ajax提交表单
        function ajaxSubmit(){
            $.blockUI({
            message: lot_lang.am_s22,
            overlayCSS: {backgroundColor: '#FFFFFF',opacity: 0.5,cursor:'wait'}
            });
            var form = $(me).closest("form");
            $.ajax({
                type: 'POST',
                url : $.lt_ajaxurl,
                timeout : 30000,
                data: $(form).serialize(),
                success: function(data){
//                        alert(data); return false;
                        $.unblockUI({fadeInTime: 0, fadeOutTime: 0});
                        $.lt_submiting = false;
                        //return false;
                        if( data.length <= 0 ){
                            $.alert(lot_lang.am_s16);
                            return false;
                        }
                        var partn = /<script.*>.*<\/script>/;
                        if( partn.test(data) ){
                            alert(lot_lang.am_s17);
							top.location.href="../?controller=default";
							return false;
                        }
                        if( data == "success" ){//购买成功
                            $.alert(lot_lang.am_s24,lot_lang.dec_s25,function(){
                                if( checkTimeOut() == true ){//时间未结束
                                    $.lt_reset();
                                }
                                $.lt_onfinishbuy();
                            });
                            return false;
                        }else{//购买失败提示
                            eval("data = "+ data +";");
                            if( data.stats == 'error' ){//错误
                                $.alert(data.data,'',function(){
                                    return checkTimeOut();
                                });
                                return false;
                            }
                            if( data.stats == 'fail' ){//有失败的
                                msg  = lot_lang.am_s25.replace("[success]",data.data.success).replace("[fail]",data.data.fail);
                                msg += '<div class="floatarea" style="height:100px;">';
                                $.each(data.data.content,function(i,n){
                                    msg += n+"\n";
                                });
                                msg += '</div>';
                                msg += lot_lang.am_s26;
                                $.confirm(msg,function(){//点确定[清空]
                                    if( checkTimeOut() == true ){//时间未结束
                                        $.lt_reset();
                                    }
                                    $.lt_onfinishbuy();
                                },function(){//点取消
                                    return checkTimeOut();
                                    $.lt_onfinishbuy();
                                },'',400);
                            }
                        }
                },
                error: function(){
                        $.lt_submiting = false;
                        $.unblockUI({fadeInTime: 0, fadeOutTime: 0});
                        $.alert(lot_lang.am_s23,'',checkTimeOut);
                     }
            });
        };
        
	};
	
})(jQuery);