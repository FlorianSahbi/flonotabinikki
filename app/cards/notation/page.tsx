'use client'

import css from "./page.module.scss"
import React from "react"

export const Notation = ({ number }: { number: number }) => {
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