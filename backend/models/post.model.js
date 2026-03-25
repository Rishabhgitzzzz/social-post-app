const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const postSchema = new Schema({

    text: {
        type: String,
    },
    image: {
        type: String,
    },
    likes: [
        {
            type: ObjectId,
            ref: "user"
        }
    ],
    comments: [
        {
            user: {
                type: ObjectId,
                ref: "user"
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    owner: {
        type: ObjectId,
        ref: "user"
    }
},
    {
        timestamps: true
    }
)


const PostModel = mongoose.model("post", postSchema);

postSchema.pre("save", function (next) {
    if (!this.text && !this.image) {
        return next(new Error("Post must have text or image"));
    }
    next();
});

module.exports = { PostModel }