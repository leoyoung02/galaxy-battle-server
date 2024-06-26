
export type ShipParams = {
    hp: number,
    shield: number,
    damage: number[], // [min, max]
    hitPenetration: number, // [min, max]
    evasion: number, // [min, max]
    critChance: number, // [min, max]
    critFactor: number, // [min, max]
}

// net

export enum PackTitle {
    // for lobby
    sign = 'sign',
    startSearchGame = 'startSearchGame', // request
    stopSearchGame = 'stopSearchGame', // request
    gameSearching = 'gameSearching', // status, update, info
    duel = 'duel',
    battleConfirmation = 'battleConfirmation',
    battleSceneLoaded = 'battleSceneLoaded',
    gameStart = 'gameStart',
    gameComplete = 'gameComplete',
    exitGame = 'exitGame',
    // for game
    fieldInit = 'fieldInit',
    objectCreate = 'objectCreate',
    objectUpdate = 'objectUpdate',
    objectDestroy = 'objectDestroy',
    rotate = 'rotate',
    jump = 'jump',
    attack = 'attack',
    rayStart = 'rayStart',
    rayStop = 'rayStop',
    planetLaser = 'planetLaser',
    damage = 'damage',
    exp = 'exp',
    skill = 'skill',
    
    rocket = 'rocket',
    sniper = 'sniper',
    explosion = 'explosion',

    emotion = 'emotion',

    claimReward = 'claimReward',

    debugTest = 'debugTest',

    // universal message
    message = 'message'
    
}

export type TGAuthData = {
    id: number;
    auth_date: number;
    hash: string;
    first_name: string;
    last_name: string;
    username: string;
}

export type SignData = {
    fromServer?: 'request' | 'reject' | 'success',
    fromCli?: 'web3' | 'web2',
    signature?: string,
    message?: string,
    walletId?: string,
    tgAuthData?: TGAuthData
}

export type ObjectType = 'Star' | 'Planet' | 'Tower' | 'FighterShip' | 'BattleShip' | 'HomingMissile';
export type AttackType = 'laser' | 'ray';
export type ObjectRace = 'Humans' | 'Waters' | 'Insects' | 'Lizards';

export type SearchGameData = {
    isFreeConnect?: boolean,
    isChallenge?: boolean,
    withBot?: boolean,
    duelCmd?: 'create' | 'connect',
    duelNumber?: number,
}

export type DuelInfo = {
    cmd: 'check' | 'found' | 'notFound' | 'cancel',
    userNick?: string,
    enemyNick?: string,
    duelId?: string
}

export type AcceptScreenAction = 'start' | 'update' | 'accept' | 'connect' | 'loading' | 'cancel' | 'closeClick';

/**
 * Send to server after accept screen due loading screen
 */
export type PlayerLoadingData = {
    starName: string
}

export type AcceptScreenData = {
    action: AcceptScreenAction,
    timer?: number,
    state?: {
        current: number,
        max: number
    },
    loadingData?: PlayerLoadingData
}

export type PlayerData = {
    name: string,
    isNick: boolean,
    starName: string,
    race: ObjectRace
}
export type StartGameData = {
    cmd?: 'start',
    prerollTimerSec: number,
    playerData: PlayerData,
    enemyData: PlayerData
}

export type FieldInitData = {
    fieldParams: any,
    playerWalletAddr: string,
    playerPosition: 'top' | 'bot',
    playerRace: ObjectRace,
    enemyRace: ObjectRace,
}

export type GameCompleteData = {
    status: 'win' | 'loss' | 'duelEnemyDisconnected' | 'duelReward',
    hideClaimBtn?: boolean,
    showBoxClaim?: boolean,
    boxLevel?: number,
    ownerName: string,
    params: {
        damageDone: number,
        goldEarned: number,
        expReceived: number,
        rating: {
            previous: number,
            current: number
        }
    }
}

export type DamageInfo = {
    damage: number,
    isMiss?: boolean,
    isCrit?: boolean,
    critFactor?: number
}

export type ObjectUpdateData = {
    id: number,
    hp?: number,
    shield?: number,
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
    attackRadius?: number,
    lookDir?: { x, y, z }
}

export type StarCreateData = ObjectCreateData & {

}

export type FighterCreateData = ObjectCreateData & {
    shield: number
}

export type PlanetLaserSkin = 'blue' | 'red' | 'white' | 'violet';

export type PlanetLaserData = {
    planetId: number,
    pos: { x: number, y: number, z: number },
    dir: { x: number, y: number, z: number },
    length: number,
    skin: PlanetLaserSkin
}

export type SkillData = {
    level: number,
    levelUpAvailable: boolean,
    cooldown: {
        duration: number
    }
}

export type ExpData = {
    exp: number,
    level: number,
    levelExpPercent: number,
    skills: SkillData[]
}

export type SkillRequest = {
    action: 'levelUp' | 'click',
    skillId: number
}

export type RewardType = 'reward' | 'box';

export type ClaimRewardData = {
    type: RewardType,
    action?: 'request' | 'accept' | 'reject',
    reasone?: any
}

export type DebugTestData = {
    action: 'win' | 'loss'
}

export type ExplosionType = 'rocket';

export type ExplosionData = {
    type: ExplosionType,
    pos: { x: number, y: number, z: number }
}

export type RocketPacket = {
    action: 'targetCreate',
    rocketId: number,
    targetId: number
}

export type SniperData = {
    action: 'start' | 'end',
    planetId: number
}

export type Emotion = 'smile' | 'evil' | 'dead' | 'thinking' | 'angry' | 'sad';
export type EmotionData = {
    owner?: string,
    emotion: Emotion
}


// message pack
export type MessagePackInfoType = 'info' | 'warning' | 'error';
export type MessagePackShowType = 'hide' | 'console' | 'popup' | 'alert';
export type MessagePack = {
    msg: string,
    showType: MessagePackShowType,
    infoType?: MessagePackInfoType,
}
