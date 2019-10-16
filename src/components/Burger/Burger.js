import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import Spinner from "../UI/Spinner/Spinner";

const burger = props => {
  let transformedIngredients = <Spinner></Spinner>;
  if (props.ingredients) {
    transformedIngredients = Object.keys(props.ingredients).map(ingredient => {
      return [...Array(props.ingredients[ingredient])].map((_, ikey) => {
        return (
          <BurgerIngredient key={ikey} type={ingredient}></BurgerIngredient>
        );
      });
    });

    const res = transformedIngredients.reduce((prevArray, ele) => {
      return [...prevArray, ...ele];
    });

    if (res.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>;
    }
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
