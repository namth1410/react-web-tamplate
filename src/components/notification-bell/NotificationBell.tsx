import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, List, Popover, Tooltip, Typography } from "antd";
import {
  getCountUnreadNotifications,
  getNotifications,
  patchReadAllNotifications,
} from "appdata/notifications/notificationSlice";
import { AppDispatch, RootState } from "appdata/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NotificationResponse,
  NotificationStatus,
} from "types/notificationTypes";

const { Text } = Typography;

const NotificationBell: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const myselfRedux = useSelector((state: RootState) => state.myselfRedux);

  const notificationsRedux = useSelector(
    (state: RootState) => state.notificationRedux
  );

  const [notifications, setNotifications] = useState<
    NotificationResponse[] | undefined
  >(undefined);

  const markAllAsRead = () => {
    dispatch(patchReadAllNotifications());
  };

  const content = (
    <div style={{ width: 300 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text strong>Thông báo</Text>
        {notificationsRedux.countUnreadNotifications &&
          notificationsRedux.countUnreadNotifications > 0 && (
            <Button size="small" type="link" onClick={markAllAsRead}>
              Đọc tất cả
            </Button>
          )}
      </div>
      <List
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: "8px",
              borderBottom: "1px solid #f0f0f0",
              backgroundColor:
                item.status === NotificationStatus.Sent
                  ? "#fef4e5"
                  : "transparent",
            }}
          >
            <List.Item.Meta
              title={
                <Text strong={item.status === NotificationStatus.Sent}>
                  {item.title}
                </Text>
              }
              description={item.body}
            />
          </List.Item>
        )}
        locale={{ emptyText: "Không có thông báo nào" }}
        style={{ maxHeight: 200, overflowY: "auto" }}
      />
    </div>
  );

  useEffect(() => {
    if (!notificationsRedux.notifications) return;
    setNotifications(notificationsRedux.notifications);
  }, [notificationsRedux]);

  useEffect(() => {
    dispatch(getNotifications({}));
    dispatch(getCountUnreadNotifications());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myselfRedux]);

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomRight"
      overlayClassName="notification-popover"
    >
      <Tooltip title="Thông báo">
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "#f0f2f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginRight: "20px",
          }}
        >
          <Badge count={notificationsRedux.countUnreadNotifications}>
            <BellOutlined style={{ fontSize: 24, cursor: "pointer" }} />
          </Badge>
        </div>
      </Tooltip>
    </Popover>
  );
};

export default NotificationBell;
