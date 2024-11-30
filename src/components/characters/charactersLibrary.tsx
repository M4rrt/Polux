import { Col } from "antd"
import { useLiveQuery } from "dexie-react-hooks"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../db/db"

interface ICharactersLibrary {}
export const CharactersLibrary : FC<ICharactersLibrary> = () => { 

    const navigate = useNavigate()    

    const Library = useLiveQuery(async ()=> {
        const characters = await db.characters.toArray()
        return characters
    })


    Library?.map((char) => (
        <Col color="3">
        {char.name}
        </Col>
    ))

    return <>{Library}</>
}