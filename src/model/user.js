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
  toRequestUpdate(param) {
    this.firstname = param.firstname;
    this.lastname = param.lastname;
    this.email = param.email;
    this.phoneNumber = param.phoneNumber;

    return this;
  }
}
