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

    let content = (
      styleProps.map((p, index) => (
        <InspectorProp
        key={index + 1}
        styleProp={p}
        />
      ))
    );
    if (!styleProps.length) {
      return (
        <div className="js-inspector"></div>
      );
      // content = (
      //   <div className="tx-center">
      //     <div className="u-pad-v-7">
      //       <h3 className="u-op-4 tx-h3 tx-300">Couldn't find a trace</h3>
      //       <span className="tx-sm u-op-2">Try using a different selector.</span>
      //     </div>
      //   </div>
      // )
    }

    return (
      <div className="js-inspector">
        <div className="u-pad-v-1">
          <span className="tx-10 tx-uppercase u-op-4">Inspector</span>
        </div>
        {content}
      </div>
    );
  }
};

Inspector.propTypes = {
  styleProps: React.PropTypes.array,
};

export default Inspector;
