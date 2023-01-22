import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const fetchData = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  console.log({ response });
  return response;
};

const message = {
  // Default
  default: (text) =>
    toast(text, {
      duration: 5000,
    }),

  // Success
  /**
   *
   * @param {string} text text to display on the toast
   * @param {number} time toast duration in secondss (default 5)
   * @returns toast
   */
  success: (text, time = 5) =>
    toast.success(text, {
      duration: time * 1000,
    }),

  // Error
  /**
   *
   * @param {string} text text to display on the toast
   * @param {number} time toast duration in secondss (default 5)
   * @returns toast
   */
  error: (text, time = 5) =>
    toast.error(text, {
      duration: time * 1000,
    }),

  // warning
  /**
   *
   * @param {string} text text to display on the toast
   * @param {number} time toast duration in secondss (default 5)
   * @returns toast
   */
  warning: (text, time = 5) =>
    toast.warning(text, {
      duration: time * 1000,
    }),

  // Promise

  PromiseNotify: () =>
    toast.promise(fetchData(), {
      loading: "loading...",
      success: "Successfully get data",
      error: "error occurs in data",
    }),

  // Emoji or icon
  IconNotify: () =>
    toast("Good Job!", {
      icon: "👏",
    }),
};
export default message;
