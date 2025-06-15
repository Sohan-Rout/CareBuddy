import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Carbuddy",
  description: "Your AI-Powered Mental Health & Wellness Calling Agent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="font-poppins">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
