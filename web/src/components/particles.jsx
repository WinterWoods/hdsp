import React, { Component } from 'react';

export default class Particles extends Component {
    constructor(props) {
        super(props);
        this.colors = ["255, 255, 255", "253, 55, 255", "167,245,255", "167,241,225", "167,25,255", "111,165,221"];
        this.blurry = !0;
        this.border = !1;
        this.minRadius = 10;
        this.maxRadius = 35;
        this.minOpacity = .005;
        this.maxOpacity = .5;
        this.minSpeed = .05;
        this.maxSpeed = 1;
        this.fps = 60;
        this.numParticles = 50;

        this.state = {
            menuVisible: false,
            isLoading: true,
            msg: {},
            bgName: "bg1"
        };
    }
    componentDidMount() {
        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        console.log(this.canvas.height, this.canvas.width);
        this.init(3);
    }
    init = (t) => {
        this.maxSpeed = t;
        this.createCircle();
    }
    _rand = (t, a) => {
        return Math.random() * (a - t) + t;
    }
    createCircle = () => {
        for (var t = [], a = 0; a < this.numParticles; a++) {
            var i = this;
            var r = i.colors[~~i._rand(0, i.colors.length)];
            t[a] = {
                radius: i._rand(i.minRadius, i.maxRadius),
                xPos: i._rand(0, this.canvas.width),
                yPos: i._rand(0, this.canvas.height),
                xVelocity: i._rand(i.minSpeed, i.maxSpeed),
                yVelocity: i._rand(i.minSpeed, i.maxSpeed),
                color: "rgba(" + r + "," + i._rand(i.minOpacity, i.maxOpacity) + ")"
            };
            i.draw(t, a);
        }
        i.animate(t)
    }
    draw = (t, a) => {
        var i = this;
        var r = i.ctx;
        if (i.blurry === !0) {
            var e = r.createRadialGradient(t[a].xPos, t[a].yPos, t[a].radius, t[a].xPos, t[a].yPos, t[a].radius / 1.25);
            e.addColorStop(1, t[a].color);
            e.addColorStop(0, "rgba(34, 34, 34, 0)");
            r.fillStyle = e;
        } else
            r.fillStyle = t[a].color;
        i.border === !0 && (r.strokeStyle = "#fff",
            r.stroke());
        r.beginPath();
        r.arc(t[a].xPos, t[a].yPos, t[a].radius, 0, 2 * Math.PI, !1);
        r.fill();
    }
    animate = (t) => {
        var a = this;
        a.ctx;
        setInterval(function () {
            a.clearCanvas();
            for (var i = 0; i < a.numParticles; i++)
                t[i].xPos += t[i].xVelocity,
                    t[i].yPos -= t[i].yVelocity,
                    t[i].xPos > a.canvas.width + t[i].radius || t[i].yPos > a.canvas.height + t[i].radius ? a.resetParticle(t, i) : a.draw(t, i)
        }, 1e3 / a.fps);
    }
    resetParticle = (t, a) => {
        var i = this;
        var r = i._rand(0, 1);
        r > .5 ? (t[a].xPos = -t[a].radius,
            t[a].yPos = i._rand(0, this.canvas.height)) : (t[a].xPos = i._rand(0, this.canvas.width),
                t[a].yPos = this.canvas.height + t[a].radius);
        i.draw(t, a);
    }
    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        return (
            <canvas className={this.props.className} ref="canvas" ></canvas>
        );
    }
}
Particles.propTypes = {
};

Particles.defaultProps = {
    id: "canvas1",
    className: ""
};

