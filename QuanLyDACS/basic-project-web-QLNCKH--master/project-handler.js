// Store form data in localStorage
function saveFormData() {
    // Get all form values
    const formData = {
        projectName: document.getElementById('project-name').value,
        leader: document.getElementById('leader').value,
        status: document.getElementById('status').value,
        fromDate: document.getElementById('fromDate').value,
        toDate: document.getElementById('toDate').value,
        projectLevel: document.querySelector('.search-field select').value,
        projectType: document.querySelectorAll('.search-field select')[1].value,
        description: document.getElementById('description').value,
        members: Array.from(document.querySelectorAll('.member-select')).map(select => select.value).filter(value => value),
        acceptanceDate: document.getElementById('acceptance-date').value,
        result: document.getElementById('result').value,
        achievement: document.getElementById('achievement').value,
        rating: document.getElementById('rating').value
    };
    
    // Create the Firestore-like structure to match your existing data format
    const firestoreData = {
        documents: [{
            fields: {
                DeTai01: {
                    mapValue: {
                        fields: {
                            ChuNhiemDeTai: { stringValue: formData.leader },
                            ThoiGianThucHien: { timestampValue: formData.fromDate },
                            ThoiGianKetThuc: { timestampValue: formData.toDate },
                            TrangThai: { booleanValue: formData.status === 'Đã nghiệm thu' },
                            CoSo: { stringValue: formData.projectLevel },
                            Loai: { stringValue: formData.projectType },
                            TenDeTai: { stringValue: formData.projectName }
                        }
                    }
                },
                MoTaDeTai: {
                    arrayValue: {
                        values: formData.description.split('\n')
                            .filter(desc => desc.trim())
                            .map(desc => ({ stringValue: desc }))
                    }
                },
                GiangVienThamGia: {
                    arrayValue: {
                        values: formData.members.map(member => ({ stringValue: member }))
                    }
                },
                KetQuaThuNghiem: {
                    arrayValue: {
                        values: [
                            { stringValue: `Ngày nghiệm thu: ${formData.acceptanceDate}` },
                            { stringValue: `Giải - Thành tựu: ${formData.achievement}` },
                            { stringValue: `Xếp loại nghiệm thu: ${formData.rating}` }
                        ]
                    }
                }
            }
        }]
    };
    
    localStorage.setItem('researchProjectData', JSON.stringify(firestoreData));
    return firestoreData;
}

// Load and display saved data on the detail page
function loadProjectDetails() {
    const savedData = localStorage.getItem('researchProjectData');
    if (!savedData) return;

    const data = JSON.parse(savedData);
    const fields = data.documents[0].fields;
    const deTai = fields.DeTai01.mapValue.fields;

    // Update title
    const titleElement = document.querySelector('.detail-header h1');
    if (titleElement) {
        titleElement.textContent = deTai.TenDeTai.stringValue;
    }

    // Update basic info
    if (document.getElementById('chuNhiem')) {
        document.getElementById('chuNhiem').textContent = deTai.ChuNhiemDeTai.stringValue;
        
        // Format the date range
        const startDate = new Date(deTai.ThoiGianThucHien.timestampValue);
        const endDate = new Date(deTai.ThoiGianKetThuc.timestampValue);
        const dateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
        
        document.getElementById('thoiGian').textContent = dateRange;
        document.getElementById('trangThai').textContent = deTai.TrangThai.booleanValue ? 'Đã nghiệm thu' : 'Đang thực hiện';
        document.getElementById('coSo').textContent = deTai.CoSo.stringValue;
        document.getElementById('loai').textContent = deTai.Loai.stringValue;
    }

    // Update members list
    const membersList = document.getElementById('membersList');
    if (membersList && fields.GiangVienThamGia) {
        membersList.innerHTML = '';
        fields.GiangVienThamGia.arrayValue.values.forEach(member => {
            const li = document.createElement('li');
            li.textContent = member.stringValue;
            membersList.appendChild(li);
        });
    }

    // Update objectives/description
    const objectivesList = document.getElementById('objectivesList');
    if (objectivesList && fields.MoTaDeTai) {
        objectivesList.innerHTML = '';
        fields.MoTaDeTai.arrayValue.values.forEach(desc => {
            const li = document.createElement('li');
            li.textContent = desc.stringValue;
            objectivesList.appendChild(li);
        });
    }

    // Update results section
    if (fields.KetQuaThuNghiem && fields.KetQuaThuNghiem.arrayValue.values.length > 0) {
        const results = fields.KetQuaThuNghiem.arrayValue.values;
        if (document.getElementById('ngayNghiemThu')) {
            document.getElementById('ngayNghiemThu').textContent = results[0].stringValue;
            document.getElementById('giaiThanhTuu').textContent = results[1].stringValue;
            document.getElementById('xepLoaiNghiemThu').textContent = results[2].stringValue;
        }
    }
}

// Helper function to format dates
function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        return '';
    }
    return date.toLocaleDateString('vi-VN');
}

// Initialize form event listeners
function initializeForm() {
    const submitButton = document.querySelector('.btn-submit');
    const resetButton = document.querySelector('.btn-reset');

    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = saveFormData();
            alert('Đã lưu thông tin đề tài thành công!');
            window.location.href = 'index.html';
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (confirm('Bạn có chắc muốn hủy các thay đổi?')) {
                window.location.reload();
            }
        });
    }
}

// Add member function
function addMember() {
    const container = document.getElementById('member-container');
    const newGroup = document.createElement('div');
    newGroup.className = 'member-select-group';
    newGroup.innerHTML = `
        <select class="input-field member-select">
            <option value="">Chọn thành viên...</option>
            <option value="Nguyễn Thị Lương">Nguyễn Thị Lương</option>
            <option value="Phan Thị Thanh Nga">Phan Thị Thanh Nga</option>
            <option value="Khánh">Khánh</option>
            <option value="La Quốc Thắng">La Quốc Thắng</option>
            <option value="Thiên Anh">Thiên Anh</option>
            <option value="Quang">Quang</option>
        </select>
        <button class="remove-member" onclick="removeMember(this)">X</button>
    `;
    container.appendChild(newGroup);
}

// Remove member function
function removeMember(button) {
    const memberGroup = button.parentElement;
    if (document.querySelectorAll('.member-select-group').length > 1) {
        memberGroup.remove();
    }
}

// Initialize the page based on current URL
function initializePage() {
    if (window.location.pathname.includes('NewDeTai.html')) {
        initializeForm();
    } else {
        loadProjectDetails();
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);