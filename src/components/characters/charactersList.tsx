import { Col, Image, message, Row } from "antd";
import { db } from "../db/db";
import patrono1 from "../../images/Patrono_alquimico.jpeg"
import patrono2 from "../../images/Patrono_dragões.jpeg"
import patrono3 from "../../images/Patrono_licantropos.jpeg"
import { useNavigate } from "react-router";
import { numberToRank, randomPatron } from "../../util/util";
import { iconLibrary, iconPlus } from "../icons/icons";
import { CharacterType } from "../../types/CharacterType";
import { FC } from "react";

interface ICharactersList {
    charactersList: CharacterType[] | undefined
}

export const CharactersListing: FC<ICharactersList> = ({ charactersList }) => {

    const navigate = useNavigate()

    const lastViewed = localStorage.getItem('lastViewed') || 1

    const lastChar = charactersList?.find((c) => c.id === lastViewed)

    return <Row style={{ justifyContent: "space-evenly", alignItems: "center" }}>
        <Col span={4} style={{ border: '1px solid black', justifyContent: "center", placeContent: "center", textAlign: 'center', height: '55vh', backgroundColor: "#E3E1E6", borderRadius: 10 }}>
            <Col style={{ height: "75%", backgroundImage: `url(${randomPatron()}`, backgroundPosition: "center center", backgroundSize: "cover", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Col style={{ height: "100%", alignContent: "center", width: '100%', backgroundColor: 'rgb(238, 238, 238, 0.5)', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    {iconLibrary()}
                </Col>
            </Col>
            <Col style={{ height: "25%", fontSize: 20, alignContent: "center" }}>
                Biblioteca
            </Col>
        </Col>
        <Col span={6} style={{ border: '1px solid black', justifyContent: "center", placeContent: "center", textAlign: 'center', height: '70vh', backgroundColor: "#E3E1E6", borderRadius: 15 }}>
            <Col style={{ height: '80%', backgroundImage: lastChar ? `url(${lastChar.image})` : `url(${randomPatron()}`, backgroundSize: "cover", backgroundPosition : "center", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Col>
            <Col style={{ fontSize: 20, height: '20%', alignContent: 'center' }}>
                {lastChar ? lastChar.name : "Sem Personagem"}
                <Col>
                    <span style={{ fontSize: 13 }}>
                        {lastChar ? `Rank : ${numberToRank(lastChar.rank)}` : ""}
                    </span>
                </Col>
            </Col>
        </Col>
        <Col onClick={() => { navigate('/Ficha/Criar/') }} span={4} style={{ border: '1px solid black', justifyContent: "center", placeContent: "center", textAlign: 'center', height: '55vh', backgroundColor: "#E3E1E6", borderRadius: 10 }}>
            <Col style={{ height: "75%", backgroundImage: `url(${randomPatron()}`, backgroundPosition: "center center", backgroundSize: "cover", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Col style={{ height: "100%", alignContent: "center", width: '100%', backgroundColor: 'rgb(238, 238, 238, 0.5)', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    {iconLibrary()}
                </Col>
            </Col>
            <Col style={{ height: "25%", fontSize: 20, alignContent: "center" }}>
                Criar
                <Col>
                    <span style={{ fontSize: 13 }}>Personagem</span>
                </Col>
            </Col>
        </Col>



        {/* <Col
            span={4}
            style={{ border: '1px solid black', justifyContent: "center", placeContent: "center", textAlign: 'center' }}
            onClick={() => {
                navigate('Ficha/Criar/')
            }}>
            Criar Nova Ficha <br />
            {iconPlus()}
        </Col> */}
    </Row>
}