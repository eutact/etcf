import { Component } from "react";
import ErrorPage from "./ErrorPage";

export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (
      <ErrorPage code="client-error" />
    ) : (
      this.props.children
    );
  }
}
