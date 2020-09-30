import React, { useEffect } from "react";

import { useStore } from "../hooks-store/store";
import CardDetail from "./CardDetail";
import "./Card.css";
import Card from "./Card";

export const BookmarkedCards = () => {
  const state = useStore()[0];

  useEffect(() => {
    console.log(state.recipes);
  }, [state.recipes]);

  let display = null;
  if (state.recipes[0] !== undefined) {
    display = (
      <div className="cards">
        {state.recipes.map(
          (recipe, index) =>
            recipe.bookmarked && (
              <Card recipe={recipe} index={index} key={index} />
            )
        )}
      </div>
    );
  }
  return state.cardDetail === null ? display : <CardDetail />;
};

export default BookmarkedCards;
