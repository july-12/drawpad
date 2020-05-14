import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { BlockPicker } from 'react-color';

import './tools.css';

const Tools = (props, ref) => {
    const pens = [
        {
            key: 'pencil',
            icon: 'iconhuabi',
            unicode: '0xe600',
            strokeWidth: 2
        },
        {
            key: 'pen',
            icon: 'icongangbi',
            unicode: '0xe681',
            strokeWidth: 4
        },
        {
            key: 'brush',
            icon: 'iconhuabi1',
            unicode: '0xe6c2',
            strokeWidth: 6
        },
        {
            key: 'quill',
            icon: 'iconshouyegangbi_icon',
            unicode: '0xe601',
            strokeWidth: 10
        },
        {
            key: 'eraser',
            icon: 'iconxiangpi',
            unicode: '0xe61a',
            strokeWidth: 18
        }
    ];

    const [currentPen, setCurrentPen] = useState(pens[0]);
    const [color, setColor] = useState('#f47373');
    const [colorVisible, setColorVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        color,
        pen: currentPen
    }));

    const toggleColor = () => {
        setColorVisible(!colorVisible);
    };

    return (
        <div className="tools">
            <ul>
                {pens.map((pen) => (
                    <li
                        key={pen.key}
                        className={pen.key === currentPen.key ? 'active' : ''}
                        onClick={() => setCurrentPen(pen)}
                    >
                        <i className={`drawpad-confont ${pen.icon}`}></i>
                    </li>
                ))}
                <li onClick={toggleColor}>
                    <i className="drawpad-confont iconyanse"></i>
                </li>
                <li>
                    <i className="drawpad-confont iconqingchu1"></i>
                </li>
                <li>
                    <i className="drawpad-confont iconbaocun"></i>
                </li>
            </ul>
            {colorVisible && (
                <div className="color-popover">
                    <div className="color-popover-mask" onClick={() => setColorVisible(false)} />
                    <BlockPicker
                        color={color}
                        onChange={(color) => {
                            setColor(color.hex);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default forwardRef(Tools);
