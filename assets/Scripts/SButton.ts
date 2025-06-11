import { _decorator, Component, Node, EventTarget } from 'cc';
const { ccclass, property } = _decorator;

const EventEmitter = new EventTarget(); 

@ccclass('SButton')
export class SButton extends Component 
{
    public static Events =
    {
        ONCLICK: "OnClick"
    };

    public Click()
    {

    }

    public SubscribeSpinComplete(callback: () => void, target?: any)
    {
        EventEmitter.on(SButton.Events.ONCLICK, callback, target);
    }
    
    public UnSubcribeeSpinComplete(callback: () => void, target?: any)
    {
        EventEmitter.off(SButton.Events.ONCLICK, callback, target);
    }
}


