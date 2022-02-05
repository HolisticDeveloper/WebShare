// Listen for messages -- https://stackoverflow.com/a/19758800/137646
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {

        // https://stackoverflow.com/a/40002549/137646

        // meta properties: https://developers.facebook.com/docs/sharing/webmasters#markup


        let title = document.title;

        let ogTitle = document.head.querySelector("meta[property='og:title']");

        if (ogTitle) {
            title = ogTitle.content;
        }

        let text = undefined;

        let ogDescription = document.head.querySelector("meta[property='og:description']");

        if (ogDescription) {
            text = ogDescription.content;
        }

        let url = window.location.href;


        /*
         * https://web.dev/web-share/
         * 
         * If your site has multiple URLs for the same content, share the page's canonical URL instead of the current URL. Instead of sharing document.location.href, you would check for a canonical URL <meta> tag in the page's <head> and share that. This will provide a better experience to the user. Not only does it avoid redirects, but it also ensures that a shared URL serves the correct user experience for a particular client. For example, if a friend shares a mobile URL and you look at it on a desktop computer, you should see a desktop version:


let url = document.location.href;
const canonicalElement = document.querySelector('link[rel=canonical]');
if (canonicalElement !== null) {
    url = canonicalElement.href;
}
navigator.share({url: url});



*/


        let ogUrl = document.head.querySelector("meta[property='og:url']");

        if (ogUrl) {
            url = ogUrl.content;
        }

        sendResponse({ title, text, url });
    }
});
