function popup() {

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    console.log("Sending Message To Content");
    chrome.tabs.sendMessage(activeTab.id, { "message": "start" });
  });
}

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("CopyLoad").addEventListener("click", popup);
});