import { ReactNode } from 'react';

interface FixturesLayoutProps {
  children: ReactNode;
}

export default function FixturesLayout({ children }: FixturesLayoutProps) {
  return (
    <>
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
    </>
  );
}