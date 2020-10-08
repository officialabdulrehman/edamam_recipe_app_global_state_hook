import React, { useEffect } from "react";

import { useStore } from "../hooks-store/store";
import { ReactComponent as BookmarkEmpty } from "../svg/bookmarkEmpty.svg";
import { ReactComponent as BookmarkFilled } from "../svg/bookmarkFilled.svg";
import "./Card.css";

import { motion } from "framer-motion";

const cardVariants = {
  hidden: {
    opacity: 0,
    x: '100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay:0.2,
      duration: 1,
      type: 'spring',
      stiffness: 120
    }
  },
  exit:{
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
      duration: 1
    }
  }
}

const Card = React.memo(({ recipe, index }) => {
  const dispatch = useStore()[1];
  useEffect(() => {}, []);
  return (
    <motion.div
      className="card"
      key={index}
      variants={cardVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      staggerChildren
    >
      {console.log("PROBLEM")}
      <div className="card_heading">
        <h1>{recipe.recipe.label}</h1>
        <h2>
          {recipe.recipe.totalTime === 0
            ? "N/A"
            : recipe.recipe.totalTime + " min"}
        </h2>
      </div>
      <div
        onClick={() => dispatch("SET_CARDDETAIL", recipe)}
        className="card_mid"
      >
        <img src={recipe.recipe.image} alt={recipe.recipe.label} />
      </div>
      <div className="card_foot">
        <h4>Ingredients:</h4>
        {recipe.recipe.ingredientLines.map((ing, index) => {
          if (index > 5) return null;
          return (
            <p key={index}>
              <span>{index}.</span> {ing.substring(0, 42)}
              {ing.substring(43) && <span className="dots">...</span>}
            </p>
          );
        })}
        <p
          key={index}
          className="seemore"
          onClick={() => dispatch("SET_CARDDETAIL", recipe)}
        >
          ...see details
        </p>
      </div>
      <div className="footer1">
        <div className="bookmark">
          {recipe.bookmarked ? (
            <BookmarkFilled
              onClick={() => dispatch("TOGGLE_BOOKMARK", recipe)}
            />
          ) : (
            <BookmarkEmpty
              onClick={() => dispatch("TOGGLE_BOOKMARK", recipe)}
            />
          )}
        </div>
        <p>
          <span>Calories: </span>
          {recipe.recipe.calories.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
})

export default Card