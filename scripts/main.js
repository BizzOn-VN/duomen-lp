'use strict';

/* HELPER: Checks Whether an Element Exists
----------------------------------------------------------------------------------------------------*/
(function( $ ) {

  $.fn.extend({
    exists: function() {
      if ( this.length > 0 ) {
        return true;
      } else {
        return false;
      }
    }
  });

})( jQuery );



jQuery(document).on("ready",function () {
    
});

const faqWrappers = document.querySelectorAll('.faq-wrapper');

        faqWrappers.forEach(wrapper => {
            const btn = wrapper.querySelector('.show-more-btn');
            const hiddenItems = wrapper.querySelectorAll('.faq-item.is-hidden');

            // Hàm kích hoạt sự kiện hover đổi class active cho từng item
            function bindHoverEvent(item) {
                item.addEventListener('mouseenter', function() {
                    // Chỉ tìm và xóa active của các item nằm TRONG CÙNG khối wrapper này
                    const allItemsInWrapper = wrapper.querySelectorAll('.faq-item');
                    allItemsInWrapper.forEach(i => i.classList.remove('active'));
                    
                    // Thêm active cho mục vừa rê chuột vào
                    item.classList.add('active');
                });
            }

            // Gán sự kiện hover cho các item đang hiển thị sẵn lúc đầu
            const currentItems = wrapper.querySelectorAll('.faq-item');
            currentItems.forEach(item => bindHoverEvent(item));

            // Xử lý nút xem thêm
            if (btn && hiddenItems.length > 0) {
                btn.addEventListener('click', function() {
                    hiddenItems.forEach(item => {
                        item.classList.remove('is-hidden');
                        // Kích hoạt luôn tính năng hover active cho phần tử mới hiện
                        bindHoverEvent(item);
                    });
                    btn.remove(); // Bỏ hoàn toàn nút xem thêm sau khi mở rộng
                });
            } else if (btn) {
                btn.remove();
            }
        });





       
document.addEventListener("DOMContentLoaded", () => {
    // Tự động lấy tất cả các section có class chứa chữ "section-"
    const allSections = document.querySelectorAll('[class*="section-"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Khi cuộn tới và nhìn thấy section
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Kích hoạt toàn bộ animation bên trong
                
                // THẦN CHÚ Ở ĐÂY: Bỏ theo dõi section này ngay lập tức
                // Kể từ nay về sau, section này sẽ giữ nguyên class .active và không bao giờ chạy lại nữa
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.25 // Vừa ló diện 20% trên màn hình là kích hoạt ngay
    });

    // Kích hoạt bộ theo dõi cho từng section
    allSections.forEach(section => {
        observer.observe(section);
    });
});

new WOW().init();

// Lấy toàn bộ các nút share trên trang
const shareButtons = document.querySelectorAll('.share-btn');

shareButtons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Nếu click trúng vào các icon mạng xã hội bên trong, giữ nguyên menu không đóng
    if (e.target.closest('.icon')) return;

    // Ngăn chặn sự kiện click bị lan ra ngoài document (Event Bubbling)
    e.stopPropagation();

    // Chỉ bật/tắt (toggle) class active trên CHÍNH CÁI NÚT được click (this)
    this.classList.toggle('active');
  });
});

// Click ra ngoài vùng trống bất kỳ trên màn hình thì đóng tất cả các nút lại


document.addEventListener('DOMContentLoaded', () => {
  const aiButtons = document.querySelectorAll('.ai-btn');
  const closeButtons = document.querySelectorAll('.ai-close-btn');

  // Logic Đóng/Mở/Chuyển đổi khi bấm các nút chọn AI
  aiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetContainer = document.getElementById(targetId);

      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        if (targetContainer) targetContainer.style.display = 'none';
        return;
      }

      document.querySelectorAll('.ai-chat-container').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.ai-btn').forEach(el => el.classList.remove('active'));

      btn.classList.add('active');
      if (targetContainer) targetContainer.style.display = 'flex'; // Dùng flex để header hoạt động chuẩn
    });
  });

  // Logic khi bấm vào nút Đóng (✖)
  closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const targetId = closeBtn.getAttribute('data-close');
      
      // 1. Ẩn khung chat tương ứng
      const targetContainer = document.getElementById(targetId);
      if (targetContainer) targetContainer.style.display = 'none';

      // 2. Tìm và xóa class active của nút bấm kích hoạt khung chat đó
      const activeBtn = document.querySelector(`.ai-btn[data-target="${targetId}"]`);
      if (activeBtn) activeBtn.classList.remove('active');
    });
  });


});

document.addEventListener('DOMContentLoaded', () => {
  // Tìm tất cả các nút có class .close-all-ai
  const closeAllButtons = document.querySelectorAll('.close-all-ai');

  closeAllButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Ẩn tất cả khung chat cùng lúc
      document.querySelectorAll('.ai-chat-container').forEach(el => {
        el.style.display = 'none';
      });

      // 2. Xóa trạng thái sáng (active) của tất cả các nút kích hoạt
      document.querySelectorAll('.ai-btn').forEach(el => {
        el.classList.remove('active');
      });
    });
  });
});