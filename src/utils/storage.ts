import type { Post } from "../types/Post";

const STORAGE_KEY = "blog_posts";

export const getPostsFromStorage = (): Post[] => {
	const data = localStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : [];
};

export const savePostsToStorage = (posts: Post[]): void => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const initializePosts = (): Post[] => {
	const existingPosts = getPostsFromStorage();
	if (existingPosts.length > 0) {
		return existingPosts;
	}

	const initialPosts: Post[] = [
		{
			id: "201",
			title: "Kỹ năng Tư duy Phản biện: Chìa khóa để ra quyết định sáng suốt",
			author: "Nguyễn Minh Đức",
			thumbnail:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBxnnCRxa28MOdv6gNBvimNM4r44V6UUGzMw&s",
			content:
				"Tư duy phản biện (Critical Thinking) là một kỹ năng thiết yếu trong mọi lĩnh vực. Bài viết này sẽ phân tích các bước để phát triển tư duy phản biện, từ việc đặt câu hỏi đúng, phân tích thông tin đa chiều, đến việc nhận diện các ngụy biện phổ biến. Việc rèn luyện kỹ năng này giúp bạn không chỉ thành công trong công việc mà còn đưa ra những quyết định đúng đắn hơn trong cuộc sống cá nhân.",
			category: "Kỹ năng mềm",
			date: "2025-10-22",
		},
		{
			id: "202",
			title: "Bí mật của Vũ trụ: Khám phá Hố đen và Lý thuyết Tương đối",
			author: "Trần Quang Bảo",
			thumbnail:
				"https://cdn.mos.cms.futurecdn.net/s7ciDuGDKyYCHhMgG3guXY.jpg",
			content:
				"Hố đen (Black Hole) luôn là một trong những bí ẩn lớn nhất của vũ trụ, nơi mà các định luật vật lý dường như bị bẻ cong. Bài viết sẽ giải thích một cách đơn giản về cách hố đen hình thành, vai trò của Lý thuyết Tương đối rộng của Einstein, và những phát hiện chấn động gần đây từ kính thiên văn Event Horizon Telescope. Cùng bước vào thế giới vật lý thiên văn đầy mê hoặc!",
			category: "Khoa học",
			date: "2025-10-21",
		},
		{
			id: "203",
			title: "Chủ nghĩa Tối giản (Minimalism) và Lối sống Ý thức",
			author: "Hồ Phương Mai",
			thumbnail:
				"https://d1j8r0kxyu9tj8.cloudfront.net/images/1564132119LiKPrFF60ZfyDWH.jpg",
			content:
				"Minimalism không chỉ là việc vứt bớt đồ đạc, mà là một triết lý sống. Bài viết này hướng dẫn bạn cách áp dụng chủ nghĩa tối giản vào các khía cạnh khác nhau: từ không gian sống, tủ quần áo, đến quản lý thời gian và tài chính. Mục tiêu là giảm bớt những thứ không cần thiết để tập trung vào những giá trị thực sự quan trọng, từ đó đạt được sự bình yên và tự do trong tâm hồn.",
			category: "Lối sống",
			date: "2025-10-20",
		},
		{
			id: "204",
			title: "NFT và Metaverse: Tương lai của Nghệ thuật và Bất động sản ảo",
			author: "Phạm Trung Hiếu",
			thumbnail:
				"https://101blockchains.com/wp-content/uploads/2022/06/NFT-vs-Metaverse.png",
			content:
				"NFT (Non-Fungible Token) và Metaverse là hai khái niệm đang định hình lại không gian kỹ thuật số. Bài viết này sẽ giải thích cơ chế hoạt động của NFT, cách nó mang lại quyền sở hữu độc nhất cho các tài sản số, và vai trò của Metaverse như một vũ trụ ảo nơi con người có thể làm việc, giải trí và giao dịch. Cùng tìm hiểu về cơ hội và rủi ro đầu tư trong thế giới ảo đang phát triển này.",
			category: "Công nghệ",
			date: "2025-10-17",
		},
		{
			id: "205",
			title: "Chăm sóc Sức khỏe Tâm thần: Phương pháp thực hành Chánh niệm (Mindfulness)",
			author: "Lê Hoàng Nam",
			thumbnail:
				"https://www.mindful.org/content/uploads/Minsdulness2.jpg",
			content:
				"Trong cuộc sống hiện đại đầy áp lực, sức khỏe tâm thần là ưu tiên hàng đầu. Chánh niệm (Mindfulness) là một phương pháp đơn giản nhưng mạnh mẽ giúp giảm căng thẳng và tăng cường sự tập trung. Bài viết này hướng dẫn các bài tập chánh niệm cơ bản mà bạn có thể thực hành hàng ngày, từ thiền định ngắn, hít thở ý thức, đến việc ăn uống chánh niệm, để mang lại sự cân bằng và bình an nội tại.",
			category: "Sức khỏe",
			date: "2025-10-16",
		},
		{
			id: "206",
			title: "Nghệ thuật Nhiếp ảnh đường phố (Street Photography) cơ bản",
			author: "Nguyễn Văn An",
			thumbnail:
				"https://www.langly.co/cdn/shop/articles/MG_1388_1_2048x2048.jpg?v=1628554838",
			content:
				"Nhiếp ảnh đường phố là một thể loại thú vị, nắm bắt khoảnh khắc chân thực của cuộc sống hàng ngày. Bài viết này dành cho những người mới bắt đầu, chia sẻ các kỹ thuật chụp ảnh như 'kết cấu' bức ảnh, nắm bắt 'khoảnh khắc quyết định', và các mẹo về thiết bị. Khám phá cách kể chuyện qua ống kính và biến những cảnh vật bình thường trên phố thành tác phẩm nghệ thuật.",
			category: "Nghệ thuật",
			date: "2025-10-15",
		},
	];

	savePostsToStorage(initialPosts);
	return initialPosts;
};
