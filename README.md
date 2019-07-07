
# express-routes-catalogue

A simple utility that lists out all registered routes in your express application.
  

## Installation

```bash
 npm install -D express-routes-catalogue 
 ```

  

## Example
- [Terminal Output](#1-terminal-output)
- [Web Output](#2-web-output )

  

## 1. Terminal Output

  ![enter image description here](https://github.com/vijay4495/express-routes-catalogue/blob/master/terminal-route-list.png?raw=true)

``` js

const express = require("express");

const routeList = require("express-route-catelogue");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World ...");
});

// For terminal output
if (process.env.NODE_ENV === "development") {
  routeList.terminal(app);
}

...
```

  

## 2. Web output
![enter image description here](https://github.com/vijay4495/express-routes-catalogue/blob/master/web-route-list.png?raw=true)
``` js

const express = require("express");
const routeList = require("express-route-catelogue");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World ...");
});

// For web output
if (process.env.NODE_ENV === "development") {
  routeList.web(
    app,
    "/route-list"
  );
}

...
```
Now navigation to your-application/route-list, you can see full routes list.


## Contribution

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉


## LICENSE
MIT © [Vijay](https://github.com/vijay4495)
