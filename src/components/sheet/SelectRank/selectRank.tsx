import { Select } from "antd";
import { FC } from "react";

interface ISelectRank {
    value : number
    updateRank : (_: number)=> void
}

export const SelectRank: FC<ISelectRank> = ({value, updateRank}) => {
    return <Select style={{width :"95%", border : '1px solid black', borderRadius : 5, backgroundColor : "transparent"}} size="small" defaultValue={value} onChange={(e) => updateRank(e)}>
        <Select.Option value={1}>
            S
        </Select.Option>
        <Select.Option value={2}>
            A+
        </Select.Option>
        <Select.Option value={3}>
            A
        </Select.Option>
        <Select.Option value={4}>
            A-
        </Select.Option>
        <Select.Option value={5}>
            B+
        </Select.Option>
        <Select.Option value={6}>
            B
        </Select.Option>
        <Select.Option value={7}>
            B-
        </Select.Option>
        <Select.Option value={8}>
            C+
        </Select.Option>
        <Select.Option value={9}>
            C
        </Select.Option>
        <Select.Option value={10}>
            C-
        </Select.Option>
        <Select.Option value={11}>
            D
        </Select.Option>
        <Select.Option value={12}>
            F
        </Select.Option>
    </Select>

}  