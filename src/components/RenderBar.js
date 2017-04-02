import React from 'react';
import Emmet from 'emmetjs';

const RenderBar = (props) => {
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
    if (e.key === 'Enter') {
      renderSelectors(e.target.value);
    }
  }

  return (
    <div>
      <input
        type="text"
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

RenderBar.propTypes = {
  handleMarkup: React.PropTypes.func,
};

export default RenderBar;
