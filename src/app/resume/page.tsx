'use client';

import dynamic from 'next/dynamic';

const ResumeClient = dynamic(() => import('./ResumeClient'), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen w-full flex items-center justify-center" style={{ background: 'var(--bg-layout-base)' }}>
      <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
    </main>
  ),
});

export default function ResumePage() {
  return <ResumeClient />;
}