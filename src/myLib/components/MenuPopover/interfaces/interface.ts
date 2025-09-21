export interface InfoUser {
  userName: string;
  email: string;
  message: string;
}

type OverlayPlacement =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "right-start"
  | "right"
  | "right-end"
  | "left-start"
  | "left"
  | "left-end";

export interface LinkOption {
  href?: string;
  label: string;
  key: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
  icon?: React.ReactNode;
  callback?: () => void;
}

export interface MenuPopoverProps {
  links: LinkOption[];
  user: InfoUser;
  position?: OverlayPlacement;
  whitUser?: boolean;
  icon: string;
  role?: string;
  iconPosition?: "left" | "right";
}