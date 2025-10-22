import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import type { Post } from "../types/Post";
import { savePostsToStorage, initializePosts } from "../utils/storage";
import "./PostList.css";

const CATEGORIES = [
	"Tất cả",
	"Công nghệ",
	"Khoa học",
	"Kỹ năng mềm",
	"Lối sống",
	"Sức khỏe",
	"Nghệ thuật",
	"Khác",
];

const PostList = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [filter, setFilter] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("Tất cả");
	const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

	useEffect(() => {
		const initializedPosts = initializePosts();
		setPosts(initializedPosts);
	}, []);

	const handleDelete = (id: string) => {
		const updatedPosts = posts.filter((post) => post.id !== id);
		setPosts(updatedPosts);
		savePostsToStorage(updatedPosts);
	};

	const filteredAndSortedPosts = posts
		.filter((post) =>
			post.title.toLowerCase().includes(filter.toLowerCase())
		)
		.filter((post) =>
			selectedCategory === "Tất cả"
				? true
				: post.category === selectedCategory
		)
		.sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
		});

	return (
		<div className="post-list-container">
			<div className="post-list-controls">
				<div className="search-wrapper">
					<input
						type="text"
						placeholder="Tìm kiếm bài viết..."
						className="search-input"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					/>
				</div>

				<div className="filter-controls">
					<div className="category-filter">
						<label>Danh mục:</label>
						<div className="category-buttons">
							{CATEGORIES.map((cat) => (
								<button
									key={cat}
									className={`category-btn ${
										selectedCategory === cat ? "active" : ""
									}`}
									onClick={() => setSelectedCategory(cat)}>
									{cat}
								</button>
							))}
						</div>
					</div>

					<div className="sort-controls">
						<label>Sắp xếp:</label>
						<select
							value={sortOrder}
							onChange={(e) =>
								setSortOrder(
									e.target.value as "newest" | "oldest"
								)
							}
							className="sort-select">
							<option value="newest">Mới nhất</option>
							<option value="oldest">Cũ nhất</option>
						</select>
					</div>
				</div>

				<Link to="/create" className="btn btn-create">
					Viết bài mới
				</Link>
			</div>

			<div className="results-info">
				<p className="post-count">
					Hiển thị {filteredAndSortedPosts.length} bài viết
					{selectedCategory !== "Tất cả" &&
						` trong danh mục "${selectedCategory}"`}
				</p>
			</div>

			{filteredAndSortedPosts.length === 0 ? (
				<div className="no-posts">
					<p>Không tìm thấy bài viết nào.</p>
					<Link to="/create" className="btn btn-primary">
						Viết bài đầu tiên
					</Link>
				</div>
			) : (
				<div className="post-grid">
					{filteredAndSortedPosts.map((post) => (
						<PostCard
							key={post.id}
							post={post}
							onDelete={handleDelete}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default PostList;
