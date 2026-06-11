import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: (params: {
    error: Error | null;
    resetError: () => void;
  }) => ReactNode;
  resetKey?: string;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Remote module error:', error, errorInfo);
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps) {
    if (
      this.state.error &&
      previousProps.resetKey !== this.props.resetKey
    ) {
      this.resetError();
    }
  }

  resetError = () => {
    this.setState({
      error: null,
    });
  };

  render() {
    if (this.state.error) {
      return this.props.fallback({
        error: this.state.error,
        resetError: this.resetError,
      });
    }

    return this.props.children;
  }
}