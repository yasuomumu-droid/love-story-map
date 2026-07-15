# Love Story Map

Bản đồ 3D tương tác kể câu chuyện của Tùng và Tũn, được phát triển lại từ portfolio của Bruno Simon.

## Cấu trúc

- `full-map-source`: mã nguồn bản đồ, xe, camera, vật lý và giao diện.
- `full-map-static`: nguồn duy nhất của model, collision, texture, slide, MP3 và Draco.
- `dist`: kết quả build tạm thời, được Git bỏ qua và có thể tạo lại bất cứ lúc nào.

Không lưu bản sao model trong `public`. Khi chạy local, Vite đọc trực tiếp từ `full-map-static`, vì vậy thay đổi model hoặc ảnh sẽ xuất hiện sau khi tải lại trang.

## Chạy local

```powershell
pnpm install
pnpm dev
```

Mở `http://localhost:5173/`.

## Build

```powershell
pnpm build
```

Giữ nguyên thông tin bản quyền trong `license.md` khi tiếp tục sử dụng tài nguyên của tác giả gốc.
