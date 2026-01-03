import type { ReactNode } from "react";
import type { AppWindowProps } from "../../../@plcl-ui-types/dist";
import { Window } from "./Window";

interface IFrameAppProps extends AppWindowProps {
  /** URL of the external app to embed */
  url: string;
  /** Title displayed in the window header */
  title: string;
  /** Icon displayed next to the title */
  icon: ReactNode;
}

/**
 * Reusable component for wrapping standalone web apps with an iframe inside a Window.
 * Enables external apps to run within the desktop environment.
 */
export const IFrameApp = ({
  url,
  title,
  icon,
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: IFrameAppProps) => {
  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          {icon} {title}
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}>
      <iframe
        src={url}
        title={title}
        className="w-full h-full border-none rounded-lg"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
      />
    </Window>
  );
};
