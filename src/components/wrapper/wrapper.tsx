import { Col, Row } from "antd"
import { Outlet } from "react-router"

import background from '../../images/background.jpg'

export const Wrapper = () => {
    return <Col span={24} style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: 'cover', height: '100vh', opacity: 0.8, overflowY: "auto"}}>
        <Row style={{ paddingTop: "8vh", paddingBottom: "8vh" }}>
            <Col offset={2} span={20} style={{ height: "84vh", backgroundColor: "rgb(88, 0, 195, 0.1)", border: "2px solid black", overflow: "auto",borderRadius : 10, alignContent: "center" }}>
                <Outlet />
            </Col>
        </Row>
    </Col>
}