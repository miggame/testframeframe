export class cfg {

    public static PLATFORM: number = 1;   //平台适配配置  1 WIN 2 QQ 3 WX

    public static IS_DEBUG: boolean = false;                // 是否为XCode开发环境
    public static IS_QQDEBUG: boolean = false;                // 是否为特殊处理腾讯bug

    public static MAX_COST: number = 20;                     //最大费用
    public static START_COST: number = 13;                     //开始费用
    public static MAX_TICK: number = 1800;                     //单局最大tick

    public static roomKeepTick: number = 5000;//房间活动时间

    public static WXURL = "https://127.0.0.1";


    public static StageX: number = 1334;

    public static StageY: number = 750;

    public static frameTime: number = 100;


    public static cardConfigMaxNum: number = 8;
    public static MatchReadyCountDownTime: number = 60;// 60秒战斗匹配准备时间
    public static MatchBattleCountDownTime: number = 5;// 5秒战斗开启倒计时
    public static CommonCoinID: number = 33001;//通用货币（金币）ID
    public static GoldID: number = 33002;//元宝（钻石）ID


    public static CONFIGROOT: string = "config/";







}

