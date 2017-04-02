import React from 'react';
import '../styles/index.scss';
import RenderBar from './components/RenderBar';

const App = (props) => {

  const handleMarkup = (markup) => {
    console.log(markup);
  }

  return (
    <div>
      <RenderBar
        handleMarkup={handleMarkup}
      />
    </div>
  )
}

export default App;
