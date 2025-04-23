(function () {
  var brandColor = "#EB760F";
  var chatUrl = "https://chat.mybuilderbot.com/chat"; // <-- Use your actual working iframe domain

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
    }
    #bbp-chat-frame {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 400px;
      height: 500px;
      border: none;
      z-index: 9998;
      border-radius: 10px;
      display: none;
    }
    #bbp-chat-close {
      position: fixed;
      bottom: 570px;
      right: 25px;
      font-size: 22px;
      background: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      z-index: 10000;
      display: none;
      cursor: pointer;
    }
    #bbp-preload-message {
      position: fixed;
      bottom: 600px;
      right: 20px;
      background: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      font-family: 'Space Grotesk', sans-serif;
      z-index: 9999;
      max-width: 320px;
      display: none;
    }
    #bbp-prompt-buttons {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .bbp-button {
      padding: 8px 12px;
      font-size: 14px;
      font-family: 'Space Grotesk', sans-serif;
      border: 1px solid ${brandColor};
      border-radius: 6px;
      cursor: pointer;
      background-color: white;
      color: ${brandColor};
    }
    .bbp-button:hover {
      background-color: ${brandColor};
      color: white;
    }
  `;
  document.head.appendChild(style);

  // Launcher
  var launcher = document.createElement("div");
  launcher.id = "bbp-chat-launcher";
  launcher.innerText = "💬";
  document.body.appendChild(launcher);

  // Iframe
  var iframe = document.createElement("iframe");
  iframe.id = "bbp-chat-frame";
  iframe.src = chatUrl;
  document.body.appendChild(iframe);

  // Close button
  var closeBtn = document.createElement("div");
  closeBtn.id = "bbp-chat-close";
  closeBtn.innerHTML = "&times;";
  document.body.appendChild(closeBtn);

  // Preload panel
  var preload = document.createElement("div");
  preload.id = "bbp-preload-message";
  preload.innerHTML = `
    <div><strong>Hello there!</strong><br>How can we help you?</div>
    <div id="bbp-prompt-buttons">
      <button class="bbp-button" onclick="window.open('${chatUrl}', '_blank')">Ask about services</button>
      <button class="bbp-button" onclick="window.open('${chatUrl}', '_blank')">Schedule a call</button>
      <button class="bbp-button" onclick="window.open('${chatUrl}', '_blank')">Access account data</button>
    </div>
  `;
  document.body.appendChild(preload);

  // Launcher toggle
  launcher.addEventListener("click", function () {
    if (iframe.style.display === "none" && preload.style.display === "none") {
      preload.style.display = "block";
    } else {
      preload.style.display = "none";
      iframe.style.display = "block";
      closeBtn.style.display = "block";
    }
  });

  closeBtn.addEventListener("click", function () {
    iframe.style.display = "none";
    closeBtn.style.display = "none";
  });

  // Open preload after delay
  window.addEventListener("load", function () {
    setTimeout(function () {
      preload.style.display = "block";
    }, 2000);
  });
})();
