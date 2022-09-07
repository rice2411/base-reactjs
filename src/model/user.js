export class User {
  _id;
  fistname;
  lastname;
  username;
  role;
  password;
  avatarUpload;
  is_active;
  email;
  phoneNumber;
  password;
  toRequestUpdate(param) {
    this.firstname = param.firstname;
    this.lastname = param.lastname;
    this.email = param.email;
    this.phoneNumber = param.phoneNumber;

    return this;
  }
  toRequestImport(param) {
    this.username = param[0];
    this.password = param[1];
    return this;
  }
}
