# PLC Core Types

TypeScript type definitions for the PLC Core library.

## Overview

PLC Core Types provides TypeScript type definitions for the PLC Core component library, including styling, components, layout, navigation, and desktop types.

## Installation

```bash
npm install plc-core-types
```

## Usage

```typescript
import type { 
  ButtonProps, 
  CardProps, 
  ShellProps,
  WindowState 
} from "plc-core-types";
```

## Available Types

### Styling Types (`styles.ts`)

- `Size` - Size scale (xs, sm, md, lg, xl, 2xl, 3xl)
- `Spacing` - Spacing scale (none + Size)
- `Radius` - Border radius options
- `Shadow` - Shadow options
- `Variant` - Component variants (glass, flat, outline, etc.)
- `StylingProps` - Common styling props for all components

### Component Types (`components.ts`)

**Core Components:**
- `ButtonProps`, `ButtonVariant`, `ButtonType`
- `AlertProps`, `AlertVariant`
- `AvatarProps`
- `BadgeProps`, `BadgeVariant`
- `KbdProps`
- `CodeProps`
- `BlockquoteProps`

**Input Components:**
- `CheckboxProps`
- `InputProps`
- `TextareaProps`
- `PasswordInputProps`
- `NumberInputProps`
- `RadioProps`
- `SelectProps`, `SelectItem`
- `SegmentedControlProps`, `SegmentedControlItem`
- `SliderProps`
- `SwitchProps`

**Data Display:**
- `CardProps`, `CardVariant`
- `AccordionProps`
- `ProgressProps`
- `LoadingProps`, `LoadingVariant`
- `SkeletonProps`
- `TabsProps`

**Overlay & Navigation:**
- `MenuProps`
- `BurgerProps`
- `DrawerProps`
- `PopoverProps`
- `TooltipProps`
- `ModalProps`

**Layout:**
- `BoxProps`
- `ContainerProps`
- `DividerProps`
- `GridProps`, `GridCols`, `GridGap`
- `FlexProps`, `FlexDirection`, `FlexJustify`, `FlexAlign`, `FlexGap`
- `StackProps`, `StackGap`
- `GroupProps`, `GroupGap`

**Typography:**
- `TextProps`
- `TitleProps`, `TitleOrder`

**Interface:**
- `AppIconProps`

### Layout Types (`layout.ts`)

- `HeaderProps`, `HeaderVariant`
- `FooterProps`, `FooterVariant`
- `MainProps`, `MainVariant`
- `SidebarProps`
- `ShellProps`, `ShellVariant`, `ShellItemProps`

### Navigation Types (`navigation.ts`)

- `NavigationMenuProps`, `NavigationMenuItem`
- `SidebarNavigationProps`, `SidebarNavigationItem`

### Desktop Types (`desktop.ts`)

- `WindowState` - Window position, size, and state management
- `AppWindowProps` - Props for app window components
- `AppDefinition` - App registration definition

## Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Build

```bash
npm run build
```

### Development

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

## License

MIT
