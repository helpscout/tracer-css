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
          <span style={{color: '#c80000'}}>{p.prop}</span>: {p.value}
        </span>
        <span style={{opacity: '0.2', paddingLeft: '12px'}}>{p.selector}</span>
      </div>
    );
  }
};

InspectorProp.propTypes = {
  styleProp: React.PropTypes.object,
};

export default InspectorProp;
