import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Post } from "../types/Post";
import { getPostsFromStorage, savePostsToStorage } from "../utils/storage";
import "./PostDetail.css";

const PostDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState<Post | null>(null);

	useEffect(() => {
		const posts = getPostsFromStorage();
		const foundPost = posts.find((p) => p.id === id);
		setPost(foundPost || null);
	}, [id]);

	const handleDelete = () => {
		if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
			const posts = getPostsFromStorage();
			const updatedPosts = posts.filter((p) => p.id !== id);
			savePostsToStorage(updatedPosts);
			navigate("/");
		}
	};

	if (!post) {
		return (
			<div className="post-detail-container">
				<div className="not-found">
					<h2>Không tìm thấy bài viết</h2>
					<Link to="/" className="btn btn-back">
						Quay lại trang chủ
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="post-detail-container">
			<div className="post-detail-card">
				<div className="post-detail-header">
					<span className="post-detail-category">
						{post.category}
					</span>
					<h1 className="post-detail-title">{post.title}</h1>
					<div className="post-detail-meta">
						<span className="post-detail-author">
							{post.author}
						</span>
						<span className="post-detail-date">
							{new Date(post.date).toLocaleDateString("vi-VN")}
						</span>
					</div>
				</div>

				{post.thumbnail && (
					<div className="post-detail-image">
						<img src={post.thumbnail} alt={post.title} />
					</div>
				)}

				<div className="post-detail-content">
					<p>{post.content}</p>
				</div>

				<div className="post-detail-actions">
					<Link to="/" className="btn btn-back">
						← Quay lại
					</Link>
					<div className="action-group">
						<Link
							to={`/posts/edit/${post.id}`}
							className="btn btn-edit">
							Chỉnh sửa
						</Link>
						<button
							onClick={handleDelete}
							className="btn btn-delete">
							Xóa bài viết
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;
