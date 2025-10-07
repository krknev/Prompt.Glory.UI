import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

export const metadata = {
  title: "5 Best ai",
  description: "5 Best ai",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" suppressHydrationWarning>
   <body className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500 min-h-screen">
       <RootLayoutClient>{children}</RootLayoutClient>
    </body>
  </html>);
}
