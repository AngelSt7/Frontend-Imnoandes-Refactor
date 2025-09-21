'use client'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@heroui/react";
import Link from "next/link";
import { MenuPopoverProps } from "./interfaces/interface";
import { getIconPosition } from "./utils/iconPosition";

export function MenuPopover({
  links,
  user,
  whitUser,
  role,
  icon,
  iconPosition = "left",
  position = "bottom-end",
}: MenuPopoverProps) {

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement={position}>
        <DropdownTrigger>
          {whitUser
            ? (
              <User as="button" avatarProps={{
                isBordered: true,
                src: icon,
              }}
                className="transition-transform" description={role} name={user.userName}
              />
            ) : (
              <Avatar isBordered as="button" className="transition-transform" src={icon} />
            )}
        </DropdownTrigger>

        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <>
            <DropdownItem key="profile" className="h-14 gap-2" textValue={user.userName}>
              <p className="font-semibold">{user.message}</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>

            {links.map((item) =>
              item.href ? (
                <DropdownItem
                  key={item.key}
                  color={item.color}
                  {...getIconPosition(item, iconPosition)}
                  textValue={item.label}
                >
                  <Link href={item.href} className="flex items-center gap-2 w-full z-50">
                    {item.label}
                  </Link>
                </DropdownItem>
              ) : (
                <DropdownItem
                  key={item.key}
                  color={item.color}
                  {...getIconPosition(item, iconPosition)}
                  onPress={item.callback}
                  className="z-50"
                >
                  {item.label}
                </DropdownItem>
              )
            )}
          </>
        </DropdownMenu>

      </Dropdown>
    </div>
  );
}
