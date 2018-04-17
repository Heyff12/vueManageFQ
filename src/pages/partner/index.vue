<template>
    <div>
        <div class="right_head">
            合作商信息
        </div>
        <div class="right_body">
            <el-form label-width="140px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="合作商ID：" prop="partner_id">
                            <el-input v-model.trim="searchkey.partner_id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="合作商名称：" prop="partner_name">
                            <el-input v-model.trim="searchkey.partner_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="16">
                        <el-form-item label="接入时间：">
                            <el-date-picker v-model="dateRange" type="daterange" align="right" unlink-panels 
                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                            </el-date-picker>
                        </el-form-item>    
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="运行状态：">
                            <el-select v-model="searchkey.status" placeholder="请选择运行状态">
                                <el-option label="已启动" value="1"></el-option>
                                <el-option label="已关闭" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label-width="0" class="t_c">
                            <el-button type="primary" @click="search_sub">查询</el-button>
                            <el-button type="info" @click="resetForm('searchkey')">重置</el-button>
                            <!-- <el-button type="success" @click="addItem">新增</el-button> -->
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template>
                <el-table :data="list_now" border stripe style="width: 100%">
                    <el-table-column prop="partner_id" label="合作商ID" resizable min-width="100px">
                    </el-table-column>
                    <el-table-column prop="partner_name" label="合作商名称" resizable min-width="100px">
                    </el-table-column>
                    <el-table-column prop="join_time" label="接入时间" resizable min-width="130px">
                    </el-table-column>
                    <el-table-column prop="status" label="运行状态" resizable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.status==1"  class="warn">已启动</span>
                            <span v-else class="danger">已关闭</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" resizable min-width="100px">
                        <template slot-scope="scope">
                            <!-- <el-button type="warning" @click="editItem(scope.row)" plain>
                                编辑</el-button> -->
                            <el-button type="warning" @click="toLead(scope.row.partner_id)" plain>
                                批量导入成员</el-button>
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
            <span slot="header">编辑门店管理人信息</span>
            <el-form :model="editMan" :rules="rules" ref="editMan" label-width="170px" class="demo-ruleForm">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="大区名称：">
                            <el-input v-model.trim="editMan.district_name" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店编号：">
                            <el-input v-model.trim="editMan.store_id" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店名称：" prop="store_name">
                            <el-input v-model.trim="editMan.store_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店地址：" prop="store_address">
                            <el-input v-model.trim="editMan.store_address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店管理人姓名：" prop="name">
                            <el-input v-model.trim="editMan.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店管理人身份证号：" prop="idnumber">
                            <el-input v-model.trim="editMan.idnumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="门店管理人手机号：">
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
    </div>
</template>

<script>
import bounced from "@/components/bounced";
import {
  test_number,
  test_chinese,
  test_tel,
  test_idnumber,
  test_any
} from "@/method/yanzheng";
import { searchPost, mendPost } from "@/method/util";
export default {
  name: "partner",
  components: {
    bounced
  },
  data() {
    return {
      dialogEdit: false, //编辑弹框默认不显示
      big_bounced: "large_bounced", //注销弹框变大--样式
      searchkey: {
        partner_id: "",
        partner_name: "",
        status: "",
        s_join_dtm: "",
        e_join_dtm: "",
      },
      searchkey_rule: {
        partner_name: test_chinese("合作商名称", 0, 15, false, "blur"),
        partner_id: test_number("合作商ID", 0, 20, false, "blur")
      },
      list_url: "/fenqi_mis/v1/api/partner/list", //获取列表
      edit_url: "/fenqi_mis/v1/api/partner/store_mgr/modify", //修改
      editMan: {
        store_name: "",
        name: "",
        idnumber: "",
        store_address: ""
      }, //单个负责人信息
      rules: {
        store_name: test_chinese("门店名称", 0, 15, true, "blur"),
        name: test_chinese("门店管理人姓名", 0, 10, true, "blur"),
        idnumber: test_idnumber("门店管理人身份证号", true, "blur"),
        store_address: test_any("门店地址", 0, 50, true, "blur")
      },
      editManCompare: {
        store_name: "",
        name: "",
        idnumber: "",
        store_address: ""
      }, //单个负责人信息--初始比较值
      pages_all: 0, //总信息数
      page_per: 20, //每页信息数
      page_now: 1, //当前页数
      pages: 1, //总页数
      list_now: [], //当前展示信息
      dateRange: "", //
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created: function() {
    this.get_list(); //获取列表
  },
  methods: {
    //获取列表
    get_list: function() {
      let post_data = {
        page: this.page_now,
        page_size: this.page_per
      };
      searchPost(this.searchkey.partner_name, "partner_name", post_data);
      searchPost(this.searchkey.partner_id, "partner_id", post_data);
      searchPost(this.searchkey.status, "status", post_data, true);
      //获取时间
      console.log(this.dateRange);
      if (this.dateRange) {
        this.searchkey.s_join_dtm = this.get_datetime(this.dateRange[0]);
        this.searchkey.e_join_dtm = this.get_datetime(this.dateRange[1]);
      } else {
        this.searchkey.s_join_dtm = "";
        this.searchkey.e_join_dtm = "";
      }
      searchPost(this.searchkey.s_join_dtm, "s_join_dtm", post_data);
      searchPost(this.searchkey.e_join_dtm, "e_join_dtm", post_data);
      this.$ajax_axios.ajax_get(this, this.list_url, post_data, data_return => {
        this.pages_all = data_return.data.partner_cnt;
        this.list_now = data_return.data.partner_info;
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
      this.dateRange = "";
      this.searchkey.status = "";
    },
    //批量导入
    toLead(id) {
      this.$router.push({
        name: "partner_excel",
        params: {
          partner_id: id
        }
      });
    },
    //新增
    addItem() {},
    //修改
    editItem(val) {
      this.$refs["editMan"].resetFields(); //重置
      this.editManCompare.store_name = val.store_name;
      this.editManCompare.name = val.name;
      this.editManCompare.idnumber = val.idnumber;
      this.editManCompare.store_address = val.store_address;
      //   this.editMan = val;
      this.editMan.store_name = val.store_name;
      this.editMan.store_id = val.store_id;
      this.editMan.district_name = val.district_name;
      this.editMan.store_address = val.store_address;
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
      let post_data = {};
      mendPost(
        this.editMan.store_name,
        "store_name",
        post_data,
        this.editManCompare.store_name
      );
      mendPost(this.editMan.name, "name", post_data, this.editManCompare.name);
      mendPost(
        this.editMan.idnumber,
        "idnumber",
        post_data,
        this.editManCompare.idnumber
      );
      mendPost(
        this.editMan.store_address,
        "store_address",
        post_data,
        this.editManCompare.store_address
      );
      let post_dataLen = Object.keys(post_data).length;
      if (post_dataLen <= 0) {
        this.$message({
          message: "当前信息尚无修改",
          type: "warning"
        });
        return false;
      }
      this.$ajax_axios.ajax_post(
        this,
        this.edit_url,
        this.post_data,
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
    },
    //获取年月日时分秒
    get_datetime: function(d) {
      let _this = this;
      let date = new Date(d);
      let year = date.getFullYear();
      let month = _this.date_long(date.getMonth() + 1);
      let day = _this.date_long(date.getDate());
      let hour = _this.date_long(date.getHours());
      let min = _this.date_long(date.getMinutes());
      let sec = _this.date_long(date.getSeconds());
      //   return (
      //     year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
      //   );
      return year + "-" + month + "-" + day;
    },
    //处理1位01---取消区间选择，取消时间转化
    date_long: function(n) {
      if (n < 10) {
        return "0" + n;
      } else {
        return n;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>
