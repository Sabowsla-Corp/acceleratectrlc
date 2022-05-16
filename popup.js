function popup() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "message": "start" });
  });
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
 console.log(request.options.message);
  document.getElementById("Load Info").innerHTML = request.options.message;
  sendResponse();
});

function setSeparator(separator){
  console.log("Setting Separator");
  localStorage.setItem('separator', separator);
}