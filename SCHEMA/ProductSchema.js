import * as yup from "yup";
export const productSchema = yup.object().shape({
  productname: yup.string().required("product name required"),
  description: yup.string().required("description required"),
  catagoryid: yup.number().required("catagory id required"),
  price: yup.string().required("price required"),
});

export default productSchema;
