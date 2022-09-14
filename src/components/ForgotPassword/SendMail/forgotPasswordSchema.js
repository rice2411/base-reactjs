import * as Yup from "yup";

export const forgotPasswordSchema = () =>
  Yup.object().shape({
    email: Yup.string().required("Vui lòng nhập email!!").email("Email không hợp lệ!")
  });