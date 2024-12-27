import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BaseApiParams,
  PageResponseData,
  PaginationMetadata,
} from "types/apiTypes";
import {
  NotificationResponse,
  NotificationStatus,
  NotificationType,
} from "types/notificationTypes";
import axiosInstance from "utils/api";
import { generateQueryParam } from "utils/urlEncode";

interface NotificationsState {
  notifications: NotificationResponse[] | undefined;
  metadataNotificationsPage: PaginationMetadata | undefined;
  countUnreadNotifications: number | undefined;
}

const initialState: NotificationsState = {
  notifications: undefined,
  metadataNotificationsPage: undefined,
  countUnreadNotifications: undefined,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = undefined;
      state.metadataNotificationsPage = undefined;
      state.countUnreadNotifications = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state, action) => {})
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload.data;
        state.metadataNotificationsPage = action.payload.page;
      })
      .addCase(getNotifications.rejected, (state, action) => {})

      .addCase(patchReadAllNotifications.pending, (state, action) => {})
      .addCase(patchReadAllNotifications.fulfilled, (state, action) => {
        state.countUnreadNotifications = undefined;
        if (state.notifications) {
          state.notifications = state.notifications.map((notification) => ({
            ...notification,
            status: NotificationStatus.Read,
          }));
        }
      })
      .addCase(patchReadAllNotifications.rejected, (state, action) => {})

      .addCase(getCountUnreadNotifications.pending, (state, action) => {})
      .addCase(getCountUnreadNotifications.fulfilled, (state, action) => {
        state.countUnreadNotifications = action.payload;
      })
      .addCase(getCountUnreadNotifications.rejected, (state, action) => {})

      .addCase(patchCancelNotification.pending, (state, action) => {})
      .addCase(patchCancelNotification.fulfilled, (state, action) => {
        const notificationId = action.payload;

        // Loại bỏ thông báo khỏi danh sách notifications
        if (state.notifications) {
          state.notifications = state.notifications.filter(
            (notification) => notification.id !== notificationId
          );
        }

        // Cập nhật metadataNotificationsPage
        if (state.metadataNotificationsPage) {
          state.metadataNotificationsPage.number_of_items -= 1;

          // Tính lại số trang nếu cần
          const { number_of_items, page_size } =
            state.metadataNotificationsPage;
          state.metadataNotificationsPage.number_of_pages = Math.ceil(
            number_of_items / page_size
          );

          // Đảm bảo current_page không vượt quá số trang hiện tại
          if (
            state.metadataNotificationsPage.current_page >
            state.metadataNotificationsPage.number_of_pages
          ) {
            state.metadataNotificationsPage.current_page =
              state.metadataNotificationsPage.number_of_pages;
          }
        }
      })
      .addCase(patchCancelNotification.rejected, (state, action) => {});
  },
});

interface GetNotificationsParams extends BaseApiParams {
  status?: string;
}

const getNotifications = createAsyncThunk<
  PageResponseData<NotificationResponse>,
  GetNotificationsParams
>("notifications/getNotifications", async (params) => {
  try {
    const { ...otherParams } = params;
    const queryStringPart = generateQueryParam(otherParams);

    const respone = await axiosInstance.get(`/notifications${queryStringPart}`);
    return respone.data;
  } catch (error) {
    throw new Error(error as any);
  }
});

interface PostNotificationsParams {
  body: {
    title: string;
    message: string;
    type: NotificationType;
    scheduleAt: string;
    senderId: number;
    recipientIds: number[];
    sendToAll: boolean;
  };
}

const postNotifications = createAsyncThunk<any, PostNotificationsParams>(
  "notifications/postNotifications",
  async (params) => {
    try {
      console.log("gui api");
      console.log(params);
      const { body } = params;

      const respone = await axiosInstance.post(`/notifications`, body, {});
      return respone.data;
    } catch (error) {
      throw new Error(error as any);
    }
  }
);

const getCountUnreadNotifications = createAsyncThunk(
  "notifications/getCountUnreadNotifications",
  async () => {
    try {
      const respone = await axiosInstance.get(`/notifications/count-unread`);
      return respone.data;
    } catch (error) {
      throw new Error(error as any);
    }
  }
);

const patchReadAllNotifications = createAsyncThunk(
  "notifications/patchReadAllNotifications",
  async () => {
    try {
      const respone = await axiosInstance.patch(
        `/notifications/read-all`,
        undefined
      );
      return respone.data;
    } catch (error) {
      throw new Error(error as any);
    }
  }
);

interface PatchCancelNotificationParams {
  tenant_id: string;
  notification_id: string;
}

const patchCancelNotification = createAsyncThunk<
  string,
  PatchCancelNotificationParams
>(
  "notifications/patchCancelNotification",
  async (params, { rejectWithValue }) => {
    try {
      const { tenant_id, notification_id } = params;

      const respone = await axiosInstance.patch(
        `/notifications/${notification_id}/cancel`,
        undefined,
        {
          headers: {
            "x-tenant-id": tenant_id,
          },
        }
      );

      return respone.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export {
  getCountUnreadNotifications,
  getNotifications,
  patchCancelNotification,
  patchReadAllNotifications,
  postNotifications,
};
export const { clearNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
