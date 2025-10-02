import { Col, InputNumber, Row } from "antd"
import { FC, useState } from "react"
import { AttributeData, Pericia } from "../../../types/CharacterType"
import { iconNotTrained, iconTrained } from "../../icons/icons"
import { RadarSkills } from "../../radarSkills/radarSkills"

interface ISkillTables {
    skills: AttributeData[]
    updatePericia: (_: Pericia) => void
    trainingMod: number
}

export const SkillsTable: FC<ISkillTables> = ({ skills, updatePericia, trainingMod }) => {

    const [skillSet, setSkillSet] = useState(0)

    const ChangeTrainig = (_: Pericia) => {
        const newPericia = { ..._, treined: !_.treined }
        updatePericia(newPericia)
    }

    const ChangeBonus = (_: Pericia, e: number) => {
        const newPericia = { ..._, bonus: e }
        updatePericia(newPericia)
    }

    return (
        <Row style={{ border: '2px solid black', borderRadius: 10, marginTop: 20 }}>
            <Col span={14} style={{ border: '1px solid black', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
                <Col span={24}>
                    <Row>
                        {skills.map((att, i) => {
                            return (<Col key={`key-${att.name}-${i}`} span={4} onClick={() => setSkillSet(i)} style={{
                                padding: '3px',
                                textAlign: 'center',
                                fontSize: 10,
                                borderRight: i === 0 ? '1px solid black' : i === 5 ? '' : i === skillSet ? '' : "1px solid black",
                                borderLeft: i === 0 ? '' : i === skillSet ? '1px solid black' : "1px solid black",
                                borderBottom: i === skillSet ? '' : i === 0 ? '1px solid black' : "1px solid black"
                            }}>
                                <span style={{ textOverflow: "ellipsis", overflow: 'hidden', maxWidth: 80, display: "block" }}>
                                    {att.name}
                                </span>
                            </Col>)
                        })}
                    </Row>
                    <Row style={{ textAlign: "center", padding: '7px 5px' }}>
                        <Col span={4}>
                            treinado
                        </Col>
                        <Col span={5}>
                            Pericia
                        </Col>
                        <Col span={4}>
                            Modifidor
                        </Col>
                        <Col span={3}>
                            treino
                        </Col>
                        <Col span={5}>
                            Bonus
                        </Col>
                        <Col span={3}>
                            Total
                        </Col>

                        {skills[skillSet].pericias.map((per, i) => {
                            return (<Col span={24} key={`${per.name} ${i}`} style={{ paddingTop: 8 }}>
                                <Row>
                                    <Col span={4}>
                                        {per.treined ? iconNotTrained({ onClick: () => ChangeTrainig(per) }) : iconTrained({ onClick: () => ChangeTrainig(per) })}
                                    </Col>
                                    <Col span={5}>
                                        {per.name + ": "}
                                    </Col>
                                    <Col span={4}>
                                        {per.attMod}
                                    </Col>
                                    <Col span={3}>
                                        {per.treined ? trainingMod : 0}
                                    </Col>
                                    <Col span={5}>
                                        <InputNumber
                                            className="minimalInput"
                                            size={'small'}
                                            style={{
                                                textAlignLast: "center",
                                                backgroundColor: 'transparent',
                                                border: '1px solid black',
                                                width: '60%',
                                                height: 15,
                                                fontSize: 8,
                                                padding: 0
                                            }}
                                            value={per.bonus}
                                            onChange={(e) => {
                                                if (e !== null) ChangeBonus(per, e)
                                            }}
                                        >
                                        </InputNumber>
                                    </Col>
                                    <Col span={3}>
                                        {per.attMod! + (per.treined ? trainingMod : 0) + per.bonus!}
                                    </Col>
                                </Row>
                            </Col>

                            )
                        })}


                    </Row>
                </Col>
            </Col>
            <Col span={10}>
                <RadarSkills skills={skills[skillSet].pericias} trainedMod={trainingMod} widht={300} height={200} />
            </Col>
        </Row>)
}

