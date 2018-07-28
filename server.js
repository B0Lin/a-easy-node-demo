var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var path = request.url 
    var query = ''
    if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
    var pathNoQuery = parsedUrl.pathname
    var queryObject = parsedUrl.query
    var method = request.method

    //
    if( path == '/'){
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.write('<!DOCTYPE>' + 
            '<head>' +
            '<link rel="stylesheet" href="/style.css">' +
            '</head>' +
            '<body>' +
            '<p id="myp"> hello my dear teacher, this is my <a href = "https://github.com/B0Lin"> github address </a> </p>\n' +
            '<button onClick="changeBodyColor()"> 改变body的颜色</button>' +
            '<script src="/main.js">' + 
            '</script>' +
            '</body>'
        );
        response.end();
    }else if( path == '/style.css'){
        response.setHeader('Content-Type', 'text/css; charset=utf-8');
        response.write('body{background-color : black} p{color : red}');
        response.end();
    }else if( path == '/main.js'){
        response.setHeader('Content-Type', 'text/js; charset=utf-8');
        response.write( 
            'var changeBodyColor = () =>{document.body.style.background = "green";}'
        );
        response.end();
    }else{
        response.statusCode = 404;
        response.end();
    }
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

