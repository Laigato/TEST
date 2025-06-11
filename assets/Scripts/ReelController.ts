import { _decorator, Component, Node, EventTarget } from 'cc';
import { Reel } from './Reel';
import { ReelResult } from './ReelResult';
const { ccclass, property } = _decorator;

const EventEmitter = new EventTarget(); 

@ccclass('ReelController')
export class ReelController extends Component 
{
    public static Events =
    {
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

    }

    update(deltaTime: number) 
    {
        
    }

    public Spin()
    {

    }

    public SubscribeSpinComplete(callback: (value: ReelResult) => void, target?: any)
    {
        EventEmitter.on(ReelController.Events.ONREELCOMPLETE, callback, target);
    }
    
    public UnSubcribeeSpinComplete(callback: (value: ReelResult) => void, target?: any)
    {
        EventEmitter.off(ReelController.Events.ONREELCOMPLETE, callback, target);
    }
}


