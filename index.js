let tipEle = document.querySelector('.js_tips')
let canvas = document.getElementById("canvas")
// canvas 宽高设置为文档的高度
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

let ctx = canvas.getContext("2d")
let lineWidth = 10

ctx.fillStyle = "black"//填充颜色
ctx.strokeStyle = 'none'//描边颜色
ctx.lineWidth = lineWidth
ctx.lineCap = 'round'
let isPainting = false;
let last

var isTouchDevice = 'ontouchstart' in document.documentElement
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        paintBegin(e)
    }
    canvas.ontouchmove = (e) => {
        paint(e.touches[0])
    }
} else {
    canvas.onmousedown = (e) => {
        paintBegin(e)
    }
    canvas.onmousemove = (e) => {
        paint(e)
    }
    canvas.onmouseup = () => {
        isPainting = false;
    }
}
function paint(e) {
    if (isPainting === true) {
        drawLine(last.x, last.y, e.clientX, e.clientY)
        last = {
            x: e.clientX,
            y: e.clientY
        }
    }
}
function paintBegin(e) {
    if (tipEle) {
        tipEle.parentNode.removeChild(tipEle)
        tipEle = null
    }

    isPainting = true;
    drawDot(e.clientX, e.clientY)
    last = {
        x: e.clientX,
        y: e.clientY
    }
}
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}
function drawDot(x, y) {
    ctx.beginPath() // 每次画点必须重新 beginPath，否则画第2个点之后的点，fill会使得他们连成多边形。
    ctx.arc(x, y, lineWidth / 2, 0, 2 * Math.PI)
    ctx.fill() //不能用 stroke，否则受 lineWidth 属性影响外围会粗一圈。
}