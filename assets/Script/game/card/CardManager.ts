import { CardInfo } from "./CardInfo";
import { CardUpdateInfo } from "./CardUpdateInfo";

export class CardManager {
    public static readonly Instance: CardManager = new CardManager();

    private cardPool: Map<number, CardInfo>;
    private fightCardNum: number;
    private heroCardNum: number;
    public init(): void {
        this.cardPool = new Map<number, CardInfo>();
        this.cardUpdatePool = new Map<number, CardUpdateInfo>();
        this.fightCardNum = 0;
        this.heroCardNum = 0;

    }


    public getCardPool(): Map<number, CardInfo> {
        return this.cardPool;
    }


    public addCardInfo(index: number, info: CardInfo): void {
        if (info.cardSort == 1) {
            this.fightCardNum += 1;
        }
        else if (info.cardSort == 2) {
            this.heroCardNum += 1;
        }
        this.cardPool.set(index, info);
    }

    public getCardInfo(index: number): CardInfo {
        return this.cardPool.get(index);
    }

    private cardUpdatePool: Map<number, CardUpdateInfo>;

    public addCardUpdateInfo(index: number, info: CardUpdateInfo): void {
        this.cardUpdatePool.set(index, info);
    }

    public getCardUpdateInfo(index: number): CardUpdateInfo {
        return this.cardUpdatePool.get(index);
    }




    public getFightCardNum(): number {

        return this.fightCardNum;
    }



    public getHeroCardNum(): number {

        return this.heroCardNum;
    }


}
