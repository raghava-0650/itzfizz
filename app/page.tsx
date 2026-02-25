"use client";

import {
  useEffect,
  useRef,
} from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// ─── FIX 1: Never build Tailwind classes dynamically with template literals.
// Tailwind scans your source at build time — if the full class string doesn't
// appear literally in the file, it gets purged from the CSS bundle.
// Solution: use inline `style` for colors, keep Tailwind only for layout.
function StatCard({
  value,
  label,
  bgColor,
  textColor = "#000",
}: {
  value: string;
  label: string;
  bgColor: string;   // plain CSS color value e.g. "#C8F135"
  textColor?: string;
}) {
  return (
    <div
      className="rounded-xl p-6 w-64 shrink-0"
      style={{ backgroundColor: bgColor }}
    >
      <p className="text-5xl font-extrabold" style={{ color: textColor }}>
        {value}
      </p>
      <p className="mt-2 text-sm opacity-80" style={{ color: textColor }}>
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const carRef      = useRef<HTMLDivElement>(null);
  const topStatsRef = useRef<HTMLDivElement>(null);
  const botStatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // On load: stat cards fade + slide up
      gsap.from([topStatsRef.current, botStatsRef.current], {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      // On scroll: car drives right to left across the band
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

      // On scroll: text drifts left slower than the car (parallax)
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
    <div style={{ height: "300vh" }}>
      <div
        ref={sectionRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center"
        style={{ backgroundColor: "#D4D4D0" }}
      >

        <div ref={topStatsRef} className="flex justify-center gap-3 px-10 mb-4">
          <StatCard value="58%" label="Increase in pick up point use" bgColor="#C8F135" />
          <StatCard value="27%" label="Increase in pick up point use" bgColor="#222222" textColor="#fff" />
        </div>

       
        <div
          className="relative overflow-hidden flex items-center"
          style={{ height: "clamp(100px, 22vh, 200px)", backgroundColor: "#3DBD5E" }}
        >
          
          <div
            ref={textRef}
            className="absolute inset-y-0 left-0 flex items-center pl-5 whitespace-nowrap will-change-transform"
            style={{ zIndex: 10 }}
          >
            <h1
              className="font-extrabold select-none"
              style={{ fontSize: "clamp(60px, 14vw, 180px)", lineHeight: 1, color: "#000" }}
            >
              WELCOME ITZFIZZ
            </h1>
          </div>

         
          <div
            ref={carRef}
            className="absolute top-1/2 -translate-y-1/2 will-change-transform"
            style={{ width: "clamp(280px, 40vw, 560px)", zIndex: 20 }}
          >
            
            <Image
              src="/mclaren.png"
              alt="McLaren car"
              width={760}
              height={200}
              priority
            />
          </div>
        </div>

        {/* Bottom stat cards */}
        <div ref={botStatsRef} className="flex justify-center gap-3 px-10 mt-4">
          <StatCard value="23%" label="Decreased in customer phone calls" bgColor="#63C8F5" />
          <StatCard value="40%" label="Decreased in customer phone calls" bgColor="#F07A20" />
        </div>

      </div>
    </div>
  );
}