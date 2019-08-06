
    
    
export module basic{
    export class Present{
        private ImageURL:string
        private father:Laya.Sprite
        private ele:Laya.Sprite
        private static size:number = 90
        constructor(){

        }
        init(father:Laya.Sprite,url:string = "Basic/OperatorSample_A.png",x:number,y:number){
            this.father = father
            this.ImageURL = url
            this.ele = Laya.Sprite.fromImage(this.ImageURL)
            this.ele.size(Present.size,Present.size)
            this.father.addChild(this.ele)
            this.setPosition([x,y])
        }

        setPosition(newPosition:number[]){
            this.ele.pos(newPosition[0],newPosition[1])
        }


    }

    export class State{
        // private static size:number = 90//待修改
        private static hitSize:number = 80

        private name:string
        private HP:number
        private MP:number

        private _x:number = 0
        private _y:number = 0
        private _speed:number = 0
        private _xSpeed:number = 0
        private _ySpeed:number = 0
        private _path:number[][] = []
        private aimPointer = -1
        
        // public hitBox:Laya.Rectangle
        constructor(){

        }

        init(data:any,path:number[][]){
            this.name = data["name"]
            this._speed = data["speed"]
            this.initPath(path)
        }

        private initPath(getpath:number[][]){
            getpath.forEach((ele,index)=>{
                this._path[index] = []
                this._path[index][0] = ele[0]
                this._path[index][1] = ele[1]
            })
        }


        public getAim():number[]{
            return this._path[this.aimPointer]
        }

        public updatePosition(){
            const aim:number[] = this.getAim()
            this._x = this.moveTo(this._x,this._xSpeed,aim[0])
            this._y = this.moveTo(this._y,this._ySpeed,aim[1])
            // console.log({x:this.x,y:this.y})
        }

        private moveTo(front:number, shift:number, end:number):number {
            if(shift===0){
                return front
            }
            return shift>0?
                ((front+shift)>end?end:front+shift):
                ((front+shift)<end?end:front+shift)
        }

        public isArrived():boolean{
            const aim:number[] = this.getAim()
            return this._x === aim[0] && this._y === aim[1]
        }

        
        // public getCentre():number[]{
        //     return [
                
        //     ]
        // }
    }


    export class People{
        public state:State
        public present:Present
        constructor(){
            this.state = new State()
            this.present = new Present()
        }

        sethitBox(size:number,position:number[]){
            
        }

        update(){

        }
    }
}