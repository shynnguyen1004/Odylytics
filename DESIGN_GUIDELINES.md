# Odylytics — Brand & Design Guidelines

Nguồn tài nguyên: thư mục `OdylyticsBrand/` (palette, logo, favicon). Mọi quyết định UI của landing page phải tuân theo file này.

Tagline: **"Engineering Safer Communities."** / "Technology that protects."

---

## 1. Định hướng style

Phong cách **editorial deep-tech, dark-first**: typography lớn và đặc, khoảng trắng rộng, đường kẻ 1px làm cấu trúc, màu thương hiệu dùng tiết chế để làm điểm nhấn.

| Tham chiếu | Vai trò | Lấy gì |
|---|---|---|
| [NUSX](https://nusx.edu.sg/) | **Chính (~80%)** | Hero bất đối xứng với từ khóa xoay, particle globe, nhịp section tối ↔ sáng, nhãn section in hoa, nút góc vuông có mũi tên, danh sách đánh số, thẻ số liệu xếp chồng khi cuộn, wordmark khổng lồ ở footer |
| [8-bit template (Pixelpush)](https://rbp-8-bit-template.vercel.app/) | **Phụ (~20%)** | Khung kẻ 1px bao quanh section, dải hatch (sọc chéo) ngăn section, lưới tính năng dạng ô kẻ, accordion có thanh accent dọc, icon pixel đơn sắc |

- **Chỉ lấy layout, nhịp điệu và motion** từ tham chiếu. Màu, font, logo luôn theo brand Odylytics bên dưới. Không dùng lime của NUSX hay cam `#FB923C` của Pixelpush.
- Chi tiết 8-bit chỉ dùng **điểm xuyết** (divider, icon, tối đa 1 hiệu ứng pixel trang trí). Voice của brand là *calm, trustworthy*, nên tránh để trang thành "game".

---

## 2. Color system

Nguồn: `OdylyticsBrand/Color Palette Shades.png`.

### 2.1 Màu chủ đạo

| Tên | Hex | Tỷ lệ trong phần màu thương hiệu |
|---|---|---|
| **Odylytics Purple** | `#AE0BFF` | **65%** |
| **Signal Orange** | `#FF8C00` | **35%** |

**Phân bổ diện tích toàn trang:**

- **~85% neutral**: nền đen/trắng, chữ, đường kẻ.
- **~15% màu thương hiệu**, chia **65% tím / 35% cam**.

Màu thương hiệu không bao giờ làm nền cho cả một section dài. Ngoại lệ duy nhất là thẻ/khối nhấn nhỏ hoặc CTA banner.

### 2.2 Shade scale

Purple (base = `400`):

| Token | Hex |
|---|---|
| `--purple-100` | `#ECDEFF` |
| `--purple-200` | `#D4ABFF` |
| `--purple-300` | `#BF72FF` |
| `--purple-400` | `#AE0BFF` ← base |
| `--purple-500` | `#7B00B7` |
| `--purple-600` | `#4C0072` |
| `--purple-700` | `#200034` |

Orange (base = `300`):

| Token | Hex |
|---|---|
| `--orange-100` | `#FFEDE6` |
| `--orange-200` | `#FFC4A8` |
| `--orange-300` | `#FF8C00` ← base |
| `--orange-400` | `#C86D00` |
| `--orange-500` | `#944F00` |
| `--orange-600` | `#633300` |
| `--orange-700` | `#361900` |

Neutral (hơi ngả tím, đồng bộ với brand):

| Token | Hex | Dùng cho |
|---|---|---|
| `--white` | `#FFFFFF` | Nền sáng chính, chữ trên nền tối |
| `--neutral-100` | `#E4E3E5` | Nền section sáng phụ (kiểu "Mission" của NUSX), divider trên nền sáng |
| `--neutral-200` | `#BDBBBF` | Border trên nền sáng |
| `--neutral-300` | `#97949B` | Chữ phụ / phần xám của headline 2 tông (nền sáng) |
| `--neutral-400` | `#736F78` | Chữ phụ trên nền tối, metadata |
| `--neutral-500` | `#504D53` | Border/hatch trên nền tối |
| `--neutral-600` | `#2F2D31` | Surface nổi trên nền tối (card, panel) |
| `--neutral-700` | `#111013` | **Nền tối chính**, chữ chính trên nền sáng |

### 2.3 Vai trò màu

**Tím (65%)** là màu cấu trúc và tương tác:

- CTA chính, link, trạng thái active/focus/hover.
- Marker ô vuông của nhãn section.
- Particle chủ đạo của globe ở hero.
- Thanh accent dọc của accordion, chỉ số `01`/`02` của danh sách.

**Cam (35%)** là màu tín hiệu, gắn với an toàn và cảnh báo:

- **Từ khóa xoay ở hero** (vai trò giống chữ lime của NUSX).
- Số liệu lớn, badge "Live"/SOS, cảnh báo.
- Particle điểm xuyết trên globe (~10–15% số hạt).

**Gradient brand** `linear-gradient(135deg, #AE0BFF 0%, #FF8C00 100%)` lấy từ logo. Chỉ dùng cho logo, một chi tiết duy nhất mỗi viewport (ví dụ chữ X/O trong wordmark footer, đường viền thẻ nổi bật), hoặc progress indicator. Không dùng gradient cho nền section hay cho đoạn văn bản.

### 2.4 Contrast (WCAG AA)

| Cặp màu | Tỷ lệ | Dùng được cho |
|---|---|---|
| `#FFFFFF` trên `#AE0BFF` | ~4.9:1 | Chữ nút CTA tím ✅ |
| `#AE0BFF` trên `#FFFFFF` | ~4.9:1 | Link/chữ tím trên nền sáng ✅ |
| `#AE0BFF` trên `#111013` | ~3.9:1 | **Chỉ chữ lớn** (≥ 24px hoặc ≥ 19px bold) |
| `#BF72FF` (`purple-300`) trên `#111013` | ~6.4:1 | Chữ tím cỡ nhỏ trên nền tối ✅ |
| `#FF8C00` trên `#111013` | ~8.1:1 | Chữ cam mọi cỡ trên nền tối ✅ |
| `#111013` trên `#FF8C00` | ~8.1:1 | Chữ nút/badge cam ✅ (chữ **đen**, không dùng chữ trắng) |
| `#FF8C00` trên `#FFFFFF` | ~2.3:1 | ❌ Không dùng cho chữ. Thay bằng `#944F00` (~6.2:1) |

---

## 3. Typography

| Vai trò | Font | Ghi chú |
|---|---|---|
| **Primary**: display, heading, nhãn, nút, nav, số liệu, UI text ngắn | **Exo 2** | Weights: Regular 400, Medium 500, SemiBold 600, Bold 700 |
| **Long body text + fallback** | **Google Sans Flex** Medium (500) | Đoạn văn dài, mô tả, FAQ, footer text |

```css
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700&family=Google+Sans+Flex:wght@400;500;600&display=swap');

--font-primary: 'Exo 2', 'Google Sans Flex', system-ui, sans-serif;
--font-body: 'Google Sans Flex', system-ui, sans-serif;
```

### 3.1 Type scale (desktop)

| Token | Font | Weight | Size / Line-height | Letter-spacing |
|---|---|---|---|---|
| Display (hero) | Exo 2 | SemiBold 600 | `clamp(56px, 7vw, 120px)` / 0.92 | −0.035em |
| H1 | Exo 2 | SemiBold 600 | 64px / 1.0 | −0.03em |
| H2 (statement 2 tông) | Exo 2 | Medium 500 | 44px / 1.1 | −0.025em |
| H3 | Exo 2 | SemiBold 600 | 28px / 1.2 | −0.015em |
| Stat number | Exo 2 | Medium 500 | `clamp(96px, 14vw, 240px)` / 0.9 | −0.04em |
| Body L | Google Sans Flex | Medium 500 | 20px / 1.5 | 0 |
| Body | Google Sans Flex | Medium 500 | 16px / 1.6 | 0 |
| Label / Eyebrow | Exo 2 | SemiBold 600, **UPPERCASE** | 13px / 1.2 | +0.12em |
| Button | Exo 2 | SemiBold 600, **UPPERCASE** | 15px / 1 | +0.08em |

### 3.2 Quy tắc

- Heading dùng letter-spacing âm và line-height chặt để có độ "đặc" như NUSX. Exo 2 Bold 700 chỉ dùng cho wordmark/stat cực lớn. Heading thường dùng SemiBold/Medium để giảm chất sci-fi của Exo 2.
- **Nhãn in hoa giãn chữ** (label, button, nav, footer metadata) thay cho font mono của NUSX. Đây là chi tiết tạo chất "tech" chủ đạo.
- **Headline 2 tông**: mệnh đề dẫn màu `neutral-300` (nền sáng) hoặc `neutral-400` (nền tối), mệnh đề chính màu chữ chính. Ví dụ: <span style="color:#97949B">Safety does not happen by accident.</span> **Odylytics engineers it into every community.**
- Đoạn văn tối đa ~64 ký tự/dòng.

---

## 4. Logo

| File | Vai trò |
|---|---|
| `OdylyticsBrand/Horizontal Wordmark Logo Lightmode.svg` | **Logo chính**: nav, footer, tài liệu |
| `OdylyticsBrand/favicon.svg` | **Favicon + logo phụ (symbol)**: favicon, avatar mạng xã hội, watermark, loader, bullet trang trí |

Cả hai logo dùng **đen + một nét gradient tím → cam** (`#AE0BFF` → `#FF8C00`).

### 4.1 Quy tắc sử dụng

- **Trước khi dùng trên web**, xoá `<rect>` nền trắng và viền đen bao ngoài trong file wordmark để logo trong suốt, rồi đặt bản đã xử lý vào `public/assets/brand/`.
- **Nền sáng**: dùng nguyên bản (đen + gradient).
- **Nền tối** (hero, nav tối, footer): dùng bản **negative**. Đổi các fill `black` thành `#FFFFFF`, **giữ nguyên gradient**. Không đặt logo đen trên nền tối.
- Clear space tối thiểu = chiều cao của symbol × 0.5 quanh mọi cạnh.
- Kích thước tối thiểu: wordmark cao ≥ 24px, symbol ≥ 16px.
- Favicon: dùng `favicon.svg` (symbol). Không dùng wordmark làm favicon.
- ❌ Không đổi màu gradient, không xoay, không thêm hiệu ứng (shadow/glow/outline), không kéo giãn.

### 4.2 Symbol như yếu tố đồ hoạ

Symbol (`favicon.svg`) được dùng như "chữ X" của NUSX:

- Màn intro/loader: symbol hiện ra trên nền `neutral-700` rồi mở sang hero.
- Watermark rất lớn, opacity 4–6%, phía sau thẻ số liệu hoặc section CTA.
- Marker cho danh sách tính năng (cỡ nhỏ, đơn sắc tím).

---

## 5. Layout & grid

- **Container**: max-width 1440px, lề ngoài 32px (desktop), 24px (≤ 820px), 16px (≤ 520px).
- **Grid**: 12 cột, gutter 24px. Nội dung **căn trái mạnh**. Headline thường chiếm 7–9 cột, đoạn văn 5–6 cột.
- **Nhịp section** (theo NUSX): xen kẽ nền tối `neutral-700` ↔ nền sáng `white` / `neutral-100`. Hero và footer luôn tối.
- **Khoảng cách dọc giữa section**: 160px desktop, 120px ≤ 1440px, 96px ≤ 820px, 72px ≤ 520px.
- **Breakpoints** (khớp `App.css`): `≤1440px`, `≤820px`, `≤520px`.
- **Đường kẻ thay cho bóng đổ**: border 1px `neutral-200` (nền sáng) hoặc `neutral-500` (nền tối). **Không dùng box-shadow**, trừ dropdown/menu.
- **Bo góc: 0** cho nút, card, input. Chỉ avatar được tròn.

### 5.1 Nhãn section (eyebrow)

```
■ ABOUT ODYLYTICS
```

Ô vuông 8×8px màu `purple-400` (nền sáng) hoặc `purple-300` (nền tối), cách chữ 12px. Chữ dùng style Label, màu `neutral-400`/`neutral-300`. Nhãn đặt trên H2, cách 32px.

### 5.2 Hatch divider (từ 8-bit)

Dải 64–80px giữa hai section cùng tông, dùng sọc chéo 45° 1px màu `neutral-500` trên nền tối (hoặc `neutral-200` trên nền sáng), khoảng cách 6px:

```css
background: repeating-linear-gradient(135deg, var(--neutral-500) 0 1px, transparent 1px 7px);
```

Dùng tối đa 2–3 lần trên trang.

---

## 6. Components

### 6.1 Navigation

- Fixed top, cao 64px, nền `neutral-700` (đổi sang blur khi cuộn qua section sáng).
- Trái: wordmark negative. Phải: các ô vuông 64×64px chứa icon (menu, liên hệ), ngăn bằng border dọc 1px `neutral-500`, giống NUSX.
- Menu mở full-screen nền `neutral-700`, link dùng style H1, chỉ số `01`–`0n` màu tím.

### 6.2 Buttons

Tất cả nút: góc vuông, padding `20px 32px`, chữ style Button, kèm icon `→` cách 16px. Khi hover, mũi tên dịch 4px sang phải.

| Variant | Nền | Chữ | Border | Dùng khi |
|---|---|---|---|---|
| **Primary** | `purple-400` | `white` | none | CTA chính (≤ 1 mỗi viewport) |
| **Inverse** | `white` | `neutral-700` | none | CTA trên nền tối, hero (như "OUR PROGRAMMES" của NUSX) |
| **Outline** | transparent | chữ chính | 1px chữ chính | CTA phụ |
| **Signal** | `orange-300` | `neutral-700` | none | Hành động khẩn/SOS, dùng rất hạn chế |

Hover Primary: `purple-500`. Focus: outline 2px `purple-300`, offset 3px.

### 6.3 Thẻ số liệu xếp chồng (NUSX "The Three Ones")

- 3–4 thẻ full-width, ghim (sticky) khi cuộn. Mỗi thẻ sau trượt lên che thẻ trước, thẻ trước thu nhỏ nhẹ (scale 0.96) và tối đi.
- Nền thẻ từ sáng đến tối: `neutral-100` → `neutral-300` → `neutral-600` → `neutral-700`.
- Chỉ số `01` ở góc trái trên (Label). Số lớn style Stat number, opacity 0.15–0.25, làm nền. Phía trên là mô tả ngắn (Body L).
- Thẻ cuối có thể có số màu cam.

### 6.4 Danh sách đánh số

Hàng ngang ngăn bằng border 1px. Trái: `01` (Label, tím) cùng tiêu đề (H2). Phải: mô tả (Body) và các link in hoa có `→`.

### 6.5 Feature grid (từ 8-bit)

- Lưới 2–3 cột trong một khung kẻ 1px, các ô ngăn bằng đường kẻ, không có khoảng hở.
- Mỗi ô: icon line/pixel đơn sắc 32px (tím, hoặc cam cho tính năng cảnh báo), H3, Body.
- Hover: nền ô chuyển `neutral-600` (nền tối) hoặc `neutral-100` (nền sáng).

### 6.6 Accordion

Hàng ngăn bằng border 1px. Mục đang mở có **thanh dọc 2px `purple-400`** ở mép trái và tiêu đề màu chữ chính. Mục đóng có tiêu đề màu `neutral-400`. Có thể ghép ảnh minh hoạ đổi theo mục ở cột phải.

### 6.7 Product cards (AquaGuard / AirGuard)

- Card góc vuông, border 1px, không shadow.
- Badge sản phẩm style Label: AquaGuard và AirGuard dùng tím, trạng thái cảnh báo dùng cam.
- Artwork sản phẩm giữ nguyên asset trong `public/assets/products/`.

### 6.8 Footer

- Nền `neutral-700`. Lưới link 2–3 cột (Body, `white`). Mạng xã hội in hoa ngăn bằng `/`. Địa chỉ/điện thoại/email dạng Label với ký hiệu `A` `P` `E`.
- Dòng cuối: **wordmark "ODYLYTICS" khổng lồ** tràn full-width (Exo 2 Bold, màu `white`). Một ký tự (ví dụ "O") được tô gradient brand, giống chữ X màu lime của NUSX.

---

## 7. Hero section spec (theo NUSX)

Nền `neutral-700`, cao `100svh`, nav tối với wordmark negative.

### 7.1 Bố cục

```
┌──────────────────────────────────────────────────────────┐
│ [Odylytics wordmark]                    [ ☰ ]│[ ✉ ]│       │
│                                                          │
│                      · · ·particle· · ·                  │
│ Engineering        ·   globe (tím/cam)  ·                │
│ safer               · · · · · · · · · ·                  │
│                                         communities      │
│ Body L mô tả ngắn                     that  [PROTECT]    │ ← từ khóa cam, xoay
│ (5–6 cột)                          [ EXPLORE PRODUCTS → ]│
└──────────────────────────────────────────────────────────┘
```

- **Headline bất đối xứng 2 khối**: khối trên căn trái, khối dưới căn phải, style Display màu `white`.
- **Từ khóa xoay** (cam `#FF8C00`): ví dụ *protect → respond → endure → recover*, đổi mỗi ~2.5s bằng hiệu ứng slide-up kèm mask. Khi không còn chuyển động, giữ từ đầu tiên.
- Đoạn mô tả Body L, màu `neutral-100` opacity 0.8, căn trái dưới khối headline trên.
- CTA **Inverse** căn phải dưới headline. Tuỳ chọn thêm 1 CTA Outline.

### 7.2 Background: particle globe

- Quả cầu điểm (dot sphere) xoay chậm ở giữa và lệch phải hero, đường kính ~70% chiều cao viewport.
- Màu hạt: ~85% `white` opacity 0.3–0.8, ~10% `purple-300`, ~5% `orange-300`.
- Tương tác: con trỏ đẩy nhẹ các hạt (repel radius ~120px).
- Có thể implement bằng component particle hiện có (`ParticleText` từ React Bits) hoặc canvas/three.js. Nếu giữ `LiquidEther`, palette phải đổi thành `['#4C0072', '#AE0BFF', '#FF8C00']` và hạ opacity xuống ≤ 0.35 để globe/headline vẫn là tâm điểm.
- Dưới hero có thể có marquee in hoa (Label, `neutral-400`, ngăn bằng `■` tím).

### 7.3 Intro loader (tuỳ chọn)

Màn `purple-400` toàn màn hình. Symbol `favicon.svg` (bản trắng) xuất hiện, glitch nhẹ khoảng 600ms, rồi trượt lên lộ hero. Tổng thời gian ≤ 1.2s. Mỗi phiên chỉ chạy 1 lần.

---

## 8. Motion

| Hiệu ứng | Spec |
|---|---|
| Reveal khi vào viewport | translateY 24px → 0, opacity 0 → 1, 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 80ms |
| Từ khóa xoay hero | slide-up kèm mask, 500ms, mỗi 2.5s |
| Headline 2 tông | phần xám chuyển dần sang màu chính theo tiến độ cuộn (scrub) |
| Thẻ xếp chồng | sticky + scale 0.96 + overlay tối 30% |
| Nút hover | mũi tên dịch 4px, nền đổi màu trong 200ms |
| Marquee | 40s/vòng, dừng khi hover |

- **Bắt buộc** tôn trọng `prefers-reduced-motion`: tắt globe xoay, từ khóa xoay, sticky scale, marquee. Chỉ giữ fade.
- Không dùng bounce, elastic, hay parallax mạnh.

---

## 9. Iconography & imagery

- Icon: line 1.5px hoặc pixel-art 16×16 grid (từ 8-bit), **đơn sắc** tím/cam/trắng. Không dùng icon nhiều màu.
- Ảnh: ưu tiên ảnh thật có tone tối. Có thể phủ duotone `neutral-700` → `purple-500` để đồng bộ (tương tự duotone cam của Pixelpush).
- Không dùng illustration 3D bóng bẩy hay emoji.

---

## 10. Voice & copy

Calm under pressure. Precise with data. Human in every outcome.

- **Clear**: ngôn ngữ đơn giản, hành động trực tiếp.
- **Trustworthy**: chỉ nêu số liệu xác thực, không phóng đại.
- **Calm**: truyền đạt sự khẩn cấp mà không gây hoảng loạn. Cam là *tín hiệu*, không phải *báo động đỏ*.
- **Human**: dẫn dắt bằng an toàn, phẩm giá, khả năng tiếp cận.
- Nhãn và nút viết IN HOA, ngắn (1–3 từ). Headline viết sentence case.

---

## 11. CSS tokens

Thay toàn bộ token cũ trong `src/index.css` bằng bộ sau:

```css
:root {
  /* Brand */
  --purple-100: #ECDEFF; --purple-200: #D4ABFF; --purple-300: #BF72FF;
  --purple-400: #AE0BFF; --purple-500: #7B00B7; --purple-600: #4C0072; --purple-700: #200034;
  --orange-100: #FFEDE6; --orange-200: #FFC4A8; --orange-300: #FF8C00;
  --orange-400: #C86D00; --orange-500: #944F00; --orange-600: #633300; --orange-700: #361900;

  /* Neutral */
  --white: #FFFFFF;
  --neutral-100: #E4E3E5; --neutral-200: #BDBBBF; --neutral-300: #97949B;
  --neutral-400: #736F78; --neutral-500: #504D53; --neutral-600: #2F2D31; --neutral-700: #111013;

  /* Semantic */
  --bg-dark: var(--neutral-700);
  --bg-light: var(--white);
  --bg-light-alt: var(--neutral-100);
  --text-on-light: var(--neutral-700);
  --text-on-dark: var(--white);
  --text-muted-light: var(--neutral-300);
  --text-muted-dark: var(--neutral-400);
  --border-light: var(--neutral-200);
  --border-dark: var(--neutral-500);
  --accent: var(--purple-400);
  --signal: var(--orange-300);
  --gradient-brand: linear-gradient(135deg, #AE0BFF 0%, #FF8C00 100%);

  /* Type */
  --font-primary: 'Exo 2', 'Google Sans Flex', system-ui, sans-serif;
  --font-body: 'Google Sans Flex', system-ui, sans-serif;

  /* Shape */
  --radius: 0;
}
```

---

## 12. Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Nền đen/trắng chiếm phần lớn, màu brand làm điểm nhấn | Phủ tím/cam lên cả section |
| Tím cho tương tác, cam cho tín hiệu/số liệu | Dùng tím và cam ngang nhau trong cùng một component |
| Góc vuông, đường kẻ 1px | Bo góc lớn, box-shadow, glassmorphism |
| Headline lớn, letter-spacing âm, 2 tông | Headline nhỏ, căn giữa mọi nơi |
| Nhãn IN HOA giãn chữ có marker ■ | Thêm font thứ ba ngoài Exo 2 và Google Sans Flex |
| Logo negative trên nền tối | Logo đen trên nền tối, đổi màu gradient logo |
| Chữ cam trên nền tối / chữ đen trên nền cam | Chữ cam trên nền trắng, chữ trắng trên nền cam |

---

## 13. Checklist khi thiết kế section mới

- [ ] Nền là `neutral-700`, `white` hoặc `neutral-100`, xen kẽ tối/sáng với section liền kề
- [ ] Màu brand ≤ ~15% diện tích, tỷ lệ tím:cam ≈ 65:35
- [ ] Có nhãn section `■ LABEL` phía trên H2
- [ ] Heading dùng Exo 2, đoạn văn dài dùng Google Sans Flex Medium
- [ ] Góc vuông, không shadow, cấu trúc bằng border 1px
- [ ] Contrast đạt AA theo bảng 2.4
- [ ] Logo đúng phiên bản (negative trên nền tối)
- [ ] Motion tôn trọng `prefers-reduced-motion`
- [ ] Copy theo voice: clear, trustworthy, calm, human
