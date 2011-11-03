var test = require('tap').test,
    wolfram = require('../')

test('valid response', function(t) {
  var client = wolfram.createClient(process.env.WOLFRAM_APPID)
  
  client.query("integrate 2x", function(err, result) {
    t.notOk(err, "err should be null")
    t.equal(result.length, 2, "result length should be 2")
    t.equal(result[0].primary, true, "first result should be primary")
    t.equal(result[0].subpods[0].value, ' integral 2 x dx = x^2+constant', 'result should be constant')
    t.ok(result[0].subpods[0].image)
    t.end()
  })
})
