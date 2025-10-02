import { CloseOutlined, FilterFilled, FilterOutlined } from "@ant-design/icons";
import { Button, Col, Image, Input, message, Modal, Row, Select, Tooltip, Upload } from "antd";
import { FC, useMemo, useState } from "react";
import { GiFireGem } from "react-icons/gi";
import { TbTrashX } from "react-icons/tb";
import { rune } from "../../../types/CharacterType";
import { blobToBase64, numberToRank, uploadImage } from "../../../util/util";
import { iconClose, iconPlus } from "../../icons/icons";
import { SelectRank } from "../SelectRank/selectRank";


const { Dragger } = Upload;
const { TextArea } = Input;

export interface IRunes {
    runes: rune[]
    updateRunes: (_: rune[]) => void
}


export const Runes: FC<IRunes> = ({ runes, updateRunes }) => {

    const [searchValue, setSearchValue] = useState('')
    const [openFilter, setOpenFilter] = useState(false)
    const [rankFilter, setRankFilter] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [runeIndex, setRuneIndex] = useState(0)
    const [newRune, setNewRune] = useState<rune>({
        rank: 100,
        description: "",
        name: "",
        image: ""
    })


    const filtredRunes = useMemo(() => {
        let filteredRunes = runes
        if (openFilter) {
            if (rankFilter !== 0) filteredRunes = runes.filter((rune) => rune.rank === rankFilter)
            filteredRunes = filteredRunes.filter((rune) => rune.name.toLowerCase().includes(searchValue.toLowerCase()))
        }
        return filteredRunes
    }, [runes, searchValue, rankFilter, openFilter])
    
    const updatePartialNewRune = (update: Partial<rune>) => {
        setNewRune((prev) => {
            return { ...prev, ...update }
        })
    }

    const canSave = useMemo(() => {
        return (!!newRune.description && !!newRune.name && newRune.rank !== 100)
    }, [newRune])

    
    const [deleteModal, setDeleteModal] = useState(false)

    return (<Row style={{ position: "relative" }}>


        {deleteModal && <Modal
            title={`Deletar Runa "${runes[runeIndex].name}" - ${numberToRank(runes[runeIndex].rank)}`}
            onCancel={() => setDeleteModal(false)}
            onOk={() => {
                let prevRunes = runes.filter((r, i) => i !== runeIndex)
                updateRunes(prevRunes)
                setDeleteModal(false)
            }}
            okButtonProps={{ danger: true }}
            okText={"Deletar Runa"}
            open={deleteModal}
        >
            Essa ação não poderá ser defeita !
        </Modal>}

        {openModal && (
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "20%",
                    minHeight: 200,
                    width: "50%",
                    backgroundColor: "rgb(227, 225, 230)",
                    zIndex: 10,
                    border: "1px solid black",
                    borderRadius: 8,
                }}>
                <Row style={{ position: 'relative' }}>
                    {canSave ?
                        (<Button
                            className="btn-transparent green"
                            size="small"
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 5,
                                zIndex: 10,
                                backgroundColor: "transparent",
                                border: '1px solid green'
                            }}
                            onClick={() => {
                                let prevRunes = runes
                                if (prevRunes.length <= runeIndex) {
                                    prevRunes.push(newRune)
                                } else {
                                    prevRunes[runeIndex] = newRune
                                }
                                updateRunes(prevRunes)
                                setNewRune({ rank: 100, description: "", name: "", image: "" })
                                setOpenModal(false)
                            }}
                        >
                            Salvar
                        </Button>) : (<span style={{
                            position: "absolute",
                            top: 10,
                            right: 5,
                            zIndex: 10,
                            backgroundColor: "transparent",
                        }}
                            onClick={() => {
                                setOpenModal(false)
                                setNewRune({ rank: 100, description: "", name: "", image: "" })
                            }} > {iconClose({})}</span>)
                    }


                    <Col span={8} style={{ height: 200 }}>
                        {newRune.image && (
                            <div style={{ position: "relative" }}>
                                <Button
                                    size="small"
                                    style={{
                                        backgroundColor: "transparent",
                                        position: "absolute",
                                        display: 'inline-flex',
                                        padding: 4,
                                        top: 5,
                                        right: 5,
                                        zIndex: 10
                                    }}
                                    onClick={() => updatePartialNewRune({ image: '' })}
                                    danger
                                >
                                    <CloseOutlined />
                                </Button>
                                <Image
                                    style={{ height: 200, objectFit: "cover", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                                    src={newRune.image}
                                ></Image>
                            </div>)}
                        {!newRune.image &&
                            <Dragger
                                multiple={false}
                                maxCount={1}
                                style={{ fontSize: 8 }}
                                beforeUpload={async (file) => {
                                    const correctFile = ((file.type === 'image/png') || (file.type === 'image/jpeg'))
                                    if (!correctFile) {
                                        message.error("Tipo de imagem não valido  Por favor usar png, jpeg ou gif(may not work) [" + file.type + "]");
                                    }
                                    await uploadImage(file,updatePartialNewRune)
                                    return !correctFile
                                }}>
                                <p>
                                    <GiFireGem style={{ fontSize: 30, color: "rgba(188, 185, 194, 0.97)" }} />
                                </p>
                                <p >Adicione uma Imagem para sua runa</p>
                            </Dragger>
                        }

                    </Col>
                    <Col span={16}
                    >
                        <Row>
                            <Col span={12} offset={3} style={{ marginTop: 21 }}>
                                <Input style={{ backgroundColor: "transparent", border: "none" }} value={newRune.name} onChange={(e) => { updatePartialNewRune({ name: e.target.value }) }} placeholder="Nome Da Runa"></Input>
                            </Col>
                            <Col span={4} offset={1} style={{ marginTop: 21 }}><SelectRank value={newRune.rank} updateRank={(_) => updatePartialNewRune({ rank: _ })}></SelectRank></Col>
                            <Col span={22} offset={1}>
                                <TextArea
                                    style={{ marginTop: 20, backgroundColor: "transparent", border: "1px solid black", }}
                                    rows={5}
                                    onChange={(e) => updatePartialNewRune({ description: e.target.value })}
                                    value={newRune.description}
                                    placeholder="Descrição da runa" />
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </div>)}

        {!filtredRunes.length && <Col span={18} style={{ justifySelf: "center", textAlign: "center", paddingTop: 100 }}>Sem Runas</Col>}
        {filtredRunes.length > 0 && <Col span={18}>
            <Row style={{ padding: 20, overflow: "auto" }}>
                {filtredRunes.map((rune, i) => {
                    return <Col onClick={
                        () => {
                            setRuneIndex(i)
                            setOpenModal(true)
                            setNewRune(rune)
                        }
                    }
                        span={3} offset={1} style={{ textAlign: "center", position: "relative" }} key={`rune-${rune.name}-${rune.image}-${i}`}>
                        <Tooltip title="Deletar Ficha">
                            <TbTrashX onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setRuneIndex(i)
                                setDeleteModal(true)
                            }} style={{ fontSize: 14, color: "red", position: "absolute", top: 5, right: 5, zIndex: 9 }} />
                        </Tooltip>
                        <Row>
                            <Col span={24} style={{ paddingBottom: 5 }}>
                                {rune.image ? <Image preview={false} style={{ height: 90, borderRadius: 8 }} src={rune.image} /> : <div style={{ minHeight: 90 }}> <GiFireGem fontSize={45} style={{ paddingTop: 20 }} /> </div>}
                            </Col>
                            <Col span={24}>
                                <span>{rune.name}</span>
                            </Col>
                        </Row>
                    </Col>
                })}
            </Row>
        </Col>
        }
        <Col span={6} style={{ paddingTop: 10, textAlign: "center" }}>
            <Button
                size="middle"
                className="btn transparent purple-shadow"
                style={{ width: "90%" }}
                onClick={() => {
                    setOpenModal(true)
                    setRuneIndex(runes.length)
                }}
            >
                Nova Runa{iconPlus({ style: { fontSize: 10 }, fill: "#000" })}
            </Button>

            <Col span={24} style={{}}>
                {!openFilter && (
                    <Button
                        onClick={() => { setOpenFilter(true) }}
                        className="btn transparent"
                        style={{ width: "90%", marginTop: 10 }} >
                        Filtros <FilterOutlined size={10} />
                    </Button>
                )}
                {openFilter &&
                    (<Col
                        onClick={() => { setOpenFilter(false) }}
                        className="btn transparent"
                        style={{ width: "90%", marginLeft: "5%", marginTop: 10, padding: 6 }}>
                        <Row style={{ justifyContent: "center" }}>
                            <Col>
                                Filtros <FilterFilled size={10} />
                            </Col>
                            <Col span={24}><Input onClick={(e) => { e.preventDefault(); e.stopPropagation() }} onChange={(e) => {
                                let search = e.target.value
                                setSearchValue(search)
                            }} style={{ backgroundColor: "transparent", border: "1px solid black", borderRadius: 8, marginTop: 5 }} placeholder="Nome"></Input></Col>
                            <Col span={24}>
                                <Select
                                    style={{ width: "100%", backgroundColor: "transparent", border: "1px solid black", borderRadius: 8, marginTop: 5 }}
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                                    value={rankFilter}
                                    placeholder="Sem Filtro de Rank"
                                    onChange={(e) => {
                                        setRankFilter(e)
                                    }}
                                >

                                    <Select.Option value={1}>
                                        S
                                    </Select.Option>
                                    <Select.Option value={2}>
                                        A+
                                    </Select.Option>
                                    <Select.Option value={3}>
                                        A
                                    </Select.Option>
                                    <Select.Option value={4}>
                                        A-
                                    </Select.Option>
                                    <Select.Option value={5}>
                                        B+
                                    </Select.Option>
                                    <Select.Option value={6}>
                                        B
                                    </Select.Option>
                                    <Select.Option value={7}>
                                        B-
                                    </Select.Option>
                                    <Select.Option value={8}>
                                        C+
                                    </Select.Option>
                                    <Select.Option value={9}>
                                        C
                                    </Select.Option>
                                    <Select.Option value={10}>
                                        C-
                                    </Select.Option>
                                    <Select.Option value={11}>
                                        D
                                    </Select.Option>
                                    <Select.Option value={12}>
                                        F
                                    </Select.Option>

                                    <Select.Option value={0}>
                                        Sem Filtro de Rank
                                    </Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>)}
            </Col>
        </Col>
    </Row>)
}