const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
global.__basedir = __dirname;
var corsOptions = {origin: "*"};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.json({ message: "Welcome to the Manage Account API."});
});
require("./app/routes/user.routes")(app);
require("./app/routes/dashboard.routes")(app);
// require("./app/routes/notify.routes")(app);
require("./app/routes/alcohol.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/HistoryUserId.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log('Server is running on port 4000');
    console.log('http://localhost:4000')
});