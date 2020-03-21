import { ColiReceiver, ColiEmit } from "../Actor/ActorModules/ColiMessage";
import { Vec2 } from "../../Common/DodMath";
import Actor from "../Actor/Actor";
import { ArrayAlgo } from "../../Common/DodDataStructure";
import { ActorType } from "../../Common/DodKey";


export default class ColiReporter extends ColiReceiver {
    public inList: Vec2[] = [];
    public layer: Laya.Sprite = new Laya.Sprite();

    private _matrix: Actor[][][] = [];//存储每个地图节点中的Actor对象

    private matrixAdd(pos:Vec2, actor:Actor):void{
        this._matrix[pos.x][pos.y].push(actor);
    }

    private matrixRemove(pos:Vec2, actor:Actor):void{
        const index = this._matrix[pos.x][pos.y].indexOf(actor);
        if (index != -1) {
            this._matrix[pos.x][pos.y].splice(index,1);
        }
    }

    public matrixGet(pos:Vec2):Actor[]{
        return this._matrix[pos.x][pos.y];
    }

    constructor() {
        super(10, 10);
        for (let w = 0; w < 10; w += 1) {
            this._matrix[w] = [];
            for (let h = 0; h < 10; h += 1) {
                this.setDetection(new Vec2(w, h), `${ActorType.Monster}`);
                this._matrix[w][h] = [];
            }
        }

        Laya.stage.addChild(this.layer);
        this.layer.zOrder = -10;
        this.layer.pos(50,50);
    }

    

    protected onEntre(actor: Actor, pos: Vec2): void {
        // console.log("Enter" + pos.x + "|" + pos.y);
        this.inList.push(pos);
        this.render();
        this.matrixAdd(pos,actor);
    }

    protected onLeave(actor: Actor, pos: Vec2): void {
        const index = ArrayAlgo.findEle(pos, this.inList);
        if (index !== -1) {
            this.inList.splice(index, 1);
        }
        this.render();
        this.matrixRemove(pos,actor);
        // console.log("Leave" + pos.x + "|" + pos.y);
    }

    public render(): void {
        this.layer.graphics.clear();
        this.inList.forEach(ele => {
            this.layer.graphics.drawRect(ele.x * ColiEmit.GLOBAL_UNIT_WIDTH + 1,
                ele.y * ColiEmit.GLOBAL_UNIT_HEIGHT + 1,
                ColiEmit.GLOBAL_UNIT_WIDTH - 2,
                ColiEmit.GLOBAL_UNIT_HEIGHT - 2,
                "#ff0000"
            );
        });
    }
}
