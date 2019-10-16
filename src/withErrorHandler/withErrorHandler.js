import React from "react";
import Modal from "../components/UI/Modal";
import Aux from "../hoc/Aux";

const withErrorHandler = (WrappedComponent, firebase) => {
  return class extends React.Component {
    state = {
      error: null
    };

    componentWillMount() {
      firebase.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      firebase.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
        }
      );
    }

    closeBackdrop = () => {
      this.setState({ error: null });
    };

    render() {
      console.log(this.state.error);
      return (
        <Aux>
          <Modal
            isPurchasingHandle={this.closeBackdrop}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
