var test = require('tap').test,
    wolfram = require('../')

test('valid response', function(t) {
  var client = wolfram.createClient(process.env.WOLFRAM_APPID)

  t.test("integrate 2x", function(t) {
    client.query("integrate 2x", function(err, result) {
      t.notOk(err, "err should be null")
      t.type(result, "object")
      t.ok(result.length)
      t.equal(result.length, 2, "result length should be 2")
      t.equal(result[0].primary, true, "first pod should be primary")
      t.equal(result[0].subpods[0].value, ' integral 2 x dx = x^2 + constant', 'result should be constant')
      t.ok(result[0].subpods[0].image, "result should have an image representation")
      t.ok(result[0].title, "result should have a title of Indefinite integral")
      t.end()
    })
  })

  t.test("1+1", function(t) {
    client.query("1+1", function(err, result) {
      t.notOk(err, "err should be null")
      t.type(result, "object")
      t.ok(result.length)
      t.equal(result.length, 6)
      t.equal(result[1].primary, true)
      t.equal(result[1].subpods[0].value, '2')
      t.end()
    })
  })
})
