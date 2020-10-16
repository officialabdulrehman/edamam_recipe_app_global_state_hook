import React, { useEffect, useState } from "react";

import { useStore } from "../hooks-store/store";
import { ReactComponent as CompressIcon } from "../svg/compressIcon.svg";
import { ReactComponent as ExpandIcon } from "../svg/expandIcon.svg";
import { ReactComponent as LeftIcon } from "../svg/leftIcon.svg";
import { ReactComponent as RightIcon } from "../svg/rightIcon.svg";
import "./AdvanceSearch.css";
import axios from "axios";
import { AnimatePresence, motion } from 'framer-motion';

const advVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition:{
      duration: 1,
      delay: 0.3,
      type: 'spring',
      stiffness: 120
    }
  }
}

const advFormVariants = {
  hidden: {
    opacity: 0,
    y: -50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition:{
      type:'spring',

      // duration: 0.8,
      //delay: 0.3,
    }
  }
}

const advCompressVariants = {
  hidden: {
    opacity: 0,
    y: -100,
    rotate: 180,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition:{
      type: 'spring'
      // duration: 0.8,
      //delay: 0.3,
    }
  }
}

const left = {
  hidden:{
    opacity: 0,
    x: '100vw'
  },
  visible:{
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
      type: 'spring'
    }
  }
}

const right = {
  hidden:{
    opacity: 0,
    x: '-100vw'
  },
  visible:{
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
      type: 'spring'
    }
  }
}

const AdvanceSearch = () => {
  const [state, dispatch] = useStore();
  const [newData, setNewData] = useState(false)
  const [prevData, setPrevData] = useState(false)
  const APP_ID = "6f96d73b";
  const APP_KEY = "3c2c1eb0abefd19d7eee57e862a1cbf0";

  useEffect(() => {
    if(newData){
      getNewData()
    }
    if(prevData){
      getPrevData()
    }
    // return () => {
    //   dispatch('CLEAR_RECIPES')
    //   //dispatch('CLEAR_SEARCH')
    // }
  },[newData, prevData])
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
    setNewData(false)
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
    setPrevData(false)
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

  let display = (
    <motion.div className="advButtons"
      variants={advVariants}
      initial='hidden'
      animate='visible'
    >
      {state.more && (
        <motion.div
          variants={left}
          // initial
          // animate
        >
          {/* <LeftIcon className="lr" onClick={getPrevData} /> */}
          <LeftIcon className="lr" onClick={() => setPrevData(true)} />
        </motion.div>
      )}
      <ExpandIcon
        className="expand"
        onClick={() => {
          dispatch("IS_ADVANCE_SEARCH", true);
        }}
      />
      {state.more && (
        <motion.div
        variants={right}
        // initial
        // animate
        >
          {/* <RightIcon className="lr" onClick={getNewData} /> */}
          <RightIcon className="lr" onClick={() => setNewData(true)} />
        </motion.div>
      )}
    </motion.div>
  );
  if (state.isAdvSearch) {
    display = (
      <motion.div className="advSearch"
        // variants={advFormVariants}
        // initial='hidden'
        // animate='visible'
      >
        {/* <div className="formDiv"> */}
        <motion.form className="advForm"
          variants={advFormVariants}
          initial='hidden'
          animate='visible'
          //exit='visible'
        >
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
        </motion.form>
        <motion.div
        variants={advCompressVariants}
        initial='hidden'
        animate='visible'
        >

        <CompressIcon
          className="compress"
          onClick={() => {
            dispatch("IS_ADVANCE_SEARCH");
          }}
        />
        </motion.div>
      </motion.div>
    );
  }

  return display
};
export default AdvanceSearch;
