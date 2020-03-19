import { ColiReceiver, ColiEmit } from "../Actor/ActorModules/ColiMessage";
import { Vec2 } from "../../Common/DodMath";
import Actor from "../Actor/Actor";
import { ArrayAlgo } from "../../Common/DodDataStructure";
import { ActorType } from "../../Common/DodKey";


export default class ColiReporter extends ColiReceiver {
    public inList: Vec2[] = [];
    public layer: Laya.Sprite = new Laya.Sprite();

    constructor() {
        super(10, 10);
        for (let w = 0; w < 10; w += 1) {
            for (let h = 0; h < 10; h += 1) {
                this.setDetection(new Vec2(w, h), `${ActorType.Monster}`);
            }
        }

        Laya.stage.addChild(this.layer);
        this.layer.zOrder = -10;
    }

    protected onEntre(actor: Actor, pos: Vec2): void {
        // console.log("Enter" + pos.x + "|" + pos.y);
        this.inList.push(pos);
        this.render();
    }

    protected onLeave(actor: Actor, pos: Vec2): void {
        const index = ArrayAlgo.findEle(pos, this.inList);
        if (index !== -1) {
            this.inList.splice(index, 1);
        }
        this.render();
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
