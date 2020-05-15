<template>
  <div id="dataImport">
    <!--折叠面板1--选择分组-->
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item name="1">
        <template
          slot="title"
          style="background-color:rgba(232, 232, 232, 1) ,border:1px solid,margin-left:10px"
        >
          <i class="iconfont icontubiaozhizuo-"></i> 选择分组
        </template>
        <!--项目编号 -->
        <div class="search">
          <div class="left">
            <span>创建人 ：</span>
            <el-select placeholder="请选择" size="small" v-model="groupname" @change="creator">
              <el-option v-for="(item,index) in this.peopleList" :key="index" :value="item.group_name" ></el-option> 
            </el-select>
          </div>

          <div class="right">
            <el-input placeholder="搜索" size="small" class="input-with-select">
              <el-button slot="append" class="iconfont iconsousuo" size="small"></el-button>
            </el-input>
          </div>

          <div class="storageList">
            <div class="list" style="width:96%">
              <el-table
                :data="datalist"
                highlight-current-row
                style="width: 100%"
                border
                stripe
                :header-cell-style="{color:'#333333'}"  @current-change="handleSelectionChange"
              >
                <el-table-column prop="id" label="项目编号" width="250"></el-table-column>
                <el-table-column prop="group_name" label="项目名称" width="250"></el-table-column>
                <el-table-column prop="group_logic" label="筛选逻辑" width="300"></el-table-column>
                <el-table-column prop="group_time" label="创建时间" width="250"></el-table-column>
                <el-table-column prop="group_username" label="创建人" width="250"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="daoChu(scope.row)">
                      <span>脱敏导出</span>
                    </el-button>
                    <el-button type="text" size="small" @click="jieshi = true">
                      <i class="iconfont iconwenhao"></i>
                    </el-button>
                    <el-button type="text" size="small" @click="del(scope.row)">
                      <span>删除</span>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              style="margin-left:35%"
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="shuInfo.page"
              :page-sizes="[10]"
              :page-size="shuInfo.pagerows"
              layout="total, sizes, prev, pager, next, jumper"
              :total="shuInfo.count"
            ></el-pagination>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!--折叠面板2--创建者-->
    <el-collapse v-model="activeNames" style="margin-top:20px" v-if="chuangjian">
      <el-collapse-item name="2">
        <template
          slot="title"
          style="background-color:rgba(232, 232, 232, 1) ,border:1px solid,margin-left:10px"
        >
          <i class="iconfont icontubiaozhizuo-"></i>
        </template>

        <!--全部创建者的数据 -->
        <div class="down">
          <el-table :data="tablelist" tooltip-effect="dark" style="width: 100%" border stripe>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="test_id" label="病理号" width="190" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" width="190" sortable></el-table-column>
            <el-table-column prop="diagnosis2" label="病理亚型" width="190" sortable></el-table-column>
            <el-table-column prop="diagnosis2" label="病理亚型" width="190" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="190" sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="190" sortable></el-table-column>
            <el-table-column
              prop="report_date"
              label="报告时间"
              show-overflow-tooltip
              width="190"
              sortable
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="190">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="look(scope.row)">
                  <span>查看</span>
                </el-button>
                <el-button type="text" size="small" @click="dele(scope.row)">
                  <span>删除</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--    :current-page="count"                      当前显示的页数
                  :page-sizes="[10]"                        切换每页显示的条数
                  :page-size="pagerows"                    当前每页显示的条数
                  @size-change="handleSizeChange"           点击切换每页显示多少条
                  @current-change="handleCurrentChange"     页码值发生了切换
                  :total="count"                            共多少条           
                  layout="total, sizes, prev, pager, next, jumper"
          -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.page"
            :page-sizes="[10]"
            :page-size="queryInfo.pagerows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo.count"
          ></el-pagination>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!--脱敏导出解释-->
    <div class="TUO" v-if="jieshi">
      <div class="tuoD">
        <div class="DTitle">
          <span>脱敏导出</span>
        </div>
        <div class="DMain">
          <span>原始值（待脱敏数据）：13312341234</span>
          <span>脱敏结果（脱敏后的数据显示）：as2nh6hji1hui4hasd0w</span>
          <span style="color:rgba(153,153,153,1);">使用Hash函数对敏感数据进行脱敏，不支持逆运算。</span>
        </div>
        <div class="DFoot">
          <span @click="jieshi = false">我知道了</span>
        </div>
      </div>
    </div>
    <!--脱敏导出-->
    <div class="DAO" v-if="daochu">
      <div class="DC">
        <div class="DCTitle">
          <span>脱敏导出</span>
          <span @click="daochu = false">
            <i class="iconfont iconx"></i>
          </span>
        </div>
        <div class="DCMain">
          <div class="storageList">
            <el-table :data="minList" highlight-current-row border stripe max-height="270">
              <el-table-column prop="id" label="编号"></el-table-column>
              <el-table-column prop="patient_id" label="病人ID" width="100"></el-table-column>
              <el-table-column prop="test_id" label="病理号" width="100"></el-table-column>
              <el-table-column prop="name" label="姓名" width="100"></el-table-column>
              <el-table-column prop="cardid" label="导出ID" width="100"></el-table-column>
              <el-table-column prop="sex" label="性别" width="100"></el-table-column>
            </el-table>
          </div>
          <div class="btns">
            <el-button @click="daochu =false">取消</el-button>
            <el-button @click="sure()">确认导出</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看列表单个信息-->
    <div class="zhezhao" v-if="zhezhao">
      <div class="look">
        <div class="header">
          <span>查看病理信息</span>
          <span @click="zhezhao = false">
            <i class="iconfont iconx"></i>
          </span>
        </div>

        <div class="content">
          <div class="HZ">
            <button>患者及报告信息</button>
            <div>
              <span>病人ID(住院号/门诊号) ：</span>
              {{editForm.patient_id}}
            </div>
            <div>
              <span>姓名：</span>
              {{editForm.name}}
            </div>
            <div>
              <span>性别：</span>
              {{editForm.sex}}
            </div>
            <div>
              <span>出生日期：</span>
              {{editForm.birthday}}
            </div>
            <div>
              <span>联系电话：</span>
              {{editForm.phone}}
            </div>
            <div>
              <span>民族：</span>
              {{editForm.nation}}
            </div>
            <div>
              <span>籍贯：</span>
              {{editForm.birthplace}}
            </div>
            <div>
              <span>居住地：</span>
              {{editForm.address_prov}}
            </div>
            <div>
              <span>病理号：</span>
              {{editForm.patient_id}}
            </div>
            <div>
              <span>送检科室：</span>
              {{editForm.department}}
            </div>
            <div>
              <span>申请日期：</span>
              {{editForm.application_date}}
            </div>
            <div>
              <span>报告日期：</span>
              {{editForm.report_date}}
            </div>
            <div>
              <span>就诊类型：</span>
              {{editForm.diagnosis_type}}
            </div>
          </div>
          <div class="BDW">
            <button>本单位原文</button>
            <span>{{editForm.diagnosis_txt}}</span>
          </div>
          <div class="ZD">
            <button>本单位诊断信息</button>
            <div>
              诊断结论
              <span>病理类型：</span>
              {{editForm.diagnosis}}
            </div>
            <div>
              <span>淋巴细胞来源：</span>
              {{editForm.type}}
            </div>
            <div style="float:left">
              辅助诊断
              <span>免疫组化：</span>
              <th  v-for="(item,index) in editForm.helper_diagnosis.ihc" :key="index" :value="item">
                <td>{{item.mark}}</td>
                <td>{{item.value}}</td>
              </th>
              <!--               
                <el-button-group>
                  <el-button v-for="(item,index) in editForm.helper_diagnosis.ihc" :key="index" :value="item">{{item.mark}}</el-button>
                  <el-button v-for="(item,index) in editForm.helper_diagnosis.ihc" :key="index" :value="item">{{item.value}}</el-button>                  
                </el-button-group> 
                {{editForm.helper_diagnosis.ihc.mark}} {{editForm.helper_diagnosis.ihc.value}}
              -->
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="btn">
            <el-button plain @click="zhezhao = false">返回</el-button>
            <el-button plain @click="addFormList(editForm)">确认校验通过</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      peopleList:[],   //创建人数组
      groupname:'',   //创建人
      row:'',    //缓存的row
      group_id: "",
      chuangjian: false,
      minList: [], //脱敏列表
      // 脱敏导出解释
      jieshi: false,
      // 脱敏导出
      daochu: false,
      // 分页器
      queryInfo: {
        page: 1, //页数
        pagerows: 10, //每页显示的条数
        count: 0 //数据总数
      },
      // 分组分页器
      shuInfo: {
        page: 1, //页数
        pagerows: 5, //每页显示的条数
        count: 0 //数据总数
      },
      activeNames: ["1", "2"],
      datalist: [], //数据集数组
      tablelist: [], //病理号数组
      zhezhao: false,
      // 查询到的用户信息对象
      editForm: {},
      //测试数据
      help_diagnosis: {
        ihc: [
          {
            mark: "", //标志物
            value: "" //检测结果
          }
        ], //免疫组化的数组
        fish: [
          {
            mark: "",
            value: ""
          }
        ], //荧光数组
        rearrangement: [
          {
            mark: "",
            value: ""
          }
        ], //基因数组
        ish: [
          {
            mark: "",
            value: ""
          }
        ], //原位杂交数组
        fcm: [
          {
            mark: "",
            value: ""
          }
        ], //流式细胞数组
        ngs: [
          {
            mark: "",
            value: ""
          }
        ] //ngs数组
      }
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 点击；列表行
    handleSelectionChange(row) {
      this.chuangjian = true;
      this.row = row
      console.log(row);
      let group_id = "";
      const { data: res } = this.axios
        .get("report/list.php", { params: { group_id: row.id } })
        .then(res => {
          console.log(res);
          this.tablelist = res.data.data;
          this.queryInfo.page = parseInt(res.data.page);
          this.queryInfo.count = parseInt(res.data.count); //总条数
          console.log(this.queryInfo.page);
          console.log(this.queryInfo.count);
          console.log(this.queryInfo.pagerows);
        });
      
    },
    // 确认导出
    async sure() {
      console.log(this.id);
      let z = "";
      const res = await this.axios.get("group_report/list.php", {
        params: { group_id: this.id, z: 1 }
      });
      console.log(res);
    },
    // 点击导出
    async daoChu(row) {
      console.log(row.id);
      this.daochu = true;
      const  res  = await this.axios.get("group_report/list.php", {
        params: { group_id: row.id }
      });
      this.id = row.id;
      console.log(this.id);
      this.minList = res.data;
    },
    // 点击病理号查看
    async look(row) {
      this.zhezhao = true; //不能没
      const { data: res } = await this.axios.get("report/onedata.php ", {
        params: { id: row.id }
      });
      this.editForm = res.data;
      this.id = row.id;
      // this.editForm = Object.assign(res.data[0],res.data[1],res.data[2])
      // 表单对象
      console.log(this.editForm);
    },
    // 分组删除
    del(row) {
      this.$confirm("确定删除该数据？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          const { data: res } = await this.axios.get("group/del.php ", {
            params: { id: row.id }
          });
          console.log(res);
          this.getDataList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击创建人搜索列表
     creator(){
      console.log(this.groupname)
      const res = this.axios.get('group/list.php',{params:{group_name:this.groupname}}).then( res => {
        console.log(res.data)
        this.datalist = res.data.data;
        this.queryInfo.page = parseInt(res.data.page);
        this.queryInfo.count = parseInt(res.data.count); //总条数
        this.queryInfo.pagerows = res.data.pagerows; //每页显示多少条
        console.log(this.queryInfo.count)
      })
    },  
    // 获取分组列表
    async getDataList() {
      const { data: res } = await this.axios.get("group/list.php");
      this.datalist = res.data;
      this.peopleList = this.datalist 
      console.log(this.datalist);
      this.shuInfo.page = parseInt(res.page);
      this.shuInfo.count = parseInt(res.count); //总条数
      this.shuInfo.pagerows = res.pagerows; //每页显示多少条
      console.log(res);
    },
    // 切换每页显示多少条
    handleSizeChange(newSize) {
      this.queryInfo.pagerows = newSize;
      this.handleSelectionChange(this.row);
    },
    // 点击页数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.handleSelectionChange(this.row);
    },
    // 数据集切换每页显示多少条
    handleSizeChange1(newSize) {
      this.shuInfo.pagerows = newSize;
      this.getDataList();
    },
    // 数据集点击页数
    handleCurrentChange1(newPage) {
      this.shuInfo.page = newPage;
      // console.log(this.shuInfo.page)
      this.getDataList();
    },
    // 病理号删除
    async dele(row) {
      const { data: res } = await this.axios.get("report/del.php", {
        params: { id: row.id }
      });
      console.log("getTableList", res);
      this.tablelist = res.data;
      console.log(res.data);
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count)  //总条数
      this.queryInfo.pagerows = res.pagerows  //每页显示多少条
      this.handleSelectionChange(this.row)
    },
    // 点击数据查看
    chakana() {
      const { data: res } = this.axios
        .get("report/list.php", { params: { page: this.queryInfo.page } })
        .then(res => {
          console.log(res);
          this.tablelist = res.data.data;
          this.queryInfo.page = parseInt(res.data.page);
          this.queryInfo.count = parseInt(res.data.count); //总条数
          console.log(this.queryInfo.page);
          console.log(this.queryInfo.count);
          console.log(this.queryInfo.pagerows);
        });
    },
    // 新增患者信息
    async addFormList(id, editForm) {
      this.zhezhao = !this.zhezhao;
      this.id = this.id;
      console.log(this.id);
      this.editForm.help_diagnosis = this.help_diagnosis;
      // const sicksList = JSON.stringify(sicksArr)
      let data = {
        id: this.id,
        data: editForm
      };
      // 判断提交
      if (data) {
        await this.axios.post("report/add.php", data).then(res => {
          console.log("res:", res);
          var result = res.data; //JSON.parse(res.body);
          if (result.result == "done") {
            this.$alert("提交成功", "提交结果", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {}
            });
          } else {
            this.$alert("提交失败", "提交结果", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
          }
        });
      } else {
        console.log("error submit!!");
        return false;
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" >
.iconshujufenxi {
  color: white;
  margin: 10px;
}

.icontubiaozhizuo- {
  color: #1CADFF;
}

.search {
  .left {
    width: 280px;
    margin: 10px 30px 10px;
  }

  .right {
    .el-input {
      width: 280px;
      margin: 10px 30px 10px;
    }

    .el-button {
      background: rgba(28, 178, 255, 1);
      border-radius: 0px 4px 3px 0px;
    }

    .iconsousuo {
      color: white;
      background: rgba(28, 173, 255, 1);
    }
  }

  .storageList {
    .list {
      margin-left: 30px;

      .el-table {
        border-top: 1px solid rgba(0, 160, 233, 1);
        margin: 10px 0;
      }

      span {
        margin-left: 10px;
      }
    }
  }
}

.down {
  border-top: 2px solid #1CA5FF;
  margin-top: 20px;
  padding-bottom: 60px;
  margin: 20px 20px;

  span {
    margin-left: 10px;
  }

  .el-pagination {
    float: right;
    margin: 10px 10px 0 0;
  }
}

.TUO {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 247, 251, 0.7);
  z-index: 9;

  .tuoD {
    width: 430px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 20%;
    margin: auto;

    .DTitle {
      height: 40px;
      background: rgba(28, 177, 255, 1);
      border-radius: 6px 6px 0px 0px;
      color: white;
      line-height: 40px;

      span {
        margin-left: 20px;
      }
    }

    .DMain {
      display: flex;
      flex-flow: column;
      justify-content: center;
      background: white;

      span {
        margin-top: 10px;
        font-size: 14px;
        margin: 10px 30px;
      }
    }

    .DFoot {
      width: 430px;
      height: 38px;
      line-height: 38px;
      background: rgba(245, 245, 245, 1);
      box-shadow: 0px -1px 0px 0px rgba(184, 183, 183, 0.45);
      border-radius: 0px 0px 6px 6px;
      text-align: center;

      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(41, 184, 252, 1);
      }
    }
  }
}

.DAO {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 247, 251, 0.7);
  z-index: 9;

  .DC {
    width: 642px;
    height: 400px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 20px 0px rgba(121, 121, 121, 0.75);
    border-radius: 0px 0px 4px 4px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;

    .DCTitle {
      width: 642px;
      height: 40px;
      line-height: 40px;
      background: rgba(28, 177, 255, 1);
      border-radius: 6px 6px 0px 0px;
      display: flex;
      justify-content: space-between;

      span {
        margin: auto 10px;
        color: white;
      }
    }

    .DCMain {
      .storageList {
        margin: 10px;
      }

      .btns {
        float: right;
        margin: 10px 10px;
      }
    }
  }
}

.zhezhao {
  background: #CCCBCE;
  position: relative;
  bottom: 200px;
  z-index: 9999;

  .look {
    width: 666px;
    background: #FAFAFC;
    box-shadow: 0px 4px 20px 0px rgba(121, 121, 121, 0.75);
    border-radius: 0px 0px 4px 4px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    .header {
      width: 666px;
      height: 40px;
      background: rgba(28, 177, 255, 1);
      border-radius: 6px 6px 0px 0px;
      display: flex;
      line-height: 40px;
      color: white;
      justify-content: space-between;

      span {
        margin: 0 10px;

        i {
          color: white;
        }
      }
    }

    .content {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      display: flex;
      flex-flow: column;

      .HZ {
        margin: 30px 30px 10px;
        height: 1px;
        position: relative;
        border-top: 1px solid rgba(185, 222, 255, 1);
        height: 250px;

        div {
          width: 280px;
          height: 26px;
          line-height: 26px;
          display: inline-block;
          margin-top: 10px;
          margin-left: 20px;

          span {
            display: inline-block;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }

        button {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -15px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #1CA5FF;
          line-height: 26px;
          background: #FAFAFC;
          width: 130px;
        }
      }

      .BDW {
        margin: 5px 30px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 26px;
        margin-top: 20px;
        position: relative;
        border-top: 1px solid rgba(185, 222, 255, 1);

        button {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -15px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #1CA5FF;
          line-height: 26px;
          background: #FAFAFC;
          width: 130px;
        }

        span {
          display: inline-block;
          margin: 20px 10px 20px;
        }
      }

      .ZD {
        position: relative;
        border-top: 1px solid rgba(185, 222, 255, 1);
        margin: 20px 30px;

        th {
          display: inline-block;
          line-height: 11px;
          margin-left: 20px;
        }

        div {
          display: inline-block;
        }

        button {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -15px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #1CA5FF;
          line-height: 26px;
          background: #FAFAFC;
          width: 130px;
        }

        span {
          display: inline-block;
          margin-left: 10px;
          margin-top: 15px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
    }

    .footer {
      width: 666px;
      height: 50px;
      border-top: 1px solid rgba(229, 229, 229, 1);

      .btn {
        margin-right: 20px;
        float: right;
        line-height: 50px;
      }
    }
  }
}
</style>
