import { FC } from "react";
import { CharacterType } from "../../../types/CharacterType";
import { Col, Input, InputNumber, Row } from "antd";
interface IBasics {
    character: CharacterType
    updateCharacter: (_: Partial<CharacterType>) => void
}

export const Basics: FC<IBasics> = ({ character,updateCharacter }) => {
    return (
        <Row>
            <Col span={6} style={{ paddingTop: 22, paddingLeft: 11 }}>
                <Row>
                    <Col span={24}>
                        <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between' }}>
                            <Col span={10}>
                                Jogador:
                            </Col>
                            <Col span={14}>
                                <Input value={character.playerName} onChange={(e) => updateCharacter({ playerName: e.target.value })} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Nome do Jogador"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ paddingTop: 21 }}>
                        <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between', }}>
                            <Col span={10}>
                                Dinheiro:
                            </Col>
                            <Col span={14}>
                                <InputNumber value={character.money} min={0} onChange={(e) => e !== null ? updateCharacter({ money: e }) : null} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10, width : "100%" }} placeholder="Dinheiro na Conta"/>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
            <Col offset={1} span={6} style={{ paddingTop: 22 }}>
                <Row>
                    <Col span={24}>
                        <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between' }}>
                            <Col span={10}>
                                Nome:
                            </Col>
                            <Col span={14}>
                                <Input value={character.name} onChange={(e) => updateCharacter({ name: e.target.value })} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Nome do Personagem"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ paddingTop: 21 }}>
                        <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between', }}>
                            <Col span={10}>
                                Peso:
                            </Col>
                            <Col span={14}>
                                <Input value={character.weight} onChange={(e) => updateCharacter({ weight: e.target.value })} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Peso"/>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
            <Col offset={1} span={6} style={{ paddingTop: 22 }}>
                <Row>
                    <Col span={24}>
                        <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between' }}>
                            <Col span={10}>
                                Idade:
                            </Col>
                            <Col span={14}>
                                <InputNumber value={character.age} min={0} onChange={(e) => e !== null ? updateCharacter({ age: e }) : null} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 ,width : "100%"}} placeholder="Idade"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ paddingTop: 21 }}>
                        <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between', }}>
                            <Col span={10}>
                                Altura:
                            </Col>
                            <Col span={14}>
                                <Input value={character.height} onChange={(e) => updateCharacter({ height: e.target.value })} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Altura"/>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}