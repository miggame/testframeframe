/**
 * 位图字体管理器
 * 通过注册的方式将需要加载的位图字体文件注入，实现批量加载位图字体的功能
 */
//     class BMFontManager extends BaseClass {
//     /**
//      * 位图字体信息
//      * 默认存储对应位图字体.fnt路径
//      */
//     private m_fontInfoDict: any;
//     private m_fontList: Array<string>;
//     private m_loadCompletedCallback: laya.utils.Handler;
//     constructor() {
//         super();
//         this.m_fontInfoDict = {};
//         this.m_fontList = new Array<string>();
//     }

//     /**
//      * 注册位图字体
//      * @param fontName 自定义的位图字体名称
//      * @param fontUrl 位图字体文件路径
//      */
//     public register(fontName: string, fontUrl: String) {
//         this.m_fontInfoDict[fontName] = fontUrl;
//         this.m_fontList.push(fontName);
//     }

//     /**
//      * 加载位图字体集
//      * @param onCompleteHandler 位图字体集资源加载完成的回调方法
//      */
//     public loadFonts(onCompleteHandler: laya.utils.Handler) {
//         this.m_loadCompletedCallback = onCompleteHandler;
//         this.loadNext();
//     }

//     loadNext() {
//         if (this.m_fontList.length > 0) {
//             var fontName = this.m_fontList.pop();
//             var fontUrl = this.m_fontInfoDict[fontName];
//             if (fontUrl != null) {
//                 var bmFont = new Laya.BitmapFont();
//                 bmFont.loadFont(fontUrl, laya.utils.Handler.create(this, this.onFontLoaded, [fontName, bmFont]));
//             }
//             else {
//                 Log.warn("font:" + fontName + "字体未注册！！！");
//                 this.loadNext();
//                 return;
//             }
//         }
//         else {
//             if (this.m_loadCompletedCallback != null) {
//                 this.m_loadCompletedCallback.run();
//             }
//         }
//     }

//     onFontLoaded(fontName: string, bmFont: Laya.BitmapFont) {
//         // 如果需要对字体进行一些诸如autoSize,支持自动缩放字体的功能，需要在此处统一设置参数
//         bmFont.setSpaceWidth(10);
//         bmFont.letterSpacing = 1;
//         Laya.Text.registerBitmapFont(fontName, bmFont);
//         Log.info("Register BMFont ...fontname="+fontName);
//         this.loadNext();
//     }
// }