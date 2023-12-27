
export enum PackTitle {
    // for lobby
    sign = 'sign',
    startSearchGame = 'startSearchGame', // request
    stopSearchGame = 'stopSearchGame', // request
    gameSearching = 'gameSearching', // status, update, info
    gameStart = 'gameStart',
    // for game
    objectCreate = 'objectCreate',
    objectUpdate = 'objectUpdate',
    objectDestroy = 'objectDestroy',
    attack = 'attack'
}

export type ObjectType = 'Star' | 'Planet' | 'FighterShip' | 'BattleShip' | 'Homing';

export type ObjectUpdateData = {
    id?: number,
    pos?: {
        x: number,
        y: number,
        z: number
    },
    q?: {
        x: number,
        y: number,
        z: number,
        w: number
    }
}

export type ObjectCreateData = ObjectUpdateData & {
    type: ObjectType,
    owner?: string, // owner id
    radius?: number,
    hp?: number
}

export type StarCreateData = ObjectCreateData & {

}
