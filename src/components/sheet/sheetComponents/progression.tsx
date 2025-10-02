import { Col, ColorPicker, Row } from "antd";
import { FC } from "react";
import { ClassSelector } from "./classSelector";
import { classes } from "../../../types/CharacterType";

interface IProgression {
    classes: classes[]
    setClassName: (_: string, idx: number) => void
    setClassColor: (_: string, idx: number) => void
}

const Progression: FC<IProgression> = ({ classes, setClassColor, setClassName }) => {

    return <Row>
        <Col span={15
        } offset={1}>
            <Row style={{ marginTop: 10, marginBottom: 10, paddingTop: 10, paddingBottom: 10, border: "1px solid black", borderRadius: 10 }} gutter={[6, 8]}>
                <Col span={3} offset={1} style={{ paddingLeft: 10 }}>Ranking</Col>
                <Col span={3} style={{ paddingLeft: 10 }}>Dados (d10)</Col>
                <Col span={3} style={{ paddingLeft: 10 }}>Alvo Único</Col>
                <Col span={4} style={{ paddingLeft: 10 }}>Alvos Múltiplos</Col>
                <Col span={3} style={{ paddingLeft: 10 }}>Área (m²)</Col>
                <Col span={3} style={{ paddingLeft: 10 }}>Atributos</Col>
                <Col span={3} style={{ paddingLeft: 10 }}>Treinamentos</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>S</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>1.000</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>10.000</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>2.000</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>2.000</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>100</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>30</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>A+</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>750</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>7.500</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>1.500</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>1.500</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>90</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>25</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>A</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>450</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>4500</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>900</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>900</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>80</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>20</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>A-</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>250</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>2500</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>500</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>500</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>75</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>15</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>B+</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>150</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>1500</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>300</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>300</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>70</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>14</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>B</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>100</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>1000</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>200</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>200</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>65</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>13</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>B-</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>60</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>600</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>120</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>120</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>60</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>12</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>C+</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>40</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>400</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>80</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>80</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>55</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>11</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>C</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>25</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>250</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>50</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>50</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>50</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>10</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>C-</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>15</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>150</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>30</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>30</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>45</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>5</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>D</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>10</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>100</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>20</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>20</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>40</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>3</Col>
                <Col span={3} offset={1} style={{ paddingLeft: 18 }}>F</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>5</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>50</Col>
                <Col span={4} style={{ paddingLeft: 18 }}>10</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>10</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>35</Col>
                <Col span={3} style={{ paddingLeft: 18 }}>1</Col>
            </Row>
        </Col>
        <Col span={7} offset={1} 
        // style={{ alignContent: "center" }}
        >
            <Row gutter={[12, 10]}>
                <Col span={24} style={{textAlign: "center", fontSize: 20, marginBottom : 10, marginTop : 20}}>
                    Grade de Aulas
                </Col>
                {classes.map((classe, idx) => {
                    return (<Col span={24}>
                        <Row>
                            <Col span={7} style={{ alignContent: "center" }}>
                                {classe.day}
                            </Col>
                            <Col span={12}>
                                <ClassSelector id={idx} setClassName={setClassName} value={classe.name || ""} style={{ border: "1px solid black", borderRadius: 5 }} />
                            </Col>
                            <Col span={5} style={{ textAlign: "center" }}>
                                <ColorPicker value={classe.color} onChange={(_, color) => { setClassColor(color, idx) }} size="middle" />
                            </Col>
                        </Row>
                    </Col>)
                })}
            </Row>
        </Col>
    </Row>
};

export default Progression;
