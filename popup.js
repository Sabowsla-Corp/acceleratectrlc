function popup() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    console.log("Sending Message To Content");
    chrome.tabs.sendMessage(activeTab.id, { "message": "start" });
  });
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Received Message To Pop Up");
 
  sendResponse();
});
