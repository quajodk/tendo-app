import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ScreenWrapper from "./ScreenWrapper";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PageLoader = () => {
  return (
    <ScreenWrapper>
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={antIcon} />
      </div>
    </ScreenWrapper>
  );
};

export default PageLoader;
