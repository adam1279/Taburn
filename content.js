document.body.setAttribute('data-tabLocked', 'false');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.greeting);
        if (request.greeting == "isTabLocked") {
            sendResponse({farewell: document.body.getAttribute('data-tabLocked')});
        }
        
});
console.log('huh');


