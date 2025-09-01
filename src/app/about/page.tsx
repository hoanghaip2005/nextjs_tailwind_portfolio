'use client';

import Image from 'next/image';
import GitHubCalendarWrapper from '../components/GitHubCalendarWrapper';
import { BsTerminalFill } from '@react-icons/all-files/bs/BsTerminalFill';
import { DiGit } from '@react-icons/all-files/di/DiGit';
import { DiJavascript1 } from '@react-icons/all-files/di/DiJavascript1';
import { DiReact } from '@react-icons/all-files/di/DiReact';
import { DiSwift } from '@react-icons/all-files/di/DiSwift';
import { SiExpo } from '@react-icons/all-files/si/SiExpo';
import { SiFirebase } from '@react-icons/all-files/si/SiFirebase';
import { SiJest } from '@react-icons/all-files/si/SiJest';
import { SiKotlin } from '@react-icons/all-files/si/SiKotlin';
import { SiRedux } from '@react-icons/all-files/si/SiRedux';
import { SiSocketDotIo } from '@react-icons/all-files/si/SiSocketDotIo';
import { SiTypescript } from '@react-icons/all-files/si/SiTypescript';

export default function About() {

  return (
    <main className="min-h-screen w-full py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-16">
        {/* About Section */}
        <div className="flex flex-col lg:flex-row justify-around items-center gap-8 lg:gap-12 mb-16 lg:mb-20">
          <div className="space-y-6 text-center lg:text-left max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Learn More <b style={{ color: 'var(--txt-secondary)' }}>About Me</b>
            </h1>
            
            <div className="bg-background/50 rounded-lg p-6 space-y-4">
              <p className="text-justify" style={{ color: 'var(--txt)' }}>
                Hi Everyone, I am{' '}
                <span style={{ color: 'var(--txt-secondary)' }} className="font-semibold">Snaichuk Volodymyr, </span>
                <br />a software engineer currently based in{' '}
                <span style={{ color: 'var(--txt-secondary)' }} className="font-semibold">Krakow, Poland.</span>
                <br />
                <br />
                I have a Bachelor&apos;s degree in Computer Science and
                <br />
                Master&apos;s degree in Project Management from Ternopil Academy.
                <br />
                <br />
                My hobbies beyond programming:
              </p>

              <ul className="ml-4 space-y-2" style={{ color: 'var(--txt)' }}>
                <li>- Playing Games</li>
                <li>- Reading</li>
                <li>- Travelling</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center order-first lg:order-last">
            <div className="w-full max-w-sm lg:max-w-md">
              <Image
                src="/assets/about-promo.svg"
                alt="about"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 lg:mb-12" style={{ color: 'var(--txt)' }}>
            My <b style={{ color: 'var(--txt-secondary)' }}>Skills</b>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
            {[
              { icon: SiTypescript, name: 'TypeScript' },
              { icon: DiJavascript1, name: 'JavaScript' },
              { icon: DiSwift, name: 'Swift' },
              { icon: SiKotlin, name: 'Kotlin' },
              { icon: DiReact, name: 'React' },
              { icon: SiRedux, name: 'Redux' },
              { icon: SiFirebase, name: 'Firebase' },
              { icon: SiSocketDotIo, name: 'Socket.io' },
              { icon: SiExpo, name: 'Expo' },
              { icon: DiGit, name: 'Git' },
              { icon: SiJest, name: 'Jest' },
              { icon: BsTerminalFill, name: 'Terminal' },
            ].map(({ icon: Icon, name }, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 sm:p-4 rounded-lg hover:bg-purple-600/10 transition-all duration-200 group"
              >
                <Icon className="text-3xl sm:text-4xl transition-colors duration-200" style={{ color: 'var(--txt)' }} />
                <span className="text-xs mt-2 transition-colors duration-200" style={{ color: 'var(--txt)' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Activity Section */}
        <div className="text-center">
          <a 
            href="https://github.com/hoanghaip2005"
            target="_blank"
            rel="noreferrer"
            className="inline-block w-full"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 hover:text-purple-600 transition-colors duration-200">
              My <b className="text-purple-600">Coding</b> Journey
            </h2>
            
            <div className="bg-background/50 rounded-lg p-3 sm:p-4 lg:p-6 w-full max-w-full overflow-hidden">
              <GitHubCalendarWrapper
                username="hoanghaip2005"
                blockSize={15}
                blockMargin={5}
                fontSize={16}
              />
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}