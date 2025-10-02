import { Button, Col, Image, Row, Tooltip } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router"
import { db } from "../db/db"
import { useLiveQuery } from "dexie-react-hooks"
import { anotation, AttributeData, CharacterType, Pericia, rune } from "../../types/CharacterType"
import { StatusBar } from "./StatusBar/statusBar"
import { attributeModifier, MOCK_ATTRIBUTES, rankToTrainingModifier } from "../../util/util"
import { SkillsTable } from "./skillsRender/skillsTable"
import { AttributesTable } from "./attributesTable/attributesTable"
import logo from '../../images/logo.png';
import { Runes } from "./sheetComponents/runes"
import { Anotations } from "./sheetComponents/anotations"
import { Basics } from "./sheetComponents/basics"
import Progression from "./sheetComponents/progression"

export const Sheet = () => {
    const { id } = useParams()
    const character_id = id ? +id : 0 || 0
    const [editSheet, setEditSheet] = useState(false)
    const [mainColor, setMainColor] = useState("#076b07")

    const [auxiliar, setAuxiliar] = useState(1)


    const selectedCharacter = useLiveQuery(
        async () => {
            const character = await db.characters.where({ id: character_id }).first()
            return character
        }
    )

    const [character, setCharacter] = useState<CharacterType>(() => {
        if (selectedCharacter !== undefined) {
            return selectedCharacter
        }
        return { attributes: MOCK_ATTRIBUTES } as CharacterType
    })

    const [attributes, setAttributes] = useState<AttributeData[]>(
        character.attributes.map((attribute) => {
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

    const runes: rune[] = useMemo(() => {
        return character.runes
    }, [character])

    useEffect(() => {
        if (selectedCharacter !== undefined) {
            setCharacter(selectedCharacter)
        }
    }, [id, selectedCharacter])

    useEffect(() => {
        const newAttributes = character.attributes.map((attribute) => {
            const updatedPericias = attribute.pericias.map((pericia) => {
                return {
                    ...pericia,
                    attMod: attributeModifier(attribute.Attribute),
                    treined: pericia.treined,
                    bonus: pericia.bonus
                } as Pericia
            })
            return { ...attribute, pericias: updatedPericias }
        })
        setAttributes(newAttributes)
        console.log("attributes>>> ",attributes)
        console.log("Actualattributes>>> ",actualAttributes)
    }, [character])

    const actualAttributes = useMemo(() => {
        console.log(attributes)
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
    }, [attributes,character])


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

    const UpdateRunes = async (_: rune[]) => {
        db.characters.update(character_id, { runes: _ })
    }
    const updateAnotations = async (_: anotation[]) => {
        db.characters.update(character_id, { anotations: _ })
    }

    const updateClassColor = async (_: string, id: number) => {
        let classes = character.classes
        classes[id].color = _
        db.characters.update(character_id, { classes: classes })
    }
    const updateClasses = async (_: string, id: number) => {
        let classes = character.classes
        classes[id].name = _
        db.characters.update(character_id, { classes: classes })
    }

    const updateSkills = (_: Pericia) => {
        const newAttributes = attributes.map((attribute)=> { 
            const pericias = attribute.pericias.map((pericia)=> pericia.name === _.name ? _ : pericia)
            return { ...attribute, pericias }
        })
        db.characters.update(character_id, {attributes : newAttributes})
        // do not delete you may need it
        // setAttributes((prev) => {
        //     const newAttributes = prev.map((attribute) => {
        //         const pericias = attribute.pericias.map((pericia) =>
        //             pericia.name === _.name ? _ : pericia
        //         )
        //         return { ...attribute, pericias } as AttributeData
        //     })
        //     return newAttributes as AttributeData[]
        // })
    }

    const updateAttributes = (_: AttributeData[]) => {
        db.characters.update(character_id, {attributes : _})
        // setAttributes(_)
    }

    const updateMainColor = (_: string) => {
        setMainColor(_)
    }

    return (
        <Col span={24}
            style={{
                minHeight: "100%",
                backgroundColor: "rgb(227, 225, 230, 0.97)",
                padding: "40px 50px 50px 75px"
            }}
        >
            <Row>
                <Col span={6}>
                    <Image style={{ height: 600, borderRadius: 10, objectFit: 'cover' }} preview={false} src={character.image} alt="" />
                    {character && <StatusBar character={character} characterUpdate={updateCharacter} />}
                </Col>
                <Col span={17} offset={1}>
                    <Row>
                        {editSheet && (
                            <Col span={20}>
                                <Basics character={character} updateCharacter={updateCharacter} />
                            </Col>)}

                        {!editSheet && (
                            <Col span={20} style={{ border: "1px solid black", borderRadius: 8 }}>
                                <Row gutter={20} style={{ padding: "20px 28px 20px 20px" }}>
                                    <Col span={8}>
                                        <Button onClick={() => setAuxiliar(1)} className="purple-shadow black-hover btn" style={{ width: "100%", fontSize: 20, borderRadius: 8, backgroundColor: "transparent" }} size="large">Runas</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button onClick={() => setAuxiliar(2)} className="purple-shadow black-hover btn" style={{ width: "100%", fontSize: 20, borderRadius: 8, backgroundColor: "transparent" }} size="large">Anotações</Button>
                                    </Col>
                                    <Col span={8}>
                                        <Button onClick={() => setAuxiliar(3)} className="purple-shadow black-hover btn" style={{ width: "100%", fontSize: 20, borderRadius: 8, backgroundColor: "transparent" }} size="large">Progressão</Button>
                                    </Col>
                                </Row>
                            </Col>
                        )}
                        <Col span={4} style={{ justifyItems: "self-end", textAlign: "center" }}>
                            <div style={{ marginRight: 22 }}>
                                <Tooltip title={<>Click Aqui Para Voltar</>} >
                                    <Image onClick={() => window.history.back()} src={logo} height={53} preview={false} />
                                </Tooltip>
                                <br />
                                {!editSheet && <Button
                                    disabled={editSheet}
                                    size="small"
                                    style={{ fontSize: 10, border: "1px solid black", background: 'transparent', borderRadius: 20, width: 72, marginTop: 7 }}
                                    onClick={() => {
                                        setEditSheet(true)
                                        setAuxiliar(0)
                                    }}
                                >
                                    <span style={{ borderBottom: -2, }}>
                                        Editar
                                    </span>
                                </Button>}
                                {editSheet && <Button size="small" style={{ fontSize: 10, border: "1px solid black", background: 'transparent', borderRadius: 20, width: 72, marginTop: 7 }} onClick={() => { setEditSheet(false); setAuxiliar(1) }}>Salvar</Button>}

                            </div>
                        </Col>
                        {editSheet && <Col span={24} style={{ marginTop: 36 }}>
                            <AttributesTable attributes={{ value: actualAttributes, updateAttributes: updateAttributes }} color={{ value: mainColor, setColor: updateMainColor }} />
                        </Col>
                        }
                        {auxiliar !== 0 && (<Col span={24} style={{ border: "1px solid black", borderRadius: 8, marginTop: 36, minHeight: 260 }}>
                            {auxiliar === 1 && <Runes runes={runes || []} updateRunes={UpdateRunes} />}
                            {auxiliar === 2 && <Anotations anotations={character.anotations || []} updateAnotations={updateAnotations} />}
                            {auxiliar === 3 && <Progression classes={character.classes} setClassColor={updateClassColor} setClassName={updateClasses} />}
                        </Col>)
                        }
                        <Col span={24} style={{ marginTop: 36 }}>
                            <SkillsTable skills={actualAttributes} updatePericia={updateSkills} trainingMod={rankToTrainingModifier(character.rank)} />
                        </Col>
                    </Row>
                </Col>

            </Row >
        </Col >
    )
}