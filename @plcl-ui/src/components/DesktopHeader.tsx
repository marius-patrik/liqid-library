import { Header } from "../../../@plcl-core/dist";
import { Clock } from "./Clock";

export const DesktopHeader = () => {
  return (
    <Header className="system-overlay-10 w-screen">
      <Clock />
    </Header>
  );
};
