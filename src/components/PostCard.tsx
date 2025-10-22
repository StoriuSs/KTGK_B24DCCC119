import { Link } from "react-router-dom";
import type { Post } from "../types/Post";
import "./PostCard.css";

interface PostCardProps {
	post: Post;
	onDelete: (id: string) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
	const handleDelete = () => {
		if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
			onDelete(post.id);
		}
	};

	const shortDescription = post.content.substring(0, 120) + "...";
	const readingTime = Math.ceil(post.content.length / 1000);

	return (
		<article className="post-card">
			<Link to={`/posts/${post.id}`} className="post-card-link">
				<div className="post-card-image">
					<img src={post.thumbnail} alt={post.title} />
					<span className="post-category">{post.category}</span>
				</div>
				<div className="post-card-content">
					<h3 className="post-card-title">{post.title}</h3>
					<div className="post-meta">
						<span className="post-author">{post.author}</span>
						<span className="post-date">
							{new Date(post.date).toLocaleDateString("vi-VN")}
						</span>
						<span className="post-reading-time">
							{readingTime} phút đọc
						</span>
					</div>
					<p className="post-description">{shortDescription}</p>
				</div>
			</Link>
			<div className="post-card-actions">
				<Link to={`/posts/${post.id}`} className="btn btn-read">
					Đọc thêm
				</Link>
				<button onClick={handleDelete} className="btn btn-delete">
					Xóa
				</button>
			</div>
		</article>
	);
};

export default PostCard;
