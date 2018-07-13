export class NetPomelo {
    private _isSocketOpen:boolean = false;
    private _initEvent:boolean = false;
    getIsConnect(){
        return this._isSocketOpen;
    };
    initEvent(){
        if(this._initEvent === false){
            this._initEvent = true;
            pomelo.on('io-error', this.onError.bind(this));
            pomelo.on('close', this.onClose.bind(this));
        }
    };
    init(){
        if(pomelo){
            if(this._isSocketOpen === false){
                //初始化pomelo
                pomelo.init({//连接配置
                    host:'127.0.0.1',
                    port: '3010'
                }, this.onOpen.bind(this));
                this.initEvent();
            } else{
                console.log('[NetPomelo] has init ...');
            }
        }
    };
    onOpen(data){
        this._isSocketOpen = true;
        console.log('[NetPomelo Open]');
        //TODO——连接上之后的操作
        
    };

    onError(data){
        this._isSocketOpen = false;
        console.log('[NetPomelo Error]');
        //TODO——连接出错的操作
    };

    onClose(data){
        this._isSocketOpen = false;
        console.log('[NetPomelo] Close');
    };

    //主动断开
    activeDisconnect(){
        pomelo.disconnect(function(){
            this._isSocketOpen = false;
            //TODO——发送断开消息
        }.bind(this));
    };

    send(msg, data){
        //TODO——加入网络是否连接的断定
        if(pomelo){
            if(this.getIsConnect()){
                if(msg.route){
                    pomelo.request(msg.route, data, this.onMessage.bind(this));
                } else{
                    console.log('[NetPomelo] 未知的route： '+msg.route);
                }
            }
        } else{

        }
    };

    onMessage(data){
        //TODO——接收到消息的操作

    }

}