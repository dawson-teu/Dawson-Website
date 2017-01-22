const http = require('http');
const pug = require('pug');
const fs = require('fs');
const server = http.createServer((request, response) => {
    fs.unlink(`${__dirname}/Public/Complied Code/HTML/index.html`, () => {
        let htmlOutputFile = fs.open(`${__dirname}/Public/Complied Code/HTML/index.html`, 'w+', (error, fd) => {
            fs.writeFile('Public/Complied Code/HTML/index.html', pug.renderFile('Public/Preprocessor Code/Pug/index.pug'), null, 'utf-8', (error, written, string) => {
                let fileType = request.headers.accept.split(',')[0];
                response.setHeader('Content-Type', fileType);
                response.writeHead(200);
                if (fileType === "text/html") {
                    fs.readFile('Public/Complied Code/HTML/index.html', 'utf-8', (error, data) => {
                        response.end(data);
                    })
                } else if (fileType === "text/css") {
                    fs.readFile('Public/Complied Code/CSS/style.css', 'utf-8', (error, data) => {
                        response.end(data);
                    })
                }
            })
        })
    })
});

server.listen(8000, 'localhost');
