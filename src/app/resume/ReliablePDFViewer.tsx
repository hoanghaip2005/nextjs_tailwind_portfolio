'use client';

import { useState, useEffect } from 'react';

interface ReliablePDFViewerProps {
  url: string;
}

export default function ReliablePDFViewer({ url }: ReliablePDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [viewerType, setViewerType] = useState<'object' | 'iframe' | 'link'>('object');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Test PDF accessibility
    const testPDF = async () => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) {
          setViewerType('link');
        }
      } catch {
        setViewerType('link');
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    testPDF();
  }, [url]);

  if (!mounted || loading) {
    return (
      <div className="w-full max-w-4xl flex items-center justify-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm" style={{ color: 'var(--txt)' }}>Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (viewerType === 'link') {
    return (
      <div className="w-full max-w-4xl text-center py-20">
        <div className="space-y-6">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-xl" style={{ color: 'var(--txt)' }}>
            Resume Preview
          </p>
          <p className="text-base opacity-80" style={{ color: 'var(--txt)' }}>
            Click the download button above to view the full resume,<br/>
            or open it in a new tab below.
          </p>
          <div className="space-y-3">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
              style={{ 
                background: 'var(--btn)',
                color: 'var(--btn-primary-txt)'
              }}
            >
              📖 Open Resume in New Tab
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (viewerType === 'iframe') {
    return (
      <div className="w-full max-w-4xl">
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
          width="100%"
          height="800"
          className="border-0 rounded-lg shadow-2xl bg-white"
          title="Resume PDF"
          style={{ 
            boxShadow: '0 4px 8px var(--card-shadow)',
            minHeight: '600px'
          }}
        />
      </div>
    );
  }

  // Default: object tag
  return (
    <div className="w-full max-w-4xl">
      <object
        data={url}
        type="application/pdf"
        width="100%"
        height="800"
        className="rounded-lg shadow-2xl"
        style={{ 
          boxShadow: '0 4px 8px var(--card-shadow)',
          minHeight: '600px'
        }}
      >
        <div className="text-center py-20">
          <p className="text-lg mb-4" style={{ color: 'var(--txt)' }}>
            Your browser doesn&apos;t support PDF viewing.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            style={{ 
              background: 'var(--btn)',
              color: 'var(--btn-primary-txt)'
            }}
          >
            Download Resume PDF
          </a>
        </div>
      </object>
    </div>
  );
}
