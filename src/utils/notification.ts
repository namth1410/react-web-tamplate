import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationOptions {
  message?: string;
  description?: string;
  duration?: number;
  showProgress?: boolean;
  pauseOnHover?: boolean;
}

const NotificationService = {
  open: (
    type: NotificationType,
    {
      message = "",
      description = "",
      duration = 3,
      showProgress = true,
      pauseOnHover = true,
    }: NotificationOptions
  ) => {
    notification[type]({
      message,
      description,
      duration,
      showProgress,
      pauseOnHover,
    });
  },
};

export default NotificationService;
