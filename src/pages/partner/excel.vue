<template>
  <div>
    <div class="right_head">
      批量导入excle模板
    </div>
    <div class="right_body">
  
      <el-form label-width="100px" class="demo-ruleForm" ref="searchkey">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label-width="0">
              <el-button type="default" @click="download">下载文件模板</el-button>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-upload class="upload-demo" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" drag :action="upload_url" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :data="muchData">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-col> -->
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label-width="0">
              <form id="uploadForm" enctype="multipart/form-data">
                <div class="ipload">
                  <!-- <p>将文件拖到此处，或<em class="orange">点击上传</em></p> -->
                  <p class="orange">点击上传</p>
                  <input type="file" name="logo_url" size="32" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="file file_style" value="" v-on:change="uploadFile($event)" />
                </div>
              </form>
            </el-form-item>
          </el-col>
        </el-row>
  
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "excel",
    data() {
      return {
        upload_url: "/fenqi_mis/v1/api/tools/upload_excel",
        down_url: "/fenqi_mis/v1/api/tools/download_excel", //下载
        muchData: {
          partner_id: this.$route.params.partner_id
        }
      };
    },
    created: function() {},
    methods: {
      //上传图片
      uploadFile: function(e) {
        let formdata = new FormData(document.getElementById("uploadForm"));
        let file = document.getElementById("uploadForm")[0].files[0];
        // console.log(file);
        formdata.append("file", file);
        formdata.append("partner_id", this.$route.params.partner_id);
        // console.log(formdata);
        this.$ajax_axios.ajax_post(
          this,
          this.upload_url,
          formdata,
          data_return => {
            this.$message({
              message: '上传成功！',
              type: 'success'
            });
          });
      },
      //下载
      download: function() {
        window.open(this.down_url);
      },
      //图片上传成功
      handleAvatarSuccess(res, file) {
        if (res.respcd == "0000") {
          this.$message({
            message: "上传成功",
            type: "success"
          });
        } else {
          if (res.respmsg) {
            Message.error({
              message: res.respmsg
            });
          } else {
            Message.error({
              message: res.resperr
            });
          }
        }
      },
      //图片上传前
      beforeAvatarUpload(file) {
        console.log(file);
        const iscsv =
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //   const isLt2M = file.size / 1024 / 1024 < 2000;
        if (!iscsv) {
          this.$message.error("上传文件只能是只能是 xlsx 格式!");
        }
        //   if (!isLt2M) {
        //     this.$message.error("上传头像图片大小不能超过 2000MB!");
        //   }
        //   return iscsv && isLt2M;
        return iscsv;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>
