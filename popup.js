chrome.storage.sync.get(['tabLimit'], function (result) {

    console.log('Value currently is ' + result.tabLimit);
    var classes;
    function updateClasses() {
        allTags = document.body.getElementsByTagName('*');
        classNames = {};
        for (var tg = 0; tg < allTags.length; tg++) {
            tag = allTags[tg];
            if (tag.className) {
                clsses = tag.className.split(" ");
                for (var cn = 0; cn < clsses.length; cn++) {
                    cName = clsses[cn];
                    if (!classNames[cName]) {
                        classNames[cName] = true;
                    }
                }
            }
        }
        //Indsætter i et object, der kan bruges til hurtigt at finde alle classes.
        //Eksempel på brug: classes.navbar[0];
        classes = {};
        for (var name in classNames) {
            classes[name] = document.getElementsByClassName(name);
        }
    }
    updateClasses();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.storage.sync.get(['lockedTabs'], function (result4) {
            if (result4.lockedTabs !== undefined) {
                if (result4.lockedTabs.includes(tabs[0].url)) {
                    classes.lockButton[0].src = 'Locked.png';
                    classes.lockButton[0].title = 'Unlock Tab';
                    classes.lockButton[0].setAttribute('data-locked', 'true');
                }
            }


        });
    });
    classes.lockButton[0].addEventListener('click', function () {
        if (classes.lockButton[0].getAttribute('data-locked') == 'false') {
            lockTab();
        } else {
            unlockTab();
        }
    });
    function lockTab() {
        classes.lockButton[0].setAttribute('data-locked', 'true');
        classes.lockButton[0].src = 'Locked.png';
        classes.lockButton[0].title = 'Unlock Tab';
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.storage.sync.get(['lockedTabs'], function (result2) {
                if (result2.lockedTabs == undefined) {
                    lockedTabs = [tabs[0].url];

                } else {
                    lockedTabs = result2.lockedTabs;
                    lockedTabs.push(tabs[0].url);
                }
                chrome.storage.sync.set({ 'lockedTabs': lockedTabs });
                for (var i = 0; i < classes.locks.length; i++) {
                    if (classes.locks[i].getAttribute('data-url') == tabs[0].url) {
                        classes.locks[i].src = 'Locked_gray.png';
                        classes.locks[i].title = 'Unlock';
                        classes.locks[i].setAttribute('data-state', 'Locked');
                    }
                }
            });
        });
    } function unlockTab() {
        classes.lockButton[0].setAttribute('data-locked', 'false');
        classes.lockButton[0].src = 'Unlocked.png';
        classes.lockButton[0].title = 'Lock Tab';
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.storage.sync.get(['lockedTabs'], function (result5) {
                lockedTabs = result5.lockedTabs;
                for (var i = 0; i < lockedTabs.length; i++) {
                    if (lockedTabs[i] == tabs[0].url) {
                        lockedTabs.splice(i);
                    }
                }
                console.log(lockedTabs);
                chrome.storage.sync.set({ 'lockedTabs': lockedTabs });
                for (var i = 0; i < classes.locks.length; i++) {
                    if (classes.locks[i].getAttribute('data-url') == tabs[0].url) {
                        classes.locks[i].src = 'Unlocked_gray.png';
                        classes.locks[i].title = 'Lock';
                        classes.locks[i].setAttribute('data-state', 'Unlocked');
                    }
                }
            });
        });
    }

    var tabLimit = result.tabLimit;
    console.log(result.tabLimit);
    classes.limitInput[0].value = result.tabLimit;

    classes.limitInput[0].addEventListener('keydown', event => {
        if (event.key == 'Enter') {
            updateTabLimit();
            //window.close();
        }
    });
    /*classes.limitInput[0].addEventListener('focusout', function() {
        tabLimit = classes.limitInput[0].value;
        chrome.storage.sync.set({'tabLimit': tabLimit}, function() {

        });
        window.close();
        classes.limitInput[0].value = tabLimit;
    });*/
    classes.limitInputButton[0].addEventListener('click', updateTabLimit);
    function updateTabLimit() {
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
            if (tabs.length > classes.limitInput[0].value) {
                document.body.style.animationName = 'shake';
            } else {
                tabLimit = classes.limitInput[0].value;
                chrome.storage.sync.set({ 'tabLimit': tabLimit });
                document.body.style.animationName = 'reload';
            }
        })


    }
    /*var timeUnits = {
        mins: 1,
        hours: 60,
        days: 1440,
    }
    classes.pointerLeft[0].addEventListener('click', function() {
        classes.inputOption[0].innerHTML = Object.keys(timeUnits)[Object.keys(timeUnits).indexOf(classes.inputOption[0].innerHTML)-1];
    });
    classes.pointerRight[0].addEventListener('click', function() {
        if (Object.keys(timeUnits).indexOf(classes.inputOption[0].innerHTML)<=Object.keys(timeUnits).length) {
            console.log(Object.keys(timeUnits).indexOf(classes.inputOption[0].innerHTML)+'  '+Object.keys(timeUnits).length);
            classes.inputOption[0].innerHTML = Object.keys(timeUnits)[Object.keys(timeUnits).indexOf(classes.inputOption[0].innerHTML)+1];
        }
        
    });*/


    var tabCount;
    /*var portt = chrome.extension.connect({
        name: "Sample Communication"
    });
    portt.postMessage("Hi BackGround");
    portt.onMessage.addListener(function(msg) {
        console.log("message recieved" + msg);
        tabCount = msg;
        classes.tabCounter[0].innerHTML = tabCount;
        percentage = Math.round(100/tabLimit*tabCount);
        console.log(percentage);
        classes.tabCountBar[0].style.background = 'linear-gradient(to right, hsl('+(135-((percentage/100)*135))+', 100%, 40%) 0%, hsl('+(135-((percentage/100)*135))+', 100%, 50%) '+percentage+'%, white '+percentage+'%)';
    });*/
    /*chrome.storage.sync.get(['lockedTabs'], function(result6) {
        classes.lockedTabCounter[0].innerHTML = result6.lockedTabs.length;
        classes.lockedTabURLs[0].innerHTML = result6.lockedTabs;
    });*/
    function updatePopup() {
        classes.main[0].innerHTML = '';
        chrome.storage.sync.get(['lockedTabs'], function (result7) {
            chrome.tabs.query({ currentWindow: true }, function (tabs) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs2) {
                    classes.main[0].innerHTML = '';
                    console.log(tabs.length);
                    for (var i = 0; i < tabs.length; i++) {
                        active = '';
                        if (result7.lockedTabs !== undefined) {
                            if (result7.lockedTabs.includes(tabs[i].url)) {
                                lockState = 'Locked';
                                lockTitle = 'Unlock';
                            } else {
                                lockState = 'Unlocked';
                                lockTitle = 'Lock';
                            }
                        } else {
                            lockState = 'Unlocked';
                            lockTitle = 'Lock';
                        }
                        if (tabs2[0].id == tabs[i].id) {
                            active = " data-disabled='true'";
                        }
                        classes.main[0].innerHTML += "<div class='settingDiv'><table><tr><td>" + (i + 1) + '. ' + tabs[i].title + "</td><td style='text-align: right; width: 30px;' data-index='" + i + "'><img src='Close.png' title='Close Tab' class='closeButtons' data-id='" + tabs[i].id + "'><img" + active + " title='" + lockTitle + " Tab' class='locks' data-url='" + tabs[i].url + "' src='" + lockState + "_gray.png' data-state='" + lockState + "'><img" + active + " src='Search.png' title='Find Tab' class='searchButtons' data-id='" + tabs[i].id + "'></td><tr></table></div>";
                    }
                    updateClasses();
                    Array.from(classes.locks).forEach(function (element) {
                        console.log(element.getAttribute('data-disabled'));
                        if (element.getAttribute('data-disabled') !== 'true') {
                            element.addEventListener('click', lockChange);
                        }

                    });
                    Array.from(classes.closeButtons).forEach(function (element) {
                        element.addEventListener('click', function () {
                            console.log(this.getAttribute('data-id'));
                            chrome.tabs.remove(Number(this.getAttribute('data-id')));
                            /*elem = classes.settingDiv[this.parentNode.getAttribute('data-index')];
                            elem.parentNode.removeChild(elem);*/
                            //updatePopup();
                            document.body.style.animationName = 'reload';
                        });
                    });
                    Array.from(classes.searchButtons).forEach(function (element) {
                        if (element.getAttribute('data-disabled') !== 'true') {
                            element.addEventListener('click', function () {
                                console.log(this.getAttribute('data-id'));
                                chrome.tabs.update(Number(this.getAttribute('data-id')), { highlighted: true });
                                window.close();
                            });
                        }
                    });
                    classes.tabCounter[0].innerHTML = tabs.length;
                    percentage = Math.round(100 / tabLimit * tabs.length);
                    console.log(percentage, '%');
                    classes.tabCountBar[0].style.background = 'linear-gradient(to right, hsl(' + (135 - ((percentage / 100) * 135)) + ', 100%, 40%) 0%, hsl(' + (135 - ((percentage / 100) * 135)) + ', 100%, 50%) ' + percentage + '%, white ' + percentage + '%)';
                });
            });

        });

    }
    updatePopup();

    function lockChange() {
        console.log(this.getAttribute('data-state'));
        if (this.getAttribute('data-state') == 'Locked') {
            this.src = 'Unlocked_gray.png';
            this.title = 'Lock';
            this.setAttribute('data-state', 'Unlocked');
            url = this.getAttribute('data-url');
            chrome.storage.sync.get(['lockedTabs'], function (result9) {
                lockedTabs = result9.lockedTabs;
                for (var i = 0; i < lockedTabs.length; i++) {
                    if (lockedTabs[i] == url) {
                        lockedTabs.splice(i);
                    }
                }
                console.log(lockedTabs);
                chrome.storage.sync.set({ 'lockedTabs': lockedTabs });
                classes.lockedTabCounter[0].innerHTML = lockedTabs.length;
            });
            chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
                if (tab[0].url == url) {
                    unlockTab();
                }
                for (var elem of classes.locks) {
                    if (elem.getAttribute('data-url') == url) {
                        elem.src = 'Unlocked_gray.png';
                        elem.title = 'Lock';
                        elem.setAttribute('data-state', 'Unlocked');
                        url = elem.getAttribute('data-url');
                        chrome.storage.sync.get(['lockedTabs'], function (result9) {
                            lockedTabs = result9.lockedTabs;
                            for (var i = 0; i < lockedTabs.length; i++) {
                                if (lockedTabs[i] == url) {
                                    lockedTabs.splice(i);
                                }
                            }
                            console.log(lockedTabs);
                            chrome.storage.sync.set({ 'lockedTabs': lockedTabs });
                            classes.lockedTabCounter[0].innerHTML = lockedTabs.length;
                        });
                    }
                }
            });
        } else {
            this.src = 'Locked_gray.png';
            this.title = 'Unlock';
            this.setAttribute('data-state', 'Locked');
            url = this.getAttribute('data-url');
            chrome.storage.sync.get(['lockedTabs'], function (result8) {
                lockedTabs = result8.lockedTabs;
                lockedTabs.push(url);
                chrome.storage.sync.set({ 'lockedTabs': lockedTabs });
            });
            chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
                if (tab[0].url == url) {
                    lockTab();
                }
                for (var elem of classes.locks) {
                    if (elem.getAttribute('data-url') == url) {
                        elem.src = 'Locked_gray.png';
                        elem.title = 'Unlock';
                        elem.setAttribute('data-state', 'Locked');
                        url = elem.getAttribute('data-url');
                        chrome.storage.sync.get(['lockedTabs'], function (result8) {
                            lockedTabs = result8.lockedTabs;
                            lockedTabs.push(url);
                            chrome.storage.sync.set({ 'lockedTabs': lockedTabs });
                        });
                    }
                }
            });
        }

    }

    classes.burnAllButton[0].addEventListener('click', function () {
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
            chrome.storage.sync.get(['lockedTabs'], function (result3) {
                if (result3.lockedTabs !== undefined) {
                    unlockedTabs = [];
                    lockedTabs = result3.lockedTabs;
                    for (var i = 0; i < tabs.length; i++) {
                        if (!(lockedTabs.includes(tabs[i].url))) {
                            unlockedTabs.push(tabs[i].id);
                        } else {
                            console.log(tabs[i].url);

                            console.log(lockedTabs);
                            //lockedTabs.splice(lockedTabs.indexOf(tabs[i].url));
                        }
                    }
                    console.log(unlockedTabs);
                    console.log(lockedTabs);
                    chrome.tabs.remove(unlockedTabs);
                    //location.reload();
                } else {
                    chrome.tabs.create({ 'url': chrome.extension.getURL('popup.html') }, function (tab) {
                        // Tab opened.
                    });
                    for (var i = 0; i < tabs.length - 1; i++) {
                        chrome.tabs.remove(tabs[i].id);
                    }
                }
                document.body.style.animationName = 'reload';

            });
            console.log('ihoeihwoieghowiehg');

        });
    });
    document.body.addEventListener('animationend', function () {
        location.reload();
    });
    //classes.tabCountBar[0].style.background = 'linear-gradient(to right, green 50%, red 50%)';
    //classes.main[0].style.background = 'green';

});
