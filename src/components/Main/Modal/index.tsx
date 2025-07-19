import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { ArrowLeft } from "lucide-react";
interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthPopup({ isOpen, onClose }: PopupProps) {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");

  const [currentStep, setCurrentStep] = useState<
    "login" | "signup" | "signupPassword" | "forgotPassword" | "checkEmail"
  >("login");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === "login") {
      console.log("Login attempt with:", {
        email: loginData.email,
        password: loginData.password,
      });
      onClose();
    } else if (currentStep === "signup") {
      setCurrentStep("signupPassword");
    } else if (currentStep === "signupPassword") {
      console.log("Sign up with:", signupData);
      onClose();
    } else if (currentStep === "forgotPassword") {
      console.log("Sending reset link to:", forgotEmail);
      switchTo("checkEmail");
    }
    else if (currentStep === "checkEmail") {
      console.log("Check email step");
      setCurrentStep("login");
    }
  };
  type Step =
    | "login"
    | "signup"
    | "signupPassword"
    | "forgotPassword"
    | "checkEmail";

  const switchTo = (step: Step) => {
    setCurrentStep(step);

    if (step === "login") {
      setLoginData({ email: "", password: "" });
    }

    if (step === "signup") {
      setSignupData({
  
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }

    if (step === "signupPassword") {
      setSignupData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    }
    if (step === "forgotPassword") {
      setForgotEmail("");
    }
    if (step === "checkEmail") {
      setForgotEmail("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-neutral-900 text-white max-w-sm p-6 rounded-xl border border-red-600 shadow-xl"
        showCloseButton={false}
      >
        <div className="flex justify-between items-center mb-2">
          {/* Back Button — лише якщо не login */}
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
              className="text-gray-400 hover:text-white rounded-full transition-all duration-200 backdrop-blur-sm hover:bg-white/5"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <div /> // Щоб зберегти простір зліва
          )}

          {/* Close Button — завжди праворуч */}
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white rounded-full transition-all duration-200 backdrop-blur-sm hover:bg-white/5"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </div>

        {/* Logo */}
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
            />
          </svg>
        </div>

        {/* Welcome Text */}
        {currentStep === "login" && (
          <h2 className="text-xl font-semibold text-center mb-6">
            Welcome back
          </h2>
        )}
        {currentStep === "signup" && (
          <h2 className="text-xl font-semibold text-center mb-6">Sign Up</h2>
        )}
        {currentStep === "signupPassword" && (
          <h2 className="text-xl font-semibold text-center mb-6">Sign Up</h2>
        )}
        {currentStep === "forgotPassword" && (
          <h2 className="text-xl font-semibold text-center mb-6">
            Forgot Password?
          </h2>
        )
        }
        {currentStep === "checkEmail" && (
          <h2 className="text-xl font-semibold text-center mb-6">
            Check your email
          </h2>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep == "login" && (
            <div>
              <Label htmlFor="email" className="text-xl font-semibold mb-3">
                Enter your email
              </Label>
              <Input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                placeholder="example@yourmail.com"
                required
                className="bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 w-full rounded-lg px-4 py-2"
              />
            </div>
          )}
          {currentStep == "signup" && (
            <div>
              <Label htmlFor="email" className="text-xl font-semibold mb-3">
                Enter your email
              </Label>
              <Input
                id="email"
                type="email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                placeholder="example@yourmail.com"
                required
                className="bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 w-full rounded-lg px-4 py-2"
              />
            </div>
          )}

          {currentStep === "signup" && (
            <div>
              <Label htmlFor="username" className="text-xl font-semibold mb-3">
                Enter your username
              </Label>
              <Input
                id="username"
                type="text"
                value={signupData.username}
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
                placeholder="Your username"
                required
                className="bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 w-full rounded-lg px-4 py-2"
              />
            </div>
          )}

          {currentStep === "login" && (
            <div>
              {" "}
              <Label htmlFor="password" className="text-xl font-semibold mb-3">
                Enter your password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  placeholder="example password"
                  required
                  className="bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 w-full rounded-lg px-4 py-2 pr-10"
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
            </div>
          )}

          {currentStep === "signupPassword" && (
            <>
              <Label htmlFor="password" className="text-xl font-semibold mb-3">
                Create your password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  placeholder="Password"
                  required
                  className="bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 w-full rounded-lg px-4 py-2 pr-10"
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
              <Label
                htmlFor="confirmPassword"
                className="text-xl font-semibold mb-3"
              >
                Confirm password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm Password"
                  required
                  className="bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 w-full rounded-lg px-4 py-2 pr-10"
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
            </>
          )}

          {currentStep === "forgotPassword" && (
            <>
              <p className="text-sm text-center text-gray-400 mt-2">
                Don't worry we got you covered. Please enter registered email
                below. We will send you a verification link.
              </p>
              <Label
                htmlFor="forgotEmail"
                className="text-xl font-semibold mb-3"
              >
                Enter your email
              </Label>
              <Input
                id="forgotEmail"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="example@yourmail.com"
                required
                className="bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 w-full rounded-lg px-4 py-2"
              />
            </>
          )}
          {currentStep === "checkEmail" && (
            <>
              <p className="text-sm text-center text-gray-400 mt-2">
               We have sent the password reset link to your email. Please check your inbox and follow the instructions to reset your password.
              </p>
              
            </>
          )}
          {currentStep === "login" && (
            <div className="flex justify-between items-center text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <Checkbox id="remember" className="border-gray-600" />
                Remember me
              </label>
              <button
                type="button"
                className="hover:underline text-gray-300"
                onClick={() => switchTo("forgotPassword")}
              >
                Forgot password?
              </button>
            </div>
          )}
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className=" bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg"
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
              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-neutral-700" />
                <span className="px-2 text-gray-500 text-sm">or</span>
                <div className="flex-grow h-px bg-neutral-700" />
              </div>

              {/* Social Login */}
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
                  <FaApple className="h-5 w-5 text-white" />
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
