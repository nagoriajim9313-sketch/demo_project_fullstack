import * as yup from "yup";
export const adminSchema = yup.object().shape({
  mobileno: yup.string().required("mobileno required"),
  adminusername: yup.string().required("user name required"),
  password: yup.string().required("password required"),
});

export default adminSchema;
