

// localStorage.clear();
document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử chứa các dự án
    const projectContainer = document.getElementById('projectContainer');
    const searchInput = document.querySelector('.input-search');
    
    // Hàm hiển thị các dự án từ localStorage
    function displayProjects() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];

        // Kiểm tra nếu không có dự án nào
        if (projects.length === 0) {
            projectContainer.innerHTML = "<p>Không có dự án nào để hiển thị.</p>";
            return;
        }

        // Hiển thị tất cả các dự án
        projects.forEach(project => {
            const projectCard = `
                <a href="./detail.html" class="link-card-detail">
                    <div class="project-card">
                        <div class="project-image">
                            <img src="${project.image || './img/What-Does-It-Mean-for-Computers.jpg'}" 
                                 alt="${project.name}">
                        </div>
                        <div class="project-details">
                            <h3 class="project-title">${project.name}</h3>
                            <p class="project-info">Chủ nhiệm: ${project.leader}</p>
                            <p class="project-info">Thời gian thực hiện: ${formatDate(project.fromDate)} - ${formatDate(project.toDate)}</p>
                            <div class="project-status">
                                <span class="in-progress status-badge">${project.status}</span>
                                <div class="status-result">
                                    <span>Kết quả nghiệm thu</span>
                                    <span class="result-badge in-progress">${project.result || 'Chưa có'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            projectContainer.insertAdjacentHTML('beforeend', projectCard);
        });
    }

    // Hàm format ngày tháng
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    // Hàm để làm nổi bật từ khóa tìm kiếm trong văn bản
    function highlightText(text, searchQuery) {
        const regex = new RegExp(`(${searchQuery})`, 'gi'); // Tìm từ khóa (không phân biệt chữ hoa chữ thường)
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // Hàm lọc các dự án theo từ khóa tìm kiếm
    function filterProjects() {
        const searchQuery = searchInput.value.trim().toLowerCase(); // Lấy giá trị tìm kiếm và chuyển thành chữ thường
        const projectCards = document.querySelectorAll('.project-card'); // Lấy tất cả các thẻ project-card

        // Kiểm tra nếu ô tìm kiếm rỗng
        if (searchQuery === "") {
            projectCards.forEach(card => {
                card.style.display = ''; // Hiển thị tất cả các dự án
                const title = card.querySelector('.project-title');
                const leader = card.querySelector('.project-info');

                // Khôi phục lại nội dung ban đầu của tên dự án và chủ nhiệm
                title.innerHTML = title.textContent;
                leader.innerHTML = leader.textContent;
            });
            return;
        }

        // Lọc các dự án và làm nổi bật từ khóa tìm kiếm
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title'); // Lấy tên dự án
            const leader = card.querySelector('.project-info'); // Lấy tên chủ nhiệm

            const titleText = title.textContent.toLowerCase(); // Chuyển tên dự án về chữ thường
            const leaderText = leader.textContent.toLowerCase(); // Chuyển tên chủ nhiệm về chữ thường

            // Kiểm tra nếu tên dự án hoặc tên chủ nhiệm khớp với từ khóa tìm kiếm
            if (titleText.includes(searchQuery) || leaderText.includes(searchQuery)) {
                card.style.display = ''; // Hiển thị nếu có phần tử trùng khớp

                // Làm nổi bật từ khóa tìm kiếm trong tên dự án và tên chủ nhiệm
                title.innerHTML = highlightText(title.textContent, searchQuery);
                leader.innerHTML = highlightText(leader.textContent, searchQuery);
            } else {
                card.style.display = 'none'; // Ẩn nếu không trùng khớp
            }
        });
    }

    // Thêm sự kiện khi người dùng gõ vào ô tìm kiếm
    if (searchInput) {
        searchInput.addEventListener('input', filterProjects);
    }

    // Gọi hàm hiển thị khi trang được load
    displayProjects();
});
