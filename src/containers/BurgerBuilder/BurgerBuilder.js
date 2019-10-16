import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../withErrorHandler/withErrorHandler";
import firebase from "../../api/firebase";

const INGREDIENT_PRICES = {
  salad: 200,
  bacon: 150,
  cheese: 250,
  meat: 400
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 100,
    isPurchaseable: false,
    isPurchasing: false,
    isLoading: false,
    error: false
  };

  componentDidMount() {
    firebase
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

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

  isPurchasingHandle = () => {
    this.setState({ isPurchasing: !this.state.isPurchasing });
  };
  updatePurchaseSte = ingredient => {
    const sum = Object.values(ingredient).reduce((acc, val) => {
      return acc + val;
    });

    this.setState({ isPurchaseable: sum > 0 });
  };

  purchaseContinued = () => {
    this.setState({ isLoading: true, isPurchasing: false });
    const order = {
      customer: {
        name: "coah ",
        phone: null,
        address: "42 Otunba Adeshilewa street",
        email: "walosha.com"
      },
      ingredient: this.state.ingredients,
      price: this.state.totalPrice
    };

    firebase
      .post("/orders.json", order)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    let disabled = { ...this.state.ingredients };
    for (let item in disabled) {
      disabled = { ...disabled, [item]: disabled[item] === 0 };
    }

    let orderSummary = (
      <OrderSummary
        price={this.state.totalPrice}
        isPurchasingHandle={this.isPurchasingHandle}
        purchaseContinued={this.purchaseContinued}
        ingredients={this.state.ingredients}
      />
    );
    if (this.state.isLoading) {
      orderSummary = <Spinner></Spinner>;
    }

    return (
      <Aux>
        <Modal
          isPurchasingHandle={this.isPurchasingHandle}
          show={this.state.isPurchasing}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          added={this.addIngredientHandler}
          removed={this.removeIgredientHandler}
          price={this.state.totalPrice}
          disabled={disabled}
          isPurchaseable={this.state.isPurchaseable}
          isPurchasing={this.isPurchasingHandle}
        ></BuildControls>
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, firebase);
