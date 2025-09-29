
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

export const sellCarSchema = Yup.object({
  fullName: Yup.string()
      .min(2, "Min 2 chars")
      .max(60, "Max 60 chars")
      .required("Required"),

  phone: Yup.string()
      .matches(/^\+380\d{9}$/, "Phone must be in format +380XXXXXXXXX")
      .required("Required"),

  vin: Yup.string()
      .length(17, "VIN must be exactly 17 characters")
      .matches(/^[A-HJ-NPR-Z0-9]+$/, "VIN must contain only valid characters")
      .required("Required"),

  brandId: Yup.number()
      .min(0, "Incorrect brand")
      .required("Required"),

  modelId: Yup.number()
      .min(0, "Incorrect model")
      .required("Required"),

  transmissionId: Yup.number().required("Transmission is required"),

  year: Yup.number()
      .typeError("Enter a valid year")
      .min(1950, "Year too low")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required("Required"),

  description: Yup.string()
      .max(180, "Maximum 180 characters allowed"),

  mileage: Yup.number()
      .typeError("Enter a valid mileage")
      .min(0, "Mileage cannot be negative")
      .max(1_000_000, "Mileage too high")
      .required("Required"),

  isOnSalleElsewhere: Yup.boolean()
      .required("Please select an option"),

  isModified: Yup.boolean()
      .required("Please select an option"),

  photos: Yup.array()
      .min(3, "3 photos required")
      .max(3, "3 photos only")
      .required("Photos are required")

});

export const validationUpdateCarCommandSchema = Yup.object({
  brandId: Yup.number(),
  modelId: Yup.number(),
  mileage: Yup.string(),
  year: Yup.string(),
  vin: Yup.string(),
  location: Yup.string(),
  exteriorColor: Yup.string(),
  interiorColor: Yup.string(),
  engine: Yup.string(),
  drivetrainId: Yup.number().nullable(),
  transmissionId: Yup.number().nullable(),
  bodyStyleId: Yup.number().nullable(),
  speeds: Yup.string(),
  startPrice: Yup.string(),
  startTime: Yup.string(),
  endTime: Yup.string(),
  isInspected: Yup.boolean(),
  highlights: Yup.string(),
  serviceHistory: Yup.string(),
  equipment: Yup.string(),
  flaws: Yup.string(),
  modifications: Yup.string(),
  otherItems: Yup.string(),
  ownershipHistory: Yup.string(),
  sellerNotes: Yup.string(),
  videoLinks: Yup.string(),
  about: Yup.string(),
});