let biteSound = new Audio('../assets/sounds/bite.mp3')

$(document).ready(()=>{
    $('#pet').on('click', () => {
        biteSound.currentTime = 0
        biteSound.play()
        let score = $('#score').text()
        score = parseInt(score) + 10
        $('#score').text(score)
        $('#score-container').css('display', 'inline-block')
        if(gameStarted == false){
            gameStarted = true
        }
        $('#pet').css({ left: '-64px' })
    })
})