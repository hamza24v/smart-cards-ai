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
    <div className="absolute top-0 w-full font-serif bg-green-50 shadow-lg p-5">
      <div className="flex justify-between hover:space-x-30 transition-all duration-500 items-center mx-4">
        <p
          className="text-2xl font-semibold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent cursor-pointer"
          onClick={() => router.push("/")}
        >
          SmartCards AI
        </p>
        <div className="flex items-center space-x-5 ">
          {isSignedIn ? (
            <>
              <button
                className="text-lg cursor-pointer p-2 hover:bg-green-100 rounded-lg"
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
              <div className="hover:bg-green-100 font-serif text-lg rounded-lg p-2">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </div>
              <div className="bg-gray-500 font-serif text-lg text-white hover:bg-gray-600 rounded-lg p-2">
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
