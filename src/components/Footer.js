import React from 'react';

const Footer = () => {
  const year = () => {
    return new Date().getFullYear();
  }

  return (
    <div className="js-footer u-mrg-t-8 u-mrg-b-4">
      <hr />
      <div className="tx-center tx-xs u-op-6">
        <p className="u-mrg-b-1">
          Made by&nbsp;
          <a
            href="https://jonquach.com/"
            target="_blank"
            className="c-link c-link--plain">
            Q
          </a>
        </p>
        <p className="u-op-5">
          &copy; {year()}&nbsp;
          <a
            href="https://www.helpscout.net/"
            target="_blank"
            className="c-link c-link--plain">
            Help Scout
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
