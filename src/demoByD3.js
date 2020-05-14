import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import Tools from './tools';

const DemoByD3 = () => {
    const ref = useRef(null);
    const toolRef = useRef(null);
    const backgroundColor = '#ddffdd';

    useEffect(() => {
        const base = d3.select(ref.current);
        const canvas = base
            .append('canvas')
            .attr('width', 600)
            .attr('height', 300)
            .attr('style', `background: ${backgroundColor}`);

        const ctx = canvas.node().getContext('2d');

        let mousedown = false;
        let lineIndex = 0;
        let lines = [];

        const linePath = d3
            .line()
            .context(ctx)
            .x(function (d) {
                return d[0];
            })
            .y(function (d) {
                return d[1];
            })
            .curve(d3.curveBasis);

        const movemouse = (coord) => {
            const { pen } = toolRef.current;
            const r = pen.strokeWidth / 2;

            // 笔
            ctx.font = '18px drawpad-confont';
            ctx.fillText(String.fromCharCode(parseInt(pen.unicode, 16)), coord[0], coord[1] - r);

            // 触点
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'purple';
            pen.key === 'eraser'
                ? ctx.strokeRect(coord[0] - r, coord[1] - r, r * 2, r * 2)
                : ctx.arc(coord[0], coord[1], r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        };

        const drawLine = () => {
            lines.forEach((line) => {
                ctx.beginPath();
                ctx.strokeStyle = line.stroke;
                const filterPoints = line.points.filter(
                    (p, i) => i % 4 === 0 || i === line.points.length - 1
                );
                linePath(filterPoints);
                ctx.lineWidth = line.lineWidth;
                ctx.stroke();
                ctx.closePath();
            });
        };

        canvas
            .on('mousedown', function () {
                mousedown = true;
            })
            .on('mousemove', function () {
                const coord = d3.mouse(this);

                ctx.clearRect(0, 0, 600, 300);

                if (mousedown) {
                    if (lines[lineIndex]) {
                        lines[lineIndex].points.push(coord);
                    } else {
                        const { color, pen } = toolRef.current;
                        lines[lineIndex] = {
                            stroke: pen.key === 'eraser' ? backgroundColor : color,
                            lineWidth: pen.strokeWidth,
                            points: []
                        };
                    }
                }
                drawLine();
                movemouse(coord);
            })
            .on('mouseup', function () {
                mousedown = false;
                lineIndex++;
            });
    }, []);

    return (
        <div className="demo demo-no-mouse">
            <section>
                <h3>A drawpad by canvas with d3</h3>
                <div className="wrapper" ref={ref}></div>
            </section>
            <Tools ref={toolRef} />
        </div>
    );
};

export default DemoByD3;
