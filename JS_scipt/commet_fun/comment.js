// JS_scipt/comment_fun/comment.js

function submitComment(event) {
    event.preventDefault();

    const form = document.getElementById('form1'); // ตรงกับ .aspx
    const status = document.getElementById('statusMessage');
    
    if (status) {
        status.style.display = 'block';
        status.textContent = 'กำลังส่งความคิดเห็น...';
        status.style.color = 'blue';
    }

    const formData = new URLSearchParams(new FormData(form));

    fetch('Contact.aspx', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        if (response.ok) {
            if (status) {
                status.textContent = 'ส่งความคิดเห็นสำเร็จ! กำลังโหลดใหม่...';
                status.style.color = 'green';
            }
            // แทนที่จะ reload ทั้งหน้า ให้โหลดเฉพาะ comment
            setTimeout(() => loadComments(), 800);
            form.reset(); // ล้างฟอร์ม
        } else {
            throw new Error('Server error: ' + response.status);
        }
    })
    .catch(error => {
        console.error(error);
        if (status) {
            status.textContent = 'ส่งไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
            status.style.color = 'red';
        }
    });
}

function escapeHtml(unsafe) {
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

async function loadComments() {
    const list = document.getElementById('commentList');
    if (!list) return;

    try {
        // ใช้ timestamp เพื่อป้องกัน cache
        const response = await fetch('data.csv?' + Date.now());
        
        if (!response.ok) {
            throw new Error('Cannot load comments');
        }

        const text = await response.text();
        const comments = parseCSV(text);

        if (comments.length === 0) {
            list.innerHTML = '<li style="background:#f5f5f5;padding:15px;border-radius:8px;color:#666;">ยังไม่มีใคร留言เลย เป็นคนแรกเลย!</li>';
            return;
        }

        list.innerHTML = comments.map(c => `
            <li style="background:#f8f9fa;padding:15px;margin-bottom:12px;border-radius:8px;border-left:4px solid #007bff;">
                <strong>${escapeHtml(c.User || 'Anonymous')}</strong>
                <small style="color:#666;margin-left:10px;">
                    ${escapeHtml(c.Date || '')} ${escapeHtml(c.Time || '')}
                </small>
                <p style="margin:8px 0 0 0;">${escapeHtml(c.Comment || '')}</p>
            </li>
        `).join('');

    } catch (error) {
        console.error('Load comments error:', error);
        list.innerHTML = '<li style="color:red;padding:10px;">ไม่สามารถโหลดความคิดเห็นได้ในขณะนี้</li>';
    }
}

// CSV Parser (ปรับปรุงเล็กน้อย)
function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim());
    
    return lines.slice(1)
        .filter(line => line.trim().length > 0)
        .map(line => {
            // วิธีแยก CSV แบบง่าย ๆ (รองรับ comma ใน quote)
            const values = [];
            let current = '';
            let inQuotes = false;
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"' && (i === 0 || line[i-1] !== '\\')) {
                    inQuotes = !inQuotes;
                }
                if (char === ',' && !inQuotes) {
                    values.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            values.push(current);
            const comment = {};
            headers.forEach((header, index) => {
                comment[header] = values[index];
            });
            return comment;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form1');
    if (form) {
        form.addEventListener('submit', submitComment);
    }
    loadComments();
});