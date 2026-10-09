# Odylytics — Design Guidelines (v2, dark-first)

Tham chiếu visual duy nhất: [React Bits Pro — Finance template (Finaro)](https://rbp-finance-template.vercel.app/).
Lấy layout, nhịp điệu, component và motion của template; màu luôn theo brand Odylytics bên dưới.

Tagline: **"Engineering Safer Communities."**

---

## 1. Định hướng

Phong cách **premium fintech, dark-first**: nền tối gần đen, heading serif lớn (vế nhấn in nghiêng), nút và badge dạng pill bo tròn hoàn toàn, card bo góc lớn với viền mảnh, hiệu ứng aurora gradient mờ ở hero và CTA cuối. Sang trọng, tối giản, không góc cạnh.

Khác biệt chính so với v1 (NUSX-style): không còn góc vuông, không còn label mono in hoa giãn chữ làm chủ đạo, không còn đường kẻ 1px chia khối. Thay bằng bo tròn, surface tối nhiều lớp và khoảng trắng.

## 2. Color system

Giữ nguyên palette brand (`OdylyticsBrand/Color Palette Shades.png`): tím `#AE0BFF` (65% phần màu brand) và cam `#FF8C00` (35%), cùng các shade `--purple-100…700`, `--orange-100…700`, neutral `--neutral-100…700` như v1.

Semantic cho dark mode (mặc định):

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--bg` | `#0B0A0E` (derived, tối hơn neutral-700) | Nền trang |
| `--surface` | `#141318` | Card, panel |
| `--surface-2` | `#1C1B21` | Card lồng trong card, input |
| `--border` | `rgb(255 255 255 / 0.08)` | Viền card, divider |
| `--text` | `#FAFAFA` | Chữ chính |
| `--text-muted` | `--neutral-300` `#97949B` | Chữ phụ |
| `--accent` | `--purple-400` | CTA, link, focus, icon |
| `--accent-soft` | `--purple-300` | Chữ tím cỡ nhỏ trên nền tối (AA) |
| `--signal` | `--orange-300` | Số liệu, badge nhấn, từ khóa hero (AA trên nền tối) |

- Aurora gradient (hero, CTA): các đốm radial mờ từ `--purple-600`, `--purple-500`, `--orange-600`, blur ≥ 80px, opacity ≤ 0.55. Không dùng gradient brand làm nền phẳng.
- Light mode (sau này): override semantic dưới `[data-theme="light"]`; cấm chữ cam `#FF8C00` trên nền sáng — dùng `--orange-500`.

## 3. Typography

| Vai trò | Font | Ghi chú |
|---|---|---|
| Display / heading | **Instrument Serif** 400 (roman + italic) | Headline lớn; vế nhấn hoặc dòng thứ hai in *nghiêng* |
| Body / UI / nút / label | **Inter** 400–600 | Toàn bộ phần còn lại |

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');
```

Scale (desktop): Display `clamp(44px, 5.5vw, 76px)/1.05`, H2 `clamp(34px, 4vw, 56px)/1.1`, H3 20–22px Inter 600, body 16px/1.6, body-l 18–20px, label 13–14px Inter 500 (không bắt buộc uppercase; sentence case như Finaro).

Headline hai tông kiểu Finaro: cả câu serif màu trắng, **vế nhấn in nghiêng** (không đổi màu), hoặc từ khóa màu `--signal`.

## 4. Shape & component

- Radius: nút/badge/input = pill (`999px`); card = `20px`; card nhỏ/chip = `14px`.
- **Button**: pill, padding `12px 24px`, Inter 600 15px, sentence case, không bắt buộc mũi tên. Variants: `primary` (nền `--accent`, chữ trắng, hover `--purple-500`), `inverse` (nền trắng, chữ đen — dùng trên aurora/CTA), `outline` (viền `--border`, nền `--surface` mờ), `signal` (nền cam, chữ đen).
- **Badge pill**: viền mảnh, nền surface, chấm hoặc icon nhỏ + text 13px (thay cho eyebrow vuông v1).
- **Card**: nền `--surface`, viền 1px `--border`, radius 20px, padding 24–32px; hover nâng nhẹ nền (không shadow màu).
- **Bento**: lưới 3 cột card cao bằng nhau, mỗi card có khối visual minh hoạ ở trên (bảng so sánh / bar chart / code block giả) + H3 + mô tả + link "Learn more →".
- **Stats row**: 4 số lớn (Inter 600 hoặc serif) + label muted, ngăn cách bằng khoảng trắng, không kẻ.
- **Logo marquee**: dải logo chạy ngang, pause khi hover; logo đặt trong chip trắng bo tròn (logo gốc nền sáng).
- **Testimonials**: carousel scroll-snap, card ảnh lớn bo 20px, prev/next dạng nút pill tròn.
- **FAQ/Accordion**: card bo tròn, mở rộng mượt.
- Shadow: chỉ dùng shadow đen mờ rất nhẹ cho dropdown/modal. Không glow màu.

## 5. Logo

| File | Dùng khi |
|---|---|
| `public/assets/brand/odylytics-wordmark-dark.svg` (từ `OdylyticsBrand/Horizontal Wordmark Logo Darkmode.svg`, đã crop) | **Mặc định** — nav, footer trên nền tối |
| `public/assets/brand/odylytics-wordmark.svg` | Nền sáng (chip trắng, light mode sau này) |
| `public/assets/brand/odylytics-symbol-dark.svg` / `odylytics-symbol.svg` | Symbol trắng / đen; favicon dùng bản gốc `favicon.svg` |

Không đổi màu gradient trong logo, không thêm hiệu ứng.

## 6. Motion

- Reveal khi vào viewport: fade + translateY 16px, 600ms ease-out, stagger 70ms.
- Aurora: trôi rất chậm (60s+), tắt hoàn toàn khi `prefers-reduced-motion`.
- Marquee 40s/vòng, pause hover, tắt khi reduced motion (thay bằng grid tĩnh).
- Hover card: background sáng lên 200ms; hover nút: đổi nền 200ms.
- Không bounce/elastic/parallax mạnh.

## 7. Giọng nói & copy

Giữ nguyên: Clear · Trustworthy · Calm · Human. Headline sentence case; nhãn/nút sentence case (bỏ quy tắc UPPERCASE của v1).

## 8. Checklist section mới

- [ ] Nền `--bg`, nội dung trong container 1200–1280px
- [ ] Card dùng `--surface` + `--border`, radius 20px
- [ ] Heading serif, vế nhấn italic; body Inter
- [ ] Màu brand ≤ ~15% diện tích, tím:cam ≈ 65:35; chữ cam chỉ trên nền tối
- [ ] Nút pill, contrast AA (trắng trên tím ~4.9:1 ✅, đen trên cam ~8:1 ✅)
- [ ] Motion tôn trọng `prefers-reduced-motion`
