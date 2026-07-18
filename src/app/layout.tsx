import type { Metadata } from 'next';
import {
  Inter,
  Poppins,
  Tangerine,
  Petit_Formal_Script,
} from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-poppins',
});

export const tangerine = Tangerine({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tangerine',
});

export const pettit_formal_script = Petit_Formal_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pettit-formal-script',
});

export const metadata: Metadata = {
  title: 'Kardio',
  description:
    'Keep your work in motion with Kardio, a task management app that helps you stay organized and productive.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${tangerine.variable} ${pettit_formal_script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
