import { Button, Col, Image, Input, InputNumber, Row, Tabs, TabsProps, Tooltip } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { db } from "../db/db"
import { useLiveQuery } from "dexie-react-hooks"
import { AttributeData, CharacterType, Pericia } from "../../types/CharacterType"
import { StatusBar } from "./StatusBar/statusBar"
import { attributeModifier, MOCK_ATTRIBUTES, rankToTrainingModifier } from "../../util/util"
import { SkillsTable } from "./skillsRender/skillsTable"
import { AttributesTable } from "./attributesTable/attributesTable"
import logo from '../../images/logo.png';


export const Sheet = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const character_id = id || 0
    const [editSheet, setEditSheet] = useState(false)
    const [mainColor, setMainColor] = useState("#076b07")
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
    
    const charactersList = useLiveQuery(
        async () => {
            const characters = await db.characters
                // eslint-disable-next-line no-useless-computed-key
                .where({ ["id"]: +character_id }).first()
            return characters
        }
    )

    const [character, setCharacter] = useState<CharacterType>(() => {
        if (charactersList !== undefined) {
            return charactersList
        }
        return { attributes: MOCK_ATTRIBUTES } as CharacterType
    })
    

    
    useEffect(() => {
        if (charactersList !== undefined) {
            setCharacter(charactersList)
        }
    }, [id, charactersList])
    
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
    
    
    const updateCharacter = (update: Partial<CharacterType>) => {
        setCharacter(
            (prev) => {
                return {
                    ...prev,
                    ...update
                }
            }
        )
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

    const updateAttributes = (_: AttributeData[]) => {
        setAttributes(_)
    }

    const updateMainColor = (_: string) => {
        setMainColor(_)
    }

    return (
        <Col span={24}
            style={{
                height: "100%",
                backgroundColor: "rgb(227, 225, 230, 0.95)",
                padding: "40px 50px 50px 75px"
            }}
        >
            <Row gutter={50}>
                <Col span={6}>
                    <Image style={{ height: '65vh', borderRadius: 10, objectFit: 'cover' }} preview={false} src={character.image} alt="" />
                    {character && <StatusBar character={character} characterUpdate={updateCharacter} />}
                </Col>
                <Col span={18}>
                    <Row>
                        <Col span={20} style={{ border: "1px solid black", borderRadius: 8 }}>
                            {editSheet && (
                                    <Row>
                                    <Col span={6} style={{ paddingTop: 22, paddingLeft: 11 }}>
                                        <Row>
                                            <Col span={24}>
                                                <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between' }}>
                                                    <Col span={10}>
                                                        Jogador:
                                                    </Col>
                                                    <Col span={14}>
                                                        <Input onChange={(e)=> updateCharacter({ playerName : e.target.value})} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Nome do Jogador"></Input>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={24} style={{ paddingTop: 21 }}>
                                                <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between', }}>
                                                    <Col span={10}>
                                                        Dinheiro:
                                                    </Col>
                                                    <Col span={14}>
                                                        <InputNumber min={0} onChange={(e)=> e!==null ? updateCharacter({ money : e}) : null} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Dinheiro na Conta"></InputNumber>
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
                                                        <Input onChange={(e)=> updateCharacter({ name: e.target.value})} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Nome do Personagem"></Input>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={24} style={{ paddingTop: 21 }}>
                                                <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between', }}>
                                                    <Col span={10}>
                                                        Peso:
                                                    </Col>
                                                    <Col span={14}>
                                                        <Input onChange={(e)=> updateCharacter({ weight: e.target.value})} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Peso"></Input>
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
                                                        <InputNumber  min={0} onChange={(e)=> e !== null ? updateCharacter({ age: e }) : null} className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Idade"></InputNumber>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={24} style={{ paddingTop: 21 }}>
                                                <Row style={{ fontSize: 10, alignItems: 'center', placeContent: 'space-between', }}>
                                                    <Col span={10}>
                                                        Altura:
                                                    </Col>
                                                    <Col span={14}>
                                                        <Input onChange={(e)=> updateCharacter({ height: e.target.value})}  className={'purple-shadow'} size="small" style={{ backgroundColor: "transparent", border: '1px solid black', fontSize: 10 }} placeholder="Altura"></Input>
                                                    </Col>
                                                </Row>
            
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                
                            )
                            }
                            {!editSheet && (
                                <Row gutter={20} style={{ padding: "20px 28px 20px 20px" }}>
                                    <Col span={8}>
                                        <Button className="purple-shadow black-hover btn" style={{ width: "100%", fontSize: 20, borderRadius: 8, backgroundColor: "transparent" }} size="large">Runas</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button className="purple-shadow black-hover btn" style={{ width: "100%", fontSize: 20, borderRadius: 8, backgroundColor: "transparent" }} size="large">Anotações</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button className="purple-shadow black-hover btn" style={{ width: "100%", fontSize: 20, borderRadius: 8, backgroundColor: "transparent" }} size="large">Progressão</Button>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                        <Col span={44} style={{ justifyItems: "self-end", textAlign: "center" }}>
                                        <div style={{ marginRight: 22 }}>
                                            <Tooltip title={<>Click Aqui Para Voltar</>} >
                                            <Image onClick={()=>window.history.back()}src={logo} height={53} preview={false}/>
                                            </Tooltip>
                                            <br />
                                            <Button
                                            //  disabled={!canSave}
                                              size="small"
                                               style={{ fontSize: 10, border: "1px solid black", background: 'transparent', borderRadius: 20, width: 72, marginTop: 7 }} 
                                            //    onClick={() => SaveCharacterSheet()}
                                               >
                                                <span style={{ borderBottom: -2, }}>
                                                    Salvar
                                                </span>
                                            </Button>
            
                                        </div>
                                    </Col>
                        <Col span={24} style={{ border: "1px solid black", borderRadius: 8, marginTop: 20 }}>
                            {editSheet && <AttributesTable attributes={{ value: actualAttributes, updateAttributes: updateAttributes }} color={{ value: mainColor, setColor: updateMainColor }} />}
                        </Col>
                        <Col span={24}>
                            <SkillsTable skills={actualAttributes} updatePericia={updateSkills} trainingMod={rankToTrainingModifier(character.rank)} />
                        </Col>
                    </Row>
                </Col>

            </Row >
        </Col >
    )
}