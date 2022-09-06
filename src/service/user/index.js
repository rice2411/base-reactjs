import env from "../../config/env";
import fetch, { fmt } from "../../utils/api";

const router = {
  get_all: `${env.apiUrl}/api/v1/user`,
  get_me: `${env.apiUrl}/api/v1/user/get-me`,
  update: `${env.apiUrl}/api/v1/user/{userId}`,
  deactive: `${env.apiUrl}/api/v1/user/deactive`,
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
}

export default UserService;
