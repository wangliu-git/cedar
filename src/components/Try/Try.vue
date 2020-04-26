<template>
  <div id="details" style="width: 500px;height: 289px; box-sizing:border-box; line-height: 289px;"></div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
export default {
    data(){
        return{
            charts:'',
            //echarts data数据源
            opinionData:[]
        }
    },
    created(){
        this.getlist()
    },
    methods:{
        drawLine(id) {
            this.charts =echarts.init(document.getElementById(id))
            this.charts.setOption({
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ["1","2","3","4","5"]
            },
            yAxis: {
                type: 'value'
            },

            series: [{
                name: '近七日收益',
                type: 'line',
                stack: '总量',
                data: this.opinionData
            }]
        })
        },
        getlist(){
            getOrderPoint().then(response=>{
            //返回数据的时候将数据绑定到echarts data数据源上 并调用echarts函数
                for(let i in response.data.data.weekDashBoardOrderVos){
                    this.opinionData.push(response.data.data.weekDashBoardOrderVos[i].orderCount)
                }
                console.log(this.opinionData)
                this.drawLine('main')
            })
        }
    }
}

</script>
<style></style>
