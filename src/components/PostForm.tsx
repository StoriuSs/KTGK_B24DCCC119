import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../types/Post";
import { getPostsFromStorage, savePostsToStorage } from "../utils/storage";
import "./PostForm.css";

interface PostFormProps {
	isEdit?: boolean;
}

const PostForm = ({ isEdit = false }: PostFormProps) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [formData, setFormData] = useState({
		title: "",
		author: "",
		thumbnail: "",
		content: "",
		category: "Công nghệ",
	});

	const [errors, setErrors] = useState({
		title: "",
		author: "",
		content: "",
	});

	const [imageMode, setImageMode] = useState<"url" | "upload">("url");
	const [imagePreview, setImagePreview] = useState<string>("");

	useEffect(() => {
		if (isEdit && id) {
			const posts = getPostsFromStorage();
			const post = posts.find((p) => p.id === id);
			if (post) {
				setFormData({
					title: post.title,
					author: post.author,
					thumbnail: post.thumbnail,
					content: post.content,
					category: post.category,
				});
				setImagePreview(post.thumbnail);
			}
		}
	}, [isEdit, id]);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result as string;
				setFormData({ ...formData, thumbnail: result });
				setImagePreview(result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const url = e.target.value;
		setFormData({ ...formData, thumbnail: url });
		setImagePreview(url);
	};

	const validate = () => {
		const newErrors = {
			title: "",
			author: "",
			content: "",
		};

		if (formData.title.length < 10) {
			newErrors.title = "Tiêu đề phải có ít nhất 10 ký tự";
		}

		if (formData.author.length < 3) {
			newErrors.author = "Tác giả phải có ít nhất 3 ký tự";
		}

		if (formData.content.length < 50) {
			newErrors.content = "Nội dung phải có ít nhất 50 ký tự";
		}

		setErrors(newErrors);
		return !newErrors.title && !newErrors.author && !newErrors.content;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		const posts = getPostsFromStorage();

		if (isEdit && id) {
			const updatedPosts = posts.map((post) =>
				post.id === id ? { ...post, ...formData } : post
			);
			savePostsToStorage(updatedPosts);
			alert("Cập nhật thành công!");
			navigate(`/posts/${id}`);
		} else {
			const newPost: Post = {
				id: Date.now().toString(),
				...formData,
				date: new Date().toISOString(),
			};
			savePostsToStorage([newPost, ...posts]);
			alert("Đăng bài thành công!");
			navigate("/");
		}
	};

	const handleCancel = () => {
		if (isEdit && id) {
			navigate(`/posts/${id}`);
		} else {
			navigate("/");
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="post-form-container">
			<div className="post-form-card">
				<h1>{isEdit ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</h1>

				<form onSubmit={handleSubmit} className="post-form">
					<div className="form-group">
						<label htmlFor="title">Tiêu đề *</label>
						<input
							type="text"
							id="title"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className={errors.title ? "error" : ""}
							placeholder="Nhập tiêu đề bài viết..."
						/>
						{errors.title && (
							<span className="error-message">
								{errors.title}
							</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="author">Tác giả *</label>
						<input
							type="text"
							id="author"
							name="author"
							value={formData.author}
							onChange={handleChange}
							className={errors.author ? "error" : ""}
							placeholder="Nhập tên tác giả..."
						/>
						{errors.author && (
							<span className="error-message">
								{errors.author}
							</span>
						)}
					</div>

					<div className="form-group">
						<label>Ảnh thumbnail</label>
						<div className="image-mode-toggle">
							<button
								type="button"
								className={`mode-btn ${
									imageMode === "url" ? "active" : ""
								}`}
								onClick={() => setImageMode("url")}>
								Dùng URL
							</button>
							<button
								type="button"
								className={`mode-btn ${
									imageMode === "upload" ? "active" : ""
								}`}
								onClick={() => setImageMode("upload")}>
								Upload ảnh
							</button>
						</div>

						{imageMode === "url" ? (
							<input
								type="text"
								name="thumbnail"
								value={formData.thumbnail}
								onChange={handleUrlChange}
								placeholder="https://example.com/image.jpg"
								className="image-input"
							/>
						) : (
							<div className="file-upload-wrapper">
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handleImageUpload}
									className="file-input"
									id="file-upload"
								/>
								<label
									htmlFor="file-upload"
									className="file-label">
									<span>Chọn ảnh từ máy</span>
								</label>
							</div>
						)}

						{imagePreview && (
							<div className="image-preview">
								<img src={imagePreview} alt="Preview" />
							</div>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="category">Thể loại *</label>
						<select
							id="category"
							name="category"
							value={formData.category}
							onChange={handleChange}>
							<option value="Công nghệ">Công nghệ</option>
							<option value="Khoa học">Khoa học</option>
							<option value="Kỹ năng mềm">Kỹ năng mềm</option>
							<option value="Lối sống">Lối sống</option>
							<option value="Sức khỏe">Sức khỏe</option>
							<option value="Nghệ thuật">Nghệ thuật</option>
							<option value="Khác">Khác</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="content">Nội dung bài viết *</label>
						<textarea
							id="content"
							name="content"
							value={formData.content}
							onChange={handleChange}
							rows={12}
							className={errors.content ? "error" : ""}
							placeholder="Viết nội dung bài viết của bạn..."
						/>
						{errors.content && (
							<span className="error-message">
								{errors.content}
							</span>
						)}
					</div>

					<div className="form-actions">
						<button type="submit" className="btn btn-submit">
							{isEdit ? "Cập nhật" : "Đăng bài"}
						</button>
						<button
							type="button"
							onClick={handleCancel}
							className="btn btn-cancel">
							Hủy
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostForm;
