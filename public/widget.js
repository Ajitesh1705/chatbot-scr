
(function () {
  const DEFAULT_STYLE = "position:fixed;bottom:20px;right:20px;width:350px;height:500px;border:none;z-index:10000;border-radius:12px;box-shadow:0 0 10px rgba(0,0,0,0.2)";

 
  const scriptEl = document.currentScript;
  const urlParams = new URL(scriptEl.src).searchParams;
  const companyId = urlParams.get("id");

  if (!companyId) {
    console.error("Chatbot Widget: No ?id= provided in the script URL.");
    return;
  }
  const iframeSrc =  `https://chatbot-scr.vercel.app/widget.js?company=${companyId}`;


  const iframe = document.createElement("iframe");
  iframe.src = iframeSrc;
  iframe.style.cssText = DEFAULT_STYLE;
  iframe.setAttribute("title", "Chatbot");
  iframe.setAttribute("allow", "microphone; camera; clipboard-read; clipboard-write");

  
  if (document.readyState === "complete" || document.readyState === "interactive") {
    document.body.appendChild(iframe);
  } else {
    window.addEventListener("DOMContentLoaded", () => document.body.appendChild(iframe));
  }
})();
