
/**
 * @description EChart -带有工具栏的条形图，操作echarts对象更换图形；此方法支持检测率、阳性率数据，数据格式见param.data说明
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

    //X轴、Y轴名称 tips:此处为全局变量中获取的X轴Y轴名称，可以自定义
    //let xAxisText = getAxisName(type)[0];
    //let yAxisText = getAxisName(type)[1];
	let xAxisText = "X轴";
	let yAxisText = "Y轴";

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
        // console.error('错误：条形图数据格式错误！');
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

    if(showLog) console.log('data:', data);
    if(showLog) console.log('nameArray:', nameArray);
    if(showLog) console.log('valueArray:', valueArray);

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
                    //name: echartsImgName,    //保存的文件名称 tips:此处为全局变量中获取的数据，可以自定义
					name: '数据分析图表-志诺维思',
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
                // name: title,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值', label: { align: 'center', verticalAlign: 'top'} },
                        { type: 'min', name: '最小值', label: { align: 'center', verticalAlign: 'top' } }
                    ],
                    symbolSize:60,
                    symbolRotate:270,
                    label: {
                        show: true
                    }
                },
                smooth: 0.5,   //折线平滑程度
                data: valueArray
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.clear();
    myChart.setOption(option, { notMerge: true });
}
