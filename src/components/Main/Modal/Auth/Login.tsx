import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@/components/Main/Modal/Validation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/features/api/endpoints/Account";
import { type FormProps } from "@/features/types/types";

import { SocialButtons } from "@/components/Main/Modal/Auth/SocialButtons";

import type { AppDispatch } from "@/app/store";
import { setCredentials } from "@/features/api/Slices/authSlice";

import {hasMessage} from "@/features/api/utils/api";

export const LoginForm = ({ switchTo, onClose }: FormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [serverError, setServerError] = useState("");

  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: false }}
      validationSchema={loginSchema}
      validateOnChange={true}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const loginResult = await login({
            email: values.email,
            password: values.password,
          }).unwrap();
          dispatch(
            setCredentials({
              tokens: loginResult,
              rememberMe: values.rememberMe,
            })
          );
          console.log("Login attempt with:", {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe,
          });
          resetForm();
          onClose();
        } catch (error: unknown) {
          console.error("Login error:", error);
          if (hasMessage(error)) {
            setServerError(error.data.message);
          } else {
            setServerError("Сталася помилка, спробуйте ще раз");
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form className="space-y-4">
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Welcome back
          </h2>
          <div>
            <Label
              htmlFor="email"
              className="dark:text-white text-black text-xl font-semibold mb-3"
            >
              Enter your email
            </Label>
            <Field
              as={Input}
              id="email"
              name="email"
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                setServerError("");
              }}
              onBlur={handleBlur}
              placeholder="example@yourmail.com"
              required
              className={`bg-neutral-100 dark:bg-neutral-800 border ${
                touched.email && errors.email
                  ? "border-red-500"
                  : touched.email && !errors.email
                  ? "border-green-500"
                  : "border-neutral-300 dark:border-neutral-800"
              } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 focus:outline-none `}
            />
            {touched.email && (
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            )}
          </div>
          <div>
            <Label
              htmlFor="password"
              className="dark:text-white text-black text-xl font-semibold mb-3"
            >
              Enter your password
            </Label>
            <div className="relative">
              <Field
                as={Input}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="example password"
                required
                className={`bg-neutral-100 dark:bg-neutral-800 border ${
                  touched.password && errors.password
                    ? "border-red-500"
                    : touched.password && !errors.password
                    ? "border-green-500"
                    : "border-neutral-300 dark:border-neutral-800"
                } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 focus:outline-none `}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  setServerError("");
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {touched.password && (
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            )}
          </div>
          <div className="flex justify-between items-center text-sm text-black dark:text-gray-400">
            <label className="flex items-center gap-2">
              <Field
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="border-gray-600"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  setServerError("");
                }}
                onBlur={handleBlur}
              />
              Remember me
            </label>
            <button
              type="button"
              className="hover:underline text-black dark:text-gray-300"
              onClick={() => switchTo("forgotPassword")}
            >
              Forgot password?
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isSubmitting ||
                !values.email ||
                !values.password ||
                !!errors.email ||
                !!errors.password
              }
            >
              Continue
            </Button>
          </div>
          {serverError && (
            <div className="text-red-500 text-sm text-center">
              {serverError}
            </div>
          )}
          <SocialButtons />
          <button
            type="button"
            className="w-full text-center text-sm text-gray-400 mt-2"
            onClick={() => switchTo("signup")}
          >
            Don’t have an account?{" "}
            <span className="text-red-600 hover:underline">Sign Up</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};
