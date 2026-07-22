'use client';

import Image from 'next/image';
import { Bell, ChevronDown } from 'lucide-react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="px-30 py-8 h-10 border-b border-border flex items-center justify-between shadow-sm">
        <div>
          <Image src="/kardio-lockup.png" alt="Logo" width={100} height={40} />
        </div>
        <div className="flex items-center gap-10">
          <div>
            <Bell />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-primary text-primary-foreground font-bold rounded-full w-10 h-10 flex items-center justify-center">
              C
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </nav>
      <div className="px-30 min-h-[calc(100vh-40px)] bg-primary/2">
        {children}
      </div>
    </div>
  );
}
