var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var fileName;

function templateFile(path, response) {
    fs.readFile(path, function(err, html){
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
};

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsluge zadania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log(files);
        fs.renameSync(files.upload.path, files.upload.name, {
            overwrite: true
        });
        
        templateFile("./templates/test.html", response);
        fileName = files.upload.name;
    });
};

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsluge zadania welcome.");
      templateFile("./templates/start.html", response);
};

exports.show = function(request, response){
    fs.readFile(fileName, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
};

exports.error = function(request, response) {
    console.log("Nie wiem co robic.");
    response.write("404 :(");
    response.end();
};

exports.colorCss = function(request, response) {
    fs.readFile("css/style.css", function(error, file) {
        response.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
        response.write(file);
        response.end();
    });
};