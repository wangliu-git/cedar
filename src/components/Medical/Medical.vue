<template>
  <div >
    <el-collapse v-model="activeNames" accordion >
      <el-collapse-item   name="1">
        <template slot="title" style="background-color:rgba(232, 232, 232, 1) ,border:1px solid,margin-left:10px">
           <i class="iconfont icontubiaozhizuo-"></i> 选择分组
        </template>
        <div class="search">
          <div class="left">
            <span>创建人 ：</span>
            <el-select placeholder="请选择" size="small">
                <el-option ></el-option>
            </el-select>
          </div>
          <div class="right">
            <el-input placeholder="搜索"  size="small" class="input-with-select" >
              <el-button slot="append" class="iconfont iconsousuo" size="small" ></el-button>
            </el-input> 
          </div>
          <div class="storageList">
            <div class="list" style="width:96%">
              <el-table :data="datalist" highlight-current-row style="width: 100%" border stripe>
               <el-table-column prop="id" label="项目编号" width="250"></el-table-column>
                <el-table-column prop="group_name" label="项目名称" width="250"></el-table-column>
                <el-table-column prop="group_logic" label="筛选逻辑" width="300"></el-table-column>
                <el-table-column prop="group_time" label="创建时间" width="250"></el-table-column>
                <el-table-column prop="group_username" label="创建人" width="250"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="bianji(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                  </template>
                </el-table-column>               
              </el-table>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 数据分析-->
    <div class="fenxi">
      <div class="up">
        <i class="iconfont icontubiaozhizuo-"></i> 数据分析
      </div>
      <div class="down">
          <div class="choose">
              <div>
                <i class="iconfont iconbuzhou-icon"></i> 
                <span>选择分析 ：</span>
                <el-select  placeholder="请选择" size="small">
                  <el-option>淋巴瘤各个亚型临床病理特征相关分析</el-option>
                </el-select>  
              </div>
              <div>
                <i class="iconfont iconbuzhou-xian1"></i> 
                <span>选择淋巴瘤亚型 ：</span>
                <el-select  placeholder="请选择" size="small">
                  <el-option>淋巴瘤各个亚型临床病理特征相关分析</el-option>
                </el-select>
              </div>
          </div>
          <div class="echarts" :model="field">
            <div class="btns">
              <el-button type="primary" plain >性别</el-button>
              <el-button type="primary" plain>年龄</el-button>
              <el-button type="primary" plain>籍贯</el-button>
              <el-button type="primary" plain>居住地</el-button>
              <el-button type="primary" plain>标本类型</el-button>
              <el-button type="primary" plain>取材部位</el-button>
              <el-button type="primary" plain>免疫组化检测率</el-button>
              <el-button type="primary" plain>免疫组化阳性率</el-button>
              <el-button type="primary" plain>分子指标检测率</el-button>
              <el-button type="primary" plain>报告等级</el-button>
              <el-button type="primary" plain>诊断时长</el-button>
            </div>
            <div id="tu"></div>
          </div>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from 'axios'
import echarts from "echarts";
// import func from '../../../vue-temp/vue-editor-bridge';
  export default {
    data() {
      return {
        activeNames: ['1'],
        datalist: [], //数据集数组
        option:{
            tooltip: {
              show:true,
              trigger:'axis', //对bar
              axisPointer:{
                type:'shadow',
                label:{
                  backgroundColor:'#E9EEF3'
                }
              }
            },
            // 切换工具栏
            toolbox: {
              // y: 'bottom',
              feature: {  
                magicType: {
                  type: ['stack', 'tiled','line','bar',]
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
              }
            },
            // X轴移动
            dataZoom: [{
                type: 'inside'
            }, {
                type: 'slider'
            }],
            // 小图标
            legend: {
                data: ['setosa', 'versicolor','virginica']
            },
            xAxis: {
              data: ["4","4.5","5","5.5","6","6.5","7",],
              
            },
            yAxis: {},       
            grid: {
              left:'10%',            
              right:'10%',             
              bottom:'3%',              
              containLabel:true,    
              height:'90%',
                            
            },
            series: [{
              name: 'sex',
              type: 'bar',          
              data: []
            },
            {
              name: 'versicolor',
              type: 'bar',
              data: [5, 18, 16, 10, 16, 20]
            },
            {
              name: 'virginica',
              type: 'bar',
              data: [5, 20, 36, 21, 12, 25]
            }]

        },
        field:['sex'],
      };
    },
    mounted() {
       this.$nextTick(function() {
        
        this.getDataList();  
        // this.getEcharts();
      })     
    },
    methods:{
      // 点击编辑获取ID
      bianji(row){
        // console.log(row.id)
        let group_id = row.id
        console.log(group_id)
        .drawLine(group_id);
      },
 
      // 获取数据集列表
      async getDataList() {
        const { data: res } = await this.$http.get(
        "http://192.168.75.58/cedar/api/group/list.php"
      );
      this.datalist = res.data;
      console.log(this.datalist)
      },
      // 图
      drawLine(group_id){
        this.sex()
        // 基于准备好的dom，初始化echarts实例
        // console.log(document.getElementById('tu'))   样式
        let myChart = this.$echarts.init(document.getElementById('tu'),'macarons')
        // 绘制图表
        axios.get("http://192.168.75.58/cedar/api/group/stat.php",{params:{group_id:9,field:sex}}).then(function(data){
          console.log(data)
        })
        myChart.setOption(this.option)      
      }, 
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
.iconbuzhou-icon{
  width:4px;
  height:9px;
  font-size:22px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:#1CA5FF
  line-height:24px;
  margin-right 5px 
}
.iconbuzhou-xian1{
  width:4px;
  height:9px;
  font-size:22px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:#1CA5FF
  line-height:24px;
  margin-right 5px 
}
.search{
  .left{
    width 280px
    margin 10px 30px 10px
  }
  .right{
    .el-input{
        width 280px
        margin 10px 30px 10px
      }
      .el-button{
        background:rgba(28,178,255,1)
        border-radius:0px 4px 3px 0px;
      } 
      .iconsousuo{
        color white
        background:rgba(28,173,255,1);
      }
  }
  .storageList {  
    margin-top: 20px;
    padding-bottom: 20px;
    .list {    
      padding-top 10px
      margin-left: 30px;
      .el-table {
        border-top: 1px solid rgba(0, 160, 233, 1);
        margin 10px 0
      }
    }
  }
}

.fenxi{
  margin-top 20px
  height 100%
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 10px 0px rgba(204,204,204,0.75);
  border-radius:4px 4px 4px 4px;
  .up{
    height:40px;
    background:rgba(250,250,250,1);
    box-shadow:0px 1px 0px 0px rgba(224,224,224,0.75);
    border-radius:4px 0px 0px 0px;
    line-height 40px
  }
  .down{
    .choose{
      display flex
      flex-flow row
      margin 20px 10px
      div{
        margin auto 10px
      }
    }
    .echarts{
      width:1571px;
      height:680px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(229,229,229,1);
      border-radius:4px;
      margin 10px auto
     
      .btns{
        display flex
        justify-content space-evenly
        margin-top  20px 
        padding-bottom 20px
        width:1571px;
        border-bottom :1px solid rgba(229,229,229,1);
        .el-button{
          background:rgba(250,250,250,1);
          border:1px solid rgba(229,229,229,1);
          border-radius:4px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
        
          &:hover{
            background:rgba(28,178,255,1);
            border-radius:4px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
      
          }
        }
      }
      #tu{
        width:932px;
        height:463px;
        margin 10px auto
      }
    }

  }
}
</style>
