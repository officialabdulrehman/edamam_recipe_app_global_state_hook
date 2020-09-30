import React, { useEffect, useMemo } from "react";

import { useStore } from "../hooks-store/store";
import Card from "./Card";
import CardDetail from "./CardDetail";
import "./Card.css";

export const Cards = () => {
  const state = useStore()[0];

  useEffect(() => {
    console.log(state.recipes);
  }, [state.recipes]);

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
      <div className="cards">
        {recipeCards}
        {/* {state.recipes.map((recipe, index) => (
          <Card recipe={recipe} index={index} key={index} />
        ))} */}
      </div>
    );
  }
  return state.cardDetail === null ? display : <CardDetail />;
};

export default Cards;
