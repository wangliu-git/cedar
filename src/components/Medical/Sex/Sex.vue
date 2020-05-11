<template>
  <div>
    <div id="tu">
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted() {
      this.drawLineSex();    //饼图
    },
    methods:{
    
      // 性别--饼图
    async drawLineSex() {
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById(""),
        "macarons"
      );
      const { data: res } = await this.axios.get(
        "group/stat.php?group_id=1&field=sex"
      );
      let datas = res.stat;
      setEChart_pieWithTool({
        myChart: myChart,
        dataEcharts: datas,
        title: "饼图"
      });
      /**
       * @description EChart -带有工具栏的饼状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.data 待分析的源数据
       * @param {string} param.type 分析项（英文名称）
       * @param {string} param.title 表格title名称
       */
      function setEChart_pieWithTool(param) {
        let myChart = param.myChart, data = param.dataEcharts,title=param.title;
        console.log(myChart,data,title)
        myChart = echarts.init(document.getElementById('tu'), 'macarons');
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
                feature: {   //配置项
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
                        // name: echartsImgName,    //保存的文件名称
                        // backgroundColor: '#fff',
                        pixelRatio: 2    //分辨率倍数
                    },
                },
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                left: 'left',
                data: nameArray
            },
            series: [
                {
                    // name: chooseFieldName,     //中文名称，此处使用了common.js中的全局变量
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
        };
        // if (showLog) console.log('option:', option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge:true});
      }
    },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >

 
</style>
