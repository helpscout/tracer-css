import React from 'react';
import beautify from 'js-beautify';

class Markup extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.markup !== nextProps.markup;
  }

  beautify(markup = this.props.markup) {
    if (markup) {
      return beautify.html(markup, { 
        indent_size: 2,
      });
    } else {
      return '';
    }
  }

  render() {
    const markup = this.beautify();
    let content = (
      <pre className="u-mrg-0">{markup}</pre>
    );
    if (!markup.length) {
      return (
        <div className="js-markup"></div>
      )
    }
    return (
      <div className="js-markup">
        <div className="u-pad-v-1">
          <span className="tx-10 tx-uppercase u-op-4">Markup</span>
        </div>
        <div className="c-card u-mrg-b-5">
          <div className="c-card__block c-card__block--xs">
            {content}
          </div>
        </div>
      </div>
    );
  }
};

Markup.propTypes = {
  markup: React.PropTypes.string,
};

export default Markup;
