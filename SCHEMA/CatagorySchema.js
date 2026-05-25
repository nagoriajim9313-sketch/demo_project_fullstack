import * as yup from "yup";
export const catagorySchema = yup.object().shape({
  catagoryname: yup.string().required("catagory name required"),
});

export default catagorySchema;
