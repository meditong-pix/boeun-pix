
      (function () {
        if (window.location.protocol !== "file:") return;
        if (window.self !== window.top) {
          try {
            window.top.location.href = window.location.href;
            return;
          } catch (e) {}
          document.write(
            '<body style="margin:0;font-family:Noto Sans KR,sans-serif;background:#f8fafc;color:#0f172a">' +
            '<div style="max-width:560px;margin:48px auto;padding:24px;border:1px solid #fecaca;background:#fff;border-radius:12px">' +
            "<h1 style=\"font-size:18px;margin:0 0 12px\">file:// 미리보기에서는 실행할 수 없습니다</h1>" +
            "<p style=\"font-size:14px;line-height:1.6;margin:0 0 12px\">IDE 미리보기(iframe) + file:// 조합은 브라우저 보안 정책으로 차단됩니다.</p>" +
            "<p style=\"font-size:14px;line-height:1.6;margin:0 0 16px\"><strong>해결:</strong> 프로젝트 폴더에서 <code>serve.ps1</code> 실행 후 " +
            "<a href=\"http://127.0.0.1:5173/\">http://127.0.0.1:5173/</a> 로 접속하세요.</p>" +
            "<button type=\"button\" onclick=\"window.open(location.href,'_blank')\" style=\"padding:10px 14px;border-radius:8px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;font-weight:700\">새 브라우저 창에서 열기</button>" +
            "</div></body>"
          );
          throw new Error("file:// iframe blocked");
        }
        window.__CARELINK_FILE_PROTOCOL__ = true;
      })();
    