<template>
  <div>
    <div id="wang" style="width:1400px;height:800px"></div>
    <div id="liu" style="width:1400px;height:800px"></div>
    <div id="map" style="width:1400px;height:800px"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";

export default {
  mounted() {
    this.get1();
    this.get2();
    this.get3();
  },
  methods: {
    // 柱图
    get1() {
      const res = this.axios
        .get(
          "http://192.168.75.58/cedar/api/group/stat.php?group_id=2&field=mark&type=1&table=ly_helper_diagnosis"
        )
        .then(res => {
          // console.log(res)
          var myChart = this.$echarts.init(
            document.getElementById("wang"),
            "macarons"
          );
          let datas = res.data.stat;
          let valueArray = [];
          let nameArray = [];
          datas.map((item, index) => {
            // console.log(item)
            nameArray.push(item.mark);
            valueArray.push(item.value);
          });
          // console.log(nameArray)
          // console.log(valueArray)
          // valueArray.push(datas.total1, datas.total2, datas.total3);
          var that = this;
          let option = {
            title: {
              left: "center",
              top: "10px",
              textAlign: "center"
            },
            tooltip: {
              //提示框组件
              trigger: "axis", //触发类型：axis-坐标轴触发
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
            grid: {
              //直角坐标系内绘图网格
              top: "10%",
              left: "5%",
              right: "5%",
              bottom: "10%",
              containLabel: true //grid是否包含刻度标签
            },
            xAxis: {
              //直角坐标系 grid 中的 x 轴
              name: "标志物",
              type: "category",
              data: nameArray
            },
            yAxis: {
              //直角坐标系 grid 中的 y 轴
              name: "检测结果"
            },

            series: [
              //系列列表。每个系列通过 type 决定自己的图表类型
              {
                // name: yAxisText,
                type: "bar",
                // smooth: 0, //折线平滑程度
                data: valueArray
              }
            ],
            toolbox: {
              show: true,
              feature: {
                dataZoom: {
                  yAxisIndex: "none"
                },
                dataView: { readOnly: false },
                magicType: { type: ["line", "bar", "pie"] },
                restore: {},
                saveAsImage: {},
                myTool1: {
                  //工具项-自定义方法
                  show: true,
                  title: "切换为饼图",
                  icon:
                    "path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z",
                  onclick: function() {
                    // alert('myToolHandler1');
                    // setEChart_line(myChart, dataEcharts);
                    // setEChart('pieWithTool')
                    that.getbing();
                  }
                }
              }
            },
            dataZoom: [
              //用于区域缩放
              {
                show: true,
                xAxisIndex: 0,
                type: "slider", //X轴滑动条
                labelPrecision: 0,
                start: 0,
                end: 100
              },
              {
                type: "inside", //内置（滚轮、鼠标拖动控制缩放区域）
                start: 0,
                end: 100
              },
              {
                show: true,
                yAxisIndex: 0,
                type: "slider", //滑动条  //Y轴滑动条
                labelPrecision: 0,
                filterMode: "empty",
                width: 30,
                height: "80%",
                showDataShadow: false,
                left: "98%"
              }
            ]
          };
          // console.log("option:", option);
          // 使用刚指定的配置项和数据显示图表。
          myChart.clear();
          myChart.setOption(option, { notMerge: true });
        });
    },
    getbing() {
      const res = this.axios
        .get(
          "http://192.168.75.58/cedar/api/group/stat.php?group_id=2&field=mark&type=1&table=ly_helper_diagnosis"
        )
        .then(res => {
          // console.log(res)
          var myChart = this.$echarts.init(
            document.getElementById("wang"),
            "macarons"
          );
          let datas = res.data.stat;
          let nameArray = [];
          let valueArray = [];
          let result = [];
          datas.map((item, index) => {
            // console.log(item)
            nameArray.push(item.mark);
            valueArray.push(item.value);
            result.push({
              name: nameArray[index],
              value: valueArray[index]
            });
          });
          // console.log(nameArray)
          // console.log(valueArray)
          // valueArray.push(datas.total1, datas.total2, datas.total3);
          var that = this;
          let option = {
            title: {
              left: "center",
              top: "10px",
              textAlign: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            grid: {
              //直角坐标系内绘图网格
              top: "10%",
              left: "5%",
              right: "5%",
              bottom: "10%",
              containLabel: true //grid是否包含刻度标签
            },
            series: [
              //系列列表。每个系列通过 type 决定自己的图表类型
              {
                // name: yAxisText,
                type: "pie",
                radius: "55%",
                center: ["50%", "60"],
                // smooth: 0, //折线平滑程度
                data: result
              }
            ],
            toolbox: {
              show: true,
              feature: {
                saveAsImage: {
                  show: true,
                  // name: echartsImgName,    //保存的文件名称
                  // backgroundColor: '#fff',
                  pixelRatio: 2 //分辨率倍数
                }
              },
              myTool1: {
                //工具项-自定义方法
                show: true,
                title: "切换为柱图",
                icon:
                  "path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z",
                onclick: function() {
                  that.get1();
                }
              }
            }
          };
          myChart.clear();
          myChart.setOption(option, { notMerge: true });
        });
    },
    // 饼图
    get2() {
      const res = this.axios
        .get(
          "http://192.168.75.58/cedar/api/group/stat.php?group_id=2&field=mark&type=1&table=ly_helper_diagnosis"
        )
        .then(res => {
          // console.log(res)
          var myChart = this.$echarts.init(
            document.getElementById("liu"),
            "macarons"
          );
          let data = res.data.stat;
          let valueArray = [];
          let nameArray = [];
          let result = [];
          data.map((item, index) => {
            // console.log(item)
            nameArray.push(item.mark);
            valueArray.push(item.value);
            result.push({
              name: nameArray[index],
              value: valueArray[index]
            });
          });
          var that = this;
          let option = {
            title: {
              left: "center",
              top: "10px",
              textAlign: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            grid: {
              //直角坐标系内绘图网格
              top: "10%",
              left: "5%",
              right: "5%",
              bottom: "10%",
              containLabel: true //grid是否包含刻度标签
            },
            series: [
              // 饼图需要在系列里放result：{ {name: "BCL2", value: "1"}}的对象值
              //系列列表。每个系列通过 type 决定自己的图表类型
              {
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: result,
                
              }
            ],
            toolbox: {
              //工具栏
              show: true,
              itemSize: 20, //工具栏icon大小
              feature: {
                //配置项
                saveAsImage: {
                  //工具项-保存为图片
                  show: true,
                  // name: echartsImgName,    //保存的文件名称
                  // backgroundColor: '#fff',
                  pixelRatio: 2 //分辨率倍数
                }
              },
              myTool2: {
                //工具项-自定义方法
                show: true,
                title: "切换为柱状图",
                icon:
                  "path://M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
                onclick: function() {
                  that.getzhu();
                }
              }
            },
            legend: {
              type: "scroll",
              orient: "vertical",
              left: "left",
              data: nameArray
            }
          };
          myChart.clear();
          myChart.setOption(option, { notMerge: true });
        });
    },
    getzhu() {
      const res = this.axios
        .get(
          "http://192.168.75.58/cedar/api/group/stat.php?group_id=2&field=mark&type=1&table=ly_helper_diagnosis"
        )
        .then(res => {
          // console.log(res)
          var myChart = this.$echarts.init(
            document.getElementById("liu"),
            "macarons"
          );
          let datas = res.data.stat;
          let valueArray = [];
          let nameArray = [];
          datas.map((item, index) => {
            // console.log(item)
            nameArray.push(item.mark);
            valueArray.push(item.value);
          });
          // console.log(nameArray)
          // console.log(valueArray)
          // valueArray.push(datas.total1, datas.total2, datas.total3);
          var that = this;
          let option = {
            title: {
              left: "center",
              top: "10px",
              textAlign: "center"
            },
            tooltip: {
              //提示框组件
              trigger: "axis", //触发类型：axis-坐标轴触发
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
            grid: {
              //直角坐标系内绘图网格
              top: "10%",
              left: "5%",
              right: "5%",
              bottom: "10%",
              containLabel: true //grid是否包含刻度标签
            },
            xAxis: {
              //直角坐标系 grid 中的 x 轴
              name: "标志物",
              type: "category",
              data: nameArray
            },
            yAxis: {
              //直角坐标系 grid 中的 y 轴
              name: "检测结果"
            },
            magicType: {
              type: ["pie", "bar", "stack", "tiled"]
            },

            series: [
              //系列列表。每个系列通过 type 决定自己的图表类型
              {
                // name: yAxisText,
                type: "bar",
                // smooth: 0, //折线平滑程度
                data: valueArray
              }
            ],
            toolbox: {
              //工具栏
              show: true,
              itemSize: 20, //工具栏icon大小
              feature: {
                //配置项
                myTool2: {
                  //工具项-自定义方法
                  show: true,
                  title: "切换为饼图",
                  icon:
                    "path://M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
                  onclick: function() {
                    that.get2();
                  }
                },
                saveAsImage: {
                  //工具项-保存为图片
                  show: true,
                  // name: echartsImgName,    //保存的文件名称
                  // backgroundColor: '#fff',
                  pixelRatio: 2 //分辨率倍数
                }
              }
            },
            dataZoom: [
              //用于区域缩放
              {
                show: true,
                xAxisIndex: 0,
                type: "slider", //X轴滑动条
                labelPrecision: 0,
                start: 0,
                end: 100
              },
              {
                type: "inside", //内置（滚轮、鼠标拖动控制缩放区域）
                start: 0,
                end: 100
              },
              {
                show: true,
                yAxisIndex: 0,
                type: "slider", //滑动条  //Y轴滑动条
                labelPrecision: 0,
                filterMode: "empty",
                width: 30,
                height: "80%",
                showDataShadow: false,
                left: "98%"
              }
            ]
          };
          // console.log("option:", option);
          // 使用刚指定的配置项和数据显示图表。
          myChart.clear();
          myChart.setOption(option, { notMerge: true });
        });
    },
    // 地图
    get3() {
      const res = this.axios
        .get(
          "http://192.168.75.58/cedar/api/group/stat.php?group_id=2&field=mark&type=1&table=ly_helper_diagnosis"
        )
        .then(res => {
          console.log(res);
          var myChart = this.$echarts.init(
            document.getElementById("map"),
            "macarons"
          );
          let data = res.data.stat;
          let valueArray = [];
          let nameArray = [];
          let result = [];
          data.map((item, index) => {
            // console.log(item)
            nameArray.push(item.mark);
            valueArray.push(item.value);
            result.push({
              name: nameArray[index],
              value: valueArray[index]
            });
          });
          console.log(nameArray);
          console.log(valueArray);
          console.log(result);
          let option = {
            //左侧小导航图标
            visualMap: {
              show: true,
              x: "left",
              y: "center",
              realtime: false,
              text: ["人数"],
              calculable: true,
              outOfRange: {
                color: ["#F5F5F5"]
              },
              inRange: {
                color: ["lightskyblue", "yellow", "orangered"]
              }
            },
            backgroundColor: "#FFFFFF",
            title: {
              left: "center",
              top: "10px",
              textAlign: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            grid: {
              //直角坐标系内绘图网格
              top: "10%",
              left: "5%",
              right: "5%",
              bottom: "10%",
              containLabel: true //grid是否包含刻度标签
            },
            series: [
              {
                type: "map",
                mapType: "china",
                data: result,
                roam: true,     //可放大缩小图,可拖拽
                label: {     //在地图上显示地点名称
                  normal: {
                    show: true //省份名称
                  },
                  emphasis: {
                    show: false 
                  }
                },
              }
            ],
            toolbox: {
              show: true,
              itemSize: 20, //工具栏icon大小
              feature: {
                //配置项
                saveAsImage: {
                  //工具项-保存为图片
                  show: true,
                  // name: echartsImgName,    //保存的文件名称
                  backgroundColor: "#fff",
                  pixelRatio: 2 //分辨率倍数
                }
              }
            },
            legend: {
              type: "scroll",
              orient: "vertical",
              left: "left",
              data: nameArray
            }
          };
          myChart.clear();
          myChart.setOption(option, { notMerge: true });
        });
    }
  }
};
</script>


