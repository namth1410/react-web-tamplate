import { Button, DatePicker, Form, Input, Radio, Space } from "antd";
import { postNotifications } from "appdata/notifications/notificationSlice";
import { AppDispatch, RootState } from "appdata/store";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NotificationType } from "types/notificationTypes";
import NotificationService from "utils/notification";
import styles from "./NotificationForm.module.scss";

const NotificationForm: React.FC = () => {
  const { user_id } = useParams();
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();

  const myselfRedux = useSelector((state: RootState) => state.myselfRedux);
  const admin_id = myselfRedux.me?.id;
  const [scheduleType, setScheduleType] = useState("now");

  const onFinish = (values: any) => {
    console.log("Form values:", values);

    const { title, body, scheduleTime } = values;
    // if (!user_id || !admin_id) return;

    const notificationBody = {
      title,
      message: body,
      type: NotificationType.Immediate,
      scheduleAt: scheduleTime,
      senderId: 4,
      recipientIds: [4],
      sendToAll: false,
    };
    console.log(notificationBody);
    

    dispatch(
      postNotifications({
        body: notificationBody,
      })
    )
      .unwrap()
      .then(() => {
        form.resetFields();
        NotificationService.open("success", {
          message: "Thành công!",
        });
      })
      .catch((error) => {
        NotificationService.open("error", {
          message: "Lỗi xảy ra!",
        });
        console.log(error);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className={styles.notification_form_wrapper}
    >
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        className={styles.label_form}
      >
        <Input
          placeholder="Nhập tiêu đề thông báo"
          className={styles.input_form}
        />
      </Form.Item>

      <Form.Item
        label="Nội dung message"
        name="body"
        rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        className={styles.label_form}
      >
        <Input.TextArea
          placeholder="Nhập nội dung thông báo"
          rows={4}
          className={styles.input_form}
        />
      </Form.Item>

      <Form.Item
        label="Loại thông báo"
        name="type"
        initialValue="now"
        rules={[{ required: true, message: "Vui lòng chọn loại thông báo!" }]}
        className={styles.label_form}
      >
        <Radio.Group onChange={(e) => setScheduleType(e.target.value)}>
          <Radio value="now">Thông báo ngay lập tức</Radio>
          <Radio value="schedule">Lên lịch</Radio>
        </Radio.Group>
      </Form.Item>

      {scheduleType === "schedule" && (
        <Form.Item
          label="Chọn ngày giờ"
          name="scheduleTime"
          rules={[{ required: true, message: "Vui lòng chọn ngày giờ!" }]}
          className={styles.label_form}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
            style={{ width: "100%" }}
          />
        </Form.Item>
      )}

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" className={styles.btn_form}>
            Gửi
          </Button>
          <Button htmlType="reset" className={styles.btn_form}>
            Hủy
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default NotificationForm;
