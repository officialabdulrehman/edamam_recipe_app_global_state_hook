import React, { useEffect } from "react";

import { useStore } from "../hooks-store/store";
import CardDetail from "./CardDetail";
import { ReactComponent as BookmarkEmpty } from "../svg/bookmarkEmpty.svg";
import { ReactComponent as BookmarkFilled } from "../svg/bookmarkFilled.svg";
import "./Card.css";

export const BookmarkedCards = () => {
  const [state, dispatch] = useStore();

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
              <div className="card" key={index}>
                {console.log("PROBLEM")}
                <div className="card_heading">
                  <h1>{recipe.recipe.label}</h1>
                  <h2>
                    {recipe.recipe.totalTime === "0"
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
                    if (index === 6)
                      return (
                        <p key={index} className="seemore">
                          ...see more
                        </p>
                      );
                    else if (index > 6) return null;
                    return (
                      <p key={index}>
                        <span>{index}.</span> {ing}
                      </p>
                    );
                  })}
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
              </div>
            )
        )}
      </div>
    );
  }
  return state.cardDetail === null ? (
    display
  ) : (
    <CardDetail />
  );
};

export default BookmarkedCards;
