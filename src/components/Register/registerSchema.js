import * as Yup from "yup";

export const registerSchema = () =>
  Yup.object().shape({
    username: Yup.string().required("Tên đăng nhập là bắt buộc!"),
    password: Yup.string().required("Mật khẩu là bắt buộc!").min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
    confirmPassword: Yup.string().required("Vui lòng nhập lại mật khẩu!").oneOf([Yup.ref('password')], "Mật khẩu xác nhận không trùng khớp!")
  });
