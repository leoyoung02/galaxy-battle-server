import { Planet } from "src/objects/Planet";

export enum PackTitle {
    // for lobby
    sign = 'sign',
    startSearchGame = 'startSearchGame', // request
    stopSearchGame = 'stopSearchGame', // request
    gameSearching = 'gameSearching', // status, update, info
    gameStart = 'gameStart',
    // exitGame = 'exitGame',
    gameComplete = 'gameComplete',
    // for game
    fieldInit = 'fieldInit',
    objectCreate = 'objectCreate',
    objectUpdate = 'objectUpdate',
    objectDestroy = 'objectDestroy',
    attack = 'attack',
    planetLaser = 'planetLaser'
}

export type ObjectType = 'Star' | 'Planet' | 'FighterShip' | 'BattleShip' | 'Homing';

export type StartGameData = {
    cmd?: 'start',
    timer: number,
    playerWallet: string,
    enemyWallet: string
}

export type FieldInitData = {
    fieldParams: any,
    playerPosition: 'top' | 'bot'
}

export type GameCompleteData = {
    status: 'win' | 'lose' | 'draw'
}

export type ObjectUpdateData = {
    id: number,
    hp?: number,
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
    },
}

export type ObjectCreateData = ObjectUpdateData & {
    type: ObjectType,
    owner?: string, // owner id
    radius?: number,
    hp?: number,
    attackRadius?: number
}

export type StarCreateData = ObjectCreateData & {

}

export type FighterCreateData = ObjectCreateData & {

}

export type PlanetLaserData = {
    planetId: number,
    dir: { x, y, z }
}