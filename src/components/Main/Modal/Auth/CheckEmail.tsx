
import { Button } from "@/components/ui/button";
import  { type FormProps } from "@/features/types/types";



export const CheckEmailForm = ({ switchTo }: FormProps) => {
  return (
    <div className="space-y-4">
      <h2 className="dark:text-white text-black text-xl font-semibold text-center mb-6">
        Check your email
      </h2>
      <p className="text-sm text-center text-gray-400 mt-2">
        We have sent the password reset link to your email. Please check your inbox and follow the instructions to reset your password.
      </p>
      <div className="flex justify-center mt-4">
        <Button
          type="button"
          className="bg-red-600 hover:bg-transparent hover:text-red-500 hover:border hover:border-red-500 transition-all duration-200 font-semibold py-2 rounded-lg"
          onClick={() => switchTo("login")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};
