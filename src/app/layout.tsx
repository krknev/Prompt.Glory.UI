import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

export const metadata = {
  title: "5 Best ai",
  description: "5 Best ai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
