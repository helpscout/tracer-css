import React from 'react';

class StyleLoader extends React.Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  removeStylesheets() {
    const stylesheets = document.querySelectorAll('head > link');
    stylesheets.forEach(s => s.parentNode.removeChild(s));
  }

  getStylesheetRules() {
    return document.styleSheets[document.styleSheets.length - 1];
  }

  loadStylesheet(url) {
    if (!url.length) {
      return false;
    }
    const head  = document.getElementsByTagName('head')[0];
    const link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);

    // Wait for the browser to actually load the external stylesheet
    link.onload = () => {
      this.animate();
      this.props.handleStylesheetReload(this.getStylesheetRules());
      this.removeStylesheets();
    }
  }

  animate() {
    this.inputEl.classList.add('c-input--pulse');
  }

  resetAnimation() {
    this.inputEl.classList.remove('c-input--pulse');
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && e.target.value.length) {
      this.resetAnimation();
      this.loadStylesheet(e.target.value);
      e.target.value = ''
    }
  }

  render() {
    const handleKeyPress = this.handleKeyPress;
    const stylesheet = this.props.stylesheet;
    const placeholder = `Loaded: ${stylesheet.href}`;
    return (
      <div className="js-style-loader">
        <input
          className="c-input"
          onKeyUp={handleKeyPress}
          placeholder={placeholder}
          ref={(el) => { this.inputEl = el; }}
          style={{width: '100%'}}
          type="text"
        />
      </div>
    );
  }
};

StyleLoader.propTypes = {
  handleStylesheetReload: React.PropTypes.func,
};

export default StyleLoader;
