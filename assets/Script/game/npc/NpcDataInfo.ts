import { CardDataInfo } from "../card/CardDataInfo";

    export class CreateInfo
    {
        constructor()
        {
            this.level = 0;
            this.hp = 0;
            this.camp = 0;
            this.posX = 0;
            this.posY = 0;
            this.tarX = 0;
            this.tarY=0;
            this.dirX = 0;
            this.lifeTime = 0;
            this.cardData = null;
        }
        public level:number;
        public hp:number;
        public camp:number;
        public posX:number;
        public posY:number;
        public tarX:number;
        public tarY:number;
        public dirX:number;
        public lifeTime:number;
        public cardData:CardDataInfo;
    }
