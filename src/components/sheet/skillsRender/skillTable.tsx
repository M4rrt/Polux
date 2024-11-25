import { StarFilled, StarTwoTone } from "@ant-design/icons";
import { Col, InputNumber, Row } from "antd";
import { FC } from "react";
import { Pericia } from "../../../types/CharacterType";
import { RadarSkills } from "../../radarSkills/radarSkills";

export interface ISkillTable {
    skills: Pericia[]
    updatePericia: (_: Pericia) => void
    trainingMod: number
}

export const SkillTable: FC<ISkillTable> = ({ skills, updatePericia, trainingMod }) => {

    const ChangeTrainig = (_: Pericia) => {
        const newPericia = { ..._, treined: !_.treined }
        updatePericia(newPericia)
    }

    const ChangeBonus = (_: Pericia, e: number) => {
        const newPericia = { ..._, bonus: e }
        updatePericia(newPericia)
    }

    return <>
        <Row>
            <Col span={12} style={{fontSize :10}}>
                <Row>
                    <Col span={4}>
                        treinado;
                    </Col>
                    <Col span={5}>
                        Nome;
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
                </Row>
                {skills.map((skill, i) => {
                    return <Col span={24} key={`${skill.name}+${i}`}>
                        <Row>
                            <Col span={4}>
                                {skill.treined ? <StarFilled onClick={() => ChangeTrainig(skill)} /> : <StarTwoTone onClick={() => ChangeTrainig(skill)} />}
                            </Col>
                            <Col span={5}>
                                {skill.name + ": "}
                            </Col>
                            <Col span={4}>
                                {skill.attMod}
                            </Col>
                            <Col span={3}>
                                {skill.treined ? trainingMod : 0}
                            </Col>
                            <Col span={5}>
                                <InputNumber style={{ textAlignLast: "center" }} value={skill.bonus} onChange={(e) => {
                                    if (e !== null) ChangeBonus(skill, e)
                                }}></InputNumber>
                            </Col>
                            <Col span={3}>
                                {skill.attMod! + (skill.treined ? trainingMod : 0) + skill.bonus!}
                            </Col>
                        </Row>
                    </Col>
                })}
            </Col>

            <Col span={10}>
                <RadarSkills skills={skills} trainedMod={trainingMod} />
            </Col>
        </Row>
    </>
}