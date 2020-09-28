import React from "react";

import { useStore } from '../hooks-store/store';
import { ReactComponent as BookmarkEmpty } from "../svg/bookmarkEmpty.svg";
import { ReactComponent as BookmarkFilled } from "../svg/bookmarkFilled.svg";
import "./CardDetail.css";

export default function CardDetail() {
  const [state, dispatch] = useStore()
  const cardIndex = state.recipes.findIndex(r => r.recipe.label === state.cardDetail.recipe.label)
  return (
    <div className="cardDetailOuter">
      <div className="cardInnerLeft orderTop">
        <div className="healthLabels">
          <h2>Health Labels: </h2>
          {state.cardDetail.recipe.healthLabels.map((label, index) => (
            <p className="healthLabel" key={index}>
              {label}
            </p>
          ))}
        </div>
        <div className="cautions">
          <h2>Cautions: </h2>
          {state.cardDetail.recipe.cautions.map((caution, index) => (
            <p className="caution" key={index}>
              {caution}
            </p>
          ))}
        </div>
      </div>
      <div className="cardDetail orderMid">
        <div className="cardDetail_heading">
          <h1>{state.cardDetail.recipe.label}</h1>
          <h2>
            {state.cardDetail.recipe.totalTime === "0"
              ? "N/A"
              : state.cardDetail.recipe.totalTime + " min"}
          </h2>
        </div>
        <div className="cardDetail_mid">
          <img
            src={state.cardDetail.recipe.image}
            alt={state.cardDetail.recipe.label}
          />
        </div>
        <div className="cardDetail_foot">
          <h4>
            Source:{"   "}
            <span>{state.cardDetail.recipe.source}</span>
          </h4>
          <h4>
            Yield:{"   "}
            <span>{state.cardDetail.recipe.yield}</span>
          </h4>
          {state.cardDetail.recipe.dietLabels[0] && (
            <h4>
              Diet Type:{"   "}
              <span>{state.cardDetail.recipe.dietLabels[0]}</span>
            </h4>
          )}
          {state.cardDetail.recipe.totalNutrients.ENERC_KCAL.quantity && (
            <h4>
              Energy:{"   "}
              <span>
                {state.cardDetail.recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(
                  0
                )}
                ~ {state.cardDetail.recipe.totalNutrients.ENERC_KCAL.unit}
              </span>
            </h4>
          )}
          {state.cardDetail.recipe.totalDaily.ENERC_KCAL.quantity && (
            <h4>
              GDA %:{"   "}
              <span>
                {state.cardDetail.recipe.totalDaily.ENERC_KCAL.quantity.toFixed(
                  0
                )}
                {state.cardDetail.recipe.totalDaily.ENERC_KCAL.unit}
              </span>
            </h4>
          )}
          {state.cardDetail.recipe.totalWeight && (
            <h4>
              Approx weight:{"   "}
              <span>
                {state.cardDetail.recipe.totalWeight.toFixed(0)} grams
              </span>
            </h4>
          )}
        </div>
        <div className="cardDetailFooter1">
          <div className="bookmark">
            {console.log(state.recipes[cardIndex].bookmarked)}
            {state.recipes[cardIndex].bookmarked ? (
              <BookmarkFilled onClick={() => dispatch('TOGGLE_BOOKMARK', state.cardDetail)}/>
            ) : (
              <BookmarkEmpty onClick={() => dispatch('TOGGLE_BOOKMARK', state.cardDetail)}/>
            )}
          </div>
          <p>
            <span>Calories: </span>
            {state.cardDetail.recipe.calories.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="cardDetail orderBot">
        <div className="ingCardTop">
          <h1>Ingredients</h1>
        </div>
        <div className="ingCardBot">
          {state.cardDetail.recipe.ingredientLines.map((ing, index) => (
            <p className="ings" key={index}>
              <span>{index}.</span> {ing}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
