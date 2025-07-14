import '../styles/global.css';
import { ReactNode } from 'react';

export const metadata = {
  title: "Giga+ Preventiva",
  description: "Sistema para documentar preventivas",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full w-full text-gray-900 overflow-x-hidden">
        <main className="h-full w-full">{children}</main>
      </body>
    </html>
  );
}