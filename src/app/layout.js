import ThemeToggle from "./components/dark-light-mode/ThemeToggle";
import Navbar from "./components/nav";
import "./globals.scss";

export const metadata = {
  title: "Blog - Baiastan Zhuzupbekov",
  description: "Blog by Baiastan Zhuzupbekov - Frontend Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
