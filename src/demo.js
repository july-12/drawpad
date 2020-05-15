import React, { useRef, useEffect } from 'react';
import Tools from './tools';

const Demo = () => {
    const ref = useRef(null);
    const toolRef = useRef({ pen: {} });
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        const canvasboundingRect = canvas.getBoundingClientRect();

        const initialX = 0,
            initialY = 0;

        let prevPoint = [initialX, initialY],
            currPoint = [initialX, initialY],
            mousedown = false;

        function getEventCoord(e) {
            // const offsetTop = 36;

            const x = e.clientX - canvasboundingRect.left;
            const y = e.clientY - canvasboundingRect.top;
            return [x, y];
        }

        function draw() {
            ctx.beginPath();
            const { color, pen } = toolRef.current;
            ctx.strokeStyle = pen.key === 'eraser' ? canvas.style.background : color;
            ctx.lineWidth = pen.strokeWidth;
            ctx.moveTo(...prevPoint);
            ctx.lineTo(...currPoint);
            ctx.stroke();
            ctx.closePath();
        }

        canvas.addEventListener('mousedown', function (e) {
            prevPoint = currPoint = getEventCoord(e);
            mousedown = true;
        });
        canvas.addEventListener('mousemove', function (e) {
            if (mousedown) {
                prevPoint = currPoint;
                currPoint = getEventCoord(e);
                draw();
            }
        });
        canvas.addEventListener('mouseup', function () {
            mousedown = false;
        });
    }, []);

    return (
        <div className="demo">
            <section>
                <h3>A drawpad by canvas</h3>
                <canvas ref={ref} width={600} height={300} style={{ background: 'purple' }} />
            </section>
            <Tools
                ref={toolRef}
                onClear={() => {
                    const canvas = ref.current;
                    const boundingRect = canvas.getBoundingClientRect();
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, boundingRect.width, boundingRect.height);
                }}
            />
        </div>
    );
};

export default Demo;
