export const userRules = {
  account: [
    {
      type: "string",
      required: true,
      pattern:"^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$",
      message: "请输入正确的邮箱",
      trigger: "blur",
    },
  ],
  pwd: [
    {
      type: "string",
      required: true,
      pattern: "^[0-9A-Za-z_-]{6,16}$",
      message: "请输入6~16位的密码",
      trigger: "blur",
    },
  ],
  pwd_confirm: [
    {
      type: "string",
      required: true,
      pattern: "^[0-9A-Za-z_-]{6,16}$",
      message: "请输入6~16位的密码",
      trigger: "blur",
    },
  ],
};
