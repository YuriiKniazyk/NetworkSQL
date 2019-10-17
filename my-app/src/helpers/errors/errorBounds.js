import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          hasError: false, 
          info: null 
        };
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: error, info });
    }
  
    render() {
        if(this.state.error) {
            return (
              <div>
                <h5>Some field is empty!!!!!!</h5>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.info.componentStack}
                </details>
              </div>
            );
        } 
          return this.props.children;
    }
}

export default ErrorBoundary;