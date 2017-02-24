wolfram [![Build Status](https://travis-ci.org/strax/node-wolfram.svg?branch=master)](https://travis-ci.org/strax/node-wolfram)
=================================================

Wolfram is a simple Wolfram|Alpha API wrapper for Node.js with support for both plaintext and image results.

How to use
----------

Register for a Wolfram|Alpha application ID. The Wolfram|Alpha® API is available for free for non-commercial experimental use with a low monthly cap on queries.  For more information, visit [http://products.wolframalpha.com/developers/](http://products.wolframalpha.com/developers/). Wolfram is a registered trademark of the Wolfram Group of Companies. 

Install the module with npm:
`$ npm install wolfram`

Example usage:

```javascript
var wolfram = require('wolfram').createClient("[CENSORED]")

wolfram.query("integrate 2x", function(err, result) {
  if(err) throw err
  console.log("Result: %j", result)
})
```

Running tests
-------------

Navigate to the project folder and run `npm install` to install the project's dependencies.

Run the following command, substituting `your-app-id` with your Wolfram|Alpha application ID.

`$ WOLFRAM_APPID=your-app-id npm test`

License
-------

[MIT](https://github.com/strax/node-wolfram/blob/master/LICENSE)
