<template>
    <div>
        <div class="right_head">
            大区责任人信息
        </div>
        <div class="right_body">
            <el-form label-width="140px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="合作商名称：" prop="partner_name">
                            <el-input v-model.trim="searchkey.partner_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区编号：" prop="district_id">
                            <el-input v-model.trim="searchkey.district_id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区名称：" prop="district_name">
                            <el-input v-model.trim="searchkey.district_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区负责人手机号：" prop="mobile">
                            <el-input v-model.trim="searchkey.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="运行状态：">
                            <el-select v-model="searchkey.status" placeholder="请选择运行状态">
                                <el-option label="待激活" value="2"></el-option>
                                <el-option label="已激活" value="3"></el-option>
                                <el-option label="已注销" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label-width="0" class="t_c">
                            <el-button type="primary" @click="search_sub">查询</el-button>
                            <el-button type="info" @click="resetForm('searchkey')">重置</el-button>
                            <el-button type="success" @click="addItem">新增</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template>
                <el-table :data="list_now" border stripe style="width: 100%">
                    <el-table-column prop="partner_name" label="合作商名称" resizable min-width="80px">
                    </el-table-column>
                    <el-table-column prop="district_id" label="大区编号" resizable min-width="100px">
                    </el-table-column>
                    <el-table-column prop="district_name" label="大区名称" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column prop="name" label="大区负责人姓名" resizable min-width="80px">
                    </el-table-column>
                    <el-table-column prop="idnumber" label="大区负责人身份证号" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column prop="mobile" label="大区负责人手机号" resizable min-width="100px">
                    </el-table-column>
                    <el-table-column prop="status" label="运行状态" resizable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.status==2"  class="warn">待激活</span>
                            <span v-else-if="scope.row.status==3" class="success">已激活</span>
                            <span v-else class="danger">已注销</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="update_time" label="更新时间" resizable min-width="120px">
                    </el-table-column>
                    <el-table-column label="操作" resizable min-width="100px">
                        <template slot-scope="scope">
                            <el-button type="warning" @click="editItem(scope.row)" plain>
                                编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block t_r mar_t20">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page_now" :page-sizes="[20,50,100,200,250]" :page-size="page_per" layout="total, sizes, prev, pager, next" :total="pages_all">
                </el-pagination>
            </div>
        </div>
        <bounced :visible="dialogEdit" :newclass="big_bounced">
            <span slot="header">编辑大区负责人信息</span>
            <el-form :model="editMan" :rules="rules" ref="editMan" label-width="170px" class="demo-ruleForm">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="合作商名称：">
                            <el-input v-model.trim="editMan.partner_name" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区编号：">
                            <el-input v-model.trim="editMan.district_id" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区名称：" prop="district_name">
                            <el-input v-model.trim="editMan.district_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区负责人姓名：" prop="name">
                            <el-input v-model.trim="editMan.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区负责人身份证号：" prop="idnumber">
                            <el-input v-model.trim="editMan.idnumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区负责人手机号：">
                            <el-input v-model.trim="editMan.mobile" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="运行状态：">
                            <el-select v-model="editMan.status" placeholder="" disabled>
                                <el-option label="待激活" value="2"></el-option>
                                <el-option label="已激活" value="3"></el-option>
                                <el-option label="已注销" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <p slot="footer">
                <span class="bounced_button bounced_sure" @click="mendSure">确认</span>
                <span class="bounced_button bounced_cancle"  @click="dialogEdit = false">取消</span>
            </p>
        </bounced>
        <bounced :visible="dialogAdd" :newclass="big_bounced">
            <span slot="header">新增大区负责人信息</span>
            <el-form :model="addMan" :rules="addrules" ref="addMan" label-width="170px" class="demo-ruleForm">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="合作商名称：">
                            <el-select v-model="addMan.partner_id" placeholder="">
                                <el-option v-for="item in partnerList" :label="item.partner_name" :value="item.partner_id" :key="item.partner_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8" v-for="(item,index) in addMan.district_list" :key="index">
                        <el-form-item label="大区名称：" :prop="'district_list.'+index+'.district_name'">
                            <el-input v-model.trim="item.district_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区负责人姓名：" prop="name">
                            <el-input v-model.trim="addMan.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区负责人身份证号：" prop="idnumber">
                            <el-input v-model.trim="addMan.idnumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区负责人手机号：" prop="mobile">
                            <el-input v-model.trim="addMan.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <p slot="footer">
                <span class="bounced_button bounced_sure" @click="addSure">确认</span>
                <span class="bounced_button bounced_cancle"  @click="dialogAdd = false">取消</span>
            </p>
        </bounced>
    </div>
</template>

<script>
import bounced from "@/components/bounced";
import {
  test_number,
  test_chinese,
  test_tel,
  test_idnumber
} from "@/method/yanzheng";
import { searchPost, mendPost } from "@/method/util";
export default {
  name: "region",
  components: {
    bounced
  },
  data() {
    return {
      dialogEdit: false, //编辑弹框默认不显示
      dialogAdd: false, //新增弹框默认不显示
      big_bounced: "large_bounced", //注销弹框变大--样式
      searchkey: {
        partner_name: "",
        district_id: "",
        district_name: "",
        mobile: "",
        status: ""
      },
      searchkey_rule: {
        partner_name: test_chinese("合作商名称", 0, 15, false, "blur"),
        district_id: test_number("大区编号", 0, 20, false, "blur"),
        district_name: test_chinese("大区名称", 0, 15, false, "blur"),
        mobile: test_tel("大区负责人手机号", false, "blur")
      },
      list_url: "/fenqi_mis/v1/api/partner/district_mgr/list", //获取列表
      edit_url: "/fenqi_mis/v1/api/partner/district_mgr/modify", //修改
      add_url: "/fenqi_mis/v1/api/partner/district_mgr/append", //新增
      //   partner_url: "/fenqi_mis/v1/api/partner/pulldown_list", //合作商列表
      partner_url: "/fenqi_mis/v1/api/partner/list", //合作商列表
      editMan: {
        district_name: "",
        name: "",
        idnumber: ""
      }, //单个负责人信息
      rules: {
        district_name: test_chinese("大区名称", 0, 15, true, "blur"),
        name: test_chinese("大区负责人姓名", 0, 10, true, "blur"),
        idnumber: test_idnumber("大区负责人身份证号", true, "blur")
      },
      editManCompare: {
        district_name: "",
        name: "",
        idnumber: ""
      }, //单个负责人信息--初始比较值
      addMan: {
        partner_id: "",
        name: "",
        idnumber: "",
        mobile: "",
        district_list: [
            {"district_name": ""}
        ] 
      }, //单个负责人信息
      addrules: {        
        name: test_chinese("大区负责人姓名", 0, 10, true, "blur"),
        idnumber: test_idnumber("大区负责人身份证号", true, "blur"),
        mobile: test_tel("大区负责人手机号", true, "blur"),
        district_list:[
            {district_name: test_chinese("大区名称", 0, 15, true, "blur")}
        ],
      },
      pages_all: 0, //总信息数
      page_per: 20, //每页信息数
      page_now: 1, //当前页数
      pages: 1, //总页数
      list_now: [], //当前展示信息
      partnerList: [] //合作商列表
    };
  },
  created: function() {
    this.get_partnerList(); //获取合作商列表
    this.get_list(); //获取列表
  },
  methods: {
    //获取合作商列表
    get_partnerList: function() {
      let postData = {
        page: 0,
        page_size: -1
      };
      this.$ajax_axios.ajax_get(
        this,
        this.partner_url,
        postData,
        data_return => {
          this.partnerList = data_return.data.partner_info;
          this.addMan.partner_id = data_return.data.partner_info[0].partner_id;
        }
      );
    },
    //获取列表
    get_list: function() {
      let _this = this;
      let post_data = {
        page: _this.page_now,
        page_size: _this.page_per
      };
      searchPost(this.searchkey.partner_name, "partner_name", post_data);
      searchPost(this.searchkey.district_id, "district_id", post_data);
      searchPost(this.searchkey.district_name, "district_name", post_data);
      searchPost(this.searchkey.mobile, "mobile", post_data);
      searchPost(this.searchkey.status, "status", post_data, true);
      this.$ajax_axios.ajax_get(this, this.list_url, post_data, data_return => {
        _this.pages_all = data_return.data.district_cnt;
        _this.list_now = data_return.data.district_info;
      });
    },
    //提交查询
    search_sub: function() {
      this.$refs.searchkey.validate(valid => {
        if (valid) {
          this.get_list();
        } else {
          return false;
        }
      });
    },
    //重置
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
      this.searchkey.status = "";
    },
    //新增
    addItem() {
      this.$refs["addMan"].resetFields(); //重置
      this.dialogAdd = true;
    },
    //修改
    editItem(val) {
      this.$refs["editMan"].resetFields(); //重置
      this.editManCompare.district_name = val.district_name;
      this.editManCompare.name = val.name;
      this.editManCompare.idnumber = val.idnumber;
      //   this.editMan = val;
      this.editMan.partner_name = val.partner_name;
      this.editMan.district_id = val.district_id;
      this.editMan.userid = val.userid;
      this.editMan.district_name = val.district_name;
      this.editMan.name = val.name;
      this.editMan.idnumber = val.idnumber;
      this.editMan.mobile = val.mobile;
      this.editMan.status = val.status.toString();
      this.dialogEdit = true;
    },
    //确认修改--验证
    mendSure() {
      this.$refs.editMan.validate(valid => {
        if (valid) {
          this.mendSure_post();
        } else {
          return false;
        }
      });
    },
    //确认提交事件
    mendSure_post() {
      let post_data = {
        district_id: this.editMan.district_id,
        userid: this.editMan.userid
      };
      mendPost(
        this.editMan.district_name,
        "district_name",
        post_data,
        this.editManCompare.district_name
      );
      mendPost(this.editMan.name, "name", post_data, this.editManCompare.name);
      mendPost(
        this.editMan.idnumber,
        "idnumber",
        post_data,
        this.editManCompare.idnumber
      );
      let post_dataLen = Object.keys(post_data).length;
      if (post_dataLen <= 2) {
        this.$message({
          message: "当前信息尚无修改",
          type: "warning"
        });
        return false;
      }
      this.$ajax_axios.ajax_post(
        this,
        this.edit_url,
        post_data,
        data_return => {
          this.dialogEdit = false; //关闭弹框
          this.get_list(); //刷新数据
        },
        () => {
          this.dialogEdit = false; //关闭弹框
        },
        () => {
          this.dialogEdit = false; //关闭弹框
        }
      );
    },
    //确认新增--验证
    addSure() {
      this.$refs.addMan.validate(valid => {
        if (valid) {
          this.addSure_post();
        } else {
          return false;
        }
      });
    },
    //确认提交事件
    addSure_post() {
      let post_data = this.addMan;
      this.$ajax_axios.ajax_post(
        this,
        this.add_url,
        post_data,
        data_return => {
          this.dialogAdd = false; //关闭弹框
          this.get_list(); //刷新数据
        },
        () => {
          this.dialogAdd = false; //关闭弹框
        },
        () => {
          this.dialogAdd = false; //关闭弹框
        }
      );
    },
    //更改每页显示信息条数
    handleSizeChange(val) {
      let _this = this;
      //console.log(`每页 ${val} 条`);
      _this.page_per = val;
      _this.page_now = 1;
      this.get_list();
    },
    //获取当前页信息
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      let _this = this;
      _this.page_now = val;
      this.get_list();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>
