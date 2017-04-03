import React from 'react';

const Visor = (props) => {

  return (
    <div className="js-markup">
      <div className="u-pad-v-1">
        <span className="tx-10 tx-uppercase u-op-4">Stylesheet Loaded</span>
      </div>
      <div className="c-card u-mrg-b-2">
        <div className="c-card__block c-card__block--xs">
          <span className="tx-xs">{props.file}</span>
        </div>
      </div>
    </div>
  );
}

export default Visor;
