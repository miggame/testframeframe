import { Game } from './game/Game';

import { test2 } from './game/test/test2';



const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {
    private _game: Game;



    public get AppGame() {
        return this._game;
    }


    start() {

        this._game = new Game();
        this._game._uiRoot = this.node.getChildByName("UIRoot");
        this._game._sceneRoot = this.node.getChildByName("SceneRoot");
        this._game.init();
        this._game.start();
    }
}
