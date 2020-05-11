/**
 * @description EChart -带有工具栏的地图，操作echarts对象更换图形
 * @param {object} param 参数列表
 * @param  {object} param.myChart 待更新的echarts对象
 * @param {object} param.data 待分析的源数据
 * @param {string} param.title 表格title名称
 */
function setEChart_mapWithTool(param) {
    let myChart = param.myChart, data = param.data.stat, title = param.title;
    if(showLog) console.log('setEChart_barWithTool-param:', param);

    //处理后的数据
    let nameArray = [];
    // let valueArray = [];
    let result = [];
    
    let maxVal = getMapSplitData(data);
    console.log('maxVal:',maxVal);

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

            min: 0,
            max: maxVal,
            realtime: false,
            text: ['人数'],
            calculable: true,
            outOfRange:{
                color:['#F5F5F5']
            },
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        //配置属性
        series: [{
            name: chooseFieldName,
            // name: title,
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
 * @description 根据data数据计算出当前地图的分组数据,返回最大值
 * @param {Array} data 对象数组，对象格式为：{name:'省份名',value:'number'}
 * @returns {number} 省份数据中的最大值
 */
function getMapSplitData(data){
    console.log(data[0])
    let maxVal = parseInt(data[0].value);
    for(let i=0;i<data.length;i++){
        maxVal = parseInt(data[i].value) > maxVal ? parseInt(data[i].value):maxVal;
    }
    return maxVal;
}


/**
 * @description 获取Echarts地图的地名映射，根据传入的值返回符合Echarts地名的数据，并将无数据的省份添加value：0防止NaN的产生
 * @param {Array} data 对象数组，对象格式为：{name:'省份名',value:'number'}
 * @returns {Array} Echarts地图所需数据
 */
function getEchartsNameMap(data){
    //Echarts城市名称映射
    var ruleArray = [
        { key: '上海', value: ['上海', '上海'] },
        { key: '云南', value: ['云南', '云南省'] },
        { key: '北京', value: ['北京', '北京市'] },
        { key: '台湾', value: ['台湾', '台湾省'] },
        { key: '四川', value: ['四川', '四川省'] },
        { key: '宁夏', value: ['宁夏', '宁夏回族自治区','宁夏自治区'] },
        { key: '山西', value: ['山西', '山西省'] },
        { key: '广东', value: ['广东', '广东省'] },
        { key: '广西', value: ['广西', '广西省'] },
        { key: '江苏', value: ['江苏', '江苏省'] },
        { key: '江西', value: ['江西', '江西省'] },
        { key: '河北', value: ['河北', '河北省'] },
        { key: '浙江', value: ['浙江', '浙江省'] },
        { key: '海南', value: ['海南', '海南省'] },
        { key: '福建', value: ['福建', '福建省'] },
        { key: '西藏', value: ['西藏', '西藏自治区'] },
        { key: '贵州', value: ['贵州', '贵州省'] },
        { key: '辽宁', value: ['辽宁', '辽宁省'] },
        { key: '陕西', value: ['陕西', '陕西省'] },
        { key: '青海', value: ['青海', '青海省'] },
        { key: '黑龙江', value: ['黑龙江', '黑龙江省'] },
        { key: '天津', value: ['天津', '天津市'] },
        { key: '重庆', value: ['重庆', '重庆市'] },
        { key: '河南', value: ['河南', '河南省'] },
        { key: '湖南', value: ['湖南', '湖南省'] },
        { key: '安徽', value: ['安徽', '安徽省'] },
        { key: '山东', value: ['山东', '山东省'] },
        { key: '新疆', value: ['新疆', '新疆维吾尔自治区'] },
        { key: '湖北', value: ['湖北', '湖北省'] },
        { key: '甘肃', value: ['甘肃', '甘肃省'] },
        { key: '内蒙古', value: ['内蒙古', '内蒙古自治区'] },
        { key: '吉林', value: ['吉林', '吉林省'] },
        { key: '香港', value: ['香港', '香港特别行政区'] },
        { key: '澳门', value: ['澳门', '澳门特别行政区'] },
        { key: '南海诸岛', value: ['南海诸岛','南海'] },
        { key: '海外', value: ['海外'] },
    ];
    let result = [];
    for(let i=0;i<ruleArray.length;i++){
        let item = ruleArray[i];
        for(let j=0;j<item.value.length;j++){
            let itm = item.value[j];
            let flag = false;
            for(let k=0;k<data.length;k++){
                if(data[k].name==itm){  //匹配时，将其加入result数组
                    result.push({ name: item.key,value:data[k].value});
                    //优化循环次数：当数据已匹配完成时，将其从ruleArray和data中去除
                    ruleArray.splice(i,1);
                    i--;
                    data.splice(k,1);
                    k--;
                    flag = true;
                    break;
                }
            }
            if(flag) break; //优化循环次数
        }
    }
    
    //再次循环ruleArray，此时剩余的数据即为没有产生映射数据的省份，添加至result并设置值为0
    for(let i=0;i<ruleArray.length;i++){
        result.push({name:ruleArray[i].key,value:0});
    }
    return result;
}








