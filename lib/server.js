import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import qs from 'qs';
import counterApp from './reducers'
import App from './containers/App'
import { renderToString } from 'react-dom/server'
import { fetchCounter } from './api/counter';

const app = Express()


//Serve static files
app.use('/static', Express.static('static'))

// This is fired every time the server side receives a request
app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
    console.log('req.path', req.path);
    fetchCounter(counter=>{

        console.log('counter', counter);
        // Create a new Redux store instance
        const store = createStore(counterApp,counter);
      
        // Render the component to a string
        const html = renderToString(
          <Provider store={store}>
            <App />
          </Provider>
        )
      
        // Grab the initial state from our Redux store
        const preloadedState = store.getState();
      
        // Send the rendered page back to the client
        res.send(renderFullPage(html, preloadedState))

    });
    
    
    
  }
  function renderFullPage(html, preloadedState) {
      console.log('preloadedState', preloadedState);
    return `
      <!doctype html>
      <html>
        <head>
          <title>Redux Universal Example</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
              /</g,
              '\\u003c'
            )}
          </script>
          <script src="/static/bundle.js"></script>
        </body>
      </html>
      `
  }
  const port = 3000
app.listen(port,()=>{
    console.log('listening to port'+ port, `try http://localhost:3000/?counter=100 `);
});