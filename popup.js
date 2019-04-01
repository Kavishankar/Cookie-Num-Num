function cookieinfo(){

    chrome.storage.sync.get("cname", function(items){
        var cname = items["cname"];
        if (cname != undefined) {
            document.getElementById("cname").value = cname;
            chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
                chrome.cookies.getAllCookieStores(function(stores){
                    for(i=0;i<stores.length;i++) {
                        if (stores[i].tabIds.includes(tab[0].id)) {
                            chrome.cookies.getAll({"url":tab[0].url,"name": cname, "storeId":stores[i].id},function (cookie){
                                allCookieInfo = "";
                                for(i=0;i<cookie.length;i++){
                                    allCookieInfo = allCookieInfo + JSON.stringify(cookie[i].value);
                                }
                                if (allCookieInfo.length > 0) 
                                {
                                    allCookieInfo = allCookieInfo.substring(1,allCookieInfo.length-1)
                                    document.getElementById("data").innerText = allCookieInfo;
                                    navigator.clipboard.writeText(allCookieInfo);   
                                }         
                                else
                                {
                                    document.getElementById("data").innerHTML = "Cookie not found!"
                                }   
                            });
                        }
                    }
                });
            });
        }
        else 
        {
            document.getElementById("data").innerHTML = "Invalid Cookie Name!";
        }
    });
        setTimeout(function(){ window.close(); }, 10000);
}

window.onload=cookieinfo;
