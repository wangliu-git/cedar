<template>
  <div>
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item name="1">
        <template
          slot="title"
          style="background-color:rgba(232, 232, 232, 1) ,border:1px solid,margin-left:10px"
        >
          <i class="iconfont icontubiaozhizuo-"></i> 选择分组
        </template>
        <div class="search">
          <div class="left">
            <span>创建人 ：</span>
            <el-select placeholder="请选择" size="small" v-model="group_name" @change="getName()">
              <el-option v-for="(item,index) in this.peopleList" :key="index" :value="item.group_username"></el-option> 
            </el-select>
          </div>
          <div class="right">
            <el-input placeholder="搜索" size="small" class="input-with-select">
              <el-button slot="append" class="iconfont iconsousuo" size="small"></el-button>
            </el-input>
          </div>
          <!-- <el-button type="text" size="small" @click="chakan(scope.row)">查看</el-button>-->
          <div class="storageList">
            <div class="list" style="width:96%">
              <el-table
                :data="datalist"
                style="width: 100%"
                border
                :row-class-name="tableRowClassName"
	              :row-style="selectedstyle"
                :header-cell-style="{color:'#333333'}"
                @current-change="handleSelectionChange"
              >
                <el-table-column prop="id" label="项目编号" width="250"></el-table-column>
                <el-table-column prop="group_name" label="项目名称" width="250"></el-table-column>
                <el-table-column prop="group_logic" label="筛选逻辑" width="300"></el-table-column>
                <el-table-column prop="group_time" label="创建时间" width="250"></el-table-column>
                <el-table-column prop="group_username" label="创建人" width="250"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination style="margin-left:30%"
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
            <el-select placeholder="请选择" size="small" v-model="type" style="width:300px" >
              <el-option v-for="(item,index)  in choose" :key="index" :value="index" :label="item">{{item}}</el-option>
            </el-select>
          </div>
          <div v-show="this.type == 1">
            <i class="iconfont iconbuzhou-xian1"></i>
            <span>选择淋巴瘤亚型 ：</span>
            <el-select placeholder="请选择" size="small" v-model="dignosis" style="width:400px" >
              <el-option v-for="(item,index) in chooses" :key="index" :value="item">{{item}}</el-option>
            </el-select>
          </div>
        </div>
        <div class="echarts">
          <div class="btns">
            <el-button :class="{showBtns:sexShow}" plain @click="drawLineSex(sex)">性别</el-button >
            <el-button :class="{showBtns:address_provShow}" plain @click="drawLineAddress_prov(address_prov)">居住地</el-button >
            <el-button :class="{showBtns:ageShow}" plain @click="drawLineAge(age)">年龄</el-button >
            <el-button :class="{showBtns:birthplaceShow}" plain @click="drawLineBirthPlace(birthplace)">籍贯</el-button >
            <el-button :class="{showBtns:sample_typeShow}" plain @click="drawLineSample_type(sample_type)">标本类型</el-button >
            <el-button :class="{showBtns:sample_locationShow}" plain @click="drawLineSample_location(sample_location)">取材部位</el-button >
            <el-button :class="{showBtns:mark1Show}" plain @click="drawLineJ_Check(mark)">生物标记物检测率</el-button >
            <el-button :class="{showBtns:mark2Show}" plain @click="drawLineY_Check(mark)">生物标记物阳性率</el-button >
            <el-button :class="{showBtns:diff_dayShow}" plain @click="drawLineDiff_day(diff_day)">诊断时长</el-button >
            <el-button :class="{showBtns:bingShow}" v-show="this.type == 0" plain @click="drawLineDia()" >各个病理类型分布</el-button >
            <!--@click="drawLineDia()" -->
          </div>
          <div id="tu"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "./js/echarts.js";
import echarts from "echarts";
import './js/china.js'
import './js/check'
import './js/util'

export default {
  data() {
    return {   
      getIndex:"",  //点击列表行
			//控制按钮显示隐藏-----
			sexShow:false,
			ageShow:false,
			birthplaceShow:false,
			address_provShow:false,
			sample_typeShow:false,
			sample_locationShow:false,
			mark1Show:false,
			mark2Show:false,
			diff_dayShow:false,
			bingShow:false,
			
			//--------------------
			
      dignosis:'',
      diagnosis2:'diagnosis2',
      ly_helper_diagnosis:'ly_helper_diagnosis',
      type:'',    //选择分析
      group_name:'',    //创建人
      row:'',   //缓存的row
      sex:'sex',
      age:'age',
      birthplace:'birthplace',
      address_prov:'address_prov',
      sample_type:'sample_type',
      sample_location:'sample_location',
      diff_day:'diff_day',
      mark:'mark',
      group_id: "", //分组id
      id: "", //分组ID
      dignosis1: "",
      dignosis2: "",
      // 选择分析选项
      choose: [
        "淋巴瘤整体临床病理特征相关分析",
        "淋巴瘤各个病理类型临床病理特征相关分析"
      ],
      chooses: [],
      activeNames: ["1"],
      datalist: [], //数据集数组
      peopleList:[],   //创建人数组
      chartsData: [], //图表数据
      options: [
        {
          value: '前驱淋巴性肿瘤',
          label: '前驱淋巴性肿瘤',
          children: 
            [{
            value: 'B淋巴母细胞白血病/淋巴瘤，非特殊类型',
            label: 'B淋巴母细胞白血病/淋巴瘤，非特殊类型'
            },{
            value: 'B淋巴母细胞白血病/淋巴瘤伴重现性遗传学异常',
            label: 'B淋巴母细胞白血病/淋巴瘤伴重现性遗传学异常',
            children: 
              [{            
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
              value: 'B淋巴母细胞白血病/淋巴瘤伴亚二倍体',
              label: 'B淋巴母细胞白血病/淋巴瘤伴亚二倍体'
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
              }]
            },{
            value: 'T淋巴母细胞白血病/淋巴瘤',
            label: 'T淋巴母细胞白血病/淋巴瘤',
            children: 
              [{
              value: '早期T细胞前驱淋巴母细胞白血病',
              label: '早期T细胞前驱淋巴母细胞白血病'
              }]
            },{
            value: 'NK淋巴母细胞白血病/淋巴瘤',
            label: 'NK淋巴母细胞白血病/淋巴瘤'
            }]
        },
        {
          value: '成熟B细胞淋巴瘤',
          label: '成熟B细胞淋巴瘤',
          children: 
            [{
            value: '慢性淋巴细胞白血病/小淋巴细胞淋巴瘤',
            label: '慢性淋巴细胞白血病/小淋巴细胞淋巴瘤',
            children: 
              [{
              value: '单克隆B淋巴细胞增多症',
              label: '单克隆B淋巴细胞增多症'
              }]
            },{
            value: 'B细胞前淋巴细胞白血病',
            label: 'B细胞前淋巴细胞白血病'
            },{
            value: '脾边缘区细胞淋巴瘤',
            label: '脾边缘区细胞淋巴瘤'
            },{
            value: '毛细胞白血病',
            label: '毛细胞白血病'
            },{
            value: '脾B细胞淋巴瘤/白血病，不能分类',
            label: '脾B细胞淋巴瘤/白血病，不能分类',
            children: 
              [{
              value: '脾弥漫性红髓小B细胞淋巴瘤',
              label: '脾弥漫性红髓小B细胞淋巴瘤'
              },{
              value: '毛细胞白血病变异型',
              label: '毛细胞白血病变异型'
              }]
            },{
            value: '淋巴浆细胞淋巴瘤',
            label: '淋巴浆细胞淋巴瘤'
            },{
            value: '意义不明的单克隆丙种球蛋白病，IgM型',
            label: '意义不明的单克隆丙种球蛋白病，IgM型'
            },{
            value: '重链病',
            label: '重链病',
            children: 
            [{
              value: 'μ重链病',
              label: 'μ重链病'
              },{
              value: 'γ重链病',
              label: 'γ重链病'
              },{
              value: 'α重链病',
              label: 'α重链病'
            }]
            },{
            value: '浆细胞肿瘤',
            label: '浆细胞肿瘤',
            children: 
              [{                 
              value: '意义不明的单克隆丙种球蛋白病，非IgM型',
              label: '意义不明的单克隆丙种球蛋白病，非IgM型'
              },{
              value: '浆细胞骨髓瘤',
              label: '浆细胞骨髓瘤'
              },{
              value: '浆细胞骨髓瘤变异型（无症状型、非分泌型、浆细胞白血病）',
              label: '浆细胞骨髓瘤变异型（无症状型、非分泌型、浆细胞白血病）'
              },{
              value: '浆细胞瘤（骨孤立性浆细胞瘤、骨外浆细胞瘤）',
              label: '浆细胞瘤（骨孤立性浆细胞瘤、骨外浆细胞瘤）'
              },{
              value: '单克隆免疫球蛋白沉积症（原发性淀粉样变、轻链和重链沉积病）',
              label: '单克隆免疫球蛋白沉积症（原发性淀粉样变、轻链和重链沉积病）'
              },{
              value: '浆细胞肿瘤伴副肿瘤综合征（POEMS综合征、TEMPI综合征）',
              label: '浆细胞肿瘤伴副肿瘤综合征（POEMS综合征、TEMPI综合征）'
              }]
            },{
            value: '黏膜相关淋巴组织结外边缘区淋巴瘤',
            label: '黏膜相关淋巴组织结外边缘区淋巴瘤'
            },{
            value: '淋巴结边缘区淋巴瘤',
            label: '淋巴结边缘区淋巴瘤',
            children: 
              [{   
              value: '儿童淋巴结边缘区淋巴瘤',
              label: '儿童淋巴结边缘区淋巴瘤'
              }]    
            },{
            value: '滤泡性淋巴瘤',
            label: '滤泡性淋巴瘤',
            children:
              [{
              value: '睾丸滤泡性淋巴瘤',
              label: '睾丸滤泡性淋巴瘤'
              },{
              value: '原位滤泡性肿瘤',
              label: '原位滤泡性肿瘤'
              },{
              value: '十二指肠型滤泡性淋巴瘤',
              label: '十二指肠型滤泡性淋巴瘤'
              }]
            },{
            value: '儿童型滤泡性淋巴瘤',
            label: '儿童型滤泡性淋巴瘤'
            },{
            value: '伴IRF4重排大B细胞淋巴瘤',
            label: '伴IRF4重排大B细胞淋巴瘤'
            },{
            value: '原发皮肤滤泡中心淋巴瘤',
            label: '原发皮肤滤泡中心淋巴瘤'
            },{
            value: '套细胞淋巴瘤',
            label: '套细胞淋巴瘤',
            children:
              [{
              value: '白血病样非结节性套细胞淋巴瘤',
              label: '白血病样非结节性套细胞淋巴瘤'
              },{
              value: '原位套细胞肿瘤',
              label: '原位套细胞肿瘤'
              }]
            },{
            value: '弥漫性大B细胞淋巴瘤，非特指型',
            label: '弥漫性大B细胞淋巴瘤，非特指型',
            children:
              [{
              value: '生发中心亚型',
              label: '生发中心亚型'
              },{
              value: '活化B细胞亚型',
              label: '活化B细胞亚型'
              }]
            },{
            value: 'T细胞/组织细胞丰富的大B细胞淋巴瘤',
            label: 'T细胞/组织细胞丰富的大B细胞淋巴瘤'
            },{
            value: '原发中枢神经系统弥漫性大B细胞淋巴瘤',
            label: '原发中枢神经系统弥漫性大B细胞淋巴瘤'
            },{
            value: '原发皮肤弥漫性大B细胞淋巴瘤，腿型',
            label: '原发皮肤弥漫性大B细胞淋巴瘤，腿型'
            },{
            value: 'EBV阳性弥漫性大B细胞淋巴瘤，非特指型',
            label: 'EBV阳性弥漫性大B细胞淋巴瘤，非特指型'
            },{
            value: 'EBV阳性皮肤黏膜溃疡',
            label: 'EBV阳性皮肤黏膜溃疡'
            },{
            value: '慢性炎症相关的弥漫性大B细胞淋巴瘤',
            label: '慢性炎症相关的弥漫性大B细胞淋巴瘤',
            children:
              [{
              value: '纤维素相关弥漫性大B细胞淋巴瘤',
              label: '纤维素相关弥漫性大B细胞淋巴瘤' 
              }]             
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
            value: 'HHV8相关淋巴组织增殖性疾病',
            label: 'HHV8相关淋巴组织增殖性疾病',
            children:
              [{    
              value: '多中心Castleman病',
              label: '多中心Castleman病'
              },{
              value: 'HHV8阳性弥漫性大B细胞淋巴瘤，非特指型',
              label: 'HHV8阳性弥漫性大B细胞淋巴瘤，非特指型'
              },{
              value: 'HHV8阳性亲生发中心淋巴组织增殖性疾病',
              label: 'HHV8阳性亲生发中心淋巴组织增殖性疾病'
              }]
            },{
            value: 'Burkitt淋巴瘤',
            label: 'Burkitt淋巴瘤'
            },{
            value: '伴11q异常的Burkitt样淋巴瘤',
            label: '伴11q异常的Burkitt样淋巴瘤'
            },{
            value: '高级别B细胞淋巴瘤',
            label: '高级别B细胞淋巴瘤',
            children:
              [{      
              value: '高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排',
              label: '高级别B细胞淋巴瘤，伴MYC和BCL2和（或）BCL6重排'
              },{
              value: '高级别B细胞淋巴瘤，非特指型',
              label: '高级别B细胞淋巴瘤，非特指型'
              }]
            },{
            value: '特征介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤',
            label: '特征介于DLBCL和经典霍奇金淋巴瘤之间的不能分类的B细胞淋巴瘤'
            }]
        },
        {
          value: '成熟T和NK细胞淋巴瘤',
          label: '成熟T和NK细胞淋巴瘤',
          children: 
            [{
            value: 'T细胞前淋巴细胞白血病',
            label: 'T细胞前淋巴细胞白血病'
            },{
            value: 'T细胞大颗粒淋巴细胞白血病',
            label: 'T细胞大颗粒淋巴细胞白血病'
            },{
            value: '慢性NK细胞淋巴增殖性疾病',
            label: '慢性NK细胞淋巴增殖性疾病'
            },{
            value: '侵袭性NK细胞白血病',
            label: '侵袭性NK细胞白血病'
            },{
            value: '儿童EBV阳性T细胞和NK细胞淋巴组织增殖性疾病',
            label: '儿童EBV阳性T细胞和NK细胞淋巴组织增殖性疾病',
            children: 
              [{                        
              value: '儿童系统性EBV阳性T细胞淋巴瘤',
              label: '儿童系统性EBV阳性T细胞淋巴瘤'
              },{
              value: '系统性慢性活动性EBV感染，T细胞和NK细胞型',
              label: '系统性慢性活动性EBV感染，T细胞和NK细胞型'
              },{
              value: '种痘水疱病样淋巴组织增殖性疾病',
              label: '种痘水疱病样淋巴组织增殖性疾病'
              },{
              value: '严重蚊虫叮咬过敏症',
              label: '严重蚊虫叮咬过敏症'
              }]
            },{
            value: '成人T细胞白血病/淋巴瘤',
            label: '成人T细胞白血病/淋巴瘤'
            },{
            value: '结外NK/T细胞淋巴瘤，鼻型',
            label: '结外NK/T细胞淋巴瘤，鼻型'
            },{
            value: '肠道T细胞淋巴瘤',
            label: '肠道T细胞淋巴瘤',
            children: 
              [{
              value: '单形性亲上皮性肠道T细胞淋巴瘤',
              label: '单形性亲上皮性肠道T细胞淋巴瘤'
              },{
              value: '肠病相关性T细胞淋巴瘤',
              label: '肠病相关性T细胞淋巴瘤'
              },{
              value: '肠道T细胞淋巴瘤，非特指型',
              label: '肠道T细胞淋巴瘤，非特指型'
              },{
              value: '胃肠道惰性T细胞淋巴组织增殖性疾病',
              label: '胃肠道惰性T细胞淋巴组织增殖性疾病'
              }]
            },{
            value: '肝脾T细胞淋巴瘤',
            label: '肝脾T细胞淋巴瘤'
            },{
            value: '皮下脂膜炎样T细胞淋巴瘤',
            label: '皮下脂膜炎样T细胞淋巴瘤'
            },{
            value: '蕈样霉菌病',
            label: '蕈样霉菌病'
            },{
            value: 'Sezary综合征',
            label: 'Sezary综合征'
            },{
            value: '原发性皮肤CD30阳性T细胞淋巴组织增殖性疾病',
            label: '原发性皮肤CD30阳性T细胞淋巴组织增殖性疾病',
            children: 
              [{
              value: '淋巴瘤样丘疹病',
              label: '淋巴瘤样丘疹病'
              },{
              value: '原发性皮肤间变性大细胞淋巴瘤',
              label: '原发性皮肤间变性大细胞淋巴瘤'
              }]
            },{
            value: '原发性皮肤外周T细胞淋巴瘤罕见亚型',
            label: '原发性皮肤外周T细胞淋巴瘤罕见亚型',
            children:           
              [{
              value: '原发性皮肤γδT细胞淋巴瘤',
              label: '原发性皮肤γδT细胞淋巴瘤'
              },{
              value: '原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤',
              label: '原发性皮肤CD8阳性侵袭性嗜表皮性细胞毒性T细胞淋巴瘤'
              },{
              value: '原发性皮肤肢端CD8阳性T细胞淋巴瘤',
              label: '原发性皮肤肢端CD8阳性T细胞淋巴瘤'
              },{
              value: '原发性皮肤CD4阳性小/中等大小T细胞淋巴组织增殖性疾病',
              label: '原发性皮肤CD4阳性小/中等大小T细胞淋巴组织增殖性疾病'
              }]
            },{
            value: '外周T细胞淋巴瘤，非特指型',
            label: '外周T细胞淋巴瘤，非特指型'
            },{
            value: '血管免疫母细胞性T细胞淋巴瘤及其他淋巴结滤泡辅助T细胞来源的淋巴瘤',
            label: '血管免疫母细胞性T细胞淋巴瘤及其他淋巴结滤泡辅助T细胞来源的淋巴瘤',
            children:           
              [{
              value: '血管免疫母细胞性T细胞淋巴瘤',
              label: '血管免疫母细胞性T细胞淋巴瘤'
              },{
              value: '滤泡T细胞淋巴瘤',
              label: '滤泡T细胞淋巴瘤'
              },{
              value: '淋巴结外周T细胞淋巴瘤伴滤泡辅助T细胞表型',
              label: '淋巴结外周T细胞淋巴瘤伴滤泡辅助T细胞表型'
              }]
            },{
            value: '间变性大细胞淋巴瘤，ALK阳性',
            label: '间变性大细胞淋巴瘤，ALK阳性'
            },{
            value: '间变性大细胞淋巴瘤，ALK阴性',
            label: '间变性大细胞淋巴瘤，ALK阴性'
            },{
            value: '乳房植入物相关的间变性大细胞淋巴瘤',
            label: '乳房植入物相关的间变性大细胞淋巴瘤'
            }]
        },
        {
          value: '霍奇金淋巴瘤',
          label: '霍奇金淋巴瘤',
          children:
            [{
            value: '结节性淋巴细胞为主型霍奇金淋巴瘤',
            label: '结节性淋巴细胞为主型霍奇金淋巴瘤'
            },{
            value: '经典型霍奇金淋巴瘤',
            label: '经典型霍奇金淋巴瘤',
            children:
              [{
              value: '结节硬化型',
              label: '结节硬化型'
              },{
              value: '富于淋巴细胞型',
              label: '富于淋巴细胞型'
              },{
              value: '混合细胞型',
              label: '混合细胞型'
              },{
              value: '淋巴细胞消减型',
              label: '淋巴细胞消减型'
              }]
            }]
        },
        {
          value: '淋巴瘤',
          label: '淋巴瘤'
        },
        {
          value: '非霍奇金淋巴瘤',
          label: '非霍奇金淋巴瘤'
        },
        {
          value: '非典型增生',
          label: '非典型增生'
        },
        {
          value: '其他恶性肿瘤',
          label: '其他恶性肿瘤'
        },
        {
          value: '无明确诊断结论',
          label: '无明确诊断结论'
        }
		  ],
      // 分页器
      queryInfo: {
        page: 1, //页数
        pagerows: 10, //每页显示的条数
        count: 0 //数据总数
      },
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.getDataList();
      // this.drawLineSex();    //饼图
      // this.drawLineAge();      //柱状图
      // // this.drawLineBirthPlace();    //
      // // this.drawLineAddress_prov();  //
      // this.drawLineSample_type();     //饼图
      // this.drawLineSample_location(); //饼图
      // this.drawLineDiff_day();        //柱状图
      this.get();
    });

  },
  methods: {
    // 点击表格行背景色
    selectedstyle ({row, rowIndex}) {
      console.log('rowIndex',rowIndex,'this.getIndex',this.getIndex)
      if ((this.getIndex) === rowIndex ) {
        return {
        "background-color": "#C1C1C1"
        };
      }
    },
    tableRowClassName ({row, rowIndex}) {
      row.index = rowIndex;
    },
		//控制显示的公用方法
		buttonsShowCon(){
			this.sexShow=false;
			this.ageShow=false;
			this.birthplaceShow=false;
			this.address_provShow=false;
			this.sample_typeShow=false;
			this.sample_locationShow=false;
			this.mark1Show=false;
			this.mark2Show=false;
			this.diff_dayShow=false;
			this.bingShow=false;
		},
    // 点击获取创建人姓名
    getName(){    
      const res = this.axios.get('group/list.php',{params:{group_username:this.group_name}}).then( res => {
        console.log(res.data)
        this.datalist = res.data.data;
        this.queryInfo.page = parseInt(res.data.page);
        this.queryInfo.count = parseInt(res.data.count); //总条数
        this.queryInfo.pagerows = res.data.pagerows; //每页显示多少条
        console.log(this.queryInfo.count)
      })
    }, 
    // 分组删除
    del(row) {
      this.$confirm("确定删除该数据？是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(async () => {
          const { data: res } = await this.axios.get("group/del.php", {
            params: { id: row.id }
          });
          console.log(res);
          this.getDataList();
          this.groupname = ''
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
    // 病理号切换每页显示多少条
    handleSizeChange(newSize) {
      this.queryInfo.pagerows = newSize;
      this.getDataList();
    },
    // 病理号点击页数
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage;
      this.getDataList();
    },
    // 点击列表行
    handleSelectionChange(row) {
      this.getIndex=row.index
      this.id = row.id;
      console.log(row);
      return this.id;
      this.row = row
    },
    // 点击编辑获取ID
    chakan(row) {
      // console.log(row.id)
      let group_id = row.id;
      console.log(group_id);
    },
    get() {
      this.options.map((item, index) => {
        console.log(item);
        if(item.children){
            item.children.map((it, index) => {
            console.log(it);
            this.chooses.push(it.value);
          });
        }
      });
    },
    // 获取数据集列表
    async getDataList() {
      const { data: res } = await this.axios.get("group/list.php");
      this.datalist = res.data;
      // console.log(this.datalist )
      this.peopleList = this.datalist 
      console.log(this.peopleList);
      this.queryInfo.page = parseInt(res.page);
      this.queryInfo.count = parseInt(res.count); //总条数
      this.queryInfo.pagerows = res.pagerows; //每页显示多少条
    },
    // 性别--饼图
    async drawLineSex(sex,id) {  
			if(sex!=null){
				//说明是按钮点击的
				this.buttonsShowCon();
				this.sexShow=true;
			}
      console.log(this.sex)
      console.log(this.id)
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      let field = "";
      if(this.type == 0){
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=sex"
        "group/stat.php",{params:{group_id:this.id,field:this.sex,type:this.type+1}}
        );
        let datas = res.stat;
        console.log(datas)

        setEChart_pieWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "性别"
        });
      }else{
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=sex"
        "group/stat.php",{params:{group_id:this.id,field:this.sex,type:this.type+1,dignosis:this.dignosis}}
        );
        let datas = res.stat;
        console.log(datas)

         setEChart_pieWithTool({
        myChart: myChart,
        dataEcharts: datas,
        title: "性别"
      });
      }
      
     
      /**
       * @description EChart -带有工具栏的饼状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.data 待分析的源数据
       * @param {string} param.type 分析项（英文名称）
       * @param {string} param.title 表格title名称
       */
      function setEChart_pieWithTool(param) {
        let myChart = param.myChart,
          data = param.dataEcharts,
          title = param.title;
        // console.log(myChart, data, title);
        myChart = echarts.init(document.getElementById("tu"), "macarons");
        //处理后的数据
        let nameArray = [];
        let result = [];
        //一个分析维度
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let propName = ""; //属性名
          for (name in item) {
            //为nameArray赋值
            if (name != "value") {
              //此处value属性固定
              nameArray.push(item[name]);
              propName = name;
            }
          }
          result.push({
            name: item[propName],
            value: item.value
          });
        }
        // console.log("饼图数据处理：", result);
        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            //工具栏
            show: true,
            itemSize: 20, //工具栏icon大小
            feature: {
              //配置项
              myTool2: {
                //工具项-自定义方法
                show: true,
                title: "切换为柱状图",
                icon:
                  "path://M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
                // onclick: function () {
                //   setEChart_bar('barWithTool');
                // }
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
          legend: {
            type: "scroll",
            orient: "vertical",
            left: "left",
            data: nameArray
          },
          series: [
            {
              // name: chooseFieldName,     //中文名称，此处使用了common.js中的全局变量
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: result,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        // if (showLog) console.log('option:', option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }

    },
    // 年龄--柱状图
    async drawLineAge(age,id) {
			this.buttonsShowCon();
			this.ageShow=true;
			
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.sgetElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      if(this.type == 0){
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=age"
        "group/stat.php",{params:{group_id:this.id,field:this.age,type:this.type+1}}
        );
        let datas = res.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "年龄"
        });
      }else{
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=age"
        "group/stat.php",{params:{group_id:this.id,field:this.age,dignosis:this.dignosis,type:this.type+1}}
        );
        let datas = res.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "年龄"
        });
      }
      /**
       * @description EChart -带有工具栏的柱状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.dataEcharts 待分析的源数据
       * @param {string} [param.type] 分析项（英文名称） 可选
       * @param {string} param.title 表格title名称
       */
      function setEChart_barWithTool(param) {
        let myChart = param.myChart,
          dataEcharts = param.dataEcharts,
          type = param.type,
          title = param.title;
        // console.log("setEChart_barWithTool-param:", param);
        //处理后的数据
        let nameArray = [];
        let valueArray = [];

        //X轴、Y轴名称
        // let xAxisText = getAxisName(type)[0];
        // let yAxisText = getAxisName(type)[1];
        let xAxisText = "年龄";
        let yAxisText = "数值";

        //一个分析维度
        // console.log("myChart:", myChart);
        // console.log("dataEcharts:", dataEcharts);

        for (let i = 0; i < dataEcharts.length; i++) {
          let item = dataEcharts[i];
          for (name in item) {
            if (name == "value") {
              //此处value属性固定
              valueArray.push(item[name]);
            } else {
              nameArray.push(item[name]);
            }
          }
        }

        // console.log("dataEcharts:", dataEcharts);
        // console.log("nameArray:", nameArray);
        // console.log("valueArray:", valueArray);

        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          tooltip: {
            //提示框组件
            trigger: "axis", //触发类型：axis-坐标轴触发
            formatter: xAxisText + ":{b0}<br />" + yAxisText + ":{c0}",
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
          toolbox: {
            //工具栏
            show: true,
            itemSize: 20, //工具栏icon大小
            feature: {
              //配置项
              dataZoom: {
                //工具项*2 - 缩放
                show: true,
                yAxisIndex: false
              },
              myTool1: {
                //工具项-自定义方法
                show: true,
                title: "切换为饼图",
                icon:
                  "path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z",
                // onclick: function() {
                //   // alert('myToolHandler1');
                //   // setEChart_line(myChart, dataEcharts);
                //   // setEChart('pieWithTool')
                  
                // }
              },
              magicType: {
                //多个工具项-动态视图类型切换的选项
                show: true,
                type: ["line", "bar",'pie']
              },
              dataView: {
                //工具项-原始数据展示
                show: true,
                readOnly: true, //是否只读，可编辑的情况下，点击刷新会改变视图
                // lang: ['数据视图1', '关闭'], //原始数据视图下的话术：标题、按钮文字
                buttonColor: "#337ab7", //原始数据视图下的按钮颜色
                //自定义数据展示函数 - 更换为表格后会替代textarea，此时不可编辑数据，且数据无法复制
                optionToContent: function(opt) {
                  var axisData = opt.xAxis[0].data;
                  var series = opt.series;
                  var table =
                    '<table   border="1" bordercolor="gray" cellpadding="10" cellspacing="0" scroll style="width:50%;text-align:center;margin-left:300px"><thead><tr>' +
                    "<th>" +
                    xAxisText +
                    "</th>" +
                    "<th>" +
                    yAxisText +
                    "</th>" +
                    // + '<th>' + series[1].name + '</th>'
                    "</tr></thead><tbody>";

                  for (var i = 0, l = axisData.length; i < l; i++) {
                    table +=
                      "<tr>" +
                      "<td>" +
                      axisData[i] +
                      "</td>" +
                      "<td>" +
                      series[0].data[i] +
                      "</td>" +
                      // + '<td>' + series[1].data[i] + '</td>'
                      "</tr>";
                  }
                  table += "</tbody></table>";
                  return table;
                }
              },
              restore: { show: true }, //工具项-还原
              saveAsImage: {
                //工具项-保存为图片
                show: true,
                name: "思睿分析图", //保存的文件名称
                // backgroundColor: '#fff',
                pixelRatio: 2 //分辨率倍数
              }
            }
          },
          legend: {
            //图例组件
            // data: ['人数']
            // itemGap: 5,
            // formatter: 'Legend',
            // selected:{
            //     "Legend":false
            // }
          },
          grid: {
            //直角坐标系内绘图网格
            top: "8%",
            left: "1%",
            right: "6%",
            bottom: "10%",
            containLabel: true //grid是否包含刻度标签
          },
          xAxis: {
            //直角坐标系 grid 中的 x 轴
            name: xAxisText,
            type: "category",
            data: nameArray
          },
          yAxis: {
            //直角坐标系 grid 中的 y 轴
            name: yAxisText,
            type: "value"
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
          ],
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              // name: yAxisText,
              type: "bar",
              smooth: 0.5, //折线平滑程度
              data: valueArray
            }
          ]
        };
        console.log("option:", option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    },
    // 籍贯--地图
    async drawLineBirthPlace(birthplace,id) {
			this.buttonsShowCon();
			this.birthplaceShow=true;
			
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      if(this.type == 0){
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=birthplace"
        "group/stat.php",{params:{group_id:this.id,field:this.birthplace,type:this.type+1}}
        );
        console.log(res);
        let datas = res.stat;
        setEChart_mapWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "籍贯"
        });
      }else{
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=birthplace"
        "group/stat.php",{params:{group_id:this.id,field:this.birthplace,dignosis:this.dignosis,type:this.type+1}}
        );
        console.log(res);
        let datas = res.stat;
        setEChart_mapWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "籍贯"
        });
      }
      
      /**
       * @description EChart -带有工具栏的地图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param {object} param.myChart 待更新的echarts对象
       * @param {object} param.data 待分析的源数据
       * @param {string} param.title 表格title名称
       */
      function setEChart_mapWithTool(param) {
        let myChart = param.myChart,
          data = param.dataEcharts,
          title = param.title;
        // if(showLog) 
        console.log('setEChart_barWithTool-param:', param);
        console.log(data);
        //处理后的数据
        let nameArray = [];
        // let valueArray = [];
        let result = [];

        let maxVal = getMapSplitData(data);
        console.log("maxVal:", maxVal);

        //一个分析维度
        for (let i = 0; i < data.length; i++) {
          // 每一个key  和value的值
          let item = data[i];
          // console.log(item)        
          let propName = ""; //属性名
          for (name in item) {
            //为nameArray赋值
            if (name != "value") {
              //此处value属性固定
              nameArray.push(item[name]);
              propName = name;   
              console.log(propName)
            }
            result.push({
            name: item[propName],
            value: item.value
          });
          }          
        }
        console.log("地图数据处理：", result);
        // console.log("地图数据处理：", nameArray);
        var optionMap = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          backgroundColor: "#FFFFFF",
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c}"
          },
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
                backgroundColor: "#fff",
                pixelRatio: 2 //分辨率倍数
              }
            }
          },
          xAxis: {
            show: false,         
          },
          yAxis: {
            show: false
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 20,
            bottom: 20,
            data: nameArray
          },
          //左侧小导航图标
          visualMap: {
            show: true,
            x: "left",
            y: "center",
            min: 0,
            max: maxVal,
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
          //配置属性
          series: [
            {
              // name: chooseFieldName,
              name: title,
              type: "map",
              mapType: "china",
              roam: true,
              label: {
                normal: {
                  show: true //省份名称
                },
                emphasis: {
                  show: false
                }
              },
              data: getEchartsNameMap(result) //数据              
            }
          ]
        };
        myChart.clear();
        myChart.setOption(optionMap, { notMerge: true });
      }

      /**
       * @description 根据data数据计算出当前地图的分组数据,返回最大值
       * @param {Array} data 对象数组，对象格式为：{name:'省份名',value:'number'}
       * @returns {number} 省份数据中的最大值
       */
      function getMapSplitData(data) {
        let maxVal = parseInt(data[0].value);

        for (let i = 0; i < data.length; i++) {
          maxVal =
            parseInt(data[i].value) > maxVal ? parseInt(data[i].value) : maxVal;
        }
        return maxVal;
      }

      /**
       * @description 获取Echarts地图的地名映射，根据传入的值返回符合Echarts地名的数据，并将无数据的省份添加value：0防止NaN的产生
       * @param {Array} data 对象数组，对象格式为：{name:'省份名',value:'number'}
       * @returns {Array} Echarts地图所需数据
       */
      function getEchartsNameMap(data) {
        //Echarts城市名称映射
        var ruleArray = [
          { key: "上海", value: ["上海", "上海"] },
          { key: "云南", value: ["云南", "云南省"] },
          { key: "北京", value: ["北京", "北京市"] },
          { key: "台湾", value: ["台湾", "台湾省"] },
          { key: "四川", value: ["四川", "四川省"] },
          { key: "宁夏", value: ["宁夏", "宁夏回族自治区", "宁夏自治区"] },
          { key: "山西", value: ["山西", "山西省"] },
          { key: "广东", value: ["广东", "广东省"] },
          { key: "广西", value: ["广西", "广西省"] },
          { key: "江苏", value: ["江苏", "江苏省"] },
          { key: "江西", value: ["江西", "江西省"] },
          { key: "河北", value: ["河北", "河北省"] },
          { key: "浙江", value: ["浙江", "浙江省"] },
          { key: "海南", value: ["海南", "海南省"] },
          { key: "福建", value: ["福建", "福建省"] },
          { key: "西藏", value: ["西藏", "西藏自治区"] },
          { key: "贵州", value: ["贵州", "贵州省"] },
          { key: "辽宁", value: ["辽宁", "辽宁省"] },
          { key: "陕西", value: ["陕西", "陕西省"] },
          { key: "青海", value: ["青海", "青海省"] },
          { key: "黑龙江", value: ["黑龙江", "黑龙江省"] },
          { key: "天津", value: ["天津", "天津市"] },
          { key: "重庆", value: ["重庆", "重庆市"] },
          { key: "河南", value: ["河南", "河南省"] },
          { key: "湖南", value: ["湖南", "湖南省"] },
          { key: "安徽", value: ["安徽", "安徽省"] },
          { key: "山东", value: ["山东", "山东省"] },
          { key: "新疆", value: ["新疆", "新疆维吾尔自治区"] },
          { key: "湖北", value: ["湖北", "湖北省"] },
          { key: "甘肃", value: ["甘肃", "甘肃省"] },
          { key: "内蒙古", value: ["内蒙古", "内蒙古自治区"] },
          { key: "吉林", value: ["吉林", "吉林省"] },
          { key: "香港", value: ["香港", "香港特别行政区"] },
          { key: "澳门", value: ["澳门", "澳门特别行政区"] },
          { key: "南海诸岛", value: ["南海诸岛", "南海"] },
          { key: "海外", value: ["海外"] }
        ];
        let result = [];
        for (let i = 0; i < ruleArray.length; i++) {
          let item = ruleArray[i];
          for (let j = 0; j < item.value.length; j++) {
            let itm = item.value[j];
            let flag = false;
            for (let k = 0; k < data.length; k++) {
              if (data[k].name == itm) {
                //匹配时，将其加入result数组
                result.push({ name: item.key, value: data[k].value });
                //优化循环次数：当数据已匹配完成时，将其从ruleArray和data中去除
                ruleArray.splice(i, 1);
                i--;
                data.splice(k, 1);
                k--;
                flag = true;
                break;
              }
            }
            if (flag) break; //优化循环次数
          }
        }

        //再次循环ruleArray，此时剩余的数据即为没有产生映射数据的省份，添加至result并设置值为0
        for (let i = 0; i < ruleArray.length; i++) {
          result.push({ name: ruleArray[i].key, value: 0 });
        }
        return result;
      }
    },
    // 居住地--地图
    async drawLineAddress_prov(address_prov,id) {
			this.buttonsShowCon();
			this.address_provShow=true;
			
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      if(this.type == 0){
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=address_prov"
        "group/stat.php",{params:{group_id:this.id,field:this.address_prov,type:this.type+1}}
        );
        let datas = res.stat;
        setEChart_mapWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "居住地"
        });
      }else{
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=address_prov"
        "group/stat.php",{params:{group_id:this.id,field:this.address_prov,dignosis:this.dignosis,type:this.type+1}}
        );
        let datas = res.stat;
        setEChart_mapWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "居住地"
        });
      }
      
      /**
       * @description EChart -带有工具栏的地图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.data 待分析的源数据
       * @param {string} param.title 表格title名称
       */
      function setEChart_mapWithTool(param) {
        let myChart = param.myChart,
          data = param.dataEcharts,
          title = param.title;
        // if(showLog)
        console.log("setEChart_barWithTool-param:", param);

        //处理后的数据
        let nameArray = [];
        // let valueArray = [];
        let result = [];

        let maxVal = getMapSplitData(data);
        console.log("maxVal:", maxVal);

        //一个分析维度
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let propName = ""; //属性名
          for (name in item) {
            //为nameArray赋值
            if (name != "value") {
              //此处value属性固定
              nameArray.push(item[name]);
              propName = name;
              console.log(name);
            }
            result.push({
              name: item[propName],
              value: item.value
            });
          }
        }
        console.log("地图数据处理：", result);

        var optionMap = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          backgroundColor: "#FFFFFF",
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c}"
          },
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
            }
          },
          xAxis: {
            show: false
          },
          yAxis: {
            show: false
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 20,
            bottom: 20,
            data: nameArray
          },

          //左侧小导航图标
          visualMap: {
            show: true,
            x: "left",
            y: "center",

            min: 0,
            max: maxVal,
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
          //配置属性
          series: [
            {
              // name: chooseFieldName,
              name: title,
              type: "map",
              mapType: "china",
              roam: true,
              label: {
                normal: {
                  show: true //省份名称
                },
                emphasis: {
                  show: false
                }
              },
              data: getEchartsNameMap(result) //数据
            }
          ]
        };
        myChart.clear();
        myChart.setOption(optionMap, { notMerge: true });
      }

      /**
       * @description 根据data数据计算出当前地图的分组数据,返回最大值
       * @param {Array} data 对象数组，对象格式为：{name:'省份名',value:'number'}
       * @returns {number} 省份数据中的最大值
       */
      function getMapSplitData(data) {
        console.log(data);
        let maxVal = parseInt(data[0].value);
        for (let i = 0; i < data.length; i++) {
          maxVal =
            parseInt(data[i].value) > maxVal ? parseInt(data[i].value) : maxVal;
        }
        return maxVal;
      }

      /**
       * @description 获取Echarts地图的地名映射，根据传入的值返回符合Echarts地名的数据，并将无数据的省份添加value：0防止NaN的产生
       * @param {Array} data 对象数组，对象格式为：{name:'省份名',value:'number'}
       * @returns {Array} Echarts地图所需数据
       */
      function getEchartsNameMap(data) {
        //Echarts城市名称映射
        var ruleArray = [
          { key: "上海", value: ["上海", "上海"] },
          { key: "云南", value: ["云南", "云南省"] },
          { key: "北京", value: ["北京", "北京市"] },
          { key: "台湾", value: ["台湾", "台湾省"] },
          { key: "四川", value: ["四川", "四川省"] },
          { key: "宁夏", value: ["宁夏", "宁夏回族自治区", "宁夏自治区"] },
          { key: "山西", value: ["山西", "山西省"] },
          { key: "广东", value: ["广东", "广东省"] },
          { key: "广西", value: ["广西", "广西省"] },
          { key: "江苏", value: ["江苏", "江苏省"] },
          { key: "江西", value: ["江西", "江西省"] },
          { key: "河北", value: ["河北", "河北省"] },
          { key: "浙江", value: ["浙江", "浙江省"] },
          { key: "海南", value: ["海南", "海南省"] },
          { key: "福建", value: ["福建", "福建省"] },
          { key: "西藏", value: ["西藏", "西藏自治区"] },
          { key: "贵州", value: ["贵州", "贵州省"] },
          { key: "辽宁", value: ["辽宁", "辽宁省"] },
          { key: "陕西", value: ["陕西", "陕西省"] },
          { key: "青海", value: ["青海", "青海省"] },
          { key: "黑龙江", value: ["黑龙江", "黑龙江省"] },
          { key: "天津", value: ["天津", "天津市"] },
          { key: "重庆", value: ["重庆", "重庆市"] },
          { key: "河南", value: ["河南", "河南省"] },
          { key: "湖南", value: ["湖南", "湖南省"] },
          { key: "安徽", value: ["安徽", "安徽省"] },
          { key: "山东", value: ["山东", "山东省"] },
          { key: "新疆", value: ["新疆", "新疆维吾尔自治区"] },
          { key: "湖北", value: ["湖北", "湖北省"] },
          { key: "甘肃", value: ["甘肃", "甘肃省"] },
          { key: "内蒙古", value: ["内蒙古", "内蒙古自治区"] },
          { key: "吉林", value: ["吉林", "吉林省"] },
          { key: "香港", value: ["香港", "香港特别行政区"] },
          { key: "澳门", value: ["澳门", "澳门特别行政区"] },
          { key: "南海诸岛", value: ["南海诸岛", "南海"] },
          { key: "海外", value: ["海外"] }
        ];
        let result = [];
        for (let i = 0; i < ruleArray.length; i++) {
          let item = ruleArray[i];
          for (let j = 0; j < item.value.length; j++) {
            let itm = item.value[j];
            let flag = false;
            for (let k = 0; k < data.length; k++) {
              if (data[k].name == itm) {
                //匹配时，将其加入result数组
                result.push({ name: item.key, value: data[k].value });
                //优化循环次数：当数据已匹配完成时，将其从ruleArray和data中去除
                ruleArray.splice(i, 1);
                i--;
                data.splice(k, 1);
                k--;
                flag = true;
                break;
              }
            }
            if (flag) break; //优化循环次数
          }
        }

        //再次循环ruleArray，此时剩余的数据即为没有产生映射数据的省份，添加至result并设置值为0
        for (let i = 0; i < ruleArray.length; i++) {
          result.push({ name: ruleArray[i].key, value: 0 });
        }
        return result;
      }
    },
    // 标本类型--饼图
    async drawLineSample_type(sample_type,id) {
			this.buttonsShowCon();
			this.sample_typeShow=true;
			
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      if(this.type == 0){
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=sample_type"
        "group/stat.php",{params:{group_id:this.id,field:this.sample_type,type:this.type+1}}
        );
        let datas = res.stat;
        setEChart_pieWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "标本类型"
        });
      }else{
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=sample_type"
        "group/stat.php",{params:{group_id:this.id,field:this.sample_type,dignosis:this.dignosis,type:this.type+1}}
        );
        let datas = res.stat;
        setEChart_pieWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "标本类型"
        });
      }
      
      /**
       * @description EChart -带有工具栏的饼状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.data 待分析的源数据
       * @param {string} param.type 分析项（英文名称）
       * @param {string} param.title 表格title名称
       */
      function setEChart_pieWithTool(param) {
        let myChart = param.myChart,
          data = param.dataEcharts,
          title = param.title;
        console.log(myChart, data, title);
        myChart = echarts.init(document.getElementById("tu"), "macarons");
        //处理后的数据
        let nameArray = [];
        let result = [];
        //一个分析维度
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let propName = ""; //属性名
          for (name in item) {
            //为nameArray赋值
            if (name != "value") {
              //此处value属性固定
              nameArray.push(item[name]);
              propName = name;
            }
          }
          result.push({
            name: item[propName],
            value: item.value
          });
        }
        console.log("饼图数据处理：", result);
        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            //工具栏
            show: true,
            itemSize: 20, //工具栏icon大小
            feature: {
              //配置项
              myTool2: {
                //工具项-自定义方法
                show: true,
                title: "切换为柱状图",
                icon:
                  "path://M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
                onclick: function() {
                  setEChart("barWithTool");
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
          legend: {
            type: "scroll",
            orient: "vertical",
            left: "left",
            data: nameArray
          },
          series: [
            {
              // name: chooseFieldName,     //中文名称，此处使用了common.js中的全局变量
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: result,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        // if (showLog) console.log('option:', option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    },
    // 取材部位--饼图
    async drawLineSample_location(sample_location,id) {
			this.buttonsShowCon();
			this.sample_locationShow=true;
			
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      if(this.type == 0){
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=sample_location"
        "group/stat.php",{params:{group_id:this.id,field:this.sample_location,type:this.type+1}}
        );
        let datas = res.stat;
        setEChart_pieWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "取材部位"
        });
      }else{
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=sample_location"
        "group/stat.php",{params:{group_id:this.id,field:this.sample_location,dignosis:this.dignosis,type:this.type+1}}
        );
        let datas = res.stat;
        setEChart_pieWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "取材部位"
        });
      }
      
      /**
       * @description EChart -带有工具栏的饼状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.data 待分析的源数据
       * @param {string} param.type 分析项（英文名称）
       * @param {string} param.title 表格title名称
       */
      function setEChart_pieWithTool(param) {
        let myChart = param.myChart,
          data = param.dataEcharts,
          title = param.title;
        console.log(myChart, data, title);
        myChart = echarts.init(document.getElementById("tu"), "macarons");
        //处理后的数据
        let nameArray = [];
        let result = [];
        //一个分析维度
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let propName = ""; //属性名
          for (name in item) {
            //为nameArray赋值
            if (name != "value") {
              //此处value属性固定
              nameArray.push(item[name]);
              propName = name;
            }
          }
          result.push({
            name: item[propName],
            value: item.value
          });
        }
        console.log("饼图数据处理：", result);
        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            //工具栏
            show: true,
            itemSize: 20, //工具栏icon大小
            feature: {
              //配置项
              myTool2: {
                //工具项-自定义方法
                show: true,
                title: "切换为柱状图",
                icon:
                  "path://M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
                onclick: function() {
                  setEChart("barWithTool");
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
          legend: {
            type: "scroll",
            orient: "vertical",
            left: "left",
            data: nameArray
          },
          series: [
            {
              // name: chooseFieldName,     //中文名称，此处使用了common.js中的全局变量
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: result,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        // if (showLog) console.log('option:', option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    },
    // 诊断时长--柱状图
    async drawLineDiff_day(diff_day,id) {
			this.buttonsShowCon();
			this.diff_dayShow=true;
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      if(this.type == 0){
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=diff_day"
        "group/stat.php",{params:{group_id:this.id,field:this.diff_day,type:this.type+1}}
 
        );
        let datas = res.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "诊断时长"
        });
      }else{
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=diff_day"
        "group/stat.php",{params:{group_id:this.id,field:this.diff_day,dignosis:this.dignosis,type:this.type+1}}
 
        );
        let datas = res.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "诊断时长"
        });
      }
      
      /**
       * @description EChart -带有工具栏的柱状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.dataEcharts 待分析的源数据
       * @param {string} [param.type] 分析项（英文名称） 可选
       * @param {string} param.title 表格title名称
       */
      function setEChart_barWithTool(param) {
        let myChart = param.myChart,
          dataEcharts = param.dataEcharts,
          type = param.type,
          title = param.title;
        console.log("setEChart_barWithTool-param:", param);
        //处理后的数据
        let nameArray = [];
        let valueArray = [];

        //X轴、Y轴名称
        // let xAxisText = getAxisName(type)[0];
        // let yAxisText = getAxisName(type)[1];
        let xAxisText = "诊断时长";
        let yAxisText = "数值";

        //一个分析维度
        // console.log("myChart:", myChart);
        // console.log("dataEcharts:", dataEcharts);

        for (let i = 0; i < dataEcharts.length; i++) {
          let item = dataEcharts[i];
          for (name in item) {
            if (name == "value") {
              //此处value属性固定
              valueArray.push(item[name]);
            } else {
              nameArray.push(item[name]);
            }
          }
        }

        console.log("dataEcharts:", dataEcharts);
        console.log("nameArray:", nameArray);
        console.log("valueArray:", valueArray);

        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          tooltip: {
            //提示框组件
            trigger: "axis", //触发类型：axis-坐标轴触发
            formatter: xAxisText + ":{b0}<br />" + yAxisText + ":{c0}",
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
          toolbox: {
            //工具栏
            show: true,
            itemSize: 20, //工具栏icon大小
            feature: {
              //配置项
              dataZoom: {
                //工具项*2 - 缩放
                show: true,
                yAxisIndex: false
              },
              myTool1: {
                //工具项-自定义方法
                show: true,
                title: "切换为饼图",
                icon:
                  "path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z",
                onclick: function() {
                  // alert('myToolHandler1');
                  // setEChart_line(myChart, data);
                  // setEChart('pieWithTool');
                }
              },
              magicType: {
                //多个工具项-动态视图类型切换的选项
                show: true,
                type: ["line", "bar"]
              },
              dataView: {
                //工具项-原始数据展示
                show: true,
                readOnly: true, //是否只读，可编辑的情况下，点击刷新会改变视图
                // lang: ['数据视图1', '关闭'], //原始数据视图下的话术：标题、按钮文字
                buttonColor: "#337ab7", //原始数据视图下的按钮颜色
                //自定义数据展示函数 - 更换为表格后会替代textarea，此时不可编辑数据，且数据无法复制
                optionToContent: function(opt) {
                  var axisData = opt.xAxis[0].data;
                  var series = opt.series;
                  var table =
                    '<table   border="1" bordercolor="gray" cellpadding="10" cellspacing="0" scroll style="width:50%;text-align:center;margin-left:300px"><thead><tr>' +
               
                    "<th>" +
                    xAxisText +
                    "</th>" +
                    "<th>" +
                    yAxisText +
                    "</th>" +
                    // + '<th>' + series[1].name + '</th>'
                    "</tr></thead><tbody>";

                  for (var i = 0, l = axisData.length; i < l; i++) {
                    table +=
                      "<tr>" +
                      "<td>" +
                      axisData[i] +
                      "</td>" +
                      "<td>" +
                      series[0].data[i] +
                      "</td>" +
                      // + '<td>' + series[1].data[i] + '</td>'
                      "</tr>";
                  }
                  table += "</tbody></table>";
                  return table;
                }
              },
              restore: { show: true }, //工具项-还原
              saveAsImage: {
                //工具项-保存为图片
                show: true,
                name: "思睿分析图", //保存的文件名称
                // backgroundColor: '#fff',
                pixelRatio: 2 //分辨率倍数
              }
            }
          },
          legend: {
            //图例组件
            // data: ['人数']
            // itemGap: 5,
            // formatter: 'Legend',
            // selected:{
            //     "Legend":false
            // }
          },
          grid: {
            //直角坐标系内绘图网格
            top: "8%",
            left: "1%",
            right: "7%",
            bottom: "10%",
            containLabel: true //grid是否包含刻度标签
          },
          xAxis: {
            //直角坐标系 grid 中的 x 轴
            name: xAxisText,
            type: "category",
            data: nameArray
          },
          yAxis: {
            //直角坐标系 grid 中的 y 轴
            name: yAxisText,
            type: "value"
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
          ],
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              // name: yAxisText,
              type: "bar",
              smooth: 0.5, //折线平滑程度
              data: valueArray
            }
          ]
        };
        console.log("option:", option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    },
    // 生物标记物检测率--柱状图
    async drawLineJ_Check(mark,id) {
			this.buttonsShowCon()
			this.mark1Show=true;
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      let table = ''
      if(this.type == 0){
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=diff_day"
        
        "group/stat.php",
        {params:{group_id:this.id,field:this.mark,type:this.type+1,table:this.ly_helper_diagnosis,type:this.type+1}}
 
        );
        console.log(res)
        let datas = res.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "检测率"
        });
      }else{
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=diff_day"
        
        "group/stat.php",
        {params:{group_id:this.id,field:this.mark,type:this.type+1,table:this.ly_helper_diagnosis,dignosis:this.dignosis,type:this.type+1}}
 
        );
        console.log(res)
        let datas = res.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "检测率"
        });
      }
      
      /**
       * @description EChart -带有工具栏的柱状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.dataEcharts 待分析的源数据
       * @param {string} [param.type] 分析项（英文名称） 可选
       * @param {string} param.title 表格title名称
       */
      function setEChart_barWithTool(param) {
        let myChart = param.myChart,
          dataEcharts = param.dataEcharts,
          type = param.type,
          title = param.title;
        console.log("setEChart_barWithTool-param:", param);
        //处理后的数据
        let nameArray = [];
        let valueArray = [];

        //X轴、Y轴名称
        // let xAxisText = getAxisName(type)[0];
        // let yAxisText = getAxisName(type)[1];
        let xAxisText = "标志物";
        let yAxisText = "检测率";

        //一个分析维度
        // console.log("myChart:", myChart);
        // console.log("dataEcharts:", dataEcharts);

        for (let i = 0; i < dataEcharts.length; i++) {
          let item = dataEcharts[i];
          for (name in item) {
            if (name == "value") {
              //此处value属性固定
              valueArray.push(item[name]);
            } else {
              nameArray.push(item[name]);
            }
          }
        }

        console.log("dataEcharts:", dataEcharts);
        console.log("nameArray:", nameArray);
        console.log("valueArray:", valueArray);

        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
         
          tooltip: {
            //提示框组件
            trigger: "axis", //触发类型：axis-坐标轴触发
            formatter: xAxisText + ":{b0}<br />" + yAxisText + ":{c0}",
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
          toolbox: {
            //工具栏
            show: true,
            itemSize: 20, //工具栏icon大小
            feature: {
              //配置项
              dataZoom: {
                //工具项*2 - 缩放
                show: true,
                yAxisIndex: false
              },
              myTool1: {
                //工具项-自定义方法
                show: true,
                title: "切换为饼图",
                icon:
                  "path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z",
                onclick: function() {
                  // alert('myToolHandler1');
                  // setEChart_line(myChart, data);
                  // setEChart('pieWithTool');
                }
              },
              magicType: {
                //多个工具项-动态视图类型切换的选项
                show: true,
                type: ["line", "bar"]
              },
              dataView: {
                //工具项-原始数据展示
                show: true,
                readOnly: true, //是否只读，可编辑的情况下，点击刷新会改变视图
                // lang: ['数据视图1', '关闭'], //原始数据视图下的话术：标题、按钮文字
                buttonColor: "#337ab7", //原始数据视图下的按钮颜色
                //自定义数据展示函数 - 更换为表格后会替代textarea，此时不可编辑数据，且数据无法复制
                optionToContent: function(opt) {
                  var axisData = opt.xAxis[0].data;
                  var series = opt.series;
                  var table =
                    '<table   border="1" bordercolor="gray" cellpadding="10" cellspacing="0" scroll style="width:50%;text-align:center;margin-left:300px"><thead><tr>' +
                  "<th>" +
                    xAxisText +
                    "</th>" +
                    "<th>" +
                    yAxisText +
                    "</th>" +
                    // + '<th>' + series[1].name + '</th>'
                    "</tr></thead><tbody>";

                  for (var i = 0, l = axisData.length; i < l; i++) {
                    table +=
                      "<tr>" +
                      "<td>" +
                      axisData[i] +
                      "</td>" +
                      "<td>" +
                      series[0].data[i] +
                      "</td>" +
                      // + '<td>' + series[1].data[i] + '</td>'
                      "</tr>";
                  }
                  table += "</tbody></table>";
                  return table;
                }
              },
              restore: { show: true }, //工具项-还原
              saveAsImage: {
                //工具项-保存为图片
                show: true,
                name: "思睿分析图", //保存的文件名称
                // backgroundColor: '#fff',
                pixelRatio: 2 //分辨率倍数
              }
            }
          },
          legend: {
            //图例组件
            // data: ['人数']
            // itemGap: 5,
            // formatter: 'Legend',
            // selected:{
            //     "Legend":false
            // }
          },
          grid: {
            //直角坐标系内绘图网格
            top: "8%",
            left: "1%",
            right: "7%",
            bottom: "10%",
            containLabel: true //grid是否包含刻度标签
          },
          xAxis: {
            //直角坐标系 grid 中的 x 轴
            name: xAxisText,
            type: "category",
            data: nameArray
          },
          yAxis: {
            //直角坐标系 grid 中的 y 轴
            name: yAxisText,
            type: "value"
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
          ],
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              // name: yAxisText,
              type: "bar",
              smooth: 0.5, //折线平滑程度
              data: valueArray
            }
          ]
        };
        console.log("option:", option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    },
    // 生物标记物阳性率--柱状图
    async drawLineY_Check(mark,id) {
			this.buttonsShowCon();
			this.mark2Show=true;
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      if(this.type == 0){
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=diff_day"
        "group/stat.php?group_id=1&field=mark&type=1&table=ly_helper_diagnosis&field2=result_normal"
        // "group/stat.php",{params:{group_id:this.id,field:this.diff_day}}
 
        );
        console.log(res)
        let datas = res.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "阳性率"
        });
      }else{
        const { data: res } = await this.axios.get(
        // "group/stat.php?group_id=1&field=diff_day"
        "group/stat.php?group_id=1&field=mark&table=ly_helper_diagnosis&field2=result_normal",{params:{dignosis:this.dignosis,type:this.type+1}}
        // "group/stat.php",{params:{group_id:this.id,field:this.diff_day}}
 
        );
        console.log(res)
        let datas = res.stat;
        setEChart_barWithTool({
          myChart: myChart,
          dataEcharts: datas,
          title: "阳性率"
        });
      }
      
      /**
       * @description EChart -带有工具栏的柱状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.dataEcharts 待分析的源数据
       * @param {string} [param.type] 分析项（英文名称） 可选
       * @param {string} param.title 表格title名称
       */
      function setEChart_barWithTool(param) {
        let myChart = param.myChart,
          dataEcharts = param.dataEcharts,
          type = param.type,
          title = param.title;
        console.log("setEChart_barWithTool-param:", param);
        //处理后的数据
        let nameArray = [];
        let valueArray = [];

        //X轴、Y轴名称
        // let xAxisText = getAxisName(type)[0];
        // let yAxisText = getAxisName(type)[1];
        let xAxisText = "标志物";
        let yAxisText = "阳性率";

        //一个分析维度
        // console.log("myChart:", myChart);
        // console.log("dataEcharts:", dataEcharts);

        for (let i = 0; i < dataEcharts.length; i++) {
          let item = dataEcharts[i];
          for (name in item) {
            if (name == "value") {
              //此处value属性固定
              valueArray.push(item[name]);
            } else {
              nameArray.push(item[name]);
            }
          }
        }

        console.log("dataEcharts:", dataEcharts);
        console.log("nameArray:", nameArray);
        console.log("valueArray:", valueArray);

        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          tooltip: {
            //提示框组件
            trigger: "axis", //触发类型：axis-坐标轴触发
            formatter: xAxisText + ":{b0}<br />" + yAxisText + ":{c0}",
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
          toolbox: {
            //工具栏
            show: true,
            itemSize: 20, //工具栏icon大小
            feature: {
              //配置项
              dataZoom: {
                //工具项*2 - 缩放
                show: true,
                yAxisIndex: false
              },
              myTool1: {
                //工具项-自定义方法
                show: true,
                title: "切换为饼图",
                icon:
                  "path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z",
                onclick: function() {
                  // alert('myToolHandler1');
                  // setEChart_line(myChart, data);
                  // setEChart('pieWithTool');
                }
              },
              magicType: {
                //多个工具项-动态视图类型切换的选项
                show: true,
                type: ["line", "bar"]
              },
              dataView: {
                //工具项-原始数据展示
                show: true,
                readOnly: true, //是否只读，可编辑的情况下，点击刷新会改变视图
                // lang: ['数据视图1', '关闭'], //原始数据视图下的话术：标题、按钮文字
                buttonColor: "#337ab7", //原始数据视图下的按钮颜色
                //自定义数据展示函数 - 更换为表格后会替代textarea，此时不可编辑数据，且数据无法复制
                optionToContent: function(opt) {
                  var axisData = opt.xAxis[0].data;
                  var series = opt.series;
                  var table =
                    '<table   border="1" bordercolor="gray" cellpadding="10" cellspacing="0" scroll style="width:50%;text-align:center;margin-left:300px"><thead><tr>' +
               
                    "<th>" +
                    xAxisText +
                    "</th>" +
                    "<th>" +
                    yAxisText +
                    "</th>" +
                    // + '<th>' + series[1].name + '</th>'
                    "</tr></thead><tbody>";

                  for (var i = 0, l = axisData.length; i < l; i++) {
                    table +=
                      "<tr>" +
                      "<td>" +
                      axisData[i] +
                      "</td>" +
                      "<td>" +
                      series[0].data[i] +
                      "</td>" +
                      // + '<td>' + series[1].data[i] + '</td>'
                      "</tr>";
                  }
                  table += "</tbody></table>";
                  return table;

                }
              },
              restore: { show: true }, //工具项-还原
              saveAsImage: {
                //工具项-保存为图片
                show: true,
                name: "思睿分析图", //保存的文件名称
                // backgroundColor: '#fff',
                pixelRatio: 2 //分辨率倍数
              }
            }
          },
          legend: {
            //图例组件
            // data: ['人数']
            // itemGap: 5,
            // formatter: 'Legend',
            // selected:{
            //     "Legend":false
            // }
          },
         
          grid: {
            //直角坐标系内绘图网格
            top: "8%",
            left: "1%",
            right: "7%",
            bottom: "10%",
            containLabel: true //grid是否包含刻度标签
          },
          xAxis: {
            //直角坐标系 grid 中的 x 轴
            name: xAxisText,
            type: "category",
            data: nameArray
          },
          yAxis: {
            //直角坐标系 grid 中的 y 轴
            name: yAxisText,
            type: "value"
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
          ],
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              // name: yAxisText,
              type: "bar",
              smooth: 0.5, //折线平滑程度
              data: valueArray
            }
          ]
        };
        console.log("option:", option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    },
    // 病理类型--柱状图
    async drawLineDia() {
      this.buttonsShowCon();
			this.bingShow=true;
      // myChart.showLoading(); myChart.hideLoading();  //等待效果
      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById('tu'))   样式
      let myChart = this.$echarts.init(
        document.getElementById("tu"),
        "macarons"
      );
      const { data: res } = await this.axios.get(
        "group/stat.php",
         {params:{group_id:this.id,type:this.type+1,field:this.diagnosis2}}
        //  {params:{group_id:this.id,field:this.mark,type:this.type+1,table:this.ly_helper_diagnosis}}
 
      );
      let datas = res.stat;
      setEChart_barWithTool({
        myChart: myChart,
        dataEcharts: datas,
        title: "病理类型"
      });
      /**
       * @description EChart -带有工具栏的柱状图，操作echarts对象更换图形
       * @param {object} param 参数列表
       * @param  {object} param.myChart 待更新的echarts对象
       * @param {object} param.dataEcharts 待分析的源数据
       * @param {string} [param.type] 分析项（英文名称） 可选
       * @param {string} param.title 表格title名称
       */
      function setEChart_barWithTool(param) {
        let myChart = param.myChart,
          dataEcharts = param.dataEcharts,
          type = param.type,
          title = param.title;
        console.log("setEChart_barWithTool-param:", param);
        //处理后的数据
        let nameArray = [];
        let valueArray = [];

        //X轴、Y轴名称
        // let xAxisText = getAxisName(type)[0];
        // let yAxisText = getAxisName(type)[1];
        let xAxisText = '病理类型'
        let yAxisText = "数值";

        //一个分析维度
        // console.log("myChart:", myChart);
        // console.log("dataEcharts:", dataEcharts);

        for (let i = 0; i < dataEcharts.length; i++) {
          let item = dataEcharts[i];
          for (name in item) {
            if (name == "value") {
              //此处value属性固定
              valueArray.push(item[name]);
            } else {
              nameArray.push(item[name]);
            }
          }
        }

        console.log("dataEcharts:", dataEcharts);
        console.log("nameArray:", nameArray);
        console.log("valueArray:", valueArray);

        let option = {
          title: {
            //标题
            text: title,
            left: "center",
            top: "10px",
            textAlign: "center"
          },
          tooltip: {
            //提示框组件
            trigger: "axis", //触发类型：axis-坐标轴触发
            formatter: xAxisText + ":{b0}<br />" + yAxisText + ":{c0}",
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
          toolbox: {
            //工具栏
            show: true,
            itemSize: 20, //工具栏icon大小
            feature: {
              //配置项
              dataZoom: {
                //工具项*2 - 缩放
                show: true,
                yAxisIndex: false
              },
              myTool1: {
                //工具项-自定义方法
                show: true,
                title: "切换为饼图",
                icon:
                  "path://M522.8 64.1V64h-22v0.1C258.6 69.9 64 268.1 64 511.8c0 247.3 200.5 447.8 447.8 447.8s447.8-200.5 447.8-447.8c0-243.7-194.5-441.9-436.8-447.7z m154.8 55.3c50.7 21.4 96.2 52.2 135.4 91.3 39.1 39.1 69.8 84.7 91.3 135.4 20.8 49.1 32 101.1 33.3 154.7H522.8V86.1c53.6 1.3 105.6 12.5 154.8 33.3z m135.3 693.4c-39.1 39.1-84.7 69.8-135.4 91.3-52.5 22.2-108.2 33.5-165.7 33.5s-113.3-11.3-165.7-33.5c-50.7-21.4-96.2-52.2-135.4-91.3-39.1-39.1-69.8-84.7-91.3-135.4C97.3 625 86 569.2 86 511.8S97.3 398.5 119.5 346c21.4-50.7 52.2-96.2 91.3-135.4 39.1-39.1 84.7-69.8 135.4-91.3 49.1-20.8 101.1-32 154.7-33.3v436.7h436.7c-1.3 53.6-12.5 105.6-33.3 154.7-21.6 50.8-52.3 96.3-91.4 135.4z",
                onclick: function() {
                  // alert('myToolHandler1');
                  // setEChart_line(myChart, data);
                  // setEChart('pieWithTool');
                }
              },
              magicType: {
                //多个工具项-动态视图类型切换的选项
                show: true,
                type: ["line", "bar"]
              },
              dataView: {
                //工具项-原始数据展示
                show: true,
                readOnly: true, //是否只读，可编辑的情况下，点击刷新会改变视图
                // lang: ['数据视图1', '关闭'], //原始数据视图下的话术：标题、按钮文字
                buttonColor: "#337ab7", //原始数据视图下的按钮颜色
                //自定义数据展示函数 - 更换为表格后会替代textarea，此时不可编辑数据，且数据无法复制
                optionToContent: function(opt) {
                  var axisData = opt.xAxis[0].data;
                  var series = opt.series;
                  var table =
                   '<table   border="1" bordercolor="gray" cellpadding="10" cellspacing="0" scroll style="width:50%;text-align:center;margin-left:300px"><thead><tr>' +
               
                    "<th>" +
                    xAxisText +
                    "</th>" +
                    "<th>" +
                    yAxisText +
                    "</th>" +
                    // + '<th>' + series[1].name + '</th>'
                    "</tr></thead><tbody>";

                  for (var i = 0, l = axisData.length; i < l; i++) {
                    table +=
                      "<tr>" +
                      "<td>" +
                      axisData[i] +
                      "</td>" +
                      "<td>" +
                      series[0].data[i] +
                      "</td>" +
                      // + '<td>' + series[1].data[i] + '</td>'
                      "</tr>";
                  }
                  table += "</tbody></table>";
                  return table;
                }
              },
              restore: { show: true }, //工具项-还原
              saveAsImage: {
                //工具项-保存为图片
                show: true,
                name: "思睿分析图", //保存的文件名称
                // backgroundColor: '#fff',
                pixelRatio: 2 //分辨率倍数
              }
            }
          },
          legend: {
            //图例组件
            // data: ['人数']
            // itemGap: 5,
            // formatter: 'Legend',
            // selected:{
            //     "Legend":false
            // }
          },
          grid: {
            //直角坐标系内绘图网格
            top: "8%",
            left: "2%",
            right: "7%",
            bottom: "10%",
            containLabel: true //grid是否包含刻度标签
          },
          xAxis: {
            //直角坐标系 grid 中的 x 轴
            name: xAxisText,
            type: "category",
            data: nameArray
          },
          yAxis: {
            //直角坐标系 grid 中的 y 轴
            name: yAxisText,
            type: "value"
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
              left: "97%"
            }
          ],
          series: [
            //系列列表。每个系列通过 type 决定自己的图表类型
            {
              // name: yAxisText,
              type: "bar",
              smooth: 0.5, //折线平滑程度
              data: valueArray
            }
          ]
        };
        console.log("option:", option);
        // 使用刚指定的配置项和数据显示图表。
        myChart.clear();
        myChart.setOption(option, { notMerge: true });
      }
    }
  }
};
</script>

<style>
	.showBtns{
			background: rgba(28, 178, 255, 1) !important;
			border-radius: 4px !important;
			font-size: 14px !important;
			font-family: Microsoft YaHei !important;
			font-weight: 400 !important;
			color: rgba(255, 255, 255, 1) !important;
	}
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
.iconbuzhou-icon {
  width: 4px;
  height: 9px;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1CA5FF;
  line-height: 24px;
  margin-right: 5px;
}
.iconbuzhou-xian1 {
  width: 4px;
  height: 9px;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1CA5FF;
  line-height: 24px;
  margin-right: 5px;
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
    margin-top: 20px;
    padding-bottom: 20px;
    .list {
      padding-top: 10px;
      margin-left: 30px;
      .el-table {
        border-top: 1px solid rgba(0, 160, 233, 1);
        margin: 10px 0;
      }
    }
  }
}
.fenxi {
  margin-top: 20px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 0px rgba(204, 204, 204, 0.75);
  border-radius: 4px 4px 4px 4px
  .up {
    height: 40px;
    background: rgba(250, 250, 250, 1);
    box-shadow: 0px 1px 0px 0px rgba(224, 224, 224, 0.75);
    border-radius: 4px 0px 0px 0px;
    line-height: 40px;
  }
  .down {
    .choose {
      display: flex;
      flex-flow: row;
      margin: 20px 10px;
      div {
        margin: auto 10px;
      }
    }
    .echarts {
      width: 1571px;
      height: 680px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(229, 229, 229, 1);
      border-radius: 4px;
      margin: 10px auto;
      .btns {
        display: flex;
        justify-content: space-evenly;
        margin-top: 20px;
        padding-bottom: 20px;
        width: 1571px;
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        .el-button {
          background: rgba(250, 250, 250, 1);
          border: 1px solid rgba(229, 229, 229, 1);
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        
        }
       /* .el-button:focus {
            background: rgba(28, 178, 255, 1);
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          } */
      }

      #tu {
        width: 1571px;
        height: 580px;
        margin: 10px auto;
      }
    }
  }
}

</style>
