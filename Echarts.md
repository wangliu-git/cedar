1.npm install echarts --save
2.引入 import echarts from "echarts";

3.准备容器

4.配置项
export default {
  data() {
    return {
      option: {
          <!-- 标题 -->
        title: {
          text: "用户来源"
        },
        <!-- 一些小功能下载切换 -->
        tooltip: {
          trigger:'axis',
          axisPointer:{
            type:'cross',
            label:{
              backgroundColor:'#E9EEF3'
            }
          }
        },
        <!-- 位置设置 ，依赖于包裹容器-->
        grid: {
           
          left:'3%',             图距左侧的距离
          right:'4%',               图距左侧的距离
          bottom:'3%',               图距左侧的距离
          containLabel:true     
          height：''                 图的高度
        },
        xAxis: [
          {
            boundaryGap:false
          }
        ],
        yAxis: [
          {
            type:'value'
          }
        ]
      }
    };
  },
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById("main"));

    const { data } = await this.axios.get("reports/type/1");
    if (data.meta.status !== 200) {
      return this.$message.error(data.meta.msg);
    }
    // 指定图表的配置项和数据
    // 使用刚指定的配置项和数据显示图表。
    const result = _.merge(data.data, this.option);
    myChart.setOption(result);
  }
};



## 写法
<div ref="chart"> </div>
const myChart = echarts.init(this.$refs.chart);
