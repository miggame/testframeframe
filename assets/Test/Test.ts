import {NetPomelo} from './NetPomelo';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let netPomelo = new NetPomelo();
        netPomelo.init();
    }

    // start () {

    // }

    // update (dt) {}
}
