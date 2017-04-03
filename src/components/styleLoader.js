import React from 'react';

const StyleLoader = (props) => {
  const sanitizeSelectors = (selectors) => {
    return selectors.trim()
      .replace(/\ > \ /g, ' ')
      .replace(/>/g, ' ')
      .replace(/\ \ \ \ /g, ' ')
      .replace(/\ \ \ /g, ' ')
      .replace(/\ \ /g, ' ')
      .replace(/\ /g, ' > ');
  }

  const renderSelectors = (selectors) => {
    const markup = window.Emmet(sanitizeSelectors(selectors));
    props.handleMarkup(markup);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value.length) {
      renderSelectors(e.target.value);
    }
  }

  return (
    <div>
      <input
        onKeyPress={handleKeyPress}
        placeholder="article.post ul li a"
        style={{width: '100%'}}
        type="text"
      />
    </div>
  );
};

StyleLoader.propTypes = {
  handleMarkup: React.PropTypes.func,
};

export default StyleLoader;
