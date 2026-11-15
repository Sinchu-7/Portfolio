import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Portfolio error boundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-state">
          <div className="container narrow">
            <p className="eyebrow">Portfolio unavailable</p>
            <h1>Something went wrong.</h1>
            <p>Please refresh the page or try again later.</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
