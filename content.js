console.log("Accelerate Copy Active");

let loadInfo = document.getElementById("load");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log("Copying Data Now");
    
}


function copyTextToClipboard() {
    let loadInfo = document.getElementById("");
   if (!navigator.clipboard) {
     fallbackCopyTextToClipboard(loadInfo);
     return;
   }
   navigator.clipboard.writeText(loadInfo).then(function() {
     console.log('Async: Copying to clipboard was successful!');
   }, function(err) {
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