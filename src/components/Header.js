import React from "react";
import { useStore } from "../hooks-store/store";
import { ReactComponent as BookmarkFilled } from "../svg/bookmarkFilled.svg";
import { ReactComponent as BookmarkEmpty } from "../svg/bookmarkEmpty.svg";

import { motion } from 'framer-motion';

const headerVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition:{
      duration: 1,
      delay: 0.8,
      type: 'spring',
      stiffness: 120
    }
  }
}

export default function Header() {
  const [state, dispatch] = useStore();
  const toggleBookmarks = () => {
    dispatch('SET_SHOWBOOKMARK', !state.showBookmark)
    dispatch('CLEAR_CARDDETAIL')
  };
  return (
    <motion.header
      variants={headerVariants}
      initial='hidden'
      animate='visible'
    >
      <h1>Recipe</h1>
      {state.showBookmark ? (
        <BookmarkFilled className="bookmark" onClick={toggleBookmarks} />
      ) : (
        <BookmarkEmpty className="bookmark" onClick={toggleBookmarks} />
      )}
      <a
        href="https://www.edamam.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        edamam api
      </a>
    </motion.header>
  );
}
