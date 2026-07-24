
      (function () {
        var root = document.getElementById("root");
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
