'use client'
import { useState, useEffect } from "react";

export function useHideOnScroll() {
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setShow(currentY < lastY);
      setLastY(currentY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return show;
}