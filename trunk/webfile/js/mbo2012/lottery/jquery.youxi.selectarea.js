;(function($){//start
    //选号区动态插入函数，可能是手动编辑
    $.fn.lt_selectarea = function( opts ){
        var ps = {//默认参数
                type   : 'digital', //选号，'input':输入型,'digital':数字选号型,'dxds':大小单双类型
                layout : [
                           {title:'百位', no:'0|1|2|3|4|5|6|7|8|9', place:0, cols:1},
                           {title:'十位', no:'0|1|2|3|4|5|6|7|8|9', place:1, cols:1},
                           {title:'个位', no:'0|1|2|3|4|5|6|7|8|9', place:2, cols:1}
                          ],//数字型的号码排列
                noBigIndex : 5,    //前面多少个号码是小号,即大号是从多少个以后开始的
                isButton   : true,  //是否需要全大小奇偶清按钮
                imagedir   : './js/lottery/image/' //按钮图片文件夹位置
            };
        opts = $.extend( {}, ps, opts || {} ); //根据参数初始化默认配置
        var data_sel = [];//用户已选择或者已输入的数据
        var max_place= 0; //总共的选择型排列数
        var otype = opts.type.toLowerCase();    //类型全部转换为小写
        var methodname = $.lt_method[$.lt_method_data.methodid];//玩法的简写,如:'ZX3'
        var html  = '<div class="grayContent" id="right_05">';
        $("#right_03").css("display","block");
        $("#right_04").css("display","block");
//代码开始
		if(1){
			if( otype == 'input' ){//输入型，则载入输入型的数据
				//var html  = '<div class="grayContent" id="right_05_input">';
				var html  = '<div>';
				var tempdes    = '';
				switch( methodname ){
					case 'SDZX3' :
					case 'SDZU3' :
					case 'SDZX2' :
					case 'SDRX1' :
					case 'SDRX2' :
					case 'SDRX3' :
					case 'SDRX4' :
					case 'SDRX5' :
					case 'SDRX6' :
					case 'SDRX7' :
					case 'SDRX8' :
					case 'SDZU2' : tempdes = lot_lang.dec_s26; break;
					default      : tempdes = lot_lang.dec_s4; break;
				}
				$("#right_03").css("display","none");
				$("#right_04").css("display","none");
				html += '<div class="grayTop"></div><div class="grayContent clearfix">';
				html += '<textarea id="lt_write_box" class="textareaLong floatL"></textarea>';
				html += '<div class="floatL">';
				html += '<p class="marginb5px"><input id="lt_write_del" type="button" value="删除重复号" class="formWord" /></p><p class="marginb5px"><input id="lt_write_import" type="button" value="导入文件" class="formWord" /></p><p class="marginb5px"><input id="lt_write_empty" type="button" value="清空" class="formWord" /></p>';
				html += '</div>';
				html += '</div><div class="grayBottom"></div><div class="red">'+tempdes+'</div>';
				data_sel[0] = []; //初始数据
				tempdes = null;
			}else if( otype == 'digital' ){//数字选号型
				$.each(opts.layout, function(i,n){
					if(typeof(n)=='object'){
						n.place  = parseInt(n.place,10);
						max_place = n.place > max_place ? n.place : max_place;
						data_sel[n.place] = [];//初始数据
						html += '<div class="each clearfix">';
						if(1){
							if( n.cols > 0 ){//有标题
								if( n.title.length > 0 ){
									html += '<h3 class="name">'+n.title+'</h3>';
								}
							}
							html += '<ul class="numList floatL">';
							numbers = n.no.split("|");
							for( i=0; i<numbers.length; i++ ){
								html += '<li name="lt_place_'+n.place+'" class="button1">'+numbers[i]+'</li>';
							}
							html += '</ul><ul class="floatR">';
							if( opts.isButton == true ){
								html += '<li name="all" class="selectType">'+lot_lang.bt_sel_all+'</li><li class="selectType" name="big">'+lot_lang.bt_sel_big+'</li><li class="selectType" name="small">'+lot_lang.bt_sel_small+'</li><li class="selectType" name="odd">'+lot_lang.bt_sel_odd+'</li><li class="selectType" name="even">'+lot_lang.bt_sel_even+'</li><li class="selectType" name="clean">'+lot_lang.bt_sel_clean+'</li>';
							}
							html += '</ul>';
						}
						html += '</div>';
					}
				});
			}else if( otype == 'dxds' ){//大小单双类型(北京快乐吧)
				$.each(opts.layout, function(i,n){
					if(n){
						n.place  = parseInt(n.place,10);
						max_place = n.place > max_place ? n.place : max_place;
						data_sel[n.place] = [];//初始数据
						html += '<div class="each clearfix">';
						if( n.cols > 0 ){//有标题
							//html += '<td align="left" width="100px;">';
							if( n.title.length > 0 ){
								html += '<h3 class="name">'+n.title+'</h3>';
							}
							//html += '</td>';
						}
						if(lotterytype==0||lotterytype==2){
							html += '<ul class="numList floatL">';
						}else if(lotterytype==3){
							if(n.no.indexOf('codedesc')==-1){
								html += '<ul class="numList floatL bigBt">';
							}else{
								html += '<ul class="numList floatL bigBt twoRow">';
							}
						}
						numbers = n.no.split("|");
						for( i=0; i<numbers.length; i++ ){
							html += '<li name="lt_place_'+n.place+'" class="button1" style="margin:0 10px">'+numbers[i]+'</li>';
						}
						html += '</ul><ul class="floatR">';
						html += '<li name="all" class="selectType" style="margin:0 10px">'+lot_lang.bt_sel_all+'</li><li class="selectType" name="clean" style="margin:0 10px">'+lot_lang.bt_sel_clean+'</li></ul></div>';
					}
				});
			}else if( otype == 'dds' ){//<=-----[趣味型]
				$.each(opts.layout, function(i,n){
					n.place  = parseInt(n.place,10);
					max_place = n.place > max_place ? n.place : max_place;
					data_sel[n.place] = [];//初始数据
					html += '<div class="each clearfix">';
					if( n.cols > 0 ){//有标题
						//html += '<td rowspan="'+n.cols+'" class="'+(n.title.length<3 ? 'two' : (n.title.length>3 ? 'four' : 'three') )+'">';
						if( n.title.length > 0 ){
							alert(n.title);
							html += '<div class="seltitle"><div>'+n.title+'</div></div>';
						}
						//html += '</td>';
					}
					//html += '<td>';
					//==========趣味型按钮输出===============
					html += '<div class="selddsbox"><ul class="numList floatL bigBt">';
					numbers = n.no.split("|");
					temphtml= '';
					if( n.prize ){
						tmpprize = n.prize.split(",");
					}
					for( i=0; i<numbers.length; i++ ){
						html += '<li name="lt_place_'+n.place+'">'+numbers[i]+'</li>';
						if( n.prize ){
							alert("span_astest["+$.lt_method_data.prize[parseInt(tmpprize[i],10)]);
							temphtml += '<span>'+$.lt_method_data.prize[parseInt(tmpprize[i],10)]+'</span>';
						}
					}
					html += temphtml+'</ul></div>';//去掉了【<td></tr>】
				});
			}
			html += '</div>';//这个在最后都会加这个div结尾标签，所以开头一定要有一个<div>
		}
//代码结束
		//alert(html);
        $html = $(html)
        $(this).empty();
        $html.appendTo(this);
        var me = this;
        var _SortNum = function(a,b){//数字大小排序
            if( otype != 'input' ){
                a = a.replace(/5单0双/g,0).replace(/4单1双/g,1).replace(/3单2双/g,2).replace(/2单3双/g,3).replace(/1单4双/g,4).replace(/0单5双/g,5);
                a = a.replace(/大/g,0).replace(/小/g,1).replace(/单/g,2).replace(/双/g,3).replace(/\s/g,"");
                b = b.replace(/5单0双/g,0).replace(/4单1双/g,1).replace(/3单2双/g,2).replace(/2单3双/g,3).replace(/1单4双/g,4).replace(/0单5双/g,5);
                b = b.replace(/大/g,0).replace(/小/g,1).replace(/单/g,2).replace(/双/g,3).replace(/\s/g,"");
            }
            a = parseInt(a,10);
            b = parseInt(b,10);
            if( isNaN(a) || isNaN(b) ){
                return true;
            }
            return (a-b);
        };
        /************************ 验证号码合法性以及计算单笔投注注数以及金额 ***********************/
        //===================输入型检测
        var _HHZXcheck = function(n,len){//混合组选合法号码检测，合法返回TRUE，非法返回FALSE,n号码，len号码长度
            if( len == 2 ){//两位
                var a = ['00','11','22','33','44','55','66','77','88','99'];
            }else{//三位[默认]
                var a = ['000','111','222','333','444','555','666','777','888','999'];
            }
            n     = n.toString();
            if( $.inArray(n,a) == -1 ){//不在非法列表中
                return true;
            }
            return false;
        };
        var _SDinputCheck = function(n,len){//山东十一运的手动输入型的检测[不能重复，只能是01-11的数字]
            t = n.split(" ");
            l = t.length;
            for( i=0; i<l; i++ ){
                if( Number(t[i]) > 11 || Number(t[i]) < 1 ){//超过指定范围
                    return false;
                }
                for( j=i+1; j<l; j++ ){
                    if( Number(t[i]) == Number(t[j]) ){//重复的号码
                        return false;
                    }
                }
            }
            return true;
        };
        //号码检测,l:号码长度,e是否返回非法号码，true是,false返回合法注数,fun对每个号码的附加检测,sort:是否对每个号码排序
        var _inputCheck_Num = function(l,e,fun,sort){
            var nums = data_sel[0].length;
            var error= [];
            var newsel=[];
            var partn= "";
            l = parseInt(l,10);
            switch(l){
                case 2 : partn= /^[0-9]{2}$/;break;
                case 5 : partn= /^[0-9\s]{5}$/;break;
                case 8 : partn= /^[0-9\s]{8}$/;break;
                case 11 : partn= /^[0-9\s]{11}$/;break;
                case 14 : partn= /^[0-9\s]{14}$/;break;
                case 17 : partn= /^[0-9\s]{17}$/;break;
                case 20 : partn= /^[0-9\s]{20}$/;break;
                case 23 : partn= /^[0-9\s]{23}$/;break;
                default: partn= /^[0-9]{3}$/;break;
            }
            fun = $.isFunction(fun) ? fun : function(s){return true;};
            $.each(data_sel[0],function(i,n){
                n = $.trim(n);
                if( partn.test(n) && fun(n,l) ){//合格号码
                    if( sort ){
                        if( n.indexOf(" ") == -1 ){
                            n = n.split("");
                            n.sort(_SortNum);
                            n = n.join("");
                        }else{
                            n = n.split(" ");
                            n.sort(_SortNum);
                            n = n.join(" ");
                        }
                    }
                    data_sel[0][i] = n;
                    newsel.push(n);
                }else{//不合格则注数减
                    if( n.length>0 ){
                        error.push(n);
                    }
                    nums = nums - 1;
                }
            });
            if( e == true ){
                data_sel[0] = newsel;
                return error;
            }
            return nums;
        };
        function checkNum(){//实时计算投注注数与金额等
            var nums  = 0, mname = $.lt_method[$.lt_method_data.methodid];//玩法的简写,如:'ZX3'
            //var modes = parseInt($("#lt_project_modes").val(),10);//投注模式
			var modes = parseInt($("input[name='lt_project_modes']:checked").val(),10);//投注模式
			//alert(modes+'----'+mname);
            //01:验证号码合法性并计算注数
            if( otype == 'input' ){//输入框形式的检测
                if( data_sel[0].length > 0 ){//如果输入的有值
                    switch(mname){
                        case 'ZX3'  : nums = _inputCheck_Num(3,false); break;
                        case 'HHZX' : nums = _inputCheck_Num(3,false,_HHZXcheck,true); break;
                        case 'ZX2'  : nums = _inputCheck_Num(2,false); break;
                        case 'ZU2'  : nums = _inputCheck_Num(2,false,_HHZXcheck,true); break;
                        case 'SDZX3': nums = _inputCheck_Num(8,false,_SDinputCheck,false); break;
                        case 'SDZU3': nums = _inputCheck_Num(8,false,_SDinputCheck,true); break;
                        case 'SDZX2': nums = _inputCheck_Num(5,false,_SDinputCheck,false); break;
                        case 'SDZU2': nums = _inputCheck_Num(5,false,_SDinputCheck,true); break;
                        case 'SDRX1': nums = _inputCheck_Num(2,false,_SDinputCheck,false); break;
                        case 'SDRX2': nums = _inputCheck_Num(5,false,_SDinputCheck,true); break;
                        case 'SDRX3': nums = _inputCheck_Num(8,false,_SDinputCheck,true); break;
                        case 'SDRX4': nums = _inputCheck_Num(11,false,_SDinputCheck,true); break;
                        case 'SDRX5': nums = _inputCheck_Num(14,false,_SDinputCheck,true); break;
                        case 'SDRX6': nums = _inputCheck_Num(17,false,_SDinputCheck,true); break;
                        case 'SDRX7': nums = _inputCheck_Num(20,false,_SDinputCheck,true); break;
                        case 'SDRX8': nums = _inputCheck_Num(23,false,_SDinputCheck,true); break;
                        default   : break;
                    }
                }
            }else{//其他选择号码形式[暂时就数字型和大小单双]
                var tmp_nums = 1;
                switch(mname){//根据玩法分类不同做不同处理
                    case 'ZXHZ' :   //直选和值特殊算法
                                    var cc = {0:1,1:3,2:6,3:10,4:15,5:21,6:28,7:36,8:45,9:55,10:63,11:69,12:73,13:75,14:75,15:73,16:69,17:63,18:55,19:45,20:36,21:28,22:21,23:15,24:10,25:6,26:3,27:1};
                    case 'ZUHZ' :   //混合组选特殊算法
                                    if( mname == 'ZUHZ' ){
                                        cc = {1:1,2:2,3:2,4:4,5:5,6:6,7:8,8:10,9:11,10:13,11:14,12:14,13:15,14:15,15:14,16:14,17:13,18:11,19:10,20:8,21:6,22:5,23:4,24:2,25:2,26:1};
                                    }
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        for( j=0; j<s; j++ ){
                                            nums += cc[parseInt(data_sel[i][j],10)];
                                        }
                                    };break;
                    case 'ZUS'  :   //组三
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 1 ){//组三必须选两位或者以上
                                            nums += s*(s-1);
                                        }
                                    };break;
                    case 'ZUL'  :   //组六
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 2 ){//组六必须选三位或者以上
                                            nums += s*(s-1)*(s-2)/6;
                                        }
                                    };break;
                    case 'BDW2'  :  //二码不定位
                    case 'ZU2'   :  //2位组选
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 1 ){//二码不定位必须选两位或者以上
                                            nums += s*(s-1)/2;
                                        }
                                    };break;
                    case 'DWD'  :   //定位胆所有在一起特殊处理
                                    for( i=0; i<=max_place; i++ ){
                                        nums += data_sel[i].length;
                                    };break;
                    case 'SDZX3': //山东11运前三直选
                                    nums = 0;
                                    if( data_sel[0].length > 0 && data_sel[1].length > 0 && data_sel[2].length > 0 ){
                                        for( i=0; i<data_sel[0].length; i++ ){
                                            for( j=0; j<data_sel[1].length; j++ ){
                                                for( k=0; k<data_sel[2].length; k++ ){
                                                    if( data_sel[0][i] != data_sel[1][j] && data_sel[0][i] != data_sel[2][k] && data_sel[1][j] != data_sel[2][k] ){
                                                        nums++;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    break;
                    case 'SDZU3': //山东11运前三组选
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 2 ){//组六必须选三位或者以上
                                            nums += s*(s-1)*(s-2)/6;
                                        }
                                    };break;
                    case 'SDZX2': //山动十一运前二直选
                                  nums = 0;
                                    if( data_sel[0].length > 0 && data_sel[1].length > 0 ){
                                        for( i=0; i<data_sel[0].length; i++ ){
                                            for( j=0; j<data_sel[1].length; j++ ){
                                                if( data_sel[0][i] != data_sel[1][j]){
                                                    nums++;
                                                }
                                            }
                                        }
                                    }
                                    break;
                    case 'SDZU2': //山东十一运前二组选
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 1 ){//组六必须选三位或者以上
                                            nums += s*(s-1)/2;
                                        }
                                    };break;
                    case 'SDBDW':
                    case 'SDDWD':
                    case 'SDDDS':
                    case 'SDCZW':
                    case 'SDRX1': //任选1中1
                                    for( i=0; i<=max_place; i++ ){
                                        nums += data_sel[i].length;
                                    };break;
                    case 'SDRX2': //任选2中2
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 1 ){//二码不定位必须选两位或者以上
                                            nums += s*(s-1)/2;
                                        }
                                    };break;
                    case 'SDRX3': //任选3中3
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 2 ){//必须选三位或者以上
                                            nums += s*(s-1)*(s-2)/6;
                                        }
                                    };break;
                    case 'SDRX4': //任选4中4
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 3 ){//必须选四位或者以上
                                            nums += s*(s-1)*(s-2)*(s-3)/24;
                                        }
                                    };break;
                    case 'SDRX5': //任选5中5
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 4 ){//必须选四位或者以上
                                            nums += s*(s-1)*(s-2)*(s-3)*(s-4)/120;
                                        }
                                    };break;
                    case 'SDRX6': //任选6中6
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 5 ){//必须选四位或者以上
                                            nums += s*(s-1)*(s-2)*(s-3)*(s-4)*(s-5)/720;
                                        }
                                    };break;
                    case 'SDRX7': //任选7中7
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 6 ){//必须选四位或者以上
                                            nums += s*(s-1)*(s-2)*(s-3)*(s-4)*(s-5)*(s-6)/5040;
                                        }
                                    };break;
                    case 'SDRX8': //任选8中8
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 7 ){//必须选四位或者以上
                                            nums += s*(s-1)*(s-2)*(s-3)*(s-4)*(s-5)*(s-6)*(s-7)/40320;
                                        }
                                    };break;
//下面是北京快乐吧
                    case 'BJRX2': //北京快乐8 任选2
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 1 ){//必须选 两位到八位
                                            nums += s*(s-1)/2;
                                        }
                                    };break;
                    case 'BJRX3': //北京快乐8 任选3
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 2 ){//必须选 三位到八位
                                            nums += s*(s-1)*(s-2)/6;
                                        }
                                    };break;
                    case 'BJRX4': //北京快乐8 任选4
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 3 ){//必须选 四位到八位
                                            nums += s*(s-1)*(s-2)*(s-3)/24;
                                        }
                                    };break;
                    case 'BJRX5': //北京快乐8 任选5
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 4 ){//必须选 五位到八位
                                            nums += s*(s-1)*(s-2)*(s-3)*(s-4)/120;
                                        }
                                    };break;
                    case 'BJRX6': //北京快乐8 任选6
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 5 ){//必须选 六位到八位
                                            nums += s*(s-1)*(s-2)*(s-3)*(s-4)*(s-5)/720;
                                        }
                                    };break;
                    case 'BJRX7': //北京快乐8 任选7
                                    for( i=0; i<=max_place; i++ ){
                                        var s = data_sel[i].length;
                                        if( s > 6 ){//必须选 七位到八位
                                            nums += s*(s-1)*(s-2)*(s-3)*(s-4)*(s-5)*(s-6)/5040;
                                        }
                                    };break;


                    default     : //默认情况
						for( i=0; i<=max_place; i++ ){
							if( data_sel[i].length == 0 ){//有位置上没有选择
								tmp_nums = 0;
								break;break;
							}
							tmp_nums *= data_sel[i].length;
						}
						nums = tmp_nums;
					break;
                }
            }
            //03:计算金额
            var times = parseInt($($.lt_id_data.id_sel_times).val(),10);
            if( isNaN(times) )
            {
                times = 1;
                $($.lt_id_data.id_sel_times).val(1);
            }
            var money = Math.round(times * nums * 2 * ($.lt_method_data.modes[modes].rate * 1000))/1000;//倍数*注数*单价 * 模式
            money = isNaN(money) ? 0 : money;
            $($.lt_id_data.id_sel_num).html(nums);   //写入临时的注数
            $($.lt_id_data.id_sel_money).html(money);//写临时单笔价格
        };
        //重复号处理
        var dumpNum = function(isdeal){
            var l   = data_sel[0].length;
            var err = [];
            var news= []; //除去重复号后的结果
            if( l == 0 ){
                return err;
            }
            for( i=0; i<l; i++ ){
                if( $.inArray(data_sel[0][i],err) != -1 ){
                    continue;
                }
                for( j=i+1; j<l; j++ ){
                    if( data_sel[0][i] == data_sel[0][j] ){
                        err.push(data_sel[0][i]);
                        break;
                    }
                }
                news.push(data_sel[0][i]);
            }
            if( isdeal ){//如果是做删除重复号的处理
                data_sel[0] = news;
            }
            return err;
        };
        //输入框的字符串处理
        function _inptu_deal(){
            var s = $.trim($("#lt_write_box",$(me)).val());
            s     = $.trim(s.replace(/[^\s\r,;，；　０１２３４５６７８９0-9]/g,""));
            var m = s;
            switch( methodname ){
                case 'SDZX3' :
                case 'SDZU3' :
                case 'SDZX2' :
                case 'SDRX1' :
                case 'SDRX2' :
                case 'SDRX3' :
                case 'SDRX4' :
                case 'SDRX5' :
                case 'SDRX6' :
                case 'SDRX7' :
                case 'SDRX8' :
                case 'SDZU2' : s = s.replace(/[\r\n,;，；]/g,"|").replace(/(\|)+/g,"|"); break;
                default      : s = s.replace(/[\s\r,;，；　]/g,"|").replace(/(\|)+/g,"|"); break;
            }
            s = s.replace(/０/g,"0").replace(/１/g,"1").replace(/２/g,"2").replace(/３/g,"3").replace(/４/g,"4").replace(/５/g,"5").replace(/６/g,"6").replace(/７/g,"7").replace(/８/g,"8").replace(/９/g,"9");
            if( s == "" ){
            	  data_sel[0] = []; //清空数据
            }else{
            	  data_sel[0] = s.split("|");
            }
            return m;
        };
        /************************ 事件触发处理 ****************************/
        if( otype == 'input' ){//手动输入型处理
            $("#lt_write_del",$(me)).click(function(){//删除重复号
                var err = dumpNum(true);
                if( err.length > 0 ){//如果有重复号码
                    checkNum();
                    switch( methodname ){
                        case 'SDZX3' :
                        case 'SDZU3' :
                        case 'SDZX2' :
                        case 'SDRX1' :
				                case 'SDRX2' :
				                case 'SDRX3' :
				                case 'SDRX4' :
				                case 'SDRX5' :
				                case 'SDRX6' :
				                case 'SDRX7' :
				                case 'SDRX8' :
                        case 'SDZU2' : $("#lt_write_box",$(me)).val(data_sel[0].join(";"));
                                       $.alert(lot_lang.am_s3+'\r\n'+err.join(";"));
                                       break;
                        default      : $("#lt_write_box",$(me)).val(data_sel[0].join(" "));
                                       $.alert(lot_lang.am_s3+'\r\n'+err.join(" "));
                                       break;
                    }
                }else{
                    $.alert(lot_lang.am_s4);
                }
            });
            $("#lt_write_import",$(me)).click(function(){//载入文件处理
                $.ajaxUploadUI({
              title    : lot_lang.dec_s27,
        			url      : './?dialogUI=fileupload.php',//服务端处理的文件
        			loadok   : lot_lang.dec_s28,
        			filetype : ['txt','csv'],//允许载入的文件类型
        			success  : function(data){ $("#lt_write_box",$(me)).val(data).change(); },//数据处理
        			onfinish : function(){$("#lt_write_box",$(me)).focus();}
        		});
            });
            $("#lt_write_box",$(me)).change(function(){//输入框时时变动处理
                var s = _inptu_deal();
                $(this).val(s);
                checkNum();
             }).keyup(function(){
                _inptu_deal();
                checkNum();
            });
            $("#lt_write_empty",$(me)).click(function(){//清空处理
                data_sel[0] = []; //清空数据
                $("#lt_write_box",$(me)).val("");
                checkNum();
            });
        }
        
        //选中号码处理
        function selectNum( obj, isButton ){
            if( $.trim($(obj).attr("class")) == 'selected' ){//如果本身是已选中，则不做任何处理
                return;
            }
            $(obj).attr("class","selected");//样式改变为选中
            place = Number($(obj).attr("name").replace("lt_place_",""));
            var number = $.trim($(obj).html());
			number=number.toLowerCase();
			number = number.replace(/\<div.*\<\/div>/g,"").replace(/\r\n/g,"");
            data_sel[place].push(number);//加入到数组中
            if( !isButton ){//如果不是按钮触发则进行统计，按钮的统一进行统计
				/*
				var numlimit = parseInt($.lt_method_data.maxcodecount);
				if( numlimit > 0 )
				{
					if( data_sel[place].length > numlimit )
					{
						$.alert(lot_lang.am_s35.replace('%s',numlimit));
						unSelectNum(obj,false);
					}
				}//*/
                checkNum();
            }
        };
        //取消选中号码处理
        function unSelectNum( obj, isButton ){
            if( $.trim($(obj).attr("class")) != 'selected' ){//如果本身是未选中，则不做任何处理
                return;
            }
            $(obj).attr("class","button1");//样式改变为未选中
            place = Number($(obj).attr("name").replace("lt_place_",""));
            var number = $.trim($(obj).html());
			number=number.toLowerCase();
			number = number.replace(/\<div.*\<\/div>/g,"").replace(/\r\n/g,"");
            data_sel[place] = $.grep(data_sel[place],function(n,i){//从选中数组中删除取消的号码
				return n == number;
            },true);
            if( !isButton ){//如果不是按钮触发则进行统计，按钮的统一进行统计
                checkNum();
            }
        };
        //选择与取消号码选择交替变化
        function changeNoCss(obj){
            if( $.trim($(obj).attr("class")) == 'selected' ){//如果本身是已选中，则做取消
                unSelectNum(obj,false);
            }else{
                selectNum(obj,false);
            }
        };
        //选择奇数号码
        function selectOdd(obj){
            if( Number($(obj).html()) % 2 == 1 ){
                 selectNum(obj,true);
            }else{
                 unSelectNum(obj,true);
            }
        };
        //选择偶数号码
        function selectEven(obj){
            if( Number($(obj).html()) % 2 == 0 ){
                 selectNum(obj,true);
            }else{
                 unSelectNum(obj,true);
            }
        };
        //选则大号
        function selectBig(i,obj){
            if( i >= opts.noBigIndex ){
                selectNum(obj,true);
            }else{
                unSelectNum(obj,true);
            }
        };
        //选择小号
        function selectSmall(i,obj){
            if( i < opts.noBigIndex ){
                selectNum(obj,true);
            }else{
                unSelectNum(obj,true);
            }
        };
        //设置号码事件
        $(this).find("[name^='lt_place_']").click(function(){
            changeNoCss(this);
        });
        //全大小单双清按钮的动作行为处理
		//if( opts.isButton == true ){//如果有这几个按钮才做处理
		if( 1 ){
            $("[class='selectType']",$(this)).click(function(){//清除处理
            	var td = $(this).parent().parent().children('ul')[0];
            	td = $(td);
                switch( $(this).attr('name') ){
                    case 'all'   :
						$.each(td.children(),function(i,n){
							//alert(i+"|"+$(n).html());
							selectNum(n,true);
						});
						break;
                    case 'big'   :
                                 $.each(td.children(),function(i,n){
                                    selectBig(i,n);
                                 });break;
                    case 'small' :
                                 $.each(td.children(),function(i,n){
                                    selectSmall(i,n);
                                 });break;
                    case 'odd'   :
                                 $.each(td.children(),function(i,n){
                                    selectOdd(n);
                                 });break;
                    case 'even'  :
                                 $.each(td.children(),function(i,n){
                                    selectEven(n);
                                 });break;
                    case 'clean'  :
						$.each(td.children(),function(i,n){
							unSelectNum(n,true);
						});break;
                    default : break;
                }
                checkNum();
            });
        }else if( otype == 'dxds' ){//或者玩法为大小单双即有清按钮的处理
            $("div[class='selcleanbutton']",$(this)).click(function(){
                $.each($(this).parent().children(":first").children(),function(i,n){
                    unSelectNum(n,true);
                });
                checkNum();
            });
        }
        //倍数输入处理事件
        $($.lt_id_data.id_sel_times).keyup(function(){
            var times = $(this).val().replace(/[^0-9]/g,"").substring(0,5);
            $(this).val( times );
            if( times == "" ){
                times = 0;
            }else{
                times = parseInt(times,10);//取整倍数
            }
            var nums  = parseInt($($.lt_id_data.id_sel_num).html(),10);//投注注数取整
            //var modes = parseInt($("#lt_project_modes").val(),10);//投注模式
			var modes = parseInt($("input[name='lt_project_modes']:checked").val(),10);//投注模式
            var money = Math.round(times * nums * 2 * ($.lt_method_data.modes[modes].rate * 1000))/1000;//倍数*注数*单价 * 模式
            money = isNaN(money) ? 0 : money;
            $($.lt_id_data.id_sel_money).html(money);
        });
        $($.lt_id_data.id_beishuselect).change(function(){
            $($.lt_id_data.id_sel_times).val($(this).val()).keyup();
			//$(this)[0].selectedIndex=0;
        });
        //模式变换处理事件
        //$("#lt_project_modes").change(function(){
		$("input[name='lt_project_modes']").click(function(){
            var nums  = parseInt($($.lt_id_data.id_sel_num).html(),10);//投注注数取整
            var times = parseInt($($.lt_id_data.id_sel_times).val(),10);//投注倍数取整
            //var modes = parseInt($("#lt_project_modes").val(),10);//投注模式
			var modes = parseInt($("input[name='lt_project_modes']:checked").val(),10);//投注模式
            var money = Math.round(times * nums * 2 * ($.lt_method_data.modes[modes].rate * 1000))/1000;//倍数*注数*单价 * 模式
            money = isNaN(money) ? 0 : money;
            $($.lt_id_data.id_sel_money).html(money);
        });
        //添加按钮
        $($.lt_id_data.id_sel_insert).unbind("click").click(function(){
            var nums  = parseInt($($.lt_id_data.id_sel_num).html(),10);//投注注数取整
            var times = parseInt($($.lt_id_data.id_sel_times).val(),10);//投注倍数取整
            //var modes = parseInt($("#lt_project_modes").val(),10);//投注模式
			var modes = parseInt($("input[name='lt_project_modes']:checked").val(),10);//投注模式
            var money = Math.round(times * nums * 2 * ($.lt_method_data.modes[modes].rate * 1000))/1000;//倍数*注数*单价 * 模式
            var mid   = $.lt_method_data.methodid;
            if( isNaN(nums) || isNaN(times) || isNaN(money) || money <= 0 ){//如果没有任何投注内容
                $.alert(otype == 'input' ? lot_lang.am_s29 : lot_lang.am_s19);
                return;
            }
            if( otype == 'input' ){//如果是输入型，则检测号码合法性，以及是否存在重复号
                var mname = $.lt_method[mid];//玩法的简写,如:'ZX3'
                var error = [];
                var edump = [];
                var ermsg = "";
                //检测重复号，并除去重复号
                edump = dumpNum(true);
                if( edump.length >0 ){//有重复号
                    ermsg += lot_lang.em_s2+'\n'+edump.join(", ")+"\n";
                    checkNum();//重新统计
                    nums  = parseInt($($.lt_id_data.id_sel_num).html(),10);//投注注数取整
                    money = Math.round(times * nums * 2 * ($.lt_method_data.modes[modes].rate * 1000))/1000;//倍数*注数*单价*模式
                }
                switch(mname){//根据类型不同做不同检测
                    case 'ZX3'  : error = _inputCheck_Num(3,true); break;
                    case 'HHZX' : error = _inputCheck_Num(3,true,_HHZXcheck,true); break;
                    case 'ZX2'  : error = _inputCheck_Num(2,true); break;
                    case 'ZU2'  : error = _inputCheck_Num(2,true,_HHZXcheck,true); break;
                    case 'SDZX3': error = _inputCheck_Num(8,true,_SDinputCheck,false); break;
                    case 'SDZU3': error = _inputCheck_Num(8,true,_SDinputCheck,true); break;
                    case 'SDZX2': error = _inputCheck_Num(5,true,_SDinputCheck,false); break;
                    case 'SDZU2': error = _inputCheck_Num(5,true,_SDinputCheck,true); break;
                    case 'SDRX1': error = _inputCheck_Num(2,true,_SDinputCheck,false); break;
                    case 'SDRX2': error = _inputCheck_Num(5,true,_SDinputCheck,true); break;
                    case 'SDRX3': error = _inputCheck_Num(8,true,_SDinputCheck,true); break;
                    case 'SDRX4': error = _inputCheck_Num(11,true,_SDinputCheck,true); break;
                    case 'SDRX5': error = _inputCheck_Num(14,true,_SDinputCheck,true); break;
                    case 'SDRX6': error = _inputCheck_Num(17,true,_SDinputCheck,true); break;
                    case 'SDRX7': error = _inputCheck_Num(20,true,_SDinputCheck,true); break;
                    case 'SDRX8': error = _inputCheck_Num(23,true,_SDinputCheck,true); break;
                    default     : break;
                }
                if( error.length > 0 ){//如果存在错误的号码，则提示
                    ermsg += lot_lang.em_s1+'\n'+error.join(", ")+"\n";
                }
                
                if( ermsg.length > 1 ){
                    $.alert(ermsg);
                }
            }
            var nos = $.lt_method_data.str;
            var serverdata = "{'type':'"+otype+"','methodid':"+mid+",'codes':'";
            var temp = [];
            for( i=0; i<data_sel.length; i++ ){
                nos = nos.replace('X',data_sel[i].sort(_SortNum).join($.lt_method_data.sp));
                temp.push( data_sel[i].sort(_SortNum).join("&") );
            }
            if( nos.length > 40 ){
				var rand=(Math.random()+'').substr(2,8);
                var nohtml = nos.substring(0,37)+'...<a href="#" onclick="div_slow_show('+rand+');return(false);">'+lot_lang.dec_s5+'</a>';
				nohtml+='<div id="div_slow_id_'+rand+'" class="more" style="display:none;left:350px;"><font>'+lot_lang.dec_s5+'</font><a class="close" href="#" onclick="div_slow_hide('+rand+');return(false);">['+lot_lang.dec_s6+']</a><br /><textarea class="code" readonly="readonly">'+nos+'</textarea></div>';
            }else{
                var nohtml = nos;
            }
            //判断是否有重复相同的单
            if( $.lt_same_code[mid] != undefined && $.lt_same_code[mid][modes] != undefined && $.lt_same_code[mid][modes].length > 0 ){
                    if( $.inArray(temp.join("|"),$.lt_same_code[mid][modes]) != -1 ){//存在相同的
                        $.alert(lot_lang.am_s28);
                        return false;
                    }
            }
            nohtml  = '['+$.lt_method_data.title+'_'+$.lt_method_data.name+'] '+nohtml;
            noshtml = '['+$.lt_method_data.title+'_'+$.lt_method_data.name+'] '+nos.substring(0,37);
            serverdata += temp.join("|")+"','nums':"+nums+",'times':"+times+",'money':"+money+",'mode':"+modes+",'desc':'"+noshtml+"'}";
//CLIVE添加投注内容时候的东西要修改
			//alert(serverdata);
            var cfhtml = '<tr><th align="left" height="20px">'+nohtml+'</th><td align="center">'+$.lt_method_data.modes[modes].name+'</td><td align="center">'+nums+lot_lang.dec_s1+'</td><td align="center">'+times+lot_lang.dec_s2+'</td><td align="center">'+money+lot_lang.dec_s3+'</td><td class="del" align="center" width="45px"><span>撤销</span><input type="hidden" name="lt_project[]" value="'+serverdata+'" /></td></tr>';
            var $cfhtml = $(cfhtml);
            $cfhtml.prependTo($.lt_id_data.id_cf_content);
            //详情查看
/*
            $('span',$cfhtml).filter(".open").click(function(){
                var mme = this;
                var $h = $('<font>'+lot_lang.dec_s5+'</font><span class="close">['+lot_lang.dec_s6+']</span><br /><textarea class="code" readonly="readonly">'+nos+'</textarea>');
                $(this).openFloat($h,"more");
				$(this).show("slow");
                $("span",$(this).parent()).filter(".close").click(function(){
                    $(mme).closeFloat();
                });
            });
*/
            $.lt_total_nums  += nums;//总注数增加
            $.lt_total_money += money;//总金额增加
            $.lt_total_money  = Math.round($.lt_total_money*1000)/1000;
            basemoney         = Math.round(nums * 2 * ($.lt_method_data.modes[modes].rate * 1000))/1000;//注数*单价 * 模式
            $.lt_trace_base   = Math.round(($.lt_trace_base+basemoney)*1000)/1000;
            $($.lt_id_data.id_cf_num).html($.lt_total_nums);//更新总注数显示
            $($.lt_id_data.id_cf_money).html($.lt_total_money);//更新总金额显示
            $($.lt_id_data.id_cf_count).html(parseInt($($.lt_id_data.id_cf_count).html(),10)+1);//总投注项加1
            //计算奖金，并且判断是否支持利润率追号
            var pc = 0;
            var pz = 0;
            $.each($.lt_method_data.prize,function(i,n){
                n = isNaN(Number(n)) ? 0 : Number(n);
                pz = pz > n ? pz : n;
                pc++;
            });
            if( pc != 1 ){
                pz = 0;
            }
            pz = Math.round( pz * ($.lt_method_data.modes[modes].rate * 1000))/1000;
            $cfhtml.data('data',{methodid:mid,nums:nums,money:money,modes:modes,basemoney:basemoney,prize:pz,code:temp.join("|")});
            //把投注内容记录到临时数组中，用于判断是否有重复
            if( $.lt_same_code[mid] == undefined ){
                    $.lt_same_code[mid] = [];
            }
            if( $.lt_same_code[mid][modes] == undefined ){
                    $.lt_same_code[mid][modes] = [];
            }
            $.lt_same_code[mid][modes].push(temp.join("|"));
            $('td',$cfhtml).filter(".del").find("span").css("cursor",'pointer').attr("title",lot_lang.dec_s24).click(function(){
                var n = $cfhtml.data('data').nums;
                var m = $cfhtml.data('data').money;
                var b = $cfhtml.data('data').basemoney;
                var c = $cfhtml.data('data').code;
                var d = $cfhtml.data('data').methodid;
                var f = $cfhtml.data('data').modes;
                var i = null;
                //移除临时数组中该投注内容，用于判断是否有重复
                $.each($.lt_same_code[d][f],function(k,code){
                    if( code == c ){
                        i = k;
                    }
                });
                if( i != null ){
                    $.lt_same_code[d][f].splice(i,1);
                }else{
                    $.alert(lot_lang.am_s27);
                    return;
                }
                $.lt_total_nums  -= n;//总注数减少
                $.lt_total_money -= m;//总金额减少
                $.lt_total_money = Math.round($.lt_total_money*1000)/1000;
                $.lt_trace_base  = Math.round(($.lt_trace_base-b)*1000)/1000;
                $(this).parent().parent().remove();
                $($.lt_id_data.id_cf_num).html($.lt_total_nums);//更新总注数显示
                $($.lt_id_data.id_cf_money).html($.lt_total_money);//更新总金额显示
                $($.lt_id_data.id_cf_count).html(parseInt($($.lt_id_data.id_cf_count).html(),10)-1);//总投注项减1
                cleanTraceIssue();//清空追号区数据
            });
            //把所选模式存入cookie里面
            SetCookie('modes',modes,86400);
            //成功添加以后清空选号区数据
            for( i=0; i<data_sel.length; i++ ){//清空已选择数据
                data_sel[i] = [];
            }
            if( otype == 'input' ){//清空所有显示的数据
                $("#lt_write_box",$(me)).val("");
            }
            else if( otype == 'digital' || otype == 'dxds' || otype == 'dds' ){
                $.each($("li",$(me)).filter(".selected"),function(i,n){
                    $(this).removeClass("selected").addClass("button1");
                });
            }
            //还原倍数为1倍
            $($.lt_id_data.id_sel_times).val(1);
			select_init();
            checkNum();
            //清空追号区数据
            cleanTraceIssue();
        });
		//select_init();
    };
	function select_init(){
		if(is_select){
			$($.lt_id_data.id_beishuselect)[0].selectedIndex=0;
		}else{
			//$("input[name='lt_project_modes']:eq(0)").attr("checked",'checked'); 
		}
	}
})(jQuery);