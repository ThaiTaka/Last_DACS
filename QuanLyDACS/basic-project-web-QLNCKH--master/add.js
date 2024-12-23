document.addEventListener("DOMContentLoaded", function () {
    // Lấy form element
    const form = document.querySelector('form');

    // Xử lý nút Upload ảnh
    const uploadBtn = document.getElementById('upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            // Tạo input type file ẩn
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';

            // Xử lý khi chọn file
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Ở đây bạn có thể thêm code để xử lý file ảnh
                    // Ví dụ: upload lên server hoặc chuyển thành base64
                    document.getElementById('file-path').value = URL.createObjectURL(file);
                }
            });

            fileInput.click();
        });
    }

    // Thêm event listener cho form submit
    const submitButton = document.querySelector('.btn-submit');
    if (submitButton) {
        submitButton.addEventListener('click', handleProjectSubmit);
    }

    // Xử lý nút Hủy
    const resetButton = document.querySelector('.btn-reset');
    if (resetButton) {
        resetButton.addEventListener('click', clearForm);
    }

    // Xử lý phần thêm thành viên
    const memberContainer = document.getElementById("member-container");
    if (memberContainer) {
        document.querySelector(".add-member").addEventListener("click", () => {
            const group = document.createElement("div");
            group.className = "member-select-group";

            group.innerHTML = `
                <select class="input-field member-select">
                    <option value="">Chọn thành viên...</option>
                    <option value="Nguyễn Thị Lương">Nguyễn Thị Lương</option>
                    <option value="Phan Thị Thanh Nga">Phan Thị Thanh Nga</option>
                    <option value="Khánh">Khánh</option>
                    <option value="La Quốc Thắng">La Quốc Thắng</option>
                    <option value="Thiên Anh">Thiên Anh</option>
                    <option value="Quang">Quang</option>
                </select>
                <button class="remove-member">X</button>
            `;
            memberContainer.appendChild(group);
            validateMembers();
        });

        // Event delegation để xử lý sự kiện xóa và thay đổi combobox
        memberContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-member")) {
                event.target.parentElement.remove();
                validateMembers();
            }
        });

        memberContainer.addEventListener("change", (event) => {
            if (event.target.classList.contains("member-select")) {
                validateMembers();
            }
        });
    }

    // Hàm kiểm tra các giá trị và loại bỏ giá trị trùng lặp
    function validateMembers() {
        const selects = document.querySelectorAll(".member-select");
        const selectedValues = Array.from(selects).map(select => select.value);

        selects.forEach(select => {
            const currentValue = select.value;
            Array.from(select.options).forEach(option => {
                if (option.value && selectedValues.includes(option.value) && option.value !== currentValue) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            });
        });
    }

    // Xử lý khi form được submit
    function handleProjectSubmit(event) {
        event.preventDefault();

        // Lấy dữ liệu từ form
        const projectName = document.getElementById('project-name').value;
        const projectLeader = document.getElementById('leader').value;
        const fromDate = document.getElementById('fromDate').value;
        const toDate = document.getElementById('toDate').value;

        // Kiểm tra dữ liệu
        if (!projectName || !projectLeader || !fromDate || !toDate) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Tạo HTML cho thẻ project mới
        const newProject = `
            <a href="./detail.html" class="link-card-detail">
                <div class="project-card">
                    <div class="project-image">
                        <img src="${document.getElementById('file-path').value || './img/What-Does-It-Mean-for-Computers.jpg'}" 
                             alt="${projectName}">
                    </div>
                    <div class="project-details">
                        <h3 class="project-title">${projectName}</h3>
                        <p class="project-info">Chủ nhiệm: ${projectLeader}</p>
                        <p class="project-info">Thời gian thực hiện: ${formatDate(fromDate)} - ${formatDate(toDate)}</p>
                        <div class="project-status">
                            <span class="in-progress status-badge">Đang thực hiện</span>
                            <div class="status-result">
                                <span>Kết quả nghiệm thu</span>
                                <span class="result-badge in-progress">Chưa có</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;

        // Lưu project vào localStorage để giữ dữ liệu
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.push({
            name: projectName,
            leader: projectLeader,
            fromDate,
            toDate,
            image: document.getElementById('file-path').value,
            status: 'Đang thực hiện'
        });
        localStorage.setItem('projects', JSON.stringify(projects));

        // Thông báo thành công và reset form
        alert('Đã thêm đề tài mới thành công!');
        clearForm();
        window.location.href = 'index.html'; // Chuyển về trang danh sách
    }

    // Hàm format ngày tháng
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    // Hàm xóa form
    function clearForm() {
        document.getElementById('project-name').value = '';
        document.getElementById('leader').value = '';
        document.getElementById('fromDate').value = '';
        document.getElementById('toDate').value = '';
        document.getElementById('file-path').value = '';
        document.getElementById('description').value = '';
    }

});