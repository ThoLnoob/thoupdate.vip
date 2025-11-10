<!-- chèn <script src="report.js"></script> ở cuối body index.html -->
<script>
(() => {
  // Điền webhook của bạn ở đây
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1437387889221566558/e_ykUeOBlhxF0jXGTcOxTOyXEmumc_PXuIgcpLByh4-dPIgpPwVNSGuPb_qvdFGYCAtV";

  // Tạo popup báo lỗi
  const popupHTML = `
    <div id="reportModal" style="display:none;position:fixed;inset:0;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);z-index:120000;">
      <div style="width:92%;max-width:420px;background:#0d1117;padding:16px;border-radius:10px;border:1px solid rgba(0,255,200,0.06);">
        <h3 style="margin:0 0 8px;color:#00ffe0">📢 Gửi báo cáo</h3>
        <label style="font-size:13px;color:#cfeee7">Lỗi xảy ra</label>
        <select id="reportType" style="width:100%;padding:8px;border-radius:6px;margin-top:6px;">
          <option>Lỗi Web</option>
          <option>Lỗi Verify</option>
          <option>Lỗi Key</option>
          <option>Lỗi Liên kết</option>
          <option>Khác</option>
        </select>
        <label style="font-size:13px;color:#cfeee7;margin-top:10px;display:block">Vấn đề lỗi</label>
        <textarea id="reportMsg" rows="4" style="width:100%;padding:8px;border-radius:6px;margin-top:6px;"></textarea>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;">
          <button id="cancelReport" style="background:transparent;border:1px solid rgba(255,255,255,0.06);padding:8px 12px;border-radius:8px;color:#cfeee7">Hủy</button>
          <button id="sendReportBtn" style="background:#00ffe0;border:none;padding:8px 12px;border-radius:8px;color:#031218;font-weight:600">Gửi</button>
        </div>
        <div id="reportStatus" style="margin-top:8px;color:#bfeee0;font-size:13px"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', popupHTML);

  // Tạo nút report góc phải
  const btn = document.createElement("button");
  btn.id = "openReport";
  btn.innerText = "📢 Báo lỗi";
  Object.assign(btn.style, {position:"fixed",top:"18px",right:"18px",zIndex:99999,background:"#00ffe0",color:"#031218",border:"none",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",fontWeight:"600"});
  document.body.appendChild(btn);

  const modal = document.getElementById("reportModal");
  btn.onclick = () => modal.style.display = "flex";

  document.getElementById("cancelReport").onclick = () => {
    modal.style.display = "none";
    document.getElementById("reportStatus").textContent = "";
  };

  document.getElementById("sendReportBtn").onclick = async () => {
    const type = document.getElementById("reportType").value;
    const message = document.getElementById("reportMsg").value.trim();
    const status = document.getElementById("reportStatus");
    if (!message) { status.textContent = "⚠️ Vui lòng nhập mô tả."; return; }
    status.textContent = "⏳ Đang gửi...";

    try {
      const payload = {
        username: "Website Report",
        embeds: [{
          title: "🚨 Báo lỗi từ website",
          description: `**Lỗi xảy ra:** ${type}\n**Vấn đề lỗi:** ${message}\n**Time:** ${new Date().toISOString()}`,
          color: 15258703,
          timestamp: new Date().toISOString()
        }]
      };
      const resp = await fetch(WEBHOOK_URL, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      if (resp.ok) {
        status.textContent = "✅ Gửi thành công. Cảm ơn!";
        document.getElementById("reportMsg").value = "";
        setTimeout(()=>{ modal.style.display="none"; status.textContent=""; },1200);
      } else {
        status.textContent = "❌ Gửi thất bại!";
      }
    } catch(e) {
      status.textContent = "⚠️ Lỗi kết nối.";
    }
  };
})();
</script>
