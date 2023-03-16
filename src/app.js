// chrome.webNavigation.onCompleted.addListener((e) =>
//   chrome.tabs.executeScript(e.tabId, {
//     file: "./src/hijacker.js",
//     allFrames: true,
//   })
// );
chrome.webNavigation.onCompleted.addListener((e) => {
    chrome.webNavigation.getAllFrames({tabId: e.tabId}, (frames) => {
    //   frames.forEach((frame) => {
        // if (frame.frameId === 1) {
          chrome.scripting.executeScript({
            target: {tabId: e.tabId},
            files: ["./src/hijacker.js"],
          });
        // }
      });
    // });
  });
  
  