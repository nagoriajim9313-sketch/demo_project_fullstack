import * as yup from "yup";
export const orderSchema = yup.object().shape({
  userid: yup.number().required("user id required"),
  productid: yup.number().required("product id required"),
  qty: yup.string().required("qty required"),

});

export default orderSchema;
