import * as yup from "yup";

export const signinSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().min(8).required(),
});

export const signupSchema = yup.object({
    email: yup.string().email().required(),
    username: yup.string().min(3).required(),
    password: yup.string().min(8).required(),
    confirm: yup.string().oneOf([yup.ref('password')], "Password and Confirm must match").required(),
    role: yup.mixed().oneOf(["rider", "client"], "Role must be either 'rider' or 'client'").required("Role is required"),
});

export const changePasswordSchema = yup.object().shape({
  old_password: yup.string().required("Old password is required."),
  new_password: yup.string().required("New password is required."),
  confirm_password: yup.string()
    .oneOf([yup.ref("new_password"), undefined], "Passwords must match.")
    .required("Please confirm your new password."),
});