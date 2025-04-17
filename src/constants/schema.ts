import * as yup from "yup";

export const signinSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

export const signupSchema = yup.object({
    email: yup.string().email().required(),
    username: yup.string().min(3).required(),
    password: yup.string().min(8).required(),
    confirm: yup.string().oneOf([yup.ref('password')], "Password and Confirm must match").required(),
});