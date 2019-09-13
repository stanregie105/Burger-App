import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 200,
  bacon: 150,
  cheese: 250,
  meat: 400
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 100,
    disabled: false
  };

  removeIngredientHandler() {}

  addIngredientHandler = type => {
    const quantity = this.state.ingredients[type] + 1;
    const price = INGREDIENT_PRICES[type] * quantity;
    const updatedPrice = this.state.totalPrice + price;
    this.setState({ ingredients: quantity, totalPrice: updatedPrice });
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          added={this.addIngredientHandler}
          price={this.state.totalPrice}
        ></BuildControls>
      </Aux>
    );
  }
}

export default BurgerBuilder;
