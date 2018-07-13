import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { entity } from "../../../framework/entity/Entity";
import { SpecialStateListComponent } from "../../entity/component/SpecialStateListComponent";
import { ImpactInfo } from "../ImpactInfo";
import { SPECIAL_STATE } from "../SkillManager";

enum OWNPARAMINDEX {
    IDX_DAMAGE = 0,
}

enum DATADESCINDEX {
    IDX_IDLE = 0,
}

export class ImpactLogic008 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_008;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {
        return true;
    }

    public onActive(data: ImpactData, e: entity): void {
        let t: SpecialStateListComponent = <SpecialStateListComponent>e.getCompnentByType(SpecialStateListComponent);
        if (t) {
            t.list[SPECIAL_STATE.SPECIAL_STATE_STUN] = 1;
        }


    }

    public onFadeOut(data: ImpactData, e: entity): void {
        let t: SpecialStateListComponent = <SpecialStateListComponent>e.getCompnentByType(SpecialStateListComponent);
        if (t) {
            t.list[SPECIAL_STATE.SPECIAL_STATE_STUN] = 0;
        }

    }


    public getIntAttrRefix(data: ImpactData, e: entity, index: number): number {
        return 0;
    }



}
