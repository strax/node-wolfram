var xml = require('libxmljs'),
    request = require('request')

var Client = exports.Client = function Client(appKey) {
  if(!appKey)
    console.warn("Warning: Wolfram|Alpha application key not set")
  else
    this.appKey = appKey
}

Client.prototype.query = function(input, cb) {
  if(!this.appKey) {
    return cb("Application key not set", null)
  }
  
  var uri = 'http://api.wolframalpha.com/v2/query?input=' + encodeURIComponent(input) + '&primary=true&appid=' + this.appKey
  
  request(uri, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var doc = xml.parseXml(body),
          rootNode = doc.root()
      
      if(rootNode.attr('error').value() != 'false') {
        var message = rootNode.get('descendant-or-self::error/msg').text()
        return cb(message, null)
      } else {
        var result = [],
            podNodes = rootNode.find('descendant-or-self::pod')
          
        for(var i = 0; i < podNodes.length; i++) {
          var podNode = podNodes[i],
              pod = { subpods: [] }
          
          pod.title = podNode.attr('title').value()
          if(podNode.attr('primary') && podNode.attr('primary').value() == 'true')
            pod.primary = true
          else
            pod.primary = false
          
          var subpodNodes = podNode.find('descendant-or-self::subpod')
          for(var j = 0; j < subpodNodes.length; j++) {
            var subpodNode = subpodNodes[j]
              , subpod = {}
            
            subpod.title = subpodNode.attr('title').value()
            subpod.value = subpodNode.get('descendant-or-self::plaintext').text()
            subpod.image = subpodNode.get('descendant-or-self::img').attr('src').value()
            
            pod.subpods.push(subpod)
          }
          
          result.push(pod)
        }
        
        return cb(null, result)
      }
    }
  })
}

exports.createClient = function(appKey) {
  return new Client(appKey)
}
