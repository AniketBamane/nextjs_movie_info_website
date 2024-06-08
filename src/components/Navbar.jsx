"use client"
import React, { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { MenuIcon, XIcon } from "@heroicons/react/outline"; // Assuming you have the XIcon component from Heroicons

export default function Navbar({ className }) {
  const { data: session, status } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <nav className={"bg-gray-800"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <a className="text-white font-bold">Your Logo</a>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/">
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                </Link>
                <Link href="/all-movies">
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    All Movies
                  </a>
                </Link>
                <Link href="/contact-us">
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Contact Us
                  </a>
                </Link>
                <button
                  onClick={() => {
                    if (status === "unauthenticated") {
                      signIn("google");
                      console.log("sign in ");
                    } else {
                      console.log("sign out !");
                      signOut();
                    }
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {status === "unauthenticated" ? "Sign In" : "Sign Out"}
                </button>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleDrawer}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`${drawerOpen ? "block" : "hidden"} md:hidden fixed inset-0 z-20`}
      >
        <div className="bg-gray-600 bg-opacity-75"></div>
        <div className="bg-gray-800 fixed inset-y-0 right-0 z-30 w-64">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg">Menu</h2>
              <button
                onClick={toggleDrawer}
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <Link href="/">
              <a onClick={toggleDrawer} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
            </Link>
            <Link href="/all-movies">
              <a onClick={toggleDrawer} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                All Movies
              </a>
            </Link>
            <Link href="/contact-us">
              <a onClick={toggleDrawer} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Contact Us
              </a>
            </Link>
            <button
              onClick={() => {
                if (status === "unauthenticated") {
                  signIn("google");
                  console.log("sign in ");
                } else {
                  console.log("sign out !");
                  signOut();
                }
                toggleDrawer();
              }}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
            >
              {status === "unauthenticated" ? "Sign In" : "Sign Out"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
