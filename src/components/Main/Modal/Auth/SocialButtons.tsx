import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";


export const SocialButtons = () => (
  <>
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-neutral-700" />
      <span className="px-2 text-gray-500 text-sm">or</span>
      <div className="flex-grow h-px bg-neutral-700" />
    </div>
    <div className="flex justify-center gap-4 mb-4">
      <Button variant="ghost" size="icon" className="border border-neutral-700 rounded-lg transition-all duration-200 hover:border-red-600 hover:bg-transparent">
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="border border-neutral-700 rounded-lg transition-all duration-200 hover:border-red-600 hover:bg-transparent">
        <FaApple className="h-5 w-5 text-black dark:text-white" />
      </Button>
      <Button variant="ghost" size="icon" className="border border-neutral-700 rounded-lg transition-all duration-200 hover:border-red-600 hover:bg-transparent">
        <FaFacebook className="h-5 w-5 text-blue-500" />
      </Button>
    </div>
  </>
);
