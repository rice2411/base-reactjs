import env from "../config/env";
export function getFile(name) {
  return env.staticFileUrl + "/api/v1/file/" + name;
}
export const DEFAULT_AVATAR = "avatar_default.png";
