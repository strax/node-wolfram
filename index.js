var xml = require('o3-xml'),
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
      var doc = xml.parseFromString(body),
          rootNode = doc.documentElement
      
      if(rootNode.getAttribute('error') != 'false') {
        var message = rootNode.selectSingleNode('descendant-or-self::error/msg').nodeValue
        return cb(message, null)
      } else {
        var result = [],
            podNodes = rootNode.selectNodes('descendant-or-self::pod')
          
        for(var i = 0; i < podNodes.length; i++) {
          var podNode = podNodes[i],
              pod = { subpods: [] }
          
          pod.title = podNode.getAttribute('title')
          if(podNode.getAttribute('primary') == 'true')
            pod.primary = true
          
          var subpodNodes = podNode.selectNodes('descendant-or-self::subpod')
          for(var j = 0; j < subpodNodes.length; j++) {
            var subpodNode = subpodNodes[j]
              , subpod = {}
            
            subpod.title = subpodNode.getAttribute('title')
            subpod.value = subpodNode.selectSingleNode('descendant-or-self::plaintext').nodeValue
            subpod.image = subpodNode.selectSingleNode('descendant-or-self::img').getAttribute('src')
            
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
