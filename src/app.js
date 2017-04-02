import React from 'react';
import '../styles/index.scss';
import RenderBar from './components/RenderBar';
import Tracer from './components/Tracer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      markup: false,
      styleProps: [],
    };

    this.handleMarkup = this.handleMarkup.bind(this);
    this.handleStyleProps = this.handleStyleProps.bind(this);
  }

  handleMarkup(markup) {
    this.setState({markup});
  }

  handleStyleProps(styleProps) {
    this.setState({styleProps});
  }

  render() {
    const handleMarkup = this.handleMarkup;
    const handleStyleProps = this.handleStyleProps;
    const markup = this.state.markup;
    const styleProps = this.state.styleProps;

    return (
      <div>
        <RenderBar
          handleMarkup={handleMarkup}
        />
        <Tracer
          handleStyleProps={handleStyleProps}
          markup={markup}
        />
        <div>{styleProps.toString()}</div>
      </div>
    )
  }
}

export default App;
