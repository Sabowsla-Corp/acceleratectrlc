console.log("Accelerate Copy Active");

initCopy();


function initCopy() {
  setTimeout(function () {
    let btn = document.createElement("button");
    btn.innerHTML = " Copy ";
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
      copyTextToClipboard(extractLoadData());
    });
    copyTextToClipboard(extractLoadData());
  }, 5000);


}


function extractLoadData() {
  let stopContainer = document.getElementById("stop-container");
  let loadInfo = document.getElementById("load-overview-header__status");

  let trimmedLoadInfo = " // " + loadInfo.textContent.slice(6, 13) + " // ";
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


