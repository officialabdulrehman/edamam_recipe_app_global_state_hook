import React, { useEffect, useMemo } from "react";

import { useStore } from "../hooks-store/store";
import Card from "./Card";
import CardDetail from "./CardDetail";
import "./Card.css";
import { motion } from "framer-motion";

const containerVariants = {
  // hidden: {
  //   opacity: 0,
  //   x: '100vw'
  // },
  // visible: {
  //   opacity: 1,
  //   x: 0,
  //   transition: {
  //     delay:0.2,
  //     duration: 1,
  //     type: 'spring',
  //     stiffness: 120
  //   }
  // },
  exit:{
    x: '-100vw',
    transition: {
      ease: 'easeInOut',
      duration: 1
    }
  }
}

export const Cards = () => {
  const state = useStore()[0];

  useEffect(() => {
    console.log(state.recipes);
  }, [state.search]);

  const recipeCards = useMemo(() => {
    return (
      state.recipes.map((recipe, index) => (
        <Card recipe={recipe} index={index} key={index} />
      ))
    )
  })

  let display = null;
  if (state.recipes[0] !== undefined) {
    display = (
      <motion.div className="cards" variants={containerVariants} exit='exit'>
        {/* <AnimatePresence exitBeforeEnter> */}
          {recipeCards}
        {/* </AnimatePresence> */}
        {/* {state.recipes.map((recipe, index) => (
          <Card recipe={recipe} index={index} key={index} />
        ))} */}
      </motion.div>
    );
  }
  return state.cardDetail === null ? display : <CardDetail />;
};

export default Cards;
