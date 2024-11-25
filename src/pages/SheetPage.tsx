import { Route, Routes, useNavigate } from "react-router"
import { Sheet } from "../components/sheet/sheet"
import { CreateCharacter } from "../components/sheet/CreateCharacter"
import { Button } from "antd"

export const SheetPage = () => {
    const navigate = useNavigate()
    return <Routes>
        <Route path="/Ficha/" element={<Sheet />} />
        <Route path="/Criar/" element={<CreateCharacter />} />
        
        <Route path={'/Criar/*'} element={
            <div style={{ textAlign: 'center' }}>
                <Button onClick={() => { navigate('/') }}>Tá fazendo merda, volta pra página inicial </Button>
                <br /><br />
                ctz que o gomidão vai ser o primeiro a ver isso, me manda print pra ver se eu tava certo
            </div>
        }>
        </Route>
    </Routes>
}