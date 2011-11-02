var test = require('tap').test,
    wolfram = require('../')

test('blank application key', function(t) {
  var client = wolfram.createClient()
  
  client.query("integrate 2x", function(err, result) {
    t.type(err, "string", "error should be a string describing the message")
    t.equals(result, null, "result should be null")
    t.end()
  })
})