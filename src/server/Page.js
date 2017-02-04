/* eslint-disable */

import React from 'react'
import {renderToString} from 'react-dom/server'

const getComponentMarkup = (component) => ({
  __html: component ? renderToString(component) : '',
})

const getExposedVariables = (initialState) => ({
  __html: [
    `window.__CLIENT__=true;`,
    `window.__SERVER__=false;`,
    `window.__INITIAL_STATE__=${JSON.stringify(initialState)};`,
  ].join(''),
})

const Page = ({assets, component, initialState}) =>
  <html>
  <head>
    {Object.keys(assets.styles).map((style, index) =>
      <link href={assets.styles[style]} key={index} media="all" rel="stylesheet" type="text/css"/>)}
  </head>
  <body>
    <div id="app" style={{display: 'flex', flex: 1}} dangerouslySetInnerHTML={getComponentMarkup(component)}/>
    <script dangerouslySetInnerHTML={getExposedVariables(initialState)} charSet="UTF-8"/>
    {Object.keys(assets.javascript).map((script, i) =>
      <script src={assets.javascript[script]} key={i}></script>)}
  </body>
  </html>

export default Page
