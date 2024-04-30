import React, { useReducer } from "react";
import { useSneakerData } from "../context/sneakers_context";

const Category = () => {
  const data = useSneakerData();
  return (
    <div>
      <select>
        {data.allSneakers.map((sneaker) => {
          return (
            <option key={sneaker.id} value={sneaker.category}>
              {sneaker.category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Category;
