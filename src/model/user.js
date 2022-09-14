export class User {
  _id;
  fist_name;
  last_name;
  username;
  role;
  password;
  avatarUpload;
  is_active;
  email;
  phone;
  password;
  toRequestUpdate(param) {
    this.fist_name = param.fist_name;
    this.last_name = param.last_name;
    this.email = param.email;
    this.phone = param.phone;

    return this;
  }
  toRequestImport(param) {
    this.username = param[0];
    this.password = param[1];
    return this;
  }
}
