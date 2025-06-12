import { _decorator, Component, Node, EventTarget } from 'cc';
import { Reel } from './Reel';
import { ReelResult } from './ReelResult';
const { ccclass, property } = _decorator;


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
    
    private EventEmitter = new EventTarget(); 

    private result : ReelResult;

    start() 
    {
        this.reelLeft.SubscribeSpinComplete(this.OnLeftFinish, this);
        this.reelMid.SubscribeSpinComplete(this.OnMiddleFinish, this);
        this.reelRight.SubscribeSpinComplete(this.OnRightFinish, this);
    }
    
    update(deltaTime: number) 
    {
        
    }

    Initialize(value: IData): void 
    {
        
    }

    public async Spin()
    {
        this.result = new ReelResult();

        this.EventEmitter.emit(ReelController.Events.ONREELSTART);
        this.reelLeft.Spin(5);
        
        await this.Delay(this.reelInterval * 1000);
        this.reelMid.Spin(5);
        
        await this.Delay(this.reelInterval * 1000);
        this.reelRight.Spin(5);
    }

    private Delay(ms: number)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public SubscribeSpinStart(callback: (value: ReelResult) => void, target?: any)
    {
        this.EventEmitter.on(ReelController.Events.ONREELSTART, callback, target);
    }
    
    public UnSubcribeeSpinStart(callback: (value: ReelResult) => void, target?: any)
    {
        this.EventEmitter.off(ReelController.Events.ONREELSTART, callback);
    }

    public SubscribeSpinComplete(callback: (value: ReelResult) => void, target?: any)
    {
        this.EventEmitter.on(ReelController.Events.ONREELCOMPLETE, callback, target);
    }
    
    public UnSubcribeeSpinComplete(callback: (value: ReelResult) => void, target?: any)
    {
        this.EventEmitter.off(ReelController.Events.ONREELCOMPLETE, callback);
    }

    private OnLeftFinish(items: string[])
    {
        this.result.resultLeft = items;
    }
    
    private OnMiddleFinish(items: string[])
    {
        this.result.resultMid = items;
    }
    
    private OnRightFinish(items: string[])
    {
        this.result.resultRight = items;
        this.EventEmitter.emit(ReelController.Events.ONREELCOMPLETE, this.result);
    }
}


