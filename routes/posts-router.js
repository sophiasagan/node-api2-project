const express = require("express")
const router = express.Router()
const db = require("../data/db.js")

router.get("/", (req, res) => {
    db.find(req.query)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: "The posts information could not be retrieved.",
            })
        })
})

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: "The post information could not be retrieved.",
            })
        })
})

router.get("/:id/comments", (req, res) => {
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist.",
        })
    } else {
        db.findCommentById(req.params.id)
            .then((comment) => {
                res.json(comment)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    error: "The comments information could not be retrieved.",
                })
            })
    }
})

router.post("/", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
        })
    }

    db.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: "There was an error while saving the post to the database",
            })
        })
})

router.post("/:id/comments", (req, res) => {
    if (!req.body) {
        res.status(400).json({
            errorMessage: "Please provide text for the comment.",
        })
    } else if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist.",
        })
    } else {
        db.insertComment(req.body)
            .then((comment) => {
                res.status(201).json(comment)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    error: "There was an error while saving the comment to the database",
                })
            })
    }
})

router.delete("/:id", (req, res) => {
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist.",
        })
    } else {
        db.remove(req.params.id)
            .then((posts) => {
                res.json(posts)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    error: "The post could not be removed",
                })
            })
    }
})

router.put("/:id", (req, res) => {
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist.",
        })
    } else if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
        })
    } else {
        db.update(req.params.id, req.body)
            .then((post) => {
                res.status(200).json(post)
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({
                    error: "The post information could not be modified.",
                })
            })
    }
})

module.exports = router