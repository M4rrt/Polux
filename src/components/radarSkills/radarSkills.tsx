import { Col, ColorPicker } from "antd";
import { FC, useMemo } from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { Pericia } from "../../types/CharacterType";

interface IRadarSkills {
    skills: Pericia[]
    widht?: number
    height?: number
    trainedMod: number
}

export const RadarSkills: FC<IRadarSkills> = ({ skills, widht, height, trainedMod }) => {

    const data = useMemo(() => {
        const _2 = Math.max(...skills.map((skill) => skill.attMod! + skill.bonus! + (skill.treined ? trainedMod : 0)))
        const minMax = _2 > 5 ? _2 : 5
        const data = skills.map((skill) => {

            const name = skill.name
            const attribute = skill.attMod! + skill.bonus! + (skill.treined ? trainedMod : 0)
            return { name, attribute, fullMark: minMax }
        })
        return data
    }, [skills])

    const domain = useMemo(() => {
        const _ = Math.min(...skills.map((skill) => skill.attMod! + skill.bonus! + (skill.treined ? trainedMod : 0)))
        const _2 = Math.max(...skills.map((skill) => skill.attMod! + skill.bonus! + (skill.treined ? trainedMod : 0)))
        const maxMin = _ < -5 ? _ : -6
        const minMax = _2 > 5 ? _2 : 5
        return [maxMin, minMax]
    }, [skills])

    const color = skills[0].color

    return <Col span={24}>
        <RadarChart style={{ marginLeft: 'auto', marginRight: 'auto' }} width={ widht || 600} height={height || 300} data={data} outerRadius={"80%"} >
            <PolarGrid stroke="#000000" opacity={0.7} />
            <PolarAngleAxis
                stroke={"#000000"}
                dataKey="name"
                tickLine={false}
            />
            <PolarRadiusAxis opacity={0.2} key={0} angle={60} domain={domain} stroke="#000000" />
            <Radar strokeWidth={3} name="Decan" dataKey="attribute" stroke={color} fill={color} fillOpacity={0.4} />
        </RadarChart>
    </Col>
}