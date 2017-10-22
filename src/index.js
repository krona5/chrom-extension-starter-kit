import React from 'react';
import ReactDOM from 'react-dom';

const Index = () => (
    <div id="root-container" style={{width: 700, height: 300}}>
        Hello
    </div>
);

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);