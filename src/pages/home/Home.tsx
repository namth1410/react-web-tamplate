import { useEffect } from "react";
import { io } from "socket.io-client";
import NotificationService from "utils/notification";

function Home() {
  useEffect(() => {
    // Kết nối WebSocket
    const socketConnection = io("http://localhost:3001", {
      query: { userId: 4 }, // Thay "123" bằng userId của người dùng hiện tại
    });
    // Lắng nghe sự kiện 'receiveNotification' từ server
    socketConnection.on("receiveNotification", (message) => {
      // Xử lý thông báo nhận được
      console.log(message);
    });

    socketConnection.on("notification", (data) => {
      console.log("Received notification:", data.message);

      NotificationService.open("success", {
        message: data.message,
      });
      // Xử lý thông báo (Ví dụ: Hiển thị trong UI)
    });

    // Dọn dẹp khi component unmount
    return () => {
      socketConnection.off("receiveNotification");
      socketConnection.close();
    };
  }, []);

  return <div>Home</div>;
}

export default Home;
