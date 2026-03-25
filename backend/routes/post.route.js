const { Router } = require("express");
const { PostModel } = require("../models/post.model.js");
const { userAuth } = require("../middleware/auth.js");

const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const postRouter = Router();

// multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });


// CREATE POST 
postRouter.post("/create", userAuth, upload.single("image"), async (req, res) => {
    try {
        const { text } = req.body;
        let imageUrl = "";

        // upload image if exists
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "posts" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(req.file.buffer);
            });

            imageUrl = result.secure_url;
        }

        if (!text && !imageUrl) {
            return res.status(400).json({
                msg: "Post must contain text or image"
            });
        }

        const post = await PostModel.create({
            text,
            image: imageUrl,
            owner: req.userID
        });

        res.status(201).json({ post });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});


//  GET POSTS
postRouter.get("/", async (req, res) => {
    const posts = await PostModel.find()
        .populate("owner", "username")
        .populate("comments.user", "username")
        .sort({ createdAt: -1 });

    res.json(posts);
});


//  LIKE
postRouter.patch("/like/:id", userAuth, async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    const userId = req.userID;

    if (post.likes.includes(userId)) {
        post.likes.pull(userId);
    } else {
        post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes.length });
});


//  COMMENT
postRouter.post("/comment/:id", userAuth, async (req, res) => {
    const { text } = req.body;

    const post = await PostModel.findById(req.params.id);

    post.comments.push({
        user: req.userID,
        text
    });

    await post.save();

    res.json({ comments: post.comments });
});


// DELETE
postRouter.delete("/:id", userAuth, async (req, res) => {
    const post = await PostModel.findById(req.params.id);

    if (post.owner.toString() !== req.userID) {
        return res.status(403).json({ msg: "Unauthorized" });
    }

    await PostModel.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted" });
});

module.exports = { postRouter };