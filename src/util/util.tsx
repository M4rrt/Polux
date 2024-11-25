import { AttributeData } from "../types/CharacterType"
import patrono1 from '../images/Patrono_alquimico.jpeg'
import patrono2 from '../images/Patrono_dragões.jpeg'
import patrono3 from '../images/Patrono_licantropos.jpeg'

export const numberToRank = (_: number) => {
    const Rank: { [id: number]: String } = {
        1: 'S',
        2: 'A+',
        3: 'A',
        4: 'A-',
        5: 'B+',
        6: 'B',
        7: 'B-',
        8: 'C+',
        9: 'C',
        10: 'C-',
        11: 'D',
        12: 'F'
    }
    return Rank[_]
}

export const rankToMana = (_: number): number => {
    const Rank: { [id: number]: number } = {
        1: 1000,
        2: 750,
        3: 450,
        4: 250,
        5: 150,
        6: 100,
        7: 60,
        8: 40,
        9: 25,
        10: 15,
        11: 10,
        12: 5,
    }
    return Rank[_]
}

export const MOCK_ATTRIBUTES: AttributeData[] = [{
    name: "Carisma",
    Attribute: 1,
    fullMark: 20,
    pericias: [
        {
            color: '#ffff00',
            name: "Amedrontar",
        },
        {
            name: "Animais",
        },
        {
            name: "Arte",
        },
        {
            name: "Engação",
        },
        {
            name: "Inspiração",
        },
        {
            name: "Persuação",
        },
        {
            name: "Sedução",
        },
    ]
},
{
    name: "Destreza",
    Attribute: 1,
    fullMark: 20,
    pericias: [
        {
            color: '#00ff00',
            name: "Acrobacia",
        },
        {
            name: "Armas de Médio Alcance",
        },
        {
            name: "Armas Leves",
        },
        {
            name: "Arremessar",
        },
        {
            name: "Esquiva",
        },
        {
            name: "Furtividade",
        },
        {
            name: "Iniciativa",
        },
    ],
},
{
    name: "Físico",
    Attribute: 2,
    fullMark: 20,
    pericias: [
        {
            color: '#ff0000',
            name: "Armas Pesadas",
        },
        {
            name: "Atletismo",
        },
        {
            name: "Briga",
        },
        {
            name: "Defesa",
        },
        {
            name: "Intimidação",
        },
        {
            name: "Músculos",
        },
        {
            name: "Resistência",
        },
    ],
},
{
    name: "Inteligência",
    Attribute: 17,
    fullMark: 20,
    pericias: [
        {
            color: '#00b0f0',
            name: "Alquimia",
        },
        {
            name: "Aprendizado",
        },
        {
            name: "Arcanismo",
        },
        {
            name: "Conhecimento",
        },
        {
            name: "Encantamento",
        },
        {
            name: "História",
        },
        {
            name: "Medicina",
        },
    ],
},
{
    name: "Sentidos",
    Attribute: 12,
    fullMark: 20,
    pericias: [
        {
            color: '#ff6d01',
            name: "Longo Alcance",
        },
        {
            name: "Audição",
        },
        {
            name: "Instinto",
        },
        {
            name: "Intuição",
        },
        {
            name: "Reflexo",
        },
        {
            name: "Sobrevivência",
        },
        {
            name: "Visão",
        },
    ]
},
{
    name: "Mágia",
    Attribute: 12,
    fullMark: 20,
    pericias: [
        {
            color: '#ff00ff',
            name: "Alteração",
        },
        {
            name: "Barreira",
        },
        {
            name: "Conjuração",
        },
        {
            name: "Destino",
        },
        {
            name: "Determinação",
        },
        {
            name: "Portais",
        },
        {
            name: "Runa",
        },
    ]
},
]

export const attributeModifier = (_: number) => Math.ceil((_ - 1) / 2) - 5

export const rankToTrainingModifier = (_: number) => Math.floor(_ / 2 * -1) + 7

export const randomPatron = () => { 
    const r = Math.floor(Math.random() * 3)
    switch(r) { 
        case 0: 
        return `${patrono1}`
        case 1 : 
        return `${patrono2}`
        case 2: 
        return `${patrono3}`

    }
}