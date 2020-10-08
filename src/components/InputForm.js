import React, { useState } from 'react';

import { useStore } from '../hooks-store/store';
import './InputForm.module.css';
import { motion } from 'framer-motion';

const inputVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition:{
      duration: 1,
      delay: 0.5,
      type: 'spring',
      stiffness: 120
    }
  }
}

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
    <motion.form
      onSubmit={onSubmitHandler}
      variants={inputVariants}
      initial="hidden"
      animate="visible"
    >
      <input onChange={onChangeHandler} value={query} />
      <button type="submit">Search</button>
    </motion.form>
  );
}
