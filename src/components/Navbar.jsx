"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar({ className }) {
  const session = useSession()
  console.log(session)
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
      <Link href={"/"}>
        <MenuItem setActive={setActive} active={active} item="Home">
        </MenuItem>
        </Link>
        <Link href={"/all-movies"}>
        <MenuItem setActive={setActive} active={active} item="All Movies">
        </MenuItem>
        </Link>
        <Link href={"/contact-us"}>
        <MenuItem setActive={setActive} active={active} item="contact-us">
        </MenuItem>
        </Link>
        {session.status === "unauthenticated" ?
        <div onClick={()=>{
          signIn("google")
          console.log("sign in ")
        }
        }>
          <MenuItem  setActive={setActive} active={active} item="Sign In">
        </MenuItem>
        </div>
        :
        <div onClick={()=>{
          console.log("sign out !")
          signOut()}}>
        <MenuItem setActive={setActive} active={active} item="Sign Out">
        </MenuItem>
        </div>
        }
      </Menu>
    </div>
  );
}