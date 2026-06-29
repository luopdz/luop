document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ===== HERO SLIDESHOW =====
  const bg1 = document.getElementById('bg1');
  const bg2 = document.getElementById('bg2');

  const banners = [
    'img/banner/Banner (1).jpg',
    'img/banner/Banner (2).jpg',
    'img/banner/Banner (3).jpg',
    'img/banner/Banner (4).jpg',
    'img/banner/Banner (5).jpg',
  ];

  let cur = 0, bg1Active = true;
  bg1.style.backgroundImage = `url('${banners[0]}')`;
  bg2.style.backgroundImage = `url('${banners[1]}')`;

  setInterval(() => {
    cur = (cur + 1) % banners.length;
    const next = banners[(cur + 1) % banners.length];
    if (bg1Active) {
      bg2.style.backgroundImage = `url('${banners[cur]}')`;
      bg2.classList.add('active');
      bg1.classList.remove('active');
    } else {
      bg1.style.backgroundImage = `url('${banners[cur]}')`;
      bg1.classList.add('active');
      bg2.classList.remove('active');
    }
    bg1Active = !bg1Active;
  }, 5500);

  // ===== LOAD MORE =====
  const initLoadMore = (gridSel, btnId) => {
    const grid = document.querySelector(gridSel);
    if (!grid) return;
    const cards = [...grid.querySelectorAll('.card')];
    const btn = document.getElementById(btnId);
    const show = window.innerWidth > 1024 ? 3 : 2;
    let count = show;

    cards.forEach((c, i) => { if (i >= show) c.classList.add('card-hidden'); });
    if (cards.length <= show) btn.parentElement.style.display = 'none';

    btn.addEventListener('click', e => {
      e.preventDefault();
      const step = window.innerWidth > 1024 ? 3 : 2;
      let added = 0;
      for (let i = count; i < cards.length && added < step; i++) {
        cards[i].classList.remove('card-hidden');
        setTimeout(() => cards[i].classList.add('visible'), 50);
        added++;
      }
      count += added;
      if (count >= cards.length) btn.parentElement.style.display = 'none';
    });
  };

  initLoadMore('#places .grid', 'loadMorePlaces');
  initLoadMore('#food .grid', 'loadMoreFood');

  // ===== SCROLL REVEAL =====
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .card, .milestone-card').forEach(el => observer.observe(el));

  // ===== READ MORE =====
  const readMoreBtn = document.getElementById('readMoreBtn');
  const aboutText = document.getElementById('aboutText');
  const fullText = `Tây Ninh là tỉnh biên giới phía Tây Bắc vùng Đông Nam Bộ, nổi tiếng với Núi Bà Đen — nóc nhà Nam Bộ cao 986m được mệnh danh là "Đệ nhất thiên sơn". Hệ thống cáp treo 3 tầng dài nhất Đông Nam Á đưa hàng triệu lượt khách lên đỉnh mỗi năm. Đây còn là cái nôi của tín ngưỡng Cao Đài với Toà Thánh Tây Ninh nguy nga — tôn giáo thuần Việt ra đời năm 1926 nổi tiếng khắp châu Á. Ngoài ra, Tây Ninh còn sở hữu Hồ Dầu Tiếng rộng lớn nhất cả nước, Vườn Quốc gia Lò Gò – Xa Mát là khu dự trữ sinh quyển thế giới, và nền ẩm thực đặc sắc với bánh tráng phơi sương Trảng Bàng nức tiếng xa gần.`;
  if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
      aboutText.textContent = fullText;
      readMoreBtn.style.display = 'none';
    });
  }

  // ===== DATA CHI TIẾT =====
  const info = {
    nubaden: {
      title: 'Núi Bà Đen',
      img: 'img/diadiem/nubaden/Anh (1).jpg',
      imgs: ['img/diadiem/nubaden/Anh (1).jpg', 'img/diadiem/nubaden/Anh (2).jpg'],
      desc: 'Núi Bà Đen cao 986m là đỉnh núi cao nhất vùng Đông Nam Bộ, được mệnh danh là "Đệ nhất thiên sơn". Hệ thống cáp treo 3 tầng dài nhất Đông Nam Á đưa du khách lên tận đỉnh thưởng ngoạn mây trời bồng bềnh. Ngôi chùa Bà trên đỉnh núi linh thiêng thu hút hàng triệu lượt hành hương mỗi năm, đặc biệt vào dịp Tết và lễ hội Núi Bà tháng Giêng âm lịch.',
      location: 'Thị xã Tây Ninh, tỉnh Tây Ninh',
      hours: '05:00 – 20:00 (Cáp treo: 07:00 – 18:00)',
      map: 'Núi+Bà+Đen+Tây+Ninh',
    },
    toathanh: {
      title: 'Toà Thánh Cao Đài',
      img: 'img/diadiem/toathanh/Anh (1).jpg',
      imgs: ['img/diadiem/toathanh/Anh (1).jpg'],
      desc: 'Tòa Thánh Tây Ninh là thánh địa của đạo Cao Đài — tôn giáo thuần Việt ra đời năm 1926. Công trình kiến trúc kỳ vĩ pha trộn phong cách Đông – Tây với những tháp nhọn, mái vòm sặc sỡ và bức tranh tường đặc sắc. Lễ cúng 4 lần/ngày vào 6h, 12h, 18h và 24h là trải nghiệm tâm linh độc đáo không thể bỏ qua. Lonely Planet xếp đây vào Top điểm đến ấn tượng nhất châu Á.',
      location: 'Long Hoa, Hòa Thành, Tây Ninh',
      hours: 'Mở cửa cả ngày · Lễ cúng: 06:00 / 12:00 / 18:00 / 24:00',
      map: 'Tòa+Thánh+Cao+Đài+Tây+Ninh',
    },
    hodautieng: {
      title: 'Hồ Dầu Tiếng',
      img: 'img/diadiem/hodautieng/Anh (1).jpg',
      imgs: ['img/diadiem/hodautieng/Anh (1).jpg'],
      desc: 'Hồ Dầu Tiếng là hồ nhân tạo lớn nhất Việt Nam với diện tích mặt nước khoảng 27,000 ha. Mặt hồ phẳng lặng như gương phản chiếu bóng Núi Bà Đen hùng vĩ — khung cảnh thơ mộng hiếm có. Đây là thiên đường cho câu cá, chèo thuyền, ngắm bình minh/hoàng hôn và du lịch sinh thái ven hồ.',
      location: 'Dương Minh Châu & Tân Châu, Tây Ninh',
      hours: 'Mở cửa cả ngày',
      map: 'Hồ+Dầu+Tiếng+Tây+Ninh',
    },
    nubaden2: {
      title: 'Chân Núi Bà Đen',
      img: 'img/diadiem/nubaden/Anh (2).jpg',
      imgs: ['img/diadiem/nubaden/Anh (2).jpg', 'img/diadiem/nubaden/Anh (1).jpg'],
      desc: 'Khu vực chân Núi Bà Đen với hồ nước trong xanh ôm quanh sườn núi tạo nên cảnh sắc như tranh vẽ. Những tảng đá nhô lên giữa hồ, bóng cây xanh mướt phản chiếu xuống mặt nước — một góc tĩnh mịch và thơ mộng tuyệt vời để nghỉ ngơi và chụp ảnh.',
      location: 'Thị xã Tây Ninh, tỉnh Tây Ninh',
      hours: '05:00 – 18:00',
      map: 'Núi+Bà+Đen+Tây+Ninh',
    },
    cancutrunguong: {
      title: 'Căn cứ Trung ương Cục',
      img: 'img/diadiem/cancutrunguong/Anh (1).jpg',
      imgs: ['img/diadiem/cancutrunguong/Anh (1).jpg'],
      desc: 'Di tích lịch sử quốc gia đặc biệt nằm trong rừng già Tân Biên, nơi đây từng là đại bản doanh bí mật của Trung ương Cục miền Nam suốt hai cuộc kháng chiến chống Pháp và chống Mỹ. Khu di tích bảo tồn nhiều hiện vật, hầm trú ẩn và dấu tích lịch sử vô giá — điểm đến giáo dục truyền thống cách mạng ý nghĩa sâu sắc.',
      location: 'Tân Lập, Tân Biên, Tây Ninh',
      hours: '07:00 – 17:00',
      map: 'Căn+cứ+Trung+ương+Cục+Tây+Ninh',
    },
    logoxamat: {
      title: 'Vườn QG Lò Gò – Xa Mát',
      img: 'img/diadiem/logoxamat/Anh (1).jpg',
      imgs: ['img/diadiem/logoxamat/Anh (1).jpg'],
      desc: 'Vườn Quốc gia Lò Gò – Xa Mát rộng hơn 18,000 ha là khu dự trữ sinh quyển thế giới với hệ sinh thái đặc trưng gồm rừng khộp, đầm lầy và bãi cỏ rộng lớn. Nơi đây là sinh cảnh của nhiều loài động thực vật quý hiếm, lý tưởng cho du lịch sinh thái, trekking và nghiên cứu khoa học thiên nhiên.',
      location: 'Tân Biên, Tây Ninh (giáp biên giới Campuchia)',
      hours: '07:00 – 17:00',
      map: 'Vườn+Quốc+gia+Lò+Gò+Xa+Mát',
    },
    banhtranhpho: {
      title: 'Bánh tráng phơi sương',
      img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600',
      imgs: ['https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600'],
      desc: 'Bánh tráng phơi sương Trảng Bàng là đặc sản nổi tiếng nhất Tây Ninh. Bánh được tráng từ gạo tẻ, phơi trong sương đêm để đạt độ mềm dẻo đặc trưng. Cuộn cùng thịt luộc, rau thơm, dưa leo, chấm nước mắm tỏi ớt chua ngọt — hương vị khó quên đã chinh phục triệu người.',
      location: 'Trảng Bàng, Tây Ninh (dọc QL22)',
      hours: '06:00 – 22:00',
      map: 'Bánh+tráng+phơi+sương+Trảng+Bàng',
    },
    muoitom: {
      title: 'Muối tôm Tây Ninh',
      img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600',
      imgs: ['https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600'],
      desc: 'Muối tôm Tây Ninh là gia vị đặc trưng không thể thiếu — hỗn hợp muối, tôm khô, ớt và gia vị bí truyền tạo nên màu đỏ tươi và mùi thơm nồng đặc biệt. Chấm cùng xoài, ổi, mận hay bất cứ trái cây nào đều thành tuyệt phẩm. Là quà tặng được yêu thích nhất khi rời Tây Ninh.',
      location: 'Các chợ và cửa hàng đặc sản toàn tỉnh Tây Ninh',
      hours: '07:00 – 20:00',
      map: 'Muối+tôm+Tây+Ninh',
    },
    banhcanh: {
      title: 'Bánh canh Tây Ninh',
      img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600',
      imgs: ['https://images.unsplash.com/photo-1555126634-323283e090fa?w=600'],
      desc: 'Bánh canh Tây Ninh khác biệt ở sợi bánh làm từ bột gạo xay tươi, to và dai hơn nơi khác. Nước dùng trong và ngọt từ xương heo hầm kỹ, thêm chả cá, tôm tươi, giò heo. Rắc hành lá, tiêu xay, thêm ít sa tế — bữa sáng đậm đà, ấm lòng chuẩn vị người Tây Ninh.',
      location: 'Các quán tại TP. Tây Ninh và Trảng Bàng',
      hours: '06:00 – 12:00 (sáng sớm ngon nhất)',
      map: 'Bánh+canh+Tây+Ninh',
    },
    traulua: {
      title: 'Thịt trâu lụa',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
      imgs: ['https://images.unsplash.com/photo-1544025162-d76694265947?w=600'],
      desc: 'Thịt trâu lụa Tây Ninh là món đặc sản dân dã nức tiếng miền Nam. Trâu được chọn kỹ, thịt dai và đậm vị hơn thịt bò, luộc chín mềm mại như lụa. Ăn kèm rau rừng các loại, bánh tráng cuốn, chấm mắm me chua ngọt — vị ngon khó quên mỗi lần ghé Tây Ninh.',
      location: 'Tân Biên, Tân Châu, Tây Ninh',
      hours: '10:00 – 22:00',
      map: 'Thịt+trâu+lụa+Tây+Ninh',
    },
    'banhуот': {
      title: 'Bánh ướt cuộn thịt',
      img: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600',
      imgs: ['https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600'],
      desc: 'Bánh ướt cuộn thịt Tây Ninh là món ăn sáng bình dị mà ngon miệng. Lớp bánh gạo trắng mỏng tang cuộn cùng chả lụa, tôm rang vàng, giá trụng và rau thơm. Chấm nước mắm tỏi ớt ngọt — giản dị mà luyến lái.',
      location: 'Các quán bình dân khắp tỉnh Tây Ninh',
      hours: '06:00 – 11:00',
      map: 'Bánh+ướt+Tây+Ninh',
    },
    comtam: {
      title: 'Cơm tấm sườn bì',
      img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600',
      imgs: ['https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600'],
      desc: 'Cơm tấm Tây Ninh mang hương vị riêng với gạo tấm hạt nhỏ mềm dẻo, sườn nướng than hoa thơm lừng cháy cạnh, bì heo sợi dai giòn trộn thính. Chan nước mắm theo công thức riêng của từng quán — ăn một lần nhớ mãi.',
      location: 'Các quán cơm tấm khắp TP. Tây Ninh',
      hours: '06:00 – 22:00',
      map: 'Cơm+tấm+Tây+Ninh',
    },
    che: {
      title: 'Chè đậu xanh lá dứa',
      img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600',
      imgs: ['https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600'],
      desc: 'Chè đậu xanh lá dứa Tây Ninh với màu xanh tự nhiên thơm lá dứa thật, đậu xanh bùi bùi và nước cốt dừa béo ngậy. Uống lạnh giải nhiệt ngày hè hay thưởng thức nóng giữa rừng núi — đều tuyệt hảo theo cách riêng.',
      location: 'Các quán chè và chợ toàn tỉnh Tây Ninh',
      hours: '08:00 – 22:00',
      map: 'Chè+Tây+Ninh',
    },
  };

  // ===== MODAL =====
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalGallery = document.getElementById('modalGallery');
  const mapIframe = document.getElementById('mapIframe');
  const closeModal = document.querySelector('.close-modal');

  const openModal = (key, fallbackTitle, fallbackImg, fallbackDesc) => {
    const d = info[key] || {
      title: fallbackTitle, img: fallbackImg, imgs: [fallbackImg],
      desc: fallbackDesc, location: 'Tây Ninh', hours: 'Đang cập nhật', map: fallbackTitle
    };

    modalTitle.textContent = d.title;
    modalImg.src = d.img;
    modalImg.alt = d.title;
    modalDesc.textContent = d.desc;
    document.getElementById('modalLocation').innerHTML =
      `<i class="fa-solid fa-location-dot"></i> <span>${d.location}</span>`;
    document.getElementById('modalHours').innerHTML =
      `<i class="fa-solid fa-clock"></i> <span>${d.hours}</span>`;
    mapIframe.src = `https://www.google.com/maps?q=${d.map}&output=embed`;

    modalGallery.innerHTML = '';
    d.imgs.forEach(src => {
      const img = document.createElement('img');
      img.src = src; img.alt = d.title;
      img.addEventListener('click', () => { modalImg.src = src; });
      modalGallery.appendChild(img);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-body').scrollTop = 0;
  };

  const hideModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    mapIframe.src = '';
  };

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.key;
      const title = card.querySelector('h3').textContent;
      const img = card.querySelector('img').src;
      const desc = card.querySelector('p').textContent;
      openModal(key, title, img, desc);
    });
  });

  closeModal.addEventListener('click', hideModal);
  window.addEventListener('click', e => { if (e.target === modal) hideModal(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });

});
