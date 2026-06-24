import type {Metadata} from 'next';
import { Nunito, Pacifico } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: 'Happy Birthday Mahii! 🎉',
  description: 'A special birthday surprise for you.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${nunito.variable} ${pacifico.variable}`}>
      <body className="font-sans antialiased text-slate-800" suppressHydrationWarning>{children}</body>
    </html>
  );
}
