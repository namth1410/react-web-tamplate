import { ConfigProvider } from "antd";
import AppRoutes from "AppRoutes";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./appdata/store";

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Gilroy",
          },
        }}
      >
        <AppRoutes />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
