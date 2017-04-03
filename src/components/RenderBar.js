import React from 'react';
import Emmet from 'emmetjs';

class RenderBar extends React.Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  sanitizeSelectors(selectors) {
    return selectors.trim()
      .replace(/\ > \ /g, ' ')
      .replace(/>/g, ' ')
      .replace(/\ \ \ \ /g, ' ')
      .replace(/\ \ \ /g, ' ')
      .replace(/\ \ /g, ' ')
      .replace(/\ /g, ' > ');
  }

  renderSelectors(selectors) {
    const markup = window.Emmet(this.sanitizeSelectors(selectors));
    this.props.handleMarkup(markup);
  }

  animate() {
    this.inputEl.classList.add('c-input--pulse-sm');
  }

  resetAnimation() {
    this.inputEl.classList.remove('c-input--pulse-sm');
  }

  handleKeyPress(e) {
    this.resetAnimation();
    if (e.key === 'Enter' && e.target.value.length) {
      this.renderSelectors(e.target.value);
      this.animate();
    }
  }

  render() {
    const handleKeyPress = this.handleKeyPress;
    return (
      <div className="js-render-bar">
        <input
          className="c-input"
          onKeyUp={handleKeyPress}
          placeholder="Selector: article.post ul li a"
          ref={(el) => { this.inputEl = el; }}
          style={{width: '100%'}}
          type="text"
          value="#subjectLine #notyContainer .noty_buttons > button"
        />
      </div>
    );
  }
};

RenderBar.propTypes = {
  handleMarkup: React.PropTypes.func,
};

export default RenderBar;
