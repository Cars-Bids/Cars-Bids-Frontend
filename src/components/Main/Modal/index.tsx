import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Cropper, CircleStencil, ImageRestriction } from 'react-advanced-cropper';
import type { CropperRef } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

const loginSchema = Yup.object({
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

const signupSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .matches(/@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/, "Invalid domain")
    .required("Required"),
  username: Yup.string()
    .min(3, "Min 3 chars")
    .matches(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _ allowed")
    .required("Required"),
});

const signupPasswordSchema = Yup.object({
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

const forgotPasswordSchema = Yup.object({
  forgotEmail: Yup.string()
    .email("Must be a valid email")
    .matches(/@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/, "Invalid domain")
    .required("Required"),
});

const editBioSchema = Yup.object({
  bio: Yup.string()
    .max(180, "Bio must be 180 characters or less")
    .required("Bio is required"),
});

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditBioModalProps extends PopupProps {
  initialValue?: string;
  onSave?: (bio: string) => void;
}

interface CropPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialImage?: string;
  onSave?: (data: { imageUrl: string; coordinates: { left: number; top: number; width: number; height: number } }) => void;
}

export function AuthPopup({ isOpen, onClose }: PopupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "login" | "signup" | "signupPassword" | "forgotPassword" | "checkEmail"
  >("login");

  const switchTo = (
    step:
      | "login"
      | "signup"
      | "signupPassword"
      | "forgotPassword"
      | "checkEmail"
  ) => {
    setCurrentStep(step);
  };

  interface FormValues {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    forgotEmail: string;
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    if (currentStep === "login") {
      console.log("Login attempt with:", {
        email: values.email,
        password: values.password,
      });
      onClose();
    } else if (currentStep === "signup") {
      setCurrentStep("signupPassword");
    } else if (currentStep === "signupPassword") {
      console.log("Sign up with:", {
        email: values.email,
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      onClose();
    } else if (currentStep === "forgotPassword") {
      console.log("Sending reset link to:", values.forgotEmail);
      switchTo("checkEmail");
    } else if (currentStep === "checkEmail") {
      console.log("Check email step");
      setCurrentStep("login");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-white dark:bg-neutral-900 text-white max-w-sm p-6 rounded-xl border-2 border-red-600 shadow-xl"
        showCloseButton={false}
      >
        <div className="flex justify-between items-center mb-2">
          {currentStep !== "login" && currentStep !== "signup" ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (currentStep === "signupPassword") switchTo("signup");
                else if (currentStep === "forgotPassword") switchTo("login");
                else if (currentStep === "checkEmail")
                  switchTo("forgotPassword");
              }}
              className="text-black hover:bg-black/5 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full transition-all duration-200 backdrop-blur-sm dark:hover:bg-white/5"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <div />
          )}
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-black hover:bg-black/5 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full transition-all duration-200 backdrop-blur-sm dark:hover:bg-white/5"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>

        <div className="flex justify-center mb-2 text-2xl font-bold">
          <svg
            width="58"
            height="39"
            viewBox="0 0 58 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M57.9685 39H48.5024L34.414 22.7287H12.8857V16.1754H45.0199C45.9697 16.1115 46.8561 15.8877 47.5843 15.568C48.3441 15.2803 49.0723 14.8328 49.6738 14.2574C49.7688 14.1934 49.8321 14.0975 49.8954 14.0016C50.4336 13.4582 50.8135 12.8508 51.0352 12.2115C51.3834 11.2525 51.5417 10.4213 51.5417 9.52623V8.53525C51.5417 7.9918 51.3834 7.6082 51.3201 7.51229C51.2251 7.22459 51.0352 6.96885 50.8135 6.84098C50.6236 6.68115 50.3387 6.55328 50.117 6.55328H49.8638C49.8638 6.55328 49.6738 6.52131 49.5788 6.52131H25.7711V0H49.5788C51.1618 0 52.4598 0.287705 53.5046 0.831147C54.6443 1.43852 55.4675 2.1418 56.1323 2.97295C56.7971 3.86803 57.272 4.79508 57.5253 5.72213C57.8419 6.68115 57.9685 7.6082 57.9685 8.50328V9.52623C57.9685 11.0287 57.7786 12.4033 57.4303 13.65L57.367 13.8738C56.9238 15.2484 56.4172 16.3352 55.7841 17.2303C54.9609 18.3172 54.2327 19.0844 53.4413 19.7238C52.5865 20.3631 51.6683 20.9705 50.6553 21.45C49.5788 21.9295 48.6607 22.2172 47.7109 22.377C46.8245 22.6008 45.9064 22.7287 44.9882 22.7287H44.0701L58.0002 39H57.9685Z"
              fill="#EC2729"
            />
            <path
              d="M36.0599 32.4787V39H9.75105C8.76962 39 7.72486 38.8082 6.55347 38.4566C5.44539 38.1369 4.36898 37.5615 3.4192 36.7943C2.43776 35.9951 1.61462 34.9721 0.981437 33.7254C0.316593 32.4787 0 30.9443 0 29.1221V8.50328C0 7.57623 0.158296 6.64918 0.474889 5.72213C0.728163 4.79508 1.20305 3.86803 1.8679 2.97295C2.53274 2.1418 3.35588 1.43852 4.49562 0.831147C5.50871 0.287705 6.8384 0 8.38971 0H19.3122V6.52131H8.10477C8.10477 6.52131 7.94648 6.55328 7.88316 6.55328C7.62988 6.55328 7.34495 6.68115 7.18665 6.80902C6.93338 6.96885 6.77508 7.19262 6.68011 7.44836C6.52181 7.73607 6.42683 8.15164 6.42683 8.53525V29.1221C6.45849 30.177 6.74342 31.0082 7.31329 31.5836C7.88316 32.191 8.73796 32.4787 9.78271 32.4787H36.0599Z"
              fill="#DEDEDE"
              className="dark:fill-[#DEDEDE] fill-black"
            />
          </svg>
        </div>

        {currentStep === "login" && (
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Welcome back
          </h2>
        )}
        {currentStep === "signup" && (
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Sign Up
          </h2>
        )}
        {currentStep === "signupPassword" && (
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Sign Up
          </h2>
        )}
        {currentStep === "forgotPassword" && (
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Forgot Password?
          </h2>
        )}
        {currentStep === "checkEmail" && (
          <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
            Check your email
          </h2>
        )}

        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            forgotEmail: "",
          }}
          validationSchema={
            currentStep === "login"
              ? loginSchema
              : currentStep === "signup"
              ? signupSchema
              : currentStep === "signupPassword"
              ? signupPasswordSchema
              : currentStep === "forgotPassword"
              ? forgotPasswordSchema
              : undefined
          }
          validateOnChange={true}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => {
            // Determine if the submit button should be disabled based on the current step
            const isButtonDisabled = () => {
              if (isSubmitting) return true;
              if (currentStep === "login") {
                return (
                  !values.email ||
                  !values.password ||
                  !!errors.email ||
                  !!errors.password
                );
              }
              if (currentStep === "signup") {
                return (
                  !values.email ||
                  !values.username ||
                  !!errors.email ||
                  !!errors.username
                );
              }
              if (currentStep === "signupPassword") {
                return (
                  !values.password ||
                  !values.confirmPassword ||
                  !!errors.password ||
                  !!errors.confirmPassword
                );
              }
              if (currentStep === "forgotPassword") {
                return !values.forgotEmail || !!errors.forgotEmail;
              }
              return false; // Enable for checkEmail step
            };

            return (
              <Form className="space-y-4">
                {currentStep === "login" && (
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
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    {touched.email && (
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    )}
                  </div>
                )}
                {currentStep === "signup" && (
                  <>
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
                        htmlFor="username"
                        className="dark:text-white text-black text-xl font-semibold mb-3"
                      >
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
                      {touched.username && (
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      )}
                      {values.username && (
                        <p className="text-sm text-gray-400 mt-2">
                          Your username will be:{" "}
                          <span className="text-red-600 font-semibold">
                            {values.username}
                          </span>
                        </p>
                      )}
                    </div>
                  </>
                )}
                {currentStep === "login" && (
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
                        } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2  outline-none focus:outline-none focus:ring-1 focus:ring-red-600`}
                      />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
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
                )}
                {currentStep === "signupPassword" && (
                  <>
                    <div>
                      <Label
                        htmlFor="password"
                        className="dark:text-white text-black text-xl font-semibold mb-3"
                      >
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
                          } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-red-600`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
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
                    <div>
                      <Label
                        htmlFor="confirmPassword"
                        className="dark:text-white text-black text-xl font-semibold mb-3"
                      >
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
                          } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-red-600`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {touched.confirmPassword && (
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      )}
                    </div>
                  </>
                )}
                {currentStep === "forgotPassword" && (
                  <>
                    <p className="text-sm text-center text-gray-400 mt-2">
                      Don't worry we got you covered. Please enter registered
                      email below. We will send you a verification link.
                    </p>
                    <div>
                      <Label
                        htmlFor="forgotEmail"
                        className="dark:text-white text-black text-xl font-semibold mb-3"
                      >
                        Enter your email
                      </Label>
                      <Field
                        as={Input}
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
                        } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-600`}
                      />
                      {touched.forgotEmail && (
                        <ErrorMessage
                          name="forgotEmail"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      )}
                    </div>
                  </>
                )}
                {currentStep === "checkEmail" && (
                  <p className="text-sm text-center text-gray-400 mt-2">
                    We have sent the password reset link to your email. Please
                    check your inbox and follow the instructions to reset your
                    password.
                  </p>
                )}
                {currentStep === "login" && (
                  <div className="flex justify-between items-center text-sm text-black dark:text-gray-400">
                    <label className="flex items-center gap-2">
                      <Checkbox id="remember" className="border-gray-600" />
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
                )}
                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isButtonDisabled()}
                  >
                    {currentStep === "login" && "Continue"}
                    {currentStep === "signup" && "Continue"}
                    {currentStep === "signupPassword" && "Create account"}
                    {currentStep === "forgotPassword" && "Send Reset Link"}
                    {currentStep === "checkEmail" && "Back to Login"}
                  </Button>
                </div>
                {(currentStep === "login" || currentStep === "signup") && (
                  <>
                    <div className="flex items-center my-4">
                      <div className="flex-grow h-px bg-neutral-700" />
                      <span className="px-2 text-gray-500 text-sm">or</span>
                      <div className="flex-grow h-px bg-neutral-700" />
                    </div>
                    <div className="flex justify-center gap-4 mb-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="border border-neutral-700 rounded-lg transition-all duration-200 hover:border-red-600 hover:bg-transparent"
                      >
                        <FcGoogle className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="border border-neutral-700 rounded-lg transition-all duration-200 hover:border-red-600 hover:bg-transparent"
                      >
                        <FaApple className="h-5 w-5 text-black dark:text-white" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="border border-neutral-700 rounded-lg transition-all duration-200 hover:border-red-600 hover:bg-transparent"
                      >
                        <FaFacebook className="h-5 w-5 text-blue-500" />
                      </Button>
                    </div>
                  </>
                )}
                {currentStep === "login" && (
                  <button
                    type="button"
                    className="w-full text-center text-sm text-gray-400 mt-2"
                    onClick={() => switchTo("signup")}
                  >
                    Don’t have an account?{" "}
                    <span className="text-red-600 hover:underline">Sign Up</span>
                  </button>
                )}
                {currentStep === "signup" && (
                  <>
                    <button
                      type="button"
                      className="w-full text-center text-sm text-gray-400 mt-2"
                      onClick={() => switchTo("login")}
                    >
                      Already have an account?{" "}
                      <span className="text-red-600 hover:underline">
                        Sign in here
                      </span>
                    </button>
                    <p className="text-sm text-center text-gray-400 mt-2">
                      By pressing continue I agree to Steria Terms and conditions
                    </p>
                  </>
                )}
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export function EditBioModal({ isOpen, onClose, initialValue = "", onSave }: EditBioModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-white dark:bg-neutral-900 text-white max-w-sm p-6 rounded-xl border-2 border-red-600 shadow-xl"
        showCloseButton={false}
      >
        <div className="flex justify-between items-center mb-2">
          <div />
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-black hover:bg-black/5 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full transition-all duration-200 backdrop-blur-sm dark:hover:bg-white/5"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>

        <div className="flex justify-center mb-2 text-2xl font-bold">
          <svg
            width="58"
            height="39"
            viewBox="0 0 58 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M57.9685 39H48.5024L34.414 22.7287H12.8857V16.1754H45.0199C45.9697 16.1115 46.8561 15.8877 47.5843 15.568C48.3441 15.2803 49.0723 14.8328 49.6738 14.2574C49.7688 14.1934 49.8321 14.0975 49.8954 14.0016C50.4336 13.4582 50.8135 12.8508 51.0352 12.2115C51.3834 11.2525 51.5417 10.4213 51.5417 9.52623V8.53525C51.5417 7.9918 51.3834 7.6082 51.3201 7.51229C51.2251 7.22459 51.0352 6.96885 50.8135 6.84098C50.6236 6.68115 50.3387 6.55328 50.117 6.55328H49.8638C49.8638 6.55328 49.6738 6.52131 49.5788 6.52131H25.7711V0H49.5788C51.1618 0 52.4598 0.287705 53.5046 0.831147C54.6443 1.43852 55.4675 2.1418 56.1323 2.97295C56.7971 3.86803 57.272 4.79508 57.5253 5.72213C57.8419 6.68115 57.9685 7.6082 57.9685 8.50328V9.52623C57.9685 11.0287 57.7786 12.4033 57.4303 13.65L57.367 13.8738C56.9238 15.2484 56.4172 16.3352 55.7841 17.2303C54.9609 18.3172 54.2327 19.0844 53.4413 19.7238C52.5865 20.3631 51.6683 20.9705 50.6553 21.45C49.5788 21.9295 48.6607 22.2172 47.7109 22.377C46.8245 22.6008 45.9064 22.7287 44.9882 22.7287H44.0701L58.0002 39H57.9685Z"
              fill="#EC2729"
            />
            <path
              d="M36.0599 32.4787V39H9.75105C8.76962 39 7.72486 38.8082 6.55347 38.4566C5.44539 38.1369 4.36898 37.5615 3.4192 36.7943C2.43776 35.9951 1.61462 34.9721 0.981437 33.7254C0.316593 32.4787 0 30.9443 0 29.1221V8.50328C0 7.57623 0.158296 6.64918 0.474889 5.72213C0.728163 4.79508 1.20305 3.86803 1.8679 2.97295C2.53274 2.1418 3.35588 1.43852 4.49562 0.831147C5.50871 0.287705 6.8384 0 8.38971 0H19.3122V6.52131H8.10477C8.10477 6.52131 7.94648 6.55328 7.88316 6.55328C7.62988 6.55328 7.34495 6.68115 7.18665 6.80902C6.93338 6.96885 6.77508 7.19262 6.68011 7.44836C6.52181 7.73607 6.42683 8.15164 6.42683 8.53525V29.1221C6.45849 30.177 6.74342 31.0082 7.31329 31.5836C7.88316 32.191 8.73796 32.4787 9.78271 32.4787H36.0599Z"
              fill="#DEDEDE"
              className="dark:fill-[#DEDEDE] fill-black"
            />
          </svg>
        </div>

        <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
          Tell us something about yourself
        </h2>

        <Formik
          initialValues={{ bio: initialValue }}
          validationSchema={editBioSchema}
          validateOnChange={true}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            onSave?.(values.bio);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-4">
              <div className="relative">
                <Field
                  as="textarea"
                  id="bio"
                  name="bio"
                  placeholder="Just anything"
                  className={`bg-neutral-100 dark:bg-neutral-800 border ${touched.bio && errors.bio
                      ? "border-red-500"
                      : touched.bio && !errors.bio
                        ? "border-green-500"
                        : "border-neutral-300 dark:border-neutral-800"
                    } text-black dark:text-white placeholder-dark dark:placeholder-gray-500 w-full rounded-lg px-4 py-2 resize-none min-h-[60px] max-h-[120px] focus:outline-none focus:ring-0 focus:ring-red-600 overflow-hidden scrollbar-hide pr-12`}
                  maxLength={180}
                  rows={3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bio}
                />

                <button
                  type="submit"
                  disabled={!!errors.bio || !values.bio}
                  className="absolute bottom-2 right-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="32" height="32" rx="16" fill="#212121" />
                    <path d="M11 24H13C14.0609 24 15.0783 23.5786 15.8284 22.8284C16.5786 22.0783 17 21.0609 17 20V8"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 13L17 8L22 13"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {touched.bio && (
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-500 text-sm"
                />
              )}
              <div className="text-right">
                <span className="text-gray-400 text-xs font-medium">
                  {values.bio.length} / 180
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
export function CropPhotoModal({
  isOpen,
  onClose,
  initialImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  onSave,
}: CropPhotoModalProps) {
  const cropperRef = useRef<CropperRef>(null);

  const handleSave = () => {
    if (cropperRef.current) {
      const coordinates = cropperRef.current.getCoordinates();
      const canvas = cropperRef.current.getCanvas();
      const croppedImage = canvas ? canvas.toDataURL('image/jpeg') : initialImage;
      if (coordinates) {
        onSave?.({
          imageUrl: croppedImage,
          coordinates: {
            left: coordinates.left,
            top: coordinates.top,
            width: coordinates.width,
            height: coordinates.height,
          },
        });
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-auto">
        <div className="flex flex-col items-center gap-8 p-6 sm:p-10 bg-[#121212] border-2 border-[#EF2929] rounded-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 flex items-center justify-center text-[#D0D0D0] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-center">
            <svg
              width="58"
              height="39"
              viewBox="0 0 58 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-8 sm:w-14 sm:h-10"
            >
              <path
                d="M57.9685 39H48.5024L34.414 22.7287H12.8857V16.1754H45.0199C45.9697 16.1115 46.8561 15.8877 47.5843 15.568C48.3441 15.2803 49.0723 14.8328 49.6738 14.2574C49.7688 14.1934 49.8321 14.0975 49.8954 14.0016C50.4336 13.4582 50.8135 12.8508 51.0352 12.2115C51.3834 11.2525 51.5417 10.4213 51.5417 9.52623V8.53525C51.5417 7.9918 51.3834 7.6082 51.3201 7.51229C51.2251 7.22459 51.0352 6.96885 50.8135 6.84098C50.6236 6.68115 50.3387 6.55328 50.117 6.55328H49.8638C49.8638 6.55328 49.6738 6.52131 49.5788 6.52131H25.7711V0H49.5788C51.1618 0 52.4598 0.287705 53.5046 0.831147C54.6443 1.43852 55.4675 2.1418 56.1323 2.97295C56.7971 3.86803 57.272 4.79508 57.5253 5.72213C57.8419 6.68115 57.9685 7.6082 57.9685 8.50328V9.52623C57.9685 11.0287 57.7786 12.4033 57.4303 13.65L57.367 13.8738C56.9238 15.2484 56.4172 16.3352 55.7841 17.2303C54.9609 18.3172 54.2327 19.0844 53.4413 19.7238C52.5865 20.3631 51.6683 20.9705 50.6553 21.45C49.5788 21.9295 48.6607 22.2172 47.7109 22.377C46.8245 22.6008 45.9064 22.7287 44.9882 22.7287H44.0701L58.0002 39H57.9685Z"
                fill="#EC2729"
              />
              <path
                d="M36.0599 32.4787V39H9.75105C8.76962 39 7.72486 38.8082 6.55347 38.4566C5.44539 38.1369 4.36898 37.5615 3.4192 36.7943C2.43776 35.9951 1.61462 34.9721 0.981437 33.7254C0.316593 32.4787 0 30.9443 0 29.1221V8.50328C0 7.57623 0.158296 6.64918 0.474889 5.72213C0.728163 4.79508 1.20305 3.86803 1.8679 2.97295C2.53274 2.1418 3.35588 1.43852 4.49562 0.831147C5.50871 0.287705 6.8384 0 8.38971 0H19.3122V6.52131H8.10477C8.10477 6.52131 7.94648 6.55328 7.88316 6.55328C7.62988 6.55328 7.34495 6.68115 7.18665 6.80902C6.93338 6.96885 6.77508 7.19262 6.68011 7.44836C6.52181 7.73607 6.42683 8.15164 6.42683 8.53525V29.1221C6.45849 30.177 6.74342 31.0082 7.31329 31.5836C7.88316 32.191 8.73796 32.4787 9.78271 32.4787H36.0599Z"
                fill="#DEDEDE"
              />
            </svg>
          </div>
          <div className="text-center">
            <h2 className="text-white text-xl sm:text-2xl font-bold leading-normal">Crop your photo</h2>
          </div>
          <div className="relative">
            <div className="w-80 h-80 sm:w-[360px] sm:h-[360px] relative rounded-[15px] overflow-hidden">
              <Cropper
                ref={cropperRef}
                src={initialImage}
                stencilComponent={CircleStencil}
                stencilProps={{ movable: true, resizable: true }}
                imageRestriction={ImageRestriction.fitArea}
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#212121] text-base font-bold rounded-md hover:bg-gray-100 transition-colors"
          >
            Save photo
          </button>
        </div>
      </div>
    </div>
  );
}