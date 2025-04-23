(function () {
  // Brand styles
  var brandColor = "#EB760F";
  var chatUrl = "https://chat.mybuilderbot.com";

  // Inject styles
  var style = document.createElement("style");
  style.innerHTML = `
    #bbp-chat-launcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background-color: ${brandColor};
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      z-index: 9999;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Archivo Black', sans-serif;
      color: white;
      font-size: 28px;
      transition: all 0.3s ease;
    }
    #bbp-chat-launcher:hover {
      background-color: #cf670f;
    }
    #bbp-chat-frame {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 400px;
      height: 500px;
      border: none;
      z-index: 9998;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      border-radius: 10px;
      display: none;
    }
    #bbp-chat-close {
      position: absolute;
      top: 10px;
      right: 14px;
      font-size: 22px;
      color: #333;
      cursor: pointer;
      z-index: 10000;
    }
    @media (max-width: 600px) {
      #bbp-chat-frame {
        width: 100vw;
        height: 100vh;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 0;
      }
    }
  `;
  document.head.appendChild(style);
  // Create chat launcher
  var launcher = document.createElement("div");
  launcher.id = "bbp-chat-launcher";
  launcher.innerText = "💬";
  document.body.appendChild(launcher);

  // Create iframe container
  var iframe = document.createElement("iframe");
  iframe.id = "bbp-chat-frame";
  iframe.src = chatUrl;
  document.body.appendChild(iframe);

  // Open on load
  window.addEventListener("load", function () {
    iframe.style.display = "block";
  });

  // Launcher click toggles visibility
  launcher.addEventListener("click", function () {
    var isMobile = window.innerWidth < 600;
    if (isMobile) {
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
    }
    iframe.style.display = "block";
  });
})();
