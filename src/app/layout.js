"use client";

import Navbar from "./components/nav";
import { injectSpeedInsights } from "@vercel/speed-insights";
import "./globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";

import { useState } from "react";

injectSpeedInsights();

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
        </QueryClientProvider>
      </body>
    </html>
  );
}
