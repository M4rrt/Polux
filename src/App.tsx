import { CharactersListing } from "./components/characters/charactersList";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Wrapper } from "./components/wrapper/wrapper";
import { SheetPage } from "./pages/SheetPage";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./components/db/db";
import { AttributeData } from "./types/CharacterType";
import './App.css'
import { ConfigProvider } from "antd";
import locale from 'antd/locale/pt_BR';

function App() {

  const CharactersList = useLiveQuery(
    async () => {
        const characters = await db.characters
            .toArray()
      return characters
    }
)

  return (
    <div className="App">
      <ConfigProvider
        locale={locale}
        theme={ { 
          token : {
            fontSize : 10  
          },
        }}
      >

      <BrowserRouter>
					<Routes>
            <Route path="/" element={<Wrapper/>}>
              <Route path="/" element={<CharactersListing charactersList={CharactersList}/>}></Route>
              <Route path="/Ficha/*" element={<SheetPage/>}></Route>
            </Route>
          </Routes>
      </BrowserRouter>
      </ConfigProvider>

    </div>
  );
}

export default App;
