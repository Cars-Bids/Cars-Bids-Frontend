
import * as Yup from "yup"; 

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .matches(/@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/, "Invalid domain")
    .required("Required"),
  password: Yup.string()
    .min(8, "Min 8 chars")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain a special character")
    .required("Required"),
});

export const signupSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .matches(/@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/, "Invalid domain")
    .required("Required"),
  username: Yup.string()
    .min(3, "Min 3 chars")
    .matches(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _ allowed")
    .required("Required"),
});

export const signupPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Min 8 chars")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain a special character")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});

export const forgotPasswordSchema = Yup.object({
  forgotEmail: Yup.string()
    .email("Must be a valid email")
    .matches(/@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/, "Invalid domain")
    .required("Required"),
});

export const editBioSchema = Yup.object({
  bio: Yup.string()
    .max(180, "Bio must be 180 characters or less")
    .required("Bio is required"),
});

export const resetPasswordSchema = Yup.object({
  newpasswordEmail: Yup.string()
    .min(8, "Min 8 chars")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain a special character")
    .required("Required"),
  confirmNewPasswordEmail: Yup.string()
    .oneOf([Yup.ref("newpasswordEmail"), undefined], "Passwords must match")
    .required("Required"),
});