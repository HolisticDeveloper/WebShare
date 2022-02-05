// https://developer.chrome.com/extensions/contextMenus
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if ("WebShareLink" === info.menuItemId) {

        var url = info.pageUrl;
        info.mediaType ? url = info.srcUrl : info.linkUrl && (url = info.linkUrl);

        shareThis(tab.id, tab.title, info.selectionText, url)
    }
});

function logText(message, isError) {
    if (isError)
        console.error(message);
    else
        console.log(message);
}

function logError(message) {
    logText(message, true);
}

//function sendMail(tabId, subject, body) {
//    subject = encodeURIComponent(subject);
//    body = encodeURIComponent(body);

//    chrome.tabs.update(tabId, { url: "mailto:?subject=" + "&body=" + body })
//}

async function shareThis(tabId, title, text, url) {

// outlook target: https://www.microsoft.com/en-us/p/share-via-e-mail/9nblggh1znzz?rtc=1&activetab=pivot:overviewtab

    try {
        //await navigator.share({ undefined, title, text, url });
        await navigator.share({ title:title, text:text, url:url });
        logText('Successfully sent share');
    } catch (error) {
        logError('Error sharing: ' + error);
    }
}

function sharePage(data) {

    let title = data.title;
    let text = data.text;
    let url = data.url;

    shareThis(undefined, title, text, url);
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({ title: "Share", contexts: ["all"], id: "WebShareLink" })
});

// use sendMessage per https://stackoverflow.com/a/19758800/137646

chrome.browserAction.onClicked.addListener(
    function (tab) {
        //shareThis(tab.id, tab.title, "Shared this text", tab.url)
        chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, sharePage);
    });