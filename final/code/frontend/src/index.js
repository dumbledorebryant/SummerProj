import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'antd/dist/antd.css'
import 'katex/dist/katex.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
