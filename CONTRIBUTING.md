# 🤝 Panduan Kontribusi

Terima kasih sudah ingin berkontribusi ke **MyWebsite**! Dokumen ini menjelaskan cara kerja tim kami — dari setup awal hingga cara membuat Pull Request yang baik.

---

## 📋 Daftar Isi

1. [Setup Awal](#1-setup-awal)
2. [Workflow Pengembangan](#2-workflow-pengembangan)
3. [Konvensi Penamaan Branch](#3-konvensi-penamaan-branch)
4. [Konvensi Commit](#4-konvensi-commit)
5. [Membuat Pull Request](#5-membuat-pull-request)
6. [Code Style](#6-code-style)
7. [Review Process](#7-review-process)

---

## 1. Setup Awal

### Prasyarat
- Node.js v18+
- Git
- Editor favorit (kami rekomendasikan [VS Code](https://code.visualstudio.com))

### Langkah Setup

```bash
# Clone repository
git clone https://github.com/USERNAME/my-website.git
cd my-website

# Install semua dependencies (termasuk Husky git hooks)
npm install

# Pastikan semua berjalan dengan baik
npm run lint
npm run format:check
```

### VS Code Extensions (Disarankan)

Instal extension ini untuk pengalaman development terbaik:
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)
- **GitLens** (`eamodio.gitlens`)

Tambahkan ke `.vscode/settings.json` kamu:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## 2. Workflow Pengembangan

### Alur Kerja Standar

```
1. Ambil issue dari GitHub Issues atau buat baru
2. Buat branch baru dari develop
3. Kerjakan perubahan
4. Commit dengan pesan yang deskriptif
5. Push branch ke GitHub
6. Buat Pull Request ke develop
7. Tunggu review dari rekan tim
8. Setelah approved, merge!
```

### Contoh Praktis

```bash
# Pastikan branch develop kamu up-to-date
git checkout develop
git pull origin develop

# Buat branch baru
git checkout -b feature/tambah-halaman-blog

# ... kerjakan perubahan ...

# Cek kode sebelum commit
npm run lint
npm run format

# Commit
git add .
git commit -m "feat: tambah halaman blog dengan pagination"

# Push ke GitHub
git push origin feature/tambah-halaman-blog

# Buka Pull Request di GitHub
```

---

## 3. Konvensi Penamaan Branch

Format: `<type>/<deskripsi-singkat-dengan-dash>`

| Type | Digunakan Untuk | Contoh |
|------|----------------|--------|
| `feature/` | Fitur baru | `feature/halaman-blog` |
| `fix/` | Perbaikan bug | `fix/navbar-mobile-overlap` |
| `hotfix/` | Fix urgent di production | `hotfix/form-tidak-submit` |
| `refactor/` | Refactoring kode | `refactor/css-variabel` |
| `docs/` | Perubahan dokumentasi | `docs/update-readme` |
| `chore/` | Maintenance / tooling | `chore/update-dependencies` |

---

## 4. Konvensi Commit

Kami menggunakan **Conventional Commits**. Format:

```
<type>(<scope>): <deskripsi singkat>

[body opsional — penjelasan lebih detail]

[footer opsional — contoh: Closes #12]
```

### Types

| Type | Digunakan Untuk |
|------|----------------|
| `feat` | Fitur baru |
| `fix` | Perbaikan bug |
| `docs` | Perubahan dokumentasi |
| `style` | Formatting, titik koma, dll (bukan CSS) |
| `refactor` | Refactoring kode |
| `perf` | Peningkatan performa |
| `test` | Menambah atau mengubah test |
| `chore` | Update dependencies, konfigurasi |
| `ci` | Perubahan CI/CD |

### Contoh Commit yang Baik

```bash
# ✅ BAIK
git commit -m "feat: tambah animasi counter di hero section"
git commit -m "fix: perbaiki navbar yang overlap di mobile"
git commit -m "docs: update README dengan instruksi setup"
git commit -m "style: format ulang CSS dengan Prettier"
git commit -m "chore: update eslint ke versi 9"

# ❌ BURUK — Terlalu umum
git commit -m "update"
git commit -m "fix bug"
git commit -m "perubahan kecil"
git commit -m "WIP"
```

---

## 5. Membuat Pull Request

1. Push branch kamu ke GitHub
2. Buka tab **Pull Requests** di repository
3. Klik **"New Pull Request"**
4. Set base branch ke `develop` (bukan `main`)
5. Isi template PR yang sudah tersedia dengan lengkap
6. Assign ke reviewer yang sesuai
7. Tambahkan label yang tepat (`bug`, `enhancement`, dll)

### Checklist Sebelum Submit PR
- [ ] Kode sudah ditest di browser
- [ ] Tidak ada `console.log` yang tertinggal
- [ ] `npm run lint` berjalan tanpa error
- [ ] `npm run format:check` berjalan tanpa error
- [ ] Screenshot sudah ditambahkan (jika ada perubahan UI)

---

## 6. Code Style

Kami menggunakan **ESLint + Prettier** untuk menjaga konsistensi kode.

### Aturan Utama JavaScript
- Gunakan `const` dan `let`, jangan `var`
- Gunakan single quotes `'` untuk string
- Selalu tambahkan semicolon `;` di akhir statement
- Indentasi 2 spasi
- Gunakan arrow function `=>` untuk callback

```javascript
// ✅ BAIK
const greet = name => `Halo, ${name}!`;
const items = ['satu', 'dua', 'tiga'];

// ❌ BURUK
var greet = function(name) { return "Halo, " + name + "!" }
var items = ["satu", "dua", "tiga"]
```

### Auto-format
Jalankan sebelum commit:
```bash
npm run format    # Format semua file
npm run lint:fix  # Auto-fix ESLint errors
```

> 💡 **Tip:** Jika kamu menginstal VS Code extension Prettier, kode akan otomatis diformat setiap kali save!

---

## 7. Review Process

### Sebagai Reviewer
- Review dalam **24 jam** setelah PR dibuat
- Berikan feedback yang **konstruktif dan spesifik**
- Gunakan suggestion untuk perubahan kecil
- Approve jika sudah OK, atau Request Changes jika perlu perbaikan

### Sebagai Author
- Respond semua komentar sebelum merge
- Jangan merge PR sendiri jika belum ada approval
- Jika ada konflik, rebase dari `develop` terbaru

---

## ❓ Ada Pertanyaan?

Buka diskusi di tab **Discussions** di GitHub, atau hubungi tim melalui:
- 📧 Email: hello@mywebsite.com
- 💬 WhatsApp Group Tim

---

_Dokumen ini akan terus diperbarui sesuai kebutuhan tim. Last updated: 2025_
