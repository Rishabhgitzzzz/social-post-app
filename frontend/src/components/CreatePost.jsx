import { useState } from "react";
import API from "../api/axios";

export default function CreatePost({ refresh }) {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const create = async () => {
        if (!text && !image) return alert("Add text or image");

        const formData = new FormData();
        formData.append("text", text);

        if (image) {
            formData.append("image", image);
        }

        await API.post("/post/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        setText("");
        setImage(null);
        refresh();
    };

    return (
        <div className="card">

            <div className="create-top">
                <h3>Create Post</h3>
            </div>

            <textarea
                placeholder="What's on your mind?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {/* FILE INPUT */}
            <div className="file-input">
                <label className="file-label">
                    Choose Image
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>

                {image && <span className="file-name">{image.name}</span>}
            </div>

            <div className="create-bottom">
                <button className="post-btn" onClick={create}>
                    Post
                </button>
            </div>

        </div>
    );
}