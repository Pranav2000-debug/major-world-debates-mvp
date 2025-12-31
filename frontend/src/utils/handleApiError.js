import { toast } from "react-hot-toast";


export function handleApiError(err) {
  const status = err.response?.status;
  const message = err.response?.data?.message || "Something went wrong. Please try again.";
  console.log(err);
  if (status === 429) {
    toast.error(message);
    return;
  }

  toast.error(message);
}
