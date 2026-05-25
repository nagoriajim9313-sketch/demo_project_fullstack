import * as yup from "yup";
export const userSchema = yup.object().shape({
  mobileno: yup.string().required("mobileno required"),
  username: yup.string().required("user name required"),
  password: yup.string().required("password required"),
});

export default userSchema;
