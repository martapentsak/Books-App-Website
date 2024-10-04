import React, { ErrorInfo } from "react";

import somethinWring from "../../assets/somethingWrong.png";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-page">
          <img src={somethinWring} className="something-wring-icon" />
          <h1 className="error">Oops! Something went wrong ....</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
