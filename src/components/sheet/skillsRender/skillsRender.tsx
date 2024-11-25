import { Tabs } from "antd";
import { FC } from "react";
import { AttributeData, Pericia } from "../../../types/CharacterType";
import { SkillTable } from "./skillTable";

interface ISkillsTable {
    attributes: AttributeData[]
    updatePericia: (_: Pericia) => void
    trainingMod: number
}

export const SkillsRender: FC<ISkillsTable> = ({ attributes, updatePericia, trainingMod }) => {
    return <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        style={{ height: 400, fontSize: 10 }}
        items={attributes.map((attribute, i) => {
            return {
                label: <span style={{ fontSize : 10}}>
                    {attribute.name}
                </span>,
                key: attribute.name + i,
                children: <SkillTable skills={attribute.pericias} updatePericia={updatePericia} trainingMod={trainingMod} />
            };
        })}
    />
}