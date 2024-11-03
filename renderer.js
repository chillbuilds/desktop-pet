/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */


let mousePos

$(document).mousemove(event => {
    mousePos = {x: event.clientX, y: event.clientY}
})

let screenWidth = window.outerWidth
let petWidth = $('#pet').width()
let petHeight = $('#pet').height()
let petPos = $('#pet').position()
let hovered = false

function checkMousePosition() {
    const inBounds = mousePos.x >= petPos.left &&
                           mousePos.x <= petPos.left + petWidth &&
                           mousePos.y >= petPos.top &&
                           mousePos.y <= petPos.top + petHeight

    if (inBounds && !hovered) {
        hovered = true
        window.electron.send('toMain', 'hovered')
    } else if (!inBounds && hovered) {
        hovered = false
        window.electron.send('toMain', 'left')
    }
}

let gameStarted = false

setInterval(function() {
    checkMousePosition()
    petWidth = $('#pet').width()
    petHeight = $('#pet').height()
    petPos = $('#pet').position()
    if(gameStarted == true){
        let x = petPos.left + 4
        $('#pet').css({ left: x + 'px'})
        if(petPos.left >= screenWidth + petWidth){
            $('#pet').css({ left: '-64px' })
        }
    }
}, 20)

// window.electron.send('toMain', 'inputValue')