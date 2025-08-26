
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {  signupSchema, signupPasswordSchema } from "@/components/Main/Modal/Validation";
import { useDispatch } from "react-redux";
import { useRegisterMutation, useLoginMutation } from "@/features/api/endpoints/Account";
import  { type FormProps } from "@/features/types/types";
import { setCredentials } from "@/features/api/Slices/authSlice";
import { SocialButtons } from "@/components/Main/Modal/Auth/SocialButtons";
import type { AppDispatch } from "@/app/store";

import {hasMessage} from "@/features/api/utils/api";

export const SignupForm = ({ switchTo } : FormProps) => {
  
  return (
    <Formik
      initialValues={{ email: "", username: "" }}
      validationSchema={signupSchema}
      validateOnChange={true}
      validateOnBlur={false}
  onSubmit={(values) => {
  switchTo("signupPassword", { email: values.email, username: values.username });
}}
    >
      {({ values, errors, touched }) => (
        <Form className="space-y-4">
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Sign Up
          </h2>
          <div>
            <Label htmlFor="email" className="dark:text-white text-black text-xl font-semibold mb-3">
              Enter your email
            </Label>
            <Field
              as={Input}
              id="email"
              name="email"
              type="email"
              placeholder="example@yourmail.com"
              required
              className={`bg-neutral-100 dark:bg-neutral-800 border ${
                touched.email && errors.email
                  ? "border-red-500"
                  : touched.email && !errors.email
                  ? "border-green-500"
                  : "border-neutral-300 dark:border-neutral-800"
              } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-600`}
            />
            {touched.email && <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />}
          </div>
          <div>
            <Label htmlFor="username" className="dark:text-white text-black text-xl font-semibold mb-3">
              Enter your username
            </Label>
            <Field
              as={Input}
              id="username"
              name="username"
              type="text"
              placeholder="Your username"
              required
              className={`bg-neutral-100 dark:bg-neutral-800 border ${
                touched.username && errors.username
                  ? "border-red-500"
                  : touched.username && !errors.username
                  ? "border-green-500"
                  : "border-neutral-300 dark:border-neutral-800"
              } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-600`}
            />
            {touched.username && <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />}
            {values.username && (
              <p className="text-sm text-gray-400 mt-2">
                Your username will be: <span className="text-red-600 font-semibold">{values.username}</span>
              </p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!values.email || !values.username || !!errors.email || !!errors.username}
            >
              Continue
            </Button>
          </div>
          <SocialButtons />
          <button type="button" className="w-full text-center text-sm text-gray-400 mt-2" onClick={() => switchTo("login")}>
            Already have an account? <span className="text-red-600 hover:underline">Log In here</span>
          </button>
          <p className="text-sm text-center text-gray-400 mt-2">
            By pressing continue I agree to Steria Terms and conditions
          </p>
        </Form>
      )}
    </Formik>
  );
};

export const SignupPasswordForm  = ({ switchTo, onClose, initialEmail, initialUsername } : FormProps) => {
    console.log("Initial Email:", initialEmail);
    console.log("Initial Username:", initialUsername);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState("");
  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={signupPasswordSchema}
      validateOnChange={true}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const registerResult = await register({
            email: initialEmail || "",
            username: initialUsername || "",
            password: values.password,
          }).unwrap();
          console.log("Registered:", registerResult);
          const loginResult = await login({
            email: initialEmail || "",
            password: values.password,
          }).unwrap();
          console.log("Logged in:", loginResult);
          dispatch(setCredentials({ tokens: loginResult, rememberMe: false }));
          resetForm();
          onClose();
          switchTo("login");
        }  catch (error: unknown) {
          console.error("Signup error:", error);
          if (hasMessage(error)) {
            setServerError(error.data.message);
          } else {
            setServerError("Сталася помилка, спробуйте ще раз");
          }
        }
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched }) => (
        <Form className="space-y-4">
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Sign Up
          </h2>
          <div>
            <Label htmlFor="password" className="dark:text-white text-black text-xl font-semibold mb-3">
              Create your password
            </Label>
            <div className="relative">
              <Field
                as={Input}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className={`bg-neutral-100 dark:bg-neutral-800 border ${
                  touched.password && errors.password
                    ? "border-red-500"
                    : touched.password && !errors.password
                    ? "border-green-500"
                    : "border-neutral-300 dark:border-neutral-800"
                } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 pr-10 focus:outline-none `}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {touched.password && <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="dark:text-white text-black text-xl font-semibold mb-3">
              Confirm password
            </Label>
            <div className="relative">
              <Field
                as={Input}
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className={`bg-neutral-100 dark:bg-neutral-800 border ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-red-500"
                    : touched.confirmPassword && !errors.confirmPassword
                    ? "border-green-500"
                    : "border-neutral-300 dark:border-neutral-800"
                } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 pr-10 focus:outline-none `}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {touched.confirmPassword && <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!values.password || !values.confirmPassword || !!errors.password || !!errors.confirmPassword}
            >
              Create account
            </Button>
          </div>
           {serverError && (
            <div className="text-red-500 text-sm text-center">
              {serverError}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};