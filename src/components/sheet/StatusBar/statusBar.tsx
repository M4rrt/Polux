import { Col, Image, Row } from "antd"
import { FC, useMemo } from "react"
import { CharacterType, statusBar } from "../../../types/CharacterType"
import { PointsBar } from "../../poinstBar.tsx/pointsBar"
import { rankToMana } from "../../../util/util"
import { MultiPointsBar } from "../../poinstBar.tsx/multiPointsBar"
import { Points } from "../../../types/statusBarType"
interface IStatusBar {
    character: CharacterType,
    characterUpdate: (update: Partial<CharacterType>) => void,
}

export const StatusBar: FC<IStatusBar> = ({ character, characterUpdate }) => {
    const lifeUpdate = (update: number) => {
        const statusBar: statusBar = { ...character.statusBar, currentLife: update }
        characterUpdate({ ...character, statusBar })
    }
    const maxLifeUpdate = (update: number) => {
        const statusBar: statusBar = { ...character.statusBar, maxLife: update }
        characterUpdate({ ...character, statusBar })
    }
    const armorUpdate = (update: number) => {
        const statusBar: statusBar = { ...character.statusBar, currentArmor: update }
        characterUpdate({ ...character, statusBar })
    }
    const maxArmorUpdate = (update: number) => {
        const statusBar: statusBar = { ...character.statusBar, maxArmor: update }
        characterUpdate({ ...character, statusBar })
    }

    const shieldUpdate = (update: number) => {
        const statusBar: statusBar = { ...character.statusBar, currentShield: update }
        characterUpdate({ statusBar })
    }


    const manaUpdate = (update: number) => {
        const statusBar: statusBar = { ...character.statusBar, currentMana: update }
        characterUpdate({ statusBar })
    }


    const Status = useMemo<Points[]>(() => [
        {
            title: 'Vida',
            maxPoints: character?.statusBar?.maxLife,
            points: character?.statusBar?.currentLife,
            color: '#ff1e00',
            darkerColor: '#7d0f00',
            set: {
                setPoints: lifeUpdate,
                setMax: maxLifeUpdate,
            }
        },
        {
            title: 'Armadura',
            maxPoints: character.statusBar?.maxArmor,
            points: character.statusBar?.currentArmor,
            color: '#d60ec9',
            darkerColor: '#920889',
            set: {
                setPoints: armorUpdate,
                setMax: maxArmorUpdate,
            }
        },
        {
            title: 'Barreira ',
            maxPoints: character.statusBar?.currentShield,
            color: '#e9cff1',
            darkerColor: '#7c6d81',
            set: {
                setPoints: shieldUpdate,
            }
        },
    ], [character])

    return <Col style={{ width: '100%', }}>
        <Row>
            <Col span={20}>
                <h3 style={{ margin: 0, fontSize: 20 }}>
                    {character.name}
                </h3>
                <Row>
                    <Col span={24}>
                        <Row>
                            <Col span={4} style={{ fontSize: 16 }}>
                                Vida:
                            </Col>
                            <Col span={20}>
                                <MultiPointsBar Points={Status} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ paddingTop: 12 }}>
                        Mana: {character && <PointsBar points={{ currentPoints: character.statusBar?.currentMana, maxPoints: rankToMana(character.rank), update: manaUpdate }} barColor="#0100FD" />}
                    </Col>
                </Row>
            </Col>
        </Row>
    </Col>
}