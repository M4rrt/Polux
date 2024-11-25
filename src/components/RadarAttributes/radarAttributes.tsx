import { Col, ColorPicker } from "antd";
import { FC } from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { AttributeData } from "../../types/CharacterType";

interface IRadarAttributes {
    data: AttributeData[]
    widht?: number | string
    height?: number
    domain?: number[]
    color?: {
        value?: string,
        setColor: (_: string) => void
    }
}

export const RadarAttributes: FC<IRadarAttributes> = ({ data, widht, height, domain, color }) => {

    return <Col span={12} style={{position : "relative",alignContent : 'center'}}>
        <RadarChart style={{ marginLeft: 'auto', marginRight: 'auto' }} width={+`'${widht}'` || 300} height={height || 200} data={data} outerRadius={"80%"} >
            <PolarGrid stroke="#000000" opacity={0.7} />
            <PolarAngleAxis
                stroke={"#000000"}
                dataKey="subject"
                tickLine={false}
            />
            <PolarRadiusAxis opacity={0.2} key={0} angle={60} domain={domain || [0, 20]} stroke="#000000" />
            <Radar strokeWidth={3} name="Decan" dataKey="Attribute" stroke={color?.value} fill={color?.value} fillOpacity={0.4} />
            {/* <Legend /> */}
        </RadarChart>
        <ColorPicker 
        size="small"
            style={{position : "absolute", top : 21, right : 60}}
            defaultValue={color?.value || "#076b07"} onChange={
                (e, hex) => {
                    color?.setColor(e.toHexString())
                }
            }></ColorPicker>
    </Col>
}