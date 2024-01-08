import { ToastPosition, TypeOptions } from "react-toastify";

type ToastBoxOptionsInterface = {
  hideProgressBar: boolean;
  closeButton: boolean;
  position: ToastPosition;
  pauseOnFocusLoss: boolean;
  autoClose?: number | false;
};

export interface ToastBoxInterface {
  type: TypeOptions;
  text: string;
  options?: ToastBoxOptionsInterface;
}
