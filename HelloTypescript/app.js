var message = "Hello World!";
var switchers = "itzy run the world!";
//creating a heading in out html
var heading = document.createElement('h1');
var body = document.createElement('p');
body.innerHTML = switchers;
heading.textContent = message;
document.body.appendChild(body);
document.body.appendChild(heading);
