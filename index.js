const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express();
const fs = require("fs");


app.use(express.json())


//browser rendering
app.get("/users", (req, res) => {
    const html = `<ul>
    ${users.map((user) => { return `<li>${user.first_name}</li>` }).join("")}
        </ul>`

    res.send(html)
})




//dynamic params 
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    res.json(users.find((user) => user.id === id))
})


app.post("/api/users", (req, res) => {
    let body = req.body;
    if(!body){
        res.send("error in api")
    }
    users.push({...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.send({ status: "added", id: users.length,body:body  })
    })




})



//api for json 
app.get("/api/users", (req, res) => {
    res.json(users)
})


app.listen(8000, () => {
    console.log("server run at 9000");
})