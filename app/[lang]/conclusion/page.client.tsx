'use client'

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { motion } from 'motion/react';
import css from "./page.module.scss";
import Link from 'next/link';

export default function ConclusionClientPage({ data }: any) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handlePageRestore = (event: Event) => {
      if ((event as PageTransitionEvent).persisted) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("pageshow", handlePageRestore);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pageshow", handlePageRestore);
    };
  }, []);

  return (
    <div className={css.Conclusion}>
      <header className={css.header}>
        <h1 className={css.mainTitle}>flonotabinikki</h1>
        <div className={css.langs}>
          <Link scroll={false} href="/fr/conclusion">Francais</Link>
          <Link scroll={false} href="/ja/conclusion">日本語</Link>
        </div>
      </header>

      <motion.div
        className={css.imageWrapper}
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h1
          className={css.mainTitle}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {data[0].body}
        </motion.h1>
        <Image
          priority={true}
          className={css.image}
          alt="Tokyo Skyline"
          src="/headerbg.jpg"
          fill
          objectFit="cover"
        />
        <div className={css.gradientOverlay}></div>
      </motion.div>

      <div className={css.container}>
        <div className={css.texts}>
          {data.map((e: any, index: number) => {
            if (e.type === "title") {
              return <h2 key={index}>{e.body}</h2>;
            } else if (e.type === "h1") {
              return <Fragment key={index}></Fragment>;
            }
            return <p key={index}>{e.body}</p>;
          })}
        </div>
      </div>

      <footer className={css.footer}>
        <Link scroll={false} href="https://www.instagram.com/flonotabinikki/">Instagram</Link>
      </footer>
    </div>
  );
}
