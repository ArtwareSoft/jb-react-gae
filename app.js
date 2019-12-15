'use strict';

// [START gae_node_request_example]
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/fetch', function (req, res) {
	try {
		res.setHeader("Access-Control-Allow-Origin", "*");
		const fetchReq = JSON.parse(req.query.req || '');
		if (!fetchReq)
		   return endWithFailure(fetchReq,'Can not parse fetchReq');
		return fetch(fetchReq.url,fetchReq)
		  .then(res=> res.text())
		  .then(result=> res.end(result))
		  .catch(e => res.end(JSON.stringify(e)))
	  } catch(e) {
		  res.end(JSON.stringify(e))
	  }
})

app.get('/', (req, res) => {
  res
    .status(200)
    .end('Hello jb!')
    .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
