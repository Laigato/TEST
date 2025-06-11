import { _decorator, Component, Node, EventTarget } from 'cc';
const { ccclass, property } = _decorator;

const EventEmitter = new EventTarget(); 

@ccclass('Reel')
export class Reel extends Component 
{
    public static Events =
    {
        SPINCOMPLETE: "SpinComplete"
    };

    @property
    private spinSpeed: number = 5;

    public Spin()
    {

    }

    public static SubscribeSpinComplete(callback: () => void, target?: any)
    {
        EventEmitter.on(Reel.Events.SPINCOMPLETE, callback, target);
    }
    
    public static UnSubcribeeSpinComplete(callback: () => void, target?: any)
    {
        EventEmitter.off(Reel.Events.SPINCOMPLETE, callback, target);
    }
}


