console.log('Tracer!');
const emmet = window.Emmet;
const renderZone = document.getElementById('render-zone');
const styleZone = document.getElementById('style-zone');
const markupZone = document.getElementById('markup-zone');

onKeyUp = function(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    const target = e.target;
    const val = target.value;
    if (val.length) {
      generateSelectors(val);
    } else {
      styleZone.innerHTML = '';
      markupZone.innerHTML = '';
    }
  }
}

generateSelectors = function(input) {
  if (!input) {
    return false;
  }
  const selectors = input.trim()
    .replace(/\ > \ /g, ' ')
    .replace(/>/g, ' ')
    .replace(/\ \ \ \ /g, ' ')
    .replace(/\ \ \ /g, ' ')
    .replace(/\ \ /g, ' ')
    .replace(/\ /g, ' > ');
  console.log(`rendered: ${selectors}`);
  const el = emmet(selectors);
  render(el);
}

getChildNode = function(nodes) {
  if (nodes.childNodes.length) {
    return getChildNode(nodes.childNodes[0]);
  }
  return nodes;
}

getProps = function(rule) {
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

getStyles = function(el) {
  const sheets = document.styleSheets;
  const styles = [];
  let props = [];
  for (var i in sheets) {
    const rules = sheets[i].rules || sheets[i].cssRules;
    for (var r in rules) {
      if (el.matches(rules[r].selectorText)) {
        props = props.concat(getProps(rules[r]));
        styles.push(rules[r].cssText);
      }
    }
  }
  return props;
}

render = function(selectors) {
  renderZone.innerHTML = '';
  renderZone.appendChild(selectors);
  const el = getChildNode(renderZone.childNodes[0]);
  const styles = getStyles(el);
  renderMarkup(selectors);
  renderStyles(styles);
}

renderMarkup = function(selectors) {
  markupZone.innerHTML = '';
  const markup = html_beautify(renderZone.innerHTML, { 
    indent_size: 2,
  });
  markupZone.innerText = markup;
}

renderStyles = function(styles) {
  styleZone.innerHTML = '';
  const rendered = {};
  const props = styles.reverse().map(s => {
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

  let template = `<ul style="list-style: none; padding-left: 0; margin: 0;">`;
  props.reverse().forEach(s => {
    let strikeStyle = s.override ? 'text-decoration: line-through; opacity: 0.4;' : '';
    template += `
      <li style="font-family: monospace;">
        <span style="${strikeStyle}">
          <span style="color: #c80000;">${s.prop}</span>: ${s.value}</span>
        <span style="opacity: 0.2;">${s.selector}</span>
      </li>
    `;
  });
  template += `</ul>`;
  styleZone.innerHTML = template;
}
