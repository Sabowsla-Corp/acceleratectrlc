chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var activeTab = tabs[0];
  console.log("Sending Message To Content From BG");
  chrome.tabs.sendMessage(activeTab.id, { "message": "start" });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Received Message Content");
  goToGmailAndInject();
  sendResponse();
});



function inject(tab) {
  console.log("Tab ID " + tab.id);
  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    files: ['gmail.js'],
  });
}




async function goToGmailAndInject() {
  let queryOptions = { url: ["https://mail.google.com/*"], currentWindow: false };
  let [tab] = await chrome.tabs.query(queryOptions, (tab) => {
    console.log(tag[0]);
    if(tab[0] == null){
      window.open( 
        "https://mail.google.com/*", "_blank");
    }
    inject(tab[0]);
  });
 

  return tab;
}

