const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    console.log("Request url = ", req.url, " and method = ", req.method);
    res.setHeader("Content-Type", 'text/html');
    if (req.method != "GET") {
        res.statusCode = 404;
        res.end('<html><body><h1>' +
            'Error 404, Method ' + req.method + " not supported" +
            '</h1></body></html>');
        return;
    }
    var fileUrl;
    if (req.url == '/')
        fileUrl = '/index.html';
    else
        fileUrl = req.url;
    var filePath = path.resolve('./public' + fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt != '.html') {
        res.statusCode = 404;
        res.end('<html><body><h1>' +
            'Error 404, Extension ' + fileExt + " not supported" +
            '</h1></body></html>');
        return;
    }
    if (fs.exists(filePath, (exists) => {
        if (!exists) {
            res.statusCode = 404;
            res.end('<html><body><h1>' +
                'Error 404, file ' + filePath + " does not exist" +
                '</h1></body></html>');
            return;
        }
        else {
            res.statusCode = 200;
            fs.createReadStream(filePath).pipe(res);
        }
    }));


}
);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});