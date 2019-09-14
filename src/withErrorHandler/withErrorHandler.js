import React from "react";
import Modal from "../components/UI/Modal";
import Aux from "../hoc/Aux";

const withErrorHandler = (WrappedComponent, firebase) => {
  return class extends React.Component {
    state = {
      error: null
    };

    componentDidMount() {
      firebase.interceptors.request.use(() => {
        this.setState({ error: null });
      });
      firebase.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
        }
      );
    }

    render() {
      console.log(this.state.error);
      return (
        <Aux>
          <Modal show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
