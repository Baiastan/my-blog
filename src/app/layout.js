"use client";

import Navbar from "./components/nav";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";

import { useState } from "react";

// export const metadata = {
//   title: "Blog - Baiastan Zhuzupbekov",
//   description: "Blog by Baiastan Zhuzupbekov - Frontend Engineer",
// };

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
          <SpeedInsights />
          <Analytics />
        </QueryClientProvider>
      </body>
    </html>
  );
}
