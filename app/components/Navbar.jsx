"use client";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";

function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <div className="absolute top-0 w-full font-serif bg-green-50 shadow-sm p-5">
      <div className="flex justify-between hover:space-x-30 transition-all duration-500 items-center mx-4">
        <p className="text-2xl cursor-pointer">SmartCards AI</p>
        <div className="flex items-center space-x-2 ">
          {isSignedIn ? (
            <SignedIn>
              <UserButton className="w-20 h-20" />
            </SignedIn>
          ) : (
            <>
              <div className="hover:bg-green-100 rounded-lg p-2">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </div>
              <span> | </span>
              <div className="hover:bg-green-100 rounded-lg p-2">
                <SignedOut>
                  <SignUpButton />
                </SignedOut>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
