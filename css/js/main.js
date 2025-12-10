// 手机菜单切换
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 轮播图逻辑
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[index]) {
      slides[index].classList.add('active');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }

    currentSlide = index;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(index)) {
        showSlide(index);
      }
    });
  });

  // 自动播放（仅当存在轮播图时）
  if (slides.length > 0) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // ==============================
  // ✅ 产品分页功能：从 Aluminum Hangers 开始第二页
  // ==============================

  // 检查是否为产品页面
  const productCategories = document.querySelectorAll('.product-category');
  if (productCategories.length > 0) {
    let currentPage = 1;
    const totalPages = 2;

    // 默认显示第一页
    showProductPage(1);

    // 使用事件委托绑定分页按钮
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-page]')) {
        const page = parseInt(e.target.getAttribute('data-page'), 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
          showProductPage(page);
        }
      }
    });

    function showProductPage(page) {
      currentPage = page;

      // 更新页码指示器
      const indicator = document.getElementById('page-indicator');
      if (indicator) {
        indicator.textContent = `Page ${currentPage}`;
      }

      // 隐藏所有产品分类
      productCategories.forEach(cat => {
        cat.style.display = 'none';
      });

      // 定义每页应显示的分类标题（必须与 HTML 中 <h2> 文本完全一致）
      const pageConfig = {
        1: ['Plastic Hangers', 'Velvet Hangers', 'Stainless Steel Hangers', 'Wooden Hangers'],
        2: ['Aluminum Hangers', 'Coated Hangers', 'Hanger Accessories', 'Other Home Furnishings']
      };

      // 显示当前页的分类
      const titlesToShow = pageConfig[page] || [];
      titlesToShow.forEach(title => {
        const category = Array.from(productCategories).find(cat => {
          const h2 = cat.querySelector('h2');
          return h2 && h2.textContent.trim() === title;
        });
        if (category) {
          category.style.display = 'block';
        }
      });
    }
  }
});
