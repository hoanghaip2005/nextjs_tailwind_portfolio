# Portfolio Migration: React to Next.js + Tailwind CSS

## Tổng quan
Project này đã được chuyển đổi từ React portfolio (với Vite, SCSS modules, React Router) sang Next.js với Tailwind CSS.

## Các thay đổi chính

### 1. Framework Migration
- **Từ**: React với Vite
- **Sang**: Next.js 15 với Turbopack
- **Routing**: React Router → Next.js App Router

### 2. Styling Migration  
- **Từ**: SCSS modules
- **Sang**: Tailwind CSS với custom CSS variables
- **Theme**: Dark/Light mode support với CSS variables

### 3. Components Migration
Tất cả components đã được chuyển đổi:
- `Header` → `Navbar` (với scroll effect)
- `Footer` → Cập nhật với Tailwind
- `Typewriter` → Custom TypeScript component
- `ProjectCard` → Next.js Link integration
- `MobileMenu` → Responsive mobile navigation

### 4. Pages Migration
- **Home** (`/`) - Hero section + Introduction + Social links
- **About** (`/about`) - About info + Skills + GitHub activity
- **Projects** (`/projects`) - Project grid layout
- **Project Detail** (`/project/[id]`) - Dynamic project pages
- **Resume** (`/resume`) - PDF viewer với download

### 5. Dependencies
Các dependencies mới được thêm:
```json
{
  "@react-icons/all-files": "^4.1.0",
  "react-github-calendar": "^3.3.0", 
  "react-lazy-load-image-component": "^1.5.1",
  "react-parallax-tilt": "^1.5.22",
  "typewriter-effect": "^2.17.0",
  "framer-motion": "latest",
  "lucide-react": "latest",
  "react-pdf": "latest"
}
```

## Features

### ✅ Đã hoàn thành
- [x] Chuyển đổi tất cả pages
- [x] Responsive design với Tailwind
- [x] Dark/Light mode support
- [x] Smooth animations
- [x] Mobile navigation
- [x] Project routing với dynamic pages
- [x] PDF resume viewer
- [x] GitHub calendar integration
- [x] Social media links
- [x] SEO optimization

### 🎨 Design Improvements
- Modern Tailwind CSS styling
- Better responsive layout
- Smooth hover effects
- Purple accent color theme
- Clean typography
- Card-based layouts

### 📱 Mobile Experience
- Responsive grid layouts
- Mobile-friendly navigation
- Touch-optimized interactions
- Proper viewport handling

## Cấu trúc Project

```
src/
├── app/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Typewriter.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── project/[id]/
│   │   └── page.tsx
│   ├── resume/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── data/
│   └── projects.ts
└── public/
    └── assets/
        ├── avatar.svg
        ├── hand.png
        ├── home-main.svg
        └── ...
```

## Chạy Project

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## Browser Support
- Chrome/Edge (modern)
- Firefox (modern) 
- Safari (modern)
- Mobile browsers

## Performance
- Next.js optimizations
- Image optimization
- Code splitting
- Lazy loading
- Efficient bundling với Turbopack

---

**Migration completed successfully!** 🎉

Project giờ đây sử dụng công nghệ hiện đại với Next.js và Tailwind CSS, mang lại hiệu suất tốt hơn và trải nghiệm người dùng được cải thiện.
