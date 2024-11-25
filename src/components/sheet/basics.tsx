import { Col, Input, InputNumber, Row, Select } from "antd";
import { FC } from "react";
import { PointsBar } from "../poinstBar.tsx/pointsBar";
import { SelectRank } from "./SelectRank/selectRank";
import { CharacterType } from "../../types/CharacterType";
import { UploadImage } from "../uploadImage/uploadImage";

interface IBasics {
        Character: CharacterType
        updateCharacter: (_: Partial<CharacterType>) => void
}

export const Basics: FC<IBasics> = ({ Character, updateCharacter }) => {
        return <Col span={24}>
                <Row style={{ padding: 5 }}>
                        <Col span={2} style={{ textAlign: "end" }}>
                                Foto :
                        </Col>
                        <Col span={4} style={{ textAlign: "start", paddingLeft: 10 }}>
                                <UploadImage label={''} file={Character.image} updateFile={(e) => updateCharacter({ image: e })}></UploadImage>
                        </Col>
                        <Col span={2} style={{ textAlign: "end" }}>
                                Jogador :
                        </Col>
                        <Col span={4} style={{ textAlign: "start", paddingLeft: 10 }}>
                                <Input placeholder={'Jogador'} value={Character.playerName} onChange={(e) => updateCharacter({ playerName: e.target.value })} />
                        </Col>
                        <Col span={2} style={{ textAlign: "end" }}>
                                Nome :
                        </Col>
                        <Col span={4} style={{ textAlign: "start", paddingLeft: 10 }}>
                                <Input placeholder={'Nome do Personagem'} value={Character.name} onChange={(e) => updateCharacter({ name: e.target.value })} />
                        </Col>
                        <Col span={2} style={{ textAlign: "end" }}>
                                Idade :
                        </Col>
                        <Col span={4} style={{ textAlign: "start", paddingLeft: 10 }}>
                                <InputNumber min={0} style={{ width: "100%" }} placeholder={'Idade'} value={Character.age} onChange={(e) => e !== null ? updateCharacter({ age: e }) : null} />
                        </Col>
                </Row>
                <Row style={{ padding: 5 }}>
                        <Col span={2} style={{ textAlign: "end" }}>
                                Rank :
                        </Col>
                        <Col span={4} style={{ textAlign: "start", paddingLeft: 10 }}>
                                <SelectRank value={Character.rank} updateRank={(_: number) => {
                                        updateCharacter({ ...Character, rank: _ })
                                }} />
                        </Col>
                        <Col span={2} style={{ textAlign: "end" }}>
                                Dinheiro :
                        </Col>
                        <Col span={4} style={{ textAlign: "start", paddingLeft: 10 }}>
                                <InputNumber style={{ width: '100%' }} min={0} placeholder={'Dinheiro '} value={Character.money} onChange={(e) => e !== null ? updateCharacter({ money: e }) : null} />
                        </Col>
                        <Col span={2} style={{ textAlign: "end" }}>
                                Peso :
                        </Col>
                        <Col span={4} style={{ textAlign: "start", paddingLeft: 10 }}>
                                <Input placeholder={'Peso'} value={Character.weight} onChange={(e) => updateCharacter({ weight: e.target.value })} />
                        </Col>
                        <Col span={2} style={{ textAlign: "end" }}>
                                Altura :
                        </Col>
                        <Col span={4} style={{ textAlign: "start", paddingLeft: 10 }}>
                                <Input placeholder={'Altura'} value={Character.height} onChange={(e) => updateCharacter({ height: e.target.value })} />
                        </Col>
                </Row>
        </Col>
}