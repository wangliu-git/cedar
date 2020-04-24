<template>
  <div class="container" id="dataImport">
    <div class="form">
      <!-- 按钮-->
      <div class="header">
        <el-button-group>
          <el-button size="small" icon="el-icon-arrow-left">返回列表</el-button>
          <el-button size="mini" class="next">
            <i class="iconfont iconxiayige">下一个</i>
          </el-button>
        </el-button-group>
      </div>

      <!-- 表单-->
      <div class="formList">
        <!-- 折叠面板-->
        
        <!-- 患者信息-->
        <el-collapse v-model="activeNames" @change="handleChange" class="HZ">
          <el-collapse-item name="1">
            <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
              <i class="iconfont icontubiaozhizuo-"></i>
              {{patient_infoAll.name}}:
            </template>
            <!-- 患者信息内容-->
            <div class="HZdown">
              <!--病人ID -->
              <div class="sickItem">
                <span>{{showInfo.patient_id.field_title}}: </span>       
                <el-input type="text"  maxlength="10" show-word-limit v-model="formInfo.patient_id" name="patient_id" size="mini" placeholder="请输入住院号/门诊号" ></el-input>
              </div>
              <!--姓名 -->
              <div class="sickItem">
                <span> {{showInfo.name.field_title}}:</span>           
                <el-input type="text" :maxlength="maxL" size="mini" v-model="formInfo.name" name="name" placeholder="请输入姓名"></el-input>
                <span v-show="formInfo.name.length >= maxL">{{textShow}}</span>
              </div>
              <!--性別 -->
              <div class="sickItem">
                <span> {{showInfo.sex.field_title}}:</span>   
                <el-select placeholder="请选择" name="formInfo" v-model="formInfo.sex" size="mini">
                  <el-option v-for="item in showInfo.sex.field_values" :key="item" :value="item">
                    <span >{{item}}</span>
                  </el-option>
                </el-select>
              </div>
              <!--出生日期 -->
              <div class="sickItem">
                <span> {{showInfo.birthday.field_title}}:</span> 
                <el-date-picker  style="width:200px" name="formInfo.birthday" v-model="formInfo.birthday" type="date"  size="mini" placeholder="选择日期"></el-date-picker>
              </div>
              <!-- 联系电话-->
              <div class="sickItem">
                <span> {{showInfo.phone.field_title}}:</span>              
                <el-input  type="tel" maxlength="11" size="mini" v-model="formInfo.phone" name="phone" placeholder="请输入电话"></el-input>
              </div>
              <!--民族-->
              <div class="sickItem">
                <span> {{showInfo.nation.field_title}}:</span>         
                <el-select placeholder="请选择" name="nation" v-model="formInfo.nation" size="mini">
                  <el-option v-for="(item) in showInfo.nation.field_values" :key="item" :value="item">
                    <span >{{item}}</span>
                  </el-option>
                </el-select>
              </div>
              <!--籍贯-->
              <div class="sickItem">
                <span> {{showInfo.birthplace.field_title}}:</span>          
                <el-select placeholder="请选择"  name="birthplace"  v-model="formInfo.birthplace" size="mini">
                  <el-option v-for="(provinces) in showInfo.birthplace.field_values" :key="provinces" :value="provinces">
                    <span >{{provinces}}</span>
                  </el-option>
                </el-select>
              </div>
              <!--居住地-->
              <div class="sickItem">
                <span> {{showInfo.address_prov.field_title}}:</span>            
                <el-select placeholder="请选择"  name="birthplace" v-model="formInfo.address_prov" size="mini">
                  <el-option v-for="(provinces) in showInfo.birthplace.field_values" :key="provinces" :value="provinces">
                    <span >{{provinces}}</span>
                  </el-option>
                </el-select>
              </div>
              <!--  市/区
              <select name="birthplace" v-model="formInfo.address_prov">
              <option v-on="changeaddress_prov(cities)" v-for="(cities) in showInfo.birthplace.field_values.cities" :key="cities" :value="citles">{{provinces.citles}}</option>
              </select> -->
            </div>
          </el-collapse-item>
        </el-collapse>

        <!-- 原医疗机构-->
        <el-collapse v-model="activeNames" @change="handleChange" class="YYL">
          <el-collapse-item name="2">
            <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
              <i class="iconfont icontubiaozhizuo-"></i>
              {{diagnosis_1_info.name}}
            </template>
            <div class="YYLdown">
              <!--报告信息 -->
              <div class="sickIH">              
                  <div class="title"><!-- <i class="iconfont icontubiaozhizuo-"></i> -->{{reportMessage.name}}:</div>
                  <div class="sickItem">
                    <span>{{fMInstitution.organization.field_title}}:</span>              
                    <el-input type="text"  v-model="YYL.organization" placeholder="请输入机构名称" size="mini" ></el-input>
                  </div>
                  <div class="sickItem">
                    <span>{{fMInstitution.test_id.field_title}}:</span>            
                    <el-input type="text"  v-model="YYL.test_id" placeholder="请输入病理号" size="mini" ></el-input> 
                  </div>
                  <div class="sickItem">
                     <span>{{fMInstitution.application_date.field_title}}:</span>           
                      <el-date-picker name="YYL.application_date" v-model="YYL.application_date" type="date"  size="mini" placeholder="选择日期"></el-date-picker>
                  </div>
                  <div class="sickItem">
                    <span>{{fMInstitution.report_date.field_title}}:</span>             
                    <el-date-picker name="YYL.report_date" v-model="YYL.report_date" type="date"  size="mini" placeholder="选择日期"></el-date-picker>
                  </div>               
              </div>
              <!--诊断结论 -->
              <div class="sickIH">
                <div class="title"><!-- <i class="iconfont icontubiaozhizuo-"></i> -->{{reportResult.name}}:</div>        
                <div class="sickItem">
                  <span>{{fMInstitution.diagnosis.field_title}} :</span>          
                  <el-select placeholder="请选择" name="YYL" v-model="YYL.diagnosis" size="mini">
                    <el-option v-for="(item,index) in fMInstitution.diagnosis.field_values" :key="index" :value="item">
                      <span >{{item}}</span>
                    </el-option>
                  </el-select> 
                </div>
                <div class="sickItem">
                 <span>{{fMInstitution.type.field_title}} ：</span>                 
                  <el-select placeholder="请选择" name="YYL"  v-model="YYL.type" size="mini">
                    <el-option :value="fMInstitution.type.field_values">{{fMInstitution.type.field_values == ""? "无数据" : fMInstitution.type.field_values}}
                    </el-option>
                  </el-select>
                </div>            
              </div>
              <!--报告质量  可折叠-->
              <div class="sickIH">
                <div class="title">
                    <!-- <i class="iconfont icontubiaozhizuo-"></i> -->{{reportMass.name}}:
                    <span style="margin-left:50px">{{fMInstitution.report_quality.field_title}} : </span>           
                    <el-select placeholder="请选择" name="YYL" v-model="YYL.report_quality" size="mini">
                      <el-option v-for="(item,index) in fMInstitution.report_quality.field_values" :key="index" :value="item">
                        <span >{{item}}</span>
                      </el-option>
                    </el-select>             
                </div>
                
                <div class="kuai">
                  <div class="p-one">
                    <span class="titles">病理检材质量</span>
                    <div class="sickItems">
                      <span class="one">{{fMInstitution.he_number.field_title}}:</span>             
                      <el-input type="text"  v-model="YYL.he_number" size="mini" style="width:100px"></el-input>              
                      {{fMInstitution.he_number.field_tail}}
                    </div> 
                    <div class="sickItems">
                      <span class="two">{{fMInstitution.he_quality.field_title}}:</span>                    
                      <el-select  name="YYL" v-model="YYL.he_quality" size="mini">
                        <el-option v-for="(item,index) in fMInstitution.he_quality.field_values" :key="index" :value="item">
                          <span >{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>
                    <div class="sickItems">     
                      <span class="three">{{fMInstitution.ihc_number.field_title}}:</span>                                  
                      <el-input type="text"  v-model="YYL.ihc_number" size="mini" style="width:100px"></el-input>
                      {{fMInstitution.he_number.field_tail}}
                    </div>
                    <div class="sickItems">                                   
                      <span class="four">{{fMInstitution.ihc_quality.field_title}}:</span>
                      <el-select  name="YYL" v-model="YYL.ihc_quality" size="mini">
                        <el-option v-for="(item,index) in fMInstitution.ihc_quality.field_values" :key="index" :value="item">
                          <span >{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>
                    <div class="sickItems">                                   
                      <span class="five">{{fMInstitution.problem_slice.field_title}}</span>
                      <el-select  name="YYL" v-model="YYL.problem_slice" size="mini">
                        <el-option v-for="(item,index) in fMInstitution.problem_slice.field_values" :key="index" :value="item">
                          <span >{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>              
                  </div>
                  <div class="p-two">
                    <span class="titles">病理会诊申请单质量：</span>
                    <div class="sickItems">
                      <span class="h">{{fMInstitution.patient_info.field_title}}:</span>                 
                      <el-select  name="YYL" v-model="YYL.patient_info" size="mini">
                        <el-option v-for="(item,index) in fMInstitution.patient_info.field_values" :key="index" :value="item">
                          <span>{{item}}</span>
                        </el-option>
                      </el-select>
                    </div> 
                    <div class="sickItems">
                      <span class="h">{{fMInstitution.history_info.field_title}}: </span>                   
                      <el-select  name="YYL" v-model="YYL.history_info" size="mini">
                        <el-option v-for="(item,index) in fMInstitution.history_info.field_values" :key="index" :value="item">
                          <span >{{item}}</span>
                        </el-option>
                      </el-select>
                    </div> 
                    <div class="sickItems">
                      <span class="h">{{fMInstitution.sample_info.field_title}}: </span>               
                      <el-select name="YYL" v-model="YYL.sample_info" size="mini">
                        <el-option v-for="(item,index) in fMInstitution.sample_info.field_values" :key="index" :value="item">
                          <span>{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>                                       
                  </div>
                  <div class="p-three">
                    <span class="titles">其他临床资料提交情况：</span>
                    <div class="sickItems">
                      <span>{{fMInstitution.record.field_title}}:</span>
                      <el-select  name="YYL" v-model="YYL.record" size="mini">
                        <el-option v-for="(item,index) in fMInstitution.record.field_values" :key="index" :value="item">
                          <span >{{item}}</span>
                        </el-option>
                      </el-select>
                    </div>                   
                    <div class="sickItems">
                     <span> {{fMInstitution.helper_report.field_title}}:</span>
                      <el-select  name="YYL" v-model="YYL.helper_report" size="mini">
                        <el-option v-for="(item,index) in fMInstitution.helper_report.field_values" :key="index" :value="item">
                        {{item}}
                        </el-option>
                      </el-select>
                    </div>                 
                  </div>
                </div>
              </div>             
            </div>
          </el-collapse-item>
        </el-collapse>

        <!-- 本医疗机构-->   				
				<el-collapse v-model="activeNames" @change="handleChange" class="BYL">
          <el-collapse-item  name="3">
            <template slot="title" style="background-color:rgba(232, 232, 232, 1)">
              <i class="iconfont icontubiaozhizuo-"></i>
              {{diagnosis_2_info.name}}
            </template>
              <div class="BYLdown">
                <div class="sickIH">
                  <!--报告信息 -->
                  <div class="title"><!-- <i class="iconfont icontubiaozhizuo-"></i> -->{{reportMessage.name}}:</div>
                  <div class="sickItem">
                    <span>{{tMInstitution.test_id.field_title}}:</span>                  
                    <el-input type="text"  v-model="BYL.test_id" placeholder="请输入病理号" size="mini" ></el-input>
                  </div>

                  <div class="sickItem">
                    <span>{{tMInstitution.department.field_title}}:</span>                  
                    <el-input type="text"  v-model="BYL.department" placeholder="请输入机构名称" size="mini" ></el-input>
                  </div>
                  
                  <div class="sickItem">
                    <span>{{tMInstitution.application_date.field_title}}:</span>                  
                    <el-date-picker name="BYL.application_date" v-model="BYL.application_date" type="date"  size="mini" placeholder="选择日期"></el-date-picker>
                  </div>

                  <div class="sickItem">
                    <span>{{tMInstitution.report_date.field_title}}:</span>                  
                    <el-date-picker name="BYL.test_id" v-model="BYL.report_date" type="date"  size="mini" placeholder="选择日期"></el-date-picker>
                  </div>
                  <div class="sickItem">
                    <span> {{tMInstitution.diagnosis_type.field_title}}： </span>                  
                    <el-select  name="BYL" v-model="BYL.diagnosis_type" size="mini">
                        <el-option v-for="(item,index) in  tMInstitution.diagnosis_type.field_values" :key="index" :value="item">
                          <span >{{item}}</span>
                        </el-option>
                      </el-select> 
                  </div>                                                                                                                 
                </div>

                <div class="sickIH">
                  <!--取材信息 -->
                  <div class="title"><!-- <i class="iconfont icontubiaozhizuo-"></i> -->{{materMessage.name}}:</div>
                  <div class="sickItem">
                    <span>{{tMInstitution.sample_type.field_title}}:</span>                  
                    <el-select  name="BYL" v-model="BYL.sample_type" size="mini">
                      <el-option v-for="(item,index) in  tMInstitution.sample_type.field_values" :key="index" :value="item">
                        <span >{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>
                  
                  <div class="sickItem">
                    <span>{{tMInstitution.sample_location.field_title}}:</span>                  
                    <el-select  name="BYL" v-model="BYL.sample_location" size="mini">
                      <el-option v-for="(item,index) in  tMInstitution.sample_location.field_values" :key="index" :value="item">
                        <span >{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>
                  
                  <div class="sickItem">
                    <span>{{tMInstitution.sample_morphology.field_title}}:</span>                  
                    <el-input type="text"  v-model="BYL.sample_morphology" placeholder="请输入形态学描述" size="mini" ></el-input>
                  </div>               
                </div>

                <div class="sickIH">
                  <!--就诊结论 -->
                  <div class="title"><!-- <i class="iconfont icontubiaozhizuo-"></i> -->{{reportResult.name}}:</div>
                  <div class="sickItem">
                    <span>{{tMInstitution.diagnosis.field_title}}:</span>                  
                    <el-select  name="BYL" v-model="BYL.diagnosis" size="mini">
                      <el-option v-for="(item,index) in  tMInstitution.diagnosis.field_values" :key="index" :value="item">
                        <span >{{item}}</span>
                      </el-option>
                    </el-select>               
                  </div>
                  
                  <div class="sickItem">
                    <span>{{tMInstitution.type.field_title}}:</span>                  
                    <el-select  name="BYL" v-model="BYL.type" size="mini">
                      <el-option v-for="(item,index) in  tMInstitution.type.field_values" :key="index" :value="item">
                        <span >{{item}}</span>
                      </el-option>
                    </el-select>               
                  </div>                
                </div>

                <!--辅助诊断 -->             
                <div class="sickIH">
                  <div class="title">  
                    <span><!-- <i class="iconfont icontubiaozhizuo-"></i> -->{{helper_diagnosis.name}}:</span>
                    <el-checkbox-group v-model="checkList" @change="func1" style="display: initial;">
                      <el-checkbox label="免疫组化"></el-checkbox>
                      <el-checkbox label="荧光原位杂交"></el-checkbox>
                      <el-checkbox label="淋巴瘤克隆性基因重排检测"></el-checkbox>
                      <el-checkbox label="原位杂交"></el-checkbox>
                      <el-checkbox label="流式细胞检测"></el-checkbox>
                      <el-checkbox label="NGS检测"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>

                <div class="mianyi" >
                  <div v-show="seen" > 
                    <span class="titl"><i class="iconfont icontubiaozhizuo-"></i>{{mianyi.name}}</span>
                    <div id="one" v-for="(immune,idx) in help_diagnosis.immune" :key="idx" ><!-- 循环myzh这个数组，来动态 + - 操作 -->
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.key_ihc.field_title}}：</span>                  
                          <el-select  size="mini" style="width:100px" v-model="immune.sign">
                            <el-option v-for="(item,index) in FZ.key_ihc.field_values" :key="index" :value="item">
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>               
                        </div>                
                      </div> 
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.value_ihc.field_title}}：</span>                  
                          <el-select  size="mini" style="width:100px" v-model="immune.result">
                            <el-option v-for="(item,index) in  FZ.value_ihc.field_values" :key="index" :value="item">
                              <span >{{item}}</span>
                            </el-option>
                          </el-select>            
                        </div>                
                      </div>
											<!-- + - 操作只需要传入当前循环的数组 -->
											<!-- 判断 必须是最后一条，才可以显示操作按钮 -->
                      <div class="handleBtnBox">
                      <!-- el-button: v-if="idx==testFZ.immune.length-1" -->
                        <el-button  @click="immuneAddData(help_diagnosis.immune,help_diagnosis.immune[idx])"><i class="iconfont iconaddTodo-nav"></i></el-button>
                        <el-button  @click="immuneDeleteData(help_diagnosis.immune)"><i class="iconfont iconjianhao1"></i></el-button>              
                      </div>
                    </div>
                  </div>
									
									<div v-show="seen1" >
									  <span class="titl"><i class="iconfont icontubiaozhizuo-"></i>{{yingguang.name}}</span>            
									  <div id="two" v-for="(yingguang,idx) in help_diagnosis.yingguang" :key="idx">
									    <div class="sickI">                     
									      <div class="sickIt">
									        <span class="name">{{FZ.key_fish.field_title}}：</span>                  
									        <el-select   size="mini" style="width:100px" v-model="yingguang.sign">
									          <el-option v-for="(item,index) in FZ.key_fish.field_values" :key="index" :value="item">
									            <span>{{item}}</span>
									          </el-option>
									        </el-select>               
									      </div>                
									    </div> 
									    <div class="sickI">                     
									      <div class="sickIt">
									        <span class="name">{{FZ.value_fish.field_title}}：</span>                  
									        <el-select   size="mini" style="width:100px" v-model="yingguang.result">
									          <el-option v-for="(item,index) in  FZ.value_fish.field_values" :key="index" :value="item">
									            <span >{{item}}</span>
									          </el-option>
									        </el-select>            
									      </div>                
									    </div> <!-- 不同的地方可以调用一个方法，不需要额外写-->
                      <div class="handleBtnBox">
                        <el-button  @click="immuneAddData(help_diagnosis.yingguang,help_diagnosis.yingguang[idx])"><i class="iconfont iconaddTodo-nav"></i></el-button>
                        <el-button  @click="immuneDeleteData(help_diagnosis.yingguang)"><i class="iconfont iconjianhao1"></i></el-button>
                      </div>
                    </div>
									</div>
                  
                  <div v-show="seen2" >
                    <span class="titl"><i class="iconfont icontubiaozhizuo-"></i>{{jiyin.name}}</span>
                    <div id="three" v-for="(jiyin, idx) in help_diagnosis.jiyin" :key="idx">
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.key_dna.field_title}}：</span>                  
                          <el-select   size="mini" style="width:100px" v-model="jiyin.sign">
                            <el-option v-for="(item,index) in  FZ.key_dna.field_values" :key="index" :value="item">
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>               
                        </div>                
                      </div> 
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.value_dna.field_title}}：</span>                  
                          <el-select  size="mini" style="width:100px"  v-model="jiyin.result">
                            <el-option v-for="(item,index) in  FZ.value_dna.field_values" :key="index" :value="item">
                              <span >{{item}}</span>
                            </el-option>
                          </el-select>            
                        </div>                
                      </div>
                      <div class="handleBtnBox">
                        <el-button  @click="immuneAddData(help_diagnosis.jiyin,help_diagnosis.jiyin[idx])"><i class="iconfont iconaddTodo-nav"></i></el-button>
                        <el-button  @click="immuneDeleteData(help_diagnosis.jiyin)"><i class="iconfont iconjianhao1"></i></el-button>
                      </div>
                    </div>

                  </div>

                  <div v-show="seen3" >
                    <span class="titl"><i class="iconfont icontubiaozhizuo-"></i>{{yuanwei.name}}</span>
                    <div id="four" v-for="(yuanwei, idx) in help_diagnosis.yuanwei" :key="idx">
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.key_ish.field_title}}：</span>                  
                          <el-select   size="mini" style="width:100px" v-model="yuanwei.sign">
                            <el-option v-for="(item,index) in  FZ.key_ish.field_values" :key="index" :value="item">
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>               
                        </div>                
                      </div> 
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.value_ish.field_title}}：</span>                  
                          <el-select   size="mini" style="width:100px" v-model="yuanwei.result">
                            <el-option v-for="(item,index) in FZ.value_ish.field_values" :key="index" :value="item">
                              <span >{{item}}</span>
                            </el-option>
                          </el-select>            
                        </div>                
                      </div>
                      <div class="handleBtnBox">
                        <el-button  @click="immuneAddData(help_diagnosis.yuanwei,help_diagnosis.yuanwei[idx])"><i class="iconfont iconaddTodo-nav"></i></el-button>
                        <el-button  @click="immuneDeleteData(help_diagnosis.yuanwei)"><i class="iconfont iconjianhao1"></i></el-button>
                      </div>
                    </div>
                  </div>

                  <div v-show="seen4" >
                    <span class="titl"><i class="iconfont icontubiaozhizuo-"></i>{{liushi.name}}</span>
                    <div id="five" v-for="(liushi, idx) in help_diagnosis.liushi" :key="idx">
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.type_fcm.field_title}}：</span>                  
                          <el-select   size="mini" style="width:100px" v-model="liushi.sign">
                            <el-option v-for="(item,index) in  FZ.type_fcm.field_values" :key="index" :value="item">
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>               
                        </div>                
                      </div> 
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.value_fcm.field_title}}：</span>                  
                          <el-select  size="mini" style="width:100px" v-model="liushi.result">
                            <el-option v-for="(item,index) in FZ.value_fcm.field_values" :key="index" :value="item">
                              <span >{{item}}</span>
                            </el-option>
                          </el-select>            
                        </div>                
                      </div>
                      <div class="handleBtnBox">
                        <el-button  @click="immuneAddData(help_diagnosis.liushi,help_diagnosis.liushi[idx])"><i class="iconfont iconaddTodo-nav"></i></el-button>
                        <el-button  @click="immuneAddData(help_diagnosis.liushi)"><i class="iconfont iconjianhao1"></i></el-button>
                      </div>
                    </div>
                  </div>

                  <div v-show="seen5" >
                    <span class="titl"><i class="iconfont icontubiaozhizuo-"></i>{{NGS.name}}</span>
                    <div id="six" v-for="(NGS, idx) in help_diagnosis.NGS" :key="idx">
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.type_ngs.field_title}}：</span>                  
                          <el-select   size="mini" style="width:100px" v-model="NGS.sign">
                            <el-option v-for="(item,index) in FZ.type_ngs.field_values" :key="index" :value="item">
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>               
                        </div>                
                      </div> 
                      <div class="sickI">                     
                        <div class="sickIt">
                          <span class="name">{{FZ.value_ngs.field_title}}：</span>                  
                          <el-select   size="mini" style="width:100px" v-model="NGS.result">
                            <el-option v-for="(item,index) in FZ.value_ngs.field_values" :key="index" :value="item">
                              <span >{{item}}</span>
                            </el-option>
                          </el-select>            
                        </div>                
                      </div>
                      <div class="handleBtnBox">
                        <el-button  @click="immuneAddData(help_diagnosis.NGS,help_diagnosis.NGS[idx])"><i class="iconfont iconaddTodo-nav"></i></el-button>
                        <el-button  @click="immuneAddData(help_diagnosis.NGS)"><i class="iconfont iconjianhao1"></i></el-button>
                      </div>
                    </div>
                  </div>
                </div>                
              </div> 
          </el-collapse-item>
          <el-button  type="primary" @click="submit(sicksArr)" class="commit" style="width:100%">提交</el-button>
          <div class="textCon">
              <div class="text">
                  <span>原始文本</span>
                  <div class="content">
                      　有人说，“努力”与“拥有”是人生一左一右的两道风景。但我以为，人生最美最不能逊色的风景应该是努力。努力是人生的一种精神状态，是对生命的一种赤子之情。努力是拥有之母，拥有是努力之子。一心努力可谓条条大路通罗马，只想获取可谓道路逼仄，天地窄小。所以，与其规定自己一定要成为一个什么样的人物，获得什么东西，不如磨练自己做一个努力的人。志向再高，没有努力，志向终难坚守；没有远大目标，因为努力，终会找到奋斗的方向。做一个努力的人，可以说是人生最切实际的目标，是人生最大的境界。

                      许多人因为给自己定的目标太高太功利，因为难以成功而变得灰头土脸，最终灰心失望。究其原因，往往就是因为太关注拥有，而忽略做一个努力的人。对于今天的孩子们，如果只关注他们将来该做个什么样的人物，不把意志品质作为一个做人的目标提出来，最终我们只能培养出狭隘、自私、脆弱和境界不高的人。遗憾的是，我们在这方面做得并不尽如人意。
                  </div>
              </div>
          </div> 
        </el-collapse>               
      </div>
    </div>
  </div>
</template>

<script>
import uuid from "uuid";
import allMessage from "../../staic/allMessage.json";
export default {
  name: "saber", 
  data() {
    return {
      seen:false,
      seen1:false,
      seen2:false,
      seen3:false,
      seen4:false,
      seen5:false, 
			checkList:[],   
      // 折叠面板默认打开
      activeNames: ['3'],
      // 大数组
      sicksArr: [],
      // 最大长度
      maxL: 5,
      textShow: "输入内容不可超过50个字符",
      // 表单提交信息
      formInfo: {
        key: uuid(),        //唯一标识
        patient_id: "",     //病人ID
        name: "",           //病人姓名
        sex: "",            //病人性别
        birthday: "",       //病人生日
        phone: "",   //病人联系方式
        nation: "",         //病人民族
        birthplace: "",     //病人籍贯所在省
        address_prov: ""         //病人现住址(省)
      },
      YYL: {
        organization: "",       //机构名称
        test_id: "",            //病理号
        application_date: "",   //申请日期
        report_date: "",        //报告日期
        diagnosis: "",          //诊断结论
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
      BYL: {
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
        // helper_diagnosis: {
        //   immune: [], //免疫租化数组
        //   yingguang: [], //荧光杂交数组
        //   jiyin: [], //基因重排数组
        //   yuanwei: [], //原位杂交数组
        //   liushi: [], //流式细胞检测
        //   NGS: [] //NGS数组
        // } //辅助诊断
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
        type: {}, //淋细胞瘤来源
      
        
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
      //测试数据
      help_diagnosis:{
        immune:[
          {
            sign:"",//标志物
            result:"",//检测结果
          },
        
        ],//免疫组化的数组
        yingguang:[
          {
            sign:"",
            result:"",
          }
        ],//荧光数组
        jiyin:[
          {
            sign:"",
            result:"",
          }
        ],//基因数组
        yuanwei:[
          {
            sign:"",
            result:"",
          }
        ],//原位杂交数组
        liushi:[
          {
            sign:"",
            result:"",
          }
        ],//流式细胞数组
        NGS:[
          {
            sign:"",
            result:"",
          }
        ],//NGS数组
      },					
      // // 更改后作用未知
      sign: "", //免疫项对应数据初始化
      result: "", //免疫项对应数据初始化
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
      mianyi: {}, //免疫组化信息对象
      yingguang: {}, //荧光杂交信息对象
      jiyin: {}, //基因重排
      yuanwei: {}, //原位杂交
      liushi: {}, //流式细胞检测
      NGS: {} ,//NGS检测					
    };
  },
  methods: {
    func1: function (value) {
      //console.log("checkList",this.checkList);
      /* for(var i=0;i<this.checkList.length;i++){
        if(this.checkList[i]=="免疫组化"){
          this.seen=true;
        }else if(this.checkList[i]=="荧光原位杂交"){
          this.seen1=true;
        }else if(this.checkList[i]=="淋巴瘤克隆性基因重排检测"){
          this.seen2=true;
        }else if(this.checkList[i]=="原位杂交"){
          this.seen3=true;
        }else if(this.checkList[i]=="流式细胞检测"){
          this.seen4=true;
        }else if(this.checkList[i]=="NGS检测"){
          this.seen5=true;
        }else {
          this.seen=false;
        }
      } */
      if(this.checkList.length==0){
        this.seen=false;
        this.seen1=false;
        this.seen2=false;
        this.seen3=false;
        this.seen4=false;
        this.seen5=false;
      }
      for(var i=0;i<this.checkList.length;i++){
        if(this.checkList[i]=="免疫组化"){
          this.seen=true;
          break;
        }else {
          this.seen=false;
        } 
      }
      for(var i=0;i<this.checkList.length;i++){
        if(this.checkList[i]=="荧光原位杂交"){
          this.seen1=true;
          break;
        }else {
          this.seen1=false;
        }
      }
      for(var i=0;i<this.checkList.length;i++){
        if(this.checkList[i]=="淋巴瘤克隆性基因重排检测"){
          this.seen2=true;
          break;
        }else {
          this.seen2=false;
        }
      }
      for(var i=0;i<this.checkList.length;i++){
        if(this.checkList[i]=="原位杂交"){
          this.seen3=true;
          break;
        }else {
          this.seen3=false;
        }
      }
      for(var i=0;i<this.checkList.length;i++){
        if(this.checkList[i]=="流式细胞检测"){
          this.seen4=true;
          break;
        }else {
          this.seen4=false;
        }
      }
      for(var i=0;i<this.checkList.length;i++){
        if(this.checkList[i]=="NGS检测"){
          this.seen5=true;
          break;
        }else {
          this.seen5=false;
        }
      }


    },
    // 点击折叠面板
    handleChange(val) {
      console.log(val);
    },
    // 表单提交
    submit(sicksArr) {
      this.BYL.help_diagnosis = this.help_diagnosis
      sicksArr.push(this.formInfo, this.YYL, this.BYL);
      const sicksList = JSON.stringify(sicksArr);  
      console.log(sicksArr);
    },
    // 免疫租化增删
    immuneAddData(array,value) {
			//判断当前数组的对象是否有数据
      if (value.sign.trim() || value.result.trim()) {
        //验证通过 添加新的一条
				var value={
          sign:'',
          result:''
        };         
				array.push(value)
        alert('添加成功')
      } else {
        alert("请检查输入是否正确");
      }
    },
		immuneDeleteData(array){
			if(array.length>1){
				array.splice(array.length-1,1);
			}else{
				alert("最少保留一个")
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
      console.log(this.fMInstitution.organization);
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

    console.log(
      this.reportMessage,
      this.materMessage,
      this.reportResult,
      this.helper_diagnosis
    ); //报告信息,取材信息,诊断结论, 辅助诊断
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
    console.log(this.helper_diagnosis);

    this.helper_diagnosis.items.map((item, index) => {
      if (item.name == "免疫组化") {
        this.mianyi = item;
      } else if (item.name == "荧光原位杂交") {
        this.yingguang = item;
      } else if (item.name == "基因重排") {
        this.jiyin = item;
      } else if (item.name == "原位杂交") {
        this.yuanwei = item;
      } else if (item.name == "流式细胞检测") {
        this.liushi = item;
      } else {
        // NGS检测
        this.NGS = item;
      }
    });
    console.log(
      this.mianyi,
      this.yingguang,
      this.jiyin,
      this.liushi,
      this.liushi,
      this.NGS
    );
    // 免疫组化
    this.mianyi.fields.map((item, index) => {
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
    this.yingguang.fields.map((item, index) => {
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
    this.jiyin.fields.map((item, index) => {
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
    this.yuanwei.fields.map((item, index) => {
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
    this.liushi.fields.map((item, index) => {
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
    // NGS检测
    this.NGS.fields.map((item, index) => {
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
    }) 
  }
}
</script>
<style>
	#dataImport .el-collapse-item__header{
		background-color:#FAFAFC !important;
		height: 35px;
		border-radius: 5px 5px 0px 0px;
	}
	#dataImport .el-collapse-item{
		border: 1px solid #EFEEF1;
		border-radius: 5px;
	}
  #dataImport .form .formList .mianyi .el-button{
    background:rgba(184,195,213,1);
    border-radius:4px;
    color:white;  
  }
  #dataImport .form .formList .mianyi .el-button :hover{
    background :#1ca5ff  ;
  }
  #dataImport .icontubiaozhizuo-:before {
    color :#1ca5ff  ;
  }
  .handleBtnBox{
    position: absolute;
    display: flex;
    align-items: center;
    left: 440px;   
  }

</style>



<style scoped lang="stylus" rel="stylesheet/stylus" >
.container{
  width:100%;
  overflow-x:hidden
  .el-input{
    width 200px
  }  
  .form {
    height: 2000px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
    border-radius: 4px;
    position relative
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
      .HZ{
        margin 20px   
        background-color rgba(250, 250, 250, 1)
        border-radius 5px;
        .HZdown{
          display flex
          justify-content space-evently
          flex-wrap wrap
          width 1600px
          margin 10px auto
          .sickItem{  
            width 260px
            display inline-block
            height 50px
            display flex
            justify-content space-around
            align-items center
            margin-right 50px
            margin-left 60px
            span{
              display inline-block
              width 60px
            }
          }
        }
      }    
      // 原医疗机构信息内容
      .YYL{
        margin 20px
        border-radius 5px;
        .YYLdown{
          .buju{
            margin-left 50px
          }
          .sickIH {
            .title{
              background-color #EFEEF1
              margin 10px 20px
              height 35px
              line-height 35px
              border-left : 5px #3190E8 solid;
              padding-left 10px;
            }
            .sickItem{
              display inline-block
              margin 10px
              margin-left 50px
              span{
                display inline-block
                width 110px
              }
            } 
            .kuai{
              display flex
              flex-flow row
              width 1500px
              height 200px
              margin-top 28px
              // 报告质量下的块
              .p-one{
                border 1px solid rgba(224, 224, 224, 1)
                width 600px
                margin-left 50px
                height 190px
                .titles{
                  display block
                  padding-left 20px
                  border-bottom 1px solid rgba(224, 224, 224, 1)
                  height 30px
                  line-height 30px
                  background-color rgba(232, 232, 232, 1)
                }
                .sickItems{
                  display flex
                  flex-flow row
                  justify-content space-between
                  flex-wrap wrap  
                  margin-left 30px          
                  float left
                  height 50px
                  line-height 50px
                  .one{
                    display inline-block
                    width 100px
                  }
                  .three{
                    display inline-block
                    width 100px
                  }
                  .two{
                    display inline-block
                    width 50px
                  }
                  .four{
                    display inline-block
                    width 50px
                  }
                  .five{
                    display inline-block
                    width 295px
                  }
                } 
              }
              .p-two{
                border 1px solid rgba(224, 224, 224, 1)
                width 500px
                margin-left 40px
                height 190px
                .titles{
                  display block
                  padding-left 20px
                  border-bottom 1px solid rgba(224, 224, 224, 1)
                  height 30px
                  line-height 30px
                  background-color rgba(232, 232, 232, 1)
                }
                .sickItems{
                  display flex
                  flex-flow row
                  justify-content space-between
                  flex-wrap wrap  
                  margin-left 30px          
                  float left
                  height 50px
                  line-height 50px 
                  span{
                    width 150px
                  }                
                }
                
              }
              .p-three{
                border 1px solid rgba(224, 224, 224, 1)
                width 500px
                margin-left 40px
                height 190px
                .titles{
                  display block
                  padding-left 20px
                  border-bottom 1px solid rgba(224, 224, 224, 1)
                  height 30px
                  line-height 30px
                  background-color rgba(232, 232, 232, 1)
                }
                .sickItems{
                  display flex
                  flex-flow row
                  justify-content space-between
                  flex-wrap wrap  
                  margin-left 30px          
                  float left
                  height 50px
                  line-height 50px 
                  span{
                    width 150px
                  }                
                }
              }  
            }
          }
        }
      }
      // 本医疗机构
      .BYL{
        margin 20px   
        border-radius 5px;  
        .BYLdown{
          .sickIH {
            .title{
              background-color #EFEEF1
              margin 10px 20px
              height 35px
              line-height 35px
              border-left : 5px #3190E8 solid;
              padding-left 10px;
            }
            .sickItem{
              display inline-block
              margin 10px
              margin-left 50px
              span{
                display inline-block
                width 110px
              }
            }    
          }
          .mianyi{
            display inline 
            display flex
            flex-flow row
            flex-wrap wrap
            .titl{
              margin 10px 80px
              background-color #EFEEF1
              height 40px
              line-height 40px
            }
            #one{
              width:420px;
              background:rgba(249,249,249,1);
              border:1px solid rgba(229,229,229,1);
              border-radius:4px; 
              margin 0 80px
              padding-bottom  20px                     
              .sickI {
                display inline-block
                .sickIt{
                  margin  0 10px 
                  .name{
                    display inline-block
                    width 70px
                  }
                }    
              }
              position: relative;
              display: flex;
              align-items: center;
              padding-top: 20px;
     
            }
            #two{       
              width:420px;
              background:rgba(249,249,249,1);
              border:1px solid rgba(229,229,229,1);
              border-radius:4px; 
              margin 0 80px
              padding-bottom  20px              
              .sickI {
                display inline-block
                .sickIt{
                  margin  0 10px 
                  .name{
                    display inline-block
                    width 70px
                  }
                }    
              }
              position: relative;
              display: flex;
              align-items: center;
              padding-top: 20px;
            }
            #three{       
              width:420px;
              background:rgba(249,249,249,1);
              border:1px solid rgba(229,229,229,1);
              border-radius:4px; 
              margin 0 80px
              padding-bottom  20px              
              .sickI {
                display inline-block
                .sickIt{
                  margin  0 10px 
                  .name{
                    display inline-block
                    width 70px
                  }
                }    
              }
              position: relative;
              display: flex;
              align-items: center;
              padding-top: 20px;
            }
            #four{       
              width:420px;
              background:rgba(249,249,249,1);
              border:1px solid rgba(229,229,229,1);
              border-radius:4px; 
              margin 0 80px
              padding-bottom  20px              
              .sickI {
                display inline-block
                .sickIt{
                  margin  0 10px 
                  .name{
                    display inline-block
                    width 70px
                  }
                }    
              }
              position: relative;
              display: flex;
              align-items: center;
              padding-top: 20px;
            }
            #five{       
              width:420px;
              background:rgba(249,249,249,1);
              border:1px solid rgba(229,229,229,1);
              border-radius:4px; 
              margin 0 80px
              padding-bottom  20px              
              .sickI {
                display inline-block
                .sickIt{
                  margin  0 10px 
                  .name{
                    display inline-block
                    width 70px
                  }
                }    
              }
              position: relative;
              display: flex;
              align-items: center;
              padding-top: 20px;
            }
            #six{       
              width:420px;
              background:rgba(249,249,249,1);
              border:1px solid rgba(229,229,229,1);
              border-radius:4px; 
              margin 0 80px
              padding-bottom  20px              
              .sickI {
                display inline-block
                .sickIt{
                  margin  0 10px 
                  .name{
                    display inline-block
                    width 70px
                  }
                }    
              }
              position: relative;
              display: flex;
              align-items: center;
              padding-top: 20px;
            }
            
          }    
        }          
      }
      .el-button{        
        background:rgba(117,209,253,1);
        border-radius:4px;
        border none       
      }
      .textCon{
        margin-left -40px       
        position fixed
        bottom 0px
        z-index 9
        width 1800px
        height:230px;
        background:rgba(255,255,255,1);
        box-shadow:S0px 1px 10px 0px rgba(179,179,179,0.75);
        border-radius:4px;
        .text{
          height 200px
          width 1600px
          margin 10px 30px      
          span{
            height 20px
            display block
            margin 10px 0
          }
          .content{
            font-size 14px
          }
        }
      }
    }   
  }
}
</style>
