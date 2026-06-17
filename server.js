import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const PASSCODE = process.env.ADMIN_PASSCODE || 'admin123';
const DATA_FILE = path.join(__dirname, 'data', 'submissions.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src')));

// Ensure data directory and file exist
async function initDatabase() {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
    }
  } catch (err) {
    console.error('Error initializing database file:', err);
  }
}

// Middleware for admin passcode check
const authenticateAdmin = (req, res, next) => {
  const code = req.headers['x-admin-passcode'] || req.query.passcode;
  if (code === PASSCODE) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Passcode salah' });
  }
};

// Route: Save submission
app.post('/api/submissions', async (req, res) => {
  try {
    const { client, answers } = req.body;
    if (!client || !client.name || !client.email || !client.whatsapp) {
      return res.status(400).json({ success: false, message: 'Data kontak tidak lengkap' });
    }

    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const submissions = JSON.parse(data);

    const newSubmission = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      client,
      answers
    };

    submissions.push(newSubmission);
    await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));

    res.json({ success: true, message: 'Pesan berhasil disimpan', id: newSubmission.id });
  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
  }
});

// Route: Get submissions
app.get('/api/submissions', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const submissions = JSON.parse(data);
    res.json({ success: true, submissions });
  } catch (err) {
    console.error('Error reading submissions:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
  }
});

// Route: Export CSV
app.get('/api/submissions/export', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const submissions = JSON.parse(data);

    const escapeCSV = (val) => {
      if (val === undefined || val === null) return '""';
      let str = String(val);
      if (Array.isArray(val)) {
        str = val.join(', ');
      }
      return '"' + str.replace(/"/g, '""').replace(/\r?\n/g, ' ') + '"';
    };

    const headers = [
      'ID', 'Tanggal', 'Nama Klien', 'Email', 'WhatsApp',
      'Jenis Website', 'Tujuan Utama', 'Target Pengunjung', 'Fitur Wajib',
      'Halaman Diinginkan', 'Kesiapan Konten', 'Jumlah Konten', 'Berkas Unduhan',
      'Gaya Tampilan', 'Warna Utama', 'Website Referensi', 'Halaman Depan Khusus', 'Kenyamanan HP',
      'Domain & Hosting', 'Ubah Isi Sendiri', 'Hubungkan Medsos', 'Layanan Tambahan',
      'Target Waktu', 'Anggaran', 'Keinginan Khusus'
    ];

    let csvContent = '\uFEFF' + headers.join(',') + '\n'; // Add BOM for Excel UTF-8 compatibility

    submissions.forEach((sub) => {
      const a = sub.answers || {};
      const row = [
        sub.id,
        new Date(sub.timestamp).toLocaleString('id-ID'),
        sub.client.name,
        sub.client.email,
        sub.client.whatsapp,
        a.jenisWebsite,
        a.tujuanUtama,
        a.targetPengunjung,
        a.fiturWajib,
        a.halamanDiinginkan,
        a.kesiapanKonten,
        a.jumlahKonten,
        a.berkasUnduhan,
        a.gayaTampilan,
        a.warnaUtama,
        a.websiteReferensi,
        a.halamanDepanKhusus,
        a.kenyamananHP,
        a.domainHosting,
        a.ubahIsiSendiri,
        a.hubungkanMedsos,
        a.layananTambahan,
        a.targetWaktu,
        a.anggaran,
        a.keinginanKhusus
      ];
      csvContent += row.map(escapeCSV).join(',') + '\n';
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=laporan-konsultasi.csv');
    res.status(200).send(csvContent);
  } catch (err) {
    console.error('Error exporting CSV:', err);
    res.status(500).send('Terjadi kesalahan saat mengekspor laporan');
  }
});

// Initialize DB and start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
