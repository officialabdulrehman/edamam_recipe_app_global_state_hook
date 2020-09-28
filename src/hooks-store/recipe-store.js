import { initStore } from './store';
import axios from 'axios';

async function getData(search){
  const APP_ID = "6f96d73b";
  const APP_KEY = "3c2c1eb0abefd19d7eee57e862a1cbf0";
  const response = await axios.get(
    `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
  )
  const data = await response.data.hits
  console.log(data)
  return data
}

const configureStore = () => {
  const actions = {
    GET_DATA: (curState, search) => {
      const newRecipes = getData(search)
      const newState = {...curState}
      newState.recipes = newRecipes
      console.log(newState)
      return newState
      
    },
    TOGGLE_BOOKMARK: (curState, recipe) => {
      const recipeIndex = curState.recipes.findIndex(r => r.recipe.label === recipe.recipe.label)
      //console.log(curState, ' ', recipe)
      const newBookmarkStatus = !curState.recipes[recipeIndex].bookmarked;
      const updatedRecipes = [...curState.recipes];
      updatedRecipes[recipeIndex] = {
        ...curState.recipes[recipeIndex],
        bookmarked: newBookmarkStatus
      };
      const newState = {...curState}
      newState.recipes = updatedRecipes
      return newState
      //return { recipes: curState.recipes}
    },
    SET_RECIPES: (curState, recipes) => {
      console.log(curState, ' ', recipes)
      const newRecipes = curState.recipes
      recipes.map(recipe => newRecipes.push(recipe))
      const newState = {...curState}
      newState.recipes = newRecipes
      //return{newState}
      //return{ recipes: curState.recipes}
      return newState
    },
    SET_SEARCH: (curState, search) => {
      let newSearch = curState.search
      console.log(search)
      newSearch.push(search)
      //newSearch.concat(search)
      const newState = {...curState}
      newState.search = newSearch
      console.log(newSearch,curState.search, newState.search ,search)
      //return {search: curState.search}
      return newState
    },
    CLEAR_SEARCH: (curState) => {
      let newState = {...curState}
      newState.search = []
      return newState
    },
    CLEAR_RECIPES: (curState) => {
      let newState = {...curState}
      newState.recipes = []
      return newState
    },
    SET_SHOWBOOKMARK: (curState, value) => {
      let newState = {...curState}
      newState.showBookmark = value
      return newState
    },
    SET_CARDDETAIL: (curState, detail) => {
      const newState = {...curState}
      newState.cardDetail = detail
      return newState
    },
    CLEAR_CARDDETAIL: (curState) => {
      let newState = {...curState}
      curState.cardDetail = null
      return newState
    }
  }
  initStore(actions,  {recipes: [], search: [], showBookmark: false, cardDetail: null});
}
export default configureStore
