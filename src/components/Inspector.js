import React from 'react';
import InspectorProp from './InspectorProp';

class Inspector extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.styleProps !== nextProps.styleProps;
  }

  alphabetizeProps(a, b) {
    return a.prop.localeCompare(b.prop);
  }

  sortProps(styleProps) {
    const active = styleProps.filter(s => !s.override).sort(this.alphabetizeProps);
    const inactive = styleProps.filter(s => s.override).sort(this.alphabetizeProps);
    return active.concat(inactive);
  }

  styleProps() {
    const rendered = {};
    const styles = this.props.styleProps.reverse().map(s => {
      if (!Object.prototype.hasOwnProperty.call(rendered, s.prop)) {
        rendered[s.prop] = s;
      } else {
        s.override = true;
      }
      if (s.value.slice(-1) !== ';') {
        s.value += ';'
      }
      return s;
    });
    return this.sortProps(styles);
  }

  render() {
    const styleProps = this.styleProps();
    return (
      <div className="js-inspector">
        {styleProps.map((p, index) => (
          <InspectorProp
            key={index + 1}
            styleProp={p}
          />
        ))}
      </div>
    );
  }
};

Inspector.propTypes = {
  styleProps: React.PropTypes.array,
};

export default Inspector;
