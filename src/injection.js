function notify(message) {
    browser.runtime.sendMessage({content: message})
}

exportFunction(notify, window, {defineAs:'notify'})

window.eval(`
try {
    var musicKit = MusicKit.getInstance()

    musicKit.api.lyric(musicKit.nowPlayingItem.songId).then( data =>
        window.notify({ state: 'ok', type: 'lyrics', data: '' + data.ttml })
    ).catch (e => 
        window.notify({ state: 'err', type: 'no_lyrics', data: '' + e })
    )
} catch (e) {
    //window.notify({ state: 'err', type: 'not_apple_music', data: '' + e })
}
`)