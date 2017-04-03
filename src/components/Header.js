import React from 'react';

const Header = () => {
  return (
    <div className="js-header u-mrg-v-4">
      <div className="o-flexy">
        <div className="o-flexy__item">
          <h1 className="tx-h4">
            <span className="t-tx-orange">&#10070;</span>
            <span className="u-pad-h-1">
              Tracer
            </span>
            <small className="u-pad-l-1 u-op-4 tx-400">&middot; CSS Inspector</small>
          </h1>
        </div>
        <div className="o-flexy__item">
          <a href="https://github.com/helpscout/tracer-css" target="_blank" className="c-link c-link--plain">Github</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
