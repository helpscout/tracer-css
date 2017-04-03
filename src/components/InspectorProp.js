import React from 'react';

class InspectorProp extends React.Component {
  constructor() {
    super();
  }

  render() {
    const p = this.props.styleProp;
    let strikeStyle = {};
    if (p.override) {
      strikeStyle = {
        textDecoration: 'line-through',
        opacity: '0.4',
      };
    }

    return (
      <div className="js-inspector-prop" style={{fontFamily: 'monospace'}}>
        <span style={strikeStyle}>
          <span className="t-tx-orange">{p.prop}</span>: {p.value}
        </span>
        <span className="u-op-2 u-pad-l-3">{p.selector}</span>
      </div>
    );
  }
};

InspectorProp.propTypes = {
  styleProp: React.PropTypes.object,
};

export default InspectorProp;
