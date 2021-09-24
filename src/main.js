var lyric_regex = new RegExp('<body(.*?)</body>')

function setMessage(text) {
    document.getElementById('message').innerHTML = text
}

browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    if (tabs[0].url.includes('music.apple.com/')) {
        setMessage('...')
    }
}, console.error),

browser.tabs.executeScript({
    file: "injection.js"
});

browser.runtime.onMessage.addListener((message) => {
    switch (message.content.type) {
        case 'lyrics':
            let body = lyric_regex.exec(message.content.data)[0];
            setMessage(body);
            break;
        default:
            setMessage('This song doesn\'t have lyrics')
            break;
    }
});