const express = require("express")
// const users = require("./users/users-model")
const postsRouter = require("./routes/posts-router")
// const welcomeRouter = require("./welcome/welcome-router")

const server = express()
const port = 4040

server.get("/", (req, res) => {
    res.status(200).send("main route working");
})

// server.use(express.json())
// server.use("/users", usersRouter)
// server.use("/", welcomeRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})