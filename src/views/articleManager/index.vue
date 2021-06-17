<template>
  <div>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="6">
        <el-input
          size="medium"
          placeholder="请输入标题"
          v-model="page.key"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-select v-model="page.type" placeholder="请选择文章类型">
          <el-option
            v-for="item in typeSelectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" plain @click="getArticleList(true, true)"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain @click="dialogFormVisible = true"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      v-loading="isLoading"
      stripe
      border
      style="width: 95%; margin-top: 20px"
    >
      <el-table-column
        prop="title"
        label="标题"
        align="center"
      ></el-table-column>
      <el-table-column prop="imgSrc" label="封面" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="picUrlFormat(scope.row.cover_photo)"
            :preview-src-list="[picUrlFormat(scope.row.cover_photo)]"
          >
          </el-image>
        </template>
        ></el-table-column
      >
      <el-table-column
        label="类型"
        :formatter="(row) => typeList[row.article_type]"
        align="center"
      ></el-table-column>
      <el-table-column
        :formatter="
          (row) => timeFormat(row.create_time * 1000, 'yyyy-MM-dd hh:mm')
        "
        label="添加时间"
        align="center"
      ></el-table-column>
      <el-table-column
        :formatter="
          (row) => timeFormat(row.update_time * 1000, 'yyyy-MM-dd hh:mm')
        "
        label="更新时间"
        align="center"
      ></el-table-column>
      <el-table-column
        label="状态"
        :formatter="(row) => (row.flag ? '已发布' : '未发布')"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="scope.row.flag === 0"
            @click="modifyArticleStatus(scope.row.id, 1)"
            >发布</el-button
          >
          <el-button
            type="text"
            v-else
            @click="modifyArticleStatus(scope.row.id, 0)"
            >停止发布</el-button
          >
          <el-button type="text" @click="modifyArticleInfo(scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            style="color: #e83929"
            @click="modifyArticleStatus(scope.row.id, 2)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top: 15px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pn"
        :page-sizes="[5, 10]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-row>
    <el-dialog
      width="80%"
      title="添加文章"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :show-close="!submiting"
    >
      <el-form
        :model="newArticle"
        status-icon
        :rules="inputRules"
        ref="newArticle"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            style="width: 60%"
            v-model="newArticle.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章类型" prop="article_type">
          <el-select
            style="width: 20%"
            v-model="newArticle.article_type"
            placeholder="请选择文章类型"
          >
            <el-option
              v-for="item in typeSelectOptions2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_photo">
          <image-upload
            :imageSrc="newArticle.cover_photo"
            @change="(e) => (newArticle.cover_photo = e)"
          ></image-upload>
        </el-form-item>
      </el-form>
      <el-row style="margin-bottom: 20px; width: 95%">
        <el-button
          type="primary"
          style="float: right"
          :loading="submiting"
          @click="submitAdd()"
          >保存</el-button
        >
      </el-row>
      <tinymce-editor
        v-if="dialogFormVisible"
        class="editor"
        ref="tinymceEditor"
        :tinymceHtml="newArticle.content"
        @input="(e) => (newArticle.content = e)"
      ></tinymce-editor>
    </el-dialog>
    <el-dialog
      width="80%"
      title="修改文章"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible2"
      :show-close="!submiting"
    >
      <el-form
        :model="modifyArticle"
        status-icon
        :rules="inputRules"
        ref="newArticle"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            style="width: 60%"
            v-model="modifyArticle.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章类型" prop="article_type">
          <el-select
            style="width: 20%"
            v-model="modifyArticle.article_type"
            placeholder="请选择文章类型"
          >
            <el-option
              v-for="item in typeSelectOptions2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_photo">
          <image-upload
            :imageSrc="modifyArticle.cover_photo"
            @change="(e) => (modifyArticle.cover_photo = e)"
          ></image-upload>
        </el-form-item>
      </el-form>
      <el-row style="margin-bottom: 20px; width: 95%">
        <el-button
          type="primary"
          style="float: right"
          :loading="submiting"
          @click="submitModify()"
          >保存</el-button
        >
      </el-row>
      <tinymce-editor
        v-if="dialogFormVisible2"
        class="editor"
        ref="tinymceEditor2"
        :tinymceHtml="modifyArticle.content"
        @input="(e) => (modifyArticle.content = e)"
      ></tinymce-editor>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import tinymceEditor from "../../components/tinymceEditor.vue";
import imageUpload from "../../components/imageUpload.vue";
import { timeFormat, picUrlFormat } from "@/utils/format";

import {
  articleListApi,
  articleDeleteApi,
  articleUpdateApi,
  articleAddApi,
} from "@/api/api";
@Component({
  name: "index",
  components: {
    tinymceEditor,
    imageUpload,
  },
})
export default class extends Vue {
  isLoading: boolean = false;
  submiting: Boolean = false;
  dialogFormVisible: Boolean = false;
  dialogFormVisible2: Boolean = false;
  typeList: any = [
    "结婚领证仪式",
    "一站式婚礼",
    "婚庆见闻",
    "备婚助手",
    "婚礼问答",
    "婚礼礼仪小百科",
  ];
  typeSelectOptions: any = [
    {
      value: -1,
      label: "全部",
    },
    {
      value: 0,
      label: "结婚领证仪式",
    },
    {
      value: 1,
      label: "一站式婚礼",
    },
    {
      value: 2,
      label: "婚庆见闻",
    },
    {
      value: 3,
      label: "备婚助手",
    },
    {
      value: 4,
      label: "婚礼问答",
    },
    {
      value: 5,
      label: "婚礼礼仪小百科",
    },
  ];
  typeSelectOptions2: any = [
    {
      value: 0,
      label: "结婚领证仪式",
    },
    {
      value: 1,
      label: "一站式婚礼",
    },
    {
      value: 2,
      label: "婚庆见闻",
    },
    {
      value: 3,
      label: "备婚助手",
    },
    {
      value: 4,
      label: "婚礼问答",
    },
    {
      value: 5,
      label: "婚礼礼仪小百科",
    },
  ];
  tableData: any = [];
  page: any = {
    key: "",
    type: -1,
    id: "",
    pn: 1,
    size: 5,
    total: 0,
  };

  newArticle: any = {
    title: "",
    cover_photo: "",
    article_type: 0,
    content: "",
  };
  modifyArticle: any = {
    title: "",
    cover_photo: "",
    article_type: 0,
    content: "",
  };
  inputRules: any = {
    title: [
      {
        type: "string",
        required: true,
        message: "标题不能为空",
        trigger: "blur",
      },
    ],
  };
  timeFormat = timeFormat;
  picUrlFormat = picUrlFormat;
  mounted() {
    this.getArticleList(true);
  }
    showNewDialog(){
    this.newArticle.content = ''
    this.dialogFormVisible = true
    this.$refs['newArticle']&&(this.$refs['newArticle'] as any).resetFields();
  }
    showModifyDialog(){
    this.dialogFormVisible2 = true
    this.$refs['modifyArticle']&&(this.$refs['modifyArticle'] as any).resetFields();
  }
  async getArticleList(isFirst?: boolean, isSerach?: Boolean) {
    if (this.isLoading) return;
    this.isLoading = true;
    if (isFirst) this.page.pn = 1;
    if (!isSerach) {
      this.page.key = "";
    }
    let res = await articleListApi(this.page);
    this.page.total = res.data.count;
    this.tableData = res.data.list;
    this.isLoading = false;
  }
  modifyArticleStatus(id: number, option: number) {
    let msg = "";
    switch (option) {
      case 0:
        msg = "你确定要停止发布此文章吗？";
        break;
      case 1:
        msg = "你确定要发布此文章吗？";
        break;
      case 2:
        msg = "你确定要删除此文章吗？";
        break;
    }
    this.$confirm(msg, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        let params = {
          id: id,
          status: option,
        };

        // let res =
        await articleDeleteApi(params);
        switch (option) {
          case 0:
            this.$message.success("文章已停止发布");
            break;
          case 1:
            this.$message.success("文章已发布");
            break;
          case 2:
            this.$message.success("文章已删除");
            break;
        }
        this.getArticleList(true);
      })
      .catch(() => {
        return;
      });
  }
  modifyArticleInfo(item: Object) {
    this.modifyArticle = item;
    this.dialogFormVisible2 = true;
  }
  submitAdd() {
    if (this.newArticle.title === "") {
      return this.$message.error("请先输入文章标题");
    }
    if (this.newArticle.cover_photo === "") {
      return this.$message.error("请先上传封面图片");
    }
    if (this.newArticle.content === "") {
      return this.$message.error("请输入文章内容");
    }
    if (this.submiting) return;
    (this.newArticle.content as string).replace(this.picUrlFormat.toString(),'')
    this.submiting = true;
    articleAddApi(this.newArticle)
      .then((res) => {
        this.$message.success("新增文章成功");
        this.dialogFormVisible = false
        this.newArticle.content = ''
        this.$refs['newArticle']&&(this.$refs['newArticle'] as any).resetFields();
        this.getArticleList(true);
      })
      .catch(() => {})
      .finally(() => {
        this.submiting = false;
      });
  }
  submitModify() {
    if (this.modifyArticle.title === "") {
      return this.$message.error("请先输入文章标题");
    }
    if (this.modifyArticle.cover_photo === "") {
      return this.$message.error("请先上传封面图片");
    }
    if (this.modifyArticle.content === "") {
      return this.$message.error("请输入文章内容");
    }
    if (this.submiting) return;
    this.submiting = true;
    articleUpdateApi(this.modifyArticle)
      .then((res) => {
        this.$message.success("文章修改成功");
            this.dialogFormVisible = false
    this.$refs['modifyArticle']&&(this.$refs['modifyArticle'] as any).resetFields();
        this.getArticleList(true);
      })
      .catch(() => {})
      .finally(() => {
        this.submiting = false;
      });
  }
  handleSizeChange(size: number) {
    this.page.size = size;
    this.getArticleList(true);
  }

  handleCurrentChange(current: number) {
    this.page.pn = current;
    this.getArticleList();
  }
}
</script>
<style lang="scss" scoped>
@import url("../scss/index.scss");
.tips {
  font-size: 14px;
  color: #409eff;
  p:nth-of-type(1) {
    font-weight: 600;
    font-size: 16px;
  }
}

.inputBox {
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  label {
    margin-right: 10px;
  }
}
.editorBox {
  position: absolute;
  top: 20px;
  z-index: 99;
  height: 850px;
  width: 1100px;
  background: #fff;
  border: 1px solid #409eff;
  border-radius: 15px;
  box-shadow: 5px 5px 10px #6b9fd3c0;
  .editor {
    margin-top: 20px;
    margin-left: 50px;
  }
}
</style>