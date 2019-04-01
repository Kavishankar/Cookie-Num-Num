
function saveMe(){
    cname = document.getElementById("cname").value;
    chrome.storage.sync.set({ "cname": cname }, function(){
        alert("Success!");
    });
}


document.getElementById("savepref").addEventListener("click", saveMe);