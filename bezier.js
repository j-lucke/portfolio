const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
let time = 1.0
let direction = 'down'
const radius = 2
let selectedPoint = null
let curve = []

const points = []
points.draw = drawPoints

function distance(x,y,a,b){
    return Math.sqrt((x-a)**2 + (b-y)**2)
}

function drawPoint() {
    ctx.strokeStyle = 'rgba(48, 146, 219, .1)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 6.28, false)
    ctx.stroke()
}

function drawPoints(){
    if (this.length == 0) 
        return
    this.forEach(p => {
        p.draw()
    })
    ctx.beginPath()
    ctx.moveTo(this[0].x, this[0].y)
    for (let i = 1; i < this.length; i++){
        ctx.lineTo(this[i].x, this[i].y)
    }
    ctx.stroke()
}

function drawCurve(points) {
    ctx.strokeStyle = 'rgba(48, 146, 219, 1)'
    ctx.lineWidth = 5
    ctx.beginPath()
    for (let i = 0; i < points.length - 1; i++) {
        ctx.moveTo(points[i].x, points[i].y)
        ctx.lineTo(points[i+1].x, points[i+1].y)
    }
    ctx.stroke()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
}

function Point(x, y) {
    this.x = x 
    this.y = y
    this.r = radius
    this.draw = drawPoint
}

function plot(a) {
    if (a.length == 0) {
        drawCurve(curve)
        return
    }
    if (a.length == 1){
        curve.push(a[0])
    }
    a.draw()
    const b = []
    b.draw = drawPoints
    for (let i = 0; i < a.length - 1; i++) {
        const x = ( a[i+1].x - a[i].x)*time + a[i].x
        const y = ( a[i+1].y - a[i].y)*time + a[i].y
        b.push(new Point(x,y))
    }
    plot(b)
}

function select(x,y){
    for (let i = 0; i < points.length; i++) {
        if (distance(points[i].x, points[i].y, x, y) < radius) 
            return points[i]
    }
    return null
}

document.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect()
    selectedPoint = select(event.x - rect.x, event.y - rect.y)
})

document.addEventListener('mousemove', (event) => {
    if (selectedPoint != null) {
        selectedPoint.x = event.x
        selectedPoint.y = event.y
        curve = []
    } 
})

document.addEventListener('mouseup', (event) => {
    if (selectedPoint == null) {
        points.push(new Point(event.x, event.y))
        curve = []
    }
    selectedPoint = null
})


points.push(new Point(700, 300))
points.push(new Point(800, 400))
points.push(new Point(753, 456))
points.push(new Point(606, 492))
points.push(new Point(478, 448))
points.push(new Point(382, 359))
points.push(new Point(274, 227))
points.push(new Point(381, 99))
points.push(new Point(485, 101))
points.push(new Point(533, 183))
points.push(new Point(518, 239))
points.push(new Point(428, 294))
points.push(new Point(241, 221))
points.push(new Point(168, 122))
points.push(new Point(96, 15))


const timerID = setInterval( () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    if (direction == 'up') time += 0.01
    else time -= 0.01
    if (time > 1) {
         direction = 'down'
         curve = []
    }
    if (time < 0) {
        direction = 'up'
        curve = []
    }

    let pinTip
    if (curve.length > 0)
        penTip = curve[curve.length-1] 
    else
        penTip = points[0]
        
    const gradient = ctx.createRadialGradient(penTip.x, penTip.y, 0, penTip.x, penTip.y, 2000)
    gradient.addColorStop(.3, 'white')
    gradient.addColorStop(0, 'rgba(224, 253, 255, .1)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    plot(points)

}, 30)