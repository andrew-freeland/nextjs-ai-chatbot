(function () {
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
      display: none;
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
      background: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
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
      animation: fadein 0.4s ease-out;
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
      transition: all 0.2s ease;
    }
    .bbp-button:hover {
      background-color: ${brandColor};
      color: white;
    }
    @keyframes fadein {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
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
      #bbp-chat-close {
        top: 14px;
        right: 14px;
      }
    }
  `;
  document.head.appendChild(style);

  // Create launcher
  var launcher = document.createElement("div");
  launcher.id = "bbp-chat-launcher";
  launcher.innerText = "💬";
  document.body.appendChild(launcher);

  // Create iframe
  var iframe = document.createElement("iframe");
  iframe.id = "bbp-chat-frame";
  iframe.src = chatUrl;
  document.body.appendChild(iframe);

  // Create close button
  var closeBtn = document.createElement("div");
closeBtn.id = "bbp-chat-close";
closeBtn.innerHTML = "&times;";
closeBtn.style.display = "none"; // start hidden

closeBtn.onclick = function () {
  iframe.style.display = "none";
  closeBtn.style.display = "none";
};

document.body.appendChild(closeBtn);

  // Preload welcome message with suggested actions
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

  // Launcher click → opens chat
launcher.addEventListener("click", function () {
  // Only show preload panel on first click
  if (iframe.style.display === "none" && preload.style.display === "none") {
    preload.style.display = "block";
    closeBtn.style.display = "none";
  } else {
    preload.style.display = "none";
    iframe.style.display = "block";
    closeBtn.style.display = "block";
  }
});

  // Auto-expand on load (after 2s)
  window.addEventListener("load", function () {
    setTimeout(function () {
      preload.style.display = "block";
    }, 2000);
  });
})();
  // -- BOOKING PANEL --
  window.bbpShowBooking = function () {
    preload.innerHTML = `<div><strong>Pick a time that works for you</strong><br><div id="bbp-time-slots" style="margin-top:10px;"></div>
      <button class="bbp-button" onclick="window.bbpShowMoreSlots()">Show more</button>
    </div>`;
    preload.style.display = "block";
    window.bbpFetchSlots(0);
  };

  var bbpSlotOffset = 0;

  window.bbpShowMoreSlots = function () {
    bbpSlotOffset += 5;
    window.bbpFetchSlots(bbpSlotOffset);
  };

  window.bbpFetchSlots = function (offset) {
    fetch("https://script.google.com/macros/s/AKfycbycTErCQ5RxZlHPiM7lmP_4qq0gv0E9L7_VudXZSv_i-XK5MA/exec?offset=" + offset)
      .then(res => res.json())
      .then(data => {
        var container = document.getElementById("bbp-time-slots");
        if (!container) return;
        data.slots.forEach(slot => {
          var btn = document.createElement("button");
          btn.className = "bbp-button";
          btn.innerText = formatTime(slot.start);
          btn.onclick = function () {
            window.bbpConfirmSlot(slot);
          };
          container.appendChild(btn);
        });
      });
  };

  function formatTime(iso) {
    var d = new Date(iso);
    return d.toLocaleString("en-US", {
      weekday: "short", month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit"
    });
  }
