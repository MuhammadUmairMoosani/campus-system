import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme ({
    palette: {
        primary1Color:'#87AAE5',
        accent1Color: '#FFD700',
    }
})

ReactDOM.render(
<MuiThemeProvider muiTheme={muiTheme}>
<App />
</MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();
