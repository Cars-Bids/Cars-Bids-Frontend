import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPasswordSchema } from "@/components/Main/Modal/Validation";
import  { type FormProps } from "@/features/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/features/api/endpoints/Profile";
import { setStep, setTokenError } from "@/features/api/Slices/authModalSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/app/store";

export const ResetMailForm  = ({ switchTo , resetToken, Email } : FormProps) => {
    console.log(resetToken)
    console.log(Email)
  const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetResult] = useResetPasswordMutation();
    const dispatch = useDispatch<AppDispatch>();
  return (
    <Formik
      initialValues={{ newpasswordEmail: "" , confirmNewPasswordEmail: ""}}
      validationSchema={resetPasswordSchema}
      validateOnChange={true}
      validateOnBlur={false}
  onSubmit={async (values, { setSubmitting }) => {
 try {
   await resetResult({
    email: Email || "",
    token: resetToken || "",
    newPassword: values.confirmNewPasswordEmail,
  }).unwrap();
  
  switchTo("confirmResetEmail");
  setSubmitting(true);
} catch (err : any) {
      const status = err?.status || err?.originalStatus || err?.code;
  if (status === 401) {
    dispatch(setTokenError("The reset link has expired. Please request a new password reset."));
     dispatch(setStep("Error"));
  } else {
     dispatch(setTokenError("Something went wrong. Please try again."));
      dispatch(setStep("Error"));
  }
}
 finally {
    setSubmitting(false);
  }
}}

    >
      {({isSubmitting, values, errors, touched }) => (
        <Form className="space-y-4">
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Create new password
          </h2>
          <p className=" text-center text-neutral-600 dark:text-neutral-300 text-sm font-normal font-synonym mb-6 ">Please enter new password. Ensure that your password <br></br> is different from the previous one.</p>
          <div>
            <Label htmlFor="newpasswordEmail" className="dark:text-white text-black text-xl font-semibold mb-3">
              Create new password
            </Label>
            
            <div className="relative">
              <Field
                as={Input}
                id="newpasswordEmail"
                name="newpasswordEmail"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className={`bg-neutral-100 dark:bg-neutral-800 border ${
                  touched.newpasswordEmail && errors.newpasswordEmail
                    ? "border-red-500"
                    : touched.newpasswordEmail && !errors.newpasswordEmail
                    ? "border-green-500"
                    : "border-neutral-300 dark:border-neutral-800"
                } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-red-600`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {touched.newpasswordEmail && <ErrorMessage name="newpasswordEmail" component="div" className="text-red-500 text-sm" />}
          </div>
          <div>
            <Label htmlFor="confirmNewPasswordEmail" className="dark:text-white text-black text-xl font-semibold mb-3">
              Confirm password
            </Label>
            <div className="relative">
              <Field
                as={Input}
                id="confirmNewPasswordEmail"
                name="confirmNewPasswordEmail"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className={`bg-neutral-100 dark:bg-neutral-800 border ${
                  touched.confirmNewPasswordEmail && errors.confirmNewPasswordEmail
                    ? "border-red-500"
                    : touched.confirmNewPasswordEmail && !errors.confirmNewPasswordEmail
                    ? "border-green-500"
                    : "border-neutral-300 dark:border-neutral-800"
                } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-red-600`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {touched.confirmNewPasswordEmail && <ErrorMessage name="confirmNewPasswordEmail" component="div" className="text-red-500 text-sm" />}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!values.newpasswordEmail || !values.confirmNewPasswordEmail || !!errors.newpasswordEmail || !!errors.confirmNewPasswordEmail || isSubmitting}
            >
             Reset password
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};


export const ConfirmResetEmailForm = ({ switchTo, }: FormProps) => {
  return (
    <div className="space-y-4">
      <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
    Your password has been changed
      </h2>
      <p className="text-sm text-center text-gray-400 mt-2">
    Your password hes been successfully changed. Now you can log in to your account with your new password.
      </p>
      <div className="flex justify-center mt-4">
        <Button
          type="button"
          className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg"
          onClick={() => switchTo("login")}
        >
         Back to Log in
        </Button>
      </div>
    </div>
  );
};

export const  ErrorForm = ({switchTo , tokenError} : FormProps) =>{
  return (
    <div className="space-y-4">
      <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
      Opps
      </h2>
      <p className="text-sm text-center text-gray-400 mt-2">
      {tokenError}
      </p>
      <div className="flex justify-center mt-4">
        <Button
          type="button"
          className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg"
          onClick={() => switchTo("login")}
        >
         Back to Log in
        </Button>
      </div>
    </div>
  );
};