import React from 'react';

const StyleLoader = (props) => {
  const removeStylesheets = () => {
    const stylesheets = document.querySelectorAll('head > link');
    stylesheets.forEach(s => s.parentNode.removeChild(s));
  }

  const getStylesheetRules = () => {
    return document.styleSheets[document.styleSheets.length - 1];
  }

  const loadStylesheet = (url) => {
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
      props.handleStylesheetReload(getStylesheetRules());
      removeStylesheets();
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value.length) {
      loadStylesheet(e.target.value);
    }
  }

  return (
    <div className="js-style-loader">
      <input
        onKeyPress={handleKeyPress}
        placeholder="https://www.helpscout.net/css/launch.css"
        style={{width: '100%'}}
        type="text"
      />
    </div>
  );
};

StyleLoader.propTypes = {
  handleStylesheetReload: React.PropTypes.func,
};

export default StyleLoader;
