import React, { useEffect } from "react";

import { useStore } from "../hooks-store/store";
import { ReactComponent as CompressIcon } from "../svg/compressIcon.svg";
import { ReactComponent as ExpandIcon } from "../svg/expandIcon.svg";
import { ReactComponent as LeftIcon } from "../svg/leftIcon.svg";
import { ReactComponent as RightIcon } from "../svg/rightIcon.svg";
import "./AdvanceSearch.css";
import axios from 'axios'

const AdvanceSearch = () => {
  const [state, dispatch] = useStore();
  const APP_ID = "6f96d73b";
  const APP_KEY = "3c2c1eb0abefd19d7eee57e862a1cbf0";
  // useEffect(() => {
  //   getData()
  // })
  async function getNewData(){
    const response = await axios.get(
      `https://api.edamam.com/search?q=${state.search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${state.to}`
    )
    const data = await response.data
    console.log(response.data)
    dispatch('SET_NEW_RECIPES', data.hits)
    dispatch('SET_MORE', data.more)
    dispatch('SET_TOTAL', data.count)
    dispatch('SET_TO', data.to)
    dispatch('SET_FROM', data.from)
  }
  async function getPrevData(){
    console.log(state.from, state.to)
    const response = await axios.get(
      `https://api.edamam.com/search?q=${state.search}&app_id=${APP_ID}&app_key=${APP_KEY}&to=${state.from}`
    )
    const data = await response.data
    console.log(response.data)
    dispatch('SET_NEW_RECIPES', data.hits)
    dispatch('SET_MORE', data.more)
    dispatch('SET_TOTAL', data.count)
    dispatch('SET_TO', data.to)
    dispatch('SET_FROM', data.from)
  }
  let display = (
    <div className="advButtons">
      {state.more && (
        <div>
          <LeftIcon className="lr" onClick={getPrevData}/>
        </div>
      )}
      <ExpandIcon
        className="expand"
        onClick={() => {
          dispatch("IS_ADVANCE_SEARCH");
        }}
      />
      {state.more && (
        <div>
          <RightIcon className="lr" onClick={getNewData}/>
        </div>
      )}
    </div>
  );
  if (state.isAdvSearch) {
    display = (
      <div className="advSearch">

        <CompressIcon
          className="compress"
          onClick={() => {
            dispatch("IS_ADVANCE_SEARCH");
          }}
        />
      </div>
    );
  }

  return display
};
export default AdvanceSearch;
