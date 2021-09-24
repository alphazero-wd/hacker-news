import React, { useContext, useEffect, useReducer } from 'react';

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';
import reducer from './reducer';
const initialState = {
  loading: false,
  stories: [],
  query: '',
  page: 0,
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, stories, query, page } = state;
  const urlQuery = 'query=' + query + '&page=' + page;
  const urlPage = 'page=' + page;
  useEffect(() => fetchStories(), [query, page]);
  const fetchStories = async () => {
    dispatch({ type: SET_LOADING });
    let res;
    try {
      if (!query) {
        res = await fetch(API_ENDPOINT + urlPage);
      } else {
        res = await fetch(API_ENDPOINT + urlQuery);
      }
      const data = await res.json();
      const stories = data.hits;
      dispatch({ type: SET_STORIES, payload: stories });
    } catch (error) {
      console.log(error);
    }
  };
  const changeQuery = (e) => {
    const value = e.target.value;
    dispatch({ type: HANDLE_SEARCH, payload: value });
  };

  const togglePages = (e) => {
    const className = e.target.className;
    dispatch({ type: HANDLE_PAGE, payload: className });
  };

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        stories,
        query,
        page,
        changeQuery,
        togglePages,
        removeStory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
