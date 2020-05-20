<template>
  <div id="dataImport">
    <div class="shaixu">
      <div class="title">
        <span >
          <i class="iconfont icontubiaozhizuo-"></i>全文检索
        </span>
        <el-input placeholder="搜索" size="small" class="input-with-select" v-model="whole"  @keyup.enter.native="shaixuan()">
          <el-button slot="append" class="iconfont iconsousuo" size="small" @click="shaixuan"></el-button>
        </el-input>
      </div>

      <el-collapse v-model="activeNames" :v-model="edit" @change="gaibian">
        <el-collapse-item name="1">
          <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
            <i class="iconfont icontubiaozhizuo-"></i>
            <span>{{patient_infoAll.name}}:</span>
          </template>
          <div class="jiben">
            <!--姓名  -->
            <div class="ji">
              <span>{{showInfo.name.field_title}}:</span>
              <el-input placeholder="请输入姓名" size="mini" @keyup.enter.native="shaixuan()" style="width:200px" v-model="edit.name"></el-input>
            </div>
            <!--性別 -->
            <div class="ji">
              <span>{{showInfo.sex.field_title}}:</span>
              <el-select
                placeholder="请选择性别"
                name="sex"
                v-model="edit.sex"
                size="mini"
                multiple
                style="width:200px"  @change="shaixuan()"
              >
                <el-option v-for="item in showInfo.sex.field_values" :key="item" :value="item">
                  <span>{{item}}</span>
                </el-option>
              </el-select>
            </div>
            <!--出生日期 -->
            <div class="ji">
              <span>{{showInfo.birthday.field_title}}:</span>
              <el-date-picker
                v-model="edit.birthday"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                style="width:200px" @change="shaixuan()"
              ></el-date-picker>
            </div>
            <!-- 联系电话 -->

            <div class="ji">
              <span>{{showInfo.phone.field_title}}:</span>
              <el-input
                size="mini"
                style="width:200px"
                placeholder="请输入电话"
                v-model="edit.phone" @keyup.enter.native="shaixuan()"
              ></el-input>
            </div>
            <!--籍贯-->

            <div class="ji">
              <span>{{showInfo.birthplace.field_title}}:</span>
              <el-select
                placeholder="请选择"
                name="birthplace"
                v-model="edit.birthplace"
                size="mini"
                multiple
                style="width:200px" @change="shaixuan()"
              >
                <el-option
                  v-for="(provinces) in showInfo.birthplace.field_values"
                  :key="provinces"
                  :value="provinces"
                >
                  <span>{{provinces}}</span>
                </el-option>
              </el-select>
            </div>
            <!--民族-->

            <div class="ji">
              <span>{{showInfo.nation.field_title}}:</span>
              <el-select
                placeholder="请选择"
                name="nation"
                v-model="edit.nation"
                size="mini"
                multiple
                style="width:200px" @change="shaixuan()"
              >
                <el-option v-for="(item) in showInfo.nation.field_values" :key="item" :value="item">
                  <span>{{item}}</span>
                </el-option>
              </el-select>
            </div>

            <!--居住地-->
            <div class="ji">
              <span>{{showInfo.address_prov.field_title}}:</span>
              <el-select
                placeholder="请选择"
                size="mini"
                style="width:100px"
                v-model="edit.address_prov"
                multiple @change="shaixuan()"
              >
                <el-option
                  v-for="(provinces) in showInfo.birthplace.field_values"
                  :key="provinces"
                  :value="provinces" 
                >
                  <span>{{provinces}}</span>
                </el-option>
              </el-select>
              <el-select
                placeholder="请选择"
                size="mini"
                style="width:100px"
                v-model="edit.address_city"
                multiple @change="shaixuan()"
              >
                <el-option
                  v-for="(provinces) in showInfo.birthplace.field_values"
                  :key="provinces"
                  :value="provinces"
                >
                  <span>{{provinces}}</span>
                </el-option>
              </el-select>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item name="2">
          <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
            <i class="iconfont icontubiaozhizuo-"></i>
            <span>{{diagnosis_1_info.name}}</span>
          </template>
          <div class="baogao">
            <div class="bao">
              <span>{{fMInstitution.organization.field_title}}:</span>
              <el-input
                v-model="edit.organization"
                placeholder="请输入机构名称"
                size="mini"
                style="width:200px"  @keyup.enter.native="shaixuan()"
              ></el-input>
            </div>

            <div class="bao">
              <span>{{fMInstitution.test_id.field_title}}:</span>
              <el-input
                v-model="edit.test_Yid"
                placeholder="请输入病理号"
                size="mini"
                style="width:200px"  @keyup.enter.native="shaixuan()"
              ></el-input>
            </div>

            <div class="bao">
              <span>{{fMInstitution.application_date.field_title}}:</span>
              <el-date-picker
                v-model="edit.application_Ydate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="申请开始日期"
                end-placeholder="结束日期"
                size="mini"
                style="width:200px" @change="shaixuan()"
              ></el-date-picker>
            </div>

            <div class="bao">
              <span>{{fMInstitution.report_date.field_title}}:</span>
              <el-date-picker
                v-model="edit.report_Ydate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="报告开始日期"
                end-placeholder="结束日期"
                size="mini"
                style="width:200px" @change="shaixuan()"
              ></el-date-picker>
            </div>

            <div class="bao">
              <span>病理类型:</span>
              <el-cascader
                style="width:200px"
                size="mini"
                :options="options"
                :props="{ checkStrictly: true }"
                clearable v-model="edit.Yjilian" multiple @change="shaixuan()"
              ></el-cascader>
            </div>

            <div class="bao">
              <span>{{fMInstitution.report_quality.field_title}} :</span>
              <el-select
                placeholder="请选择报告质量"
                name="report_quality"
                v-model="edit.report_quality"
                size="mini"
                multiple
                style="width:200px" @change="shaixuan()"
              >
                <el-option
                  v-for="(item,index) in fMInstitution.report_quality.field_values"
                  :key="index"
                  :value="item"
                >
                  <span>{{item}}</span>
                </el-option>
              </el-select>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item name="3">
          <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
            <i class="iconfont icontubiaozhizuo-"></i>
            <span>{{diagnosis_2_info.name}}</span>
          </template>
          <div class="zhenduan">
            <div class="zhen">
              <span>{{tMInstitution.test_id.field_title}}:</span>
              <el-input
                v-model="edit.test_id"
                placeholder="请输入病理号"
                size="mini"
                style="width:200px" @keyup.enter.native="shaixuan()"
              ></el-input>
            </div>

            <div class="zhen">
              <span>{{tMInstitution.department.field_title}}:</span>
               <el-select
                name="department"
                v-model="edit.department"
                placeholder="请选择送检科室"
                size="mini"
                multiple
                style="width:200px" @change="shaixuan()"
              >
                <el-option 
                  v-for="(item,index) in  this.department"
                  :key="index"
                  :value="item"
                >
                  <span>{{item}}</span>
                </el-option>
              </el-select>
            </div>

            <div class="zhen">
              <span>{{tMInstitution.application_date.field_title}}:</span>
              <el-date-picker
                v-model="edit.application_date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                style="width:200px" @change="shaixuan()"
              ></el-date-picker>
            </div>

            <div class="zhen">
              <span>{{tMInstitution.report_date.field_title}}:</span>
              <el-date-picker
                v-model="edit.report_date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                style="width:200px" @change="shaixuan()"
              ></el-date-picker>
            </div>

            <div class="zhen">
              <span>{{tMInstitution.diagnosis_type.field_title}}：</span>

              <el-select
                name="diagnosis_type"
                v-model="edit.diagnosis_type"
                size="mini"
                multiple
                style="width:200px" @change="shaixuan()"
              >
                <el-option
                  v-for="(item,index) in  tMInstitution.diagnosis_type.field_values"
                  :key="index"
                  :value="item"
                >
                  <span>{{item}}</span>
                </el-option>
              </el-select>
            </div>

            <div class="zhen">
              <span>{{tMInstitution.sample_location.field_title}}:</span>
              <el-select
                name="sample_location"
                v-model="edit.sample_location"
                size="mini"
                placeholder="请选择取材部位"
                multiple
                style="width:200px" @change="shaixuan()"
              >
                <el-option
                  v-for="(item,index) in  tMInstitution.sample_location.field_values"
                  :key="index"
                  :value="item"
                >
                  <span>{{item}}</span>
                </el-option>
              </el-select>
            </div>

            <div class="zhen">
              <span>病理类型:</span>
              <el-select name="sample_type" v-model="edit.diagnosis2"   multiple size="mini" style="width:200px" @change="shaixuan()">
                <el-option
                  v-for="(item,index) in  this.twochoose"
                  :key="index"
                  :value="item"
                >
                  <span>{{item}}</span>
                </el-option>
              </el-select>          
            </div>     

            <div class="zhenD">           
              <div class="duan">
                <span>标志物:</span>
                <el-select
                  v-model="edit.mark"
                  placeholder="请选择"
                  size="mini"
                  style="width:200px"
                  multiple @change="shaixuan()"
                > 
                  <el-option v-for="(item,index) in this.mark" :key="index"  :value="item"></el-option>              
                </el-select>
              </div>

              <div class="duan">
                <span>检测结果 ：</span>
                <el-select
                  v-model="edit.value"
                  placeholder="请选择"
                  size="mini"
                  style="width:200px"
                  multiple @change="shaixuan()"
                >
                  <el-option v-for="(item,index) in this.value" :key="index"  :value="item">{{item}}</el-option>
                </el-select>
            </div> 

            <div> 
              <button style="margin-right: 5px;margin-left: 5px;"  @click="ihcAdd(mark,value)">
                <i class="iconfont iconic_join_dialing_norm"></i>
              </button>
              <button style="margin-right: 5px;" @click="ihcDelete(mark,value)">
                <i class="iconfont iconjianhao1"></i>
              </button>  
            </div>
            
          </div>                 
          </div>

          <div class="yuan">
            <div class="lai" style="width:300px">
              <span>数据来源 ：</span>
              <el-select
                v-model="edit.dataform"
                placeholder="请选择"
                size="mini"
                style="width:200px"
                multiple
                @change="shaixuan()"
              >
                <el-option v-for="(item,index) in dataForm" :key="index" :value="item"></el-option>
              </el-select>
            </div>

            <div class="lai" style="width:300px">
              <span>整合信息 ：</span>
              <el-select
                v-model="edit.Integrate"
                placeholder="请选择"
                size="mini"
                style="width:200px"
                multiple @change="shaixuan()"
              >
                <el-option v-for="(item,index) in Integrate" :key="index" :value="item"></el-option>
              </el-select>
            </div>
          </div>      
        </el-collapse-item>
      </el-collapse>

      <div class="footer">
        <el-button @click="inGroup(ids)">加入分组</el-button>
        <el-button @click="reset()">重置</el-button>
        <el-button @click="shaixuan(edit)">筛选</el-button>
      </div>
    </div>
    <!--  列表-->
    <!-- :selectable="selectable"  获取状态
    >  选中列表行-->
    <div class="list">
      <div class="down">
        <el-table
          :data="tablelist"
          tooltip-effect="dark"
          style="width: 100%"
          border
          stripe
          ref="table"
          
          @selection-change="checkTable"
          :header-cell-style="{color:'#333333'}"
        >
          <el-table-column width="50" type="selection">          
          </el-table-column>
          <el-table-column prop="test_id" label="病理号" width="200" sortable></el-table-column>
          <el-table-column prop="name" label="姓名" width="200" sortable></el-table-column>
          <el-table-column prop="diagnosis2" label="病种亚型" width="250" sortable></el-table-column>
          <el-table-column prop="sex" label="性别" width="200" sortable></el-table-column>
          <el-table-column prop="age" label="年龄" width="200" sortable></el-table-column>
          <el-table-column
            prop="report_date"
            label="报告时间"
            show-overflow-tooltip
            width="200"
            sortable
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="look(scope.row)">
                <span>查看</span>
              </el-button>
              <el-button type="text" size="small" @click="bianji(scope.row)">
                <span>编辑</span>
              </el-button>
              <el-button type="text" size="small" @click="del(scope.row)">
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
              {{editForm.diagnosis2}}
            </div>

            <div style="float:left">
              辅助诊断
              <span>免疫组化：</span>
              <th  v-for="(item,index) in this.helper_diagnosis.ihc" :key="index" :value="item">
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
      </div>
    </div>

    <!--分组 -->
    <div class="out" v-if="group" :data="data">
      <div class="nei">
        <div class="title">
          <span>请选择分组</span>
          <span @click="group =false">
            <i class="iconfont iconx"></i>
          </span>
        </div>
        <div class="mian">
          <div class="groupList">
            <el-button
              style="width:300px"
              @click="group_id(it)"
              v-for="(it, index) in this.groupList"
              :key="index"
              :value="it.group_name"
            >{{it.group_name}}</el-button>
          </div>
          <div class="name">
            <span>新建项目名称 ：</span>
            <el-input placeholder="请输入项目名称..." style="width:380px" v-model="groupName">
              <el-button slot="append" @click="addGroup(groupName)">保存</el-button>
            </el-input>
          </div>
          <div class="button">
            <!--@click="sure(id)" -->
            <el-button plain size="small" @click="group =false">取消</el-button>
            <el-button plain size="small" @click="sure(id)">确定</el-button>
          </div>
        </div>
      </div>
    </div>

    <!--表单 -->
    <div class="sick" v-if="luru">
      <div class="container" id="dataImport">
        <div class="form">
          <!-- 按钮-->
          <div class="header">
            <span @click="luru=false">编辑</span>
            <span>
              <i class="iconfont iconfork" @click="luru=false"></i>
            </span>
          </div>
          <!-- 表单-->
          <div class="formList" :v-model="editForm">
            <!-- 折叠面板-->
            <!-- 患者信息-->
            <el-collapse v-model="activeName" class="HZ">
              <el-collapse-item name="1">
                <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
                  <i class="iconfont icontubiaozhizuo-"></i>
                  {{patient_infoAll.name}}:
                </template>
                <!-- 患者信息内容-->
                <div class="HZdown">
                  <!--病人ID -->
                  <div class="sickItem">
                    <span>{{showInfo.patient_id.field_title}}:</span>
                    <el-input
                      type="text"
                      maxlength="10"
                      show-word-limit
                      v-model="editForm.patient_id"
                      name="patient_id"
                      size="mini"
                      placeholder="请输入住院号/门诊号" style="width:200px"
                    ></el-input>
                  </div>
                  <!--姓名 <span v-show="editForm.name.length >= maxL">{{textShow}}</span> -->
                  <div class="sickItem">
                    <span>{{showInfo.name.field_title}}:</span>
                    <el-input
                      type="text"
                      size="mini"
                      v-model="editForm.name"
                      name="name"
                      placeholder="请输入姓名" style="width:200px"
                    ></el-input>
                  </div>
                  <!--性別 -->
                  <div class="sickItem">
                    <span>{{showInfo.sex.field_title}}:</span>
                    <el-select placeholder="请选择" name="sex" v-model="editForm.sex" size="mini">
                      <el-option
                        v-for="item in showInfo.sex.field_values"
                        :key="item"
                        :value="item" style="width:200px"
                      >
                        <span>{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>
                  <!--出生日期 -->
                  <div class="sickItem">
                    <span>{{showInfo.birthday.field_title}}:</span>
                    <el-date-picker
                      style="width:200px"
                      name="birthday"
                      v-model="editForm.birthday"
                      type="date"
                      size="mini"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </div>
                  <!-- 联系电话-->
                  <div class="sickItem">
                    <span>{{showInfo.phone.field_title}}:</span>
                    <el-input
                      type="tel"
                      maxlength="11"
                      size="mini"
                      v-model="editForm.phone"
                      name="phone"
                      placeholder="请输入电话" style="width:200px"
                    ></el-input>
                  </div>
                  <!--民族-->
                  <div class="sickItem">
                    <span>{{showInfo.nation.field_title}}:</span>
                    <el-select
                      placeholder="请选择"
                      name="nation"
                      v-model="editForm.nation" style="width:200px"
                      size="mini"
                    >
                      <el-option
                        v-for="(item) in showInfo.nation.field_values"
                        :key="item"
                        :value="item"
                      >
                        <span>{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>
                  <!--籍贯-->
                  <div class="sickItem">
                    <span>{{showInfo.birthplace.field_title}}:</span>
                    <el-select
                      placeholder="请选择"
                      name="birthplace"
                      v-model="editForm.birthplace"  style="width:200px"
                      size="mini"
                    >
                      <el-option
                        v-for="(provinces) in showInfo.birthplace.field_values"
                        :key="provinces"
                        :value="provinces"
                      >
                        <span>{{provinces}}</span>
                      </el-option>
                    </el-select>
                  </div>
                  <!--居住地-->
                  <div class="sickItem">
                    <span>{{showInfo.address_prov.field_title}}:</span>
                    <el-select
                      placeholder="请选择"
                      name="birthplace"
                      v-model="editForm.address_prov" style="width:200px"
                      size="mini"
                    >
                      <el-option
                        v-for="(provinces) in showInfo.birthplace.field_values"
                        :key="provinces"
                        :value="provinces"
                      >
                        <span>{{provinces}}</span>
                      </el-option>
                    </el-select>
                  </div>
                  <!--  市/区
                  <select name="birthplace" v-model="patient.address_prov">
                  <option v-on="changeaddress_prov(cities)" v-for="(cities) in showInfo.birthplace.field_values.cities" :key="cities" :value="citles">{{provinces.citles}}</option>
                  </select>-->
                </div>
              </el-collapse-item>
            </el-collapse>

            <!-- 原医疗机构-->
            <el-collapse v-model="activeName" class="origin">
              <el-collapse-item name="2">
                <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
                  <i class="iconfont icontubiaozhizuo-"></i>
                  {{diagnosis_1_info.name}}
                </template>
                <div class="origindown">
                  <!--报告信息 -->
                  <div class="sickIH">
                    <div class="title">
                      <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                      {{reportMessage.name}}:
                    </div>
                    <div class="sickItem">
                      <span>{{fMInstitution.organization.field_title}}:</span>
                      <el-input
                        type="text"
                        v-model="editForm.organization"
                        placeholder="请输入机构名称"
                        size="mini" style="width:200px"
                      ></el-input>
                    </div>
                    <div class="sickItem">
                      <span>{{fMInstitution.test_id.field_title}}:</span>
                      <el-input
                        type="text"
                        v-model="editForm.test_id"
                        placeholder="请输入病理号" style="width:200px"
                        size="mini"
                      ></el-input>
                    </div>
                    <div class="sickItem">
                      <span>{{fMInstitution.application_date.field_title}}:</span>
                      <el-date-picker
                        name="application_date"
                        v-model="editForm.application_date"
                        type="date"
                        size="mini"
                        placeholder="选择日期" style="width:200px"
                      ></el-date-picker>
                    </div>
                    <div class="sickItem">
                      <span>{{fMInstitution.report_date.field_title}}:</span>
                      <el-date-picker
                        name="report_date"
                        v-model="editForm.report_date"
                        type="date"
                        size="mini"
                        placeholder="选择日期" style="width:200px"
                      ></el-date-picker>
                    </div>
                  </div>
                  <!--诊断结论 -->
                  <div class="sickIH">
                    <div class="title">
                      <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                      {{reportResult.name}}:
                    </div>
                    <div class="sickItem">
                      <span>病理类型:</span>
                      <el-cascader
                        size="mini"
                        v-model="editForm.jilian"
                        :options="options"
                        :props="{ checkStrictly: true }"
                        clearable style="width:500px"
                      ></el-cascader>
                    </div>
                  </div>
                  <!--报告质量  可折叠-->
                  <div class="sickIH">
                    <div class="title">
                      <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                      {{reportMass.name}}:
                      <span
                        style="margin-left:50px"
                      >{{fMInstitution.report_quality.field_title}} :</span>
                      <el-select
                        placeholder="请选择"
                        name="report_quality"
                        v-model="editForm.report_quality" style="width:200px"
                        size="mini"
                      >
                        <el-option
                          v-for="(item,index) in fMInstitution.report_quality.field_values"
                          :key="index"
                          :value="item"
                        >
                          <span>{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>

                    <div class="kuai">
                      <div class="p-one">
                        <span class="titles">病理检材质量</span>
                        <div class="sickItems">
                          <span class="one">{{fMInstitution.he_number.field_title}}:</span>
                          <el-input
                            type="text"
                            v-model="editForm.he_number"
                            size="mini"
                            style="width:100px"
                          ></el-input>
                          {{fMInstitution.he_number.field_tail}}
                        </div>
                        <div class="sickItems">
                          <span class="two">{{fMInstitution.he_quality.field_title}}:</span>
                          <el-select
                            name="he_quality"
                            v-model="editForm.he_quality"
                            size="mini"
                            style="width:90px"
                          >
                            <el-option
                              v-for="(item,index) in fMInstitution.he_quality.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
                        </div>
                        <div class="sickItems">
                          <span class="three">{{fMInstitution.ihc_number.field_title}}:</span>
                          <el-input
                            type="text"
                            v-model="editForm.ihc_number"
                            size="mini"
                            style="width:100px"
                          ></el-input>
                          {{fMInstitution.he_number.field_tail}}
                        </div>
                        <div class="sickItems">
                          <span class="four">{{fMInstitution.ihc_quality.field_title}}:</span>
                          <el-select
                            name="ihc_quality"
                            v-model="editForm.ihc_quality"
                            size="mini"
                            style="width:90px"
                          >
                            <el-option
                              v-for="(item,index) in fMInstitution.ihc_quality.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
                        </div>
                        <div class="sickItems">
                          <span class="five">{{fMInstitution.problem_slice.field_title}}</span>
                          <el-select
                            name="problem_slice"
                            v-model="editForm.problem_slice"
                            size="mini"
                            style="width:90px"
                          >
                            <el-option
                              v-for="(item,index) in fMInstitution.problem_slice.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                      <div class="p-two">
                        <span class="titles">病理会诊申请单质量：</span>
                        <div class="sickItems">
                          <span class="h">{{fMInstitution.patient_info.field_title}}:</span>
                          <el-select
                            name="patient_info"
                            v-model="editForm.patient_info"
                            size="mini"
                            style="width:90px"
                          >
                            <el-option
                              v-for="(item,index) in fMInstitution.patient_info.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
                        </div>
                        <div class="sickItems">
                          <span class="h">{{fMInstitution.history_info.field_title}}:</span>
                          <el-select
                            name="history_info"
                            v-model="editForm.history_info"
                            size="mini"
                            style="width:90px"
                          >
                            <el-option
                              v-for="(item,index) in fMInstitution.history_info.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
                        </div>
                        <div class="sickItems">
                          <span class="h">{{fMInstitution.sample_info.field_title}}:</span>
                          <el-select
                            name="sample_info"
                            v-model="editForm.sample_info"
                            size="mini"
                            style="width:90px"
                          >
                            <el-option
                              v-for="(item,index) in fMInstitution.sample_info.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                      <div class="p-three">
                        <span class="titles">其他临床资料提交情况：</span>
                        <div class="sickItems">
                          <span>{{fMInstitution.record.field_title}}:</span>
                          <el-select
                            name="record"
                            v-model="editForm.record"
                            size="mini"
                            style="width:90px"
                          >
                            <el-option
                              v-for="(item,index) in fMInstitution.record.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
                        </div>
                        <div class="sickItems">
                          <span>{{fMInstitution.helper_report.field_title}}:</span>
                          <el-select
                            name="helper_report"
                            v-model="editForm.helper_report"
                            size="mini"
                            style="width:90px"
                          >
                            <el-option
                              v-for="(item,index) in fMInstitution.helper_report.field_values"
                              :key="index"
                              :value="item"
                            >{{item}}</el-option>
                          </el-select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>

            <!-- 本医疗机构-->
            <el-collapse v-model="activeName" class="report">
              <el-collapse-item name="3">
                <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
                  <i class="iconfont icontubiaozhizuo-"></i>
                  {{diagnosis_2_info.name}}
                </template>
                <div class="reportdown">
                  <div class="sickIH">
                    <!--报告信息 -->
                    <div class="title">
                      <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                      {{reportMessage.name}}:
                    </div>
                    <div class="sickItem">
                      <span>{{tMInstitution.test_id.field_title}}:</span>
                      <el-input
                        type="text"
                        v-model="editForm.test_id"
                        placeholder="请输入病理号"
                        size="mini" style="width:200px"
                      ></el-input>
                    </div>

                    <div class="sickItem">
                      <span>{{tMInstitution.department.field_title}}:</span>
                      <el-input
                        type="text"
                        v-model="editForm.department"
                        placeholder="请输入机构名称"
                        size="mini" style="width:200px"
                      ></el-input>
                    </div>

                    <div class="sickItem">
                      <span>{{tMInstitution.application_date.field_title}}:</span>
                      <el-date-picker
                        name="application_date"
                        v-model="editForm.application_date"
                        type="date"
                        size="mini"
                        placeholder="选择日期" style="width:200px"
                      ></el-date-picker>
                    </div>

                    <div class="sickItem">
                      <span>{{tMInstitution.report_date.field_title}}:</span>
                      <el-date-picker
                        name="test_id"
                        v-model="editForm.report_date"
                        type="date"
                        size="mini"
                        placeholder="选择日期" style="width:200px"
                      ></el-date-picker>
                    </div>
                    <div class="sickItem">
                      <span>{{tMInstitution.diagnosis_type.field_title}}：</span>
                      <el-select
                        name="diagnosis_type"
                        v-model="editForm.diagnosis_type" style="width:200px"
                        size="mini"
                      >
                        <el-option
                          v-for="(item,index) in  tMInstitution.diagnosis_type.field_values"
                          :key="index"
                          :value="item"
                        >
                          <span>{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="sickIH">
                    <!--取材信息 <div class="sickItem">
                      <span>{{tMInstitution.sample_location.field_title}}:</span>
                      <el-select name="sample_location" v-model="editForm.sample_location" size="mini">
                        <el-option
                          v-for="(item,index) in  tMInstitution.sample_location.field_values"
                          :key="index"
                          :value="item"
                        >
                          <span>{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>-->
                    <div class="title">
                      <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                      {{materMessage.name}}:
                    </div>
                    <div class="sickItem">
                      <span>{{tMInstitution.sample_type.field_title}}:</span>
                      <el-select name="sample_type" v-model="editForm.sample_type" size="mini">
                        <el-option
                          v-for="(item,index) in  tMInstitution.sample_type.field_values"
                          :key="index"
                          :value="item" style="width:200px"
                        >
                          <span>{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>

                    <!-- <div class="sickItem">
                      <span>{{tMInstitution.sample_morphology.field_title}}:</span>
                      <el-input
                        type="text"
                        v-model="editForm.sample_morphology"
                        placeholder="请输入形态学描述"
                        size="mini"
                      ></el-input>
                    </div>-->
                    <div class="sickItem">
                      <span>取材部位</span>
                      <el-input
                        type="text"
                        v-model="editForm.sample_morphology"
                        placeholder="请输入取材部位"
                        size="mini" style="width:200px"
                      ></el-input>
                    </div>
                  </div>

                  <div class="sickIH">
                    <!--就诊结论 -->
                    <div class="title">
                      <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                      {{reportResult.name}}:
                    </div>
                    <div class="sickItem">
                      <span>病理类型:</span>
                      <el-cascader
                        size="mini"
                        v-model="editForm.jilian"
                        :options="options"
                        :props="{ checkStrictly: true }"
                        clearable style="width:500px"
                      ></el-cascader>
                    </div>
                  </div>
                  <!--辅助诊断 -->
                  <div class="sickIH">
                    <div class="title">
                      <span>
                        <!-- <i class="iconfont icontubiaozhizuo-"></i> {{helper_diagnosis.name}} -->
                        辅助诊断:
                      </span>
                      <el-checkbox-group
                        v-model="checkList"
                        @change="func1"
                        style="display: initial;"
                      >
                        <el-checkbox style="margin-left=10px" label="免疫组化"></el-checkbox>
                        <el-checkbox label="荧光原位杂交"></el-checkbox>
                        <el-checkbox label="淋巴瘤克隆性基因重排检测"></el-checkbox>
                        <el-checkbox label="原位杂交"></el-checkbox>
                        <el-checkbox label="流式细胞检测"></el-checkbox>
                        <el-checkbox label="ngs检测"></el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>

                  <div class="ihc">
                    <!-- 遍历患者已有的免疫组化v-for="(item,idx) in editForm.helper_diagnosis.ihc" :key="idx" -->
                    <div v-show="seen">
                      <span class="titl">
                        <i class="iconfont icontubiaozhizuo-"></i>
                        {{ihc.name}}
                      </span>
                      <div id="one" v-for="(ihc,idx) in this.helper_diagnosis.ihc" :key="idx">
                        <!-- 循环myzh这个数组，来动态 + - 操作 -->
                        <div class="sickI">
                          <div class="sickIt">
                            <span class="name">{{FZ.key_ihc.field_title}}：</span>
                            <el-input v-model="ihc.mark" style="width:100px"></el-input>
                          </div>
                        </div>
                        <div class="sickI">
                          <div class="sickIt">
                            <span class="name">{{FZ.value_ihc.field_title}}：</span>
                            <el-input v-model="ihc.value" style="width:100px"></el-input>
                          </div>
                        </div>
                        <!-- + - 操作只需要传入当前循环的数组 -->
                        <!-- 判断 必须是最后一条，才可以显示操作按钮 -->
                        <div class="handleBtnBox">
                          <!-- el-button: v-if="idx==testFZ.ihc.length-1" -->
                          <el-button
                            @click="ihcAddData(help_diagnosis.ihc,help_diagnosis.ihc[idx])"
                          >
                            <i class="iconfont iconaddTodo-nav"></i>
                          </el-button>
                          <el-button @click="ihcDeleteData(help_diagnosis.ihc)">
                            <i class="iconfont iconjianhao1"></i>
                          </el-button>
                        </div>
                      </div>
                    </div>

                    <div
                      v-show="seen1"
                      v-for="(item,idx) in this.helper_diagnosis.fish"
                      :key="idx"
                    >
                      <span class="titl">
                        <i class="iconfont icontubiaozhizuo-"></i>
                        {{fish.name}}
                      </span>
                      <div id="two">
                        <div class="sickI">
                          <div class="sickIt">
                            <span class="name">{{FZ.key_fish.field_title}}：</span>
                            <el-input v-model="fish.mark" style="width:100px"></el-input>
                          </div>
                        </div>
                        <div class="sickI">
                          <div class="sickIt">
                            <span class="name">{{FZ.value_fish.field_title}}：</span>
                            <el-input v-model="fish.value" style="width:100px"></el-input>
                          </div>
                        </div>
                        <!-- 不同的地方可以调用一个方法，不需要额外写-->
                        <div class="handleBtnBox">
                          <el-button
                            @click="ihcAddData(help_diagnosis.fish,help_diagnosis.fish[idx])"
                          >
                            <i class="iconfont iconaddTodo-nav"></i>
                          </el-button>
                          <el-button @click="ihcDeleteData(help_diagnosis.fish)">
                            <i class="iconfont iconjianhao1"></i>
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
              <div class="btn">
                <el-button type="primary" plain @click="clear(editForm)">清空</el-button>
                <el-button type="primary" plain @click="baocun(editForm)">保存</el-button>
              </div>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script type="text/ecmascript-6">
import uuid from "uuid";
import allMessage from "../../staic/allMessage.json";
export default {
  data() {
    return { 
      whole:'',
      twochoose:[],
      ids: [], //ID 们
      // 新建分组名
      groupName: "",
      multiple: true,
      checkList: [
        "免疫组化",
        "荧光原位杂交",
        "淋巴瘤克隆性基因重排检测",
        "原位杂交",
        "流式细胞检测",
        "ngs检测"
      ],
      seen: true,
      seen1: true,
      seen2: true,
      seen3: true,
      seen4: true,
      seen5: true,
      // 大表单
      luru: false,
      val: "",
      // 分组名称
      group: false,
      // 级联选择器
      options: [
        {
          value: '成熟T和NK细胞淋巴瘤',
          label: '成熟T和NK细胞淋巴瘤',
          children: 
            [{
            value: 'T细胞淋巴瘤（亚型无法确定）',
            label: 'T细胞淋巴瘤（亚型无法确定）'
            },{
            value: 'T幼淋巴细胞白血病',
            label: 'T幼淋巴细胞白血病'
            },{
            value: 'T大颗粒淋巴细胞白血病',
            label: 'T大颗粒淋巴细胞白血病'
            },{
            value: 'NK细胞慢性淋巴增殖性疾病',
            label: 'NK细胞慢性淋巴增殖性疾病'
            },{
            value: '侵袭性NK细胞白血病',
            label: '侵袭性NK细胞白血病'
            },{
            value: '儿童系统性EBV阳性T细胞淋巴瘤',
            label: '儿童系统性EBV阳性T细胞淋巴瘤'
            },{
            value: '慢性活动性EBV感染（T细胞和NK细胞型），系统性',
            label: '慢性活动性EBV感染（T细胞和NK细胞型），系统性'
            },{
            value: '种痘水疱病样淋巴组织增殖性疾病',
            label: '种痘水疱病样淋巴组织增殖性疾病'
            },{
            value: '严重蚊虫叮咬过敏症',
            label: '严重蚊虫叮咬过敏症'
            },{
            value: '成人T细胞白血病/淋巴瘤',
            label: '成人T细胞白血病/淋巴瘤'
            },{
            value: '结外NK/T细胞淋巴瘤，鼻型',
            label: '结外NK/T细胞淋巴瘤，鼻型'
            },{
            value: '肠病相关T细胞淋巴瘤',
            label: '肠病相关T细胞淋巴瘤'
            },{
            value: '单形性嗜上皮性肠道T细胞淋巴瘤',
            label: '单形性嗜上皮性肠道T细胞淋巴瘤'
            },{
            value: '肠道T细胞淋巴瘤，非特指型',
            label: '肠道T细胞淋巴瘤，非特指型'
            },{
            value: '胃肠道惰性T细胞增殖性疾病',
            label: '胃肠道惰性T细胞增殖性疾病'
            },{
            value: '肝脾T细胞淋巴瘤',
            label: '肝脾T细胞淋巴瘤'
            },{
            value: '皮下脂膜炎样T细胞淋巴瘤',
            label: '皮下脂膜炎样T细胞淋巴瘤'
            },{
            value: '蕈样肉芽肿',
            label: '蕈样肉芽肿'
            },{
            value: 'Sezary综合征',
            label: 'Sezary综合征'
            },{
            value: '淋巴瘤样丘疹病',
            label: '淋巴瘤样丘疹病'
            },{
            value: '原发性皮肤间变性大细胞淋巴瘤',
            label: '原发性皮肤间变性大细胞淋巴瘤'
            },{
            value: '原发性皮肤γδT细胞淋巴瘤',
            label: '原发性皮肤γδT细胞淋巴瘤'
            },{
            value: '原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤',
            label: '原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤'
            },{
            value: '原发性皮肤肢端CD8阳性T细胞淋巴瘤',
            label: '原发性皮肤肢端CD8阳性T细胞淋巴瘤'
            },{
            value: '原发性皮肤CD4阳性小/中等大小T细胞增殖性疾病',
            label: '原发性皮肤CD4阳性小/中等大小T细胞增殖性疾病'
            },{
            value: '外周T细胞淋巴瘤，非特指型',
            label: '外周T细胞淋巴瘤，非特指型'
            },{
            value: '血管免疫母细胞T细胞淋巴瘤',
            label: '血管免疫母细胞T细胞淋巴瘤'
            },{
            value: '滤泡T细胞淋巴瘤',
            label: '滤泡T细胞淋巴瘤'
            },{
            value: '伴滤泡辅助T细胞表型的结内外周T细胞淋巴瘤',
            label: '伴滤泡辅助T细胞表型的结内外周T细胞淋巴瘤'
            },{
            value: '间变性大细胞淋巴瘤，ALK阳性',
            label: '间变性大细胞淋巴瘤，ALK阳性'
            },{
            value: '间变性大细胞淋巴瘤，ALK阴性',
            label: '间变性大细胞淋巴瘤，ALK阴性'
            },{
            value: '乳房植入物相关的间变性大细胞淋巴瘤',
            label: '乳房植入物相关的间变性大细胞淋巴瘤'
            },{
            value: '其他T细胞淋巴瘤',
            label: '其他T细胞淋巴瘤'
            }]
        },
        {
          value: '前驱淋巴性肿瘤',
          label: '前驱淋巴性肿瘤',
          children: 
            [{
            value: 'B淋巴母细胞白血病/淋巴瘤，非特殊类型',
            label: 'B淋巴母细胞白血病/淋巴瘤，非特殊类型'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤伴t（9；22）（q34.1；q11.2）；BCR-ABL1',
            label: 'B淋巴母细胞白血病/淋巴瘤伴t（9；22）（q34.1；q11.2）；BCR-ABL1'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤伴t（v；11q23.3）；KMT2A重排',
            label: 'B淋巴母细胞白血病/淋巴瘤伴t（v；11q23.3）；KMT2A重排'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤伴t（12；21）（p13.2；q22.1）；ETV6-RUNX1',
            label: 'B淋巴母细胞白血病/淋巴瘤伴t（12；21）（p13.2；q22.1）；ETV6-RUNX1'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤伴超二倍体',
            label: 'B淋巴母细胞白血病/淋巴瘤伴超二倍体'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤伴低二倍体',
            label: 'B淋巴母细胞白血病/淋巴瘤伴低二倍体'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤伴t（5；14）（q31.1；q32.3）；IL3-IGH',
            label: 'B淋巴母细胞白血病/淋巴瘤伴t（5；14）（q31.1；q32.3）；IL3-IGH'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤伴t（1；19）（q23；p13.3）；TCF3-PBX1',
            label: 'B淋巴母细胞白血病/淋巴瘤伴t（1；19）（q23；p13.3）；TCF3-PBX1'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤，BCR-ABL1样',
            label: 'B淋巴母细胞白血病/淋巴瘤，BCR-ABL1样'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤伴iAMP21',
            label: 'B淋巴母细胞白血病/淋巴瘤伴iAMP21'
            },{
            value: 'T淋巴母细胞白血病/淋巴瘤',
            label: 'T淋巴母细胞白血病/淋巴瘤'
            },{
            value: '早期T前驱淋巴母细胞白血病',
            label: '早期T前驱淋巴母细胞白血病'
            },{
            value: '自然杀伤（NK）淋巴母细胞白血病/淋巴瘤',
            label: '自然杀伤（NK）淋巴母细胞白血病/淋巴瘤'
            }]
        },
        {
          value: '成熟B细胞淋巴瘤',
          label: '成熟B细胞淋巴瘤',
          children: 
          [{
          value: 'B细胞淋巴瘤（亚型无法确定）',
          label: 'B细胞淋巴瘤（亚型无法确定）'
          },{
          value: '慢性淋巴细胞白血病（CLL）/小淋巴细胞淋巴瘤（SLL）',
          label: '慢性淋巴细胞白血病（CLL）/小淋巴细胞淋巴瘤（SLL）'
          },{
          value: '单克隆B淋巴细胞增多症（MBL）',
          label: '单克隆B淋巴细胞增多症（MBL）'
          },{
          value: 'B幼淋巴细胞白血病',
          label: 'B幼淋巴细胞白血病'
          },{
          value: '脾边缘区细胞淋巴瘤',
          label: '脾边缘区细胞淋巴瘤'
          },{
          value: '毛细胞白血病',
          label: '毛细胞白血病'
          },{
          value: '脾B细胞淋巴瘤/白血病，不能分类',
          label: '脾B细胞淋巴瘤/白血病，不能分类'
          },{
          value: '脾弥漫性红髓小B细胞淋巴瘤',
          label: '脾弥漫性红髓小B细胞淋巴瘤'
          },{
          value: '毛细胞白血病变异型',
          label: '毛细胞白血病变异型'
          },{
          value: '淋巴浆细胞淋巴瘤',
          label: '淋巴浆细胞淋巴瘤'
          },{
          value: '意义不明的单克隆丙种球蛋白病（MGUS），IgM型',
          label: '意义不明的单克隆丙种球蛋白病（MGUS），IgM型'
          },{
          value: 'Mu重链病',
          label: 'Mu重链病'
          },{
          value: 'Gamma重链病',
          label: 'Gamma重链病'
          },{
          value: 'Alpha重链病',
          label: 'Alpha重链病'
          },{
          value: '意义不明的单克隆丙种球蛋白病（MGUS），非IgM型',
          label: '意义不明的单克隆丙种球蛋白病（MGUS），非IgM型'
          },{
          value: '浆细胞骨髓瘤',
          label: '浆细胞骨髓瘤'
          },{
          value: '骨孤立性浆细胞瘤',
          label: '骨孤立性浆细胞瘤'
          },{
          value: '骨外浆细胞瘤',
          label: '骨外浆细胞瘤'
          },{
          value: '单克隆免疫球蛋白沉积病',
          label: '单克隆免疫球蛋白沉积病'
          },{
          value: '结外黏膜相关淋巴组织边缘区淋巴瘤（MALT淋巴瘤）',
          label: '结外黏膜相关淋巴组织边缘区淋巴瘤（MALT淋巴瘤）'
          },{
          value: '结内边缘区淋巴瘤',
          label: '结内边缘区淋巴瘤'
          },{
          value: '滤泡性淋巴瘤',
          label: '滤泡性淋巴瘤',
          children: [{
          value: '1',
          label: '1'
          },{
          value: '2',
          label: '2'
          },{
          value: '3a',
          label: '3a'
          },{
          value: '3b',
          label: '3b'
          }]
          },{
          value: '儿童型滤泡性淋巴瘤',
          label: '儿童型滤泡性淋巴瘤'
          },{
          value: '伴IRF4重排大B细胞淋巴瘤',
          label: '伴IRF4重排大B细胞淋巴瘤'
          },{
          value: '原发皮肤滤泡中心细胞淋巴瘤',
          label: '原发皮肤滤泡中心细胞淋巴瘤'
          },{
          value: '套细胞淋巴瘤',
          label: '套细胞淋巴瘤'
          },{
          value: '弥漫性大B细胞淋巴瘤（DLBCL），非特指型',
          label: '弥漫性大B细胞淋巴瘤（DLBCL），非特指型',
          children: [{
          value: '生发中心亚型',
          label: '生发中心亚型'
          },{
          value: '活化B细胞亚型',
          label: '活化B细胞亚型'
          }]
          },{
          value: '富于T细胞/组织细胞大B细胞淋巴瘤',
          label: '富于T细胞/组织细胞大B细胞淋巴瘤'
          },{
          value: '原发中枢神经系统弥漫性大B细胞淋巴瘤',
          label: '原发中枢神经系统弥漫性大B细胞淋巴瘤'
          },{
          value: '原发皮肤弥漫性大B细胞淋巴瘤，腿型',
          label: '原发皮肤弥漫性大B细胞淋巴瘤，腿型'
          },{
          value: 'EBV+弥漫性大B细胞淋巴瘤，非特指型',
          label: 'EBV+弥漫性大B细胞淋巴瘤，非特指型'
          },{
          value: 'EBV+黏膜皮肤溃疡',
          label: 'EBV+黏膜皮肤溃疡'
          },{
          value: '慢性炎症相关弥漫性大B细胞淋巴瘤',
          label: '慢性炎症相关弥漫性大B细胞淋巴瘤'
          },{
          value: '淋巴瘤样肉芽肿',
          label: '淋巴瘤样肉芽肿'
          },{
          value: '原发性纵隔（胸腺）大B细胞淋巴瘤',
          label: '原发性纵隔（胸腺）大B细胞淋巴瘤'
          },{
          value: '血管内大B细胞淋巴瘤',
          label: '血管内大B细胞淋巴瘤'
          },{
          value: 'ALK阳性大B细胞淋巴瘤',
          label: 'ALK阳性大B细胞淋巴瘤'
          },{
          value: '浆母细胞性淋巴瘤',
          label: '浆母细胞性淋巴瘤'
          },{
          value: '原发渗出性淋巴瘤',
          label: '原发渗出性淋巴瘤'
          },{
          value: '多中心Castleman病',
          label: '多中心Castleman病'
          },{
          value: 'HHV8阳性弥漫性大B细胞淋巴瘤，非特指型',
          label: 'HHV8阳性弥漫性大B细胞淋巴瘤，非特指型'
          },{
          value: 'HHV8阳性亲生发中心淋巴组织增殖性疾病',
          label: 'HHV8阳性亲生发中心淋巴组织增殖性疾病'
          },{
          value: 'Burkitt淋巴瘤',
          label: 'Burkitt淋巴瘤'
          },{
          value: '伴11q异常的Burkitt样淋巴瘤',
          label: '伴11q异常的Burkitt样淋巴瘤'
          },{
          value: '高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排',
          label: '高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排'
          },{
          value: '高级别B细胞淋巴瘤，非特指型',
          label: '高级别B细胞淋巴瘤，非特指型'
          },{
          value: '介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤',
          label: '介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤'
          },{
          value: '其他B细胞淋巴瘤',
          label: '其他B细胞淋巴瘤'
          }]
        },
        {
          value: '霍奇金淋巴瘤',
          label: '霍奇金淋巴瘤',
          children: [{
          value: '霍奇金淋巴瘤（亚型无法确定）',
          label: '霍奇金淋巴瘤（亚型无法确定）'
          },{
          value: '结节性淋巴细胞为主型霍奇金淋巴瘤',
          label: '结节性淋巴细胞为主型霍奇金淋巴瘤'
          },{
          value: '经典型霍奇金淋巴瘤',
          label: '经典型霍奇金淋巴瘤',
          children: [{
          value: '结节硬化型（NS）',
          label: '结节硬化型（NS）'
          },{
          value: '富于淋巴细胞型（LP）',
          label: '富于淋巴细胞型（LP）'
          },{
          value: '混合细胞型（MC）',
          label: '混合细胞型（MC）'
          },{
          value: '淋巴细胞消减型（LD）',
          label: '淋巴细胞消减型（LD）'
          }]
          }]
        }
      ],
      groupLists: [], //分组列表
      // 数据集列表
      data: [],
      edit:{},
      // 筛选条件名
      diagnosis2:'',  //病理类型
      name: "", //姓名
      sex: [], //性别
      birthday: "", //出生日期
      phone: "", //联系电话
      birthplace: "", //籍贯
      nation: "", //民族
      address_prov: "", //居住地址
      address_city: "", //居住地址
      sample_type: "", //就诊类型
      // ## 原医疗
      organization: "", //机构名称
      test_id: "", //病理号
      test_Yid: "", //病理号
      application_Ydate: "", //申请日期
      report_Ydate: "", //报告日期
      report_quality: "", //病理报告质量
      // ## 本医疗
      department: [], //送检科室
      application_date: "", //申请日期
      report_date: "", //报告日期
      sample_type: "", //标本类型
      sample_location: "", //取材部位
     
      mark:[],   //标志物
      value:[],   //结果
      dataForm:['数据录入','数据导入'],
      Integrate:['有原单位报告','无原单位报告'],
      jilian: [],
      Yjilian: [],
      dataform: '',            //数据来源
      // Integrate: '',           //整合信息
      tablelist: [], //病理号数组
      zhezhao: false,
      id: "", //列表参数
      // 分页器
      queryInfo: {
        page: 1, //页数
        pagerows: 10, //每页显示的条数
        count: 0 //数据总数
      },
      // 查询到的用户信息对象
      editForm: {},
      // 折叠面板默认打开
      activeNames: ["3", "1", "2"],
      activeName: ["1"],
      tablelist: [], //病理号数组
      // 大数组
      sicksArr: [],
      // 表单提交信息
      patient: {
        key: uuid(), //唯一标识
        patient_id: "", //病人ID
        name: "", //病人姓名
        sex: "", //病人性别
        birthday: "", //病人生日
        phone: "", //病人联系方式
        nation: "", //病人民族
        birthplace: "", //病人籍贯所在省
        address_prov: "" //病人现住址(省)
      },
      origin: {
        organization: "", //机构名称
        test_id: "", //病理号
        application_Ydate: "", //申请日期
        report_Ydate: "", //报告日期
        diagnosis: "", //诊断结论
        type: "", //淋巴瘤细胞来源
        report_quality: "", //原病理报告质量
        he_number: "", //HE切片
        he_quality: "", //质量
        ihc_number: "", //免疫组化切片
        ihc_quality: "", //质量
        problem_slice: "", //是否有制作问题
        patient_info: "", //患者信息是否完整
        history_info: "", //病史是否详细、
        sample_info: "", //取材部位是否清晰
        record: "", //病历资料
        helper_report: "" //重要辅助检查报告
      },
      report: {
        test_id: "", //"病理号"
        department: "", //送检科室
        application_date: "", //申请日期
        report_date: "", //报告日期
        diagnosis_type: "", //就诊类型
        sample_type: "", //标本类型
        sample_location: "", //取材部位
        sample_morphology: "", //形态学描述
        diagnosis: "", //诊断结论
        type: "" //淋细胞瘤来源
      },
      // 页面患者展示信息
      showInfo: {
        patient_id: "", //病人ID
        name: "", //病人姓名
        sex: "", //病人性别
        birthday: "", //病人生日
        phone: "", //病人联系方式
        nation: "", //病人民族
        birthplace: "", //病人籍贯所在省
        address_prov: "", //病人现住址(省)
        organization: "", //机构名称
        test_id: "", //病理号
        application_date: "", //申请日期
        report_date: "", //报告日期

        organization: "", //机构名称
        test_id: "", //病理号
        application_date: "", //申请日期
        report_date: "", //报告日期
        report_quality: "", //原病理报告质量
        he_number: "", //HE切片
        he_quality: "", //质量
        ihc_number: "", //免疫组化切片
        ihc_quality: "", //质量
        problem_slice: "", //是否有制作问题
        patient_info: "", //患者信息是否完整
        history_info: "", //病史是否详细、
        sample_info: "", //取材部位是否清晰
        record: "", //病历资料
        helper_report: "", //重要辅助检查报告

        test_id: "", //"病理号"
        department: "", //送检科室
        application_date: "", //申请日期
        report_date: "", //报告日期
        diagnosis_type: "", //就诊类型
        sample_type: "", //标本类型
        sample_location: "", //取材部位
        sample_morphology: "", //形态学描述
        diagnosis: "", //诊断结论
        type: "", //淋细胞瘤来源
        helper_diagnosis: "" //辅助诊断
      },
      // 以下是原诊断机构信息
      fMInstitution: {
        organization: {}, //机构名称
        test_id: {}, //病理号
        application_date: {}, //申请日期
        report_date: {}, //报告日期
        diagnosis: {}, //诊断结论
        type: {}, //"淋巴瘤细胞来源"
        report_quality: {}, //"原病理报告质量"
        he_number: {}, //"HE切片"
        he_quality: {}, //"质量"
        ihc_number: {}, //"免疫组化切片"
        ihc_quality: {}, //"质量"
        problem_slice: {}, //"是否有严重制作问题（如卷曲、褶皱等）的切片"
        patient_info: {}, //"患者基本信息是否完整"
        history_info: {}, //"病史摘要是否详细"
        sample_info: {}, //"取材部位是否描述清晰"
        record: {}, //"病历资料"
        helper_report: {} //"重要辅助检查报告"
      },

      // 以下是本医疗机构信息
      tMInstitution: {
        test_id: {}, //"病理号"
        department: {}, //送检科室
        application_date: {}, //申请日期
        report_date: {}, //报告日期
        diagnosis_type: {}, //就诊类型
        sample_type: {}, //标本类型
        sample_location: {}, //取材部位
        sample_morphology: {}, //形态学描述
        diagnosis: {}, //诊断结论
        type: {} //淋细胞瘤来源
      },
      // 辅助诊断信息
      FZ: {
        key_ihc: {}, //标志物
        value_ihc: {}, //检测结果

        key_fish: {}, //探针
        value_fish: {}, //检测结果

        key_dna: {}, //标志物
        value_dna: {}, //检测结果

        key_ish: {}, //标志物
        value_ish: {}, //检测结果

        type_fcm: {}, //标本类型
        value_fcm: {}, //检测结果

        type_ngs: {}, //标本类型
        value_ngs: {} //检测结果
      },
      // // 更改后作用未知
      mark: "", //免疫项对应数据初始化
      value: "", //免疫项对应数据初始化
      patient_info: [], //患者信息
      patient_infoAll: {}, //患者信息对象
      diagnosis_1_info: [], //原医疗机构
      diagnosis_1_infoAll: {}, //原医疗机构信息对象
      reportMessage: {}, //报告信息
      reportResult: {}, //报告结论
      reportMass: {}, //报告质量
      diagnosis_2_info: [], //现医疗机构
      diagnosis_2_infoAll: {}, //现医疗机构信息对象
      reportMessage: {}, //报告信息
      materMessage: {}, //取材信息
      reportResult: {}, //诊断结论
      helper_diagnosis: {}, //辅助诊断
      helper_diagnosisAll: {}, //辅助诊断信息对象
      ihc: {}, //免疫组化信息对象
      fish: {}, //荧光杂交信息对象
      rearrangement: {}, //基因重排
      ish: {}, //原位杂交
      fcm: {}, //流式细胞检测
      ngs: {}, //ngs检测
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
    this.getTableList();
    this.groupList();
    this.getmark()
    this.getresult()
    this.getDepart();
    this.get2()
  },
  methods: {
    get2(){
      this.options.map((item, index) => {
        // console.log(item.children);
        item.children.map((it, index) => {
          // console.log(it);
          this.twochoose.push(it.value);         
        });        
      });
      // console.log(this.twochoose)
    },
    // 获取送检科室
    getDepart(){
      const res=  this.axios.get('report/option.php?name=department&table=ly_report').then( res =>{
      console.log(res)
      this.department = res.data.option
      })
    },
    // 变动筛选
    gaibian(){
      this.shaixuan()
    },
    // 获取标志物,结果
    async getmark(){
      let name = ''
      const res= await this.axios.get('report/option.php?table=ly_helper_diagnosis&name=mark').then( res =>{
        console.log(res)
        this.mark = res.data.option
        // console.log(this.mark)
      })
    },
    async getresult(){
      let name = ''
      const res= await this.axios.get('report/option.php?table=ly_helper_diagnosis&name=value').then( res =>{
        console.log(res)
        this.value = res.data.option
        // console.log(this.result)
      })
    }, 
    // 添加标志物结果
    ihcAdd(){     
      if(this.mark|| this.value){
        //验证通过 添加新的一条
        var newValue = [{
          mark: "",
          value: ""
        }];
        newValue.push(this.mark,this.value);
        console.log(newValue)
        } else {
          alert("请检查输入是否正确");
        } 
    },
    // 获取选择分组
    groupList() {
      const res  = this.axios.get("group/list.php").then(res => {
        console.log(res);
        this.groupList = res.data.data;
        // this.groupList.map( ( items ,index ) => {
        //   console.log(items)
        // })
        console.log(res.data.data);
      });
    },
    // 保存
    baocun(editForm) {
      this.id = this.id;
      // console.log(this.id)
      this.editForm = this.editForm;
      this.editForm.help_diagnosis = this.help_diagnosis;
      // const sicksList = JSON.stringify(sicksArr)
      let data = {
        id: this.id,
        data: editForm
      };
      //data = qs.stringify(data);
      // console.log("data:",data);
      if (data) {
        // console.log(data)
        this.axios.post("report/edit.php", data).then(res => {
          console.log("res:", res);
          console.log(data);
          var result = res.data; //JSON.parse(res.body);
          console.log(result.result);
          if (result.result) {
            this.$alert("提交成功", "提交结果", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.getTableList();
                this.luru = false;
              }
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
    },
    // 清空按钮
    clear(editForm) {
      this.editForm = {};
      console.log(this.editForm)
    },
    // 多选框
    func1: function(value) {
      if (this.checkList.length == 0) {
        this.seen = false;
        this.seen1 = false;
        this.seen2 = false;
        this.seen3 = false;
        this.seen4 = false;
        this.seen5 = false;
      }
      for (var i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == "免疫组化") {
          this.seen = true;
          break;
        } else {
          this.seen = false;
        }
      }
      for (var i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == "荧光原位杂交") {
          this.seen1 = true;
          break;
        } else {
          this.seen1 = false;
        }
      }
      for (var i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == "淋巴瘤克隆性基因重排检测") {
          this.seen2 = true;
          break;
        } else {
          this.seen2 = false;
        }
      }
      for (var i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == "原位杂交") {
          this.seen3 = true;
          break;
        } else {
          this.seen3 = false;
        }
      }
      for (var i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == "流式细胞检测") {
          this.seen4 = true;
          break;
        } else {
          this.seen4 = false;
        }
      }
      for (var i = 0; i < this.checkList.length; i++) {
        if (this.checkList[i] == "ngs检测") {
          this.seen5 = true;
          break;
        } else {
          this.seen5 = false;
        }
      }
    },
    // 编辑按钮
    async bianji(row) {
      this.luru = true;
      const { data: res } = await this.axios.get("report/onedata.php", {
        params: { id: row.id }
      });
      this.editForm = res.data;
      if( this.editForm.application_date === '0000-00-00'){
        console.log(44)
        this.editForm.application_date = ''
      } 
      if( this.editForm.birthday === '0000-00-00'){
        console.log(4)
        this.editForm.birthday = ''
      }
      console.log(this.editForm)
      this.id = row.id;
      this.jilian = []
      this.helper_diagnosis = this.editForm.helper_diagnosis
      // console.log(this.helper_diagnosis);
      this.jilian.push(this.editForm.diagnosis1,this.editForm.diagnosis2,this.editForm.diagnosis3)
      // console.log(this.jilian)
      this.editForm.jilian = this.jilian
    },
    // 筛选重置按钮
    reset(edit) {
      this.edit = {};
      this.getTableList()

    },
    // 点击添加分组
    async addGroup(item, ids) {
      // console.log(item);
      // console.log(window.sessionStorage.username);
      var group_name = "";
      const { data: res } = await this.axios
        .post("group/add.php", {
          params: {
            group_name: item.group_name,
            userid: window.sessionStorage.uid,
            ids: this.ids,
            username: window.sessionStorage.username
          }
        })
        .then(res => {
          console.log(res);
          var result = res.data; //JSON.parse(res.body);
          if (result.result) {
            this.$alert("添加成功", "提交结果", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {}
            });
          } else {
            this.$alert("添加失败", "提交结果", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
          }
        });
      console.log(data);
    },
    inGroup(ids) {
      //console.log(this.ids)
      this.group = true;
    },
    // 点击拿到分组的ID
    group_id(it) {
      // console.log(it.id)
      this.id = it.id;
      this.addGroup(it);
    },
    // 点击确定
    async sure(id) {
      this.group = false;
    },
    // 点击筛选
    async shaixuan(edit) {
      console.log(this.edit);
      let group_id = "";
      let kw = ''
      const { data: res } = await this.axios.get("report/list.php", {
        params: {
          kw:this.whole,
          // group_id: 1,      
          // 患者信息
          name: this.edit.name,          //姓名   
          sex: this.edit.sex,            //性别
          nation: this.edit.nation,      //民族
          birthday: this.edit.birthday,  //出生日期
          phone: this.edit.phone,         //联系电话
          birthplace: this.edit.birthplace,           //籍贯
          address_prov: this.edit.address_prov,       //居住地省
          address_city: this.edit.address_city,       //居住地市

          //原医疗  ******
          application_Ydate: this.edit.application_Ydate,     //申请日期  **
          report_Ydate: this.edit.report_Ydate,           //报告日期  ***
          organization: this.edit.organization,           //机构名称
          test_Yid: this.edit.test_Yid,                   //病理号  **
          Yjilian: this.edit.Yjilian,                     //病理类型  **
          report_quality: this.edit.report_quality,           //报告质量
        
          //本医疗          
          test_id: this.edit.test_id,             //病理号
          department: this.edit.department,        //送检科室
          application_date: this.edit.application_date,   //申请日期
          report_date: this.edit.report_date,             //报告日期
          diagnosis_type: this.edit.diagnosis_type,       //就诊类型
          sample_location: this.edit.sample_location,     //取材部位 
          diagnosis2: this.edit.diagnosis2,               //病理类型 
          mark: this.edit.mark,                   //标志物
          value: this.edit.value,                  //检测结果
          dataform: this.edit.dataform,            //数据来源
          Integrate: this.edit.Integrate,           //整合信息                                                              
        }
      });
      console.log(res);
      this.tablelist = res.data;
      // console.log(res.data);
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      this.queryInfo.pagerows = res.pagerows; //每页显示多少条
    },
    // 数据删除
    del(row) {
      this.$confirm("确定删除该数据？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          const { data: res } = await this.axios.get("report/del.php ", {
            params: { id: row.id }
          });
          console.log(res);
          this.getTableList();
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
    // 切换每页显示多少条
    handleSizeChange(newSize) {
      this.queryInfo.pagerows = newSize;
      this.getTableList();
    },
    // 点击页数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      console.log(this.queryInfo.page);
      this.getTableList();
    },
    // // 获取病理号
    async getTableList() {
      const { data: res } = await this.axios.get("report/list.php", {
        params: { page: this.queryInfo.page }
      });
      // console.log("getTableList", res);
      this.tablelist = res.data;
      // console.log(res.data);
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      this.queryInfo.pagerows = res.pagerows; //每页显示多少条
      // this.tablelist.forEach(item => {
      //   item.checked = true; //默认选中
      //   // console.log(item)
      //   this.multipleSelection.push(item.id);
      //   this.ids = this.multipleSelection;
      //   console.log(this.ids)
      // });
    },
    // 获取选中数据
    checkTable(rows){
			console.log("rows",rows);	     
      rows.map( (item,index) =>{
        console.log(item.id)               
        this.ids.push(item.id)       
      })
      this.ids = [...new Set(this.ids)];       
      console.log(this.ids)      
		},
    // 点击查看
    async look(row) {
      this.zhezhao = true; //不能没
      const { data: res } = await this.axios.get("report/onedata.php", {
        params: { id: row.id }
      });
      this.editForm = res.data;
      this.id = row.id;
      if( this.editForm.application_date === '0000-00-00'){
        console.log(44)
        this.editForm.application_date = ''
      } 
      if( this.editForm.birthday === '0000-00-00'){
        console.log(4)
        this.editForm.birthday = ''
      }
      // this.editForm = Object.assign(res.data[0],res.data[1],res.data[2])
      // 表单对象
      console.log(this.editForm);
    },
    // 免疫租化增删
    ihcAddData( mark,value) {
      //判断当前数组的对象是否有数据
      console.log(ihcItem);
        if (mark || value){
          //验证通过 添加新的一条
          var newValue = {
             mark: "",
             value: ""
           };
         ihcItem.push(newValue);
        } else {
          alert("请检查输入是否正确");
        }     
    },
    // 免疫组化删除
    ihcDeleteData(mark,idx) {
      if (ihcItem.length > 1) {
        ihcItem.splice(idx, 1);
      } else {
        alert("最少保留一个");
      }
    },
  },
  mounted() {
    // 患者信息
    allMessage.formdata.map((sickItems, index) => {
      // 患者信息
      if (sickItems.field_index == 0) {
        this.patient_info = sickItems;
      }
    });
    // 获取患者基本信息外壳信息
    this.patient_info.items.map((patient_infoItems, index) => {
      if (patient_infoItems.name == "患者信息") {
        this.patient_infoAll = patient_infoItems;
      }
    });
    // 获取患者展示页详情信息
    this.patient_infoAll.fields.map((items, index) => {
      switch (items.english_name) {
        case "patient_id":
          this.showInfo.patient_id = items;
          break;
        case "name":
          this.showInfo.name = items;
          break;
        case "sex":
          this.showInfo.sex = items;
          break;
        case "birthday":
          this.showInfo.birthday = items;
          break;
        case "phone":
          this.showInfo.phone = items;
          break;
        case "nation":
          this.showInfo.nation = items;
          break;
        case "birthplace":
          this.showInfo.birthplace = items;
          break;
        case "address_prov":
          this.showInfo.address_prov = items;
          break;
        default:
          break;
      }
    });

    // 原医疗机构诊断
    allMessage.formdata.map((sickItems, index) => {
      if (sickItems.field_index == 1) {
        this.diagnosis_1_info = sickItems;
      }
    });
    this.diagnosis_1_info.items.map((item, index) => {
      if (item.name == "报告信息") {
        this.reportMessage = item;
      } else if (item.name == "诊断结论") {
        this.reportResult = item;
      } else {
        this.reportMass = item;
      }
    });
    // 报告信息内数据
    this.reportMessage.fields.map((item, index) => {
      switch (item.english_name) {
        case "organization":
          this.fMInstitution.organization = item;
          break;
        case "test_id":
          this.fMInstitution.test_id = item;
          break;
        case "application_date":
          this.fMInstitution.application_date = item;
          break;
        case "report_date":
          this.fMInstitution.report_date = item;
          break;
        default:
          break;
      }
    });

    // 报告结论信息
    this.reportResult.fields.map((item, index) => {
      switch (item.english_name) {
        case "diagnosis":
          this.fMInstitution.diagnosis = item;
          break;
        case "type":
          this.fMInstitution.type = item;
          break;
        default:
          break;
      }
    });

    // 报告质量
    this.reportMass.fields.map((item, index) => {
      switch (item.english_name) {
        case "report_quality":
          this.fMInstitution.report_quality = item;
          break;
        case "he_number":
          this.fMInstitution.he_number = item;
          break;
        case "he_quality":
          this.fMInstitution.he_quality = item;
          break;
        case "ihc_number":
          this.fMInstitution.ihc_number = item;
          break;
        case "ihc_quality":
          this.fMInstitution.ihc_quality = item;
          break;
        case "problem_slice":
          this.fMInstitution.problem_slice = item;
          break;
        case "patient_info":
          this.fMInstitution.patient_info = item;
          break;
        case "history_info":
          this.fMInstitution.history_info = item;
          break;
        case "sample_info":
          this.fMInstitution.sample_info = item;
          break;
        case "record":
          this.fMInstitution.record = item;
          break;
        case "helper_report":
          this.fMInstitution.helper_report = item;
          break;
        default:
          break;
      }
    });

    // 现医疗机构诊断
    allMessage.formdata.map((sickItems, index) => {
      if (sickItems.field_index == 2) {
        this.diagnosis_2_info = sickItems;
      }
    });
    this.diagnosis_2_info.items.map((item, index) => {
      if (item.name == "报告信息") {
        this.reportMessage = item;
      } else if (item.name == "取材信息") {
        this.materMessage = item;
      } else if (item.name == "诊断结论") {
        this.reportResult = item;
      } else {
        // 辅助诊断
        this.helper_diagnosis = item;
      }
    });

    // console.log(
    //   this.reportMessage,
    //   this.materMessage,
    //   this.reportResult,
    //   this.helper_diagnosis
    // ); //报告信息,取材信息,诊断结论, 辅助诊断
    //报告信息内数据
    this.reportMessage.fields.map((item, index) => {
      switch (item.english_name) {
        case "test_id":
          this.tMInstitution.test_id = item;
          break;
        case "department":
          this.tMInstitution.department = item;
          break;
        case "application_date":
          this.tMInstitution.application_date = item;
          break;
        case "report_date":
          this.tMInstitution.report_date = item;
          break;
        case "diagnosis_type":
          this.tMInstitution.diagnosis_type = item;
          break;
        default:
          break;
      }
    });

    //取材信息内数据
    this.materMessage.fields.map((item, index) => {
      switch (item.english_name) {
        case "sample_type":
          this.tMInstitution.sample_type = item;
          break;
        case "sample_location":
          this.tMInstitution.sample_location = item;
          break;
        case "sample_morphology":
          this.tMInstitution.sample_morphology = item;
          break;
        default:
          break;
      }
    });

    //诊断结论内数据
    this.reportResult.fields.map((item, index) => {
      switch (item.english_name) {
        case "diagnosis":
          this.tMInstitution.diagnosis = item;
          break;
        case "type":
          this.tMInstitution.type = item;
          break;
        default:
          break;
      }
    });

    // 辅助诊断
    allMessage.formdata.map((sickItems, index) => {
      if (sickItems.field_index == 3) {
        this.helper_diagnosis = sickItems;
      }
    });
    // console.log(this.helper_diagnosis);

    this.helper_diagnosis.items.map((item, index) => {
      if (item.name == "免疫组化") {
        this.ihc = item;
      } else if (item.name == "荧光原位杂交") {
        this.fish = item;
      } else if (item.name == "基因重排") {
        this.rearrangement = item;
      } else if (item.name == "原位杂交") {
        this.ish = item;
      } else if (item.name == "流式细胞检测") {
        this.fcm = item;
      } else {
        // ngs检测
        this.ngs = item;
      }
    });
    // console.log(
    //   this.ihc,
    //   this.fish,
    //   this.rearrangement,
    //   this.fcm,
    //   this.fcm,
    //   this.ngs
    // );
    // 免疫组化
    this.ihc.fields.map((item, index) => {
      switch (item.english_name) {
        case "key_ihc":
          this.FZ.key_ihc = item;
          break;
        case "value_ihc":
          this.FZ.value_ihc = item;
          break;
        default:
          break;
      }
    });
    // 荧光杂交
    this.fish.fields.map((item, index) => {
      switch (item.english_name) {
        case "key_fish":
          this.FZ.key_fish = item;
          break;
        case "value_fish":
          this.FZ.value_fish = item;
          break;
        default:
          break;
      }
    });
    // 基因重排
    this.rearrangement.fields.map((item, index) => {
      switch (item.english_name) {
        case "key_dna":
          this.FZ.key_dna = item;
          break;
        case "value_dna":
          this.FZ.value_dna = item;
          break;
        default:
          break;
      }
    });
    // 原位杂交
    this.ish.fields.map((item, index) => {
      switch (item.english_name) {
        case "key_ish":
          this.FZ.key_ish = item;
          break;
        case "value_ish":
          this.FZ.value_ish = item;
          break;
        default:
          break;
      }
    });
    // 流式细胞检测
    this.fcm.fields.map((item, index) => {
      switch (item.english_name) {
        case "type_fcm":
          this.FZ.type_fcm = item;
          break;
        case "value_fcm":
          this.FZ.value_fcm = item;
          break;
        default:
          break;
      }
    });
    // ngs检测
    this.ngs.fields.map((item, index) => {
      switch (item.english_name) {
        case "type_ngs":
          this.FZ.type_ngs = item;
          break;
        case "value_ngs":
          this.FZ.value_ngs = item;
          break;
        default:
          break;
      }
    });
  }
};
</script>



<style scoped lang="stylus" rel="stylesheet/stylus" >
#dataImport .el-collapse-item__header {
  border-left: 5px #1CA5FF solid;
  margin: 10px;
}

.shaixu {
  width: 1630px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
  border-radius: 4px;

  .title {
    height: 40px;
    line-height: 40px;
    background: rgba(250, 250, 250, 1);
    box-shadow: 0px 1px 0px 0px rgba(224, 224, 224, 0.75);
    border-radius: 4px 0px 0px 0px;

    .el-input {
      width: 280px;
    }

    .el-button {
      background: rgba(28, 178, 255, 1);
      border-radius: 0px 4px 3px 0px;
    }

    .iconsousuo {
      color: white;
    }

    .icontubiaozhizuo- {
      color: rgba(28, 173, 255, 1);
    }
  }

  .jiben {
    display: flex;
    flex-wrap: wrap;
    .ji {
      width: 300px;
      display: flex;
      flex-flow: row;
      margin-left: 20px;
      margin-top: 20px;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 69px;
      }
    }
  }

  .baogao {
    display: flex;
    flex-wrap: wrap;
    .bao {
      width: 300px;
      display: flex;
      margin-left: 20px;
      flex-flow: row;
      margin-left: 20px;
      margin-top: 20px;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 100px;
      }
    }
  }

  .zhenduan {
    display: flex;
    flex-wrap: wrap;
    .zhen {
      width: 300px;
      display: flex;
      margin-left: 20px;
      flex-flow: row;
      margin-left: 20px;
      margin-top: 20px;
      justify-content: space-around;
      span {
        display: inline-block;
        width: 80px;
      }
    }
  }
  .yuan {
    display: flex;
    flex-wrap: wrap;
    .lai {
      margin-top: 20px;
      margin-left: 20px;
      span {
        display: inline-block;
        width: 80px;
      }
    }
  }
  .zhenD {
    display: flex;
    flex-wrap: wrap;
    margin-top 20px
    .duan {
      margin-left: 20px;
      span {
        display: inline-block;
        width: 80px;
      }
    }
  }

  .footer {
    height: 42px;
    background: rgba(250, 250, 250, 1);
    box-shadow: 0px -1px 0px 0px rgba(224, 224, 224, 0.75);
    border-radius: 0px 0px 4px 4px;

    .el-button {
      float: right;
    }
  }
}

.list {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
  border-radius: 4px;
  margin-top: 20px;

  .down {
    padding-bottom: 60px;
    border-top: 1px solid rgba(28, 165, 255, 1);

    span {
      margin-left: 10px;
    }

    .el-pagination {
      float: right;
      margin: 10px 10px 0 0;
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

// 分组弹窗
.out {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 247, 251, 0.7);
  z-index: 9;

  .nei {
    border-radius: 5px;
    width: 550px;
    height: 300px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
    background-color: #FAFAFA;
    z-index: 10;

    // 头
    .title {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      color: white;
      background-color: rgba(41, 184, 252, 1);
    }

    // 主体
    .mian {
      background-color: #FAFAFA;

      .ming {
        margin-left: 20px;
        margin-top: 10px;

        span {
          width: 100px;
        }
      }

      .cun {
        margin-left: 30px;
        margin-top: 10px;

        span {
          width: 100px;
        }
      }

      // 搜索
      .sousuo {
        margin: 20px 20px 10px 20px;
      }

      .groupList {
        width: 500px;
        border: 1px solid #DCDFE6;
        margin: 20px 20px;
        display: flex;
        flex-flow: column;
        justify-content: space-evenly;

        .el-button {
          margin-left: 20px;
          font-size: 16px;
          margin-top: 10px;
        }
      }

      .name {
        margin-left: 20px;
      }

      .button {
        float: right;
        margin-top: 10px;
        margin-right: 30px;
      }
    }
  }
}

// 表单
.sick {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 247, 251, 0.7);
  z-index: 9;
  overflow-y: auto;

  .container {
    border-radius: 5px;
    width: 1200px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
    background-color: #FAFAFA;
    z-index: 10;

    .el-input {
      width: 200px;
    }

    .form {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
      border-radius: 4px;
      position: relative;

      // 按钮
      .header {
        border-bottom: 1px solid rgba(232, 232, 232, 1);
        height: 30px;
        display: flex;
        justify-content: space-between;
        background: #1CB1FF;
        line-height: 30px;

        just, span {
          color: white;
          margin-left: 20px;
          margin-right: 20px;
        }

        .iconfont {
          color: white;
        }
      }

      // 表单
      .formList {
        .HZ {
          margin: 20px;
          background-color: rgba(250, 250, 250, 1);
          border-radius: 5px;

          .HZdown {
            display: flex;
            justify-content: space-evently;
            flex-wrap: wrap;
            margin: 10px auto;

            .sickItem {
              width: 300px;
              display: inline-block;
              height: 50px;
              display: flex;
              justify-content: space-around;
              align-items: center;
              margin-left: 40px;

              span {
                display: inline-block;
                width: 60px;
              }
            }
          }
        }

        // 原医疗机构信息内容
        .origin {
          margin: 20px;
          border-radius: 5px;

          .origindown {
            .buju {
              margin-left: 50px;
            }

            .sickIH {
              .title {
                background-color: #EFEEF1;
                margin: 10px 20px;
                height: 35px;
                line-height: 35px;
                border-left: 5px #3190E8 solid;
                padding-left: 10px;
              }

              .sickItem {
                display: inline-block;
                margin: 10px;
                margin-left: 50px;

                span {
                  display: inline-block;
                  width: 112px;
                }
              }

              .kuai {
                display: flex;
                flex-flow: row;
                height: 200px;
                margin-top: 20px;

                // 报告质量下的块
                .p-one {
                  border: 1px solid rgba(224, 224, 224, 1);
                  width: 450px;
                  margin-left: 30px;
                  height: 190px;

                  .titles {
                    display: block;
                    padding-left: 20px;
                    border-bottom: 1px solid rgba(224, 224, 224, 1);
                    height: 30px;
                    line-height: 30px;
                    background-color: rgba(232, 232, 232, 1);
                  }

                  .sickItems {
                    display: flex;
                    flex-flow: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    margin-left: 20px;
                    float: left;
                    height: 50px;
                    line-height: 50px;

                    .one {
                      display: inline-block;
                      width: 100px;
                    }

                    .three {
                      display: inline-block;
                      width: 100px;
                    }

                    .two {
                      display: inline-block;
                      width: 50px;
                    }

                    .four {
                      display: inline-block;
                      width: 50px;
                    }

                    .five {
                      display: inline-block;
                      width: 295px;
                    }
                  }
                }

                .p-two {
                  border: 1px solid rgba(224, 224, 224, 1);
                  width: 300px;
                  margin-left: 30px;
                  height: 190px;

                  .titles {
                    display: block;
                    padding-left: 20px;
                    border-bottom: 1px solid rgba(224, 224, 224, 1);
                    height: 30px;
                    line-height: 30px;
                    background-color: rgba(232, 232, 232, 1);
                  }

                  .sickItems {
                    display: flex;
                    flex-flow: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    margin-left: 30px;
                    float: left;
                    height: 50px;
                    line-height: 50px;

                    span {
                      width: 150px;
                    }
                  }
                }

                .p-three {
                  border: 1px solid rgba(224, 224, 224, 1);
                  width: 250px;
                  margin-left: 30px;
                  height: 190px;

                  .titles {
                    display: block;
                    padding-left: 20px;
                    border-bottom: 1px solid rgba(224, 224, 224, 1);
                    height: 30px;
                    line-height: 30px;
                    background-color: rgba(232, 232, 232, 1);
                  }

                  .sickItems {
                    display: flex;
                    flex-flow: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    margin-left: 20px;
                    float: left;
                    height: 50px;
                    line-height: 50px;

                    span {
                      width: 120px;
                    }
                  }
                }
              }
            }
          }
        }

        // 本医疗机构
        .report {
          margin: 20px;
          border-radius: 5px;

          .reportdown {
            .sickIH {
              .title {
                background-color: #EFEEF1;
                margin: 10px 20px;
                height: 35px;
                line-height: 35px;
                border-left: 5px #3190E8 solid;
                padding-left: 10px;
              }

              .sickItem {
                display: inline-block;
                margin: 10px;
                margin-left: 50px;

                span {
                  display: inline-block;
                  width: 110px;
                }
              }
            }

            .ihc {
              display: inline;
              display: flex;
              flex-flow: row;
              flex-wrap: wrap;

              .titl {
                margin: 10px 40px;
                background-color: #EFEEF1;
                height: 40px;
                line-height: 40px;
              }

              #one {
                width: 385px;
                background: rgba(249, 249, 249, 1);
                border: 1px solid rgba(229, 229, 229, 1);
                border-radius: 4px;
                margin: 0 40px;
                padding-bottom: 20px;

                .sickI {
                  display: inline-block;

                  .sickIt {
                    margin: 0 10px;

                    .name {
                      display: inline-block;
                      width: 70px;
                    }
                  }
                }

                position: relative;
                display: flex;
                padding-top: 20px;
              }

              #two {
                width: 420px;
                background: rgba(249, 249, 249, 1);
                border: 1px solid rgba(229, 229, 229, 1);
                border-radius: 4px;
                margin: 0 80px;
                padding-bottom: 20px;
                position: relative;
                display: flex;
                align-items: center;
                padding-top: 20px;

                .sickI {
                  display: inline-block;

                  .sickIt {
                    margin: 0 10px;

                    .name {
                      display: inline-block;
                      width: 70px;
                    }
                  }
                }
              }

              #three {
                width: 420px;
                background: rgba(249, 249, 249, 1);
                border: 1px solid rgba(229, 229, 229, 1);
                border-radius: 4px;
                margin: 0 80px;
                padding-bottom: 20px;
                position: relative;
                display: flex;
                align-items: center;
                padding-top: 20px;

                .sickI {
                  display: inline-block;

                  .sickIt {
                    margin: 0 10px;

                    .name {
                      display: inline-block;
                      width: 70px;
                    }
                  }
                }
              }

              #four {
                width: 420px;
                background: rgba(249, 249, 249, 1);
                border: 1px solid rgba(229, 229, 229, 1);
                border-radius: 4px;
                margin: 0 80px;
                padding-bottom: 20px;
                position: relative;
                display: flex;
                align-items: center;
                padding-top: 20px;

                .sickI {
                  display: inline-block;

                  .sickIt {
                    margin: 0 10px;

                    .name {
                      display: inline-block;
                      width: 70px;
                    }
                  }
                }
              }

              #five {
                width: 420px;
                background: rgba(249, 249, 249, 1);
                border: 1px solid rgba(229, 229, 229, 1);
                border-radius: 4px;
                margin: 0 80px;
                padding-bottom: 20px;
                position: relative;
                display: flex;
                align-items: center;
                padding-top: 20px;

                .sickI {
                  display: inline-block;

                  .sickIt {
                    margin: 0 10px;

                    .name {
                      display: inline-block;
                      width: 70px;
                    }
                  }
                }
              }

              #six {
                width: 420px;
                background: rgba(249, 249, 249, 1);
                border: 1px solid rgba(229, 229, 229, 1);
                border-radius: 4px;
                margin: 0 80px;
                padding-bottom: 20px;
                position: relative;
                display: flex;
                align-items: center;
                padding-top: 20px;

                .sickI {
                  display: inline-block;

                  .sickIt {
                    margin: 0 10px;

                    .name {
                      display: inline-block;
                      width: 70px;
                    }
                  }
                }
              }
            }
          }
        }

        .btn {
          .el-button {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            margin: 10px;
          }
        }
      }
    }
  }
}
</style>
