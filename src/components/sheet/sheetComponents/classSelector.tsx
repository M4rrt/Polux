import { Select } from "antd";
import React, { FC } from "react";

interface IClassSelector {
    value: string,
    id : number
    setClassName: (_: string, id : number) => void
    style: React.CSSProperties,
}

export const ClassSelector: FC<IClassSelector> = ({ value, id, style, setClassName }) => {
    // may add searchable functionality
    return <Select onChange={(e)=> {setClassName(e, id)}} value={value} style={{ width: "100%", ...style }}>
        <Select.OptGroup label={"1° Ciclo - Manhã"} >
            <Select.Option value="Ciencias Sóciais">Ciencias Sóciais</Select.Option>
            <Select.Option value="Biomagia Básica">Biomagia Básica</Select.Option>
            <Select.Option value="Treinamento de Combate Básico">Treinamento de Combate Básico</Select.Option>
            <Select.Option value="Educação Física">Educação Física</Select.Option>
            <Select.Option value="Sobreviveência Básica">Sobreviveência Básica</Select.Option>
            <Select.Option value="Arcanismo Básico">Arcanismo Básico</Select.Option>
            <Select.Option value="Combate Mágico Básico">Combate Mágico Básico</Select.Option>
            <Select.Option value="Feitiçaria Básica">Feitiçaria Básica</Select.Option>
        </Select.OptGroup>
        <Select.OptGroup label={"2° Ciclo"}>
            <Select.Option value="Táticas de Intimidação">Táticas de Intimidação</Select.Option>
            <Select.Option value="Nobreza Avançada">Nobreza Avançada</Select.Option>
            <Select.Option value="Combate a Curta Distância">Combate a Curta Distância</Select.Option>
            <Select.Option value="Reforço Físico Avançado">Reforço Físico Avançado</Select.Option>
            <Select.Option value="Bestas de Mana">Bestas de Mana</Select.Option>
            <Select.Option value="História De Pólux">História De Pólux</Select.Option>
            <Select.Option value="BioMagia Avançada">BioMagia Avançada</Select.Option>
            <Select.Option value="Combate Mágico Avançado">Combate Mágico Avançado</Select.Option>
            <Select.Option value="Meditação Avançada">Meditação Avançada</Select.Option>
            <Select.Option value="Circo Avançado">Circo Avançado</Select.Option>
        </Select.OptGroup>
        <Select.OptGroup label={"3° Ciclo"}>
            <Select.Option value="Esp. em Liderança">Esp. em Liderança</Select.Option>
            <Select.Option value="Esp. em Socialização">Esp. em Socialização</Select.Option>
            <Select.Option value="Esp. em Linha de Frente">Esp. em Linha de Frente</Select.Option>
            <Select.Option value="Esp. em Desenvolvimento Físico">Esp. em Desenvolvimento Físico</Select.Option>
            <Select.Option value="Esp. em Rastreamento">Esp. em Rastreamento</Select.Option>
            <Select.Option value="Esp. em Ordem">Esp. em Ordem</Select.Option>
            <Select.Option value="Esp. em Conjuração">Esp. em Conjuração</Select.Option>
            <Select.Option value="Esp. em BioMagia">Esp. em BioMagia</Select.Option>
            <Select.Option value="Esp. em Biblioteca">Esp. em Biblioteca</Select.Option>
            <Select.Option value="Esp. em Suporte">Esp. em Suporte</Select.Option>
            <Select.Option value="Esp. em Infiltração">Esp. em Infiltração</Select.Option>
        </Select.OptGroup>
        <Select.Option value="Sem Aula">Sem Aula</Select.Option>
    </Select>
}