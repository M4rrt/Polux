import { FC, useMemo, useState } from "react";
import { anotation } from "../../../types/CharacterType";
import { Button, Col, Image, Input, message, Modal, Row, Tooltip, Upload } from "antd";
import { iconClose, iconPlus } from "../../icons/icons";
import { CloseOutlined, FilterFilled, FilterOutlined } from "@ant-design/icons";
import { GiFireGem } from "react-icons/gi";
import { uploadImage } from "../../../util/util";
import { FaQuestion } from "react-icons/fa6";
import { TbTrashX } from "react-icons/tb";
<FaQuestion />

const { Dragger } = Upload;
const { TextArea } = Input;

export type IAnotations = {
    anotations: anotation[]
    updateAnotations: (_: anotation[]) => void
}
export const Anotations: FC<IAnotations> = ({ anotations, updateAnotations }) => {

    const [anotationIdx, setAnotationIdx] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [newAnotation, setNewAnotatiion] = useState<anotation>({ title: "", image: "", description: "" })
    const [searchValue, setSearchValue] = useState("")

    const canSaveAnotation = useMemo(() => (!!newAnotation.description && !!newAnotation.title), [newAnotation]);

    const updatePartialNewAnotation = (update: Partial<anotation>) => {
        setNewAnotatiion((prev) => { return { ...prev, ...update } })
    }


    const filtredAnotations = useMemo(() => {
        let filteredAnotations = anotations
        if (openFilter) {
            filteredAnotations = filteredAnotations.filter((anot) => anot.title.toLowerCase().includes(searchValue.toLowerCase()))
        }
        return filteredAnotations
    }, [anotations, searchValue, openFilter])

    return (
        <Row style={{ position: "relative" }}>
            {deleteModal && <Modal
                title={`Deletar Runa "${anotations[anotationIdx].title}"}`}
                onCancel={() => setDeleteModal(false)}
                onOk={() => {
                    let prevAnotations = anotations.filter((r, i) => i !== anotationIdx)
                    updateAnotations(prevAnotations)
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
                        {canSaveAnotation ?
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
                                    let prevAnotations = anotations
                                    if (prevAnotations.length <= anotationIdx) {
                                        prevAnotations.push(newAnotation)
                                    } else {
                                        prevAnotations[anotationIdx] = newAnotation
                                    }
                                    updateAnotations(prevAnotations)
                                    setNewAnotatiion({ title: "", image: "", description: "" })
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
                                    setNewAnotatiion({ title: "", image: "", description: "" })
                                }} > {iconClose({})}</span>)
                        }


                        <Col span={8} style={{ height: 200 }}>
                            {newAnotation.image && (
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
                                        // onClick={() => updatePartialNewRune({ image: '' })}
                                        danger
                                    >
                                        <CloseOutlined />
                                    </Button>
                                    <Image
                                        style={{ height: 200, objectFit: "cover", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                                        src={newAnotation.image}
                                    ></Image>
                                </div>)}
                            {!newAnotation.image &&
                                <Dragger
                                    multiple={false}
                                    maxCount={1}
                                    style={{ fontSize: 8 }}
                                    beforeUpload={async (file) => {
                                        const correctFile = ((file.type === 'image/png') || (file.type === 'image/jpeg'))
                                        if (!correctFile) {
                                            message.error("Tipo de imagem não valido  Por favor usar png, jpeg ou gif(may not work) [" + file.type + "]");
                                        }
                                        await uploadImage(file, updatePartialNewAnotation)
                                        return !correctFile
                                    }}>
                                    <p>
                                        <FaQuestion style={{ fontSize: 30, color: "rgba(188, 185, 194, 0.97)" }} />
                                    </p>
                                    <p >Adicione uma Imagem para sua runa</p>
                                </Dragger>
                            }

                        </Col>
                        <Col span={16}
                        >
                            <Row>
                                <Col span={12} offset={3} style={{ marginTop: 21 }}>
                                    <Input style={{ backgroundColor: "transparent", border: "none" }} value={newAnotation.title} onChange={(e) => { updatePartialNewAnotation({ title: e.target.value }) }} placeholder="Título"></Input>
                                </Col>
                                <Col span={22} offset={1}>
                                    <TextArea
                                        style={{ marginTop: 20, backgroundColor: "transparent", border: "1px solid black", }}
                                        rows={5}
                                        onChange={(e) => updatePartialNewAnotation({ description: e.target.value })}
                                        value={newAnotation.description}
                                        placeholder="Anotação" />
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </div>)}

            {!filtredAnotations.length && <Col span={18} style={{ justifySelf: "center", textAlign: "center", paddingTop: 100 }}>Anotações</Col>}
            {filtredAnotations.length > 0 && <Col span={18}>
                <Row style={{ padding: 20, overflow: "auto" }}>
                    {filtredAnotations.map((anot, i) => {
                        return (
                            <Col
                                span={3}
                                offset={1}
                                style={{ textAlign: "center", position: "relative" }}
                                key={`anotation-${anot.title}-${anot.image}-${i}`}
                                onClick={
                                    () => {
                                        setAnotationIdx(i)
                                        setOpenModal(true)
                                        setNewAnotatiion(anot)
                                    }
                                }
                            >
                                <Tooltip title="Deletar Ficha">
                                    <TbTrashX onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setAnotationIdx(i)
                                        setDeleteModal(true)
                                    }} style={{ fontSize: 14, color: "red", position: "absolute", top: 5, right: 5, zIndex: 9 }} />
                                </Tooltip>
                                <Row>
                                    <Col span={24} style={{ paddingBottom: 5 }}>
                                        {anot.image ? <Image preview={false} style={{ height: 90, borderRadius: 8 }} src={anot.image} /> : <div style={{ minHeight: 90 }}> <GiFireGem fontSize={45} style={{ paddingTop: 20 }} /> </div>}
                                    </Col>
                                    <Col span={24}>
                                        <span>{anot.title}</span>
                                    </Col>
                                </Row>
                            </Col>

                        )
                    })}
                </Row>
            </Col>}

            <Col span={6} style={{ paddingTop: 10, textAlign: "center" }}>
                <Button
                    size="middle"
                    className="btn transparent purple-shadow"
                    style={{ width: "90%" }}
                    onClick={() => {
                        setOpenModal(true)
                        setAnotationIdx(anotations.length)
                    }}
                >
                    Nova Anotação{iconPlus({ style: { fontSize: 10 }, fill: "#000" })}
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
                            </Row>
                        </Col>)}
                </Col>
            </Col>


        </Row>
    )
}