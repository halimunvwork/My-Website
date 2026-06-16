# MyWebsite 🚀

[![CI Status](https://github.com/USERNAME/my-website/actions/workflows/ci.yml/badge.svg)](https://github.com/USERNAME/my-website/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)
[![ESLint](https://img.shields.io/badge/linted_by-ESLint-4B32C3.svg)](https://eslint.org)

> Website profesional modern dengan full team collaboration setup — HTML, CSS, JS + GitHub Actions + Prettier + ESLint + Husky.

**🌐 Live Demo:** [https://my-website.vercel.app](https://my-website.vercel.app)

---

## 📸 Preview

![Preview Website](./docs/preview.png)

---

## ✨ Fitur

- 🎨 **Desain Modern** — Dark theme premium dengan animasi halus
- 📱 **Fully Responsive** — Tampil sempurna di semua ukuran layar
- ⚡ **Performa Tinggi** — HTML/CSS/JS murni, tanpa framework berat
- ♿ **Accessible** — Semantic HTML & ARIA labels
- 🔍 **SEO Ready** — Meta tags lengkap
- 🛠️ **Developer Friendly** — ESLint + Prettier + Husky pre-commit hooks
- 🚀 **CI/CD** — GitHub Actions otomatis lint & deploy

---

## 🛠️ Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| HTML5 | — | Struktur halaman |
| CSS3 | — | Styling & animasi |
| JavaScript (ES2021) | — | Interaktivitas |
| ESLint | ^9.0 | Deteksi error JS |
| Prettier | ^3.0 | Format kode otomatis |
| Husky | ^9.0 | Git hooks |
| GitHub Actions | — | CI/CD pipeline |

---

## 🚀 Cara Menjalankan Lokal

### Prasyarat
- [Node.js](https://nodejs.org) v18 atau lebih baru
- [Git](https://git-scm.com)

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/my-website.git
cd my-website

# 2. Install dependencies
npm install

# 3. Buka di browser
# Cukup buka file ini:
open src/index.html
# atau double-click file src/index.html
```

### Scripts yang Tersedia

```bash
npm run lint          # Cek error JavaScript dengan ESLint
npm run lint:fix      # Auto-fix error ESLint
npm run format        # Format semua file dengan Prettier
npm run format:check  # Cek apakah format sudah sesuai
```

---

## 📁 Struktur Proyek

```
my-website/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                    # GitHub Actions CI/CD
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml            # Template laporan bug
│   │   └── feature_request.yml       # Template usulan fitur
│   └── PULL_REQUEST_TEMPLATE.md      # Template Pull Request
├── src/
│   ├── index.html                    # Halaman utama
│   ├── css/
│   │   └── style.css                 # Semua styling
│   └── js/
│       └── main.js                   # Semua JavaScript
├── .eslintrc.json                    # Konfigurasi ESLint
├── .prettierrc                       # Konfigurasi Prettier
├── .gitignore                        # File yang di-ignore Git
├── package.json                      # Dependensi & scripts
├── CONTRIBUTING.md                   # Panduan kontribusi tim
└── README.md                         # Dokumentasi ini
```

---

## 🌿 Branching Strategy

```
main          ← Production (auto-deploy ke Vercel)
  └── develop ← Staging (default branch untuk development)
        ├── feature/nama-fitur    ← Fitur baru
        ├── fix/nama-bug          ← Perbaikan bug
        └── hotfix/nama           ← Fix urgent di production
```

**Aturan:**
- ❌ Jangan push langsung ke `main`
- ✅ Semua perubahan harus lewat Pull Request
- ✅ PR wajib di-review minimal 1 orang
- ✅ CI harus lulus sebelum merge

---

## 🤝 Kontribusi

Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap berkontribusi ke proyek ini.

---

## 📄 License

Proyek ini menggunakan lisensi [MIT](LICENSE).

---

## 👥 Tim

| Nama | Role | GitHub |
|------|------|--------|
| Andi Pratama | Lead Developer | [@andi](https://github.com) |
| Budi Santoso | UI/UX Designer | [@budi](https://github.com) |
| Citra Dewi | Project Manager | [@citra](https://github.com) |

---

<p align="center">Built with ❤️ by Tim MyWebsite</p>
