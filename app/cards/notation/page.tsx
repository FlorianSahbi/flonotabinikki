'use client'

import css from "./page.module.scss"
import React from "react"

export default function Notation({ number }: any) {
  if (number <= 0) {
    return null;
  }

  return (
    <div className={css.Notation}>
      {Array.from({ length: number }, (_, index) => (
        <div key={index} className={css.notationDot} />
      ))}
    </div>
  );
};
