<template>
  <div class="container">首页主页1
    <div>
      <el-input v-model="input1"  @focus="highlight(input1)" placeholder="请输入内容"></el-input>
      <el-input v-model="input2" @focus="highlight(input2)" placeholder="请输入内容"></el-input>
    <el-button type="primary" @click="goback()">返回</el-button>
    <el-select v-model="value" @change="highlight(value)" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div>
    <div class="home_box" v-html="msg"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [{
          value: '高亮',
          label: '高亮'
        }, {
          value: '一段',
          label: '一段'
        }, {
          value: '字符',
          label: '字符'
        }, {
          value: '字符串',
          label: '字符串'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      input1: "高亮",
      input2: "字符串",
      msg:"这是一段的字符串,里面有些需要高亮key的词语, 高亮key,其他字符串1",
      txt:"这是一段的字符串,里面有些需要高亮key的词语, 高亮key,其他字符串1"
    };
  },
  methods: {
    goback(){
      this.$router.push("/login");
    },
    highlight(input) {

      let key = input;
      console.log(key);
      
      let rep = new RegExp(key, "gm");
      let line = this.txt;
      let keywrap = "<span style='color:red'>"+key+"</span>";
      
      let restr = line.replace(rep,keywrap);// 高亮关键字文本
      console.log(restr);
      this.msg = restr;
      
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #2b4b6b;
  height: 100%;
}
.home_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btns {
  display: flex;
  justify-content: flex-end;
}

.home_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>