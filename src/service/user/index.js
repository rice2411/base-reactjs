import env from "../../config/env";
import fetch from "../../utils/api";

const router = {
  get_all: `${env.apiUrl}/api/v1/user`,
};

class UserService {
  static getUsers() {
    let uri = router.get_all;
    return fetch.get(uri);
  }
}

export default UserService;
