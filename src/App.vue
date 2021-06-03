<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
body,
html,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.content-detail label {
  color: #909399;
}

.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 160px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-select {
  width: 100%;
}
.el-input-number {
  width: 100%;
}
.el-input-number .el-input__inner {
  text-align: left;
}
.el-date-editor {
  width: 100% !important;
}

.cell-pointer {
  cursor: pointer;
  color: #409eff;
}
</style>
