'use client'

import { LinkOption, MenuPopover } from "@/src/myLib";
import { Settings, BarChart3, Users, Sliders, HelpCircle, LogOut, UserCog } from "lucide-react";

const DefaultLinks: LinkOption[] = [
  {
    href: "es/profile",
    label: "My settings",
    key: "settings",
    icon: <UserCog className="w-4 h-4" />,
  },
  {
    href: "#",
    label: "Team Settings",
    key: "team_settings",
    icon: <Users className="w-4 h-4" />,
  },
  {
    href: "#",
    label: "Analytics",
    key: "analytics",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    href: "#",
    label: "System",
    key: "system",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    href: "#",
    label: "Configurations",
    key: "configurations",
    icon: <Sliders className="w-4 h-4" />,
  },
  {
    href: "#",
    label: "Help & Feedback",
    key: "help_and_feedback",
    icon: <HelpCircle className="w-4 h-4" />,
  },
  {
    href: "#",
    label: "Logout",
    key: "logout",
    color: "danger",
    icon: <LogOut className="w-4 h-4" />,
  },
];

export default function Page() {
  return (
    <>
  

      <MenuPopover
        icon="https://i.pravatar.cc/150?u=a042581f4e28540"
        position="bottom-end"
        links={DefaultLinks}
        user={{ userName: "Ángel Santa Cruz", email: "santacruza2000@gmail.com", message: "Session iniciada como:" }}
        whitUser={false}
      />
    </>
  );
}
