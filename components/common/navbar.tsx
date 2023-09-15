"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import { useState } from "react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerTitle =
    "辞書語彙データベース" + (process.env.IS_DEV === "true" ? "（検証用）" : "")

  return (
    <Navbar className="bg-base-200 text-base" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        />
        <NavbarBrand>
          <Image src="/images/logo.png" alt="logo" width="48" height="36" />
          <div className="px-2 font-bold text-inherit">
            {headerTitle}
          </div>
        </NavbarBrand>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
