export interface CharacterType { 
    id: number;
    name: string;
    image: string;
    playerName : string;
    rank : number;
    age: number;
    height : string;
    weight: string;
    money: number;
    statusBar: statusBar,
    attributes: AttributeData[];
}

export type statusBar = { 
    currentMana : number,
    maxMana: number,
    currentLife: number,
    maxLife: number,
    currentArmor: number,
    maxArmor: number,
    currentShield: number
}

export type AttributeData = {
    name: string;
    Attribute: number;
    fullMark: number;
    pericias: Pericia[]
}

export type Pericia = {
    name: string;
    color?: string
    treined?: boolean;
    attMod?: number;
    bonus?: number
}
