var message: string = "Hello World!";
var switchers: string = "itzy run the world!";


//creating a heading in out html
let heading = document.createElement('h1');
let body = document.createElement('p');

body.innerHTML = switchers;
heading.textContent = message;

document.body.appendChild(heading)
document.body.appendChild(body)