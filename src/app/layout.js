import localFont from "next/font/local";
import "./globals.css";
import Sidebar from '../components/Sidebar'
import News from '../components/News'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "X UI Clone",
  description: "A Clone of X UI built with Next.js and Tailwindcss",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-between max-w-7xl mx-auto">
          <div className="hidden sm:inline border-r h-screen ">
            <Sidebar />
          </div>
          <div> {children}</div>

          <div>
            <News />
          </div>
        </div>
       
      </body>
    </html>
  );
}
