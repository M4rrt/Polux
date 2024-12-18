import { Button, Col, Modal, Row, Tooltip } from "antd"
import { useLiveQuery } from "dexie-react-hooks"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../db/db"
import { DeleteOutlined } from "@ant-design/icons"

interface ICharactersLibrary { }

interface IDeleteModal {
    open: boolean,
    onOk: () => void,
    onCancel: () => void,
}

const DeleteModal: FC<IDeleteModal> = ({open, onCancel,onOk}) => {
    return <Modal title={<span style={{fontSize : 20, color : "#f91102"}}> Deletar Ficha</span>} styles={{body : {fontSize : 14,}}} open={open} onCancel={onCancel} onOk={onOk}
    footer={(_, { CancelBtn }) => (
        <>
          <CancelBtn />
          <Button className="primary-button" onClick={()=>onOk()} danger >DELETAR</Button>
        </>
      )}
    >
        Esta ação não podera ser desfeita ! <br />
        <span style={{fontSize : 10, color : "#f91102"}}>Tem certeza disso? </span>
    </Modal>
}

export const CharactersLibrary: FC<ICharactersLibrary> = () => {

    const navigate = useNavigate()

    const [openModal, setOpenModal] = useState(false)
    const [toDelete, setToDelete] = useState<number | null>(null)

    const Library = useLiveQuery(async () => {
        const characters = await db.characters.toArray()
        return characters
    })

    const deleteChar = async (id: number | null) => {
        if (id)
            try {
                await db.characters.delete(id)
            } finally {
                setOpenModal(false)
            }
    }

    const OpenModalFn = (id : number | null) => {
        console.log('should work')
        setToDelete(id)
        setOpenModal(true)
    }

        Library?.map((char) => (
            <Col color="3">
                {char.name}
            </Col>
        ))

    return (
        <Col span={24} style={{ height: "100%", backgroundColor: "rgb(238, 238, 238, 0.95)", padding: 52 }}>
            <Row gutter={[40, 40]} >
                {Library?.map((char) => {
                    return (
                        <Col key={`sheet-${char.id}`} onClick={() => { navigate(`/Ficha/${char.id}`); localStorage.setItem('lastViewed', `${char.id}`) }} span={3} style={{ height: 200, borderRadius: 10, backgroundColor: "transparent", position: "relative" }}>
                            <Tooltip title="Deletar Ficha">
                                <DeleteOutlined onClick={(e) => {e.stopPropagation();OpenModalFn(char.id) }} style={{ color: "#f91102", fontSize: 20, position: "absolute", right: 26, top: 6, zIndex: 1 }} />
                            </Tooltip>
                            <Col style={{ height: "75%", backgroundImage: `url(${char.image})`, backgroundPosition: "center center", backgroundSize: "cover", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Col>
                            {/* fix this to make text dont overflow the col */}
                            <Col span={24} style={{ fontSize: 12, height: '20%', alignContent: 'center', textAlign: "center", backgroundColor: "#E3E1E6", borderRadius: 10, overflow : "hidden", textOverflow : "ellipsis", whiteSpace : "nowrap" }}> {char.name}</Col>
                        </Col>
                    )
                })}

            </Row>
            <DeleteModal open={openModal} onOk={() => { deleteChar(toDelete) }} onCancel={() => { setOpenModal(false); setToDelete(null) }} />
        </Col>
    )
}