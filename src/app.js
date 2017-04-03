import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Inspector from './components/Inspector';
import Markup from './components/Markup';
import RenderBar from './components/RenderBar';
import StyleLoader from './components/StyleLoader';
import Tracer from './components/Tracer';

import '../styles/index.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stylesheet: {
        href: '',
        rules: [],
      },
      markup: false,
      markupString: '',
      styleProps: [],
    };

    this.handleMarkup = this.handleMarkup.bind(this);
    this.handleStyleProps = this.handleStyleProps.bind(this);
    this.handleStylesheetReload = this.handleStylesheetReload.bind(this);
  }

  componentWillMount() {
    this.setState({
      stylesheet: document.styleSheets[0],
    });
    this.removeStylesheets();
  }

  removeStylesheets() {
    const stylesheets = document.querySelectorAll('head > link');
    stylesheets.forEach(s => s.parentNode.removeChild(s));
  }

  handleMarkup(markup) {
    this.setState({markup});
  }

  handleStyleProps(parsed) {
    this.setState({
      markupString: parsed.markupString,
      styleProps: parsed.styleProps,
    });
  }

  handleStylesheetReload(stylesheet) {
    console.log('Styles loaded:', stylesheet.href);
    this.setState({stylesheet});
  }

  render() {
    const handleMarkup = this.handleMarkup;
    const handleStyleProps = this.handleStyleProps;
    const handleStylesheetReload = this.handleStylesheetReload;
    const markup = this.state.markup;
    const markupString = this.state.markupString;
    const styleProps = this.state.styleProps;
    const stylesheet = this.state.stylesheet;

    return (
      <div className="js-tracer-app">
        <div className="o-container u-pad-v-2">
          <div className="o-row">
            <div className="o-col-8@md o-col-offset-2@md">
              <Header />
              <div className="u-mrg-b-2">
                <StyleLoader
                  handleStylesheetReload={handleStylesheetReload}
                  stylesheet={stylesheet}
                />
              </div>
              <div className="u-mrg-b-5">
                <RenderBar
                  handleMarkup={handleMarkup}
                />
              </div>
              <Tracer
                handleStyleProps={handleStyleProps}
                markup={markup}
                stylesheet={stylesheet}
              />
              <Markup
                markup={markupString}
              />
              <Inspector
                styleProps={styleProps}
              />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
