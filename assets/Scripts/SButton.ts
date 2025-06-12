import { _decorator, Component, Node, EventTarget } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SButton')
export class SButton extends Component 
{
    private EventEmitter = new EventTarget(); 
    
    public static Events =
    {
        ONCLICK: "OnClick"
    };

    public Click()
    {
        this.EventEmitter.emit(SButton.Events.ONCLICK);
    }

    public SubscribeSpinComplete(callback: () => void, target?: any)
    {
        this.EventEmitter.on(SButton.Events.ONCLICK, callback, target);
    }
    
    public UnSubcribeeSpinComplete(callback: () => void, target?: any)
    {
        this.EventEmitter.off(SButton.Events.ONCLICK, callback, target);
    }
}


