'use client'

import { useRouter } from "next/navigation";
import css from "./page.module.scss"
import React from "react"

export const Navigation = () => {
  const router = useRouter()

  return (
    <div className={css.Navigation}>
      <div className={css.backButton} onClick={() => router.push('/cities')}>
        Retour
      </div>
      <div className={css.navigationButtons} />
    </div>
  );
};