export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormProps {
  switchTo: (
    step:
      | "login"
      | "signup"
      | "signupPassword"
      | "forgotPassword"
      | "checkEmail"
      | "resetMail"
      | "confirmResetEmail"
      | "Error",
    data?: { email: string; username: string }
  ) => void;
  onClose: () => void;
  initialEmail?: string;
  initialUsername?: string;
  resetToken?: string;
  Email?: string;
  tokenError? : string;
}

export interface EditBioModalProps extends PopupProps {
  initialValue?: string;
  onSave?: (bio: string) => void;
}

export interface CropPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialImage?: string;
  onSave?: (data: {
    imageUrl: string;
    coordinates: { left: number; top: number; width: number; height: number };
  }) => void;
}
export interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  forgotEmail: string;
  rememberMe: boolean;
}

export interface ApiError {
  status: number;
  message: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}