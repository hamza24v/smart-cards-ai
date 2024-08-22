"use client";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";

function Navbar() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="fixed top-0 w-full bg-gradient-to-r from-green-50 to-green-100 shadow-md p-4 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <p
          className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent cursor-pointer"
          onClick={() => router.push("/")}
        >
          SmartCards AI
        </p>
        <div className="flex items-center space-x-6">
          {isSignedIn ? (
            <>
              <button
                className="text-lg font-medium text-gray-500 hover:text-gray-800 p-2 transition-colors duration-300"
                onClick={() => router.push("/my-decks")}
              >
                My Decks
              </button>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-medium text-gray-700 hover:bg-green-200 hover:text-gray-900 rounded-lg p-2 transition-all duration-300 cursor-pointer">
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                </div>
                <div className="bg-green-600 text-white text-lg font-medium hover:bg-green-700 rounded-lg p-2 transition-all duration-300 cursor-pointer">
                  <SignedOut>
                    <SignUpButton />
                  </SignedOut>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
