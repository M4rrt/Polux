import { Button, Col, Image, Input, InputNumber, Row } from "antd";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import logo from '../../images/logo.png';
import { AttributeData, CharacterType, Pericia, statusBar } from "../../types/CharacterType";
import { attributeModifier, MOCK_ATTRIBUTES, rankToMana, rankToTrainingModifier } from "../../util/util";
import { db } from "../db/db";
import { UploadImage } from "../uploadImage/uploadImage";
import { SelectRank } from "./SelectRank/selectRank";
import { AttributesTable } from "./attributesTable/attributesTable";
import { SkillsTable } from "./skillsRender/skillsTable";

export const CreateCharacter = () => {
    const navigate = useNavigate()

    const [GeralSheet, setGeralSheet] = useState<CharacterType>({ statusBar: { maxLife: 50, maxMana: 15, maxArmor: 0, currentArmor: 0, currentLife: 0, currentMana: 0, currentShield: 0 }, rank: 10 } as CharacterType)
    // console.log(JSON.stringify(GeralSheet))

    const canSave: boolean = useMemo(() => {
        const canSave = (
            GeralSheet.age !== undefined &&
            GeralSheet.height !== undefined &&
            GeralSheet.image !== undefined &&
            GeralSheet.money !== undefined &&
            GeralSheet.name !== undefined &&
            GeralSheet.rank !== undefined &&
            GeralSheet.weight !== undefined
        )
        return canSave
    }, [GeralSheet])

    const updatePartialCharacter = (update: Partial<CharacterType>) => {
        setGeralSheet(
            (prev) => {
                return {
                    ...prev,
                    ...update
                }
            }
        )
    }

    const SaveCharacterSheet = async () => {
        if (canSave) {
            const statusBar: statusBar = { ...GeralSheet.statusBar, maxLife: 50 + attributes[2].Attribute * 5, maxMana: rankToMana(GeralSheet.rank) }
            console.log(statusBar)
            try {
                await db.characters.add({ ...GeralSheet, attributes: actualAttributes, statusBar })
                console.log('foi?')
            } catch {
                console.log('n pode ')
            }
        }
    }

    const [attributes, setAttributes] = useState<AttributeData[]>(MOCK_ATTRIBUTES.map((attribute) => {
        const updatedPericias = attribute.pericias.map((pericia) => {
            return {
                ...pericia,
                attMod: attributeModifier(attribute.Attribute),
                treined: false,
                bonus: 0
            } as Pericia
        })
        return { ...attribute, pericias: updatedPericias }
    }))

    const actualAttributes = useMemo(() => {
        const actual = attributes.map((attribute) => {
            const updatedPericias = attribute.pericias.map((pericia) => {
                return {
                    ...pericia,
                    attMod: attributeModifier(attribute.Attribute),
                } as Pericia
            })
            return { ...attribute, pericias: updatedPericias } as AttributeData
        })
        return actual
    }, [attributes])


    const updateAttributes = (_: AttributeData[]) => {
        setAttributes(_)
    }
    const updateSkills = (_: Pericia) => {
        setAttributes((prev) => {
            const newAttributes = prev.map((attribute) => {
                const pericias = attribute.pericias.map((pericia) =>
                    pericia.name === _.name ? _ : pericia
                )
                return { ...attribute, pericias } as AttributeData
            })
            return newAttributes as AttributeData[]
        })
    }

    const [mainColor, setMainColor] = useState("#076b07")
    const updateMainColor = (_: string) => {
        setMainColor(_)
    }

    return (
        <Col className="SheetHolder" style={{ overflow: "auto", height: "100%", backgroundColor: "rgb(227, 225, 230, 0.95)" }}>
            <Row style={{ padding: 30 }}>
                <Col span={5}>
                    <Row style={{ alignItems: "center" }}>
                        <Col span={24} style={{}}>
                            <UploadImage label='Foto:' file={GeralSheet.image} updateFile={(e) => updatePartialCharacter({ image: e })} />
                        </Col>
                        <Col span={5}>
                            Rank:
                        </Col>
                        <Col span={19}>
                            <SelectRank value={GeralSheet.rank} updateRank={(_: number) => {
                                updatePartialCharacter({ ...GeralSheet, rank: _ })
                            }} />
                        </Col>
                    </Row>
                </Col>

                {/* main */}
                <Col offset={1} span={18} style={{ fontSize: 10 }}>
                    {/* basics */}
                    <Row>
                        <Col span={6} style={{ paddingTop: 22, paddingLeft: 11 }}>
                            <Row>
                                <Col span={24}>
                                    <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between' }}>
                                        <Col span={10}>
                                            Jogador:
                                        </Col>
                                        <Col span={14}>
                                            <Input onChange={(e)=> updatePartialCharacter({ playerName : e.target.value})} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Nome do Jogador"></Input>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24} style={{ paddingTop: 21 }}>
                                    <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between', }}>
                                        <Col span={10}>
                                            Dinheiro:
                                        </Col>
                                        <Col span={14}>
                                            <InputNumber min={0} onChange={(e)=> e!==null ? updatePartialCharacter({ money : e}) : null} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Dinheiro na Conta"></InputNumber>
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
                                            <Input onChange={(e)=> updatePartialCharacter({ name: e.target.value})} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Nome do Personagem"></Input>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24} style={{ paddingTop: 21 }}>
                                    <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between', }}>
                                        <Col span={10}>
                                            Peso:
                                        </Col>
                                        <Col span={14}>
                                            <Input onChange={(e)=> updatePartialCharacter({ weight: e.target.value})} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Peso"></Input>
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
                                            <InputNumber  min={0} onChange={(e)=> e !== null ? updatePartialCharacter({ age: e }) : null} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Idade"></InputNumber>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24} style={{ paddingTop: 21 }}>
                                    <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between', }}>
                                        <Col span={10}>
                                            Altura:
                                        </Col>
                                        <Col span={14}>
                                            <Input onChange={(e)=> updatePartialCharacter({ height: e.target.value})}  className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Altura"></Input>
                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Col>
                        <Col span={4} style={{ justifyItems: "self-end", textAlign: "center" }}>
                            <div style={{ marginRight: 22 }}>
                                <Image src={logo} height={53} preview={false}></Image>
                                <br />
                                <Button disabled={!canSave} size="small" style={{ fontSize: 10, border: "1px solid black", background: 'transparent', borderRadius: 20, width: 72, marginTop: 7 }} onClick={() => SaveCharacterSheet()}>
                                    <span style={{ borderBottom: -2, }}>
                                        Salvar
                                    </span>
                                </Button>

                            </div>
                        </Col>
                    </Row>

                    <AttributesTable attributes={{ value: actualAttributes, updateAttributes: updateAttributes }} color={{ value: mainColor, setColor: updateMainColor }} />

                    <SkillsTable skills={actualAttributes} updatePericia={updateSkills} trainingMod={rankToTrainingModifier(GeralSheet.rank)}></SkillsTable>
                </Col>

            </Row>




            {/* <Button onClick={() => navigate('/')}>Voltar</Button>

            <Button disabled={!canSave} onClick={() => SaveCharacterSheet()}>Salvar ficha </Button> */}

        </Col>
    )
}