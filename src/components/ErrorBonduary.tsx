import React from "react";
import { createGlobalState } from "react-use";
import Error from "./Error";
import Modal from "./Modal";

interface IErrorBoundaryProps {
  children: React.ReactNode;
}
export default class ErrorBoundary extends React.Component {
  state: { hasError: boolean; error?: any };

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true, error: error.message };
  }

  render() {
    return (
      <>
        <div>{this.props.children}</div>
        <Modal>
          <Error
            show={this.state.hasError}
            text={this.state.error}
            setshowModal={(hasError) => this.setState({ hasError })}
          />
        </Modal>
      </>
    );
  }
}
