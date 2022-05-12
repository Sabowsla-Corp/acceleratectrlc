chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var activeTab = tabs[0];
  console.log("Sending Message To Content From BG");
  chrome.tabs.sendMessage(activeTab.id, { "message": "start" });
});