import GameField from "../SceneScript/MainField"
import {basic} from "./People"

export default class Operator extends basic.People{
    constructor(upperPath:GameField, position:number[]){
        super()
        this.init()
        // this.state.init()
        this.present.init(upperPath.UISet, "Basic/OperatorSample_A.png",
            position[0], position[1])
        console.log(this)
    }
    init(){


    }

}
