'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ReliablePDFViewer from './ReliablePDFViewer';



const resumeLink = 'https://raw.githubusercontent.com/vsnaichuk/vsnaichuk/master/CV.pdf';

export default function ResumeClient() {
  const pdfWrapper = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center" style={{ background: 'var(--bg-layout-base)' }}>
        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full" style={{ background: 'var(--bg-layout-base)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 py-16 sm:py-24 lg:py-48">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 lg:mb-20">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight" style={{ color: 'var(--txt)', fontWeight: 300 }}>
              My <br className="sm:hidden" />
              Resume
            </h1>
          </div>
          
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md flex justify-center lg:justify-end">
            <Image
              src="/assets/resume-files.svg"
              alt="resume files"
              width={300}
              height={200}
              className="w-full h-auto opacity-80"
              style={{ filter: 'brightness(0) saturate(100%) invert(64%) sepia(35%) saturate(4944%) hue-rotate(246deg) brightness(97%) contrast(88%)' }}
            />
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-12 lg:mb-16">
          <a
            href={resumeLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 font-medium text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
            style={{ 
              background: 'var(--btn)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--btn-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--btn)';
            }}
          >
            <Image
              src="/assets/download.svg"
              alt="download"
              width={20}
              height={20}
              className="mr-3 brightness-0 invert"
            />
            <span className="uppercase tracking-wide">Download Resume</span>
            <span className="ml-2 text-xs uppercase opacity-80">.pdf</span>
          </a>
        </div>

        {/* PDF Viewer */}
        <div 
          className="w-full flex justify-center"
          ref={pdfWrapper}
        >
          <ReliablePDFViewer 
            url={resumeLink}
          />
        </div>
      </div>
    </main>
  );
}
