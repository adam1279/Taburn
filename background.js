    chrome.storage.sync.get(['tabLimit'], function(result) {
        if (result.tabLimit==undefined) {
            console.log('cjieofwhg');
            chrome.storage.sync.set({'tabLimit': 10});
        }
    });
    var tabCount;
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        console.log('Number of open tabs in all normal browser windows:',tabs.length);
        tabCount = tabs.length;
    });
    chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....");
        port.onMessage.addListener(function(msg) {
            console.log("message received" + msg);
            port.postMessage(tabCount);
        });
    });
    chrome.tabs.onCreated.addListener(function(port, tab) {
        chrome.tabs.query({currentWindow: true}, function(tabs) {
            console.log('Number of open tabs in all normal browser windows:',tabs.length);
            tabCount = tabs.length;
        }); 
        console.log("Connected .....");
        chrome.storage.sync.get(['tabLimit'], function(result) {
            if (tabCount > result.tabLimit) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.remove(tabs[0].id);
                });
            
            }
        });
    });
    chrome.tabs.onRemoved.addListener(function(tabId, port) {
        chrome.tabs.query({currentWindow: true}, function(tabs) {
            console.log('Number of open tabs in all normal browser windows:',tabs.length);
            tabCount = tabs.length;
        });
        /*chrome.storage.sync.get(['lockedTabs'], function(result) {
            //if (result.lockedTabs !== undefined) {
                lockedTabs = result.lockedTabs;
                console.log(lockedTabs);
                console.log(tabId);
                if (lockedTabs.includes(tabId)) {
                    for (var i = 0; i < lockedTabs.length; i++) {
                        if (lockedTabs[i] == tabId) {
                            lockedTabs.splice(i);
                        }
                    }
                    console.log(lockedTabs);
                    chrome.storage.sync.set({'lockedTabs': lockedTabs});
                }
                
            //}
        });*/
        console.log("Connected .....");
        port.onMessage.addListener(function(msg) {
            console.log("message received" + msg);
            port.postMessage(tabCount);
        });
        
    });
    chrome.windows.onCreated.addListener(function(windowId) {
        
    });
    /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "isTabLocked"}, function(response) {
            console.log('Wba '+response.farewell);
        });
    });*/
    /*chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(request.greeting);
            if (request.greeting == "closeCurrentTab") {
                sendResponse({farewell: 'what'});
                chrome.tabs.query({ active: true }, function(tabs) {
                    chrome.tabs.remove(tabs[0].id);
               });
            }
            
    });*/