import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScholarSphere — Find the support to go further",
  description: "Discover scholarships across India. Explore opportunities, understand eligibility and apply through official provider websites.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
