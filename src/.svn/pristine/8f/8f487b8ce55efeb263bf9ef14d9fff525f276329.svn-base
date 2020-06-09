/*
 * @description 存放工具函数
 * @Author: webDeveloper.hechao 
 * @Date: 2020-04-22 10:06:08 
 * @Last Modified by: webDeveloper.hechao
 * @Last Modified time: 2020-04-27 15:14:24
 */

 /**
  * --MENU1 - 高通用度
  * isJSON(str)：判断一个字符串是否可以转换为JSON
  * num2char(number)：传入数字，将其转换为汉字
  * setUnit(value, unit):传入一段文本以及一个单位，若文本内已包含单位（末尾）则不重复展示单位
  * randomTime(year, accuracy):传入一个年份值和时间精确度，返回该年份中随机一个时间点
  * getTimeNum(num):当num参数位数小于两位时在前方增加一个字符串“0”
  * GetRequest():获取url中参数
  * copy(text):复制文本到粘贴板
  * removeEmpty(value, str): 传入一个值与一段文本，若值为空，则不展示文本
  * removeEmpty_val(value): 传入一个值，若值为空，则不展示
  * 
  * --MENU2 - 通用度高，但存在一定限制（如对数据格式存在要求，对参数对象有一定要求）
  * --需要框架、类库支持
  * showModal(param_): 打开模态框, 并可传入配置参数来调整模态框的展现（需bootstrap+jquery支持）
  * --对数据存在要求
  * setEChart_pie(myChart, data):EChart -饼状图，传入数据后，操作echarts对象更换图形
  * setEChart_circle(myChart, data):EChart -环形图，传入数据后，操作echarts对象更换图形
  * setEChart_bar(myChart, data):EChart -柱状图，操作echarts对象更换图形
  * setEChart_line(myChart, data):EChart -折线图，操作echarts对象更换图形
  * setEChart_map(myChart, data):EChart -地图，操作echarts对象更换图形
  * --新版Echarts-option生成方法
  * setEChart_barWithTool(param): EChart - 带有工具栏的柱状图，操作echarts对象更换图形
  * setEChart_pieWithTool(param): EChart - 带有工具栏的饼状图，操作echarts对象更换图形
  * setEChart_mapWithTool(param): EChart - 带有工具栏的地图，操作echarts对象更换图形
  * setEChart_barChartWithTool(param): EChart - 带有工具栏的条形图，操作echarts对象更换图形
  */


/**
 * @description 判断一个字符串是否可以转换为JSON
 * @param {String} str 目标字符串
 * @returns {boolean} 是否为JSON
 */
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log('error：' + str + '!!!' + e);
            return false;
        }
    }
    console.log('It is not a string!');
    return false;
}

/**
 * @description 传入数字，将其转换为汉字
 * @param {number} number 需要转换为汉字的数字
 * @returns {string} 返回的汉字
 */
function num2char(number) {

    var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    var chnUnitChar = ["", "十", "百", "千"];

    function SectionToChinese(section) {
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }

    function NumberToChinese(num) {
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;

        if (num === 0) {
            return chnNumChar[0];
        }

        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = chnNumChar[0] + chnStr;
            }
            strIns = SectionToChinese(section);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }

        return chnStr;
    }
    return NumberToChinese(number);

}

/**
 * @description 传入一段文本以及一个单位，若文本内已包含单位（末尾）则不重复展示单位
 * @param {String} value 传入的文本值
 * @param {String} unit 传入的单位
 * @returns {string} 结果string
 */
function setUnit(value, unit) {
    if (value) {
        let index = value.lastIndexOf(unit);
        if (showLog) console.log('index:', index);
        if (index == -1 || (index != -1 && index != value.length - unit.length)) {    //文本末尾不包含单位
            return value + "" + unit;
        } else {
            return value;
        }
    }
}

/**
 * @description 传入一个年份值，返回该年份中随机一个时间点
 * @param {number} year 
 * @param {String} accuracy:精确度，返回日期精确到什么单位（day、hour、minute、second） 当前仅支持day、minute
 */
function randomTime(year, accuracy) {
    let tempDate = new Date(year + '-1' + '-1').getTime();
    let randomNum = Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);    //在一年内随机一个数值
    tempDate += randomNum;
    let birthDayResult = new Date(tempDate);
    let result;
    if (accuracy == 'day') {
        result = birthDayResult.getFullYear() + "-" + getTimeNum(birthDayResult.getMonth() + 1) + "-" + getTimeNum(birthDayResult.getDate());

    } else if (accuracy == 'minute') {
        result = birthDayResult.getFullYear() + "-" +
            getTimeNum(birthDayResult.getMonth() + 1) + "-" +
            getTimeNum(birthDayResult.getDate()) + " " +
            getTimeNum(birthDayResult.getHours()) + ":" +
            getTimeNum(birthDayResult.getMinutes());
    }
    return result;
}

/**
 * @description 当num参数位数小于两位时在前方增加一个字符串“0” 
 * @param {number} num 传入的参数
 * @returns {string} 返回处理后的结果
 */
function getTimeNum(num) {
    return num.toString().length == 1 ? '0' + num : num;
}

/**
 * @description 获取url中参数
 * @returns {Object} url参数列表
 */
function GetRequest() {
    var url = location.search;   //获取url中"?"符后的字串   
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        let strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 * @description 复制文本到粘贴板
 * @param {string} text 
 */
function copy(text) {
    var input = document.createElement('input');
    input.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
    input.setAttribute('value', text);
    document.body.appendChild(input);
    // input.setSelectionRange(0, 9999);
    input.select();
    var res = document.execCommand('copy');
    document.body.removeChild(input);
    return res;
}


/**
 * @description 传入一个值与一段文本，若值为空，则不展示文本
 * @param {string} value 用于判断是否为空的值
 * @param {string} str 用于展示的文本
 * @returns {string} 返回结果，空||str
 */
function removeEmpty(value, str) {
    if ((!value && value != 0) || value == "") return "";
    return str;
}

/**
 * @description 传入一个值，若值为空，则不展示
 * @param {string} value 用于判断是否为空的值
 * @returns {string} 返回结果，空||value
 */
function removeEmpty_val(value) {
    if ((!value && value != 0) || value == "") return "";
    return value;
}

/**
 * @description 打开模态框,并可传入配置参数来调整模态框的展现
 * @param {Object} param_ 模态框展示以及定制化所需的参数对象，不传递参数时使用默认值
 * @param {string} param.title 标题，默认为“提示”
 * @param {string} param.content 内容，默认为“是否确认执行该操作？”
 * @param {string} param.cancerText 取消按钮文字，默认为“取消”
 * @param {string} param.confirmText 确认按钮文字，默认为“确认”
 * @param {boolean} param.showCancel 是否显示取消按钮，默认显示
 * @param {function} param.show_bs_modal 模态框显示事件触发后的事件，此处属性命名方式沿用了Bootstrap事件监听的命名
 * @param {function} param.hide_bs_modal 模态框隐藏事件触发后的事件，此处属性命名方式沿用了Bootstrap事件监听的命名
 * @param {function}  param.confirm 模态框的确认按钮被点击触发事件
 */
function showModal(param_) {
    let param = param_ ? param_ : {};
    param.title = param.title ? param.title : "提示";
    param.content = param.content ? param.content : "是否确认执行该操作？";
    param.cancerText = param.cancerText ? param.cancerText : "取消";
    param.confirmText = param.confirmText ? param.confirmText : "确认";
    param.showCancel = (param.showCancel != undefined && !param.showCancel) ? param.showCancel : true;
    param.confirm = param.confirm ? param.confirm : "";
    param.show_bs_modal = param.show_bs_modal ? param.show_bs_modal : "";
    param.hide_bs_modal = param.hide_bs_modal ? param.hide_bs_modal : "";

    let modalHTML = '' +
        '<div class="modal fade middleModal bs-example-modal-sm" id="commonModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
        '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<h4 class="modal-title" id="myModalLabel">' + param.title + '</h4>' +
        '</div>' +
        '<div class="modal-body">' + param.content + '</div>' +
        '<div class="modal-footer">';
    if (param.showCancel) {
        modalHTML += '<div type="button" class="btn btn-default" data-dismiss="modal">' + param.cancerText + '</div>';
    }
    modalHTML += '<button type="button" class="btn btn-primary commonModalSureBtn" data-dismiss="modal">' + param.confirmText + '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    console.log('modalHTML:', modalHTML);
    //防止重复添加
    if ($("#commonModal").length >= 1) {
        $("#commonModal").prop('outerHTML', modalHTML);
    } else {
        $('body').append(modalHTML);
    }
    //添加事件监听 - 模态框中确认按钮点击事件
    $(document).off('click', '.commonModalSureBtn');
    $(document).on('click', '.commonModalSureBtn', function () {
        typeof param.confirm == 'function' && param.confirm();
    });
    //模态框显示事件
    $('#commonModal').off('show.bs.modal');
    $('#commonModal').on('show.bs.modal', function (e, clickedIndex, isSelected, previousValue) {
        console.log('common-show.bs.modal');
        typeof param.show_bs_modal == 'function' && param.show_bs_modal();
    });
    //模态框隐藏事件
    $('#commonModal').off('hide.bs.modal');
    $('#commonModal').on('hide.bs.modal', function (e, clickedIndex, isSelected, previousValue) {
        typeof param.hide_bs_modal == 'function' && param.hide_bs_modal();
    });
    $("#commonModal").modal('show');

}


/**
 * @description EChart -饼状图，传入数据后，操作echarts对象更换图形
 * @param  {object} myChart 待更新的echarts对象
 * @param {object} data 待分析的源数据
 */
function setEChart_pie(myChart, data) {
    let nameArray = [];
    for (var i = 0; i < data.length; i++) {
        nameArray.push(data[i].name);
    }
    
    option = {
        // title: {
        //     text: '同名数量统计',
        //     subtext: '纯属虚构',
        //     left: 'center'
        // },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: nameArray,

            // selected: data.selected
        },
        series: [
            {
                name: chooseFieldName,
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    if (showLog) console.log('option:', option);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true);
}

/**
 * @description EChart -环形图，传入数据后，操作echarts对象更换图形
 * @param  {object} myChart 待更新的echarts对象
 * @param {object} data 待分析的源数据
 */
function setEChart_circle(myChart, data) {
    let nameArray = [];
    for (var i = 0; i < data.length; i++) {
        nameArray.push(data[i].name);
    }


    option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: nameArray
        },
        series: [
            {
                name: chooseFieldName,
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: data
            }
        ]
    };



    if (showLog) console.log('option:', option);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true);
}

/**
 * @description EChart -柱状图，操作echarts对象更换图形
 * @param  {object} myChart 待更新的echarts对象
 * @param {object} data 待分析的源数据
 */
function setEChart_bar(myChart, data) {
    let nameArray = [];
    let valueArray = [];
    for (var i = 0; i < data.length; i++) {
        nameArray.push(data[i].name);
        valueArray.push(data[i].value);
    }
    option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        xAxis: {
            type: 'category',
            data: nameArray
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: chooseFieldName,
            data: valueArray,
            type: 'bar'
        }]
    };
    if (showLog) console.log('option:', option);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true);

}

/**
 * @description EChart -折线图，操作echarts对象更换图形
 * @param  {object} myChart 待更新的echarts对象
 * @param {object} data 待分析的源数据
 */
function setEChart_line(myChart, data) {
    let nameArray = [];   //X轴的数据
    let valueArray = [];    //Y轴的数据

    // 遍历拿到数据
    for (var i = 0; i < data.length; i++) {
        nameArray.push(data[i].name);
        valueArray.push(data[i].value);
    }

    option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'
        },
        xAxis: {
            type: 'category',
            data: nameArray
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: chooseFieldName,
            data: valueArray,
            type: 'line'
        }]
    };
    // if (showLog) console.log('option:', option);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true);
}

/**
 * @description EChart -地图，操作echarts对象更换图形
 * @param  {object} myChart 待更新的echarts对象
 * @param {object} data 待分析的源数据
 */
function setEChart_map(myChart, data) {
    let nameArray = [];
    let valueArray = [];
    for (var i = 0; i < data.length; i++) {
        nameArray.push(data[i].name);
        valueArray.push(data[i].value);
    }
    //防止NaN的显示
    // data.push({ name: '南海诸岛', value: 0 });
    // if (showLog) console.log('data:', nameArray);
    var optionMap = {
        backgroundColor: '#FFFFFF',
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        xAxis: {
            show: false,
        },
        yAxis: {
            show: false,
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: nameArray,
        },

        //左侧小导航图标
        visualMap: {
            show: true,
            x: 'left',
            y: 'center',
            splitList: [
                { start: 0, end: 50 }, { start: 50, end: 100 },
                { start: 100, end: 150 }, { start: 150, end: 200 },
                { start: 200, end: 250 }, { start: 250, end: 300 },
            ],
            color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
        },
        //配置属性
        series: [{
            name: chooseFieldName,
            type: 'map',
            mapType: 'china',
            roam: true,
            label: {
                normal: {
                    show: true  //省份名称  
                },
                emphasis: {
                    show: false
                }
            },
            data: data,  //数据
            // 自定义名称映射
            nameMap: echartsNameMap
        }]
    };
    myChart.setOption(optionMap, true);
}

/**
 * @description EChart -带有工具栏的柱状图，操作echarts对象更换图形
 * @param {object} param 参数列表
 * @param  {object} param.myChart 待更新的echarts对象
 * @param {object} param.data 待分析的源数据
 * @param {string} param.type 分析项（英文名称）
 * @param {string} param.title 表格title名称
 */
function setEChart_barWithTool(param) {
    let myChart = param.myChart,data = param.data.stat,type = param.type,title = param.title;
    console.log('setEChart_barWithTool-param:', param);
    
    //处理后的数据
    let nameArray = [];
    let valueArray = [];
    
    //X轴、Y轴名称
    let xAxisText = getAxisName(type)[0];
    let yAxisText = getAxisName(type)[1];
    
    //一个分析维度
    for(let i=0;i<data.length;i++){
        let item = data[i];
        for (name in item){
            if (name == 'value'){   //此处value属性固定
                valueArray.push(item[name]);
            }else{
                nameArray.push(item[name]);
            }
        }
    }

    console.log('data:',data);
    console.log('nameArray:', nameArray);
    console.log('valueArray:', valueArray);

    let option = {
        title:{     //标题
            text: title,
            left:'center',
            top:'10px',
            textAlign:'center'
        },
        tooltip: {  //提示框组件
            trigger: 'axis',    //触发类型：axis-坐标轴触发
            formatter: xAxisText+':{b0}<br />'+yAxisText+':{c0}',
            axisPointer: {  //坐标轴指示器配置项
                type: 'cross',  //十字准星指示器
                label: {    //指示器文本
                    show: true,
                    precision: 0,    //精确度，小数点后零位，即整数
                }
            }
        },
        toolbox: {  //工具栏
            show: true,
            itemSize: 20,    //工具栏icon大小
            feature: {  //配置项
                dataZoom: {  //工具项*2 - 缩放
                    show: true,
                    yAxisIndex: false
                },
                myTool1: {  //工具项-自定义方法
                    show: true,
                    title: '切换为饼图',
                    icon: 'path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z',
                    onclick: function () {
                        // alert('myToolHandler1');
                        // setEChart_line(myChart, data);
                        setEChart('pieWithTool');
                    }
                },
                magicType: { //多个工具项-动态视图类型切换的选项
                    show: true,
                    type: ['line', 'bar']
                },
                dataView: {     //工具项-原始数据展示
                    show: true,
                    readOnly: true, //是否只读，可编辑的情况下，点击刷新会改变视图
                    // lang: ['数据视图1', '关闭'], //原始数据视图下的话术：标题、按钮文字
                    buttonColor: '#337ab7',  //原始数据视图下的按钮颜色
                    //自定义数据展示函数 - 更换为表格后会替代textarea，此时不可编辑数据，且数据无法复制
                    optionToContent: function (opt) {
                        var axisData = opt.xAxis[0].data;
                        var series = opt.series;
                        var table = '<table class="table table-striped table-bordered table-hover" style="width:100%;text-align:center"><thead><tr>'
                            + '<th>' + xAxisText+'</th>'
                            + '<th>' + yAxisText + '</th>'
                            // + '<th>' + series[1].name + '</th>'
                            + '</tr></thead><tbody>';

                        for (var i = 0, l = axisData.length; i < l; i++) {
                            table += '<tr>'
                                + '<td>' + axisData[i] + '</td>'
                                + '<td>' + series[0].data[i] + '</td>'
                                // + '<td>' + series[1].data[i] + '</td>'
                                + '</tr>';
                        }
                        table += '</tbody></table>';
                        return table;
                    }
                },
                restore: { show: true },   //工具项-还原
                saveAsImage: {  //工具项-保存为图片
                    show: true,
                    name: echartsImgName,    //保存的文件名称
                    // backgroundColor: '#fff',
                    pixelRatio: 2    //分辨率倍数
                },
            }
        },
        legend: {   //图例组件
            // data: ['人数']
            // itemGap: 5,
            // formatter: 'Legend',
            // selected:{
            //     "Legend":false
            // }
        },
        grid: { //直角坐标系内绘图网格
            top: '12%',
            left: '1%',
            right: '12%',
            containLabel: true  //grid是否包含刻度标签
        },
        xAxis: {    //直角坐标系 grid 中的 x 轴
            name: xAxisText,
            type: 'category',
            data: nameArray
        },
        yAxis: { //直角坐标系 grid 中的 y 轴
            name: yAxisText,
            type: 'value'
        },
        dataZoom: [ //用于区域缩放
            {
                show: true,
                xAxisIndex: 0,
                type: 'slider',  //X轴滑动条
                labelPrecision: 0,
                start: 0,
                end: 100
            },
            {
                type: 'inside', //内置（滚轮、鼠标拖动控制缩放区域）
                start: 0,
                end: 100
            },
            {
                show: true,
                yAxisIndex: 0,
                type: 'slider',  //滑动条  //Y轴滑动条
                labelPrecision: 0,
                filterMode: 'empty',
                width: 30,
                height: '80%',
                showDataShadow: false,
                left: '93%'
            }
        ],
        series: [   //系列列表。每个系列通过 type 决定自己的图表类型
            {
                // name: yAxisText,
                type: 'bar',
                smooth: 0.5,   //折线平滑程度
                data: valueArray
            }
        ]
    };
    
    if (type=='sex'){   
        option.toolbox.feature.dataZoom.show = false;   //不提供区域缩放
        option.toolbox.feature.magicType.type = []; //不切换折线图
    } else if (type =='first_doctor'){  
        option.toolbox.feature.magicType.type = []; //不切换折线图
    } else if (type == 'preoperative_treatment') {    
        option.toolbox.feature.magicType.type = []; //不切换折线图
    } else if (type =='histologic_type'){

    }

    //针对分析项进行调整,此处对同类操作暂不做switch的合并，以防止分析项仍有针对性修改
    switch(type){
        case 'sex'://性别：无折线图的切换，不提供区域缩放
            option.toolbox.feature.dataZoom.show = false;   //不提供区域缩放
            option.toolbox.feature.magicType.type = []; //不切换折线图
            break;
        case 'first_doctor'://初诊医生（诊断医生）:无折线图的切换
        case 'who_grade':   //WHO分级(分化程度)
        case 'histologic_type'://组织学类型：无折线图的切换
        case 'preoperative_treatment'://术前辅助治疗：无折线图的切换
        case 'position'://术前辅助治疗：无折线图的切换
        case 'dia_molecular_typing'://术前辅助治疗：无折线图的切换
        case 'dia_molecular_typing':
            option.toolbox.feature.magicType.type = []; //不切换折线图
            break;
         
            

    }

    if (showLog) console.log('option:', option);
    // 使用刚指定的配置项和数据显示图表。
    myChart.clear();
    myChart.setOption(option, { notMerge: true });
}

/**
 * @description EChart -带有工具栏的饼状图，操作echarts对象更换图形
 * @param {object} param 参数列表
 * @param  {object} param.myChart 待更新的echarts对象
 * @param {object} param.data 待分析的源数据
 * @param {string} param.type 分析项（英文名称）
 * @param {string} param.title 表格title名称
 */
function setEChart_pieWithTool(param) {

    let myChart = param.myChart, data = param.data.stat,title=param.title;
    myChart = echarts.init(document.getElementById('EChart'), 'macarons');
    //处理后的数据
    let nameArray = [];
    let result=[];


    //一个分析维度
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let propName = '';  //属性名
        for (name in item) {
            //为nameArray赋值
            if (name != 'value') {   //此处value属性固定
                nameArray.push(item[name]);
                propName = name;
            }
        }
        result.push({
            name:item[propName],
            value:item.value,
        });
    }
    console.log('饼图数据处理：', result)
    let option = {
        title: {     //标题
            text: title,
            left: 'center',
            top: '10px',
            textAlign: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {  //工具栏
            show: true,
            itemSize: 20,    //工具栏icon大小
            feature: {  //配置项
                myTool2: { //工具项-自定义方法
                myTool2: { //工具项-自定义方法
                    show: true,
                    title: '切换为柱状图',
                    icon: 'path://M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7',
                    onclick: function () {
                        setEChart('barWithTool');
                    }
                },
                saveAsImage: {  //工具项-保存为图片
                    show: true,
                    name: echartsImgName,    //保存的文件名称
                    // backgroundColor: '#fff',
                    pixelRatio: 2    //分辨率倍数
                },
            }
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                left: 'left',
                data: nameArray
            },
            series: [
                {
                    name: chooseFieldName,     //中文名称，此处使用了common.js中的全局变量
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: result,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
        // if (showLog) console.log('option:', option);
        // 使用刚指定的配置项和数据显示图表。
        
    }
    myChart.clear();
    myChart.setOption(option, { notMerge:true});
}


/**
 * @description EChart -带有工具栏的地图，操作echarts对象更换图形
 * @param {object} param 参数列表
 * @param  {object} param.myChart 待更新的echarts对象
 * @param {object} param.data 待分析的源数据
 * @param {string} param.type 分析项（英文名称）
 * @param {string} param.title 表格title名称
 */
function setEChart_mapWithTool(param) {
    let myChart = param.myChar  , data = param.data.stat, title = param.title;
    console.log('setEChart_barWithTool-param:', param);

    //处理后的数据
    let nameArray = [];
    // let valueArray = [];
    let result = [];


    //一个分析维度
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let propName = '';  //属性名
        for (name in item) {
            //为nameArray赋值
            if (name != 'value') {   //此处value属性固定
                nameArray.push(item[name]);
                propName = name;
            }
        }
        result.push({
            name: item[propName],
            value: item.value,
        });
    }
    console.log('地图数据处理：', result);


    var optionMap = {
        title: {     //标题
            text: title,
            left: 'center',
            top: '10px',
            textAlign: 'center'
        },
        backgroundColor: '#FFFFFF',
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        toolbox: {  //工具栏
            show: true,
            itemSize: 20,    //工具栏icon大小
            feature: {  //配置项
                saveAsImage: {  //工具项-保存为图片
                    show: true,
                    name: echartsImgName,    //保存的文件名称
                    // backgroundColor: '#fff',
                    pixelRatio: 2    //分辨率倍数
                },
            }
        },
        xAxis: {
            show: false,
        },
        yAxis: {
            show: false,
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: nameArray,
        },

        //左侧小导航图标
        visualMap: {
            show: true,
            x: 'left',
            y: 'center',
            splitList: [
                { start: 1, end: 5 }, { start: 5, end: 10 },
                { start: 10, end: 15 }, { start: 15, end: 20 },
                { start: 20, end: 25 }, { start: 25, end: 30 },
            ],
            color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
        },
        //配置属性
        series: [{
            name: chooseFieldName,
            type: 'map',
            mapType: 'china',
            roam: true,
            label: {
                normal: {
                    show: true  //省份名称
                },
                emphasis: {
                    show: false
                }
            },
            data: getEchartsNameMap(result),  //数据
        }]
    };
    myChart.clear();
    myChart.setOption(optionMap, { notMerge: true });
}

/**
 * @description EChart -带有工具栏的条形图，操作echarts对象更换图形
 * @param {object} param 参数列表
 * @param  {object} param.myChart 待更新的echarts对象
 * @param {object} param.data 待分析的源数据，对象格式：1.检测率{prop:'',value''}；2.阳性率{prop:'',result_normal:'',value''}
 * @param {string} param.type 分析项（英文名称）
 * @param {string} param.title 表格title名称
 */
function setEChart_barChartWithTool(param) {

    let myChart = param.myChart, data = param.data.stat, type = param.type, title = param.title;
    let total = param.data.total;
    console.log('setEChart_barWithTool-param:', param);

    //处理后的数据
    let nameArray = [];
    let valueArray = [];

    //X轴、Y轴名称
    let xAxisText = getAxisName(type)[0];
    let yAxisText = getAxisName(type)[1];

    //读取属性名称
    let propArray = [];
    for(name in data[0]){
        if (name != 'value') propArray.push(name);
    }
    //根据属性名数量决定类型（检测率or阳性率）
    let handleType = 0;
    if (propArray.length==1){    //检测率
        handleType = 1;
    } else if (propArray.length == 2){  //阳性率：对数据进行处理，将阴性数据剔除
        handleType = 2;
        for(let i=0;i<data.length;i++){
            if (data[i].result_normal!='+'){
                data.splice(i,1);
                i--
            }
        }
    }else{
        console.error('错误：条形图数据格式错误！');
    }

    //一个分析维度
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if(handleType==1){  //检测率，除value外仅一个属性
            nameArray.push(item[propArray[0]]);
        }else if(handleType==2){    //阳性率，此处兼容对象中的属性顺序
            let propName = propArray[0]=='result_normal'?propArray[1]:propArray[0];
            nameArray.push(item[propName]);
        }
        //免疫组化检测率,精确到小数点后四位，四舍五入
        valueArray.push(Math.round(item.value / total * 10000)/10000);
    }

    console.log('data:', data);
    console.log('nameArray:', nameArray);
    console.log('valueArray:', valueArray);

    let option = {
        title: {     //标题
            text: title,
            left: 'center',
            top: '10px',
            textAlign: 'center'
        },
        tooltip: {  //提示框组件
            trigger: 'axis',    //触发类型：axis-坐标轴触发
            formatter: xAxisText + ':{b0}<br />' + yAxisText + ':{c0}',
            axisPointer: {  //坐标轴指示器配置项
                type: 'cross',  //十字准星指示器
                label: {    //指示器文本
                    show: true,
                    precision: 4,    //精确度，小数点后4位
                }
            }
        },
        toolbox: {  //工具栏
            show: true,
            itemSize: 20,    //工具栏icon大小
            feature: {  //配置项
                dataZoom: {  //工具项*2 - 缩放
                    show: true,
                    xAxisIndex: false,  //不在X轴生效
                },
                dataView: {     //工具项-原始数据展示
                    show: true,
                    readOnly: true, //是否只读，可编辑的情况下，点击刷新会改变视图
                    // lang: ['数据视图1', '关闭'], //原始数据视图下的话术：标题、按钮文字
                    buttonColor: '#337ab7',  //原始数据视图下的按钮颜色
                    //自定义数据展示函数 - 更换为表格后会替代textarea，此时不可编辑数据，且数据无法复制
                    optionToContent: function (opt) {
                        var axisData = opt.yAxis[0].data;
                        var series = opt.series;
                        var table = '<table class="table table-striped table-bordered table-hover" style="width:100%;text-align:center"><thead><tr>'
                            + '<th>' + xAxisText + '</th>'
                            + '<th>' + yAxisText + '</th>'
                            // + '<th>' + series[1].name + '</th>'
                            + '</tr></thead><tbody>';

                        for (var i = 0, l = axisData.length; i < l; i++) {
                            table += '<tr>'
                                + '<td>' + axisData[i] + '</td>'
                                + '<td>' + series[0].data[i] + '</td>'
                                // + '<td>' + series[1].data[i] + '</td>'
                                + '</tr>';
                        }
                        table += '</tbody></table>';
                        return table;
                    }
                },
                restore: { show: true },   //工具项-还原
                saveAsImage: {  //工具项-保存为图片
                    show: true,
                    name: echartsImgName,    //保存的文件名称
                    backgroundColor: '#fff',
                    pixelRatio: 2    //分辨率倍数
                },
            }
        },
        legend: {   //图例组件
            // data: ['人数']
            // itemGap: 5,
            // formatter: 'Legend',
            // selected:{
            //     "Legend":false
            // }
        },
        grid: { //直角坐标系内绘图网格
            top: '12%',
            left: '1%',
            right: '12%',
            containLabel: true  //grid是否包含刻度标签
        },
        yAxis: {    //直角坐标系 grid 中的 y 轴（此处沿用柱状图规则，y轴使用xAxisText命名）
            name: xAxisText,
            type: 'category',
            data: nameArray
        },
        xAxis: { //直角坐标系 grid 中的 y 轴
            name: yAxisText,
            type: 'value'
        },
        dataZoom: [ //用于区域缩放
            {
                show: true,
                yAxisIndex: 0,
                type: 'slider',  //y轴滑动条
                labelPrecision: 0,
                start: 0,
                end: 100
            },
            {
                type: 'inside', //内置（滚轮、鼠标拖动控制缩放区域）
                yAxisIndex:0,
                start: 0,
                end: 100
            },
            {
                show: true,
                xAxisIndex: 0,
                type: 'slider',  //滑动条  //x轴滑动条
                // labelPrecision: 0,
                // filterMode: 'empty',
                // width: 30,
                // height: '80%',
                showDataShadow: false,
                // left: '93%'
            }
        ],
        series: [   //系列列表。每个系列通过 type 决定自己的图表类型
            {
                // name: yAxisText,
                type: 'bar',
                smooth: 0.5,   //折线平滑程度
                data: valueArray
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.clear();
    myChart.setOption(option, { notMerge: true });
}