import { AppIcon, Footer } from "../../../@plcl-core/dist";
import { useFooter } from "../hooks/useFooter";
import { useIconSize } from "../hooks/useIconSize";
import type { AppDefinition } from "../../../@plcl-ui-types/dist";

interface DesktopFooterProps {
  openApp: (id: string) => void;
  apps: AppDefinition[];
}

export const DesktopFooter = ({ openApp, apps }: DesktopFooterProps) => {
  const { hideFooter } = useFooter();
  const { iconSize, showTitle } = useIconSize();

  const size = iconSize === "small" ? "sm" : "md";

  return (
    <Footer hideByDefault={hideFooter}>
      {apps.map((app) => (
        <AppIcon
          key={app.id}
          name={app.title}
          icon={app.icon}
          size={size}
          showTitle={showTitle}
          onClick={() => openApp(app.id)}
        />
      ))}
    </Footer>
  );
};
