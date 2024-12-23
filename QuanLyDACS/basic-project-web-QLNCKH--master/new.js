const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const toggleIcon = sidebarToggle.querySelector('i');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    toggleIcon.classList.toggle('fa-chevron-left');
    toggleIcon.classList.toggle('fa-chevron-right');
});

//BUTTON THÊM ẢNH
document.addEventListener("DOMContentLoaded", function () {
    const uploadBtn = document.getElementById("upload-btn");
    const fileInput = document.getElementById("file-input");
    const filePath = document.getElementById("file-path");
  
    // Khi nhấn nút +, kích hoạt input file
    uploadBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Ngăn hành vi mặc định
      event.stopPropagation(); // Ngăn sự kiện lan truyền
      fileInput.click();
    });
  
    // Khi người dùng chọn file
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        filePath.value = file.name; // Hiển thị tên file trong ô input
      } else {
        filePath.value = ""; // Xóa giá trị nếu không có file
      }
    });
  });
  
// //PHAN XU LY CHO 4 BUTTON TRANG THAI
// document.addEventListener('DOMContentLoaded', function() {
//     const buttonContainer = document.querySelector('.dex-button-container');
//     if (!buttonContainer) return;

//     const buttons = buttonContainer.querySelectorAll('.status-btn');
//     const allButton = buttonContainer.querySelector('[data-status="all"]');

//     // Ngăn chặn sự kiện click từ các phần tử cha
//     buttonContainer.addEventListener('click', (e) => {
//         e.stopPropagation();
//     });

//     buttons.forEach(button => {
//         button.addEventListener('click', function(e) {
//             e.stopPropagation();

//             if (this.dataset.status === 'all') {
//                 // Nếu click vào nút "Tất cả"
//                 buttons.forEach(btn => btn.classList.remove('active'));
//                 this.classList.add('active');
//             } else {
//                 // Nếu click vào các nút khác
//                 allButton.classList.remove('active');
//                 this.classList.toggle('active');
                
//                 // Kiểm tra nếu không có nút nào được chọn thì active nút "Tất cả"
//                 const hasActiveButton = Array.from(buttons)
//                     .some(btn => btn !== allButton && btn.classList.contains('active'));
                
//                 if (!hasActiveButton) {
//                     allButton.classList.add('active');
//                 }
//             }
//         });
//     });
// });

// //phan loc cua 4 button
// // Get DOM elements
// const statusButtons = document.querySelectorAll('.status-btn');
// const projectCards = document.querySelectorAll('.project-card');

// // Add click event listeners to all status buttons
// statusButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         // Remove active class from all buttons
//         statusButtons.forEach(btn => btn.classList.remove('active'));
        
//         // Add active class to clicked button
//         button.classList.add('active');
        
//         // Get the status to filter by
//         const statusToFilter = button.getAttribute('data-status');
        
//         // Filter projects based on status
//         projectCards.forEach(card => {
//             const statusBadge = card.querySelector('.status-badge');
//             const statusText = statusBadge.textContent.trim();
            
//             if (statusToFilter === 'all') {
//                 card.style.display = 'flex';
//                 return;
//             }
            
//             // Map status text to data-status values
//             const statusMap = {
//                 'Đã nghiệm thu': 'completed',
//                 'Đang thực hiện': 'in-progress',
//                 'Đã hủy': 'cancelled'
//             };
            
//             // Show/hide cards based on status
//             if (statusMap[statusText] === statusToFilter) {
//                 card.style.display = 'flex';
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     });
// });

// // Initialize with "all" filter active
// document.querySelector('[data-status="all"]').classList.add('active');

document.addEventListener('DOMContentLoaded', function () {
    const buttonContainer = document.querySelector('.dex-button-container');
    const projectCards = document.querySelectorAll('.project-card');

    if (!buttonContainer) return;

    const buttons = buttonContainer.querySelectorAll('.status-btn');

    buttonContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();

            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            this.classList.add('active');

            // Get the status to filter by
            const statusToFilter = this.dataset.status;

            // Filter the project cards
            projectCards.forEach(card => {
                const statusBadge = card.querySelector('.status-badge');

                if (!statusBadge) {
                    card.style.display = 'none';
                    return;
                }

                const statusText = statusBadge.textContent.trim();

                // Map status text to data-status values
                const statusMap = {
                    'Đã nghiệm thu': 'completed',
                    'Đang thực hiện': 'in-progress',
                    'Đã hủy': 'cancelled'
                };

                if (statusToFilter === 'all' || statusMap[statusText] === statusToFilter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize with "all" filter active
    document.querySelector('[data-status="all"]').click();
});



//phan kahc
let isEditing = false;
function toggleEdit() {
    isEditing = !isEditing;
    const inputs = document.querySelectorAll('.form-section input');
    const editButton = document.querySelector('.btn-edit');
            
    inputs.forEach(input => {
        // Không cho phép chỉnh sửa tên đăng nhập và email đăng nhập
        if (input.previousElementSibling.textContent !== 'Tên đăng nhập' && 
            input.previousElementSibling.textContent !== 'Email đăng nhập') {
            input.disabled = !isEditing;
        }
    });

    // Thay đổi style của nút edit khi đang trong chế độ chỉnh sửa
    if (isEditing) {
        editButton.style.backgroundColor = '#00b894';
        editButton.querySelector('img').style.filter = 'brightness(0) invert(1)';
    } else {
        editButton.style.backgroundColor = '#f1f1f1';
        editButton.querySelector('img').style.filter = 'none';
    }
}        

 // Xử lý nút Lưu
 document.querySelector('.btn-save').addEventListener('click', function() {
    if (isEditing) {
        // Thực hiện lưu dữ liệu ở đây
        toggleEdit(); // Tắt chế độ chỉnh sửa
        alert('Đã lưu thông tin thành công!');
    }
});

// Xử lý nút Đăng xuất
document.querySelector('.btn-logout').addEventListener('click', function() {
    alert('Đăng xuất thành công!');
});

// Xử lý nút Thay đổi mật khẩu
// document.querySelector('.btn-change-password').addEventListener('click', function() {
//     alert('Chuyển đến trang thay đổi mật khẩu');
// });



function openModal() {
    document.getElementById('passwordModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('passwordModal').style.display = 'none';
}

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const eyeOpen = button.querySelector('.eye-open');
    const eyeClosed = button.querySelector('.eye-closed');
    
    if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        input.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
}

function savePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('Mật khẩu mới và nhập lại mật khẩu mới không khớp!');
        return;
    }
    
    // Thực hiện lưu mật khẩu ở đây
    alert('Đổi mật khẩu thành công!');
    closeModal();
}

const emailLeft = document.getElementById("email-left");
const emailRight = document.getElementById("email-right");

emailRight.addEventListener("input", function() {
    emailLeft.value = emailRight.value;
});

// Đóng modal khi click bên ngoài
// window.onclick = function(event) {
//     const modal = document.getElementById('passwordModal');
//     if (event.target === modal) {
//         closeModal();
//     }
// }



//detail
// const projectContainer = document.getElementById('projectContainer');
// const detailPage = document.getElementById('detailPage');
// const backButton = document.getElementById('backButton');

// backButton.addEventListener('click', function() {
//     detailPage.style.display = 'none';
//     projectContainer.style.display = 'block';
//     window.scrollTo(0, 0);
// });

function showDetail() {
    document.getElementById('projectContainer').style.display = 'none';
    document.getElementById('detailPage').style.display = 'block';
}
function hideDetail() {
    document.getElementById('projectContainer').style.display = 'block';
    document.getElementById('detailPage').style.display = 'none';
}

//tuy chinh ngày tháng cho ô input datetime
const fromDateInput = document.getElementById('fromDate');
const toDateInput = document.getElementById('toDate');
const fromDateDisplay = document.getElementById('fromDateDisplay');
const toDateDisplay = document.getElementById('toDateDisplay');

const monthNames = {
    "01": "Tháng Một",
    "02": "Tháng Hai",
    "03": "Tháng Ba",
    "04": "Tháng Tư",
    "05": "Tháng Năm",
    "06": "Tháng Sáu",
    "07": "Tháng Bảy",
    "08": "Tháng Tám",
    "09": "Tháng Chín",
    "10": "Tháng Mười",
    "11": "Tháng Mười Một",
    "12": "Tháng Mười Hai"
};

fromDateInput.addEventListener('change', () => {
    const selectedMonth = fromDateInput.value.slice(5, 7);
    fromDateDisplay.textContent = monthNames[selectedMonth] + ' ' + fromDateInput.value.slice(0, 4);
});

toDateInput.addEventListener('change', () => {
    const selectedMonth = toDateInput.value.slice(5, 7);
    toDateDisplay.textContent = monthNames[selectedMonth] + ' ' + toDateInput.value.slice(0, 4);
});
       