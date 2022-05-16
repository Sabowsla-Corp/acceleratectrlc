console.log("Accelerate Copy Active");

initCopy();



function initCopy() {
  setTimeout(injectCopyButton, 5000);
  setTimeout(injectCopyButton, 12000);
  setTimeout(injectCopyButton, 22000);
  setTimeout(injectEmailData, 5000);
  setTimeout(injectEmailData, 12000);
  setTimeout(injectEmailData, 22000);
}


function injectEmailData() {
  if (document.getElementById("reportIssue") == null) {
    let btn = document.createElement("button");
    btn.innerHTML = " Issue ";
    btn.id = "reportIssue";
    btn.style.cssText = 'color:white';
    btn.style.border = "none";
    btn.title = "Report Internal Issue";
    btn.style.cursor = 'pointer';
    btn.style.backgroundColor = 'rgb(6, 196, 218)';
    let div = document.createElement("div");
    div.innerHTML = "--";
    div.style.cssText = "color:white";
    document.getElementById("load-overview-header__status").appendChild(div);
    document.getElementById("load-overview-header__status").appendChild(btn);
    btn.addEventListener('click', event => {
      reportIssue();
    });
  }
}



function reportIssue() {

  chrome.runtime.sendMessage({
    type: "notification", options: {
      type: "basic",
      title: "Test",
      message: "Test"
    }
  });
  localStorage.setItem('loadInfo', extractLoadData());
}

function injectCopyButton() {
  if (document.getElementById("arrivectrl") == null) {
    let btn = document.createElement("button");
    btn.innerHTML = " Copy ";
    btn.id = "arrivectrl";
    btn.style.cssText = 'color:white';
    btn.style.border = "none";
    btn.title = "Copy Load Info!";
    btn.style.cursor = 'pointer';
    btn.style.backgroundColor = 'rgb(6, 196, 218)';
    let div = document.createElement("div");
    div.innerHTML = "--";
    div.style.cssText = "color:white";
    document.getElementById("load-overview-header__status").appendChild(div);
    document.getElementById("load-overview-header__status").appendChild(btn);
    btn.addEventListener('click', event => {
      chrome.runtime.sendMessage({
        type: "notification", options: {
          type: "basic",
          title: "Test",
          message: extractLoadData()
        }
      });

      copyTextToClipboard(extractLoadData());
    });
  }
}


function extractLoadData() {
  let stopContainer = document.getElementById("stop-container");
  let loadInfo = document.getElementById("load-overview-header__status");

  let trimmedLoadInfo = " | " + loadInfo.textContent.slice(6, 13) + " | ";
  let stopList = stopContainer.getElementsByTagName("li");
  let trimmedStops = "";
  for (let i = 0; i < stopList.length; i++) {

    let stop = document.getElementById("stop-header-" + i + "__info-content__location");

    let endIndex = stop.textContent.indexOf(',') + 4;
    let trimmedStop = stop.textContent.slice(0, endIndex);
    trimmedStops += trimmedStop;
    if (i < stopList.length - 1) {
      trimmedStops += " to ";
    }
  }

  return trimmedLoadInfo + trimmedStops;
}


function copyTextToClipboard(finalSubject) {
  fallbackCopyTextToClipboard(finalSubject);
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(finalSubject);
    return;
  }
  navigator.clipboard.writeText(finalSubject).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });

}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}


