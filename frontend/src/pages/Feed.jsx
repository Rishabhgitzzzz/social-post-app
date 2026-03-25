import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const res = await API.get("/post");
            setPosts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="app">
            <Navbar />

            <div className="main">

                <div className="search">
                    <input placeholder="Search promotions, users, posts..." />
                    <button>🔍</button>
                </div>


                <CreatePost refresh={fetchPosts} />

                <div className="filters">
                    <button className="active">All Post</button>
                    <button>For You</button>
                    <button>Most Liked</button>
                    <button>Most Commented</button>
                </div>


                {posts.map((p) => (
                    <PostCard key={p._id} post={p} refresh={fetchPosts} />
                ))}

            </div>
        </div>
    );
}