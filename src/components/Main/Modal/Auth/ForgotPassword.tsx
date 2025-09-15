import { Formik, Form, Field, ErrorMessage } from "formik";
import { forgotPasswordSchema } from "@/components/Main/Modal/Validation";
import  { type FormProps } from "@/features/types/types";
import { Button } from "@/components/ui/button";
import { LoginInput } from "@/components/ui/loginInput.tsx";
import { Label } from "@/components/ui/label";
import { useSendPasswordResetEmailMutation } from "@/features/api/endpoints/Account";

export const ForgotPasswordForm  = ({ switchTo } : FormProps) => {
  const [ resetPassword ] = useSendPasswordResetEmailMutation();
  return (
    <Formik
      initialValues={{ forgotEmail: "" }}
      validationSchema={forgotPasswordSchema}
      validateOnChange={true}
      validateOnBlur={false}
   onSubmit={async (values , { setSubmitting, resetForm }) => {
  try {
     await resetPassword({ mailTo: values.forgotEmail });
    console.log("Sending reset link to:", values.forgotEmail);
    switchTo("checkEmail");
     resetForm();
  } catch (err) {
    console.error("Error sending reset link:", err);
  }
  finally {
        setSubmitting(false);
  }
}}

    >
      {({isSubmitting, values, errors, touched }) => (
        <Form className="space-y-4">
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Forgot Password?
          </h2>
          <p className="text-sm text-center text-gray-400 mt-2">
            Don't worry we got you covered. Please enter registered email below. We will send you a verification link.
          </p>
          <div>
            <Label htmlFor="forgotEmail" className="dark:text-white text-black text-xl font-semibold mb-3">
              Enter your email
            </Label>
            <Field
              as={LoginInput}
              id="forgotEmail"
              name="forgotEmail"
              type="email"
              placeholder="example@yourmail.com"
              required
              className={`bg-neutral-100 dark:bg-neutral-800 border ${
                touched.forgotEmail && errors.forgotEmail
                  ? "border-red-500"
                  : touched.forgotEmail && !errors.forgotEmail
                  ? "border-green-500"
                  : "border-neutral-300 dark:border-neutral-800"
              } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 focus:outline-none `}
            />
            {touched.forgotEmail && <ErrorMessage name="forgotEmail" component="div" className="text-red-500 text-sm" />}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || !values.forgotEmail || !!errors.forgotEmail}
            >
              Send Reset Link
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
