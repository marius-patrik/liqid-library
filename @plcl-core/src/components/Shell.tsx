import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconMaximize,
  IconMinimize,
  IconSearch,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import type { AppDefinition } from "../../../@plcl-core-types/dist";
import type { FC, PropsWithChildren, ReactNode } from "react";
import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as React from "react";
import { DesktopLayoutProvider } from "../hooks/useDesktopLayout";
import { FooterProvider, useFooter } from "../hooks/useFooter";
import { IconSizeProvider, useIconSize } from "../hooks/useIconSize";
import { ThemeProvider } from "../hooks/useTheme";
import { WallpaperProvider } from "../hooks/useWallpaper";
import AppIcon from "./AppIcon";
import { DesktopIcons } from "./Desktop/Apps";
import { Clock } from "./Desktop/Clock";
import { Desktop } from "./Desktop/Desktop";
import { Search } from "./Desktop/Search";
import { Settings } from "./Desktop/Settings";
import { Wallpaper } from "./Desktop/Wallpaper";
import { WindowManager } from "./Desktop/WindowManager";
import Footer from "./Footer";
import type { FooterVariant } from "./Footer";
import Header from "./Header";
import type { HeaderVariant } from "./Header";
import Main from "./Main";
import type { MainVariant } from "./Main";
import NavigationMenu from "./NavigationMenu";
import type { NavigationMenuItem } from "./NavigationMenu";
import Sidebar from "./Sidebar";

// Shell.Item subcomponent for defining pages
export interface ShellItemProps extends PropsWithChildren {
  id: string;
  title: string;
  icon?: ReactNode;
}

const ShellItem: FC<ShellItemProps> = ({ children }) => {
  // This component is just a marker - the actual rendering is handled by Shell
  return <>{children}</>;
};

export type ShellVariant =
  | "app"
  | "desktop"
  | "page"
  | "sidebar"
  | "web"
  | "window";

export interface ShellProps {
  variant: ShellVariant;

  // Background
  backgroundImage?: string;
  backgroundOverlay?: string;

  // Desktop-specific props
  customApps?: AppDefinition[];

  // Web variant props
  url?: string;

  // Window variant props
  windowTitle?: ReactNode;
  windowHandleClose?: () => void;
  windowZIndex?: number;
  windowOnFocus?: () => void;
  windowState?: {
    position: { x: number; y: number };
    size: { width: number; height: number };
    isFullscreen: boolean;
    isMaximized: boolean;
    isDragging: boolean;
    isResizing: boolean;
  };
  onWindowStateChange?: (state: {
    position: { x: number; y: number };
    size: { width: number; height: number };
    isFullscreen: boolean;
    isMaximized: boolean;
    isDragging: boolean;
    isResizing: boolean;
  }) => void;

  // Component variants (auto-set based on shell variant if not provided)
  headerVariant?: HeaderVariant;
  footerVariant?: FooterVariant;
  mainVariant?: MainVariant;

  // Content props - allows inline content
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  mainContent?: ReactNode;

  // Component props - allows passing full components
  header?: ReactNode;
  footer?: ReactNode;
  main?: ReactNode;
  sidebar?: ReactNode;
  sidebarContent?: ReactNode; // Alias for sidebar

  // Navigation (legacy props for compatibility)
  menuItems?: NavigationMenuItem[];
  pages?: Record<string, ReactNode>;
  defaultPageId?: string;
  onPageChange?: (pageId: string) => void;

  // Navigation (new props)
  navigationItems?: NavigationMenuItem[];
  defaultActivePageId?: string;

  // Layout options
  isMainScrollable?: boolean;
  isScrollable?: boolean; // Alias for isMainScrollable
  isSidebarScrollable?: boolean;
}

const ShellComponent: FC<PropsWithChildren<ShellProps>> = ({
  variant,
  backgroundImage,
  backgroundOverlay,
  customApps = [],
  url,
  windowTitle,
  windowHandleClose,
  windowZIndex,
  windowOnFocus,
  windowState,
  onWindowStateChange,
  headerVariant,
  footerVariant,
  mainVariant,
  headerContent,
  footerContent,
  mainContent,
  header,
  footer,
  main,
  sidebar,
  sidebarContent,
  menuItems,
  navigationItems,
  pages,
  defaultPageId,
  defaultActivePageId,
  onPageChange,
  isMainScrollable,
  isScrollable,
  isSidebarScrollable = true,
  children,
}) => {
  // Auto-set variants based on shell variant if not provided (exclude 'web' variant)
  const finalHeaderVariant =
    headerVariant ||
    (variant === "web" ? undefined : (variant as HeaderVariant));
  const finalFooterVariant =
    footerVariant ||
    (variant === "web" ? undefined : (variant as FooterVariant));
  const finalMainVariant =
    mainVariant || (variant === "web" ? undefined : (variant as MainVariant));

  // Handle scrollable prop aliases
  const finalIsMainScrollable = isMainScrollable ?? isScrollable ?? true;

  // Handle sidebar content
  const finalSidebar = sidebarContent || sidebar;

  // Extract Shell.Item children and build menu items and pages
  const { shellItems, shellPages, shellNavItems } = useMemo(() => {
    const items: ShellItemProps[] = [];
    const pages: Record<string, ReactNode> = {};
    const navItems: NavigationMenuItem[] = [];

    Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === ShellItem) {
        const props = child.props as ShellItemProps;
        items.push(props);
        pages[props.id] = props.children;
        navItems.push({
          id: props.id,
          label: props.title,
          icon: props.icon,
        });
      }
    });

    return {
      shellItems: items,
      shellPages: pages,
      shellNavItems: navItems,
    };
  }, [children]);

  // Handle navigation items (support Shell.Item children, new props, and legacy props)
  const navItems =
    shellNavItems.length > 0
      ? shellNavItems
      : navigationItems || menuItems || [];
  const activePageId =
    defaultActivePageId ||
    defaultPageId ||
    navItems[0]?.id ||
    shellItems[0]?.id ||
    "";

  // Handle page content from pages prop or Shell.Item children
  const [currentPageId, setCurrentPageId] = React.useState(activePageId);

  // Sync with external defaultPageId/defaultActivePageId changes
  React.useEffect(() => {
    const newActivePageId =
      defaultActivePageId ||
      defaultPageId ||
      navItems[0]?.id ||
      shellItems[0]?.id ||
      "";
    if (newActivePageId && newActivePageId !== currentPageId) {
      setCurrentPageId(newActivePageId);
    }
  }, [defaultActivePageId, defaultPageId]);

  React.useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPageId);
    }
  }, [currentPageId, onPageChange]);

  // Determine which content to use (inline content takes precedence)
  // If menuItems/navigationItems are provided, wrap header content with NavigationMenu
  let finalHeader = headerContent || header;
  if (navItems.length > 0 && finalHeader) {
    const navVariant =
      finalHeaderVariant ||
      (variant === "sidebar"
        ? "sidebar"
        : variant === "app"
          ? "app"
          : variant === "desktop"
            ? "desktop"
            : "page");
    finalHeader = (
      <NavigationMenu
        items={navItems}
        defaultActiveId={currentPageId}
        onItemChange={(id) => {
          setCurrentPageId(id);
        }}
        variant={navVariant}>
        <div className="flex items-center gap-4 w-full">
          {headerContent || header}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavigationMenu.Item key={item.id} {...item} />
            ))}
          </div>
        </div>
      </NavigationMenu>
    );
  }
  const finalFooter = footerContent || footer;

  // Use page content from Shell.Item children, pages prop, or mainContent/main/children
  let finalMain = mainContent || main;
  if (shellPages && currentPageId && shellPages[currentPageId]) {
    finalMain = shellPages[currentPageId];
  } else if (pages && currentPageId && pages[currentPageId]) {
    finalMain = pages[currentPageId];
  } else if (shellPages && currentPageId && !shellPages[currentPageId]) {
    // Fallback to first available Shell.Item page if currentPageId doesn't exist
    const firstPageId = Object.keys(shellPages)[0];
    if (firstPageId) {
      finalMain = shellPages[firstPageId];
    }
  } else if (pages && currentPageId && !pages[currentPageId]) {
    // Fallback to first available page if currentPageId doesn't exist
    const firstPageId = Object.keys(pages)[0];
    if (firstPageId) {
      finalMain = pages[firstPageId];
    }
  } else if (!finalMain) {
    // Fallback to children if no other content is provided
    finalMain = children;
  }

  // Web variant - iframe only, no header/footer
  if (variant === "web") {
    if (!url) {
      return null;
    }
    return (
      <div className="fixed inset-0 w-full h-full">
        <iframe
          src={url}
          title="Web App"
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        />
      </div>
    );
  }

  // Window variant - managed window with title bar and controls
  if (variant === "window") {
    if (
      !windowState ||
      !windowTitle ||
      !windowHandleClose ||
      windowZIndex === undefined ||
      !windowOnFocus
    ) {
      return null;
    }

    const {
      position,
      size,
      isFullscreen,
      isMaximized,
      isDragging,
      isResizing,
    } = windowState;
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

    const handleFullscreen = () => {
      if (onWindowStateChange) {
        onWindowStateChange({
          ...windowState,
          isFullscreen: true,
          isMaximized: false,
        });
      }
    };

    const cancelFullscreen = () => {
      if (onWindowStateChange) {
        onWindowStateChange({
          ...windowState,
          isFullscreen: false,
          isMaximized: false,
        });
      }
    };

    const handleMaximize = () => {
      if (onWindowStateChange) {
        onWindowStateChange({
          ...windowState,
          isFullscreen: false,
          isMaximized: true,
        });
      }
    };

    const cancelMaximize = () => {
      if (onWindowStateChange) {
        onWindowStateChange({
          ...windowState,
          isFullscreen: false,
          isMaximized: false,
        });
      }
    };

    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (isFullscreen || isMaximized) return;
        if (onWindowStateChange) {
          onWindowStateChange({
            ...windowState,
            isDragging: true,
          });
        }
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        dragOffset.current = {
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        };
      },
      [position, isFullscreen, isMaximized, windowState, onWindowStateChange],
    );

    const handleResizePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (isFullscreen || isMaximized) return;
        e.stopPropagation();
        if (onWindowStateChange) {
          onWindowStateChange({
            ...windowState,
            isResizing: true,
          });
        }
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        resizeStart.current = {
          x: e.clientX,
          y: e.clientY,
          width: size.width,
          height: size.height,
        };
      },
      [size, isFullscreen, isMaximized, windowState, onWindowStateChange],
    );

    useEffect(() => {
      if (!onWindowStateChange) return;

      const handlePointerMove = (e: PointerEvent) => {
        if (isDragging) {
          onWindowStateChange({
            ...windowState,
            position: {
              x: e.clientX - dragOffset.current.x,
              y: e.clientY - dragOffset.current.y,
            },
          });
        }
        if (isResizing) {
          const deltaX = e.clientX - resizeStart.current.x;
          const deltaY = e.clientY - resizeStart.current.y;
          onWindowStateChange({
            ...windowState,
            size: {
              width: Math.max(200, resizeStart.current.width + deltaX),
              height: Math.max(150, resizeStart.current.height + deltaY),
            },
          });
        }
      };

      const handlePointerUp = () => {
        onWindowStateChange({
          ...windowState,
          isDragging: false,
          isResizing: false,
        });
      };

      if (isDragging || isResizing) {
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp);
      }

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }, [isDragging, isResizing, windowState, onWindowStateChange]);

    const windowStyle =
      isFullscreen || isMaximized
        ? { zIndex: isFullscreen ? 9998 : windowZIndex }
        : {
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            zIndex: windowZIndex,
          };

    return (
      // biome-ignore lint/a11y/useSemanticElements: Window needs to be a div for positioning and styling
      <div
        role="dialog"
        style={windowStyle}
        onMouseDown={windowOnFocus}
        className={`border border-zinc-400/40 bg-zinc-600/60 backdrop-blur-xs shadow-lg absolute rounded-3xl min-w-xs p-2 flex flex-col gap-1 animate-scale-in pointer-events-auto ${isMaximized ? "left-0! top-6! w-full! h-[calc(99vh-1rem)]!" : ""} ${isFullscreen ? "left-0! top-0! w-full! h-full! rounded-none" : ""}`}>
        <div
          role="toolbar"
          className="flex flex-row gap-1 cursor-move select-none touch-none"
          onPointerDown={handlePointerDown}
          onDoubleClick={() => {
            if (isMaximized || isFullscreen) {
              cancelMaximize();
            } else {
              handleMaximize();
            }
          }}>
          <div className="border border-zinc-400/40 bg-zinc-600/60 backdrop-blur-xs shadow-lg rounded-xl rounded-tl-2xl p-3 flex flex-row w-full">
            {windowTitle}
          </div>

          <div
            className="border border-zinc-400/40 bg-zinc-600/60 backdrop-blur-xs shadow-lg rounded-xl rounded-tr-2xl p-3 flex flex-row ml-auto gap-2"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}>
            <IconX
              size={20}
              className="button hover-scale"
              onClick={windowHandleClose}
            />

            {isMaximized ? (
              <IconMinimize
                size={20}
                className="button hover-scale"
                onClick={cancelMaximize}
              />
            ) : (
              <IconMaximize
                size={20}
                className="button hover-scale"
                onClick={handleMaximize}
              />
            )}

            {isFullscreen ? (
              <IconArrowsMinimize
                size={20}
                className="button hover-scale"
                onClick={cancelFullscreen}
              />
            ) : (
              <IconArrowsMaximize
                size={20}
                className="button hover-scale"
                onClick={handleFullscreen}
              />
            )}
          </div>
        </div>

        <div className="border border-zinc-400/40 bg-zinc-600/60 backdrop-blur-xs shadow-lg rounded-xl rounded-b-2xl w-full h-full p-2 overflow-auto">
          {finalMain}
        </div>

        {!isFullscreen && !isMaximized && (
          <div
            className="absolute bottom-1 right-1 w-4 h-4 cursor-se-resize touch-none"
            onPointerDown={handleResizePointerDown}
          />
        )}
      </div>
    );
  }

  // Desktop variant - integrates Explorer functionality
  if (variant === "desktop") {
    const DesktopContent = () => {
      const [searchOpen, setSearchOpen] = useState(false);
      const [windowStates, setWindowStates] = useState<Record<string, boolean>>(
        {},
      );
      const [focusFunctions, setFocusFunctions] = useState<
        Record<string, () => void>
      >({});

      const coreApps: AppDefinition[] = useMemo(
        () => [
          {
            id: "Settings",
            title: "Settings",
            icon: <IconSettings size={32} />,
            Component: Settings,
          },
        ],
        [],
      );

      const allApps = useMemo(
        () => [...coreApps, ...customApps],
        [coreApps, customApps],
      );

      const allAppsWithSearch = useMemo(
        () => [
          {
            id: "Search",
            title: "Search",
            icon: <IconSearch size={32} />,
            Component: () => null, // Search is generic overlay
          },
          ...allApps,
        ],
        [allApps],
      );

      const handleFocusReady = useCallback(
        (fns: Record<string, () => void>) => {
          setFocusFunctions(fns);
        },
        [],
      );

      const openApp = useCallback((id: string) => {
        if (id === "Search") {
          setSearchOpen(true);
        } else {
          setWindowStates((prev) => ({ ...prev, [id]: true }));
        }
      }, []);

      const closeApp = useCallback((id: string) => {
        if (id === "Search") {
          setSearchOpen(false);
        } else {
          setWindowStates((prev) => ({ ...prev, [id]: false }));
        }
      }, []);

      const { hideFooter } = useFooter();
      const { iconSize, showTitle } = useIconSize();

      const size = iconSize === "small" ? "sm" : "md";

      return (
        <>
          <WindowManager
            apps={allApps}
            openStates={windowStates}
            onClose={closeApp}
            onFocusReady={handleFocusReady}
          />

          <Search
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            appStates={windowStates}
            openApp={openApp}
            focusApp={focusFunctions}
            apps={allApps}
          />

          <Desktop>{mainContent || <DesktopIcons openApp={openApp} />}</Desktop>

          {footerContent || (
            <Footer
              variant={"desktop" as FooterVariant}
              hideByDefault={hideFooter}>
              {allAppsWithSearch.map((app) => (
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
          )}
        </>
      );
    };

    return (
      <ThemeProvider>
        <IconSizeProvider>
          <FooterProvider>
            <WallpaperProvider>
              <DesktopLayoutProvider customApps={customApps}>
                <div className="fixed inset-0 overflow-hidden w-full h-full select-none">
                  {/* Background Image Layer */}
                  {backgroundImage && (
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500"
                      style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                  )}

                  {/* Background Overlay Layer */}
                  {backgroundOverlay && (
                    <div
                      className={`absolute inset-0 z-0 transition-all duration-500 ${backgroundOverlay}`}
                    />
                  )}

                  <Wallpaper>
                    {headerContent || (
                      <div className="absolute z-50 top-0 w-full flex justify-center pointer-events-none pt-2">
                        <Header
                          variant={"desktop" as HeaderVariant}
                          className="system-overlay-10 w-screen">
                          <Clock />
                        </Header>
                      </div>
                    )}
                    <DesktopContent />
                  </Wallpaper>
                </div>
              </DesktopLayoutProvider>
            </WallpaperProvider>
          </FooterProvider>
        </IconSizeProvider>
      </ThemeProvider>
    );
  }

  // App variant
  if (variant === "app") {
    return (
      <ThemeProvider>
        <div className="h-screen w-screen overflow-y-scroll overflow-x-hidden">
          {finalHeader && (
            <>
              <Header variant={finalHeaderVariant}>{finalHeader}</Header>
              <div className="h-16 md:h-18" />
            </>
          )}

          <Main variant={finalMainVariant} isScrollable={finalIsMainScrollable}>
            {finalMain}
          </Main>

          {finalFooter && (
            <div className="mx-auto">
              <Footer variant={finalFooterVariant}>{finalFooter}</Footer>
            </div>
          )}
        </div>
      </ThemeProvider>
    );
  }

  // Sidebar variant
  if (variant === "sidebar") {
    return (
      <ThemeProvider>
        <div className="flex h-screen w-full text-slate-900 dark:text-slate-100 transition-colors duration-300 shell-bg">
          {finalSidebar && (
            <Sidebar isScrollable={isSidebarScrollable}>{finalSidebar}</Sidebar>
          )}

          <div className="flex flex-col flex-1 min-w-0">
            {finalHeader && (
              <Header variant={finalHeaderVariant}>{finalHeader}</Header>
            )}

            <Main
              variant={finalMainVariant}
              isScrollable={finalIsMainScrollable}>
              {finalMain}
            </Main>

            {finalFooter && (
              <Footer variant={finalFooterVariant}>{finalFooter}</Footer>
            )}
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Page variant (default)
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen w-full text-slate-900 dark:text-slate-100 transition-colors duration-300 shell-bg">
        {finalHeader && (
          <Header variant={finalHeaderVariant}>{finalHeader}</Header>
        )}

        <Main
          key={currentPageId}
          variant={finalMainVariant}
          isScrollable={finalIsMainScrollable}>
          {finalMain}
        </Main>

        {finalFooter && (
          <Footer variant={finalFooterVariant}>{finalFooter}</Footer>
        )}
      </div>
    </ThemeProvider>
  );
};

// Create Shell with Item subcomponent
const Shell = ShellComponent as typeof ShellComponent & {
  Item: typeof ShellItem;
};

Shell.Item = ShellItem;

export default Shell;
