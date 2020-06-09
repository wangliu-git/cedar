<template>
  <el-dropdown class="avatar-container" trigger="click">
                                        <div class="avatar-wrapper">
                                            <el-button type="primary" size="medium">
                                                支付
                                                <i class="el-icon-caret-bottom" />
                                            </el-button>
                                        </div>
                                        <el-dropdown-menu slot="dropdown" class="user-dropdown">
                                            <a v-if="isPC &&(item.status==1||item.status==3)&&(payMethod==0||payMethod==1)" 
                                                target="_blank" 
                                                :href="openPayPageUrl">
                                                <el-dropdown-item>银行卡支付</el-dropdown-item>
                                            </a>
                                            <el-dropdown-item v-if="(item.status==1||item.status==3)&&(isPC||isWX)&&(payMethod==0||payMethod==2)">
                                                <span style="display:block;" 
                                                    @click="wxPayPc(item.id)">微信支付</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item divided>
                                                <span style="display:block;">线下支付</span>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
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