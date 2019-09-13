import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
    isPurchaseable: false
  };

  removeIngredientHandler() {}

  addIngredientHandler = type => {
    const quantity = this.state.ingredients[type] + 1;
    const price = INGREDIENT_PRICES[type] * quantity;
    const updatedPrice = this.state.totalPrice + price;
    const newIngredient = { ...this.state.ingredients, [type]: quantity };
    this.setState({ ingredients: newIngredient, totalPrice: updatedPrice });
    this.updatePurchaseSte(newIngredient);
  };

  removeIgredientHandler = type => {
    const quantity = this.state.ingredients[type] - 1;
    if (quantity < 0) {
      return 0;
    }
    const price = INGREDIENT_PRICES[type] * quantity;
    const updatedPrice = this.state.totalPrice - price;
    const newIngredient = { ...this.state.ingredients, [type]: quantity };
    this.setState({ ingredients: newIngredient, totalPrice: updatedPrice });
    this.updatePurchaseSte(newIngredient);
  };

  updatePurchaseSte = ingredient => {
    const sum = Object.values(ingredient).reduce((acc, val) => {
      return acc + val;
    });

    this.setState({ isPurchaseable: sum > 0 });
  };
  render() {
    let disabled = { ...this.state.ingredients };

    for (let item in disabled) {
      disabled = { ...disabled, [item]: disabled[item] === 0 };
    }

    console.log(disabled);
    return (
      <Aux>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          added={this.addIngredientHandler}
          removed={this.removeIgredientHandler}
          price={this.state.totalPrice}
          disabled={disabled}
          isPurchaseable={this.state.isPurchaseable}
        ></BuildControls>
      </Aux>
    );
  }
}

export default BurgerBuilder;
