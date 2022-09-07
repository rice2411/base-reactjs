import env from "../../config/env";
import fetch, { fmt } from "../../utils/api";

const router = {
  get_all: `${env.apiUrl}/api/v1/user`,
  get_me: `${env.apiUrl}/api/v1/user/get-me`,
  update: `${env.apiUrl}/api/v1/user/{userId}`,
  deactive: `${env.apiUrl}/api/v1/user/deactive`,
  import_list: `${env.apiUrl}/api/v1/user/import-list`,
};

class UserService {
  static getUsers(param) {
    let uri = router.get_all;
    return fetch.get(uri, param);
  }
  static getMe() {
    let uri = router.get_me;
    return fetch.get(uri);
  }
  static updateUser(userId, param) {
    let uri = fmt(router.update, { userId });
    return fetch.put(uri, param);
  }
  static deactiveUsers(param) {
    let uri = router.deactive;
    return fetch.delete(uri, param);
  }
  static importList(param) {
    let uri = router.import_list;
    return fetch.post(uri, param);
  }
}

export default UserService;
