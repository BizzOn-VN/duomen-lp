# duocmen-lp

Landing page tĩnh cho Dược Mền. Toàn bộ là HTML/CSS/JS thuần — **không cần build, không cần cài package**. Cứ upload nguyên file tĩnh lên hosting là chạy.

## Cấu trúc

```
duocmen-lp/
├── index.html      # Trang chính
├── css/            # Stylesheet
├── fonts/          # Font chữ
├── images/         # Hình ảnh
├── scripts/        # main.js
└── vendor/         # Thư viện bên thứ ba
```

## Thông tin đăng nhập hosting

Thông tin đăng nhập để deploy nằm trong file **`hossting.md`** (ở thư mục gốc của dự án).

> ⚠️ **Bảo mật:** File `hossting.md` đã được đưa vào `.gitignore` nên **KHÔNG bao giờ được commit lên Git**. Tuyệt đối không dán thông tin đăng nhập vào README hay bất kỳ file nào sẽ đẩy lên GitHub.

## Cách deploy

Đây là site tĩnh nên deploy = upload file lên hosting. Lấy thông tin đăng nhập trong `hossting.md`.

### Cách 1 — FileZilla (dễ, có giao diện)

1. Mở **FileZilla** → File → Site Manager → New site.
2. Điền thông tin server/tài khoản lấy từ `hossting.md`. Nên chọn **mã hóa TLS (FTPS explicit)** thay vì kết nối thường.
3. Connect → mở thư mục gốc của website trên server (thường là `public_html/` hoặc `/`).
4. Kéo thả **toàn bộ nội dung** thư mục `duocmen-lp` (trừ các file ở mục "Không upload" bên dưới) lên server, ghi đè file cũ.

### Cách 2 — lftp (dòng lệnh, nhanh cho lần deploy sau)

> Điền thông tin đăng nhập lấy từ `hossting.md`. Không lưu thông tin đăng nhập vào script rồi commit lên Git.

```bash
cd /Users/hungtruong/claude-cli/web-code/duocmen-lp

lftp <server> <<'EOF'
set ftp:ssl-force true
set ftp:ssl-protect-data true
mirror --reverse --delete --verbose \
  --exclude .git/ \
  --exclude hossting.md \
  --exclude hosting.md \
  --exclude .DS_Store \
  --exclude README.md \
  ./ /public_html/
bye
EOF
```

Giải thích cờ:
- `--reverse` = upload từ máy lên server.
- `--delete` = xóa trên server những file không còn ở local (giữ server khớp đúng với local). **Cẩn thận** nếu server có file khác đang chạy.
- `--exclude` = bỏ qua file nhạy cảm/không cần thiết.

> Nếu không chắc thư mục gốc trên server là `/public_html/` hay `/`, hãy dùng FileZilla xem trước một lần cho chắc.

## KHÔNG upload các file sau lên server

Các file này chỉ phục vụ việc lập trình / lưu thông tin, không thuộc website:

- `hossting.md`, `hosting.md` — thông tin đăng nhập
- `.git/` — lịch sử Git
- `.gitignore`
- `.DS_Store` — file rác của macOS
- `README.md` — file hướng dẫn này

## Quy trình chuẩn mỗi lần cập nhật

1. Sửa code ở local, mở `index.html` bằng trình duyệt kiểm tra kỹ.
2. Commit lên Git: `git add . && git commit -m "mô tả thay đổi" && git push`
3. Deploy lên hosting bằng một trong hai cách ở trên.
4. Mở domain thật kiểm tra lại trên production, nhớ **Ctrl/Cmd + Shift + R** để xóa cache.
