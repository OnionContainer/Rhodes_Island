import Actor from "../Actor";

export default class ActorStateBase {
    protected _actor: Actor;

    constructor(actor: Actor) {
        this._actor = actor;
    }

    public enter(): void {

    }

    public update(): void {

    }

    public leave(): void {

    }

    public reset(): void {

    }
}