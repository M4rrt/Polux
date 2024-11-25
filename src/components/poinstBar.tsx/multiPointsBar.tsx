import { Col, Input, InputNumber, Row, Tooltip } from "antd";
import { FC, useMemo, useState } from "react";
import { Points } from "../../types/statusBarType";
import { CompassTwoTone } from "@ant-design/icons";
import { relative } from "path";


interface IMultiPointsBar {
    Points: Points[]
}

export const MultiPointsBar: FC<IMultiPointsBar> = ({ Points }) => {

    const maxPoints: number = useMemo(() => {

        const maxPoints = Points.reduce((a, b) => a + b.maxPoints, 0)

        return maxPoints

    }, [Points])

    const percentage = useMemo(() => {
        const percent = Points.map((p) => Math.max((p.maxPoints / maxPoints * 100), 10))
        const soma = percent.reduce((a, b) => a + b)
        const notRound = soma - 100

        if (notRound > 0) {
            const totalGreaterThan10 = percent.map((p) => p > 10 ? p : 0).reduce((a, b) => a + b)
            return percent.map((p) => p > 10 ? (p - (p / totalGreaterThan10 * notRound)) : p)
        } else if (notRound < 0) {
            const totalGreaterThan10 = percent.map((p) => p > 10 ? p : 0).reduce((a, b) => a + b)
            return percent.map((p) => p > 10 ? (p + (p / totalGreaterThan10 * notRound)) : p)
        }

        return percent
    },
        [maxPoints])


    return <Row>
        {maxPoints}
        <Col span={24}>
            <Row style={{ border: '2px solid black', borderRadius: 5 }}>
                {Points.map((p, i) => {
                    return <Col style={{ width: `${percentage[i]}%`, backgroundColor: p.darkerColor }}>
                        {!!p.points || p.points === 0 ?
                            <Row style={{position: "relative"}}>
                                <Col style={{position : "absolute", backgroundColor : `${p.color}`, width : `${p.points/p.maxPoints * 100}%`,height : 44}}></Col>
                                <Col offset={1} span={10} style={{ paddingTop: 4, paddingBottom: 4, textAlign: "end" }}>
                                    <Tooltip title={`Alterar ${p.title} Atual`}>
                                        <InputNumber
                                            style={{ width: p.points > 100 ? 70 : 50, textAlign: "end", backgroundColor: "transparent", border: 'none', fontSize: 18 }}
                                            value={p.points}
                                            min={0}
                                            onChange={(e) => {
                                                if ((e !== null)) {
                                                    console.log('try', !!p.set.setPoints)
                                                    p.set.setPoints && p.set.setPoints(+e)
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                </Col>
                                <Col span={1} style={{ fontSize: 24, paddingTop: 4, paddingBottom: 4, textAlign: "center" }}>
                                    /
                                </Col>
                                <Col span={12} style={{ paddingTop: 4, paddingBottom: 4 }}>
                                    <Tooltip title={`Alterar ${p.title} Máxima`}>
                                        <InputNumber
                                            style={{ width: p.maxPoints > 100 ? 70 : 50, backgroundColor: "transparent", border: 'none', fontSize: 18 }}
                                            value={p.maxPoints}
                                            min={0}
                                            onChange={(e) => {
                                                if (e !== null) {
                                                    console.log(!!p.set.setMax)
                                                    p.set.setMax && p.set.setMax(e)
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                </Col>
                            </Row> : <Row style={{position: "relative"}}>
                                <Col style={{position : "absolute", backgroundColor : p.maxPoints > 0 ? p.color : p.darkerColor, width : `${100}%`,height : 44}}></Col>
                                <Col span={24} style={{ paddingTop: 4, paddingBottom: 4, textAlign: "center" }}>
                                    <Tooltip title={`Alterar ${p.title} Atual `}>
                                        <Input
                                            style={{ width: p.maxPoints > 100 ? 70 : 50, textAlign: "center", backgroundColor: "transparent", border: 'none', fontSize: 18 }}
                                            value={p.maxPoints}
                                            onChange={(e) => {
                                                p.set.setPoints(+e.target.value)
                                            }}
                                        />
                                    </Tooltip>
                                </Col>
                            </Row>
                        }
                    </Col>
                })}
            </Row>
        </Col>
    </Row>
}
