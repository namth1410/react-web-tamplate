// src/global.d.ts

interface Window {
  _env_: {
    REACT_APP_REDIRECT_URI?: string;
    REACT_APP_API_URL?: string;
    REACT_APP_CMS_URL?: string;
    REACT_APP_AUTH_URL?: string;
    // Thêm các thuộc tính khác mà bạn cần ở đây
  };
}
