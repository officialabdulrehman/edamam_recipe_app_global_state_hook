import React from 'react';

import './InputForm.module.css';

export default function InputForm(props) {
  const { onSubmitHandler, onChangeHandler, query } = props

  return (
      <form onSubmit={onSubmitHandler} >
        <input onChange={onChangeHandler} value={query}/>
        <button type='submit'>Search</button>
      </form>
  )
}
