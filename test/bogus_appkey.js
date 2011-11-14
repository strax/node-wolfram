var test = require('tap').test,
    wolfram = require('../')

test('bogus application id', function(t) {
  var client = wolfram.createClient("bogus-trololoo")
  
  client.query("integrate 2x", function(err, result) {
    t.type(err, "string", "error should be a string describing the message")
    t.notOk(result, "result should be null")
    t.end()
  })
})