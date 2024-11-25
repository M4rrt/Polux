import Dexie, { type EntityTable } from 'dexie'
import { CharacterType } from '../../types/CharacterType'

const db = new Dexie('CharactersDataBase') as Dexie & {
    characters : EntityTable<CharacterType, 'id'>
}

db.version(1).stores({
    characters : '++id, name, playerName, rank'
})

export { db }
