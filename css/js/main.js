document.addEventListener('DOMContentLoaded', () => {
  // === 手机菜单 ===
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // === 轮播图 ===
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(index)) showSlide(index);
    });
  });

  if (slides.length > 0) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // === 产品分页功能 ===
  const productCategories = document.querySelectorAll('.product-category');
  if (productCategories.length === 0) return; // 如果没有找到任何产品分类，则退出

  let currentPage = 1;
  const totalPages = 2;

  function showProductPage(page) {
    currentPage = page;

    // 更新页码指示器
    const indicator = document.getElementById('page-indicator');
    if (indicator) {
      indicator.textContent = `Page ${currentPage}`;
    }

    // 隐藏所有分类
    productCategories.forEach(cat => cat.style.display = 'none');

    // 定义每页标题（必须与 HTML <h2> 完全一致）
    const pageConfig = {
      1: ['Plastic Hangers', 'Velvet Hangers', 'Stainless Steel Hangers', 'Wooden Hangers'],
      2: ['Aluminum Hangers', 'Coated Hangers', 'Hanger Accessories', 'Other Home Furnishings']
    };

    // 显示当前页
    const titlesToShow = pageConfig[page] || [];
    titlesToShow.forEach(title => {
      const category = Array.from(productCategories).find(cat => {
        const h2 = cat.querySelector('h2');
        return h2 && h2.textContent.trim() === title;
      });
      if (category) category.style.display = 'block';
    });
  }

  // 初始化第一页
  showProductPage(1);

  // 绑定分页按钮（事件委托）
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-page]')) {
      const page = parseInt(e.target.getAttribute('data-page'), 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        showProductPage(page);
      }
    }
  });
});
