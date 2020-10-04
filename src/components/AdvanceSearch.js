import React, { useEffect } from "react";

import { useStore } from "../hooks-store/store";
import { ReactComponent as CompressIcon } from "../svg/compressIcon.svg";
import { ReactComponent as ExpandIcon } from "../svg/expandIcon.svg";
import { ReactComponent as LeftIcon } from "../svg/leftIcon.svg";
import { ReactComponent as RightIcon } from "../svg/rightIcon.svg";
import "./AdvanceSearch.css";
import axios from "axios";

const AdvanceSearch = () => {
  const [state, dispatch] = useStore();
  const APP_ID = "6f96d73b";
  const APP_KEY = "3c2c1eb0abefd19d7eee57e862a1cbf0";
  // useEffect(() => {
  //   return () => {
  //     dispatch('CLEAR_RECIPES')
  //     //dispatch('CLEAR_SEARCH')
  //   }
  // },[])
  async function getNewData() {
    let URL = `https://api.edamam.com/search?q=${state.search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${state.to}`;
    if (state.ingAmount !== undefined) {
      URL = `https://api.edamam.com/search?q=${state.search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${state.to}&ingr=${state.ingAmount}`;
    }
    if (state.dietType !== "") {
      URL = URL.concat(`&diet=${state.dietType}`);
      console.log(URL);
    }
    if (state.mealType !== "") {
      URL = URL.concat(`&mealType=${state.mealType}`);
    }
    const response = await axios.get(URL);
    const data = await response.data;
    console.log(response.data);
    dispatch("SET_NEW_RECIPES", data.hits);
    dispatch("SET_MORE", data.more);
    dispatch("SET_TOTAL", data.count);
    dispatch("SET_TO", data.to);
    dispatch("SET_FROM", data.from);
    dispatch("IS_ADVANCE_SEARCH", false);
  }
  async function getPrevData() {
    console.log(state.from, state.to);
    let URL = `https://api.edamam.com/search?q=${state.search}&app_id=${APP_ID}&app_key=${APP_KEY}&to=${state.from}`;
    if (state.ingAmount !== undefined) {
      URL = `https://api.edamam.com/search?q=${state.search}&app_id=${APP_ID}&app_key=${APP_KEY}&to=${state.from}&ingr=${state.ingAmount}`;
    }
    if (state.dietType !== "") {
      URL = URL.concat(`&diet=${state.dietType}`);
      console.log(URL);
    }
    if (state.mealType !== "") {
      URL = URL.concat(`&mealType=${state.mealType}`);
    }
    const response = await axios.get(URL);
    const data = await response.data;
    console.log(response.data);
    dispatch("SET_NEW_RECIPES", data.hits);
    dispatch("SET_MORE", data.more);
    dispatch("SET_TOTAL", data.count);
    dispatch("SET_TO", data.to);
    dispatch("SET_FROM", data.from);
    dispatch("IS_ADVANCE_SEARCH", false);
  }

  const ingAmountHandler = (event) => {
    const input = event.target.value;
    dispatch("SET_INGAMOUNT", input);
  };

  const dietTypeHandler = (event) => {
    const input = event.target.value;
    dispatch("DIET_TYPE", input);
  };

  const mealTypeHandler = (event) => {
    const input = event.target.value;
    dispatch("MEAL_TYPE", input);
  };

  let display = (
    <div className="advButtons">
      {state.more && (
        <div>
          <LeftIcon className="lr" onClick={getPrevData} />
        </div>
      )}
      <ExpandIcon
        className="expand"
        onClick={() => {
          dispatch("IS_ADVANCE_SEARCH", true);
        }}
      />
      {state.more && (
        <div>
          <RightIcon className="lr" onClick={getNewData} />
        </div>
      )}
    </div>
  );
  if (state.isAdvSearch) {
    display = (
      <div className="advSearch">
        {/* <div className="formDiv"> */}
        <form className="advForm">
          {/* <label>Number of ingredients: </label> */}
          <input
            type="number"
            value={state.ingAmount}
            name="ingAmount"
            placeholder="Number of ingredients"
            min="1"
            onChange={ingAmountHandler}
            className="advIngInput"
          />
          <div className="radioButtons">
            <div className="radioInput">
              <input
                type="radio"
                value="balanced"
                name="diet"
                onChange={dietTypeHandler}
              />{" "}
              Balanced
            </div>
            <div className="radioInput">
              <input
                type="radio"
                value="high-protein"
                name="diet"
                onChange={dietTypeHandler}
              />{" "}
              High Protein
            </div>
            {/* <div className="radioInput">
              <input
                type="radio"
                value="high-fiber"
                name="diet"
                onChange={dietTypeHandler}
              />{" "}
              High Fiber
            </div> */}
            <div className="radioInput">
              <input
                type="radio"
                value="low-fat"
                name="diet"
                onChange={dietTypeHandler}
              />{" "}
              Low Fat
            </div>
            <div className="radioInput">
              <input
                type="radio"
                value="low-carb"
                name="diet"
                onChange={dietTypeHandler}
              />{" "}
              Low Carb
            </div>
          </div>

          {/* <div className="radioInput">
              <input
                type="radio"
                value="low-sodium"
                name="diet"
                onChange={dietTypeHandler}
              />{" "}
              Low Sodium
            </div> */}
          {/* <div className="radioInput">
              <input
                type="radio"
                value="breakfast"
                name="meal"
                onChange={mealTypeHandler}
              />{" "}
              Breakfast
            </div>
            <div className="radioInput">
              <input
                type="radio"
                value="lunch"
                name="meal"
                onChange={mealTypeHandler}
              />{" "}
              Lunch
            </div>
            <div className="radioInput">
              <input
                type="radio"
                value="dinner"
                name="meal"
                onChange={mealTypeHandler}
              />{" "}
              Dinner
            </div>
            <div className="radioInput">
              <input
                type="radio"
                value="snack"
                name="meal"
                onChange={mealTypeHandler}
              />{" "}
              Snack
            </div> */}
        </form>
        {/* </div> */}
        <CompressIcon
          className="compress"
          onClick={() => {
            dispatch("IS_ADVANCE_SEARCH");
          }}
        />
      </div>
    );
  }

  return display;
};
export default AdvanceSearch;
