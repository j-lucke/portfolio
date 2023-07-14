const canvas  = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const gradient = ctx.createRadialGradient(300, 300, 0, 300, 300, 300)
gradient.addColorStop(0, 'pink')
gradient.addColorStop(1, 'white')
ctx.fillStyle = gradient
ctx.fillRect(0,0,600,600)
ctx.beginPath()
ctx.arc(300,300,2,0,6.28,false)
ctx.stroke()


