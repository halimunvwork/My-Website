/**
 * main.js — MyWebsite
 * Handles: navbar scroll, mobile menu, counter animation,
 * scroll reveal, contact form validation, active nav links
 */

// =============================================
// NAVBAR — Scrolled state
// =============================================
const navbar = document.getElementById('navbar');

const handleNavbarScroll = () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// =============================================
// MOBILE MENU — Hamburger toggle
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// =============================================
// ACTIVE NAV LINK — Based on scroll position
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const updateActiveLink = () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });

// =============================================
// COUNTER ANIMATION — Stats numbers
// =============================================
const animateCounter = (el, target, duration = 2000) => {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const initCounters = () => {
  const counters = document.querySelectorAll('[data-target]');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el, parseInt(el.dataset.target, 10));
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
};

// =============================================
// SCROLL REVEAL — Fade in on scroll
// =============================================
const initScrollReveal = () => {
  const revealEls = document.querySelectorAll(
    '.service-card, .team-card, .feature-item, .about-visual, .about-content, .contact-info, .contact-form-wrapper'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
};

// =============================================
// CONVERSATIONAL CONSULTATION WIZARD
// =============================================
const steps = [
  {
    title: 'Tentang Tujuan & Jenis Website',
    questions: [
      {
        id: 'jenisWebsite',
        text: 'Jenis website apa yang ingin Anda buat?',
        type: 'radio-chips',
        options: [
          'Website Profil Usaha',
          'Toko Online',
          'Website Perusahaan',
          'Website Pribadi/Portofolio',
          'Website Sekolah/Komunitas',
          'Website Berita/Blog',
          'Lainnya',
        ],
        required: true,
        otherText: 'Sebutkan jenis website lainnya...',
      },
      {
        id: 'tujuanUtama',
        text: 'Apa tujuan utama Anda membuat website ini?',
        desc: '(Pilih semua yang sesuai)',
        type: 'checkbox-chips',
        options: [
          'Agar usaha dikenal banyak orang',
          'Agar orang bisa pesan produk/jasa langsung',
          'Agar terlihat lebih profesional',
          'Agar mudah ditemukan di Google',
          'Keperluan administrasi',
          'Lainnya',
        ],
        required: true,
        otherText: 'Sebutkan tujuan lainnya...',
      },
      {
        id: 'targetPengunjung',
        text: 'Siapa yang nantinya akan sering mengunjungi website Anda?',
        desc: 'Contoh: Pembeli umum, mitra bisnis, pelajar, pasien, dll.',
        type: 'text',
        placeholder: 'Tuliskan target pengunjung...',
        required: true,
      },
      {
        id: 'fiturWajib',
        text: 'Apakah ada fitur wajib yang harus ada?',
        desc: '(Pilih semua yang sesuai)',
        type: 'checkbox-chips',
        options: [
          'Tombol WhatsApp / Pesan langsung',
          'Formulir Pemesanan / Pendaftaran',
          'Galeri Foto / Video',
          'Peta Lokasi (Google Maps)',
          'Halaman Pembayaran Online',
          'Login Anggota (Membership)',
          'Katalog Produk',
          'Lainnya',
        ],
        required: true,
        otherText: 'Sebutkan fitur wajib lainnya...',
      },
    ],
  },
  {
    title: 'Tentang Isi & Halaman Website',
    questions: [
      {
        id: 'halamanDiinginkan',
        text: 'Menu atau halaman apa saja yang ingin ada di dalamnya?',
        desc: '(Pilih semua yang sesuai)',
        type: 'checkbox-chips',
        options: [
          'Beranda / Landing Page',
          'Tentang Kami / Profil Usaha',
          'Layanan / Jasa kami',
          'Daftar Produk / Portofolio',
          'Galeri Foto',
          'Testimoni Klien',
          'Kontak Kami',
          'Blog / Artikel Berita',
          'Pertanyaan Umum (FAQ)',
        ],
        required: true,
      },
      {
        id: 'kesiapanKonten',
        text: 'Apakah Anda sudah menyiapkan semua isi website?',
        desc: 'Seperti tulisan penjelasan, foto, gambar, logo, daftar harga, dll.',
        type: 'radio-chips',
        options: [
          'Sudah siap, tinggal saya serahkan',
          'Sebagian siap, butuh bantuan menyempurnakan',
          'Belum siap, butuh bantuan menyusun tulisan & mencari foto',
        ],
        required: true,
      },
      {
        id: 'jumlahKonten',
        text: 'Jika ada daftar produk, jasa, atau portofolio, kira-kira berapa jumlahnya?',
        type: 'radio-chips',
        options: [
          'Sedikit (1 - 10 data)',
          'Sedang (11 - 50 data)',
          'Banyak (Lebih dari 50 data)',
          'Tidak ada daftar produk/jasa',
        ],
        required: true,
      },
      {
        id: 'berkasUnduhan',
        text: 'Apakah ada berkas yang perlu diunggah agar bisa diunduh pengunjung?',
        desc: 'Contoh: Brosur PDF, Daftar Harga, Formulir Pendaftaran, dll.',
        type: 'radio-chips',
        options: ['Ya, ada berkas yang perlu diunggah', 'Tidak ada'],
        required: true,
      },
    ],
  },
  {
    title: 'Tentang Tampilan & Desain',
    questions: [
      {
        id: 'gayaTampilan',
        text: 'Gaya tampilan seperti apa yang Anda sukai?',
        desc: '(Pilih semua yang sesuai)',
        type: 'checkbox-chips',
        options: [
          'Resmi & Serius',
          'Santai & Ramah',
          'Modern & Bersih',
          'Minimalis & Sederhana',
          'Berwarna Cerah & Menarik',
          'Elegan & Mewah',
        ],
        required: true,
      },
      {
        id: 'warnaUtama',
        text: 'Apakah ada warna utama yang harus dipakai?',
        desc: 'Misalnya warna logo, warna brand, dll.',
        type: 'radio-chips',
        options: [
          'Ya, ada warna khusus (sebutkan di bawah)',
          'Belum ada, saya butuh bantuan untuk dipilihkan',
        ],
        required: true,
        otherText: 'Sebutkan warna utama...',
      },
      {
        id: 'websiteReferensi',
        text: 'Apakah Anda punya contoh website lain yang disukai?',
        desc: 'Boleh tuliskan alamat web referensi dan bagian mana yang Anda suka.',
        type: 'textarea',
        placeholder:
          'Contoh: www.contohweb.com (saya suka bagian galeri & warnanya)',
        required: false,
      },
      {
        id: 'halamanDepanKhusus',
        text: 'Apakah ada hal khusus yang wajib ditampilkan di halaman depan?',
        desc: '(Pilih semua yang sesuai)',
        type: 'checkbox-chips',
        options: [
          'Logo Usaha',
          'Foto Produk / Portofolio Unggulan',
          'Nomor Telepon / Tombol WA',
          'Kalimat Penyambutan / Slogan',
          'Promo khusus yang sedang berjalan',
          'Lainnya',
        ],
        required: false,
        otherText: 'Sebutkan hal khusus lainnya...',
      },
      {
        id: 'kenyamananHP',
        text: 'Pentingkah bagi Anda agar tampilan website nyaman dilihat di HP?',
        type: 'radio-chips',
        options: [
          'Sangat Penting (Sebagian besar pengunjung pakai HP)',
          'Penting saja',
          'Biasa saja / Kurang penting',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Tentang Teknis & Pengelolaan',
    questions: [
      {
        id: 'domainHosting',
        text: 'Apakah Anda sudah punya Nama Domain & Hosting?',
        desc: 'Domain = alamat web (www.nama.com). Hosting = tempat simpan data.',
        type: 'radio-chips',
        options: [
          'Sudah punya keduanya',
          'Sudah punya domain saja',
          'Belum punya sama sekali (butuh dibantu uruskan/dibeli)',
        ],
        required: true,
      },
      {
        id: 'ubahIsiSendiri',
        text: 'Nanti setelah jadi, apakah Anda ingin bisa mengubah isi website sendiri?',
        desc: 'Contoh: Ganti foto, tambah berita, ubah daftar harga sendiri.',
        type: 'radio-chips',
        options: [
          'Ya, wajib bisa ubah sendiri (seperti menulis di Word)',
          'Tidak perlu, saya minta bantuan developer jika ada perubahan',
        ],
        required: true,
      },
      {
        id: 'hubungkanMedsos',
        text: 'Apakah website ini perlu terhubung dengan akun media sosial Anda?',
        desc: 'Seperti logo Instagram, Facebook, TikTok, dll yang bisa diklik.',
        type: 'radio-chips',
        options: ['Ya, hubungkan ke media sosial', 'Tidak perlu'],
        required: true,
      },
      {
        id: 'layananTambahan',
        text: 'Apakah ada layanan pihak ketiga yang perlu disambungkan?',
        desc: '(Pilih semua yang sesuai)',
        type: 'checkbox-chips',
        options: [
          'Sistem Pembayaran Otomatis (Payment Gateway)',
          'Peta Lokasi (Google Maps)',
          'Sistem Cek Ongkir / Kurir Pengiriman',
          'Tidak ada / Belum tahu',
          'Lainnya',
        ],
        required: false,
        otherText: 'Sebutkan layanan lainnya...',
      },
    ],
  },
  {
    title: 'Tentang Waktu & Anggaran',
    questions: [
      {
        id: 'targetWaktu',
        text: 'Kapan target waktu selesai yang Anda inginkan?',
        type: 'radio-chips',
        options: [
          'Sangat Cepat (Kurang dari 2 minggu)',
          'Standar (2 - 4 minggu)',
          'Santai (1 - 2 bulan)',
          'Bebas / Fleksibel',
        ],
        required: true,
      },
      {
        id: 'anggaran',
        text: 'Berapa kisaran anggaran yang Anda siapkan?',
        desc: 'Membantu kami memberikan opsi fitur yang paling maksimal.',
        type: 'radio-chips',
        options: [
          'Hemat (Di bawah Rp 2 Juta)',
          'Ekonomis (Rp 2 - 5 Juta)',
          'Bisnis (Rp 5 - 10 Juta)',
          'Enterprise (Di atas Rp 10 Juta)',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Kontak & Penutup',
    questions: [
      {
        id: 'namaKlien',
        text: 'Nama Lengkap Anda',
        type: 'text',
        placeholder: 'John Doe',
        required: true,
      },
      {
        id: 'emailKlien',
        text: 'Alamat Email Aktif',
        desc: 'Untuk kami kirimi berkas proposal penawaran harga.',
        type: 'email',
        placeholder: 'john@example.com',
        required: true,
      },
      {
        id: 'whatsappKlien',
        text: 'Nomor WhatsApp',
        desc: 'Format: 08xxxxxxxx atau +628xxxxxxxx (untuk diskusi cepat).',
        type: 'text',
        placeholder: '08123456789',
        required: true,
      },
      {
        id: 'keinginanKhusus',
        text: 'Apakah ada keinginan khusus atau catatan tambahan?',
        type: 'textarea',
        placeholder: 'Tuliskan keinginan khusus Anda di sini (jika ada)...',
        required: false,
      },
    ],
  },
];

let currentStep = 0;
const answers = {};
let isSubmitted = false;

const initConsultationWizard = () => {
  const modal = document.getElementById('wizard-modal');
  if (!modal) return;

  const startBtns = [
    document.getElementById('start-consultation-btn'),
    document.getElementById('nav-cta-btn'),
    document.getElementById('hero-cta-btn'),
  ];
  const closeBtn = document.getElementById('wizard-close');
  const overlay = document.getElementById('wizard-overlay');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');

  // Open Wizard
  const openWizard = e => {
    if (e) e.preventDefault();
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (isSubmitted) {
      resetWizard();
    } else {
      renderStep();
    }
  };

  // Close Wizard
  const closeWizard = () => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  // Bind Open Buttons
  startBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', openWizard);
    }
  });

  // Bind Close Buttons
  if (closeBtn) closeBtn.addEventListener('click', closeWizard);
  if (overlay) overlay.addEventListener('click', closeWizard);

  // Prev / Next Nav
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        renderStep();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateStep()) {
        if (currentStep < steps.length - 1) {
          currentStep++;
          renderStep();
        } else {
          submitWizard();
        }
      }
    });
  }
};

const renderStep = () => {
  const step = steps[currentStep];
  const indicator = document.getElementById('wizard-step-indicator');
  const progressFill = document.getElementById('wizard-progress-fill');
  const title = document.getElementById('wizard-step-title');
  const contentArea = document.getElementById('wizard-step-content');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');
  const footer = document.querySelector('.wizard-footer');

  // Show footer if it was hidden (success screen hides footer)
  if (footer) footer.style.display = '';
  if (indicator) indicator.style.display = '';

  // Update headers & progress
  if (indicator)
    indicator.textContent = `Langkah ${currentStep + 1} dari ${steps.length}`;
  if (progressFill)
    progressFill.style.width = `${(currentStep / (steps.length - 1)) * 100}%`;
  if (title) title.textContent = step.title;

  // Buttons state
  if (prevBtn) prevBtn.disabled = currentStep === 0;
  if (nextBtn) {
    nextBtn.textContent =
      currentStep === steps.length - 1 ? 'Kirim Pengajuan 🚀' : 'Lanjut →';
    nextBtn.disabled = false;
  }

  // Render question HTML
  let html = '';
  step.questions.forEach(q => {
    html += `
      <div class="wizard-question-group" id="group-${q.id}">
        <span class="question-text">${q.text}</span>
        ${q.desc ? `<span class="question-desc">${q.desc}</span>` : ''}
    `;

    if (q.type === 'radio-chips' || q.type === 'checkbox-chips') {
      const isMulti = q.type === 'checkbox-chips';
      html += '<div class="options-grid">';
      q.options.forEach(opt => {
        const val = answers[q.id];
        const isChecked = isMulti
          ? Array.isArray(val) && val.includes(opt)
          : val === opt;

        html += `
          <label class="option-chip ${isChecked ? 'selected' : ''}">
            <input type="${isMulti ? 'checkbox' : 'radio'}" name="${q.id}" value="${opt}" ${isChecked ? 'checked' : ''}>
            <span class="option-chip-check">${isMulti ? '✓' : ''}</span>
            <span class="option-chip-label">${opt}</span>
          </label>
        `;
      });
      html += '</div>';

      // Handle "Lainnya" text input
      if (q.otherText) {
        const val = answers[q.id];
        const showOther = isMulti
          ? Array.isArray(val) && val.includes('Lainnya')
          : val === 'Lainnya' || (val && !q.options.includes(val));

        let otherVal = '';
        if (showOther) {
          if (isMulti) {
            otherVal = answers[`${q.id}_other`] || '';
          } else {
            otherVal = q.options.includes(val) ? '' : val;
          }
        }

        html += `
          <input type="text" class="option-other-input" id="other-${q.id}" placeholder="${q.otherText}" 
            style="display: ${showOther ? 'block' : 'none'};" value="${otherVal}">
        `;
      }
    } else if (q.type === 'text' || q.type === 'email') {
      html += `
        <input type="${q.type}" class="wizard-text-input" id="input-${q.id}" placeholder="${q.placeholder || ''}" value="${answers[q.id] || ''}">
      `;
    } else if (q.type === 'textarea') {
      html += `
        <textarea class="wizard-text-input" id="input-${q.id}" rows="3" placeholder="${q.placeholder || ''}">${answers[q.id] || ''}</textarea>
      `;
    }

    html += `
        <span class="wizard-error-text" id="err-${q.id}"></span>
      </div>
    `;
  });

  if (contentArea) {
    contentArea.innerHTML = html;

    // Auto-scroll the body to the top of the wizard questions
    const wizardBody = document.querySelector('.wizard-body');
    if (wizardBody) wizardBody.scrollTop = 0;
  }

  // Bind change listeners to inputs
  step.questions.forEach(q => {
    const group = document.getElementById(`group-${q.id}`);
    if (!group) return;

    if (q.type === 'radio-chips' || q.type === 'checkbox-chips') {
      const isMulti = q.type === 'checkbox-chips';
      const inputs = group.querySelectorAll(`input[name="${q.id}"]`);
      const otherInput = group.querySelector(`#other-${q.id}`);

      inputs.forEach(input => {
        input.addEventListener('change', () => {
          // Update visual selected states
          group.querySelectorAll('.option-chip').forEach(chip => {
            const isSel = chip.querySelector('input').checked;
            chip.classList.toggle('selected', isSel);
          });

          // Save state
          if (isMulti) {
            const selected = [];
            inputs.forEach(inp => {
              if (inp.checked) selected.push(inp.value);
            });
            answers[q.id] = selected;

            // Handle "Lainnya" input visibility
            if (otherInput) {
              const hasOther = selected.includes('Lainnya');
              otherInput.style.display = hasOther ? 'block' : 'none';
              if (hasOther) {
                answers[`${q.id}_other`] = otherInput.value;
                otherInput.focus();
              } else {
                delete answers[`${q.id}_other`];
              }
            }
          } else {
            const selectedVal = group.querySelector(
              `input[name="${q.id}"]:checked`
            ).value;
            answers[q.id] = selectedVal;

            // Handle "Lainnya" input visibility
            if (otherInput) {
              const isOther = selectedVal === 'Lainnya';
              otherInput.style.display = isOther ? 'block' : 'none';
              if (isOther) {
                otherInput.focus();
              }
            }
          }

          // Clear error on interact
          const errEl = document.getElementById(`err-${q.id}`);
          if (errEl) errEl.textContent = '';
        });
      });

      if (otherInput) {
        otherInput.addEventListener('input', () => {
          if (isMulti) {
            answers[`${q.id}_other`] = otherInput.value;
          } else {
            // Do not save to answers[q.id] immediately to prevent deselecting "Lainnya" check state
          }
          const errEl = document.getElementById(`err-${q.id}`);
          if (errEl) errEl.textContent = '';
        });
      }
    } else {
      const inputEl = group.querySelector(`#input-${q.id}`);
      if (inputEl) {
        inputEl.addEventListener('input', () => {
          answers[q.id] = inputEl.value;
          inputEl.classList.remove('error');
          const errEl = document.getElementById(`err-${q.id}`);
          if (errEl) errEl.textContent = '';
        });
      }
    }
  });
};

const validateStep = () => {
  const step = steps[currentStep];
  let isValid = true;

  step.questions.forEach(q => {
    const errEl = document.getElementById(`err-${q.id}`);
    if (errEl) errEl.textContent = '';

    const group = document.getElementById(`group-${q.id}`);
    const otherInput = group ? group.querySelector(`#other-${q.id}`) : null;

    const value = answers[q.id];

    // Check required fields
    if (q.required) {
      if (q.type === 'radio-chips') {
        if (!value) {
          if (errEl) errEl.textContent = 'Harap pilih salah satu opsi';
          isValid = false;
          return;
        }
      } else if (q.type === 'checkbox-chips') {
        if (!Array.isArray(value) || value.length === 0) {
          if (errEl) errEl.textContent = 'Harap pilih minimal satu opsi';
          isValid = false;
          return;
        }
      } else {
        const inputEl = group ? group.querySelector(`#input-${q.id}`) : null;
        const textVal = inputEl ? inputEl.value.trim() : '';
        if (!textVal) {
          if (errEl) errEl.textContent = 'Bagian ini wajib diisi';
          if (inputEl) inputEl.classList.add('error');
          isValid = false;
          return;
        }
      }
    }

    // Specific field validations
    if (q.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        if (errEl) errEl.textContent = 'Format email tidak valid';
        const inputEl = group ? group.querySelector(`#input-${q.id}`) : null;
        if (inputEl) inputEl.classList.add('error');
        isValid = false;
        return;
      }
    }

    // Validation for "Lainnya" text inputs
    if (
      (q.type === 'radio-chips' || q.type === 'checkbox-chips') &&
      q.otherText &&
      otherInput
    ) {
      const isMulti = q.type === 'checkbox-chips';
      const isOtherSelected = isMulti
        ? Array.isArray(value) && value.includes('Lainnya')
        : value === 'Lainnya' || (value && !q.options.includes(value));

      if (isOtherSelected) {
        const otherVal = otherInput.value.trim();
        if (!otherVal) {
          if (errEl)
            errEl.textContent = 'Harap tuliskan pilihan lainnya di kolom teks';
          otherInput.focus();
          isValid = false;
          return;
        }

        // Finalize value for other input
        if (isMulti) {
          answers[`${q.id}_other`] = otherVal;
        } else {
          answers[q.id] = otherVal; // Overwrite "Lainnya" with custom text
        }
      }
    }
  });

  return isValid;
};

const submitWizard = async () => {
  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');

  if (prevBtn) prevBtn.disabled = true;
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.textContent = 'Mengirim...';
  }

  // Finalize data formatting
  const formattedAnswers = {};
  steps.forEach(s => {
    s.questions.forEach(q => {
      const val = answers[q.id];
      if (Array.isArray(val)) {
        const list = [...val];
        // If "Lainnya" was checked and other text is present, replace or append
        if (list.includes('Lainnya')) {
          const otherVal = answers[`${q.id}_other`] || '';
          const idx = list.indexOf('Lainnya');
          if (otherVal) {
            list[idx] = `Lainnya (${otherVal})`;
          }
        }
        formattedAnswers[q.id] = list.join(', ');
      } else {
        formattedAnswers[q.id] = val || 'Tidak ada';
      }
    });
  });

  const payload = {
    client: {
      name: answers.namaKlien,
      email: answers.emailKlien,
      whatsapp: answers.whatsappKlien,
    },
    answers: formattedAnswers,
  };

  try {
    // 1. Submit to Local Express Backend Database
    const dbPromise = fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // 2. Submit to Web3Forms to forward to user's email
    const emailPayload = {
      access_key: 'a1849c6c-be8e-4201-8bce-00f486c1f0e8',
      name: answers.namaKlien,
      email: answers.emailKlien,
      subject: `🎁 Pengajuan Konsultasi Gratis - ${answers.namaKlien}`,
      from_name: 'MyWebsite Assistant',
      '--- DATA KONTAK ---': '---------------------------------------',
      'Nama Klien': answers.namaKlien,
      'Email Klien': answers.emailKlien,
      'No WhatsApp': answers.whatsappKlien,
      '--- KEBUTUHAN WEBSITE ---': '---------------------------------------',
      'Jenis Website': formattedAnswers.jenisWebsite,
      'Tujuan Utama': formattedAnswers.tujuanUtama,
      'Target Pengunjung': formattedAnswers.targetPengunjung,
      'Fitur Wajib': formattedAnswers.fiturWajib,
      'Menu/Halaman': formattedAnswers.halamanDiinginkan,
      'Kesiapan Isi Konten': formattedAnswers.kesiapanKonten,
      'Jumlah Produk/Jasa': formattedAnswers.jumlahKonten,
      'Berkas Unduhan': formattedAnswers.berkasUnduhan,
      'Gaya Tampilan Desain': formattedAnswers.gayaTampilan,
      'Warna Utama': formattedAnswers.warnaUtama,
      'Website Referensi': formattedAnswers.websiteReferensi,
      'Hal Khusus Depan': formattedAnswers.halamanDepanKhusus,
      'Pentingnya Responsif HP': formattedAnswers.kenyamananHP,
      'Status Domain & Hosting': formattedAnswers.domainHosting,
      'Bisa Ubah Isi Sendiri': formattedAnswers.ubahIsiSendiri,
      'Hubungkan ke Medsos': formattedAnswers.hubungkanMedsos,
      'Layanan Pihak Ketiga': formattedAnswers.layananTambahan,
      'Target Waktu Selesai': formattedAnswers.targetWaktu,
      'Kisaran Anggaran': formattedAnswers.anggaran,
      'Keinginan Khusus / Catatan': formattedAnswers.keinginanKhusus,
    };

    const emailPromise = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    // Run both calls in parallel
    const [dbResponse, emailResponse] = await Promise.all([
      dbPromise,
      emailPromise,
    ]);

    if (!dbResponse.ok) {
      // eslint-disable-next-line no-console
      console.warn('Gagal menyimpan ke database lokal, mencoba melanjutkan...');
    }

    if (emailResponse.status !== 200) {
      throw new Error('Gagal mengirim laporan email');
    }

    // Success State
    isSubmitted = true;

    // Render Success Page
    const contentArea = document.getElementById('wizard-step-content');
    const title = document.getElementById('wizard-step-title');
    const indicator = document.getElementById('wizard-step-indicator');
    const progressFill = document.getElementById('wizard-progress-fill');
    const footer = document.querySelector('.wizard-footer');

    if (indicator) indicator.style.display = 'none';
    if (progressFill) progressFill.style.width = '100%';
    if (title) title.textContent = 'Terima Kasih!';
    if (footer) footer.style.display = 'none';

    if (contentArea) {
      contentArea.innerHTML = `
        <div class="wizard-thankyou">
          <span class="wizard-thankyou-icon">🎉</span>
          <h3>Pengajuan Konsultasi Terkirim!</h3>
          <p>Terima kasih <strong>${answers.namaKlien}</strong>. Data kuesioner Anda berhasil disimpan dan dikirim langsung ke email kami.</p>
          <p>Kami telah menerima detail kebutuhan Anda untuk proyek <strong>${formattedAnswers.jenisWebsite}</strong>. Tim kami akan segera meninjau detailnya dan menyusun proposal serta rincian biaya.</p>
          <p style="margin-top:0.5rem;">Kami akan menghubungi Anda kembali melalui WhatsApp (<strong>${answers.whatsappKlien}</strong>) atau Email (<strong>${answers.emailKlien}</strong>) dalam waktu 24 jam untuk sesi konsultasi gratis Anda.</p>
        </div>
      `;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error submitting consultation wizard:', err);
    alert(
      'Maaf, terjadi kesalahan teknis saat mengirim data. Silakan coba kembali.'
    );

    if (prevBtn) prevBtn.disabled = currentStep === 0;
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.textContent = 'Kirim Pengajuan 🚀';
    }
  }
};

const resetWizard = () => {
  currentStep = 0;
  isSubmitted = false;
  // Clear answers object keys
  Object.keys(answers).forEach(key => delete answers[key]);
  renderStep();
};

// =============================================
// FOOTER YEAR
// =============================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =============================================
// INIT ALL
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initScrollReveal();
  initConsultationWizard();
  handleNavbarScroll();
  updateActiveLink();
});
