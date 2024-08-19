import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from './components/Navbar'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartCards AI",
  description: "Ai Powered flashcards tailored for you",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <>
            <Navbar />
            {children}
          </>
        </body>
      </html>
    </ClerkProvider>
  );
}
