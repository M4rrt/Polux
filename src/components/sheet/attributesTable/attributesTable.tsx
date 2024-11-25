import { Col, Input, InputNumber, Row } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { RadarAttributes, } from "../../RadarAttributes/radarAttributes";
import { attributeModifier } from "../../../util/util";
import { AttributeData } from "../../../types/CharacterType";

interface IAttributeTable {
    attributes: {
        value: AttributeData[],
        updateAttributes: (_: AttributeData[]) => void
    }
    color?: {
        value: string,
        setColor: (_: string) => void
    },

}

export const AttributesTable: FC<IAttributeTable> = ({ attributes, color }) => {

    const attributesValues = useMemo(() => {
        const attribute = attributes.value.map((value) => {
            return value
        })
        return attribute
    }, [attributes])
    return <Col style={{ border: '1px solid black', borderRadius: 10, marginTop: 20 }}>
        <Row>
            <Col span={12} style={{paddingBottom : 18}}>
                {attributesValues.map((value, index) => {
                    return <Row key={'attribute' + index} style={{ paddingLeft: 60, paddingTop: 10, fontSize: 10 }}>
                        <Col span={8} style={{alignContent : "center"}}>
                        {value.name}
                        </Col>
                        <Col span={16} >
                            <Row>
                                <Col span={12}>
                                    <InputNumber
                                        onChange={(e) => {
                                            if (e !== null) {
                                                attributes.updateAttributes(attributesValues.map((att, idx) => index === idx ?
                                                    { ...att, Attribute: e } : att)
                                                )
                                            }
                                        }}
                                        min={1}
                                        max={20}
                                        size="small"
                                        style={{ textAlignLast: "center",background: 'transparent', border: '1px solid black' }} value={value.Attribute} />

                                </Col>
                                <Col span={12}>

                                    <InputNumber
                                        size="small"
                                        style={{ textAlignLast: "center", background: 'transparent', border: '1px solid black' }}
                                        readOnly
                                        value={attributeModifier(value.Attribute)}
                                    >
                                    </InputNumber>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                })}
            </Col>
            <RadarAttributes data={attributes.value} color={color} />
        </Row>
    </Col>
}