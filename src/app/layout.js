"use client";

import Navbar from "./components/nav";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";

// export const metadata = {
//   title: "Blog - Baiastan Zhuzupbekov",
//   description: "Blog by Baiastan Zhuzupbekov - Frontend Engineer",
// };
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
