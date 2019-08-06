export default class Doctor{
    private HP:number


    constructor(){
        this.HP = 2
    }

    public damaged(hit:number):Doctor{
        this.HP -= hit
        if (this.HP === 0) {
            this.dead()
        }
        return this
    }

    private dead():void{
        alert("你的脑子被吃掉了")
    }
}