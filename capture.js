const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx = canvas.getContext('2d')

let drawing = false

document.addEventListener('mousedown', (event) => {
    drawing = true
    ctx.beginPath()
    ctx.moveTo(event.x, event.y)
})

document.addEventListener('mousemove', (event) => {
    if (drawing) {
        console.log(event.x, event.y)
        ctx.lineTo(event.x, event.y)
    }
})

document.addEventListener('mouseup',() => {
    drawing = false
    ctx.stroke()
})