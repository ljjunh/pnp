'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeaderLayoutProps {
  logo: ReactNode;
  compactSearchBar: ReactNode;
  expandedSearchBar: ReactNode;
  userNav: ReactNode;
}

export default function HeaderLayout({
  logo,
  compactSearchBar,
  expandedSearchBar,
  userNav,
}: HeaderLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 0;
    }
    return false;
  });

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-between">
        <div className="w-32">{logo}</div>
        {userNav}
      </div>
    );
  }
  return (
    <div aria-label="사이트 헤더">
      {/* 스크롤 되었을 때 */}
      {isScrolled ? (
        <div className="flex items-center justify-between">
          <div className="w-32">{logo}</div>
          <motion.div
            className="mx-auto max-w-[370px] flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {compactSearchBar}
          </motion.div>
          {userNav}
        </div>
      ) : (
        // 스크롤 되지 않았을 때
        <>
          <div className="flex items-center justify-between">
            <div className="w-32">{logo}</div>
            {userNav}
          </div>
          <motion.div
            className="mx-auto mt-4 flex-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {expandedSearchBar}
          </motion.div>
        </>
      )}
    </div>
  );
}
