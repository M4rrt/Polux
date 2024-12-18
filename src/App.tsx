import { ConfigProvider } from "antd";
import locale from "antd/locale/pt_BR";
import { useLiveQuery } from "dexie-react-hooks";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { CharactersLibrary } from "./components/characters/charactersLibrary";
import { db } from "./components/db/db";
import { MainPage } from "./components/mainPage/mainPage";
import { Wrapper } from "./components/wrapper/wrapper";
import { NotFound } from "./pages/NotFound";
import { SheetPage } from "./pages/SheetPage";

function App() {
  const CharactersList = useLiveQuery(async () => {
    const characters = await db.characters.toArray();
    return characters;
  });

  return (
    <div className="App">
      <ConfigProvider
        locale={locale}
        theme={{
          token: {
            fontSize: 10,
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Wrapper />}>
            <Route path="/Biblioteca/" element={<CharactersLibrary/>}></Route>
              <Route
                path="/"
                element={<MainPage charactersList={CharactersList} />}
              ></Route>
              <Route path="/Ficha/*" element={<SheetPage />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
