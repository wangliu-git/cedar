<template>
  <div class="mainContainer" ref="form">
    <!--数据存储 -->
    <div class="storage" v-if="wenjian">
      <div class="storageR">
        <div class="eContainer">
          <div id="myUpload">
            <!-- <el-input placeholder="请选择文件上传" size="mini" style="width:250px"></el-input>   -->
            <el-button type="primary" size="mini" @click="uploadFile">导入文件</el-button>
            <!--上传-->
            <el-dialog title="上传" width="40%" :visible.sync="uploadTemplateDialog">
              <el-row>
                <el-col :span="22">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://106.13.49.232/cedar/api/upload_file/add.php"
                    :accept="acceptFileType"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :before-upload="beforeUpload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false"
                  >
                    <el-button slot="trigger" size="small" type="primary">选取csv格式文件</el-button>
                    <div slot="tip" class="el-upload_tip">只能上传.csv文件,且不超过1M</div>
                  </el-upload>
                </el-col>
              </el-row>
              <span slot="footer" class="dialog-footer">
                <el-button
                  @click="submitUpload"
                  type="primary"
                  size="mini"
                  :loading="uploadLoading"
                >确定上传</el-button>
                <el-button @click="uploadTemplateDialog=false" size="mini">取消</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>

    <!--数据集列表 @click="jiexi"   <el-button class="xiazai" size="small">
    <span class="iconfont iconxiazai">下载excel模板</span>    <span>{{this.L_W}}</span>
    </el-button>-->
    <div class="storageList" v-if="ji">
      <div class="list" style="width:96%">
        <el-table
          :data="datalist"
          highlight-current-row
          style="width: 100%"
          border
          stripe
          :row-click="chakan"
          :header-cell-style="{color:'#333333'}"
        >
          <el-table-column prop="file_name" label="文件名称" width="300"></el-table-column>
          <el-table-column prop="upload_time" label="上传时间" width="300"></el-table-column>
          <el-table-column label="已录入:未录入" width="300">
            <template slot-scope="scope">{{ scope.row.exec_line}} : {{ scope.row.total_line }}</template>
          </el-table-column>
          <el-table-column prop="location" label="研究项目" width="300"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="bianji(scope.row)">
                <span>编辑</span>
              </el-button>
              <el-button type="text" size="small" @click="chakan(scope.row,scope.$index)">
                <span>查看</span>
              </el-button>
              <el-button type="text" size="small" @click="dele(scope.row)">
                <span>删除</span>
              </el-button>
              <el-button class="jiexi" size="small" v-if="scope.row.status == 1"  @click="jiexi(scope.row)">
                <i class="iconfont iconxiazai" >开始解析</i>
              </el-button>
              <el-button class="jiexi" size="small" v-else style="background:#26bc99">
                <i class="iconfont iconxiazai">解析成功</i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination
        style="margin:10px 35%"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="shuInfo.page"
        :page-sizes="[5]"
        :page-size="shuInfo.pagerows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="shuInfo.count"
      ></el-pagination>
    </div>

    <!--搜索 -->
    <div class="s" v-if="sousuo">
      <div class="search">
        <div class="up">
          <span>精准搜索 :</span>
          <el-input
            size="mini"
            placeholder="请输入病理号"
            prefix-icon="el-icon-search"
            style="width:180px"
            v-model="test_id"
            @keyup.enter.native="getTable()"
          ></el-input>
          <el-input
            size="mini"
            placeholder="请输入姓名"
            prefix-icon="el-icon-search"
            style="width:180px"
            v-model="name"
            @keyup.enter.native="getTable()"
          ></el-input>
          <el-button type="primary" size="mini" @click="getTable">确定</el-button>
          <el-button type="primary" size="mini" class="pass" @click="passList(idss)">
            <i class="iconfont iconpiliangtongguo"></i> 批量通过
          </el-button>
        </div>
        <div class="down">
          <el-table
            :data="tablelist"
            tooltip-effect="dark"
            style="width: 100%"
            border
            :header-cell-style="{color:'#333333'}"
            stripe
            @selection-change="checkTable"
          >
            <el-table-column  width="40" type="selection">            
            </el-table-column>
            <el-table-column prop="test_id" label="病理号" width="170" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" width="170" sortable></el-table-column>
            <el-table-column prop="diagnosis2_normal" label="病理类型" width="200" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="150" sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="150" sortable></el-table-column>
            <el-table-column
              prop="report_time"
              label="报告时间"
              show-overflow-tooltip
              width="170"
              sortable
            ></el-table-column>
            <el-table-column
              prop="entry_status"
              label="录入状态"
              show-overflow-tooltip
              width="170"
              sortable
            ></el-table-column>
            <el-table-column
              prop="complete_degree"
              label="完整度"
              show-overflow-tooltip
              width="170"
              sortable
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="170">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="look(scope.row)">
                  <span>录入</span>
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
    </div>

    <!--表单 -->
    <div class="container" id="dataImport" v-if="luru">
      <div class="form">
        <!-- 按钮-->
        <div class="header">
          <el-button-group>
            <el-button size="small" icon="el-icon-arrow-left" @click="xianshi()">返回列表</el-button>
            <el-button size="mini" class="next">
              <i class="iconfont iconxiayige1" @click="next()">下一个</i>
            </el-button>
          </el-button-group>
        </div>
        <!-- 表单-->
        <div class="formList" :v-model="editForm">
          <!-- 折叠面板-->
          <!-- 患者信息-->
          <el-collapse v-model="activeNames" class="HZ">
            <el-collapse-item name="1">
              <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
                <i class="iconfont icontubiaozhizuo-"></i>
                {{patient_infoAll.name}}:
              </template>
              <!-- 患者信息内容-->
              <div class="HZdown">
                <!--病人ID -->
                <div class="sickItem">
                  <!-- <span>{{showInfo.patient_id.field_title}}:</span> -->
                  <span>住院号:</span>
                  <el-input
                    type="text"
                    maxlength="10"
                    show-word-limit
                    v-model="editForm.patient_id"
                    name="patient_id"
                    size="mini"
                    placeholder="请输入住院号/门诊号"
                    style="width:200px"
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
                    placeholder="请输入姓名"
                    style="width:200px"
                  ></el-input>
                </div>

                <div class="sickItem">
                  <span>年龄:</span>
                  <el-input
                    type="text"
                    size="mini"
                    v-model="editForm.age"
                    name="age"
                    placeholder="请输入年龄"
                    style="width:200px"
                  ></el-input>
                </div>
                <!--性別 -->
                <div class="sickItem">
                  <span>{{showInfo.sex.field_title}}:</span>
                  <el-select
                    placeholder="请选择"
                    name="sex"
                    v-model="editForm.sex"
                    size="mini"
                    style="width:200px"
                  >
                    <el-option v-for="item in showInfo.sex.field_values" :key="item" :value="item">
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
                    placeholder="请输入电话"
                    style="width:200px"
                  ></el-input>
                </div>
                <!--民族-->
                <div class="sickItem">
                  <span>{{showInfo.nation.field_title}}:</span>
                  <el-select
                    placeholder="请选择"
                    name="nation"
                    v-model="editForm.nation"
                    size="mini"
                    style="width:200px"
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
                    v-model="editForm.birthplace"
                    size="mini"
                    style="width:200px"
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
                    v-model="editForm.address_prov"
                    size="mini"
                    style="width:200px"
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
          <el-collapse v-model="activeNames" class="origin">
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
                      size="mini"
                      style="width:200px"
                    ></el-input>
                  </div>
                  <div class="sickItem">
                    <span>{{fMInstitution.test_id.field_title}}:</span>
                    <el-input
                      type="text"
                      v-model="editForm.test_id"
                      placeholder="请输入病理号"
                      size="mini"
                      style="width:200px"
                    ></el-input>
                  </div>
                  <div class="sickItem">
                    <span>{{fMInstitution.application_date.field_title}}:</span>
                    <el-date-picker
                      name="application_date"
                      style="width:200px"
                      v-model="editForm.application_date"
                      type="date"
                      size="mini"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </div>
                  <div class="sickItem">
                    <span>{{fMInstitution.report_date.field_title}}:</span>
                    <el-date-picker
                      name="report_date"
                      style="width:200px"
                      v-model="editForm.report_date"
                      type="date"
                      size="mini"
                      placeholder="选择日期"
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
                    <span>病理类型原文:</span>
                    <el-input
                      size="mini"
                      v-model="editForm.diagnosis2"                    
                      clearable
                      style="width:350px"
                    ></el-input>
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
                      v-model="editForm.report_quality"
                      size="mini"
                      style="width:200px"
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
                        <el-select name="he_quality" v-model="editForm.he_quality" size="mini">
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
                        <el-select name="ihc_quality" v-model="editForm.ihc_quality" size="mini">
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
                        <el-select name="patient_info" v-model="editForm.patient_info" size="mini">
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
                        <el-select name="history_info" v-model="editForm.history_info" size="mini">
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
                        <el-select name="sample_info" v-model="editForm.sample_info" size="mini">
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
                        <el-select name="record" v-model="editForm.record" size="mini">
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
          <el-collapse v-model="activeNames" class="report">
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
                      size="mini"
                    ></el-input>
                  </div>

                  <div class="sickItem">
                    <span>{{tMInstitution.department.field_title}}:</span>
                    <el-input
                      type="text"
                      v-model="editForm.department"
                      placeholder="请输入机构名称"
                      size="mini"
                    ></el-input>
                  </div>

                  <div class="sickItem">
                    <span>{{tMInstitution.application_date.field_title}}:</span>
                    <el-date-picker
                      name="application_date"
                      v-model="editForm.application_date"
                      type="date"
                      size="mini"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </div>

                  <div class="sickItem">
                    <span>{{tMInstitution.report_date.field_title}}:</span>
                    <el-date-picker
                      name="test_id"
                      v-model="editForm.report_date"
                      type="date"
                      size="mini"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </div>
                  <div class="sickItem">
                    <span>{{tMInstitution.diagnosis_type.field_title}}：</span>
                    <el-select name="diagnosis_type" v-model="editForm.diagnosis_type" size="mini">
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
                        :value="item"
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
                    <span>取材部位：</span>
                    <el-input
                      type="text"
                      v-model="editForm.sample_location"
                      placeholder="请输入取材部位"
                      size="mini"
                    ></el-input>
                  </div>
                </div>

                <div class="sickIH">
                  <!--就诊结论 -->
                  <div class="title">
                    <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                    {{reportResult.name}}:
                  </div>
                  <!-- <div class="sickItem">
                    <span>病理类型:</span>
                    <el-cascader
                      size="mini"
                      v-model="editForm.jilian"                    
                      :options="options"
                      :props="{ checkStrictly: true }"
                      clearable
                      style="width:580px"
                    ></el-cascader>
                  </div> -->

                  <div class="sickItem">
                    <span>病理大类：</span>
                    <el-select name="sample_type" v-model="editForm.diagnosis1_normal" size="mini" style="width:300px">
                      <el-option
                        v-for="(item,index) in  this.onechoose"
                        :key="index"
                        :value="item"
                      >
                        <span>{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>

                  <div class="sickItem">
                    <span>详细类型：</span>
                    <el-select name="sample_type" v-model="editForm.diagnosis2_normal" size="mini" style="width:300px">
                      <el-option
                        v-for="(item,index) in  this.twochoose"
                        :key="index"
                        :value="item"
                      >
                        <span>{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>

                  <div class="sickItem">
                    <span>病理亚型：</span>
                    <el-select name="sample_type" v-model="editForm.diagnosis3_normal" size="mini" style="width:300px">
                      <el-option
                        v-for="(item,index) in  tMInstitution.sample_type.field_values"
                        :key="index"
                        :value="item"
                      >
                        <span>{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>

                  <div class="sickItem" >
                    <span>病理类型原文:</span>
                    <el-input
                      size="mini"
                      v-model="editForm.diagnosis_txt2"                    
                      clearable
                      style="width:550px"
                    ></el-input>
                  </div>
                </div>

                <!--辅助诊断 -->
                <div class="sickIH">
                  <div class="title">
                    <span>
                      <!-- <i class="iconfont icontubiaozhizuo-"></i> {{helper_diagnosis.name}}-->
                      辅助诊断:
                    </span>
                    <el-checkbox-group
                      v-model="checkList"
                      @change="func1"
                      style="display: initial;"
                    >
                      <el-checkbox style="margin-left=10px" label="免疫组化"></el-checkbox>
                       <el-checkbox  style="margin-left=10px" label="分子检测"></el-checkbox>
                     <!--  <el-checkbox label="荧光原位杂交"></el-checkbox>
                      <el-checkbox label="淋巴瘤克隆性基因重排检测"></el-checkbox>
                      <el-checkbox label="原位杂交"></el-checkbox>
                      <el-checkbox label="流式细胞检测"></el-checkbox>
                      <el-checkbox label="ngs检测"></el-checkbox> -->
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
                    <div id="one" v-for="(ihcItem,idx) in this.helper_diagnosis.ihc" :key="idx">
                      <!-- 循环myzh这个数组，来动态 + - 操作 -->
                      <div class="sickI">
                        <div class="sickIt">
                          <span class="name">{{FZ.key_ihc.field_title}}：</span>
                          <el-input v-model="ihcItem.mark" style="width:80px"></el-input>
                        </div>
                      </div>
                      <div class="sickI">
                        <div class="sickIt">
                          <span class="name">{{FZ.value_ihc.field_title}}：</span>
                          <el-input v-model="ihcItem.value" style="width:130px"></el-input>
                        </div>
                      </div>
                      <!-- + - 操作只需要传入当前循环的数组 -->
                      <!-- 判断 必须是最后一条，才可以显示操作按钮 -->
                      <div class="handleBtnBox">
                        <!-- el-button: v-if="idx==testFZ.ihc.length-1" -->
                        <el-button style="margin-right: 5px;" v-if="idx==helper_diagnosis.ihc.length-1" @click="ihcAddData(helper_diagnosis.ihc,helper_diagnosis.ihc[idx])">
                          <i class="iconfont iconaddTodo-nav"></i>
                        </el-button>
                        <el-button @click="ihcDeleteData(helper_diagnosis.ihc,idx)">
                          <i class="iconfont iconjianhao1"></i>
                        </el-button>
                      </div>
                    </div>
                  </div>

                  <div v-show="seen1">
                    <span class="titl">
                      <i class="iconfont icontubiaozhizuo-"></i>
                      分子检测:
                    </span>
                    <div id="two" v-for="(fish,idx) in help_diagnosis.fish" :key="idx">
                      <div class="sickI">
                        <div class="sickIt">
                          <span class="name">{{FZ.key_fish.field_title}}：</span>
                          <el-select size="mini" style="width:100px" v-model="fish.mark">
                            <el-option
                              v-for="(item,index) in FZ.key_fish.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                      <div class="sickI">
                        <div class="sickIt">
                          <span class="name">{{FZ.value_fish.field_title}}：</span>
                          <el-select size="mini" style="width:100px" v-model="fish.value">
                            <el-option
                              v-for="(item,index) in  FZ.value_fish.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
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
            <el-button type="primary" @click="submit()" class="commit" style="width:100%">提交</el-button>
            <div class="textCon">
              <div class="text">
                <span>原始文本</span>
                <div class="content">
                  <span>{{editForm.diagnosis_txt}}</span>
                </div>
              </div>
            </div>
          </el-collapse>
        </div>
      </div>
    </div>

    <!--分组 -->
    <div class="out" v-if="!group" :data="data">
      <div class="nei">
        <div class="title">
          <span>请选择分组</span>
          <span @click="group =true">
            <i class="iconfont iconx"></i>
          </span>
        </div>
        <div class="mian">
        <!--
          <div class="ming">
            <span>文件名称：</span>
            <el-input style="width:420px" size="small" v-model="data.file_name"></el-input>
          </div>
          <div class="cun">
            <span>项目名称：</span>
            <el-input style="width:420px" size="small" v-model="data.location"></el-input>
          </div>
          -->
          <div class="sousuo">
            <el-input placeholder="请输入关键词..." style="width:500px">
              <el-button   plain slot="append">搜索</el-button>
            </el-input>
          </div>
          <div class="groupList">
            <el-button v-model="location"
              v-for="(it, index) in this.groupList"
              :key="index"
              :value="it.group_name"
             @click="location_name(it)">{{it.group_name}}</el-button>
          </div>
          <div class="name">
            <span>新建项目名称 ：</span>
            <el-input placeholder="请输入项目名称..." style="width:380px" v-model="groupName">
              <el-button plain slot="append" @click="addGroup(groupName)">保存</el-button>
            </el-input>
          </div>
          <div class="button">
            <el-button plain size="small" @click="group =true">取消</el-button>
            <el-button plain size="small" @click="sure(id)">确定</el-button>
          </div>
        </div>
      </div>
    </div>

    <!--病人信息 -->
    <div class="zhezhao" v-if="zhezhao" :model="editForm">
      <div class="look">
        <div class="header">
          <span>查看病理信息</span>
          <span @click="zhezhao = !zhezhao">
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
              {{editForm.test_id}}
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
            
            <!-- div><span>淋巴细胞来源：</span>{{editForm.type}}</div>-->
            <div style="float:left">
              <span>取材部位：</span>
              {{editForm.sample_location}}
            </div>
            <div style="float:left">
              <span>标本类型：</span>
              {{editForm.sample_type}}
            </div>
            <div style="float:left">
              诊断结论
              <span>病理类型：</span>
              {{editForm.diagnosis2_normal}}
            </div>
            <div style="float:left">
              辅助诊断
              <span>免疫组化：</span>
              <th v-for="(item,index) in editForm.helper_diagnosis.ihc" :key="index" :value="item">
                <td>{{item.mark}}</td>
                <td>{{item.value}}</td>
              </th> 
            </div>
            
            
          </div>
        </div>
        <div class="footer">
          <div class="btn">
            <el-button plain @click="zhezhao = !zhezhao">返回</el-button>
            <el-button plain @click="addFormList(editForm)">提交并进入下一个</el-button>
          </div>
        </div>
      </div>
    </div>

    <!--点击下一个 -->
    <div class="nextone" v-if="xiayige">
      <div class="warn">
        <div class="title">
          <span>编辑</span>
          <span @click="xiayige = false">
            <i class="iconfont iconfork"></i>
          </span>
        </div>

        <div class="main">
          <span>
            <i class="iconfont iconjinggaocopy" @click="xiayige = false"></i>
          </span>
          <span>是否保存本条病例？</span>

          <div class="button">
            <el-button size="mini" style="width:60px" @click="shi()">是</el-button>
            <el-button size="mini" style="width:60px" @click="fou()">否</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import uuid from "uuid";
import allMessage from "../../staic/allMessage.json";
import qs from "qs"; //ulencode
import axios from "axios";
export default {

  created() {
    this.getDataList();
    this.get2()
    this.get1()
    // this.get3()
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
    get1(){
      this.options.map((item, index) => {
        this.onechoose.push(item.value);              
      });
      // console.log(this.onechoose)
    },
    // get3(){
    //   this.options.map((item, index) => {
    //     // console.log(item.children);
    //     item.children.map((it, index) => {
    //       if(it[2] == 'children'){
    //         it.children.map( (i,index) =>{
    //           this.threechoose.push(it.children)
    //         })
    //       }        
    //     });      
    //   });
    //   console.log(this.threechoose)
    // },
    
    // 获取选择分组
    groupLists() {
      // alert(1)
      const { data: res } = this.axios.get("group/list.php").then(res => {
        console.log(res);
        this.groupList = res.data.data;
        console.log(this.groupList);
      });
    },
    // 点击查看
    async chakan(row) {
      this.sousuo = true;
      console.log(row.id);
      console.log(row);
      this.row = row;
      const { data: res } = await this.axios.get("excel_data/list.php", {
        params: { id: row.id }
      });
      console.log(res);
      // this.id = row.id;
      this.tablelist = res.data;
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      this.queryInfo.pagerows = res.pagerows; //每页显示多少条
    },
    // 点击添加分组保存
    async addGroup(item, id) {
      console.log(item)
      // console.log(window.sessionStorage.uid)
      var group_name = ""; 
      const res = await this.axios
        .post("group/add.php", {
          params: {
            group_name: item,
            id: this.id,
            userid: window.sessionStorage.uid,
            username: window.sessionStorage.username,           
          }
        })
        .then(res => {
          // console.log(res)
          this.groupList.push(res.data.data.params);
          console.log(this.groupList);
          var result = res.data; //JSON.parse(res.body);
          if (result.result == 1) {
            this.$alert("添加成功", "提交结果", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                // this.search = !this.search
                this.groupList = [];
                this.groupLists();
                this.groupName = "";
              }
            });
          } else {
            this.$alert("添加失败", "提交结果", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
          }
        });
      // console.log(data)
      
    },
    // 点击确定
    async sure(id) {
      // it.group_name = this.location
      // console.log(it)
      const { data: res } = await this.axios.post("dataset/edit.php", {
        params: {
          id: this.id,
          file_name: this.data.file_name,
          location: this.it.group_name
        }
      });
      console.log(this.data);
      // console.log(this.data.location);
      console.log(res);
      console.log(this.id);
      this.group = !this.group;
      this.getDataList();
    },
    // 点击数据集编辑
    async bianji(row) {
      this.group = !this.group;
      this.id = row.id;
      const { data: res } = await this.axios.get(
        "dataset/one.php?id=" + row.id
      );
      console.log(res);
      this.data = res;
      this.groupLists();
    },
    // 点击分组名
    location_name(it){
      this.it = it
      console.log(it)
    },
    //点击数据集解析  将数据插入到列表中
    async jiexi(row) {
      console.log(row)
      const loading = this.$loading({
        lock: true,
        text: "正在解析中，请耐心等待呦",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      // this.loading = true
      // 插入数据  excel_data/readjson.php
      await this.axios
        .get("excel_data/readjson.php", { params: { id: row.id } })
        .then(res => {
          // console.log(res)
          // console.log(res.data)
          // console.log(row.index)
          var result = res.data; //JSON.parse(res.body);
          if (result.result == 1) {
            this.$alert("解析成功", "提交结果", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                row.status = 0
                this.sousuo = true;
                console.log(row)
                this.axios.get("dataset/list.php?id=", +row.id);
                loading.close();
              }
            });
          } else {
            this.$alert('解析失败，请检查文件格式和列名', "提交结果", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {
                loading.close();
              }
            });
          }
        });
      console.log(row.id);
      this.id = row.id;
      console.log(this.id);
      this.getTableList2(row);
    },
    // 点击数据集删除
    async dele(row) {
      console.log(row.id);
      this.$confirm("确定删除该数据？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
      .then(() => {
        const { data: res } = this.axios .get("dataset/del.php", { params: { id: row.id } });
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.datalist = [];
          this.getDataList();
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
      // const res = await this.axios
      //   .get("dataset/del.php", { params: { id: row.id } })
      //   .then(res => {
      //     this.$alert("删除成功！");
      //     this.datalist = [];
      //     this.getDataList();
      //   });

      // console.log(res)
    },
    // 点击病理号录入
    async look(row) {
      this.wenjian = false;
      this.luru = !this.luru;
      this.id = row.id;
      this.ji = false;
      this.sousuo = false;
      const { data: res } = await this.axios.get(
        "excel_data/onedata.php" ,{params:{id:row.id}}
      );      
      console.log(row.id)
      console.log(res)       
      this.editForm = res.data;
      if( this.editForm.application_date === '0000-00-00'){
        this.editForm.application_date = ''
      } 
      if( this.editForm.report_date === '0000-00-00'){
        this.editForm.report_date = ''
      } 
      if( this.editForm.birthday === '0000-00-00'){
        this.editForm.birthday = ''
      }
      this.jilian = []
      this.helper_diagnosis = this.editForm.helper_diagnosis
      // console.log(this.helper_diagnosis);    
      // if(this.editForm.diagnosis1_normal !=  ''){
      //   this.jilian.push(this.editForm.diagnosis1_normal)
      // }
      // if(this.editForm.diagnosis2_normal != ''){
      //   this.jilian.push(this.editForm.diagnosis2_normal)
      // }
      // if(this.editForm.diagnosis3_normal != ''){
      //   this.jilian.push(this.editForm.diagnosis3_normal)
      // }    
      // this.jilian.push(this.editForm.diagnosis1,this.editForm.diagnosis2)
      this.editForm.jilian = this.jilian     
      console.log(this.jilian)
      console.log(this.editForm);
      return
    },
    // 获取数据集列表
    async getDataList() {
      // console.log(1)
      let type = "";
      const { data: res } = await this.axios.get("dataset/list.php", {
        params: { type: 1, page: this.shuInfo.page }
      });
      console.log(res);
      this.datalist = res.data;
      this.shuInfo.page = parseInt(res.page);
      this.shuInfo.count = parseInt(res.count); //总条数
      this.shuInfo.pagerows = res.pagerows; //每页显示多少条
      // this.datalist.map( (item,index) => {
      // 拼接已录入和未录入
      // this.L_W = item.exec_line + ':' + item.total_line
      //  console.log(this.L_W)
      // this.total_line = item.total_line
      // this.exec_line = item.exec_line
      // console.log(item.total_line)
      // })
      console.log(this.datalist);
    },
    // 获取病理号
    async getTableList2(row) {
      // alert(1)
      // this.search =! this.search
      // alert("gt2"+this.sousuo);
      // console.log(row.id)
      // console.log(this.queryInfo.page)     
      const { data: res } = await this.axios.get("excel_data/list.php", {
        params: { id: row.id, page: this.queryInfo.page }
      });
      //console.log(row.id)
      this.tablelist = res.data;
      console.log(res.data);
      // console.log("getTableList",res);
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      this.queryInfo.pagerows = res.pagerows; //每页显示多少条
      this.id = row.id;
      this.row = row  //缓存的row     
      
      // console.log(this.queryInfo.page);console.log(this.queryInfo.count);console.log(this.queryInfo.pagerows);
    },
    // 点击切换页码
    async getTableList() {
      // console.log(row.id)
      // console.log(this.queryInfo.page)
      const { data: res } = await this.axios.get(
        "excel_data/list.php",
        { params: { page: this.queryInfo.page,id:this.row.id} }
      );
      //console.log(row.id)
      this.tablelist = res.data;
      // console.log("addGroup",res)
      // console.log("getTableList",res);
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      this.queryInfo.pagerows = res.pagerows; //每页显示多少条
      
      // console.log(this.queryInfo.page);console.log(this.queryInfo.count);console.log(this.queryInfo.pagerows);
    },
    // 搜索
    async getTable() {
      console.log(this.id);
      const { data: res } = await this.axios.get("excel_data/list.php", {
        params: { id: this.row.id, name: this.name, test_id: this.test_id }
      });
      // console.log(this.test_id)
      // console.log(this.id)
      // console.log(this.name)
      this.tablelist = res.data;
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      // console.log(res.data)
      // console.log("getTableList",res);
      // this.queryInfo.page = res.page
      // this.count = res.count  //总条数
      // this.queryInfo.pagerows = res.pagerows  //每页显示多少条
      // console.log(this.queryInfo.page);console.log(this.queryInfo.count);console.log(this.queryInfo.pagerows);
    },
    // 获取选中数据
    checkTable(rows){
			console.log("rows",rows);	     
      rows.map( (item,index) =>{
        console.log(item.id)               
        this.idss.push(item.id)       
      })
      this.idss = [...new Set(this.idss)];       
      console.log(this.idss)      
		},
    // 批量通过
    async passList(idss){
      console.log(this.idss)
      let ids = ''
      this.$confirm("确定批量通过这（个）些数据？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
      .then(() => {
        const res =  this.axios.get('excel_data/checkall.php',{params:{ids:this.idss}}).then( res=>{
          console.log(res)     
        })
        this.$message({
          type: "success",
          message: "通过成功!"
        });
        this.getTableList2(this.row)
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
      
    },
    // 点击下一个
    next(id) {
      this.id = this.id;
      this.xiayige = true;
      console.log(this.id);
    },
    // 是
    shi(){
      this.addFormList();
      this.xiayige = false;
    },
    // 否
    async fou(id) {
      const { data: res } = await this.axios.get(
        "excel_data/nextonedata.php?id=" + this.id
      );
      if (res.ok == 0) {
        // return this.$message.error("已经是最后一个了");
        this.$alert("已经是最后一个了", "提交结果", {
          confirmButtonText: "确定",
          type: "success",
         
        });
        // return      
      }
      // console.log("getTableList",res);
      this.editForm = res.data;
      // 将ID赋值下一个ID
      this.id = res.id;
      this.xiayige = false;
      // this.editForm = Object.assign(res.data[0],res.data[1],res.data[2])
    },
    // 显示
    xianshi() {
      this.wenjian = true;
      this.luru = false;
      this.ji = true;
      this.sousuo = true;
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
    // 表单提交
    submit() {
      this.zhezhao = true;
      this.report.help_diagnosis = this.help_diagnosis;
      // this.jilian = this.editForm.jilian;
      console.log(this.editForm);
    },
    // // 免疫租化增删
    // ihcAddData( ihcItem,value) {
    //   //判断当前数组的对象是否有数据
    //   console.log(ihcItem);
    //     if (value.mark || value.value){
    //       //验证通过 添加新的一条
    //       var value = {
    //         mark: "",
    //         value: ""
    //       };
    //      ihcItem.push(value);
    //     } else {
    //       alert("请检查输入是否正确");
    //     }
      
    // },
    // // 免疫组化删除
    // ihcDeleteData(ihcItem) {
    //   if (ihcItem.length > 1) {
    //     ihcItem.splice(ihcItem.length - 1, 1);
    //   } else {
    //     alert("最少保留一个");
    //   }
    // },
    // 免疫租化增删
    ihcAddData( ihcItem,value) {
      //判断当前数组的对象是否有数据
      console.log(ihcItem);
        if (value.mark || value.value){
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
    ihcDeleteData(ihcItem,idx) {
      if (ihcItem.length > 1) {
        ihcItem.splice(idx, 1);
      } else {
        alert("最少保留一个");
      }
    },
    // 病理号切换每页显示多少条
    handleSizeChange(newSize) {
      this.queryInfo.pagerows = newSize;
      this.getTableList();
    },
    // 病理号点击页数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getTableList();
    },
    // 数据集切换每页显示多少条
    handleSizeChange1(newSize) {
      this.shuInfo.pagerows = newSize;
      this.getDataList();
    },
    // 数据集点击页数
    handleCurrentChange1(newPage) {
      this.shuInfo.page = newPage;
      this.getDataList();
    },
    // 病理号删除
    del(row) {
      this.$confirm("确定删除该数据？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
      .then(() => {
        const { data: res } = this.axios.get("excel_data/del.php", {
          params: { id: row.id }
        });
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getTableList2(this.row)
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    // 新增患者信息
    addFormList(editForm) {
      this.zhezhao = false;
      // this.id = this.id;
      console.log(this.id)
      // this.editForm = this.editForm;
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
        this.axios.post("report/add.php", data).then(res => {
          // console.log('res:',res);
          var result = res.data; //JSON.parse(res.body);
          if (result.result == "done") {
            this.$alert("提交成功", "提交结果", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.tablelist = [];
                this.getTableList2(this.row);
                this.fou()
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
        // console.log("error submit!!");
        return false;
      }
      // this.fou();
      return
    },
    //上传文件方法
    uploadFile() {
      this.uploadLoading = false;
      var that = this;
      this.fileList = [];
      this.uploadTemplateDialog = true;
      setTimeout(function() {
        that.$refs.upload.clearFiles();
      }, 100);
    },
    handleExceed(files, fileList) {
      this.$message.warning("只能选择1个文件!");
    },
    submitUpload() {
      this.uploadLoading = true;
      var that = this;
      if (that.$refs.upload.$children[0].fileList.length == 1) {
        that.$refs.upload.submit();
        that.$alert("上传成功").then( () =>{
          that.datalist = [];
          that.getDataList();    
        })
             
      } else {
        that.uploadLoading = false;
        that.$message({
          type: "error",
          showClose: true,
          duration: 3000,
          message: "请选择文件!"
        });
      }
    
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      var that = this;
      //文件类型
      var fileName = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (fileName != "csv") {
        that.uploadTemplateDialog = false;
        that.$message({
          type: "error",
          showClose: true,
          duration: 3000,
          message: "文件类型不是.csv文件!"
        });
        return false;
      }
      //读取文件大小
      var fileSize = file.size;
      console.log(fileSize);
      if (fileSize > 1048576) {
        that.uploadTemplateDialog = false;
        that.$message({
          type: "error",
          showClose: true,
          duration: 3000,
          message: "文件大于1M!"
        });
        return false;
      }
      that.downloadLoading = that.$loading({
        lock: true,
        text: "数据导入中...",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)"
      });
      let fd = new FormData();
      fd.append("pic", file);
      fd.append("_t1", new Date());
      axios({
        method: "post",
        url: "upload_file/add.php",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
        }
      })
        .then(rsp => {
          that.downloadLoading.close();
          that.uploadLoading = false;
          let resp = rsp.data;
          // console.log(this.resp)
          if (resp.resultCode == 200) {
            that.uploadTemplateDialog = false;
            that.$message.success(resp.resultMsg);
            console.log(resp.resultMsg);
          } else {
            that.uploadTemplateDialog = false;
            that.$message({
              type: "error",
              showClose: true,
              duration: 60,
              message: resp.resultMsg
            });
          }
        })
        .catch(error => {
          that.downloadLoading.close();
          that.uploadLoading = false;
          that.uploadTemplateDialog = false;
          that.$message({
            type: "error",
            showClose: true,
            duration: 60,
            message: "请求失败! error:" + error
          });
        });
      return false;
    }
  },
  data() {
    return {
      onechoose:[],
      twochoose:[],
      threechoose:[],
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
      idss: [], //ID 们
      it:'',   //分组名     
      location:'',   //研究项目
      xiayige: false,
      wenjian: true, //上传文件
      item: "",
      // 拼接录入和未录入
      exec_line: "",
      total_line: "",
      L_W: "",
      groupName: "",
      sousuo: false,
      ji: true,
      jilian:'',
      value: {
        mark: "",
        value: ""
      },     
      diagnosis1_normal:'',
      diagnosis2_normal:'',
      diagnosis3_normal:'',
      groupList: [], //分组列表
      // 数据集列表
      data: [],
      // 列表参数
      id: "",
      page: "",
      orderby: "",
      order: "",
      // 搜索参数
      test_id: "",
      name: "",
      // 病理号分页器
      queryInfo: {
        page: 1, //页数
        pagerows: 10, //每页显示的条数
        count: 0 //数据总数
      },
      // 数据集分页器
      shuInfo: {
        page: 1, //页数
        pagerows: 5, //每页显示的条数
        count: 0 //数据总数
      },
      // 上传
      uploadTemplateDialog: false,
      fileList: [],
      uploadLoading: false,
      acceptFileType: ".csv",
      downLoadLoading: "",
      tablelist: [], //病理号数组
      row: {}, //缓存的row
      datalist: [], //数据集数组
      id: "",
      formdata: {},
      group: true,
      // search: false,
      luru: false,
      zhezhao: false,
      count: 0,
      // 查询到的用户信息对象
      editForm: {},
      info: false,
      seen: true,
      seen1: true,
      seen2: true,
      seen3: true,
      seen4: true,
      seen5: true,
      checkList: [
        "免疫组化",
        "分子检测",    
      ],
      // 折叠面板默认打开
      activeNames: ["3", "1"],
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
        application_date: "", //申请日期
        report_date: "", //报告日期
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
        helper_diagnosis: [] //辅助诊断
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
      // helper_diagnosis: [], //辅助诊断
      helper_diagnosis:{},
      helper_diagnosisAll: {}, //辅助诊断信息对象
      ihc: [] ,//免疫组化信息对象
      fish: [], //荧光杂交信息对象
      rearrangement: [], //基因重排
      ish: [], //原位杂交
      fcm: [], //流式细胞检测
      ngs: [], //ngs检测
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


<style>
.el-button + .el-button {
  margin-left: 0;
}
#dataImport .el-collapse-item__header {
  background-color: #fafafc !important;
  height: 35px;
  border-radius: 5px 5px 0px 0px;
}

#dataImport .el-collapse-item {
  border: 1px solid #efeef1;
  border-radius: 5px;
}
#dataImport .form .formList .ihc .el-button {
  background: #b8c3d5;
  border-radius: 4px;
  color: white;
}
#dataImport .form .formList .ihc .el-button :hover {
  background: #1ca5ff;
}
#dataImport .icontubiaozhizuo-:before {
  color: #1ca5ff;
}
.handleBtnBox {
  position: absolute;
  display: flex;
  align-items: center;
  left: 440px;
}
.iconxiayige1:before {
  margin-right: 3px;
}
</style>
<style scoped lang="stylus" rel="stylesheet/stylus" >
.jiexi {
  background-color: #409EFF;
  &:hover {
    background: #26BC99;
  }
}

a {
  text-decoration: none;
  color: #29B8FC;

  :hover {
    color: #26BC9A;
  }
}

.storage {
  width: 100%;
  height: 58px;

  .storageR {
    height: 58px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
    border-radius: 4px;

    .eContainer {
      display: flex;
      height: 60px;
      line-height: 60px;
      margin-left: 32px;

      span {
        color: #3333 3;
        font-size: 14px;
        margin-right: 5px;
      }

      .el-button {
        background-color: rgba(41, 184, 252, 1);
        border: none;

        &:hover {
          background-color: rgba(38, 188, 153, 1);
        }
      }

      .xiazai {
        background-color: rgba(41, 184, 252, 1);
        color: white;
        font-size: 14px;
        float: right;
        width: 128px;
        background: rgba(41, 184, 252, 1);
        border-radius: 4px;
        margin: 15px 20px;
      }
    }
  }
}

.storageList {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
  border-radius: 4px;

  .list {
    padding-top: 15px;
    margin-left: 30px;
    margin-top: 20px;

    .el-table {
      border-top: 1px solid rgba(0, 160, 233, 1);
    }

    span {
      margin-left: 10px;
    }
  }
}

.iconfont {
  color: white;
  font-size: 16px;
}

.s {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
  border-radius: 4px;
  margin-top: 20px;

  .search {
    margin: 20px 30px 0;
    padding-top: 20px;
    padding-bottom: 60px;

    .up {
      background-color: #E6E6E6;
      height: 50px;

      span {
        line-height: 50px;
        padding-left: 10px;
      }

      .el-input {
        margin: 0 5px;
      }

      .el-button {
        background: rgba(41, 184, 252, 1);
        border-radius: 4px;
      }

      .pass {
        float: right;
        margin: 10px;
      }
    }

    .down {
      span {
        margin-left: 10px;
      }
    }

    .el-pagination {
      float: right;
      margin: 10px 10px 0 0;
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
  background-color: rgba(200,200,200,0.7);
  z-index: 9;

  .nei {
    border-radius: 5px;
    width: 550px;
    height: 520px;
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
        margin-left: 20px;
        margin-top: 5px;

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
        height: 280px;
        border: 1px solid #DCDFE6;
        margin: 20px 20px;
        display: flex;
        flex-flow: column;
        overflow: scroll;

        .el-button {
          font-size: 16px;
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
.container {
  width: 100%;
  overflow-x: hidden;
  margin-top: 20px;

  .el-input {
    width: 200px;
  }

  .form {
    height: 1900px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
    border-radius: 4px;
    position: relative;

    // 按钮
    .header {
      border-bottom: 1px solid rgba(232, 232, 232, 1);
      height: 55px;

      .el-button {
        margin-left: 28px;
        margin-top: 12px;
      }

      .next {
        background-color: rgba(41, 184, 252, 1);
      }

      .iconfont {
        color: white;
      }
    }

    // 表单
    .formList {
      // 折叠面板
      // 患者信息
      .HZ {
        margin: 20px;
        background-color: rgba(250, 250, 250, 1);
        border-radius: 5px;

        .HZdown {
          display: flex;
          justify-content: space-evently;
          flex-wrap: wrap;
          width: 1600px;
          margin: 10px auto;

          .sickItem {
            width: 260px;
            display: inline-block;
            height: 50px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-right: 50px;
            margin-left: 60px;

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
              width: 1500px;
              height: 200px;
              margin-top: 28px;

              // 报告质量下的块
              .p-one {
                border: 1px solid rgba(224, 224, 224, 1);
                width: 600px;
                margin-left: 50px;
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
                width: 500px;
                margin-left: 40px;
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
                width: 500px;
                margin-left: 40px;
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
              margin: 10px 80px;
              background-color: #EFEEF1;
              height: 40px;
              line-height: 40px;
            }

            #one {
              width: 420px;
              background: rgba(249, 249, 249, 1);
              border: 1px solid rgba(229, 229, 229, 1);
              border-radius: 4px;
              margin: 0 80px;
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
              align-items: center;
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

      .el-button {
        background: rgba(117, 209, 253, 1);
        border-radius: 4px;
        border: none;
      }

      .textCon {
        margin-left: -40px;
        position: fixed;
        bottom: 0px;
        z-index: 9;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 10px 0px rgba(179, 179, 179, 0.75);
        border-radius: 4px;

        .text {
          font-size: 18px;
          width: 1600px;
          margin: 6px 30px 0;

          span {
            height: 30px;
            display: block;
            margin-bottom: 8px;
          }

          .content {
            font-size: 14px;
            height: 60px;
          }
        }
      }
    }
  }
}

.zhezhao {
  background-color: rgba(200, 200, 200, 0.7);
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
          height: 100%;
          display: inline-block;
          margin: 20px 10px 20px;
        }
      }
      .ZD {
        display flex
        flex-flow row
        flex-wrap wrap
        position: relative;
        border-top: 1px solid rgba(185, 222, 255, 1);
        margin: 20px 30px;
        th {
          display: inline-block;
          line-height: 11px;
          margin-left 30px
          margin-top: 10px;
        }
        div {
          display: inline-block;   
          width 600px     
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
          margin-left 10px
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

.nextone {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.7);
  z-index: 9;

  .warn {
    border-radius: 5px;
    width: 334px;
    height: 180px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
    background-color: #FAFAFA;
    z-index: 10;

    .title {
      width: 334px;
      height: 40px;
      background: rgba(28, 177, 255, 1);
      border-radius: 6px 6px 0px 0px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;

      span {
        margin-left: 10px;
        margin-right: 10px;
        color: #FFFFFF;
      }
    }

    .main {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: space-around;
      height: 120px;

      .iconjinggaocopy {
        color: red;
        font-size: 20px;
      }

      .button {
        .el-button {
          margin-left: 10px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
