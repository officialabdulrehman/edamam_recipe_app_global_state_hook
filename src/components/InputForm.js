import React, { useState } from 'react';

import { useStore } from '../hooks-store/store';
import './InputForm.module.css';

export default function InputForm(props) {
  const [query, setQuery] = useState("");
  const dispatch = useStore()[1];

  const onChangeHandler = (event) => {
    const input = event.target.value
    setQuery(input);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch('SET_SEARCH', query)
    dispatch('SET_SHOWBOOKMARK', false)
    setQuery('')
  };

  return (
      <form onSubmit={onSubmitHandler} >
        <input onChange={onChangeHandler} value={query}/>
        <button type='submit'>Search</button>
      </form>
  )
}
