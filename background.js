chrome.browserAction.onClicked.addListener(copyFromTab);


function copyFromTab(){
    console.log("Copying Background");
    chrome.tabs.sendMessage(tab.id, msg);
}

