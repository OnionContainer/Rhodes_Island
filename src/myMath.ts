

export default class MyMath{
    public static moveTo(front:number, shift:number, end:number):number {
        if(shift===0){
            return front
        }
        return shift>0?
            ((front+shift)>end?end:front+shift):
            ((front+shift)<end?end:front+shift)
    }


}


