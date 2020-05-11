// echarts图   
    async darwPie2() {     
      const  res =  await this.axios.get('report/stat_day.php')
      console.log(res)
      let myChart = this.$echarts.init(
        document.getElementById("liu"),
        "macarons"
      );
      let datas = res.data.stat;
      setEChart_barWithTool({
        myChart: myChart,
        dataEcharts: datas,
        // title: "折线图"
      });

      /**
       * @description EChart -带有工具栏的柱状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.dataEcharts 待分析的源数据
       * @param {string} [param.type] 分析项（英文名称） 可选
       * @param {string} param.title 表格title名称
       */
      function setEChart_barWithTool(param) {
        let myChart = param.myChart,
          dataEcharts = param.dataEcharts,
          type = param.type,
          title = param.title;
        console.log("setEChart_barWithTool-param:", param);
        //处理后的数据
        let nameArray = [];
        let valueArray = [];

        //X轴、Y轴名称
        // let xAxisText = getAxisName(type)[0];
        // let yAxisText = getAxisName(type)[1];
        let xAxisText = "分析项";
        let yAxisText = "数值";

        //一个分析维度
        // console.log("myChart:", myChart);
        // console.log("dataEcharts:", dataEcharts);

        for (let i = 0; i < dataEcharts.length; i++) {
          let item = dataEcharts[i];
          // console.log(item)
          for (name in item) {
            if (name == "daycount") {
              //此处value属性固定
              valueArray.push(item[name]);
            } else {
              nameArray.push(item[name]);
            }
          }
        }
        console.log("dataEcharts:", dataEcharts);
        console.log("nameArray:", nameArray);
        console.log("valueArray:", valueArray);

        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          tooltip: {
            //提示框组件
            trigger: "axis", //触发类型：axis-坐标轴触发
            formatter: xAxisText + ":{b0}<br />" + yAxisText + ":{c0}",
            axisPointer: {
              //坐标轴指示器配置项
              type: "cross", //十字准星指示器
              label: {
                //指示器文本
                show: true,
                precision: 0 //精确度，小数点后零位，即整数
              }
            }
          },
          // 工具栏切换
          // toolbox: {
          //   //工具栏
          //   show: true,
          //   itemSize: 20, //工具栏icon大小
          //   feature: {
          //     //配置项
          //     dataZoom: {
          //       //工具项*2 - 缩放
          //       show: true,
          //       yAxisIndex: false
          //     },
          //     myTool1: {
          //       //工具项-自定义方法
          //       show: true,
          //       title: "切换为饼图",
          //       icon:
          //         "path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z",
          //       onclick: function() {
          //         // alert('myToolHandler1');
          //         // setEChart_line(myChart, data);
          //         // setEChart('pieWithTool');
          //       }
          //     },
          //     magicType: {
          //       //多个工具项-动态视图类型切换的选项
          //       show: true,
          //       type: ["line", "bar"]
          //     },
          //     dataView: {
          //       //工具项-原始数据展示
          //       show: true,
          //       readOnly: true, //是否只读，可编辑的情况下，点击刷新会改变视图
          //       // lang: ['数据视图1', '关闭'], //原始数据视图下的话术：标题、按钮文字
          //       buttonColor: "#337ab7", //原始数据视图下的按钮颜色
          //       //自定义数据展示函数 - 更换为表格后会替代textarea，此时不可编辑数据，且数据无法复制
          //       optionToContent: function(opt) {
          //         var axisData = opt.xAxis[0].data;
          //         var series = opt.series;
          //         var table =
          //           '<table class="table table-striped table-bordered table-hover" style="width:100%;text-align:center"><thead><tr>' +
          //           "<th>" +
          //           xAxisText +
          //           "</th>" +
          //           "<th>" +
          //           yAxisText +
          //           "</th>" +
          //           // + '<th>' + series[1].name + '</th>'
          //           "</tr></thead><tbody>";

          //         for (var i = 0, l = axisData.length; i < l; i++) {
          //           table +=
          //             "<tr>" +
          //             "<td>" +
          //             axisData[i] +
          //             "</td>" +
          //             "<td>" +
          //             series[0].data[i] +
          //             "</td>" +
          //             // + '<td>' + series[1].data[i] + '</td>'
          //             "</tr>";
          //         }
          //         table += "</tbody></table>";
          //         return table;
          //       }
          //     },
          //     restore: { show: true }, //工具项-还原
          //     saveAsImage: {
          //       //工具项-保存为图片
          //       show: true,
          //       name: "思睿分析图", //保存的文件名称
          //       // backgroundColor: '#fff',
          //       pixelRatio: 2 //分辨率倍数
          //     }
          //   }
          // },
          legend: {
            //图例组件
            // data: ['人数']
            // itemGap: 5,
            // formatter: 'Legend',
            // selected:{
            //     "Legend":false
            // }
          },
          grid: {
            //直角坐标系内绘图网格
            top: "5%",
            left: "1%",
            right: "5%",
            containLabel: true //grid是否包含刻度标签
          },
          xAxis: {
            //直角坐标系 grid 中的 x 轴
            name: '',
            type: "category",
            data: nameArray
          },
          yAxis: {
            //直角坐标系 grid 中的 y 轴
            name: '',
            type: "value"
          },
          // 滑动区域
          // dataZoom: [
          //   //用于区域缩放
          //   {
          //     show: true,
          //     xAxisIndex: 0,
          //     type: "slider", //X轴滑动条
          //     labelPrecision: 0,
          //     start: 0,
          //     end: 100
          //   },
          //   {
          //     type: "inside", //内置（滚轮、鼠标拖动控制缩放区域）
          //     start: 0,
          //     end: 100
          //   },
          //   {
          //     show: true,
          //     yAxisIndex: 0,
          //     type: "slider", //滑动条  //Y轴滑动条
          //     labelPrecision: 0,
          //     filterMode: "empty",
          //     width: 30,
          //     height: "80%",
          //     showDataShadow: false,
          //     left: "93%"
          //   }
          // ],
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              // name: yAxisText,
              type: "line",
              smooth: 0, //折线平滑程度
              data: valueArray
            }
          ]
        };
        console.log("option:", option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    },