<template>
  <div class="mainContainer" ref="form">
    <!--数据存储 -->
    <div class="storage">
      <div class="storageL">
        <!--  <div class="sContainer">
          <span>数据存储 :</span>
          <el-input placeholder="请选择数据存储分组..." size="small" style="width:250px"></el-input>
          <el-button type="primary" size="small" >选择分组</el-button>
        </div>-->
      </div>
      <div class="storageR" >
        <div class="eContainer">
          <div id="myUpload">
            <el-input placeholder="请选择文件上传" size="mini" style="width:250px"></el-input>   
            <el-button type="primary" size="mini" @click="uploadFile">导入</el-button>
            <!--上传-->
            <el-dialog title="上传" width="40%" :visible.sync="uploadTemplateDialog">
                <el-row>
                    <el-col :span="22">
                        <el-upload class="upload-demo"
                                ref="upload"
                                action="http://106.13.49.232/cedar/api/upload_file/add.php"
                                :accept="acceptFileType"
                                :limit="1"
                                :on-exceed="handleExceed"
                                :before-upload="beforeUpload"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取csv格式文件</el-button>
                            <div slot="tip" class="el-upload_tip">只能上传.csv文件,且不超过1M</div>
                        </el-upload>

                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="submitUpload" type="primary" size="mini" :loading="uploadLoading" > 确定上传</el-button>
                    <el-button @click="uploadTemplateDialog=false" size="mini">取消</el-button>
                </span>
            </el-dialog>
        </div>
                     
        </div>
      </div>
    </div>

    <!--数据集列表 @click="jiexi"   <el-button class="xiazai" size="small">
          <span class="iconfont iconxiazai">下载excel模板</span>
        </el-button>  -->
    <div class="storageList">
      <div class="list" style="width:96%">
        <el-table :data="datalist" highlight-current-row style="width: 100%" border stripe  max-height="350">
          <el-table-column  prop="file_name" label="数据集名称" width="300" > </el-table-column>
          <el-table-column prop="upload_time" label="上传时间" width="300"></el-table-column>
          <el-table-column prop="percent" label="已录入：未录入" width="300"></el-table-column>
          <el-table-column prop="location" label="存储位置" width="300"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="bianji(scope.row)">编辑</el-button>
              <el-button type="text" size="small"  @click="chakan(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="dele(scope.row)">删除</el-button>
              <el-button class="jiexi" size="small" >
                <span class="iconfont iconxiazai" @click="jiexi(scope.row)">开始解析</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--搜索 -->
    <div class="s" v-if="!luru">
    
      <div class="search" v-if="search">
      
        <div class="up">
          <span>精准搜索 :</span>
          <el-input
            size="mini"
            placeholder="请输入病理号"
            prefix-icon="el-icon-search"
            style="width:180px"
            v-model="test_id"
          ></el-input>
          <el-input
            size="mini"
            placeholder="请输入姓名"
            prefix-icon="el-icon-search"
            style="width:180px"
            v-model="name"
          ></el-input>
          
          <el-button type="primary" size="mini" @click="getTable">确定</el-button>
          <el-button type="primary" size="mini" class="pass">
            <i class="iconfont iconpiliangtongguo"></i> 批量通过
          </el-button>
        </div>
        <div class="down">
          <el-table          
            :data="tablelist"
            tooltip-effect="dark"
            style="width: 100%"           
            border           
            stripe>
            <el-table-column type="selection" width="40"></el-table-column>            
            <el-table-column prop="test_id" label="病理号" width="170"  sortable></el-table-column>
            <el-table-column prop="name" label="姓名" width="170"  sortable></el-table-column>
            <el-table-column prop="diagnosis2" label="病理类型" width="200" sortable></el-table-column>
            <el-table-column prop="sex" label="性别" width="150" sortable></el-table-column>
            <el-table-column prop="age" label="年龄" width="150" sortable></el-table-column>
            <el-table-column prop="report_time" label="报告时间" show-overflow-tooltip width="170" sortable></el-table-column>
            <el-table-column prop="entry_status" label="录入状态" show-overflow-tooltip width="170" sortable></el-table-column>
            <el-table-column prop="complete_degree" label="完整度" show-overflow-tooltip width="170" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="170">             
                <template  slot-scope="scope">                 
                  <el-button type="text" size="small" @click="look(scope.row)">录入</el-button>                  
                  <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>            
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
        <div class="formList"  :v-model="editForm">
          <!-- 折叠面板-->

          <!-- 患者信息-->
          <el-collapse v-model="activeNames"  class="HZ">
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
                    placeholder="请输入住院号/门诊号"
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
                  ></el-input>                 
                </div>
                <!--性別 -->
                <div class="sickItem">
                  <span>{{showInfo.sex.field_title}}:</span>
                  <el-select placeholder="请选择" name="sex" v-model="editForm.sex" size="mini">
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
                  ></el-input>
                </div>
                <!--民族-->
                <div class="sickItem">
                  <span>{{showInfo.nation.field_title}}:</span>
                  <el-select placeholder="请选择" name="nation" v-model="editForm.nation" size="mini">
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
          <el-collapse v-model="activeNames"  class="origin">
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
                    ></el-input>
                  </div>
                  <div class="sickItem">
                    <span>{{fMInstitution.test_id.field_title}}:</span>
                    <el-input type="text" v-model="editForm.test_id" placeholder="请输入病理号" size="mini"></el-input>
                  </div>
                  <div class="sickItem">
                    <span>{{fMInstitution.application_date.field_title}}:</span>
                    <el-date-picker
                      name="application_date"
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
                    <span>{{fMInstitution.diagnosis.field_title}} :</span>
                    <el-select placeholder="请选择" name="diagnosis" v-model="editForm.diagnosis" size="mini">
                      <el-option
                        v-for="(item,index) in fMInstitution.diagnosis.field_values"
                        :key="index"
                        :value="item"
                      >
                        <span>{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>
                  <div class="sickItem">
                    <span>{{fMInstitution.type.field_title}} ：</span>
                    <el-select placeholder="请选择" name="type" v-model="editForm.type" size="mini">
                      <el-option
                        :value="fMInstitution.type.field_values"
                      >{{fMInstitution.type.field_values == ""? "无数据" : fMInstitution.type.field_values}}</el-option>
                    </el-select>
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
                        <el-select name="problem_slice" v-model="editForm.problem_slice" size="mini">
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
                        <el-select name="helper_report" v-model="editForm.helper_report" size="mini">
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
                    <el-input type="text" v-model="editForm.test_id" placeholder="请输入病理号" size="mini"></el-input>
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

                  

                  <div class="sickItem">
                    <span>{{tMInstitution.sample_morphology.field_title}}:</span>
                    <el-input
                      type="text"
                      v-model="editForm.sample_morphology"
                      placeholder="请输入形态学描述"
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
                  <div class="sickItem">
                    <span>病理类型:</span>
                    <el-select name="diagnosis"  placeholder="请选择病理类型" size="mini">
                      <el-option>
                      </el-option>
                    </el-select>
                  </div>

                  <div class="sickItem">
                    <span>详细类型:</span>
                    <el-select name="diagnosis"  placeholder="请选择详细类型" size="mini">
                      <el-option>
                      </el-option>
                    </el-select>
                  </div>

                  <div class="sickItem">
                    <span>病理亚型:</span>
                    <el-select name="diagnosis" v-model="editForm.diagnosis2"  placeholder="请选择病理亚型" size="mini">
                      <el-option>
                      </el-option>
                    </el-select>
                  </div>

                  <div class="sickItem">
                    <span>级别:</span>
                    <el-select name="diagnosis"  placeholder="请选择级别" size="mini">
                      <el-option>
                      </el-option>
                    </el-select>
                  </div>

                </div>

                <!--辅助诊断 -->
                <div class="sickIH">
                  <div class="title">
                    <span>
                      <!-- <i class="iconfont icontubiaozhizuo-"></i> -->
                      {{helper_diagnosis.name}}:
                    </span>
                    <el-checkbox-group
                      v-model="checkList"
                      @change="func1"
                      style="display: initial;"
                    >
                      <el-checkbox  style="margin-left=10px" label="免疫组化"></el-checkbox>
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
                  <div v-show="seen" >
                    <span class="titl">
                      <i class="iconfont icontubiaozhizuo-"></i>
                      {{ihc.name}}
                    </span>
                    <div id="one"  v-for="(ihc,idx) in editForm.helper_diagnosis.ihc" :key="idx">
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
                        <el-button @click="ihcAddData(help_diagnosis.ihc,help_diagnosis.ihc[idx])">
                          <i class="iconfont iconaddTodo-nav"></i>
                        </el-button>
                        <el-button @click="ihcDeleteData(help_diagnosis.ihc)">
                          <i class="iconfont iconjianhao1"></i>
                        </el-button>
                      </div>
                    </div>
                  </div>

                  <div v-show="seen1" v-for="(item,idx) in editForm.helper_diagnosis.fish"
                              :key="idx">
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
            <el-button type="primary" @click="submit()" class="commit" style="width:100%">提交</el-button>
            <div class="textCon">
              <div class="text">
                <span>原始文本</span>
                <div class="content" >
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
          <span  @click="group =! group">
            <i class="iconfont iconx"></i>
          </span>
        </div>
        <div class="mian">
          <div class="ming">
            <span>数据集名称：</span>
            <el-input style="width:400px" size="small" v-model="data.file_name"></el-input>
          </div>
          <div class="cun">
            <span>存储位置：</span>
            <el-input style="width:400px" size="small" v-model="item"></el-input>
          </div>
          <div class="sousuo">
            <el-input placeholder="请输入分组关键词..." style="width:500px">
              <el-button slot="append">搜索</el-button>
            </el-input>
          </div>
          <div class="groupList">
            <el-button style="width:300px" @click="addGroup(item)" v-model="data.location" v-for="(item, index) in groupLists" :key="index" :value="item" >{{item}}</el-button>
          </div>
          <div class="name">
            <span>新建分组名称 ：</span>
            <el-input placeholder="请输入分组名称..." style="width:380px">
              <el-button slot="append" >保存</el-button>
            </el-input>
          </div>
          <div class="button">
            <el-button plain size="small"  @click="group =! group">取消</el-button>
            <el-button plain size="small" @click="sure(id)">确定</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="zhezhao" v-if="zhezhao" :model="editForm">
      <div class="look">
        <div class="header">
            <span>查看病理信息</span>
            <span @click="zhezhao = !zhezhao"><i class="iconfont iconx"></i></span>
        </div>

        <div class="content">
            <div class="HZ">
                <button>患者及报告信息</button>
                <div><span>病人ID(住院号/门诊号) ：</span>{{editForm.patient_id}}</div>    
                <div><span>姓名：</span>{{editForm.name}}</div>           
                <div><span>性别：</span>{{editForm.sex}}</div>           
                <div><span>出生日期：</span>{{editForm.birthday}}</div>           
                <div><span>联系电话：</span>{{editForm.phone}}</div>           
                <div><span>民族：</span>{{editForm.nation}}</div>           
                <div><span>籍贯：</span>{{editForm.birthplace}}</div>           
                <div><span>居住地：</span>{{editForm.address_prov}}</div>           
                <div><span>病理号：</span>{{editForm.test_id}}</div>           
                <div><span>送检科室：</span>{{editForm.department}}</div>           
                <div><span>申请日期：</span>{{editForm.application_date}}</div>  
                <div><span>报告日期：</span>{{editForm.report_date}}</div>        
                <div><span>就诊类型：</span>{{editForm.diagnosis_type}}</div>                        
            </div>
            <div class="BDW">
                <button>本单位原文</button>
                <span>{{editForm.diagnosis_txt}}</span>                
            </div>
            <div class="ZD">
                <button>本单位诊断信息</button>
                <div>诊断结论<span> 病理类型：</span>{{editForm.diagnosis}}</div>
                <div><span>淋巴细胞来源：</span>{{editForm.type}}</div>
                <div style="float:left">辅助诊断<span> 免疫组化：</span>
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
  </div>
</template>

<script type="text/ecmascript-6">
import uuid from "uuid";
import allMessage from "../../staic/allMessage.json";
import qs from "qs";//ulencode
import axios from 'axios'

export default { 
  created() {
    this.getDataList();
    this.getTableList(); 
    // console.log(window.sessionStorage.uid) 
  },
  methods: {
    // 点击查看
    async chakan(row){
      this.search = !this.search
      const {data :res} = await  this.axios.get("excel_data/list.php",{params:{id:row.id}})      
      console.log(res)
      this.tablelist = res.data
    },
    // 点击添加分组
    async addGroup(item,id){
      console.log(item,this.id)
      console.log(window.sessionStorage.uid)
      var group_name = ''    
      const {data} = await this.axios.post('group/add.php',{params:{group_name:item,id:this.id,userid:window.sessionStorage.uid}}).then( res =>{
         var result = res.data;//JSON.parse(res.body);
        if(result.result == 1){
            this.$alert("添加成功", '提交结果', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.search = !this.search
                this.axios.get("dataset/list.php?id=", + row.id)
              },
            });
            
        }else{
            this.$alert("添加失败", '提交结果', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
              },
            });
          }
      })
      console.log(data)
    },
    // 点击确定
    async sure(id){    
      const { data : res } = await this.axios.post(
        "dataset/edit.php",{params:{id:this.id,file_name:this.data.file_name,location:this.data.location}}
      );    
      console.log(this.data.file_name)
      console.log(res)
      console.log(this.id)
      this.group = !this.group
    },
    // 点击数据集编辑
    async bianji(row){
      this.group = !this.group
      this.id = row.id    
      const { data : res } = await this.axios.get(
        "dataset/one.php?id=" + row.id
      );
      console.log(res)
      this.data = res
    },
    //点击数据集解析  将数据插入到列表中
    async jiexi(row){
      // 插入数据  excel_data/readjson.php
      await this.axios.get("excel_data/readjson.php", {params:{id :row.id}}).then(res => {
        console.log(res)
        console.log(res.data)
         var result = res.data;//JSON.parse(res.body);
        if(result.result == 1){
            this.$alert("解析成功", '提交结果', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.search = !this.search
                this.axios.get("dataset/list.php?id=", + row.id)
              },
            });
            
        }else{
            this.$alert("解析失败", '提交结果', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
              },
            });
          }
      })
      console.log(row.id)
      this.id = row.id 
      console.log(this.id)
      this.getTableList(row);        
    },
    // 点击数据集删除
    async dele(row){
      console.log(row.id)
      const { data :res} = await this.axios.get(
        "dataset/del.php" ,{params:{id:row.id}}
      );
      // console.log(res)
    },
    // 点击病理号查看
    async look(row){         
        this.luru = !this.luru
        this.id = row.id      
        const { data :res} = await this.axios.get(
            "excel_data/onedata.php?id=" + row.id
        );
        this.editForm = res.data;
        console.log(this.editForm)
        // // 处理数据
        //  this.editForm.diagnosis_txt = this.editForm.diagnosis_txt.split("。")
        // console.log(this.editForm.diagnosis_txt)
    },
    // 获取数据集列表
    async getDataList() {
        const { data : res } = await this.axios.get(
            "dataset/list.php"
        );
        this.datalist = res.data;   
    },
    // 获取病理号
    async getTableList(row) {  
      this.search =! this.search
      // console.log(row.id)
      // console.log(this.queryInfo.page)
      const { data: res } = await this.axios.get(     
      "excel_data/list.php?id=" + row.id, {params:{page:this.queryInfo.page}});
      //console.log(row.id)
      this.tablelist = res.data
      //console.log(res.data)
      // console.log("getTableList",res);   
      this.queryInfo.page = parseInt(res.page);     
      this.queryInfo.count = parseInt(res.count)  //总条数
      this.queryInfo.pagerows = res.pagerows  //每页显示多少条 
      this.id = row.id  
      // console.log(this.queryInfo.page);console.log(this.queryInfo.count);console.log(this.queryInfo.pagerows);             
    },
    async getTableList() {  
      // console.log(row.id)
      // console.log(this.queryInfo.page)
      const { data: res } = await this.axios.get(     
      "excel_data/list.php?id=" + this.id, {params:{page:this.queryInfo.page}});
      //console.log(row.id)
      this.tablelist = res.data
      //console.log(res.data)
      // console.log("getTableList",res);   
      this.queryInfo.page = parseInt(res.page);     
      this.queryInfo.count = parseInt(res.count)  //总条数
      this.queryInfo.pagerows = res.pagerows  //每页显示多少条 
    
      // console.log(this.queryInfo.page);console.log(this.queryInfo.count);console.log(this.queryInfo.pagerows);             
    },
    // 搜索
    async getTable() {      
      // console.log(row.id)
      const { data: res } = await this.axios.get(
      "excel_data/list.php?id=" + this.id, {params:{name:this.name,test_id:this.test_id}});
      console.log(this.test_id)
      console.log(this.id)
      console.log(this.name)
      this.tablelist = res.data
       this.queryInfo.page = parseInt(res.page);     
      this.queryInfo.count = parseInt(res.count)  //总条数
      console.log(res.data)
      console.log("getTableList",res);   
      // this.queryInfo.page = res.page     
      // this.count = res.count  //总条数
      // this.queryInfo.pagerows = res.pagerows  //每页显示多少条        
      // console.log(this.queryInfo.page);console.log(this.queryInfo.count);console.log(this.queryInfo.pagerows);        
    },
    // 点击下一个
    async next(){
      this.id = this.id         
      console.log(this.id)
      const { data :res} = await this.axios.get(
      "excel_data/nextonedata.php?id=" + this.id);      
      if(res.ok ==0){
        return this.$message.error('已经是最后一个了')
      }
      console.log("getTableList",res);
      this.editForm = res.data;
      // 将ID赋值下一个ID
      this.id= res.id
      // this.editForm = Object.assign(res.data[0],res.data[1],res.data[2])

    },
    // 显示
    xianshi(){
      this.luru =! this.luru     
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
      this.zhezhao = !this.zhezhao    
      this.report.help_diagnosis = this.help_diagnosis;
    },    
    // 免疫租化增删
    ihcAddData(array, value) {
      //判断当前数组的对象是否有数据
      console.log(array,value)
      if (value.mark.trim() || value.value.trim()) {
        //验证通过 添加新的一条
        // var value = {
        //   mark: "", 
        //   value: ""
        // };
        array.push(value);
      } else {
        alert("请检查输入是否正确");
      }
    },
    // 免疫组化删除
    ihcDeleteData(array) {
      if (array.length > 1) {
        array.splice(array.length - 1, 1);
      } else {
        alert("最少保留一个");
      }
    },
    
    // 切换每页显示多少条
    handleSizeChange(newSize) {
      this.queryInfo.pagerows = newSize;
      this.getTableList();
    },
    // 点击页数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getTableList();
    },
    // 列表删除
    async del(row) {   
      const { data: res } = await this.axios.get(
      "excel_data/del.php" , {params:{id:row.id}});
      this.$confirm("确定删除该数据？, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
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
    // 新增患者信息
    addFormList(editForm){
      this.zhezhao = !this.zhezhao
      this.id = this.id
      // console.log(this.id)   
      this.editFrm = this.editForm
      this.editForm.help_diagnosis = this.help_diagnosis;
      // const sicksList = JSON.stringify(sicksArr)      
      let data={
        "id":this.id,
        "data":editForm
      }
      //data = qs.stringify(data);     
      // console.log("data:",data);
      if(data){
      // console.log(data)
       this.axios.post('report/add.php',data).then(res => {
          console.log('res:',res); 
          var result = res.data;//JSON.parse(res.body);
          if(result.result=='done'){
            this.$alert("提交成功", '提交结果', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
              },
            });
          }
          else{
            this.$alert("提交失败", '提交结果', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
              },
            });
          }
        })
      }else {
          console.log('error submit!!');
          return false;
        }    
        this.next()
    }, 
    //上传文件方法
    uploadFile(){
      this.uploadLoading=false;
      var that=this;
      this.fileList=[];
      this.uploadTemplateDialog=true;
      setTimeout(function(){
          that.$refs.upload.clearFiles();
      },100);
    },
    handleExceed(files,fileList){
      this.$message.warning('只能选择1个文件!');
    },
    submitUpload(){
        this.uploadLoading=true;
        var that=this;
        setTimeout(function () {
            if(that.$refs.upload.$children[0].fileList.length==1){
              that.$refs.upload.submit();   
              that.$alert('上传成功')   
            }else{
              that.uploadLoading=false;
              that.$message({
                  type:'error',
                  showClose:true,
                  duration:3000,
                  message:'请选择文件!'
              });
            };
        },100);
        
    },
    handleRemove(file,fileList){
        console.log(file,fileList);
    },
    handlePreview(file){
        console.log(file);
    },
    beforeUpload(file){


        var that=this;
        //文件类型
        var fileName=file.name.substring(file.name.lastIndexOf('.')+1);
        if(fileName!='csv'){
            that.uploadTemplateDialog=false;
            that.$message({
                type:'error',
                showClose:true,
                duration:3000,
                message:'文件类型不是.csv文件!'
            });
            return false;
        }
        //读取文件大小
        var fileSize=file.size;
        console.log(fileSize);
        if(fileSize>1048576){
            that.uploadTemplateDialog=false;
            that.$message({
                type:'error',
                showClose:true,
                duration:3000,
                message:'文件大于1M!'
            });
            return false;
        }

    
        that.downloadLoading=that.$loading({
            lock:true,
            text:'数据导入中...',
            spinner:'el-icon-loading',
            background:'rgba(0,0,0,0.7)'
        });
        let fd=new FormData();
        fd.append('pic',file);
        fd.append('_t1',new Date());
        axios({
            method:'post',
            url:"upload_file/add.php",
            data:fd,
            headers:{"Content-Type":"multipart/form-data;boundary="+new Date().getTime()}
        }).then(rsp=>{
            that.downloadLoading.close();
            that.uploadLoading=false;
            let resp=rsp.data
            // console.log(this.resp)
            if(resp.resultCode==200){
                that.uploadTemplateDialog=false;
                that.$message.success(resp.resultMsg);
                console.log(resp.resultMsg)
                that.queryData();//更新数据
            }else{
                that.uploadTemplateDialog=false;
                that.$message({
                    type:'error',
                    showClose:true,
                    duration:60,
                    message:resp.resultMsg
                });
            }
        }).catch(error=> {
            that.downloadLoading.close();
            that.uploadLoading=false;
            that.uploadTemplateDialog=false;
            that.$message({
                type:'error',
                showClose:true,
                duration:60,
                message:'请求失败! error:'+error
            });
        })
        return false;
    } ,
  },
  data() { 
    return {   
      value:{
        mark:'',
        value:''
      },
      groupLists:['肝癌多中心项目-复旦肿瘤医院','肺癌多中心项目','淋巴瘤的流行病学研究','左半肝胆管腺癌病理分析','未分组'],   //分组列表
      // 数据集列表
      data:[ ],
      // 列表参数
      id:'',
      page:'',
      orderby:'',
      order:'',
      // 搜索参数
      test_id:'',
      name:'',
      // 分页器
      queryInfo:{
        page:1,         //页数
        pagerows:10,    //每页显示的条数
        count:0,        //数据总数
      },     
      // 上传
      uploadTemplateDialog:false,
      fileList:[],
      uploadLoading:false,
      acceptFileType:'.csv',
      downLoadLoading:'', 
      tablelist: [], //病理号数组
      datalist: [], //数据集数组
      id:'',
      formdata:{},
      group: true,
      search: false,
      luru: false,
      zhezhao: false,  
      count:0,   
      // 查询到的用户信息对象
      editForm:{},
      info: false,
      seen: true,
      seen1: true,
      seen2: true,
      seen3: true,
      seen4: true,
      seen5: true,
      checkList: ["免疫组化","荧光原位杂交","淋巴瘤克隆性基因重排检测","原位杂交","流式细胞检测","ngs检测"],
      // 折叠面板默认打开
      activeNames: ["3","1","2"],
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
      helper_diagnosis: [], //辅助诊断
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
      },
     
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
  background-color #409EFF
  &:hover{
    background #26BC99
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
      display flex
      height: 60px;
      line-height: 60px;
      margin-left: 32px;     
      span {
        color: #3333 3;
        font-size: 14px;
        margin-right: 5px;
      }
      .el-button {
        margin-left: -2px;
        background-color: rgba(41, 184, 252, 1);
        border-radius: 0px 4px 4px 0px;
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
    padding-bottom: 20px;
    .el-table {
      border-top: 1px solid rgba(0, 160, 233, 1);
    }
  }
}
.iconfont {
  color: white;
  font-size: 16px;
}
.s{
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
    .el-pagination {
      float: right;
      margin: 10px 10px 0 0;
    }
  }
}
// 分组弹窗
.out{
  position:fixed;
	left:0px;
	top:0px;
  width 100%
  height 100%  
	background-color :rgba(245,247,251,0.7);
  z-index 9
  .nei {
    border-radius: 5px;
    width: 550px;
    height: 588px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
    background-color: #FAFAFA;
		z-index 10;
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
      .ming{
        margin-left: 20px;
        margin-top 10px
        span{
          width 100px
        }
      }
      .cun{
        margin-left: 30px;
        margin-top 10px
        span{
          width 100px
        }
      }
      // 搜索
      .sousuo {
        margin: 20px 20px 10px 20px;
      }
      .groupList {
        width: 500px;
        height: 300px;
        border: 1px solid #DCDFE6;
        margin: 20px 20px;
        display flex
        flex-flow column
        justify-content space-evenly
        .el-button{
          margin-left: 20px;
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
          font-size 18px
          width: 1600px;
          margin: 6px 30px 0;  
          span {
            height: 30px;
            display: block;
            margin-bottom 8px
          }
          .content {
            font-size: 14px;
            height 60px
          }
        }
      }
    }
  }
}
.zhezhao{
    background #CCCBCE   
    position relative
    bottom 200px
    z-index 9999
    .look{
      width:666px;      
      background:#FAFAFC
      box-shadow:0px 4px 20px 0px rgba(121,121,121,0.75);
      border-radius:0px 0px 4px 4px;
      position absolute
      bottom 20px
      left 50%
      transform translateX(-50%)
      .header{
          width:666px;
          height:40px;
          background:rgba(28,177,255,1);
          border-radius:6px 6px 0px 0px;
          display flex
          line-height 40px
          color white 
          justify-content space-between
          span{
              margin 0 10px
              i{
                  color white 
              }
          }
      }
      .content{
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(51,51,51,1);
          display flex
          flex-flow column
          .HZ{
              margin 30px 30px 10px
              height:1px;
              position relative
              border-top :1px solid rgba(185,222,255,1);
              height 250px          
              div{                
                width 280px
                height 26px
                line-height 26px
                display: inline-block;
                margin-top: 10px;
                margin-left: 20px;
                span{
                  display inline-block                 
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color:rgba(153,153,153,1);
                
                }               
              }             
              button{
                  position absolute
                  left 50%
                  transform translateX(-50%)
                  top -15px
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color: #1CA5FF;
                  line-height:26px;
                  background #FAFAFC
                  width 130px
              }
          }
          .BDW{
              margin 5px 30px
             
              font-size:14px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:26px;
              margin-top 20px
              position relative
              border-top :1px solid rgba(185,222,255,1);
              button{
                  position absolute
                  left 50%
                  transform translateX(-50%)
                  top -15px
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color: #1CA5FF;
                  line-height:26px;
                  background #FAFAFC
                  width 130px
              }
              span{                
                  height 100%  
                  display inline-block
                  margin 20px 10px 20px
                  
              }
          }
          .ZD{            
              position relative
              height 100px
              border-top :1px solid rgba(185,222,255,1); 
              margin 20px 30px
              th{              
                display inline-block               
                line-height 11px
                margin-left 20px
                
              }
              div{
                display inline-block               
              }
              button{
                  position absolute
                  left 50%
                  transform translateX(-50%)
                  top -15px
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color: #1CA5FF;
                  line-height:26px;
                  background #FAFAFC
                  width 130px
              }
              span{
                  display inline-block
                  
                  margin-left 10px
                  margin-top 15px
                  font-size:14px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color:rgba(153,153,153,1);
              }
          }
      }
      .footer{
          width:666px;
          height:50px;
          border-top:1px solid rgba(229,229,229,1);
          .btn{
              margin-right 20px
              float right
              line-height 50px
          }
      }
    }
}
</style>
