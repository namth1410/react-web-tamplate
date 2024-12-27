export enum NotificationStatus {
  Pending = "pending",
  Sent = "sent",
  Read = "read",
  Fail = "fail",
}

export interface NotificationResponse {
  attachment_url: string;
  body: string;
  created_at: string;
  id: string;
  metadata: string;
  priority: number;
  read_at: string;
  receiver_id: string;
  sender_id: string;
  sent_at: string;
  status: NotificationStatus;
  tenant_id: string;
  title: string;
  type: string;
  updated_at: string;
}
