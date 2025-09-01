'use client';

import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub';
import { FaFacebookSquare } from '@react-icons/all-files/fa/FaFacebookSquare';
import { FaLinkedinIn } from '@react-icons/all-files/fa/FaLinkedinIn';
import { FaTelegramPlane } from '@react-icons/all-files/fa/FaTelegramPlane';
import Typewriter from './components/Typewriter';
import ClientOnly from './components/ClientOnly';
import NoSSRWrapper from './components/NoSSRWrapper';

export default function Home() {
  return (
    <NoSSRWrapper>
      <main className="min-h-screen w-full" suppressHydrationWarning>
              {/* Hero Section - Main Section */}
      <section className="w-full py-36 lg:py-24 min-h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-16 w-full">
          <div className="flex flex-col lg:flex-row justify-around items-center gap-8 lg:gap-12" suppressHydrationWarning>
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--txt)' }}>Greetings!</h2>
                <Image
                  src="/assets/hand.png"
                  alt="hand wave"
                  width={48}
                  height={48}
                  className="animate-bounce"
                />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: 'var(--txt)' }}>
                I&apos;M
                <br />
                <strong style={{ color: 'var(--txt-secondary)' }}> SNAICHUK VOLODYMYR</strong>
              </h1>

              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold min-h-[85px] flex items-center justify-center lg:justify-start" style={{ color: 'var(--txt-secondary)' }}>
                <ClientOnly fallback={<span className="inline-block">Continuously Learning<span className="animate-pulse">|</span></span>}>
                  <Typewriter
                    strings={[
                      'Continuously Learning',
                      'React Native Developer',
                    ]}
                    wrapperClassName="inline-block"
                    cursorClassName=""
                  />
                </ClientOnly>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end order-first lg:order-last">
              <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
                <Image
                  alt="home-img"
                  src="/assets/home-main.svg"
                  width={396}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
      </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="w-full py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row justify-around items-center gap-8 lg:gap-12">
            <div className="space-y-6 text-center lg:text-left max-w-2xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: 'var(--txt)' }}>
                LET ME <span style={{ color: 'var(--txt-secondary)' }}> INTRODUCE </span>
                MYSELF
              </h1>

              <div className="space-y-4 text-base lg:text-lg leading-relaxed" style={{ color: 'var(--txt)' }} suppressHydrationWarning>
                <p>
                  I&apos;m a React Native Developer with <b>3 years</b> of
                  experience <br />
                  creating mobile apps for the iOS, Android, and Web
                  platforms.
                </p>

                <p>
                  My skills include proficiency in{' '}
                  <i>
                    <b style={{ color: 'var(--txt-secondary)' }}>
                      TypeScript, React, React Native,
                    </b>
                  </i>
                  <br />
                  and other relevant technologies. I have experience in
                  integrating various <br />
                  third-party libraries, API integration, push
                  notifications and analytics.
                </p>

                <p>
                  My field of Interest&apos;s are building new
                  <i>
                    <b style={{ color: 'var(--txt-secondary)' }}> Technologies and Products</b>
                  </i>
                </p>
              </div>
            </div>

            <div className="flex justify-center order-first lg:order-last" suppressHydrationWarning>
              <div className="w-full max-w-xs lg:max-w-sm">
                <Tilt trackOnWindow={true}>
                  <Image 
                    alt="avatar" 
                    src="/assets/avatar.svg" 
                    width={300}
                    height={300}
                    className="w-full h-auto"
                  />
                </Tilt>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="w-full py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-16 text-center" suppressHydrationWarning>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--txt)' }}>FIND ME ON</h1>
          <p className="text-base lg:text-lg mb-8" style={{ color: 'var(--txt)' }}>
            Feel free to <span style={{ color: 'var(--txt-secondary)' }}>connect </span>with
            me
          </p>
          
          <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-6" suppressHydrationWarning>
            <a
              href="https://github.com/vsnaichuk"
              target="_blank"
              rel="noreferrer"
              aria-label="github"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all duration-500 hover:scale-110"
              style={{ 
                color: 'var(--social-icon)',
                background: 'hsla(0,0%,100%,.972)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 15px var(--social-shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <AiFillGithub />
            </a>
            <a
              href="https://www.facebook.com/Snaychuk"
              target="_blank"
              rel="noreferrer"
              aria-label="facebook"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all duration-500 hover:scale-110"
              style={{ 
                color: 'var(--social-icon)',
                background: 'hsla(0,0%,100%,.972)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 15px var(--social-shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://t.me/snaichuk_v"
              target="_blank"
              rel="noreferrer"
              aria-label="telegram"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all duration-500 hover:scale-110"
              style={{ 
                color: 'var(--social-icon)',
                background: 'hsla(0,0%,100%,.972)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 15px var(--social-shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://www.linkedin.com/in/volodymyr-snaichuk-74a389124/"
              target="_blank"
              rel="noreferrer"
              aria-label="linkedin"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all duration-500 hover:scale-110"
              style={{ 
                color: 'var(--social-icon)',
                background: 'hsla(0,0%,100%,.972)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 0 15px var(--social-shadow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </section>
      </main>
    </NoSSRWrapper>
  );
}