import { CardDataInfo } from "../card/CardDataInfo";
import { ToolDataInfo } from "../tool/ToolDataInfo";

export enum CONTAINER_TYPE {

    CONTAINER_PLAYERBAG = 2,
    CONTAINER_MAXNUM = 3,


    CONTAINER_ITEM = 1000,
    CONTAINER_CARD = 1001,
    CONTAINER_ITEMTOOL = 2001,

}



export function getTypebyIndex(type: number): Container {
    let ret = null;
    switch (type) {
        case CONTAINER_TYPE.CONTAINER_CARD:
            ret = new ItemCard();
            break;
        case CONTAINER_TYPE.CONTAINER_MAXNUM:
            ret = new MaxNumContainer();
            break;
        case CONTAINER_TYPE.CONTAINER_PLAYERBAG:
            ret = new PlayerBag();
            break;
        case CONTAINER_TYPE.CONTAINER_ITEMTOOL:
            ret = new ItemTool();
            break;
    }


    return ret;
}

export class Container {

    public index: number;
    public itemType: CONTAINER_TYPE;
    public deserialize(info: any) {

    }

    public serialize(): any {
        return null;
    }
}

class ItemContainer extends Container {
    public pool: Map<number, Container>;
    constructor() {
        super();
        this.pool = new Map<number, Container>();
    }

    /**
          * 添加 item 没有考虑数量
          * @param pos 
          * @param item 
          */
    public addItem(pos: number, item: Container) {
        if (this.pool.get(pos)) {
            console.log("pos had item:" + pos)
        }
        else {
            this.pool.set(pos, item);
        }
    }

    /**
          * 添加 item 没有考虑数量             
          * @param item 
          */
    public addAutoItem(item: ItemBase) {
        let srcItem = this.getItemByID(item.itemID);
        if (srcItem != null) {
            this.delItem(srcItem.index);
        }
        let pos = this.getMaxIndex();
        item.index = pos;
        this.addItem(pos, item);
    }

    private getMaxIndex(): number {
        let ret = 1;
        this.pool.forEach((v, k, m) => {
            if (k >= ret) {
                ret = k + 1;
            }

        })
        return ret;
    }

    /**
     * 删除物品，没有考虑数量
     * @param pos 
     */
    public delItem(pos) {
        if (this.pool.get(pos)) {
            this.pool.delete(pos);
        }
    }

    /**
     * 删除物品，没有考虑数量
     * @param id 
     */
    public delItemById(id: number) {
        let item = this.getItemByID(id);
        if (item) {
            this.delItem(item.index);
        }

    }


    public getItemByID(id: number): ItemBase {
        let ret = null;
        let vList = this.pool.values();
        while (1) {
            let vi = vList.next();
            if (vi.done) {
                break;
            }
            let v = vi.value;
            if (v.itemType > CONTAINER_TYPE.CONTAINER_ITEM) {
                let item = <ItemBase>v;
                if (item.itemID === id) {
                    ret = item;
                    return ret;
                }
            }
        }

        return ret;
    }
}


export class PlayerBag extends ItemContainer {

    constructor() {
        super();
        this.itemType = CONTAINER_TYPE.CONTAINER_PLAYERBAG;
    }


    public deserialize(info: any) {
        this.index = info["index"];
        let list = info["list"];
        for (let k in list) {

            let value = list[k];
            let type = value["type"];
            let v = getTypebyIndex(type);
            v.deserialize(value);
            this.pool.set(v.index, v);
        }

    }

    public serialize(): any {
        let t = {};
        t["index"] = this.index;
        t["type"] = this.itemType;
        let list = {}
        t["list"] = list;
        this.pool.forEach((v, k, m) => {
            list[k] = v.serialize();
        })
        return t;
    }

}

export class MaxNumContainer extends ItemContainer {
    constructor() {
        super();
        this.itemType = CONTAINER_TYPE.CONTAINER_MAXNUM;
        this.maxNum = 8;
    }

    public deserialize(info: any) {
        this.index = info["index"];
        let list = info["list"];

        for (let k in list) {

            let value = list[k];
            let type = value["type"];
            let v = getTypebyIndex(type);
            v.deserialize(value);
            this.pool.set(v.index, v);
        }

    }

    public serialize(): any {
        let t = {};
        t["index"] = this.index;
        t["type"] = this.itemType;
        let list = {}
        t["list"] = list;
        this.pool.forEach((v, k, m) => {
            list[k] = v.serialize();
        })
        return t;
    }
    public maxNum: number;//最大数量
}




class ItemBase extends Container {

    public num: number;
    public itemID: number;

}


export class ItemCard extends ItemBase {
    public card: CardDataInfo;

    constructor() {
        super();
        this.itemType = CONTAINER_TYPE.CONTAINER_CARD;
    }
    public deserialize(info: any) {
        this.index = info["index"];
        let type = info["type"];
        this.card = new CardDataInfo();
        this.card.deserialize(info["card"]);
    }

    public serialize(): any {
        let t = {};
        t["index"] = this.index;
        t["type"] = this.itemType;
        t["num"] = this.num
        t["card"] = this.card.serialize();
        return t;
    }

}

export class ItemTool extends ItemBase {
    public tool: ToolDataInfo;

    constructor() {
        super();
        this.itemType = CONTAINER_TYPE.CONTAINER_ITEMTOOL;
    }

    public deserialize(info: any) {
        this.index = info["index"];
        let type = info["type"];
        this.tool = new ToolDataInfo();
        this.tool.deserialize(info["tool"]);
    }

    public serialize(): any {
        let t = {};
        t["index"] = this.index;
        t["type"] = this.itemType;
        t["num"] = this.num
        t["tool"] = this.tool.serialize();
        return t;
    }

}



