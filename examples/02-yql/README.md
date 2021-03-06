How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. open http://localhost:3000/ with your browser
5. type `show tables` then press TEST button. This is a client side isocall.request(), you may check with develop tools.
6. open http://localhost:3000/?q=show+tables. This is a server side isocall.request().

How it works
------------

* <a href="server.js">server.js</a> creates an Express Server:
  * using <a href="http://babeljs.io/">babel</a> to enable ES6 features
  * serve client side bundle file at /js/yqlconsle.js with <a href="https://github.com/ForbesLindesay/browserify-middleware">browserify-middleware</a>
  * serve iso-call default proxy at /_isoreq_/ for your RPC or API
  * serve a <a href="page.js">yql console page</a> for any other URL requests.
* <a href="page.js">page.js</a> creates an Express middleware:
  * using <a href="http://babeljs.io/docs/learn-es6/">ES6</a> template string syntax
  * using <a href="app.js">app.js</a> to get() yql console HTML then render whole page
* <a href="app.js">app.js</a> creates an application with these API:
  * `get(yql)`: return a promise of yql result inside console HTML
  * `getInner(yql)`: return a promise of yql result inside console innerHTML
  * `renderInto(form)`: use <a href="yql.js">yql.js</a> to get yql result and render the form
* <a href="yql.js">yql.js</a> creates an isomorphic interface of YQL:
  * using `isocall.addConfigs()` to define yql API endpoint
  * using `isocall.request()` to make request to yql API endpoint
