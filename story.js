// ============================================================
// DATA CERITA — Kronik Aelthar
// Sistem narasi percabangan berbasis node
// Setiap adegan: { id, type, title, narration, speaker, choices, stat_effects }
// Tipe: 'scene' | 'ending' | 'combat' | 'stat_check'
// ============================================================

const STORY_DATA = {
  episodes: [
    // ══════════════════════════════════════════════════════
    // EPISODE 1: MAHKOTA YANG HANCUR
    // ══════════════════════════════════════════════════════
    {
      id: "ep1",
      title: "Mahkota yang Hancur",
      subtitle: "Episode I",
      description: "Kutukan gelap mencengkeram kerajaan Aelthar. Relik kuno—Mahkota yang Hancur—memegang kunci keselamatan, atau kebinasaan. Perjalananmu dimulai di tepi Rawa Greyfen.",
      thumbnail: "⚔️",
      startScene: "intro",
      scenes: {

        // ─── INTRO ───────────────────────────────────────────
        "intro": {
          id: "intro",
          type: "scene",
          title: "Jalan Menuju Greyfen",
          bg: "swamp",
          narration: [
            "Tahun 1312 Zaman Ketiga. Wabah makhluk tak-mati telah menyebar dari rawa-rawa terkutuk Greyfen, mengancam untuk melahap Kerajaan Aelthar.",
            "Kamu adalah {NAME}, seorang {CLASS} berdarah {RACE}, dipanggil oleh seorang raja yang putus asa untuk mencari Mahkota yang Hancur—relik kuno yang konon mengikat orang mati ke kubur mereka.",
            "Desa Mosswick ada di depan, cahaya obor-nya berkedip seperti bara sekarat di langit tanpa bulan. Teriakan histeris mengambang melintasi rawa."
          ],
          speaker: "Narator",
          choices: [
            { text: "Bergegas masuk ke desa untuk membantu warga", next: "mosswick_rush", stat_effects: { morality: +10, hp: -5 } },
            { text: "Intai keliling sebelum masuk", next: "mosswick_scout", stat_effects: { morality: 0 } },
            { text: "Cari dataran tinggi untuk menilai situasi", next: "mosswick_observe", stat_effects: {} }
          ]
        },

        // ─── JALUR MOSSWICK ──────────────────────────────────
        "mosswick_rush": {
          id: "mosswick_rush",
          type: "scene",
          title: "Terjun ke Api",
          bg: "village",
          narration: [
            "Kamu menerobos gerbang yang membusuk. Tiga mayat hidup menggores pintu yang dibarikade. Isak tangis seorang anak bergema dari dalamnya.",
            "Nalurimu mengambil alih. Kamu menghunus senjata dan menyerang, menarik perhatian monster-monster itu dari barikade.",
            "Pertarungan berlangsung brutal dan singkat. Kamu mengusir mereka kembali ke kabut, tapi tidak sebelum salah satunya menggoreskan luka di sisimu.",
            "Pintu meledak terbuka. Seorang wanita tua bergegas keluar, menggendong seorang anak laki-laki. 'Semoga dewata membalasmu, musafir!' teriaknya. 'Tetua—dia tahu tentang Mahkota. Cari dia di Kapel!'"
          ],
          speaker: "Narator",
          choices: [
            { text: "Langsung menuju Kapel", next: "chapel_arrive", stat_effects: {} },
            { text: "Tanyakan dulu kepada wanita itu tentang wabah", next: "woman_info", stat_effects: { morality: +5 } }
          ]
        },

        "mosswick_scout": {
          id: "mosswick_scout",
          type: "scene",
          title: "Mata di Kegelapan",
          bg: "swamp",
          narration: [
            "Kamu mengelilingi desa dengan diam, melangkahi akar dan genangan berlumpur. Makhluk tak-mati berkerumun di gerbang utara—sekitar delapan dari mereka, lamban dan lesu.",
            "Kamu melihat sosok bertudung menyelinap keluar melalui celah di pagar selatan. Gerakannya penuh tujuan, menuju ke rawa.",
            "Kamu punya pilihan: ikuti sosok misterius itu, atau masuki desa yang kini kurang terjaga."
          ],
          speaker: "Narator",
          choices: [
            { text: "Ikuti sosok bertudung ke rawa", next: "follow_figure", stat_effects: {} },
            { text: "Masuk melalui celah selatan", next: "chapel_arrive", stat_effects: {} },
            { text: "Alihkan perhatian makhluk tak-mati dengan gangguan", next: "distraction", stat_effects: { morality: +5 } }
          ]
        },

        "mosswick_observe": {
          id: "mosswick_observe",
          type: "scene",
          title: "Si Pengamat",
          bg: "swamp",
          narration: [
            "Kamu memanjat pohon ek mati di tepi rawa. Di bawah, Mosswick bergeliat dalam kekacauan. Tapi matamu tertarik pada sesuatu yang lebih aneh—cahaya biru pucat berdenyut di balik jendela kaca patri Kapel.",
            "Lebih mencurigakan: sosok berjubah bergerak dengan sengaja di tengah kekacauan, tak tersentuh oleh makhluk tak-mati. Mereka memasuki Kapel.",
            "Kamu menghafal tata letak: dua kelompok makhluk tak-mati, satu jalur selatan yang bersih, dan rahasia apa pun yang tersembunyi di Kapel itu."
          ],
          speaker: "Narator",
          choices: [
            { text: "Turun dan ambil jalur selatan ke Kapel", next: "chapel_arrive", stat_effects: {} },
            { text: "Pelajari pola gerakan makhluk tak-mati (butuh waktu ekstra)", next: "chapel_arrive_prepared", stat_effects: { morality: 0 } }
          ]
        },

        // ─── JALUR SAMPINGAN ──────────────────────────────────────────
        "woman_info": {
          id: "woman_info",
          type: "scene",
          title: "Peringatan Tetua",
          bg: "village",
          narration: [
            "'Ini dimulai tiga malam lalu,' kata wanita tua itu, suaranya hampa karena kelelahan. 'Tetua Voss sedang melakukan ritual. Katanya dia menemukan sesuatu—mahkota patah di rawa. Mengklaim itu akan melindungi kita.'",
            "'Sebagai gantinya ia malah memanggil MEREKA.' Dia meludah ke arah mayat yang melayang-layang. 'Dia mengurung diri di Kapel. Tidak mau keluar. Tidak membiarkan kami masuk. Tapi dia... berubah.'",
            "Anak laki-laki itu menarik lengan bajumu. 'Aku melihatnya berbicara dengan yang mati. Melalui jendela. Seperti mereka mendengarkan.'"
          ],
          speaker: "Wanita Tua",
          choices: [
            { text: "Pergi ke Kapel dengan pengetahuan ini", next: "chapel_arrive_warned", stat_effects: {} },
            { text: "Cari senjata untuk persiapan menghadapi Tetua Voss", next: "chapel_arrive_armed", stat_effects: {} }
          ]
        },

        "follow_figure": {
          id: "follow_figure",
          type: "scene",
          title: "Ke Dalam Rawa",
          bg: "swamp",
          narration: [
            "Sosok itu bergerak cepat tapi kamu mengikutinya, kaki tenggelam ke lumpur yang dingin. Setelah sepuluh menit dia berhenti di kuil batu berlumut yang setengah ditelan bumi.",
            "Dia menarik tudungnya. Seorang pemuda, tidak lebih dari dua puluh tahun, dengan mata cekung yang menangkap cahaya bulan seperti koin. Dia tidak tampak terkejut melihatmu.",
            "'Aku tahu ada seseorang yang akan mengikuti,' katanya pelan. 'Aku Daran. Murid Tetua Voss—atau dulu, sebelum beliau menemukan Mahkota dan kehilangan kewarasannya. Aku tahu di mana serpihan pertama berada. Tapi dijaga oleh sesuatu yang tidak bisa kuhadapi sendirian.'"
          ],
          speaker: "Daran",
          choices: [
            { text: "\"Aku akan membantumu. Ceritakan segalanya.\"", next: "daran_alliance", stat_effects: { morality: +10 } },
            { text: "\"Mengapa aku harus mempercayaimu?\"", next: "daran_distrust", stat_effects: {} },
            { text: "\"Antar aku ke serpihan itu sekarang.\"", next: "shard_direct", stat_effects: {} }
          ]
        },

        "distraction": {
          id: "distraction",
          type: "scene",
          title: "Tipu Muslihat",
          bg: "village",
          narration: [
            "Kamu menemukan sebuah gerobak dan mendorongnya menuruni lereng. Gerobak itu menabrak pagar dengan keributan yang luar biasa—sempurna.",
            "Makhluk tak-mati berkerumun menuju kebisingan itu. Desa pun sejenak bersih. Kamu berlari menuju Kapel, menyelinap di antara bayangan.",
            "Rasa puas yang suram menyelimuti dirimu. Kadang langkah cerdas adalah langkah yang benar."
          ],
          speaker: "Narator",
          choices: [
            { text: "Masuki Kapel", next: "chapel_arrive", stat_effects: {} }
          ]
        },

        // ─── KAPEL ──────────────────────────────────────────
        "chapel_arrive": {
          id: "chapel_arrive",
          type: "scene",
          title: "Kapel Abu",
          bg: "chapel",
          narration: [
            "Pintu Kapel tidak terkunci tapi berat. Di dalam, bangku-bangku telah dibalikkan menjadi lingkaran kasar. Lilin-lilin menyala dalam pola yang menyakitkan jika dipandang langsung.",
            "Di altar berlutut Tetua Voss—pria kurus berusia enam puluhan, jubah putihnya dinodai noda-noda gelap. Di hadapannya, di atas kain beludru, tergeletak dua serpihan mahkota yang menghitam.",
            "Dia tidak berbalik. 'Pahlawan lain,' ujarnya serak. 'Datang untuk mengambil apa yang tidak kamu mengerti.'"
          ],
          speaker: "Narator",
          choices: [
            { text: "\"Ceritakan tentang Mahkota itu, Tetua. Aku ingin mengerti.\"", next: "voss_talk", stat_effects: { morality: +5 } },
            { text: "\"Menjauh dari serpihan mahkota itu. Sekarang.\"", next: "voss_confront", stat_effects: {} },
            { text: "Coba rebut serpihan mahkota saat dia berlutut", next: "voss_grab", stat_effects: { morality: -15 } }
          ]
        },

        "chapel_arrive_prepared": {
          id: "chapel_arrive_prepared",
          type: "scene",
          title: "Kapel Abu",
          bg: "chapel",
          narration: [
            "Dengan pola makhluk tak-mati yang sudah kamu hafal, kamu menyelinap di antara celah patroli mereka seolah menari di antara tetes hujan. Kamu tiba di Kapel tanpa terdeteksi.",
            "Di dalam: Tetua Voss berlutut di altar, dua serpihan mahkota di hadapannya. Kamu melihat sesuatu yang tidak akan dilihat orang lain—dari atas, kamu melihat sosok ketiga bersembunyi di balkon paduan suara. Seseorang sudah mengawasi Voss.",
            "'Pahlawan lain,' Voss menggerutu tanpa berbalik. 'Datang untuk mengambil apa yang tidak kamu mengerti.'"
          ],
          speaker: "Narator",
          choices: [
            { text: "\"Ceritakan tentang Mahkota itu, Tetua.\"", next: "voss_talk", stat_effects: { morality: +5 } },
            { text: "Panggil pengintai tersembunyi di balkon", next: "reveal_watcher", stat_effects: {} },
            { text: "\"Menjauh dari serpihan mahkota itu.\"", next: "voss_confront", stat_effects: {} }
          ]
        },

        "chapel_arrive_warned": {
          id: "chapel_arrive_warned",
          type: "scene",
          title: "Tetua yang Terjatuh",
          bg: "chapel",
          narration: [
            "Di dalam Kapel, Tetua Voss berlutut di altar. Kata-kata wanita tua itu bergema di benakmu—dia berbicara dengan yang mati.",
            "Kamu mengamatinya lebih cermat sekarang. Bibirnya bergerak dalam irama yang diam. Serpihan mahkota di hadapannya berdenyut seiring napasnya.",
            "Dia berbalik perlahan, dan kamu melihat matanya: pupil sepenuhnya melebar, tidak memantulkan cahaya. Dia tidak lagi sepenuhnya dirinya sendiri.",
            "'Seharusnya kamu tidak datang,' katanya—tapi dalam dua suara. Suaranya sendiri, dan sesuatu yang lebih tua di bawahnya."
          ],
          speaker: "Tetua Voss",
          choices: [
            { text: "\"Lawan apa pun yang merasukim mu, Tetua!\"", next: "voss_fight_possession", stat_effects: { morality: +10 } },
            { text: "\"Rasukan itu belum sempurna. Bagaimana cara membebaskanmu?\"", next: "voss_talk", stat_effects: { morality: +15 } },
            { text: "Serang sebelum dia bisa bertindak", next: "voss_strike", stat_effects: { morality: -10 } }
          ]
        },

        "chapel_arrive_armed": {
          id: "chapel_arrive_armed",
          type: "scene",
          title: "Bersenjata dan Siap",
          bg: "chapel",
          narration: [
            "Kamu menemukan palu pandai besi di bangku yang tumbang—besi dingin, dengan berat yang pas. Besi melemahkan hal-hal terkutuk.",
            "Di dalam Kapel, Tetua Voss berlutut di altar. Serpihan mahkota bersinar dengan cahaya samar dan menjijikkan.",
            "'Pahlawan lain,' ujarnya serak. 'Datang untuk mengambil apa yang tidak kamu mengerti.'"
          ],
          speaker: "Narator",
          choices: [
            { text: "\"Serahkan Mahkota itu, Tetua.\" (Besi dingin di tangan)", next: "voss_iron_demand", stat_effects: {} },
            { text: "\"Ceritakan dulu tentang Mahkota itu.\"", next: "voss_talk", stat_effects: {} }
          ]
        },

        // ─── PERTEMUAN VOSS ─────────────────────────────────────────
        "voss_talk": {
          id: "voss_talk",
          type: "scene",
          title: "Tetua Berbicara",
          bg: "chapel",
          narration: [
            "Voss diam untuk sesaat yang panjang. Kemudian: 'Mahkota yang Hancur ditempa oleh Raja Maloreth Sang Abadi tiga abad lalu. Itu bukan untuk melindungi yang hidup. Itu untuk mengendalikan yang mati.'",
            "'Aku berpikir... jika aku bisa menggunakannya... aku bisa mengusir wabah itu. Sebaliknya, ia mulai memanggilku. Berbisik. Sekarang aku tidak bisa melepaskannya.'",
            "Dia mengangkat tangannya. Serpihan mahkota telah meninggalkan urat-urat gelap yang merayap naik ke kulitnya.",
            "'Ada tiga serpihan. Aku punya dua. Yang ketiga ada di Gudang Bawah Tanah tepat di bawah kapel ini. Jika kamu menghancurkan ketiganya... wabah akan berakhir. Tapi aku... mungkin tidak akan selamat dari perlepasan itu.'"
          ],
          speaker: "Tetua Voss",
          choices: [
            { text: "\"Di mana Gudang Bawah Tanah itu? Antarkan aku.\"", next: "vault_entrance", stat_effects: {} },
            { text: "\"Aku akan mencari cara lain untuk menyelamatkanmu DAN menghentikan wabah.\"", next: "find_another_way", stat_effects: { morality: +15 } },
            { text: "\"Wabah harus berakhir. Apa pun harganya.\"", next: "vault_entrance", stat_effects: { morality: -5 } }
          ]
        },

        "voss_confront": {
          id: "voss_confront",
          type: "scene",
          title: "Tetua Bangkit",
          bg: "chapel",
          narration: [
            "Voss bangkit berdiri perlahan. Dia lebih tinggi dari yang kamu kira, dan bayangan-bayangan di Kapel tampak berkumpul di sekelilingnya.",
            "'Kamu berani memerintahku? Di KAPELKU?' Suaranya membawa resonansi yang mengguncang kaca jendela.",
            "Kemudian sesuatu bergeser dalam ekspresinya—sekilas kilatan sang manusia di balik kutukan itu. 'Tidak. Tidak, kamu benar. Aku... aku bisa merasakannya menarik-narik. Menggunakanku.'",
            "Dia berlutut lagi. 'Tolong. Gudang di bawah—serpihan ketiga ada di sana. Hancurkan semuanya. Itulah satu-satunya cara.'"
          ],
          speaker: "Tetua Voss",
          choices: [
            { text: "Ambil dua serpihan dan pergi ke Gudang", next: "vault_entrance_fragments", stat_effects: {} },
            { text: "\"Ikut bersamaku. Hadapi ini bersama.\"", next: "vault_together", stat_effects: { morality: +10 } }
          ]
        },

        "voss_grab": {
          id: "voss_grab",
          type: "scene",
          title: "Harga Keserakahan",
          bg: "chapel",
          narration: [
            "Kamu menerjang ke arah serpihan-serpihan itu—",
            "Tangan Voss mencengkeram pergelangan tanganmu seperti ragum. Dia berbalik, dan matanya hitam pekat. Sosok yang mengenakan wajahnya tersenyum.",
            "'Bagus,' katanya dengan mulutnya. 'Satu wadah lagi.'",
            "Serpihan mahkota menyala putih. Rasa sakit membelah dirimu. Ketika cahaya memudar, kamu berlutut di samping Voss, dan kamu tidak lagi ingat mengapa kamu datang ke sini.",
            "Wabah mendapat pelayan baru."
          ],
          speaker: "Narator",
          ending: "ending_vessel",
          choices: [
            { text: "Oke!", next: "ending_vessel", stat_effects: {} },
          ]
        },

        "voss_fight_possession": {
          id: "voss_fight_possession",
          type: "scene",
          title: "Perang di Dalam Diri",
          bg: "chapel",
          narration: [
            "'Voss! Dengarkan suaraku!'",
            "Tubuh Tetua itu kejang. Tangannya mencakar altar. Dua suara berperang di tenggorokannya—suaranya sendiri, terengah-engah dan putus asa, dan suara Mahkota, kuno dan dingin.",
            "'Aku... aku masih ingat...' Voss megap-megap. 'Nama anakku. Lyra. Aku ingat.' Urat-urat gelap di tangannya sedikit surut.",
            "'Gudang. Di bawah bangku ketiga—sebuah pintu jebakan. Serpihan terakhir. Jika kamu menghancurkan ketiga bagian itu... sementara aku masih memiliki cukup dari diriku untuk melawan... mungkin akan berhasil.'"
          ],
          speaker: "Tetua Voss",
          choices: [
            { text: "Bergerak cepat—temukan pintu jebakan menuju Gudang", next: "vault_entrance", stat_effects: {} },
            { text: "\"Bertahanlah, Voss. Kita lakukan ini bersama.\"", next: "vault_together", stat_effects: { morality: +10 } }
          ]
        },

        "voss_strike": {
          id: "voss_strike",
          type: "scene",
          title: "Besi Dingin",
          bg: "chapel",
          narration: [
            "Kamu menyerang cepat. Voss tumbang, tidak sadar tapi masih bernapas. Cahaya gelap di matanya memudar.",
            "Dua serpihan mahkota tergeletak di beludru, lebih redup sekarang. Kamu mengambilnya. Mereka lebih ringan dari yang kamu kira—dan lebih dingin.",
            "Mencari-cari di kapel, kamu menemukan pintu jebakan di bawah bangku ketiga. Gudang."
          ],
          speaker: "Narator",
          choices: [
            { text: "Turun ke dalam Gudang", next: "vault_entrance_fragments", stat_effects: {} }
          ]
        },

        "voss_iron_demand": {
          id: "voss_iron_demand",
          type: "scene",
          title: "Perintah Besi Dingin",
          bg: "chapel",
          narration: [
            "Kamu mengangkat palu besi. Voss mundur—apa pun yang merasukinya takut pada besi dingin.",
            "'Mundur,' katamu dengan tenang. 'Siapa pun kamu. Mundur.'",
            "Kehadiran gelap itu surut seperti asap dari api. Voss ambruk, terengah-engah. Dia melihat tangannya—urat-urat itu sedikit memudar.",
            "'Gudang,' dia berhasil berkata. 'Serpihan terakhir. Kamu harus menghancurkan semuanya. Cepat, sebelum kembali.'"
          ],
          speaker: "Tetua Voss",
          choices: [
            { text: "Amankan dua serpihan dan temukan Gudang", next: "vault_entrance_fragments", stat_effects: { morality: +5 } },
            { text: "\"Bisakah kamu berjalan? Ikut bersamaku.\"", next: "vault_together", stat_effects: { morality: +10 } }
          ]
        },

        "reveal_watcher": {
          id: "reveal_watcher",
          type: "scene",
          title: "Murid Tersembunyi",
          bg: "chapel",
          narration: [
            "'Siapa di balkon itu?' kamu berseru.",
            "Suara terkejut. Kemudian langkah-langkah lambat di tangga paduan suara. Seorang pemuda turun—bermata cekung, gugup, tapi hidup.",
            "'Aku Daran,' katanya. 'Murid Tetua Voss. Aku sudah mengawasi, mencoba menemukan momen untuk bertindak, tapi aku...' Dia menelan ludah. 'Aku tidak pemberani.'",
            "'Gudang di bawah kapel menyimpan serpihan terakhir Mahkota. Tapi ada sesuatu yang menjaganya—sesuatu yang Voss panggil sebelum korupsi sepenuhnya menguasainya.'"
          ],
          speaker: "Daran",
          choices: [
            { text: "\"Bantu aku mencapai Gudang, Daran.\"", next: "vault_with_daran", stat_effects: { morality: +5 } },
            { text: "Berurusan dengan Voss dulu, baru Gudang", next: "voss_talk", stat_effects: {} }
          ]
        },

        // ─── JALUR DARAN ─────────────────────────────────────
        "daran_alliance": {
          id: "daran_alliance",
          type: "scene",
          title: "Rahasia Sang Murid",
          bg: "swamp",
          narration: [
            "Daran menghela napas lega. 'Terima kasih. Mahkota ditempa oleh Maloreth Sang Abadi—itu tidak menghentikan yang mati. Ia mengendalikan mereka. Tetua Voss tidak mengetahuinya hingga terlambat.'",
            "'Ada tiga serpihan. Tetua memiliki dua. Yang ketiga ada di Gudang Bawah Tanah di bawah Kapel, dijaga oleh ksatria draugr—salah satu penjaga Maloreth sendiri, dikubur bersama serpihan itu selama tiga abad.'",
            "'Aku punya ritual yang bisa melemahkannya—tapi aku butuh waktu untuk melakukannya. Tahan perhatiannya.' Dia menekan buku catatan lusuh ke tanganmu. 'Catatan guruku. Mungkin bisa membantu.'"
          ],
          speaker: "Daran",
          choices: [
            { text: "Pergi ke Kapel bersama", next: "vault_with_daran", stat_effects: {} },
            { text: "Pelajari buku catatan dulu (bonus pengetahuan)", next: "study_journal", stat_effects: { morality: +5 } }
          ]
        },

        "daran_distrust": {
          id: "daran_distrust",
          type: "scene",
          title: "Kepercayaan yang Diraih",
          bg: "swamp",
          narration: [
            "Daran tidak berkedip menghadapi kecurigaanmu. 'Pintar,' katanya sederhana. 'Orang asing di desa terkutuk—wajar untuk berhati-hati.'",
            "Dia menarik lengan bajunya, memperlihatkan lambang yang terpahat di lengan bawahnya: lambang Kapel. 'Meterai murid. Aku telah mengabdi kepada Tetua Voss selama tujuh tahun. Mahkota telah merampasnya dariku.'",
            "Suaranya sedikit retak. 'Aku hanya ingin menyelamatkan apa yang tersisa darinya. Maukah kamu membantuku?'"
          ],
          speaker: "Daran",
          choices: [
            { text: "\"Baiklah. Aku percayamu. Apa rencananya?\"", next: "daran_alliance", stat_effects: { morality: +5 } },
            { text: "\"Aku bekerja sendiri. Beritahu apa yang perlu kuketahui.\"", next: "shard_direct", stat_effects: {} }
          ]
        },

        "shard_direct": {
          id: "shard_direct",
          type: "scene",
          title: "Langsung ke Intinya",
          bg: "chapel",
          narration: [
            "Kamu menuju Kapel tanpa Daran. Dia memanggilmu—'Setidaknya ambil buku catatan ini!'—dan melemparnya padamu sebelum menghilang kembali ke dalam bayangan.",
            "Di dalam, Tetua Voss berlutut di altar, dua serpihan mahkota di hadapannya. Ruangan itu berbau ozon dan darah lama.",
            "Dia tidak berbalik. 'Pahlawan lain,' ujarnya serak."
          ],
          speaker: "Narator",
          choices: [
            { text: "\"Ceritakan tentang Mahkota itu, Tetua.\"", next: "voss_talk", stat_effects: {} },
            { text: "\"Menjauh dari mahkota itu. Sekarang.\"", next: "voss_confront", stat_effects: {} }
          ]
        },

        "study_journal": {
          id: "study_journal",
          type: "scene",
          title: "Catatan Sang Tetua",
          bg: "swamp",
          narration: [
            "Di bawah cahaya bulan, kamu membaca fragmen-fragmen dari buku catatan Tetua Voss. Tulisan tangannya semakin kacau menuju halaman terakhir.",
            "'Ksatria Draugr—Penjaga Maloreth—hanya bisa benar-benar dibunuh jika serpihan jangkarnya dihancurkan di hadapannya. Melukai hanya menundanya.'",
            "'Besi dingin mengganggu sinyal Mahkota. Pemegang serpihan Mahkota kehilangan sebagian kendali jika besi diperkenalkan di dekatnya.'",
            "'Tujuan sejati Mahkota: bukan untuk membangkitkan yang mati, tapi untuk membuat yang hidup lupa bahwa mereka takut mati. Itulah kutukan Maloreth yang sesungguhnya.'",
            "Kamu menutup buku catatan itu, pikiran menjadi lebih tajam. Daran menatapmu. 'Siap?'"
          ],
          speaker: "Narator",
          choices: [
            { text: "\"Siap. Ayo pergi.\"", next: "vault_with_daran", stat_effects: {} }
          ]
        },

        // ─── JALUR GUDANG ─────────────────────────────────────
        "find_another_way": {
          id: "find_another_way",
          type: "scene",
          title: "Pencarian yang Putus Asa",
          bg: "chapel",
          narration: [
            "Kamu mencari-cari Kapel dengan panik—buku-buku Voss, catatannya, altar itu sendiri. Orang tua itu mengawasimu dengan mata yang terbayang-bayang, berjuang untuk tetap ada.",
            "Di sebuah kompartemen tersembunyi di balik patung orang suci palsu, kamu menemukan sebuah gulungan: ritual Pengikatan asli. Cara untuk memisahkan inang dari pengaruh Mahkota—jika dilakukan pada saat kehancuran Mahkota.",
            "'Ada caranya,' kamu memberitahu Voss.",
            "Dia mulai menangis—emosi manusiawi pertama yang kamu lihat darinya. 'Kalau begitu, mari kita akhiri ini dengan benar.'"
          ],
          speaker: "Narator",
          choices: [
            { text: "Bawa Voss dan serpihan-serpihan ke Gudang", next: "vault_together_ritual", stat_effects: { morality: +10 } }
          ]
        },

        "vault_entrance": {
          id: "vault_entrance",
          type: "scene",
          title: "Gudang Bawah Tanah",
          bg: "vault",
          narration: [
            "Pintu jebakan di bawah bangku ketiga berderit terbuka, melepaskan udara yang berbau berabad-abad. Tangga batu turun ke dalam kegelapan yang dingin.",
            "Cahayamu menerangi ruang kubah, dindingnya diukir dengan relief orang-orang mati yang bangkit. Dan di ujung sana, di atas tumpuan batu, serpihan ketiga bersinar dengan kepalsuan yang pucat.",
            "Di depannya berdiri Sang Penjaga—draugr dalam baju besi kuno, tujuh kaki tingginya, matanya adalah dua titik api biru yang dingin.",
            "Ia berbalik ke arahmu. Perlahan. Penuh perhitungan. Ia telah menunggu."
          ],
          speaker: "Narator",
          choices: [
            { text: "Serang Sang Penjaga—pukul keras dan cepat", next: "sentinel_fight_direct", stat_effects: { hp: -15 } },
            { text: "Cari kelemahan sebelum bertempur", next: "sentinel_observe", stat_effects: {} },
            { text: "Coba raih serpihan dan hancurkan lebih dulu", next: "sentinel_shard_run", stat_effects: { hp: -10 } }
          ]
        },

        "vault_entrance_fragments": {
          id: "vault_entrance_fragments",
          type: "scene",
          title: "Gudang Bawah Tanah",
          bg: "vault",
          narration: [
            "Dua serpihan di tanganmu berdenyut lebih cepat saat kamu turun ke tangga—tertarik ke arah yang ketiga.",
            "Gudang terbuka di hadapanmu. Relief batu orang-orang mati yang bangkit melapisi setiap dinding. Dan di sana: Sang Penjaga, baju besinya kuno dan masif, matanya terbakar biru dingin.",
            "Tapi kamu memperhatikan sesuatu—serpihan di tanganmu tampak sedikit membingungkannya. Kepala Sang Penjaga miring, seolah menerima sinyal yang bertentangan.",
            "Mungkin kamu bisa memanfaatkan ini."
          ],
          speaker: "Narator",
          choices: [
            { text: "Gunakan serpihan sebagai umpan—pancing Sang Penjaga menjauh dari tumpuan", next: "sentinel_lure", stat_effects: {} },
            { text: "Pertempuran langsung—akhiri ini dengan cepat", next: "sentinel_fight_direct", stat_effects: { hp: -15 } }
          ]
        },

        "vault_with_daran": {
          id: "vault_with_daran",
          type: "scene",
          title: "Berdua Melawan Kegelapan",
          bg: "vault",
          narration: [
            "Daran memandumu melalui lorong tersembunyi di balik altar—rute yang lebih panjang, tapi membawamu ke ruang samping Gudang.",
            "Kamu mengintip ke ruang utama. Sang Penjaga berdiri tak bergerak di depan serpihan yang bersinar.",
            "'Ritualnya butuh tiga menit,' Daran berbisik. 'Aku akan mulai. Jauhkan ia dariku.'",
            "Dia mulai menggambar simbol-simbol di lantai dengan tangan yang gemetar. Kepala Sang Penjaga perlahan berbalik."
          ],
          speaker: "Narator",
          choices: [
            { text: "Berdiri di antara Daran dan Sang Penjaga", next: "sentinel_protect_daran", stat_effects: { morality: +10, hp: -10 } },
            { text: "Serang Sang Penjaga dari belakang saat Daran menggambar", next: "sentinel_flanked", stat_effects: { hp: -5 } }
          ]
        },

        "vault_together": {
          id: "vault_together",
          type: "scene",
          title: "Sekutu yang Tidak Terduga",
          bg: "vault",
          narration: [
            "Voss menggenggam lenganmu dengan tangan yang gemetar dan membawamu ke pintu jebakan. Saat turun, dia bertarung dalam pertempuran yang terlihat nyata melawan apa pun yang hidup dalam serpihan Mahkota.",
            "'Sang Penjaga,' dia megap-megap, 'tidak akan... menyerang pemegang Mahkota. Aku masih memiliki cukup... tanda itu. Aku bisa mengalihkan perhatiannya. Kamu harus mencapai serpihan ketiga. Hancurkan semuanya bersama-sama. Serentak.'",
            "Dia menatapmu dengan mata yang jernih—paling waras yang pernah dia alami. 'Aku mungkin tidak akan selamat dari perlepasan itu. Tapi aku butuh kamu untuk melakukannya bagaimanapun juga. Tolong.'"
          ],
          speaker: "Tetua Voss",
          choices: [
            { text: "\"Aku mengerti. Mari kita lakukan ini.\"", next: "vault_climax_together", stat_effects: {} },
            { text: "\"Aku tidak akan menyerah mencari cara untuk menyelamatkanmu.\"", next: "vault_together_ritual", stat_effects: { morality: +15 } }
          ]
        },

        "vault_together_ritual": {
          id: "vault_together_ritual",
          type: "scene",
          title: "Ritual Pengikatan",
          bg: "vault",
          narration: [
            "Di Gudang, dengan Sang Penjaga yang mengancam dan serpihan yang bersinar, kamu mengeluarkan gulungan perkamen—Ritual Pengikatan.",
            "Voss membacanya. Tangannya gemetar. 'Ini... ini bisa berhasil. Tapi seseorang harus melakukan ritual padaku sementara aku memegang Mahkota bersama-sama. Imbasnya akan...'",
            "Dia melihat Sang Penjaga. Lalu melihatmu.",
            "'Kita mungkin punya waktu dua menit sebelum ia bergerak. Apa pilihanmu?'"
          ],
          speaker: "Tetua Voss",
          choices: [
            { text: "Lakukan Ritual Pengikatan pada Voss sementara dia memegang Mahkota", next: "ending_salvation", stat_effects: {} },
            { text: "Hancurkan ketiga serpihan—terima bahwa Voss mungkin hilang", next: "ending_sacrifice", stat_effects: {} }
          ]
        },

        // ─── ADEGAN PERTEMPURAN PENJAGA ──────────────────────────────
        "sentinel_fight_direct": {
          id: "sentinel_fight_direct",
          type: "scene",
          title: "Baja dan Tulang",
          bg: "vault",
          narration: [
            "Sang Penjaga bergerak dengan ketepatan yang mengerikan. Meski terbuat dari tulang belulang kuno, ia bertarung seperti seorang ahli.",
            "Kamu kena serangan. Lengan perisaimu mati rasa. Tapi kamu lebih cepat, dan kamu mempelajari polanya.",
            "Pukulan demi pukulan, kamu mendorongnya kembali ke tumpuan. Baju besinya retak. Mata birunya berkelip.",
            "Momenmu: saat ia terhuyung, kamu merebut serpihan ketiga dari tumpuan."
          ],
          speaker: "Narator",
          choices: [
            { text: "Hancurkan ketiga serpihan bersama-sama di lantai batu", next: "ending_destruction", stat_effects: {} },
            { text: "Berhenti—cari cara untuk mengakhiri ini tanpa kehancuran penuh", next: "vault_together_ritual", stat_effects: {} }
          ]
        },

        "sentinel_observe": {
          id: "sentinel_observe",
          type: "scene",
          title: "Kenali Musuhmu",
          bg: "vault",
          narration: [
            "Kamu berdiam diri. Sang Penjaga bergerak dalam pola patroli lambat—tiga langkah ke kiri, berhenti, tiga langkah ke kanan. Serpihan di tumpuan adalah titik jangkar.",
            "Kamu memperhatikan: setiap kali kamu bergerak ke kanan, Sang Penjaga mengikuti ke kanan. Ia merespons gerakan, bukan penglihatan.",
            "Jika kamu melempar sesuatu ke kiri dan bergerak ke kanan—kamu bisa mencapai tumpuan di momen kebingungan itu.",
            "Kamu melempar batu lepas ke kiri. Sang Penjaga terlonjak ke arah itu. Kamu lari ke kanan."
          ],
          speaker: "Narator",
          choices: [
            { text: "Rebut serpihan ketiga dan hancurkan ketiganya", next: "ending_destruction", stat_effects: {} }
          ]
        },

        "sentinel_shard_run": {
          id: "sentinel_shard_run",
          type: "scene",
          title: "Larian",
          bg: "vault",
          narration: [
            "Kamu berlari menuju tumpuan. Sang Penjaga berpivot dengan kecepatan yang mustahil dan menghadang—kepalan tangannya mengenai pundakmu dan menyebarmu.",
            "Kamu bangkit sebelum ia mencapaimu. Berdarah tapi berpikiran jernih. Serpihan itu sudah dekat. Satu dorongan lagi.",
            "Kamu berpura-pura ke kiri, lari ke kanan, dan menutup jari-jarimu di sekeliling serpihan yang dingin. Sang Penjaga meraung—suara seperti es yang retak di atas danau yang dalam."
          ],
          speaker: "Narator",
          choices: [
            { text: "Hancurkan ketiga serpihan bersama-sama—akhiri sekarang", next: "ending_destruction", stat_effects: { hp: -5 } },
            { text: "Gunakan rasa sakit dan amarah—salurkan ke dalam ritual", next: "vault_together_ritual", stat_effects: {} }
          ]
        },

        "sentinel_lure": {
          id: "sentinel_lure",
          type: "scene",
          title: "Pancingan",
          bg: "vault",
          narration: [
            "Kamu mengangkat serpihan-serpihan, membiarkannya berdenyut dan bersinar. Sang Penjaga mengikuti sinyal—dia melangkah dua langkah dari tumpuan, lalu tiga.",
            "Kamu mundur ke dinding jauh. Ia mengikuti, kebingungan oleh panggilan Mahkota yang terbagi.",
            "Momenmu: kamu jatuh dan berguling melewatinya, mencapai tumpuan. Tanganmu menutup serpihan ketiga. Ketiga bagian akhirnya bersatu.",
            "Sang Penjaga membeku. Lalu perlahan berbalik."
          ],
          speaker: "Narator",
          choices: [
            { text: "Hancurkan ketiga serpihan sebelum ia bisa pulih", next: "ending_destruction", stat_effects: {} }
          ]
        },

        "sentinel_protect_daran": {
          id: "sentinel_protect_daran",
          type: "scene",
          title: "Perisai dan Tekad",
          bg: "vault",
          narration: [
            "Kamu menempatkan diri di antara Daran dan Sang Penjaga. Ia memukulmu keras—lagi, lagi. Kamu bertahan.",
            "Di belakangmu, Daran merapal, suaranya meninggi. Simbol-simbol di lantai bersinar emas.",
            "'Selesai!' Daran berseru.",
            "Sang Penjaga berhenti. Baju besinya retak. Mata birunya padam, satu demi satu, seperti lilin yang dipadamkan. Ia ambruk ke lantai—tulang-tulang kuno, tidak lebih.",
            "Serpihan ketiga menggelinding dari tumpuan, cahayanya padam."
          ],
          speaker: "Narator",
          choices: [
            { text: "Bawa ritual Daran dan ketiga serpihan ke permukaan untuk perlepasan terakhir", next: "ending_triumph", stat_effects: {} }
          ]
        },

        "sentinel_flanked": {
          id: "sentinel_flanked",
          type: "scene",
          title: "Terjepit di Antara",
          bg: "vault",
          narration: [
            "Serangan mengapitmu membuat Sang Penjaga oleng, memberi Daran waktu. Ia berbalik ke arahmu, mengabaikan ritual.",
            "Kamu mundur, terus membuatnya terlibat. Cahaya ritual Daran semakin terang. Gerakan Sang Penjaga mulai tersendat-sendat.",
            "'Sekarang!' Daran berseru.",
            "Cahaya itu melonjak. Sang Penjaga ambruk di tengah ayunan. Serpihan ketiga redup dan menjadi dingin."
          ],
          speaker: "Narator",
          choices: [
            { text: "Ambil serpihan dan selesaikan perlepasan di atas", next: "ending_triumph", stat_effects: {} }
          ]
        },

        "vault_climax_together": {
          id: "vault_climax_together",
          type: "scene",
          title: "Bersama ke Dalam Kegelapan",
          bg: "vault",
          narration: [
            "Voss melangkah maju, serpihan Mahkota di tangannya. Sang Penjaga berbalik—dan berhenti. Ia mengenali pemegang Mahkota.",
            "Di momen itu, kamu mencapai tumpuan, menutup tangan di sekeliling serpihan ketiga.",
            "Ketiga bagian merespons satu sama lain, saling menarik. Cahaya dingin meningkat menjadi sesuatu yang hampir indah.",
            "'Sekarang,' Voss berkata dengan tenang. 'Lakukan sekarang, kawan.'"
          ],
          speaker: "Tetua Voss",
          choices: [
            { text: "Hancurkan ketiga serpihan secara serentak", next: "ending_sacrifice", stat_effects: {} }
          ]
        },

        // ─── AKHIRAN ─────────────────────────────────────────
        "ending_destruction": {
          id: "ending_destruction",
          type: "ending",
          title: "Mahkota Hancur",
          bg: "vault",
          ending_id: "ending_destruction",
          ending_name: "Sang Penghancur",
          ending_icon: "💥",
          rarity: "common",
          narration: [
            "Ketiga serpihan menyatu dengan suara seperti petir di katedral.",
            "Cahayanya membutakan. Sang Penjaga larut. Di suatu tempat di atas, kamu mendengar wabah tak-mati ambruk—tubuh-tubuh jatuh, malam menjadi sepi yang tiba-tiba dan penuh rasa syukur.",
            "Ketika cahaya memudar, kamu berdiri di ruang bawah tanah yang gelap dengan tiga tumpukan abu hitam.",
            "Kamu naik kembali ke permukaan. Desa Mosswick masih berdiri. Yang mati tetap mati.",
            "Tetua Voss ditemukan terlipat di altar, hidup tapi hampa—seolah sesuatu yang esensial telah dikeluarkan bersama kutukan itu.",
            "Mereka menyebutmu pahlawan. Kamu menerima gelar itu. Tapi di malam hari, kamu masih melihat mata biru dingin Sang Penjaga, dan bertanya-tanya hal-hal kuno apa lagi yang tertidur di bawah kapel-kapel yang terlupakan."
          ],
          speaker: "Narator"
        },

        "ending_salvation": {
          id: "ending_salvation",
          type: "ending",
          title: "Yang Tak Terpatahkan",
          bg: "chapel",
          ending_id: "ending_salvation",
          ending_name: "Sang Penyelamat",
          ending_icon: "✨",
          rarity: "rare",
          narration: [
            "Kata-kata ritual jatuh dari bibirmu seperti air. Voss bergidik—kamu bisa melihat cengkeraman Mahkota putus, urat-urat gelap memudar, napasnya menjadi stabil.",
            "Dia memegang tiga serpihan yang bersatu saat mereka berdenyut dan menjerit dengan kekuatan kuno. Dia tidak patah.",
            "'Lepaskan,' dia berkata kepada Mahkota. 'Raja-mu sudah lama mati. Lepaskan.'",
            "Serpihan-serpihan meledak dalam gelombang cahaya putih yang melewati batu, tulang, setiap makhluk tak-mati di kerajaan.",
            "Ketika cahaya sirna, Voss duduk di lantai Gudang, hidup. Sepenuhnya dirinya sendiri. Menangis.",
            "Wabah berakhir. Sang Tetua hidup. Dan kamu—kamu telah menemukan bahwa terkadang jalan yang paling sulit menghasilkan fajar yang paling cerah.",
            "Lagu-lagu akan dinyanyikan tentang malam ini. Bukan tentang kehancuran, tapi tentang belas kasih dalam kegelapan."
          ],
          speaker: "Narator"
        },

        "ending_sacrifice": {
          id: "ending_sacrifice",
          type: "ending",
          title: "Harga Kedamaian",
          bg: "vault",
          ending_id: "ending_sacrifice",
          ending_name: "Sang Perlepas",
          ending_icon: "🕯️",
          rarity: "rare",
          narration: [
            "Ketiga serpihan saling menghancurkan di tanganmu. Cahayanya total.",
            "Voss tidak bersuara. Dia hanya... menghilang. Mahkota telah terlalu jauh terjalin dengan apa yang dia miliki.",
            "Wabah mati bersamanya. Setiap mayat di kerajaan kembali ke tanah yang jujur. Malam menjadi hening.",
            "Kamu membawa jubah Voss yang kosong keluar dari Gudang. Kamu tidak memberitahu warga apa yang terjadi—hanya bahwa Sang Tetua mati sebagai pahlawan, yang memang benar.",
            "Mosswick bertahan. Aelthar bertahan. Harga keselamatan itu memiliki nama, dan itu adalah Voss, dan kamu tidak akan melupakannya.",
            "Bertahun-tahun kemudian, kamu akan mengajar orang lain: beberapa monster tidak bisa dikalahkan dengan bersih. Pilihlah pengorbananmu dengan bijak, dan jangan pernah melupakan siapa yang membayar kemenanganmu."
          ],
          speaker: "Narator"
        },

        "ending_triumph": {
          id: "ending_triumph",
          type: "ending",
          title: "Persekutuan yang Tak Terduga",
          bg: "chapel",
          ending_id: "ending_triumph",
          ending_name: "Penjaga Ikatan",
          ending_icon: "🤝",
          rarity: "uncommon",
          narration: [
            "Dengan Sang Penjaga yang dikalahkan dan ketiga serpihan di tangan, kamu dan Daran kembali ke kapel.",
            "Daran melakukan ritual terakhir di atas tubuh Voss yang tidak sadar. Kekuatan Mahkota terkuras dengan aman, ditarik ke lingkaran ritual dan tersebar.",
            "Ketika Voss terbangun, dia tidak ingat tiga hari terakhir. Dia melihat Daran—melihatmu—dengan mata yang jernih.",
            "'Kamu baik-baik saja,' Daran bernapas, setengah tertawa, setengah menangis.",
            "Desa bertahan. Sang Tetua hidup. Daran menjadi setara gurunya alih-alih sekadar muridnya.",
            "Kamu meninggalkan Mosswick saat fajar, jalan terbuka di depanmu. Kamu tidak melakukan ini sendirian. Itu bukan kelemahan—itulah cara hal-hal besar dilakukan.",
            "Kerajaan menyebutmu Sahabat Mosswick. Tapi jabat tangan Daran saat berpisah lebih berarti dari gelar apa pun."
          ],
          speaker: "Narator"
        },

        "ending_vessel": {
          id: "ending_vessel",
          type: "ending",
          title: "Suara Baru Mahkota",
          bg: "chapel",
          ending_id: "ending_vessel",
          ending_name: "Yang Terjatuh",
          ending_icon: "💀",
          rarity: "secret",
          narration: [
            "Mahkota tidak membunuhmu. Tidak ada alasan untuk melakukannya.",
            "Dalam bulan-bulan yang mengikuti, dua mahkota berbaris berdampingan melintasi kerajaan: Tetua Voss dan orang yang datang untuk menghentikannya.",
            "Wabah menyebar. Yang hidup mundur. Kerajaan Aelthar menjadi sesuatu yang lain—kerajaan orang-orang mati yang sabar, menunggu dunia untuk bergabung dengan mereka.",
            "Di suatu tempat dalam reruntuhan dirimu yang dulu, sesuatu masih ingat memilih dengan salah.",
            "Tapi kenangan itu semakin memudar setiap harinya.",
            "Ini bukan akhiran yang kamu inginkan. Tapi ini adalah akhiran yang memilihmu.",
            "Beberapa pintu, sekali terbuka, tidak bisa ditutup dari dalam."
          ],
          speaker: "Narator"
        }
      }
    },

    // ══════════════════════════════════════════════════════
    // EPISODE 2: BISIKAN YANG BERONGGA
    // ══════════════════════════════════════════════════════
    {
      id: "ep2",
      title: "Bisikan yang Berongga",
      subtitle: "Episode II",
      description: "Sebagai 'Yang Ditandai' setelah peristiwa Mahkota, kamu tiba di Lembah Berbisik—di mana realitas tidak stabil dan pilihan-pilihanmu menciptakan riak yang tak terduga. Sistem Efek Kupu-kupu: kepercayaan, korupsi, dan pengetahuan membentuk nasibmu secara tersembunyi.",
      thumbnail: "🌫️",
      startScene: "ep2_intro",
      scenes: {

        // ─── INTRO EP2 ────────────────────────────────────────
        "ep2_intro": {
          id: "ep2_intro",
          type: "scene",
          title: "Yang Ditandai",
          bg: "swamp",
          narration: [
            "Berminggu-minggu setelah peristiwa Mahkota yang Hancur, kamu masih merasakan bekasnya—bekas tak kasat mata di jiwamu. Orang-orang memanggilmu 'Yang Ditandai'. Beberapa dengan hormat. Beberapa dengan takut.",
            "Jalan membawamu ke utara, menuju kawasan yang dikenal sebagai Lembah Berbisik. Pedagang-pedagang menghindarinya. Peta tidak mencantumkannya. Mereka yang pernah masuk berbicara tentang bayangan yang bergerak sendiri dan suara yang memanggil nama mereka.",
            "Kamu merasakan tarikan sebelum kamu melihat kabut. Bukan tarikan yang berbahaya—lebih seperti ingatan akan sesuatu yang belum pernah kamu alami. Lembah sepertinya mengenalmu.",
            "Di tepi kabut, sesosok wanita berdiri menunggumu."
          ],
          speaker: "Narator",
          choices: [
            { text: "Dekati wanita itu dengan hati-hati", next: "ep2_meet_elira_trust", stat_effects: { trust: +1 } },
            { text: "Lewati tanpa berbicara", next: "ep2_meet_elira_ignore", stat_effects: {} },
            { text: "Ancam dia untuk menjelaskan kehadirannya", next: "ep2_meet_elira_threaten", stat_effects: { corruption: +1 } }
          ]
        },

        // ─── PERTEMUAN ELIRA ──────────────────────────────────
        "ep2_meet_elira_trust": {
          id: "ep2_meet_elira_trust",
          type: "scene",
          title: "Elira, Sang Pendeta",
          bg: "swamp",
          narration: [
            "Wanita itu mengenakan jubah abu-abu pucat yang tampak terlalu tipis untuk udara dingin ini. Matanya—warna amber yang tidak biasa—menatapmu tanpa gentar.",
            "'Aku sudah menunggumu,' katanya. 'Bukan kamu secara spesifik—tapi seseorang sepertimu. Yang Ditandai.' Dia menunjuk ke arah kabut. 'Namaku Elira. Aku pendeta dari ordo yang dilupakan. Lembah ini sekarat, dan yang membuatnya sekarat tidak bisa dihentikan dari luar.'",
            "'Aku perlu masuk bersamamu. Ada ritual yang harus dilakukan di Inti Lembah sebelum bulan purnama berikutnya—dua hari dari sekarang. Kamu memiliki tanda yang dibutuhkan untuk melewati penjaga-penjaganya.'",
            "Matanya mencari wajahmu. 'Aku tidak bisa memaksamu. Tapi jika Lembah ini sepenuhnya runtuh, kota-kota di sekitarnya akan menjadi yang berikutnya.'"
          ],
          speaker: "Elira",
          choices: [
            { text: "\"Aku percayamu. Mari kita pergi.\"", next: "ep2_broken_village", stat_effects: { trust: +1 } },
            { text: "\"Aku akan membantumu, tapi aku perlu tahu lebih banyak dulu.\"", next: "ep2_elira_questions", stat_effects: { knowledge: +1 } },
            { text: "\"Aku akan masuk sendiri. Tunggu di sini.\"", next: "ep2_broken_village_solo", stat_effects: {} }
          ]
        },

        "ep2_meet_elira_ignore": {
          id: "ep2_meet_elira_ignore",
          type: "scene",
          title: "Jalan yang Sunyi",
          bg: "swamp",
          narration: [
            "Kamu berjalan melewatinya tanpa sepatah kata. Dia tidak mencoba menghentikanmu.",
            "'Aku mengerti,' terdengar suaranya di belakangmu, tenang dan tanpa tuduhan. 'Yang Ditandai belajar tidak mudah percaya. Aku akan mengikutimu dari jauh. Bukan untuk memata-matai—tapi di Lembah ini, lebih aman berdua.'",
            "Entah mengapa, kamu tidak menolak. Mungkin nada suaranya. Mungkin kamu tidak ingin benar-benar sendirian di tempat di mana kabut berbisik namamu.",
            "Kamu memasuki Lembah, dan dia mengikutimu dengan jarak yang sopan."
          ],
          speaker: "Narator",
          choices: [
            { text: "Izinkan dia mengikuti", next: "ep2_broken_village", stat_effects: {} },
            { text: "Masuk lebih cepat dan biarkan dia tertinggal", next: "ep2_broken_village_solo", stat_effects: {} }
          ]
        },

        "ep2_meet_elira_threaten": {
          id: "ep2_meet_elira_threaten",
          type: "scene",
          title: "Bayangan yang Panjang",
          bg: "swamp",
          narration: [
            "'Jelaskan dirimu,' kamu berkata dengan tajam, tangan di gagang senjata.",
            "Wanita itu tidak mundur. Tidak sedikit pun. Matanya amber yang tidak biasa melihatmu dengan sesuatu yang sangat mirip kesedihan.",
            "'Tentu,' katanya dengan tenang. 'Namaku Elira. Aku pendeta. Aku menunggu karena Lembah ini akan menghancurkan dirimu jika kamu masuk tanpa panduan.' Sebuah jeda. 'Namun keputusanmu ada di tanganmu.'",
            "Kamu merasakan sesuatu bergeser di udara—seperti lembah mengamati interaksi ini dan mengingatnya."
          ],
          speaker: "Elira",
          choices: [
            { text: "\"Maaf. Aku terlalu waspada. Ceritakan lebih lanjut.\"", next: "ep2_meet_elira_trust", stat_effects: { trust: +1, corruption: -1 } },
            { text: "Biarkan dia berbicara tapi tetap curiga", next: "ep2_broken_village", stat_effects: {} },
            { text: "Masuk ke Lembah tanpa mendengarkan lebih lanjut", next: "ep2_broken_village_solo", stat_effects: {} }
          ]
        },

        "ep2_elira_questions": {
          id: "ep2_elira_questions",
          type: "scene",
          title: "Jawaban yang Mengungkapkan",
          bg: "swamp",
          narration: [
            "Elira tampaknya lega karena kamu bertanya. 'Lembah Berbisik terbentuk tiga ratus tahun lalu—pada saat yang sama ketika Mahkota yang kamu hancurkan ditempa, tidak kebetulan. Maloreth juga bereksperimen di sini.'",
            "'Di Inti Lembah ada Cermin Tidur—artefak yang mencatat semua jiwa yang melewati batas Lembah. Jika ia penuh... ia pecah. Dan semua jiwa yang tersimpan di dalamnya dilepaskan sekaligus. Itu akan menciptakan gelombang tak-mati yang menjadikan wabah Aelthar seperti gangguan kecil.'",
            "'Ritualku bisa menguras Cermin dengan aman. Tapi hanya Yang Ditandai yang bisa mendekatinya—Cermin mengenali tanda Maloreth.' Dia menatap langsung ke matamu. 'Apakah kamu masuk bersamaku?'"
          ],
          speaker: "Elira",
          choices: [
            { text: "\"Ya. Kita pergi sekarang.\"", next: "ep2_broken_village", stat_effects: { trust: +1, knowledge: +1 } },
            { text: "\"Aku akan mempertimbangkannya di perjalanan.\"", next: "ep2_broken_village", stat_effects: { knowledge: +1 } }
          ]
        },

        // ─── DESA YANG HANCUR ──────────────────────────────────
        "ep2_broken_village": {
          id: "ep2_broken_village",
          type: "scene",
          title: "Desa yang Hancur",
          bg: "village",
          narration: [
            "Di dalam kabut Lembah, kamu menemukan sebuah desa—atau apa yang tersisa darinya. Rumah-rumah telah terbakar dan dibangun kembali berkali-kali, dindingnya melapisi diri mereka sendiri seperti cincin pohon.",
            "Para penyintas berkumpul di sekitar api yang sekarat. Wajah-wajah yang kelelahan—terlalu tua, terlalu muda, atau terlalu hancur untuk dikategorikan. Salah satu dari mereka melihatmu dan berdiri.",
            "'Yang Ditandai,' kata pria itu. Bukan pertanyaan. 'Kami mendengar seseorang sepertimu akan datang.' Matanya mencari Elira, mengangguk seolah mengenalinya. 'Lembah mengambil beberapa dari kami tadi malam. Sebagian menghilang, sebagian... kembali berbeda. Kami butuh bantuan.'"
          ],
          speaker: "Narator",
          choices: [
            { text: "Bantu mereka mengatur pertahanan desa", next: "ep2_help_village", stat_effects: { trust: +1 } },
            { text: "Curi persediaan mereka—kamu butuh perbekalan untuk perjalanan", next: "ep2_steal_village", stat_effects: { corruption: +1 } },
            { text: "Tanya mereka tentang asal-usul Lembah", next: "ep2_ask_village", stat_effects: { knowledge: +1 } }
          ]
        },

        "ep2_broken_village_solo": {
          id: "ep2_broken_village_solo",
          type: "scene",
          title: "Seorang Diri di Kabut",
          bg: "swamp",
          narration: [
            "Kabut menutup di belakangmu. Kamu sendirian di Lembah—atau begitu rasanya. Suara-suara berbisik di tepi pendengaran, tapi tidak ada yang bisa kamu bedakan.",
            "Kamu menemukan desa yang hancur. Para penyintas melihatmu dengan campuran harapan dan rasa takut.",
            "'Yang Ditandai,' kata seorang wanita tua. 'Tidak ada yang lain bersamamu?' Kekhawatirannya terasa seperti lebih dari sekedar basa-basi.",
            "Di kejauhan, melalui bangunan-bangunan yang hancur, kamu bisa melihat cahaya biru pucat berkedip-kedip. Sesuatu di arah itu memanggilmu."
          ],
          speaker: "Narator",
          choices: [
            { text: "Dekati para penyintas dan tawarkan bantuan", next: "ep2_help_village", stat_effects: { trust: +1 } },
            { text: "Abaikan desa dan ikuti cahaya biru", next: "ep2_mirror_lake_direct", stat_effects: {} },
            { text: "Tanya mereka tentang Lembah", next: "ep2_ask_village", stat_effects: { knowledge: +1 } }
          ]
        },

        "ep2_help_village": {
          id: "ep2_help_village",
          type: "scene",
          title: "Tangan yang Membantu",
          bg: "village",
          narration: [
            "Kamu menghabiskan beberapa jam membantu para penyintas—memperbaiki pagar, mengumpulkan bahan bakar, memeriksa yang terluka.",
            "Seorang gadis kecil yang matanya terlalu tua untuk usianya menarik tanganmu. 'Yang Ditandai,' bisiknya. 'Ada cermin di danau. Ibuku melihat ke dalamnya dan tidak pulang dengan cara yang sama. Tapi juga...' Dia ragu-ragu.",
            "'...Ada seorang pria di sana sebelum kabut. Dia mengatakan cermin itu menunjukkan kebenaran. Dia terlihat senang ketika pergi. Tapi senangnya tampak salah, seperti boneka yang dipaksakan tersenyum.'",
            "Kepercayaan para penyintas terasa tulus. Sebuah wanita memberimu roti dan semangkuk sup panas. Kecil, tapi dirasakan."
          ],
          speaker: "Gadis Kecil",
          choices: [
            { text: "Pergi ke Danau Cermin dengan berhati-hati", next: "ep2_mirror_lake", stat_effects: {} },
            { text: "Tanyakan lebih lanjut tentang pria yang tampak senang itu", next: "ep2_investigate_man", stat_effects: { knowledge: +1 } }
          ]
        },

        "ep2_steal_village": {
          id: "ep2_steal_village",
          type: "scene",
          title: "Bayang-bayang Pencuri",
          bg: "village",
          narration: [
            "Saat para penyintas tertidur, kamu mengambil dari persediaan mereka—makanan kering, seutas tali, sebuah lentera.",
            "Ini berhasil. Tapi saat kamu pergi, kamu melihat seorang anak kecil yang terbangun menatapmu. Dia tidak mengatakan apa-apa. Dia hanya memperhatikan.",
            "Kabut di luar seperti menjadi lebih tebal saat kamu melewatinya. Atau mungkin itu imajinasimu.",
            "Lembah terasa berbeda sekarang—lebih memperhatikan, lebih sadar. Seperti kamu telah mengonfirmasi sesuatu tentang dirimu sendiri, dan Lembah setuju."
          ],
          speaker: "Narator",
          choices: [
            { text: "Lanjutkan ke Danau Cermin", next: "ep2_mirror_lake", stat_effects: {} }
          ]
        },

        "ep2_ask_village": {
          id: "ep2_ask_village",
          type: "scene",
          title: "Catatan yang Tersebar",
          bg: "village",
          narration: [
            "Pria tua itu—pemimpin desa, agaknya—duduk bersamamu di dekat api.",
            "'Lembah ini sudah ada lebih lama dari desa kami. Kakek buyutku mengatakan itu selalu berbisik, tapi baik. Sekarang bisikannya semakin keras dan semakin lapar.'",
            "'Ada danau di tengah—Danau Cermin, kami menyebutnya. Sebelum kabut, wisatawan datang untuk melihat penglihatannya. Setelah kabut...' Dia menggelengkan kepalanya. 'Beberapa yang melihat ke dalamnya kembali berubah. Yang lain tidak kembali sama sekali.'",
            "'Di luar danau ada Inti Lembah. Tidak ada yang pernah datang kembali dari sana dan berbicara tentang apa yang mereka temukan. Kami berhenti mencoba.' Matanya memperhatikanmu. 'Kamu tidak terlihat seperti seseorang yang akan berhenti mencoba.'"
          ],
          speaker: "Pria Tua",
          choices: [
            { text: "Pergi ke Danau Cermin", next: "ep2_mirror_lake", stat_effects: {} },
            { text: "Tanya tentang ritual untuk menguras Cermin", next: "ep2_ritual_knowledge", stat_effects: { knowledge: +1 } }
          ]
        },

        "ep2_investigate_man": {
          id: "ep2_investigate_man",
          type: "scene",
          title: "Jejak yang Ditinggalkan",
          bg: "village",
          narration: [
            "Para penyintas tidak banyak tahu tentang pria itu—hanya bahwa dia datang dari timur dan berbicara tentang 'melihat wajah aslinya' di danau.",
            "Tapi seorang anak laki-laki membantumu menemukan sesuatu: sebuah buku catatan kecil yang ditinggalkan di balik bebatuan. Tulisan tangannya rapi tapi semakin berantakan.",
            "Entri terakhir berbunyi: 'Cermin tidak menunjukkan kebenaran. Ia menunjukkan apa yang ingin kamu lihat. Perbedaannya lebih berbahaya dari yang kamu kira. Jika kamu membaca ini—jangan pandang terlalu lama.'",
            "Di bawah tulisan itu: sketsa lingkaran dengan spiral di dalamnya. Lambang yang sama yang kamu lihat pada Mahkota yang Hancur."
          ],
          speaker: "Narator",
          choices: [
            { text: "Simpan buku catatan itu dan pergi ke danau dengan pengetahuan baru", next: "ep2_mirror_lake", stat_effects: { knowledge: +1 } }
          ]
        },

        "ep2_ritual_knowledge": {
          id: "ep2_ritual_knowledge",
          type: "scene",
          title: "Pengetahuan Kuno",
          bg: "village",
          narration: [
            "Pria tua itu mengambil napas panjang. 'Ada yang diajarkan leluhur kami. Cermin dapat dikosongkan—tapi hanya jika seseorang menawarkan kenangan sejati sebagai gantinya. Bukan kenangan yang ingin kamu berikan. Yang paling berharga.'",
            "'Apakah itu benar? Aku tidak tahu. Aku belum pernah mencobanya.' Dia menatap tangannya yang tua. 'Tapi aku juga tidak pernah cukup berani untuk pergi ke danau itu sendiri.'",
            "Kamu merenungkan kata-katanya saat kamu berdiri. Elira—jika dia bersamamu—memberikan anggukan kecil yang hampir tidak terlihat. Dia juga mendengar."
          ],
          speaker: "Pria Tua",
          choices: [
            { text: "Pergi ke Danau Cermin dengan pemahaman baru", next: "ep2_mirror_lake", stat_effects: { knowledge: +1 } }
          ]
        },

        // ─── DANAU CERMIN ──────────────────────────────────────
        "ep2_mirror_lake": {
          id: "ep2_mirror_lake",
          type: "scene",
          title: "Danau Cermin",
          bg: "vault",
          narration: [
            "Danau itu tidak seperti yang kamu bayangkan. Airnya benar-benar diam—tidak ada riak, tidak ada pantulan angin, tidak ada gerakan sama sekali. Permukaannya seperti kaca yang telah disepuh dengan perak tua.",
            "Dan kemudian kamu melihat pantulannya. Bukan penulanmu sendiri—bukan tepat. Bayangan di air bergerak satu langkah terlambat, menoleh ke arah yang berbeda, tersenyum saat kamu tidak tersenyum.",
            "Elira—jika dia bersamamu—berdiri jauh dari tepi. 'Ini lebih kuat dari yang kuingat,' dia berkata pelan. 'Hati-hati. Cermin ini tidak menunjukkan apa adanya. Ia menunjukkan apa yang kamu inginkan, atau apa yang kamu takutkan. Batas di antara keduanya bisa menghilang.'",
            "Bayangan di air melambaikan tangan padamu."
          ],
          speaker: "Narator",
          choices: [
            { text: "Pandang ke dalam danau dengan sengaja", next: "ep2_look_lake", stat_effects: { knowledge: +1, corruption: +1 } },
            { text: "Hancurkan permukaan danau—lempar batu ke dalamnya", next: "ep2_destroy_lake", stat_effects: { corruption: +2 } },
            { text: "Berpaling dan terus berjalan tanpa melihat", next: "ep2_walk_away", stat_effects: {} }
          ]
        },

        "ep2_mirror_lake_direct": {
          id: "ep2_mirror_lake_direct",
          type: "scene",
          title: "Danau Cermin",
          bg: "vault",
          narration: [
            "Cahaya biru memimpinmu ke sebuah danau yang permukaannya setenang kaca. Tidak ada angin yang menyentuhnya. Tidak ada burung yang terbang di atasnya.",
            "Bayanganmu di air tampak satu langkah terlambat. Kemudian ia berbalik dan menatapmu langsung.",
            "Kamu sendirian di sini. Tidak ada suara selain bisikan samar yang mungkin bukan kata-kata—atau mungkin kata-kata dalam bahasa yang otakmu menolak untuk memproses.",
            "Danau menunggu."
          ],
          speaker: "Narator",
          choices: [
            { text: "Pandang ke dalam air dengan sengaja", next: "ep2_look_lake", stat_effects: { knowledge: +1, corruption: +1 } },
            { text: "Hancurkan permukaan danau", next: "ep2_destroy_lake", stat_effects: { corruption: +2 } },
            { text: "Berpaling dan cari jalur lain ke Inti Lembah", next: "ep2_walk_away", stat_effects: {} }
          ]
        },

        "ep2_look_lake": {
          id: "ep2_look_lake",
          type: "scene",
          title: "Cermin Jiwa",
          bg: "vault",
          narration: [
            "Kamu menatap ke dalam air.",
            "Pertama kamu melihat dirimu sendiri—tapi lebih tua, lebih lelah. Kemudian kamu melihat jalan-jalan yang tidak kamu ambil. Pilihan-pilihan yang kamu buat di Aelthar, diputar ulang dengan hasil yang berbeda.",
            "Beberapa lebih baik. Beberapa jauh lebih buruk. Danau tidak menghakimi—ia hanya menunjukkan.",
            "Kemudian kamu melihat sesuatu di kedalaman: sebuah struktur. Inti Lembah—kamu bisa melihatnya di bawah air seolah danau adalah jendela, bukan permukaan. Dan di sana, tanda yang sama yang ada di tubuhmu bersinar.",
            "Kamu menarik diri sebelum terlalu jauh tenggelam. Tapi kamu tahu jalan sekarang."
          ],
          speaker: "Narator",
          choices: [
            { text: "Lanjutkan ke Inti Lembah dengan pengetahuan baru", next: "ep2_hollow_core", stat_effects: {} }
          ]
        },

        "ep2_destroy_lake": {
          id: "ep2_destroy_lake",
          type: "scene",
          title: "Kekerasan terhadap Cermin",
          bg: "vault",
          narration: [
            "Kamu melempar batu besar ke dalam danau. Permukaan kaca itu pecah, riak-riak meluas, dan bayangan itu terpecah menjadi serpihan.",
            "Tapi kemudian air menjadi tenang lagi. Lebih cepat dari yang mungkin. Dan ketika tenang, bayanganmu tidak ada lagi—hanya kabut yang memantul dari permukaan.",
            "Elira—jika dia bersamamu—mengambil napas tajam. 'Itu... tidak akan diam selamanya. Dan kamu baru saja memberitahu Lembah bahwa kamu takut pada apa yang ingin ditunjukkan oleh cermin itu.'",
            "Bisikan di sekitarmu menjadi lebih keras. Lebih mendesak. Seolah Lembah harus bekerja lebih keras sekarang untuk mencapai kamu."
          ],
          speaker: "Narator",
          choices: [
            { text: "Terus ke Inti Lembah", next: "ep2_hollow_core", stat_effects: {} }
          ]
        },

        "ep2_walk_away": {
          id: "ep2_walk_away",
          type: "scene",
          title: "Pilihan untuk Tidak Melihat",
          bg: "swamp",
          narration: [
            "Kamu berpaling dari danau. Bayangan di air memperhatikan kepergianmu.",
            "Ada sesuatu yang terasa seperti kehilangan—jalan yang tidak diambil, jawaban yang tidak dicari. Tapi juga ada sesuatu seperti kejernihan.",
            "Elira—jika dia bersamamu—mengikutimu tanpa berkomentar. Setelah beberapa langkah dia berkata pelan: 'Kebijaksanaan atau ketakutan, aku tidak selalu bisa membedakannya. Terkadang keduanya terlihat sama dari luar.'",
            "Jalan berlanjut ke depan. Inti Lembah menunggu."
          ],
          speaker: "Narator",
          choices: [
            { text: "Lanjutkan ke Inti Lembah", next: "ep2_hollow_core", stat_effects: {} }
          ]
        },

        // ─── INTI LEMBAH ──────────────────────────────────────
        "ep2_hollow_core": {
          id: "ep2_hollow_core",
          type: "scene",
          title: "Inti Lembah",
          bg: "vault",
          narration: [
            "Inti Lembah adalah sebuah ruang terbuka di mana semua kabut tampak berasal—bukan tersebar dari sini, tapi dikumpulkan di sini. Di tengah ruang terbuka berdiri struktur yang kamu lihat di danau: semacam menara kecil dari batu gelap.",
            "Dan di sekelilingnya—tanda-tanda yang sama dengan yang ada di tubuhmu. Bersinar. Menunggu.",
            "Elira—jika dia bersamamu—berdiri di sampingmu dan berbisik penilaiannya. Jika tidak, kamu merasakan sendiri berat dari apa yang harus kamu lakukan.",
            "Cermin Tidur berdenyut di dalam menara. Penuh. Hampir meluap. Jiwa-jiwa yang tersimpan di dalamnya mendorong ke dalam dinding batu.",
            "Pilihan ada di hadapanmu."
          ],
          speaker: "Narator",
          choices: [
            { text: "Lakukan ritual bersama Elira untuk menguras Cermin", next: "ep2_ritual_choice", stat_effects: {} },
            { text: "Sentuh Cermin—rasakan kekuatan yang tersimpan di dalamnya", next: "ep2_touch_mirror_temptation", stat_effects: { corruption: +1 } },
            { text: "Pelajari struktur batu sebelum bertindak", next: "ep2_study_core", stat_effects: { knowledge: +1 } },
            { text: "Coba hancurkan Cermin secara paksa", next: "ep2_destroy_mirror", stat_effects: { corruption: +1 } }
          ]
        },

        "ep2_ritual_choice": {
          id: "ep2_ritual_choice",
          type: "scene",
          title: "Saat Kebenaran",
          bg: "vault",
          narration: [
            "Elira mulai merapal. Kata-katanya jatuh ke dalam ruang terbuka seperti batu ke dalam air—berat, penuh tujuan.",
            "Cermin Tidur merespons. Cahayanya berubah—dari biru dingin menjadi sesuatu yang lebih hangat, lebih manusiawi. Jiwa-jiwa di dalamnya tampak bernapas lebih mudah.",
            "'Aku butuh suaramu,' Elira berkata. 'Yang Ditandai memiliki koneksi yang tidak kumiliki. Bukan kata-kata—sebuah ingatan. Yang paling nyata yang kamu miliki. Tawarkan itu, dan Cermin akan terbuka.'",
            "Kamu memahami apa yang dimaksud. Ini tidak akan menyakiti kamu—tapi ingatan itu akan diambil dari pikiran dan disimpan di dalam Cermin, menggantinya. Tidak hilang, hanya... dialihkan."
          ],
          speaker: "Elira",
          choices: [
            { text: "Tawarkan ingatan terpentingmu—selesaikan ritual", next: "ep2_ending_check", stat_effects: {} },
            { text: "Tolak—cari cara lain untuk menguras Cermin", next: "ep2_study_core", stat_effects: {} },
            { text: "Tanyakan apakah kamu bisa mengambil ingatan itu kembali suatu hari nanti", next: "ep2_ritual_question", stat_effects: { knowledge: +1 } }
          ]
        },

        "ep2_ritual_question": {
          id: "ep2_ritual_question",
          type: "scene",
          title: "Pertanyaan yang Penting",
          bg: "vault",
          narration: [
            "Elira berhenti. Pertanyaanmu membuatnya diam lebih lama dari yang kamu harapkan.",
            "'Aku tidak tahu,' akhirnya dia menjawab jujur. 'Teorinya... bisa. Jika Cermin berhasil dikuras dan kemudian dinonaktifkan dengan benar, isi dalamnya—termasuk ingatanmu—bisa dilepaskan. Tapi itu ritual yang berbeda, lebih sulit, dan aku tidak yakin apakah aku bisa melakukannya sendirian.'",
            "'Aku tidak akan berbohong padamu hanya untuk mendapatkan apa yang kubutuhkan. Risikonya nyata. Keputusannya ada padamu.'",
            "Kejujurannya terasa seperti sesuatu yang langka di tempat ini."
          ],
          speaker: "Elira",
          choices: [
            { text: "\"Baiklah. Aku mempercayaimu. Mari kita lakukan.\"", next: "ep2_ending_check", stat_effects: { trust: +1 } },
            { text: "\"Aku membutuhkan waktu sebentar.\"", next: "ep2_study_core", stat_effects: {} }
          ]
        },

        "ep2_touch_mirror_temptation": {
          id: "ep2_touch_mirror_temptation",
          type: "scene",
          title: "Godaan Kekuatan",
          bg: "vault",
          narration: [
            "Tanganmu menyentuh batu menara.",
            "Kekuatan mengalir ke atas lenganmu—tidak menyakitkan, tapi menggiurkan. Kamu bisa merasakan jiwa-jiwa di dalam Cermin, ribuan dari mereka, dan mereka merasakanmu juga.",
            "Bisikan berbondong-bondong menuju kesadaranmu. Bukan ancaman—tawaran. Semua yang mereka tahu, semua yang mereka lihat di Lembah ini selama berabad-abad, bisa menjadi milikmu.",
            "Elira—jika dia bersamamu—menarik tanganmu dengan cepat. 'Jangan. Cermin tidak memberi—ia mengambil. Kekuatan yang kamu rasakan adalah milikmu sendiri yang terpantul balik, diperbesar. Tidak ada yang lain di dalamnya yang asing.'"
          ],
          speaker: "Narator",
          choices: [
            { text: "Percayai Elira dan lanjutkan dengan ritual", next: "ep2_ritual_choice", stat_effects: { trust: +1 } },
            { text: "Abaikan peringatannya—terus sentuh Cermin lebih lama", next: "ep2_corrupt_path", stat_effects: { corruption: +2 } },
            { text: "Mundur dan pelajari Cermin dari jarak aman", next: "ep2_study_core", stat_effects: { knowledge: +1 } }
          ]
        },

        "ep2_corrupt_path": {
          id: "ep2_corrupt_path",
          type: "scene",
          title: "Ke Dalam yang Lebih Dalam",
          bg: "vault",
          narration: [
            "Kamu mengabaikan Elira. Tanganmu tetap di batu.",
            "Kekuatannya semakin kuat. Dan kemudian kamu menyadari sesuatu: ia tidak memberimu pengetahuan jiwa-jiwa lain. Elira benar—itu adalah dirimu sendiri yang dipantulkan, tapi versi yang telah melepaskan setiap keraguan, setiap belas kasih, setiap hambatan.",
            "Kamu bisa menjadi penguasa tempat ini. Tidak perlu menguras Cermin—kamu bisa mengendalikannya. Dan melaluinya, mengendalikan Lembah.",
            "Elira berteriak namamu dari jauh yang semakin jauh."
          ],
          speaker: "Narator",
          choices: [
            { text: "Bertarung melawan pengaruh Cermin—tarik dirimu kembali", next: "ep2_ritual_choice", stat_effects: { corruption: -1, trust: +1 } },
            { text: "Biarkan kekuatan itu mengambil alih sepenuhnya", next: "ep2_ending_hollow_king", stat_effects: { corruption: +2 } }
          ]
        },

        "ep2_study_core": {
          id: "ep2_study_core",
          type: "scene",
          title: "Pembelajaran di Tepi Jurang",
          bg: "vault",
          narration: [
            "Kamu memperhatikan struktur batu dengan cermat. Tanda-tanda di sekitar menara bukan sekedar dekorasi—mereka membentuk pola, sistem. Sebuah tata letak.",
            "Kamu mengenali beberapa dari tanda-tanda dari buku catatan yang kamu baca—lambang Maloreth, ya, tapi juga lambang yang lebih tua. Pre-Maloreth. Sebelum keinginannya untuk mengabadikan diri sendiri mendistorsi segalanya.",
            "Cermin Tidur pada awalnya bukan untuk menimbun jiwa. Itu untuk menyimpannya sementara—tempat peristirahatan di antara kehidupan, dirawat oleh penjaga yang akan membimbing jiwa-jiwa saat mereka siap untuk melanjutkan perjalanan.",
            "Maloreth mengambil mekanisme itu dan membaliknya menjadi sebuah penjara.",
            "'Aku melihatnya sekarang,' kata Elira—atau jika kamu sendirian, kamu berbicara kepada dirimu sendiri. 'Kita tidak perlu menghancurkannya. Kita perlu mengembalikannya ke tujuan aslinya.'"
          ],
          speaker: "Narator",
          choices: [
            { text: "Coba kembalikan fungsi asli Cermin", next: "ep2_ending_check", stat_effects: { knowledge: +1 } },
            { text: "Lakukan ritual pengurasan Elira sebagai alternatif", next: "ep2_ritual_choice", stat_effects: {} }
          ]
        },

        "ep2_destroy_mirror": {
          id: "ep2_destroy_mirror",
          type: "scene",
          title: "Kekerasan sebagai Jawaban",
          bg: "vault",
          narration: [
            "Kamu menyerang struktur batu dengan senjatamu.",
            "Batu retak. Cahaya di dalamnya berteriak—tidak metaforis, benar-benar berteriak, suara ribuan jiwa yang terkejut dan marah—kemudian meledak ke luar dalam gelombang.",
            "Kamu terlempar ke belakang. Saat kamu bangkit, debu menyelimuti segalanya.",
            "Ketika debu mengendap, kamu melihat bahwa menara itu hancur... tapi jiwa-jiwa yang tersimpan di dalamnya tidak pergi ke manapun. Mereka tersebar ke seluruh Lembah, bebas tapi tidak terarah, mengisi udara dengan kehadiran yang seperti berdesak-desakan di ruangan yang terlalu penuh.",
            "Elira—jika dia bersamamu—berdiri terpana. 'Kamu membebaskannya tapi tidak memberi mereka arah. Ini...' Dia menggelengkan kepala. 'Ini mungkin lebih buruk.'"
          ],
          speaker: "Narator",
          choices: [
            { text: "Coba pandu jiwa-jiwa yang tersebar dengan tanda yang ada di tubuhmu", next: "ep2_ending_check", stat_effects: {} },
            { text: "Tinggalkan—ini sudah di luar kemampuanmu", next: "ep2_ending_lost_soul", stat_effects: {} }
          ]
        },

        // ─── PENGECEKAN AKHIRAN ──────────────────────────────────────
        "ep2_ending_check": {
          id: "ep2_ending_check",
          type: "scene",
          title: "Momen Penentu",
          bg: "vault",
          narration: [
            "Kamu berdiri di hadapan Cermin Tidur. Tanda di tubuhmu menyala.",
            "Semua pilihan yang kamu buat di Lembah ini—kepercayaan yang diberikan atau ditahan, pengetahuan yang dicari atau diabaikan, godaan yang dilawan atau diikuti—semuanya berkumpul di sini.",
            "Cermin merasakan siapa kamu. Inti Lembah merasakan siapa kamu.",
            "Dan dalam keheningan sebelum tindakan, kamu merasakan konsekuensi dari setiap langkah yang kamu ambil sejak memasuki kabut."
          ],
          speaker: "Narator",
          choices: [
            { text: "Selesaikan apa yang kamu mulai", next: "ep2_resolve_ending", stat_effects: {} }
          ]
        },

        "ep2_resolve_ending": {
          id: "ep2_resolve_ending",
          type: "scene",
          title: "Cahaya yang Tersisa",
          bg: "vault",
          narration: [
            "Kamu mengerahkan semua yang kamu pelajari, semua kepercayaan yang kamu bangun atau hancurkan, semua kebijaksanaan yang kamu kumpulkan atau tolak.",
            "Tanda di tubuhmu bereaksi dengan Cermin Tidur.",
            "Dan untuk sesaat—hanya sesaat—kamu bisa merasakan semua jiwa yang tersimpan di dalamnya. Bukan sebagai massa yang tidak berbentuk, tapi sebagai individu. Masing-masing dengan nama mereka sendiri, kenangan mereka sendiri, dan kerinduan mereka sendiri untuk melanjutkan.",
            "Apa yang terjadi selanjutnya ditentukan oleh siapa kamu sebenarnya."
          ],
          speaker: "Narator",
          choices: [
            { text: "Bertindak berdasarkan kepercayaan (trust tinggi)", next: "ep2_ending_lightbearer", stat_effects: {} },
            { text: "Bertindak berdasarkan pengetahuan (knowledge tinggi)", next: "ep2_ending_truth_seeker", stat_effects: {} },
            { text: "Bertindak dari tempat yang gelap (corruption tinggi)", next: "ep2_ending_hollow_king", stat_effects: {} },
            { text: "Refleksikan jika kamu telah melihat danau DAN mempercayai Elira", next: "ep2_ending_loop", stat_effects: {} }
          ]
        },

        // ─── AKHIRAN EPISODE 2 ────────────────────────────────────
        "ep2_ending_lightbearer": {
          id: "ep2_ending_lightbearer",
          type: "ending",
          title: "Pembawa Cahaya",
          bg: "chapel",
          ending_id: "ep2_ending_lightbearer",
          ending_name: "Cahaya Lembah",
          ending_icon: "☀️",
          rarity: "rare",
          narration: [
            "Kamu dan Elira melakukan ritual bersama.",
            "Cermin Tidur terbuka—bukan pecah, bukan hancur, tapi terbuka—seperti bunga yang akhirnya menemukan matahari. Jiwa-jiwa yang tersimpan di dalamnya mengalir keluar dalam cahaya putih yang tenang, masing-masing menemukan jalannya sendiri.",
            "Elira menangis diam-diam. 'Tiga ratus tahun,' bisiknya. 'Tiga ratus tahun mereka menunggu.'",
            "Kabut Lembah menipis saat fajar—perlahan, seperti makhluk lama yang terbangun dari tidur. Langit yang pernah abu-abu sekarang memiliki warna kembali.",
            "Para penyintas desa melihat dari jalan setapak ketika kamu keluar. Tidak ada yang berkata apa-apa pada awalnya. Kemudian seorang gadis kecil berlari ke depan dan meraih tanganmu.",
            "Elira berdiri di sampingmu, pundaknya lebih ringan dari yang pernah ada. 'Apa yang kamu lakukan selanjutnya, Yang Ditandai?' tanyanya.",
            "Kamu melihat ke jalan yang membentang. Aelthar masih ada di timur. Kerajaan yang masih membutuhkan penyembuhan. Dan tanda di tubuhmu masih menyala—tapi sekarang rasanya seperti kompas, bukan beban."
          ],
          speaker: "Narator"
        },

        "ep2_ending_hollow_king": {
          id: "ep2_ending_hollow_king",
          type: "ending",
          title: "Raja Lembah",
          bg: "vault",
          ending_id: "ep2_ending_hollow_king",
          ending_name: "Raja Kekosongan",
          ending_icon: "👑",
          rarity: "rare",
          narration: [
            "Cermin Tidur membuka dirinya padamu—bukan karena kamu memecahkannya atau meritualinya. Karena ia mengenalimu.",
            "Bukan karena tanda Maloreth. Karena korupsi yang telah berkembang dalam dirimu di Lembah ini mencerminkan apa yang pernah dilakukan Maloreth: menyerahkan belas kasih untuk kekuatan, kepercayaan untuk kendali.",
            "Kamu menjadi penguasa Lembah. Kabut tetap ada—semakin tebal, semakin lapar. Jiwa-jiwa di dalam Cermin tidak terbebas; mereka menjadi pasukanmu.",
            "Elira—jika dia bersamamu—menghilang ke dalam kabut tanpa berkata sepatah kata pun. Kamu tidak mencarinya.",
            "Para penyintas desa meninggalkan rumah mereka dalam semalam.",
            "Kamu mendapatkan kekuatan yang kamu inginkan. Apa yang tidak kamu rencanakan adalah betapa sunyinya kekuatan itu—betapa setiap jiwa yang tunduk padamu terasa seperti pintu yang terkunci dari luar.",
            "Lembah tumbuh. Kerajaanmu tumbuh. Dan setiap pagi, di cermin air yang tenang, kamu mencari wajah yang masih terlihat seperti kamu—dan semakin hari semakin sulit untuk menemukannya."
          ],
          speaker: "Narator"
        },

        "ep2_ending_truth_seeker": {
          id: "ep2_ending_truth_seeker",
          type: "ending",
          title: "Pencari Kebenaran",
          bg: "swamp",
          ending_id: "ep2_ending_truth_seeker",
          ending_name: "Sang Bijaksana",
          ending_icon: "📚",
          rarity: "uncommon",
          narration: [
            "Dengan pemahaman tentang fungsi asli Cermin, kamu melakukan sesuatu yang tidak seorang pun mencoba: kamu tidak menguras atau menghancurkan Cermin Tidur. Kamu memulihkan tujuan aslinya.",
            "Jiwa-jiwa di dalamnya tidak dilepaskan ke kekosongan—mereka dibimbing. Satu per satu, dalam proses yang membutuhkan waktu hingga fajar, mereka menemukan jalan yang seharusnya mereka tempuh tiga ratus tahun lalu.",
            "Kamu tidak memahami sepenuhnya apa yang terjadi—ke mana mereka pergi, apa yang menunggu mereka. Tapi kamu mengerti bahwa prosesnya terasa benar dengan cara yang tidak bisa dijelaskan.",
            "Elira—jika dia bersamamu—duduk diam dalam keheningan yang panjang setelah selesai. 'Aku tidak mengharapkan ini,' akhirnya dia berkata. 'Aku berharap aku akan menjadi satu-satunya yang melakukan ini bersamamu.'",
            "Kamu meninggalkan Lembah saat siang hari. Kabut telah pergi. Desa masih ada—tidak subur, tidak dipulihkan secara ajaib, tapi bertahan. Masih ada.",
            "Kamu membawa lebih banyak pertanyaan dari Lembah dari yang kamu bawa masuk. Tapi juga sesuatu yang lebih berharga dari jawaban: pemahaman bahwa beberapa hal tidak perlu dihancurkan atau dikuasai—hanya perlu dimengerti."
          ],
          speaker: "Narator"
        },

        "ep2_ending_lost_soul": {
          id: "ep2_ending_lost_soul",
          type: "ending",
          title: "Jiwa yang Hilang",
          bg: "vault",
          ending_id: "ep2_ending_lost_soul",
          ending_name: "Tersesat",
          ending_icon: "🌫️",
          rarity: "common",
          narration: [
            "Lembah membutuhkanmu lebih dari yang kamu butuhkan dirinya sendiri.",
            "Kamu tidak bisa mengingat kapan kamu berhenti berjalan ke depan dan mulai berjalan dalam lingkaran. Kabut terlihat sama dari setiap arah. Jiwa-jiwa yang tersebar dari Cermin yang hancur melayang melewatimu, berbisik nama-nama yang bukan milikmu.",
            "Di suatu tempat di luar kabut, dunia berlanjut. Aelthar berlanjut. Orang-orang yang pernah kamu bantu berlanjut.",
            "Tapi kamu tidak keluar dari Lembah.",
            "Bukan karena Lembah mengambilmu—tapi karena kamu tidak membawa cukup dari dirimu sendiri untuk menemukan jalan kembali.",
            "Para penyintas desa menunggu beberapa hari, kemudian pergi.",
            "Bertahun-tahun kemudian, pelancong sesekali melaporkan mendengar suara di kabut Lembah Berbisik: tidak meminta tolong, tidak berteriak, hanya berbisik nama-nama tempat yang jauh dan orang-orang yang tidak bisa lagi mereka ingat dengan jelas.",
            "Jika kamu mendengarnya, berhentilah sebentar. Berikan nama itu sebuah kata perpisahan. Ini yang paling bisa dilakukan sekarang."
          ],
          speaker: "Narator"
        },

        "ep2_ending_loop": {
          id: "ep2_ending_loop",
          type: "ending",
          title: "Putaran Waktu",
          bg: "vault",
          ending_id: "ep2_ending_loop",
          ending_name: "Yang Hidup Kembali",
          ending_icon: "🔄",
          rarity: "secret",
          narration: [
            "Saat tanda di tubuhmu menyentuh Cermin Tidur, sesuatu terjadi yang tidak ada dalam rencana siapa pun.",
            "Cermin mengenali bukan hanya tanda Maloreth—ia mengenali jiwa yang sudah ada dalam catatannya.",
            "Kamu.",
            "Bukan kamu yang sekarang. Kamu yang lain—jiwa yang memasuki Lembah ini sebelum memori dimulai, sebelum nama ini ada, dalam iterasi sebelumnya dari sebuah perjalanan yang kamu pikir kamu mulai di Aelthar.",
            "Bayangan di Danau Cermin yang satu langkah terlambat—itu bukan cerminanmu. Itu adalah kamu dari waktu sebelumnya.",
            "Cermin membuka, dan semua jiwa terbebas, termasuk versi dirimu yang tua itu. Saat mereka lewat, kamu merasakan sepotong ingatan—bukan ingatanmu, namun terasa seperti ingatanmu: masuk ke sebuah rawa di malam hari, lampu obor di kejauhan, suara teriakan yang tertiup angin.",
            "Kemudian hilang.",
            "Elira berdiri di sampingmu, wajahnya tidak terbaca. 'Sudah berapa kali?' tanyamu.",
            "Dia hanya tersenyum. 'Lebih sedikit dari yang kamu takutkan. Lebih banyak dari yang kamu harapkan.'",
            "Kamu meninggalkan Lembah. Jalan menuju ke timur, ke Aelthar, terasa familiar—terlalu familiar. Sebuah desa. Seorang raja yang putus asa. Rawa yang bergemuruh di malam hari.",
            "Tapi kali ini, kamu tahu akhirannya bisa berbeda.",
            "Kronik berlanjut."
          ],
          speaker: "Narator"
        }
      }
    }
  ]
};

// Helper: temukan semua adegan dari semua episode
function getScene(episodeId, sceneId) {
  const ep = STORY_DATA.episodes.find(e => e.id === episodeId);
  if (!ep) return null;
  return ep.scenes[sceneId] || null;
}
