import { Col, Input, InputNumber } from "antd";
import { FC, useState } from "react";
import './pointsBar.css'
import { CharacterType } from "../../types/CharacterType";

interface IPointsBar {
    points?: {
        currentPoints: number,
        maxPoints: number,
        update: (_: number, _max?: number  ) => void,
    }
    barColor: string
}

export const PointsBar: FC<IPointsBar> = (
    { points, barColor }

) => {
    const percentage = (points!.currentPoints / points!.maxPoints) * 100;
    const mleft = points!.currentPoints >= 100 ? -2 : -12;


    return <>
        <Col className="points-bar" span={24} style={{backgroundColor : '#b80096',height : 44}}>
            <div
                className="points-bar-progress"
                style={{ width: `${percentage}%`, background: `${barColor}`,height: 44 }}
            ></div>
            <div className="points-bar--label" style={{ textAlign: "center",paddingTop: 4, paddingBottom: 4, margin: `0px 0px 0px ${mleft}px` }}>
                <Input
                    style={{ backgroundColor: 'transparent', width: (points!.currentPoints >= 100) ? 70 : 50, padding: 0 }}
                    value={points?.currentPoints}
                    onChange={(event) => {
                        if (event !== null && +event.target.value >= 0) {
                            +event.target.value >= points!.maxPoints ? points!.update(points!.maxPoints) : points?.update(+event.target.value)
                        }
                    }}
                    onBlur={(event) => {
                    }
                    }></Input>/
                    {/* make a way to show when the currentpoints are greater than maxPoints */}
                {points?.maxPoints}
            </div>
        </Col>
    </>
}