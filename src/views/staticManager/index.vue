<template>
  <div>
    <el-row style="margin-top: 30px">
      <el-col span="4">
        <el-button type="primary" round>开启首页静态化</el-button>
      </el-col>
      <el-col span="4">
        <el-button type="danger" round>清除首页静态化</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col span="4">
        <el-button type="primary" round>开启文章静态化</el-button>
      </el-col>
      <el-col span="4">
        <el-button type="danger" round>清除文章静态化</el-button>
      </el-col>
    </el-row>
    <div class="tips" style="margin-top: 30px">
      <p>温馨提示：</p>
      <p style="color:#ed4845">静态化优点</p>
      <p>1.适合SEO，静态页面更容易被搜索引擎抓取。</p>
      <p>2.更快的访问速度及稳定性。</p>
      <p style="color:#ed4845">静态化的缺点</p>
      <p>1.文件数多，占用硬盘空间大。</p>
      <p>2.维护复杂度大。</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "index",
  components: {},
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.tips {
  font-size: 14px;
  color: #409eff;
  p:nth-of-type(1) {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
