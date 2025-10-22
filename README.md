# Bài tập giữa kì môn lập trình web của sinh viên Phạm Trung Hiếu, mã sinh viên B24DCCC119.

YÊU CẦU KỸ THUẬT:

✓ Sử dụng Typescript

✓ Thư viện: react-router-dom

BÀI TẬP: XÂY DỰNG WEBSITE QUẢN LÝ BÀI VIẾT (BLOG MANAGEMENT)

Xây dựng một website quản lý bài viết blog với React.js và React Router.

COMPONENT

Tạo ít nhất 5 components:

-   PostList: Trang chủ hiển thị danh sách

-   PostCard: Component hiển thị 1 bài viết (dùng trong PostList)

-   PostForm: Form tạo/sửa bài viết (dùng chung cho 2 trang)

-   PostDetail: Trang chi tiết bài viết

-   Navbar: Menu điều hướng (có logo, link trang chủ, button viết bài)

Dữ liệu khởi tạo: Tạo sẵn 5-6 bài viết mẫu với đầy đủ thông tin trong state ban đầu

ĐỊNH TUYẾN

• Cài đặt react-router-dom

• Cấu hình routes cho 4 trang: Trang chủ (/), Tạo bài (/create), Chi tiết (/posts/:id), Sửa (/posts/edit/:id)

• Navbar hiển thị trên tất cả các trang

• Sử dụng <Link> hoặc useNavigate() để điều hướng

• Active link: Highlight menu item của trang hiện tại (Sử dụng NavLink)

TRANG CHỦ - DANH SÁCH BÀI VIẾT

• Route: / hoặc /posts

• Hiển thị danh sách bài viết dạng card/grid (3 cột)

• Mỗi bài viết hiển thị: Ảnh thumbnail, Tiêu đề, Tác giả, Ngày đăng, Mô tả ngắn (100 ký tự đầu)

• Button "Viết bài mới" ở đầu trang để chuyển đến trang tạo bài

• Mỗi card có button "Đọc thêm" để xem chi tiết bài viết

• Mỗi card có button "Xóa" (icon hoặc text)

• Khi click "Xóa": hiển thị confirm dialog "Bạn có chắc muốn xóa bài viết này?"

• Filter theo tiêu đề bài viết

• Hiển thị tổng số bài viết ở đầu trang

TRANG TẠO BÀI VIẾT MỚI

Route: /posts/create hoặc /create

Form nhập thông tin bài viết gồm:

-   Tiêu đề (input text)

-   Tác giả (input text)

-   URL ảnh thumbnail (input text)

-   Nội dung bài viết (textarea - ít nhất 10 dòng)

-   Thể loại/Category (select: Công nghệ / Du lịch / Ẩm thực / Đời sống / Khác)

Validation:

-   Tiêu đề: Bắt buộc, ít nhất 10 ký tự

-   Tác giả: Bắt buộc, ít nhất 3 ký tự

-   Nội dung: Bắt buộc, ít nhất 50 ký tự

Button "Đăng bài" để lưu bài viết

Button "Hủy" để quay lại trang chủ

Sau khi tạo thành công: Hiển thị alert "Đăng bài thành công!" và chuyển về trang chủ

Tự động thêm: Ngày đăng = ngày hiện tại

TRANG CHI TIẾT BÀI VIẾT

• Route: /posts/:id

• Sử dụng useParams() để lấy ID bài viết từ URL

• Hiển thị đầy đủ thông tin bài viết

• Button "Quay lại" để về trang chủ

• Button "Chỉnh sửa" để chuyển đến trang edit

• Button "Xóa bài viết"

TRANG CHỈNH SỬA BÀI VIẾT

• Route: /posts/edit/:id

• Form giống trang tạo mới, nhưng đã điền sẵn dữ liệu hiện tại

• Sử dụng useParams() để lấy ID và tìm bài viết cần sửa

• Button "Cập nhật" để lưu thay đổi

• Button "Hủy" để quay lại trang chi tiết (không lưu)

• Sau khi cập nhật thành công: Hiển thị alert "Cập nhật thành công!" và chuyển về trang chi tiết
