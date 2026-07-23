
      (function () {
        var root = document.getElementById("root");
        if (window.__CARELINK_FILE_PROTOCOL__) {
          var bar = document.createElement("div");
          bar.setAttribute("role", "status");
          bar.style.cssText =
            "position:fixed;left:0;right:0;top:0;z-index:999999;padding:10px 14px;background:#fff7ed;border-bottom:1px solid #fdba74;color:#9a3412;font:700 12px/1.5 'Noto Sans KR',sans-serif;text-align:center";
          bar.innerHTML =
            'file:// 로 열렸습니다. 일부 기능이 제한될 수 있습니다. ' +
            '<code style="background:#ffedd5;padding:1px 6px;border-radius:4px">serve.ps1</code> 실행 후 ' +
            '<a href="http://127.0.0.1:5173/" style="color:#c2410c;text-decoration:underline">http://127.0.0.1:5173/</a> 사용을 권장합니다.';
          document.body.appendChild(bar);
        }
        if (root && !root.innerHTML.trim()) {
          root.innerHTML =
            '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Noto Sans KR,sans-serif;color:#334155">' +
            '<div style="text-align:center"><div style="width:36px;height:36px;border:3px solid #e5e7eb;border-top-color:#2563eb;border-radius:50%;animation:carelink-spin .8s linear infinite;margin:0 auto 12px"></div>' +
            '<p style="font-size:14px;font-weight:700">CareLink Admin 로딩 중…</p></div></div>';
        }
        var style = document.createElement("style");
        style.textContent = "@keyframes carelink-spin{to{transform:rotate(360deg)}}";
        document.head.appendChild(style);
        window.addEventListener("error", function (ev) {
          var msg = ev.message || "알 수 없는 오류";
          if (msg.indexOf("ResizeObserver loop") !== -1) return;
          if (root) {
            root.innerHTML =
              '<div style="max-width:720px;margin:40px auto;padding:20px;border:1px solid #fecaca;background:#fff1f2;border-radius:12px;font-family:monospace;font-size:12px;color:#991b1b">' +
              "<strong>앱 로드 오류</strong><br><br>" +
              msg +
              (ev.filename ? "<br><br>" + ev.filename + ":" + ev.lineno : "") +
              "</div>";
          }
        });
      })();
