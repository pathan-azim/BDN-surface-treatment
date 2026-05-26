import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught canvas rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.value) {
      // Fallback UI if the canvas crashes
      return <div className="canvas-fallback" style={{ display: 'none' }} />;
    }
    return this.props.children;
  }
}