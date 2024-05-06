import React, { createContext, useEffect, useContext, useReducer } from "react";
import supabase from "../config/supabaseClient";
import { useParams } from "react-router-dom";

const SneakerDataContext = createContext();

// Action types
const SET_SNEAKER_DATA = "SET_SNEAKER_DATA";
const SET_SINGLE_SNEAKER_DATA = "SET_SINGLE_SNEAKER_DATA";
const SET_FEATURED_SNEAKER_DATA = "SET_FEATURED_SNEAKER_DATA";

// Reducer function
const sneakerReducer = (state, action) => {
  switch (action.type) {
    case SET_SNEAKER_DATA:
      return { ...state, allSneakers: action.payload };
    case SET_FEATURED_SNEAKER_DATA:
      return { ...state, featuredSneakers: action.payload };
    case SET_SINGLE_SNEAKER_DATA:
      return { ...state, singleSneaker: action.payload };
    default:
      return state;
  }
};

export const SneakerDataProvider = ({ children }) => {
  const initialState = {
    allSneakers: [],
    singleSneaker: [],
    featuredSneakers: [],
  };
  const [data, dispatch] = useReducer(sneakerReducer, initialState);
  const { id } = useParams();

  useEffect(() => {
    // Function to fetch all sneaker data
    const fetchData = async () => {
      try {
        const { data: allSneakers, allError } = await supabase
          .from("sneakers")
          .select("*");
        if (allError) {
          throw allError;
        }
        dispatch({ type: SET_SNEAKER_DATA, payload: allSneakers });

        // Function to fetch single sneaker data

        const { data: singleSneaker, singleError } = await supabase
          .from("sneakers")
          .eq("id", id)
          .select();

        if (singleError) {
          throw singleError;
        }
        dispatch({ type: SET_SINGLE_SNEAKER_DATA, payload: singleSneaker });

        // Function to fetch featured sneakers
        const { data: featuredSneakers, error: featuredError } = await supabase
          .from("sneakers")
          .select("*")
          .eq("featured", true);
        if (featuredError) {
          throw featuredError;
        }
        dispatch({
          type: SET_FEATURED_SNEAKER_DATA,
          payload: featuredSneakers,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SneakerDataContext.Provider value={data}>
      {children}
    </SneakerDataContext.Provider>
  );
};

export const useSneakerData = () => useContext(SneakerDataContext);
