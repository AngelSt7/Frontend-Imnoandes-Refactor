import { useEffect, useState } from 'react'

export function useHeaderMenu() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setShowOverlay(true);
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
      setTimeout(() => setShowOverlay(false), 500);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => setShowOverlay(false), 500);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth >= 768 && isMenuOpen) {
          closeMenu();
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    showOverlay,
    toggleMenu,
    closeMenu
  }
}
