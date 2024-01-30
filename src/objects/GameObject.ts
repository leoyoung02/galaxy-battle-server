import * as THREE from 'three';
import { IUpdatable } from "../interfaces/IUpdatable.js";
import { AttackInfo, ObjectCreateData, ObjectType, ObjectUpdateData } from "../data/Types.js";
import { MyMath } from '../utils/MyMath.js';
import { ILogger } from '../interfaces/ILogger.js';
import { LogMng } from '../utils/LogMng.js';

type CritParams = {
    critChance: number[], // [min, max]
    critFactor: number[] // [min, max]
}

type AttackParams = {
    radius: number,
    damage?: number[], // [min, max]
    hitPenetration?: number[], // [min, max]
    crit?: CritParams
}

export type GameObjectParams = {
    owner: string,
    id: number,
    radius: number,
    position?: THREE.Vector3 | { x: number, y: number },
    isImmortal?: boolean,
    hp?: number,
    shield?: number,
    attackParams?: AttackParams,
    evasion?: number[],
}

export class GameObject implements IUpdatable, ILogger {

    protected _className: string;
    protected _mesh: THREE.Mesh;
    // owner wallet id
    private _owner: string;
    // game object id
    protected _id: number;
    protected _type: ObjectType;
    // object radius
    private _radius: number;
    protected _hp: number;
    protected _shield: number;
    private _isImmortal = false;
    protected _attackParams: AttackParams;


    constructor(aParams: GameObjectParams) {

        this._radius = aParams.radius;
        this._owner = aParams.owner;
        this._id = aParams.id;

        this._hp = aParams.hp || 0;
        this._shield = aParams.shield || 0;
        this._isImmortal = aParams.isImmortal || false;
        this._attackParams = aParams.attackParams || null;
        
        this.initMesh();

        if (aParams.position) {
            if (aParams.position instanceof THREE.Vector3) {
                this._mesh.position.copy(aParams.position);
            }
            else {
                let pos = new THREE.Vector3(aParams.position.x, 0, aParams.position.y);
                this._mesh.position.copy(pos);
            }
        }

    }

    logDebug(aMsg: string, aData?: any): void {
        LogMng.debug(`${this._className}: ${aMsg}`, aData);
    }
    logWarn(aMsg: string, aData?: any): void {
        LogMng.warn(`${this._className}: ${aMsg}`, aData);
    }
    logError(aMsg: string, aData?: any): void {
        LogMng.error(`${this._className}: ${aMsg}`, aData);
    }

    protected initMesh() {
        let g = new THREE.SphereGeometry(this._radius || 1);
        this._mesh = new THREE.Mesh(g);
        this._mesh['ownerObject'] = this;
    }

    get owner(): string {
        return this._owner;
    }
    
    get id(): number {
        return this._id;
    }

    get radius(): number {
        return this._radius;
    }

    get hp(): number {
        return this._hp;
    }

    get shield(): number {
        return this._shield;
    }

    // set hp(value: number) {
    //     let newHp = Math.max(0, value);
    //     this._hp = newHp;
    // }

    get isImmortal() {
        return this._isImmortal;
    }

    get attackRadius() {
        return this._attackParams.radius;
    }

    get position(): THREE.Vector3 {
        return this._mesh.position.clone();
    }

    get mesh(): THREE.Mesh {
        return this._mesh;
    }

    getAttackDamage(): AttackInfo {
        let isCrit = false;
        let damage = MyMath.randomInRange(this._attackParams.damage[0], this._attackParams.damage[1]);
        return {
            isCrit: isCrit,
            damage: damage
        };
    }

    damage(aDamage: number) {
        let shieldDmg = Math.min(this._shield, aDamage);
        let hpDmg = Math.min(this._hp, aDamage - shieldDmg);
        this._shield -= shieldDmg;
        this._hp -= hpDmg;
    }

    lookAt(aTarget: THREE.Vector3) {
        // let p = new THREE.Vector3(aPoint.x, 0, aPoint.y);
        this._mesh.lookAt(aTarget);
    }

    lookByDir(aDir: THREE.Vector3) {
        let p = aDir.clone();
        p.add(this._mesh.position);
        this._mesh.lookAt(p);
    }

    /**
     * 
     * @param aPosition target position
     * @param aDuration duration in ms
     */
    jumpTo(aPosition: THREE.Vector3, aDuration = 1000) {

    }

    getCreateData(): ObjectCreateData {
        return null;
    }

    getUpdateData(): ObjectUpdateData {
        return null;
    }

    update(dt: number) {
        
    }

    free() {
        this._mesh = null;
        this._attackParams = null;
    }

}