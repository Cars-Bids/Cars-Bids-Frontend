import { type ApiError } from "@/features/types/types";

export function hasMessage(err: any): err is { data: ApiError } {
  return (
    err &&
    typeof err === "object" &&
    "data" in err &&
    "message" in err.data
  );
}