class NavAnimation {
    constructor({ canvas, width, height }) {
        this.canvas = canvas // 获取canvas dom

        this.width = width || window.innerWidth
        this.height = height || '60'
        this.halfHeight = this.height >> 1
        canvas.width = this.width
        canvas.height = this.height

        this.ctx = this.canvas.getContext('2d')
        this.ctx.lineWidth = 2 // 线条的宽度
        this.ctx.strokeStyle = '#B99F65' // 圆的边框以及线条的颜色 偏棕色
        this.ctx.fillStyle = '#000' // 圆的填充颜色 黑色

        this.angleStep = 0.02 // 线条角度的变化速度
        this.circleStep = 0.2 // 圆大小的变化速度

        this.lines = null // 用于存放外侧的两根线条 {currentTheta, theta, length}
        this.nodes = null // 用于存放四个节点 {x, y}
        this.circles = null // 用于存放四个圆 {x, y, radius, currentRadius}

        this.animationIdx = null // requestAnimationFrame的返回值，用于清除动画
        this.flag = true // 执行开始动画or结束动画

        this.init()
    }

    // 初始化，绘制一条直线
    init() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.beginPath()
        this.ctx.moveTo(0, this.halfHeight)
        this.ctx.lineTo(this.width, this.halfHeight)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    /**
     * trigger用于触发开始动画，动画范围为[x - 40, x + 40]
     * @param {Number} x 
     */
    trigger(x) {
        // 清除上次的动画
        cancelAnimationFrame(this.animationIdx)
        let start = Math.max(x - 40, 0), end = Math.min(x + 40, this.width)

        // 随机获取中间两个点
        const [x1, y1] = this.getRandomXY(start, end)
        const [x2, y2] = this.getRandomXY(x1, end)

        // 初始化nodes数组
        this.nodes = [
            { x: start, y: this.halfHeight },
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            { x: end, y: this.halfHeight }
        ]

        this.lines = [] // 初始化lines数组
        this.circles = [] // 初始化circles数组

        for (let i = 0; i < this.nodes.length; i++) {
            this.circles.push({
                x: this.nodes[i].x,
                y: this.nodes[i].y,
                radius: 4 + Math.random() * 4,
                currentRadius: 0
            })

            if (i % 2 == 1) {
                this.lines.push({
                    currentTheta: 0,
                    // 获得线条的夹角
                    theta: Math.atan2(this.nodes[i].y - this.nodes[i - 1].y, this.nodes[i].x - this.nodes[i - 1].x),
                    // 获得线条的长度
                    length: this.getDistance(this.nodes[i].x, this.nodes[i].y, this.nodes[i - 1].x, this.nodes[i - 1].y)
                })
            }
        }

        this.circles[1].x = null
        this.circles[1].y = null
        this.circles[2].x = null
        this.circles[2].y = null

        // 开始动画
        this.flag = true
        this.animate()
    }

    /**
     * restore用于触发结束动画
     */
    restore() {
        this.flag = false
    }

    /**
     * getRandomXY用于获得随机节点坐标
     * @param {Number} start 
     * @param {Number} end 
     * @returns {Array} [随机的横轴坐标, 随机的纵轴坐标]
     */
    getRandomXY(start, end) {
        let offsetY = Math.random() * 20
        if (Math.random() < 0.5)
            offsetY = -offsetY
        return [start + Math.random() * (end - start), this.halfHeight + offsetY]
    }

    /**
     * getDistance用于获得节点距离
     * @param {Number} x1 
     * @param {Number} y1 
     * @param {Number} x2 
     * @param {Number} y2 
     * @returns  {Number} 节点距离
     */
    getDistance(x1, y1, x2, y2) {
        const d1 = x1 - x2, d2 = y1 - y2
        return Math.sqrt(d1 * d1 + d2 * d2)
    }

    /**
     * 渲染函数
     */
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height)

        this.drawStaticLine()
        this.drawDynamicLine()
        this.drawCricle()
    }

    /**
     * 绘制静止的线条
     */
    drawStaticLine() {
        this.ctx.beginPath()
        this.ctx.moveTo(0, this.halfHeight)
        this.ctx.lineTo(this.nodes[0].x, this.nodes[0].y)

        if (this.circles[2].x !== null) {
            this.ctx.moveTo(this.circles[2].x, this.circles[2].y)
            this.ctx.lineTo(this.nodes[3].x, this.nodes[3].y)
        }
        else
            this.ctx.moveTo(this.nodes[3].x, this.nodes[3].y)

        this.ctx.lineTo(this.width, this.halfHeight)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    /**
     * 绘制线条动画
     */
    drawDynamicLine() {
        if (!this.flag && this.lines[0].currentTheta === 0 && this.lines[1].currentTheta === 0) {
            this.init()
            return
        }

        this.ctx.beginPath()
        this.ctx.moveTo(this.nodes[0].x, this.nodes[0].y)

        // 更新currentTheta
        const updateTheta = (line) => {
            if (this.flag) {
                if (Math.abs(line.currentTheta) < Math.abs(line.theta)) {
                    line.theta > 0 ?
                        line.currentTheta += this.angleStep :
                        line.currentTheta -= this.angleStep
                }
                else line.currentTheta = line.theta
            }
            else {
                if (Math.abs(line.currentTheta) <= this.angleStep) {
                    line.theta > 0 ?
                        line.currentTheta -= this.angleStep :
                        line.currentTheta += this.angleStep
                }
                else line.currentTheta = 0
            }

            return line.currentTheta
        }

        for (let i = 0; i < this.lines.length; i++) {
            let tempX, tempY, line = this.lines[i]

            updateTheta(line)

            if (i === 0) {
                tempX = this.nodes[0].x + Math.cos(line.currentTheta) * line.length
                tempY = this.halfHeight + Math.sin(line.currentTheta) * line.length
            }
            else {
                tempX = this.nodes[3].x - Math.cos(line.currentTheta) * line.length
                tempY = this.halfHeight - Math.sin(line.currentTheta) * line.length
            }

            this.circles[i + 1].x = tempX
            this.circles[i + 1].y = tempY
            this.ctx.lineTo(tempX, tempY)
        }

        this.ctx.stroke()
        this.ctx.closePath()
    }

    /**
     * 绘制圆的动画
     */
    drawCricle() {
        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i]
            if (circle.x === null) continue

            // 更新圆的currentRadius
            if (this.flag)
                if (circle.currentRadius < circle.radius) {
                    circle.currentRadius += this.circleStep
                }
                else {
                    circle.currentRadius = circle.radius
                }
            else {
                if (circle.currentRadius >= this.circleStep) {
                    circle.currentRadius -= this.circleStep
                }
                else {
                    circle.currentRadius = 0
                }
            }
            this.ctx.beginPath()
            this.ctx.arc(circle.x, circle.y, circle.currentRadius, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }

    animate() {
        const update = () => {
            this.render()
            this.animationIdx = requestAnimationFrame(update)
        }
        update()
    }

    stop() {
        cancelAnimationFrame(this.animationIdx)
    }
}