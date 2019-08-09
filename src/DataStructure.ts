
export module Struc{
    

    export class PointerList<E>{
        private _list:Array<E> = []
        private _pointer:number = 0
        constructor(source:Array<E> = [], initPoint:number = 0){
            source.forEach((ele)=>{
                this._list.push(ele)
            })
        }

        get exceeding():boolean{
            return this._pointer >= this._list.length || this._pointer < 0
        }

        read():E{
            return this._list[this._pointer]
        }

        step():PointerList<E>{
            this._pointer+=1
            return this
        }

        to(place:number):PointerList<E>{
            this._pointer = place
            return this
        }

        push(data:E):PointerList<E>{
            this._list.push(data)
            return this
        }

        set(index:number,data:E):PointerList<E>{
            this._list[index] = data
            return this
        }
        
        next(shift:number = 1):E{
            return this._list[this._pointer+shift]
        }

        get length():number{
            return this._list.length
        }

        get last():E{
            return this._list[this._list.length-1]
        }

        get pointer():number{
            return this._pointer
        }

        get atEnd():boolean{
            return this._pointer === this._list.length - 1
        }
    }
}