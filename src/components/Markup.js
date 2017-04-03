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
    return (
      <div className="js-markup">
        <pre>{markup}</pre>
      </div>
    );
  }
};

Markup.propTypes = {
  markup: React.PropTypes.string,
};

export default Markup;
