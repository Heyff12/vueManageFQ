<template>
    <div>
        <div class="right_head">
            商户贷订单信息
        </div>
        <div class="right_body">
            <el-form label-width="140px" class="demo-ruleForm" :model="searchkey" :rules="searchkey_rule" ref="searchkey">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="好近申请订单号：" prop="orderno">
                            <el-input v-model.trim="searchkey.orderno"></el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="8">
                    <el-form-item label="申请订单状态：">
                      <el-select v-model="searchkey.status" placeholder="请选择运行状态">
                        <el-option v-for="status in applyStauts" :label=status.text :value=status.tp ></el-option>
                        <!--<el-option label="已启动" value="1"></el-option>-->
                        <!--<el-option label="已关闭" value="2"></el-option>-->
                      </el-select>
                    </el-form-item>
                  </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="8">
                        <el-form-item label="企业名称：" prop="shop_name">
                            <el-input v-model.trim="searchkey.shop_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="16">
                        <el-form-item label="好近申请时间：">
                            <el-date-picker v-model="dateRange" type="daterange" align="right" unlink-panels
                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="8">
                    <el-form-item label="放款方名称：" prop="lender_name">
                      <el-input v-model.trim="searchkey.lender_name"></el-input>
                    </el-form-item>
                  </el-col>
                    <el-col :xs="100" :sm="100" :md="100" :lg="100">
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
                    <el-table-column prop="orderno" label="好近申请订单号" resizable min-width="100px">
                    </el-table-column>
                  <el-table-column prop="create_time" label="好近申请时间" resizable min-width="120">
                  </el-table-column>
                  <el-table-column prop="lender_name" label="放款方名称" resizable min-width="100px">
                  </el-table-column>
                    <el-table-column prop="shop_name" label="企业名称" resizable min-width="100px">
                    </el-table-column>
                  <el-table-column prop="loan_name" label="借款人姓名" resizable min-width="100px">
                  </el-table-column>
                  <el-table-column prop="idnumber" label="借款人证件号码" resizable min-width="100px">
                  </el-table-column>
                  <el-table-column prop="apply_amt" label="申请金额（元）" resizable min-width="100px">
                  </el-table-column>
                    <el-table-column prop="status" label="申请订单状态" resizable>
                        <template slot-scope="scope">
                            <span v-for="item in applyStauts" v-show="scope.row.status === item.tp">{{ item.text }}</span>
                            <!--<span v-if="scope.row.status==1"  class="warn">已启动</span>-->
                            <!--<span v-else class="danger">已关闭</span>-->
                        </template>
                    </el-table-column>
                  <el-table-column prop="loan_amt" label="放款金额" resizable min-width="100px">
                  </el-table-column>
                  <el-table-column prop="loan_time" label="放款时间" resizable min-width="100px">
                  </el-table-column>
                </el-table>
            </template>
            <div class="block t_r mar_t20">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page_now" :page-sizes="[20,50,100,200,250]" :page-size="page_per" layout="total, sizes, prev, pager, next" :total="pages_all">
                </el-pagination>
            </div>
        </div>
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
        orderno: "",
        shop_name: "",
        status: "",
        s_join_dtm: "",
        e_join_dtm: "",
        lender_name: ''
      },
      searchkey_rule: {
        shop_name: test_chinese("企业名称", 0, 15, false, "blur"),
        orderno: test_number("好近申请订单号", 0, 20, false, "blur")
      },
      applyStauts: [],
      list_url: "/fenqi_mis/v1/api/loan/list", //获取列表

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
    this.getLoansStatus();
    this.get_list(); //获取列表
  },
  methods: {

    //获取状态
    getLoansStatus: function () {
      this.$ajax_axios.ajax_get(this, "/fenqi_mis/v1/api/tools/status", {}, data_return => {
          this.applyStauts = data_return.data.records;
      });
    },

    //获取列表
    get_list: function() {
      let post_data = {
        page: this.page_now,
        page_size: this.page_per
      };
      searchPost(this.searchkey.shop_name, "shop_name", post_data);
      searchPost(this.searchkey.orderno, "orderno", post_data);
      searchPost(this.searchkey.lender_name, "lender_name", post_data);
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
        this.pages_all = data_return.data.loan_cnt;
        this.list_now = data_return.data.loan_list;
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
