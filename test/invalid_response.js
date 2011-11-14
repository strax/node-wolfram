var test = require('tap').test,
    wolfram = require('../')

test('invalid response', function(t) {
  var client = wolfram.createClient(process.env.WOLFRAM_APPID)
  
  client.query("adh89u8n0eudhdah", function(err, result) {
    t.notOk(err, "err should be null")
    t.type(result, "object")
    t.equal(result.length, 0)
    t.end()
  })
})