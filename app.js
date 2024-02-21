const http = require('http');

const PORT = 443;

const server = http.createServer((req, res) => {
    // console.log('Server request');
    // console.log(req.url, req.method);
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Hello world!</h1>');
    // res.write('<h2>Something</h2>');
    // res.write('<head></head>');
    // res.end();
    res.setHeader('Content-Type', 'application/json');
    const data = JSON.stringify([
        { name : "Anna", age: 35},
        { name : "Arthur", age: 40}
    ]
    );
    res.write(data);
    res.end();
});

server.listen(PORT, 'localhost', (error) =>{
    error ? console.log(error) : console.log(`listening port ${PORT}`);
})