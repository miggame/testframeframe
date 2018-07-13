import { CardInfo } from "./CardInfo";

export class CardDataInfo {
    public level: number;
    public exp: number;
    public cardID: number;
    public cardSkill: Array<number>;
    public cardInfo: CardInfo;
    constructor() {
        this.level = 1;
        this.exp = 0;
        this.cardID = 0;
        this.cardSkill = new Array<number>();
        this.cardInfo = null;
    }



    public deserialize(info: any) {
        this.level = info["level"];
        this.exp = info["exp"];
        this.cardID = info["cardID"];
        let t = info["cardSkill"];
        for (let k in t) {
            this.cardSkill.push(t[k]["skillName"]);
        }


    }

    public serialize(): any {
        let t = {};
        t["level"] = this.level;
        t["exp"] = this.exp;
        t["cardID"] = this.cardID;
        let skill = {};
        t["cardSkill"] = skill;

        for (let i = 0; i < this.cardSkill.length; ++i) {
            skill[i] = {};
            skill[i]["skillName"] = this.cardSkill[i];
        }

        return t;
    }

}
