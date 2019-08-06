
export module Struc{
    

    export class PointerList<E>{
        private list:Array<E> = []
        private pointer:number = 0
        constructor(source:Array<E> = [], initPoint:number = 0){
            source.forEach((ele)=>{
                this.list.push(ele)
            })
        }
        read():E{
            return this.list[this.pointer]
        }

        step():PointerList<E>{
            this.pointer+=1
            return this
        }

        to(place:number):PointerList<E>{
            this.pointer = place
            return this
        }

        push(data:E):PointerList<E>{
            this.list.push(data)
            return this
        }

        set(index:number,data:E):PointerList<E>{
            this.list[index] = data
            return this
        }
        
        next(shift:number = 1):E{
            return this.list[this.pointer+shift]
        }

        get length():number{
            return this.list.length
        }
    }
}