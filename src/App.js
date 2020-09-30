import React, { useEffect, useState } from "react";

import { useStore } from './hooks-store/store';

import Cards from "./components/Cards";
import BookmarkedCards from './components/BookmarkedCards';
import axios from "axios";
import "./App.css";
import InputForm from "./components/InputForm";
import { ReactComponent as BookmarkFilled } from "./svg/bookmarkFilled.svg";
import { ReactComponent as BookmarkEmpty } from "./svg/bookmarkEmpty.svg";

const App = (props) => {
  const APP_ID = "6f96d73b";
  const APP_KEY = "3c2c1eb0abefd19d7eee57e862a1cbf0";

  const [state, dispatch] = useStore()

  useEffect(() => {
    console.log(state.search[0])
    if (state.search[0] !== undefined) {
      getData()
    }
    console.log("render");
    return () => {
      dispatch('CLEAR_RECIPES')
      dispatch('CLEAR_SEARCH')
    }
  }, [state.search[0]]);

  async function getData(){
    const response = await axios.get(
      `https://api.edamam.com/search?q=${state.search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    const data = await response.data.hits
    dispatch('SET_RECIPES', data)
  }

  const toggleBookmarks = () => {
    dispatch('SET_SHOWBOOKMARK', !state.showBookmark)
    dispatch('CLEAR_CARDDETAIL')
  };

  return (
    <div className="App">
      <header>
        <h1>Recipe</h1>
        {state.showBookmark ? (
          <BookmarkFilled className="bookmark" onClick={toggleBookmarks} />
        ) : (
          <BookmarkEmpty className="bookmark" onClick={toggleBookmarks} />
        )}
        <a
          href="https://www.edamam.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          edamam api
        </a>
      </header>
      <InputForm/>
      {state.showBookmark ? (
        <BookmarkedCards />
      ) : (
        <Cards />
      )}
    </div>
  );
};

export default App;

/*
1. Add bookmark icon ( DONE ), functionality ( DONE ), localstorage
2. Create a modal/componant/page for detailed recipe (DONE)
3. Add custom search options for categories
4. Ingredients details like carbs/sugar/sodium
5. Add light/dark theming and if possible, add multiple themes
6. Add css animations/transitions
*/
