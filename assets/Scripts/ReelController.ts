import { _decorator, Component, Node, EventTarget } from 'cc';
import { Reel } from './Reel';
import { ReelResult } from './ReelResult';
const { ccclass, property } = _decorator;

const EventEmitter = new EventTarget(); 

@ccclass('ReelController')
export class ReelController extends Component  implements ICanInitialize
{
    public static Events =
    {
        ONREELSTART: "OnReelStart",
        ONREELCOMPLETE: "OnReelComplete"
    };
    
    @property(Reel)
    private reelLeft: Reel;
    
    @property(Reel)
    private reelMid: Reel;
    
    @property(Reel)
    private reelRight: Reel;
    
    @property
    private reelInterval: number = 1;
    
    start() 
    {
        this.reelLeft.SubscribeSpinComplete(this.OnLeftFinish);
        this.reelMid.SubscribeSpinComplete(this.OnMiddleFinish);
        this.reelRight.SubscribeSpinComplete(this.OnRightFinish);
    }
    
    update(deltaTime: number) 
    {
        
    }

    Initialize(value: IData): void 
    {
        
    }

    public async Spin()
    {
        this.reelLeft.Spin(5);
        
        await this.Delay(1000);
        this.reelMid.Spin(5);
        
        await this.Delay(1000);
        this.reelRight.Spin(5);
    }

    private Delay(ms: number)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public SubscribeSpinStart(callback: (value: ReelResult) => void, target?: any)
    {
        EventEmitter.on(ReelController.Events.ONREELSTART, callback, target);
    }
    
    public UnSubcribeeSpinStart(callback: (value: ReelResult) => void, target?: any)
    {
        EventEmitter.off(ReelController.Events.ONREELSTART, callback, target);
    }

    public SubscribeSpinComplete(callback: (value: ReelResult) => void, target?: any)
    {
        EventEmitter.on(ReelController.Events.ONREELCOMPLETE, callback, target);
    }
    
    public UnSubcribeeSpinComplete(callback: (value: ReelResult) => void, target?: any)
    {
        EventEmitter.off(ReelController.Events.ONREELCOMPLETE, callback, target);
    }

    private OnLeftFinish()
    {
        console.log("LEFT FINISH");
    }

    private OnMiddleFinish()
    {
        console.log("MIDDLE FINISH");
    }

    private OnRightFinish()
    {
        console.log("RIGHT FINISH");
    }
}


