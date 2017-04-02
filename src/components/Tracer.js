import React from 'react';

class Tracer extends React.Component {
  constructor() {
    super();
    // this.blinkEl = null;
    this.getChildNode = this.getChildNode.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.getStyleProps = this.getStyleProps.bind(this);

    this.blink = this.blink.bind(this);
    this.pulse = this.pulse.bind(this);
    this.recall = this.recall.bind(this);
  }

  componentDidUpdate() {
    this.pulse();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.markup !== nextProps.markup;
  }

  blink() {
    this.blinkEl.innerHTML = '';
    this.blinkEl.appendChild(this.props.markup);
  }

  getChildNode(nodes) {
    if (nodes.childNodes.length) {
      return this.getChildNode(nodes.childNodes[0]);
    }
    return nodes;
  }

  getStyles(el) {
    const sheets = document.styleSheets[0];
    const styles = [];
    let props = [];
    const rules = sheets.rules || sheets.cssRules;
    for (var r in rules) {
      if (el.matches(rules[r].selectorText)) {
        props = props.concat(this.getStyleProps(rules[r]));
        styles.push(rules[r].cssText);
      }
    }
    return props;
  }

  getStyleProps = function(rule) {
    const cssText = rule.style.cssText;
    return cssText.split('; ').reduce((rules, r) => {
      const props = r.split(': ');
      rules.push({
        selector: rule.selectorText,
        prop: props[0],
        value: props[1],
      });
      return rules;
      }, []);
  }

  recall() {
    const el = this.getChildNode(this.blinkEl.childNodes[0]);
    const styles = this.getStyles(el);
    return styles;
  }

  pulse() {
    if (!this.blinkEl) {
      return false;
    }
    this.blink();
    this.props.handleStyleProps(this.recall());
  }

  render() {
    return (
      <div className="js-tracer">
        <div
          className="js-tracer__blink"
          ref={(el) => { this.blinkEl = el; }}
          style={{display: 'none'}}>
        </div>
      </div>
    );
  }
};

Tracer.propTypes = {
  handleStyleProps: React.PropTypes.func.isRequired,
  markup: React.PropTypes.any.isRequired,
};

export default Tracer;
