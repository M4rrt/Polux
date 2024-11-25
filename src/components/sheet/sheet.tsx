import { Button, Col, Image, Row, Tabs, TabsProps } from "antd"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { db } from "../db/db"
import { useLiveQuery } from "dexie-react-hooks"
import { CharacterType } from "../../types/CharacterType"
import { StatusBar } from "./StatusBar/statusBar"
import { MOCK_ATTRIBUTES, rankToTrainingModifier } from "../../util/util"
import { SkillsRender } from "./skillsRender/skillsRender"


export const Sheet = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const character_id = id || 0

    const charactersList = useLiveQuery(
        async () => {
            const characters = await db.characters
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

    useEffect(() => {
        if (charactersList !== undefined) {
            setCharacter(charactersList)
        }
    }, [id, charactersList])

    console.log(character)

    const Items: TabsProps['items'] = [
        {
            key: 'atributos',
            label: 'Atributos',
            children: <>
                <SkillsRender attributes={character.attributes} updatePericia={()=> {}} trainingMod={rankToTrainingModifier(character.rank)} />

            </>
        },
        {
            key: 'runas',
            label: 'Runas',
            children: <>
                Runas
            </>
        },

    ]

    return <Row>
        {character && <StatusBar character={character} characterUpdate={updateCharacter} />}
        <Tabs style={{width : '100%'}} defaultActiveKey="atributos" items={Items}></Tabs>

        {character?.age === undefined && <Button onClick={() => navigate('/')}>Voltar</Button>}
    </Row>
}