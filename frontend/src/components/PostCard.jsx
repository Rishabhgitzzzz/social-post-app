import { useState } from "react";
import API from "../api/axios";

export default function PostCard({ post, refresh }) {
    const [comment, setComment] = useState("");

    const like = async () => {
        await API.patch(`/post/like/${post._id}`);
        refresh();
    };

    const addComment = async () => {
        if (!comment) return;

        await API.post(`/post/comment/${post._id}`, {
            text: comment
        });

        setComment("");
        refresh();
    };

    const deletePost = async () => {
        try {
            await API.delete(`/post/${post._id}`);
            refresh();
        } catch (err) {
            console.error(err);
        }
    };

    const currentUserId = localStorage.getItem("userId");
    const isOwner = post.owner?._id?.toString() === currentUserId; // ✅ fixed comparison

    return (
        <div className="card">

            {/* HEADER */}
            <div className="post-header">
                <div className="user">
                    <img src="https://i.pravatar.cc/40" alt="avatar" />
                    <div>
                        <h4>{post.owner?.username}</h4>
                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button className="follow">Follow</button>
                    {isOwner && (
                        <button className="delete-btn" onClick={deletePost}>
                            Delete
                        </button>
                    )}
                </div>
            </div>


            {post.text && <p className="content">{post.text}</p>}

            {/* IMAGE */}
            {post.image && (
                <img
                    src={post.image}
                    alt="post"
                    className="post-image"
                />
            )}


            <div className="post-actions">
                <button onClick={like}>❤️ {post.likes.length}</button>
                <button>💬 {post.comments.length}</button>
            </div>


            <div className="comments">
                {post.comments.map((c, i) => (
                    <p key={i}>
                        <b>{c.user?.username}</b>: {c.text}
                    </p>
                ))}
            </div>


            <div className="comment-box">
                <input
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={addComment}>Send</button>
            </div>

        </div>
    );
}