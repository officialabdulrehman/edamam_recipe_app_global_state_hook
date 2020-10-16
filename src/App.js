import React, { useEffect, useState } from "react";

import { useStore } from './hooks-store/store';

import Cards from "./components/Cards";
import BookmarkedCards from './components/BookmarkedCards';
import axios from "axios";
import "./App.css";
import InputForm from "./components/InputForm";
import { ReactComponent as BookmarkFilled } from "./svg/bookmarkFilled.svg";
import { ReactComponent as BookmarkEmpty } from "./svg/bookmarkEmpty.svg";
import AdvanceSearch from "./components/AdvanceSearch";
import Header from "./components/Header";
import { AnimatePresence } from "framer-motion";

const App = (props) => {
  const APP_ID = "6f96d73b";
  const APP_KEY = "3c2c1eb0abefd19d7eee57e862a1cbf0";
  const [state, dispatch] = useStore()
  let URL = `https://api.edamam.com/search?q=${state.search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${state.to}`
  if(state.ingAmount !== undefined){
    URL=`https://api.edamam.com/search?q=${state.search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${state.to}&ingr=${state.ingAmount}`
  }
  if(state.dietType !== ''){
    URL = URL.concat(`&diet=${state.dietType}`)
    console.log(URL)
  }
  if(state.mealType !== ''){
    URL = URL.concat(`&mealType=${state.mealType}`)
  }

  useEffect(() => {
    console.log(state.search[0])
    if (state.search[0] !== undefined) {
      getData()
    }
    console.log("render");
    return () => {
      dispatch('CLEAR_RECIPES')
      //dispatch('CLEAR_SEARCH')
    }
  }, [state.search[0]]);

  async function getData(){
    const response = await axios.get(
      URL
    )
    const data = await response.data
    console.log(response.data)
    dispatch('SET_RECIPES', data.hits)
    dispatch('SET_MORE', data.more)
    dispatch('SET_TOTAL', data.count)
    dispatch('SET_TO', data.to)
    dispatch('SET_FROM', data.from)
    dispatch("IS_ADVANCE_SEARCH", false);
  }

  return (
    <div className="App">
        <Header/>
        <InputForm/>
        <AdvanceSearch/>
        <AnimatePresence exitBeforeEnter>
          {state.showBookmark ? (
            <BookmarkedCards />
          ) : (
            <Cards />
          )}
        </AnimatePresence>
    </div>
  );
};

export default App;

/*
1. Add bookmark icon ( DONE ), functionality ( DONE ), localstorage
2. Create a modal/componant/page for detailed recipe (DONE)
3. Add custom search options for categories
4. Ingredients details like carbs/sugar/sodium
5. Add light/dark theming and, if possible, add multiple themes
6. Add css animations/transitions ( DONE )
*/
