<template>
  <div class="container">
    <div>
      <el-input v-model="editForm.name" @focus="highlight(name)" placeholder="请输入内容"></el-input>
    </div>
    <div class="home_box">{{editForm.diagnosis_txt}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editForm: {},
      name: "",
      msg: "",
      txt: ""
    };
  },
  methods: {
    async look() {
      let id = "";
      const { data: res } = await this.axios.get("excel_data/onedata.php", {
        params: { id: 2 }
      });
      this.editForm = res.data;
      this.txt = this.editForm.diagnosis_txt;
      // console.log(this.txt)
      // // 处理数据
      //  this.editForm.diagnosis_txt = this.editForm.diagnosis_txt.split("。")
      // console.log(this.editForm.diagnosis_txt)
    },

    highlight(name) {
      this.name = this.editForm.name;
      let key = this.name;
      console.log(key);
      let rep = new RegExp(key, "gm");
      let line = this.txt;
      console.log(line);
      // /[{{this.key}}]/gm
      let keywrap = "<span style='color:red'>" + key + "</span>";
      let restr = line.replace(rep, keywrap); // 高亮关键字文本
      console.log(restr);
      this.msg = restr;
    }
  },
  mounted() {
    this.look();
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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