"use client";

import {
  useEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

function StatCard({
  value,
  label,
  bg,
  textColor = "text-black",
}: {
  value: string;
  label: string;
  bg: string;
  textColor?: string;
}) {
  return (
    <div className={`${bg} rounded-xl p-6 w-64 shrink-0`}>
      <p className={`text-5xl font-extrabold ${textColor}`}>{value}</p>
      <p className={`mt-2 text-sm ${textColor} opacity-80`}>{label}</p>
    </div>
  );
}



export default function Hero() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const bandRef      = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const carRef       = useRef<HTMLDivElement>(null);
  const topStatsRef  = useRef<HTMLDivElement>(null);
  const botStatsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from([topStatsRef.current, botStatsRef.current], {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.fromTo(
        carRef.current,
        { x: "100vw" },
        {
          x: "-110vw",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.to(textRef.current, {
        x: "-30vw",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div style={{ height: "300vh" }}>
        <div
          ref={sectionRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#D4D4D0] flex flex-col justify-center"
        >

          <div
            ref={topStatsRef}
            className="flex justify-center gap-3 px-10 mb-4"
          >
            <StatCard value="58%" label="Increase in pick up point use"  bg="bg-[#C8F135]" />
            <StatCard value="27%" label="Increase in pick up point use"  bg="bg-[#222]" textColor="text-white" />
          </div>

          <div
            ref={bandRef}
            className="relative bg-[#3DBD5E] overflow-hidden flex items-center"
            style={{ height: "clamp(100px, 22vh, 200px)" }}
          >
            <div
              ref={textRef}
              className="absolute left-0 top-0 bottom-0 flex items-center pl-5 whitespace-nowrap will-change-transform z-10"
            >
              <h1
                className="font-extrabold text-black select-none"
                style={{ fontSize: "clamp(60px, 14vw, 180px)", lineHeight: 1 }}
              >
                WELCOME ITZFIZZ
              </h1>
            </div>

            <div
              ref={carRef}
              className="absolute top-1/2 -translate-y-1/2 will-change-transform z-20"
              style={{ width: "clamp(280px, 40vw, 560px)" }}
            >
              <Image src="/mclaren.png" alt="McLaren car" width={760} height={200} />
            </div>
          </div>

          <div
            ref={botStatsRef}
            className="flex justify-center gap-3 px-10 mt-4"
          >
            <StatCard value="23%" label="Decreased in customer phone calls" bg="bg-[#63C8F5]" />
            <StatCard value="40%" label="Decreased in customer phone calls" bg="bg-[#F07A20]" />
          </div>

        </div>
      </div>
    </>
  );
}