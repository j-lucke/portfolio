
const canvas = document.querySelector('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
ctx = canvas.getContext('2d')
ctx.lineWidth = 2
const width = 1000
const height = 500
let rect = canvas.getBoundingClientRect();
const offsetX = rect.x
const offsetY = rect.y

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
})

function distance(x,y,a,b) {
    return Math.sqrt((x-a)**2 + (y-b)**2)
}

function drawPoint() {
    ctx.strokeStyle = this.c
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 6.28, false)
    ctx.stroke()
}


drawLevel = function() {
    for (i=0; i<this.length; i++) {
        this[i].draw()
    }
    for (i=0; i < this.length - 1; i++) {
        ctx.strokeStyle = 'white'
        ctx.beginPath()
        ctx.moveTo(this[i].x, this[i].y)
        ctx.lineTo(this[i+1].x, this[i+1].y)
        ctx.stroke()
    }
}

function generateNextLevel(points) {
    const nextLevel = []
    for (i=0; i < points.length - 1; i++) {
        nextLevel.push(new Point(points[i].x, points[i].y, points[i].r, points[i].c))
    }
    nextLevel.draw = drawLevel
    return nextLevel
}

function Point(x, y, r, c) {
    this.x = x
    this.y = y
    this.r = r
    this.c = c
    this.draw = drawPoint
}

const levels = []
const points = []
points.push(new Point(300, 10, 5, 'pink'))
points.push(new Point(200, 100, 5, 'pink'))
points.push(new Point(700, 300, 5, 'pink'))
points.push(new Point(800, 400, 5, 'pink'))
points.draw = drawLevel
levels.push(points)


for (let i=0; i < 3; i++) {
    levels.push(generateNextLevel(levels[i]))
}

levels.draw = function() {
    for (let i=0; i < levels.length; i++) {
        levels[i].draw()
    }
    ctx.beginPath()
    ctx.moveTo(levels[0][0].x, levels[0][0].y)
    ctx.bezierCurveTo(levels[0][1].x, levels[0][1].y, levels[0][2].x, levels[0][2].y, levels[0][3].x, levels[0][3].y)
    ctx.stroke()
}

let selectedPoint = null
let time = 0
let direction = 'up'

setInterval( () => {
    if (direction == 'up')
        time += 0.01
    else
        time -= 0.01

    if (time > 1.0) {
        direction = 'down'
        ctx.clearRect(0,0,width,height)
    }

    if (time < 0.0) {
        direction = 'up'
    }

    
    for (let i = 1; i < levels.length; i++) {
        for (let j = 0; j < levels[i].length; j++) {
            levels[i][j].x = (levels[i-1][j+1].x - levels[i-1][j].x) * time + levels[i-1][j].x
            levels[i][j].y = (levels[i-1][j+1].y - levels[i-1][j].y) * time + levels[i-1][j].y
            //levels[i][j].draw()
        }
        //levels[i].draw()
    }
    

    levels[1][0].x = (levels[0][1].x - levels[0][0].x) * time  +  levels[0][0].x
    levels[1][0].y = (levels[0][1].y - levels[0][0].y) * time  +  levels[0][0].y
    levels[1][0].draw()

    //ctx.clearRect(0,0,width,height)

    const p = levels[3][0]
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 1000)
    gradient.addColorStop(.6, 'white')
    gradient.addColorStop(0.2, "rgba(224, 236, 255, 1)")
    gradient.addColorStop(0, 'rgb(224, 253, 255)')
    ctx.fillStyle = gradient
    ctx.fillRect(p.x-2000,p.y-2000,5000, 5000)
    levels.draw()
    p.draw()
    levels[0].draw()
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(levels[0][0].x, levels[0][0].y)
    ctx.bezierCurveTo(levels[0][1].x, levels[0][1].y, levels[0][2].x, levels[0][2].y, levels[0][3].x, levels[0][3].y)
    ctx.stroke()

}, 80)

document.addEventListener('mousedown', (event) => {
    for (let i = 0; i < points.length; i++) {
        if (distance(event.x - offsetX, event.y - offsetY, points[i].x, points[i].y) < 5) {
            selectedPoint = points[i]
        }
    }
})

document.addEventListener('mouseup', () => {
    selectedPoint = null
})

document.addEventListener('mousemove', (event) => {
    if (selectedPoint != null) {
        //ctx.clearRect(0, 0, width, height)
        selectedPoint.x = event.x - offsetX
        selectedPoint.y = event.y - offsetY
        points.draw()
    }
})
