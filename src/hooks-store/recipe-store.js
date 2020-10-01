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
      //return newState
      return { recipes: newState.recipes}
    },
    SET_RECIPES: (curState, recipes) => {
      console.log(curState, ' ', recipes)
      const newRecipes = curState.recipes
      recipes.map(recipe => newRecipes.push(recipe))
      const newState = {...curState}
      newState.recipes = newRecipes
      //return{newState}
      return{ recipes: newState.recipes}
      //return newState
    },
    SET_NEW_RECIPES: (curState, recipes) => {
      //const newRecipes = curState.recipes
      const newState = {...curState}
      newState.recipes = recipes
      return { recipes: newState.recipes }
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
      newState.cardDetail = null
      newState.more = false
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
      newState.cardDetail = null
      return newState
    },
    IS_ADVANCE_SEARCH: (curState) => {
      let newState = {...curState}
      newState.isAdvSearch = !curState.isAdvSearch
      return { isAdvSearch: newState.isAdvSearch }
    },
    SET_MORE: (curState, inputMore) => {
      let newState = {...curState}
      newState.more = inputMore
      return { more: newState.more }
    },
    SET_TOTAL: (curState, count) => {
      let newState = {...curState}
      newState.totalCount = count
      return { totalCount: newState.totalCount }
    },
    SET_TO: (curState, toData) => {
      let newState = {...curState}
      newState.to = toData
      return { to: newState.to}
    },
    SET_FROM: (curState, fromData) => {
      let newState = {...curState}
      newState.from = fromData
      return { from: newState.from}
    }
  }
  initStore(actions, {
    recipes: [],
    search: [],
    showBookmark: false,
    cardDetail: null,
    isAdvSearch: false,
    totalCount: 0,
    more: false,
    to: 0,
    from: 0
  });
}
export default configureStore
