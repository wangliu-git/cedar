<template>
 <div id="myUpload">
    <el-button type="primary" size="mini" @click="uploadFile">导入</el-button>
    <!--上传-->
    <el-dialog title="上传" width="40%" :visible.sync="uploadTemplateDialog">
        <el-row>
            <el-col :span="22">
                <el-upload class="upload-demo"
                        ref="upload"
                        action="upload_file/add.php"
                        :accept="acceptFileType"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :before-upload="beforeUpload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取Excel格式文件</el-button>
                    <div slot="tip" class="el-upload_tip">只能上传.xls文件,且不超过1M</div>
                </el-upload>

            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="submitUpload" type="primary" size="mini" :loading="uploadLoading" > 确定上传</el-button>
            <el-button @click="uploadTemplateDialog=false" size="mini">取消</el-button>
        </span>
    </el-dialog>
</div>

</template>

<script type="text/ecmascript-6">

v-for="(item,index) in editForm.helper_diagnosis.ihc"
                              :key="index"


                              <div v-show="seen">
                    <span class="titl">
                      <i class="iconfont icontubiaozhizuo-"></i>
                      {{ihc.name}}
                    </span>
                    <div id="one"   >
                      <!-- 循环myzh这个数组，来动态 + - 操作 -->
                      <div class="sickI" >
                        <div class="sickIt">
                          <span class="name">{{FZ.key_ihc.field_title}}：</span>
                          <el-select size="mini" style="width:100px" >
                            <el-option  :label="item.mark">                            
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                      <div class="sickI">
                        <div class="sickIt">
                          <span class="name">{{FZ.value_ihc.field_title}}：</span>
                          
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
import axios from 'axios'
  export default {
       el:'#myUpload',
        data:function(){
            return{
                uploadTemplateDialog:false,
                fileList:[],
                uploadLoading:false,
                acceptFileType:'.xls',
                downLoadLoading:'',
            }
        },
        //钩子函数,页面加载执行
        created:function(){

        },
        //钩子函数,页面加载完成后执行
        mounted(){

        },
        //函数方法
        methods:{
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
                if(fileName!='xls'){
                    that.uploadTemplateDialog=false;
                    that.$message({
                        type:'error',
                        showClose:true,
                        duration:3000,
                        message:'文件类型不是.xls文件!'
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
                    console.log(this.resp)
                    if(resp.resultCode==200){
                        that.uploadTemplateDialog=false;
                        that.$message.success(resp.resultMsg);
                        console.log(resp.resultMsg)
                        //that.queryData();//更新数据
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
            }
        }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" >
<div v-show="seen">
                    <span class="titl">
                      <i class="iconfont icontubiaozhizuo-"></i>
                      {{ihc.name}}
                    </span>
                    <div id="one" v-for="(ihc,idx) in help_diagnosis.ihc" :key="idx">
                      <!-- 循环myzh这个数组，来动态 + - 操作 -->
                      <div class="sickI">
                        <div class="sickIt">
                          <span class="name">{{FZ.key_ihc.field_title}}：</span>
                          <el-select size="mini" style="width:100px" v-model="ihc.mark">
                            <el-option
                              v-for="(item,index) in FZ.key_ihc.field_values"
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
                          <span class="name">{{FZ.value_ihc.field_title}}：</span>
                          <el-select size="mini" style="width:100px" v-model="ihc.value">
                            <el-option
                              v-for="(item,index) in  FZ.value_ihc.field_values"
                              :key="index"
                              :value="item"
                            >
                              <span>{{item}}</span>
                            </el-option>
                          </el-select>
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
 
</style>



  <div v-show="seen" v-for="(item,index) in editForm.helper_diagnosis.ihc"
                              :key="index" :value="item">
                    <span class="titl">
                      <i class="iconfont icontubiaozhizuo-"></i>
                      {{ihc.name}}
                    </span>
                    <div id="one"   >
                      <!-- 循环myzh这个数组，来动态 + - 操作 -->
                      <div class="sickI" >
                        <div class="sickIt">
                          <span class="name">{{FZ.key_ihc.field_title}}：</span>
                          <el-select size="mini" style="width:100px" >
                            <el-option  :label="item.mark">                            
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                      <div class="sickI">
                        <div class="sickIt">
                          <span class="name">{{FZ.value_ihc.field_title}}：</span>
                          <el-input v-model="editForm.helper_diagnosis.ihc.value" style="width:100px" :value="item.value"></el-input>
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
                  
