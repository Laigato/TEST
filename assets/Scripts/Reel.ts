import { _decorator, Component, Node, EventTarget, Vec3, tween, Layout } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Reel')
export class Reel extends Component 
{
    public EventEmitter = new EventTarget();

    public static Events =
    {
        SPINCOMPLETE: "SpinComplete"
    };

    @property
    private spinSpeedMin: number = 1;
    @property
    private spinSpeedMax: number = 1;
    @property
    private spinDuration: number = 5;
    @property
    private itemSpacing: number = 5;

    private reelItems: Node[] = [];
    private isSpinning = false;
    private spinTimer = 0;
    private spinSpeed = 0;

    protected onLoad(): void 
    {
        this.reelItems = this.node.children.slice();

    }

    public Spin(times: number = 10)
    {
        this.isSpinning = true;
        this.spinTimer = 0;
        this.spinSpeed = Math.random() * (this.spinSpeedMax - this.spinSpeedMin) + this.spinSpeedMin;
        this.schedule(this.SpinReel, 0);
    }

    private SpinReel(deltaTime: number = .016)
    {
        this.spinTimer += deltaTime;

        if (this.isSpinning == false || this.spinTimer >= this.spinDuration)
        {
            this.isSpinning = false;
            this.unschedule(this.SpinReel);
            this.Snap();
            this.EventEmitter.emit(Reel.Events.SPINCOMPLETE);
            return;
        }

        for (let item of this.reelItems)
        {
            let pos = item.getPosition();
            pos.y -= this.spinSpeed * .016;
            item.setPosition(pos);
        }

        const topItem = this.reelItems[0];
        const botItem = this.reelItems[this.reelItems.length - 1];
        if (botItem.getPosition().y < -this.itemSpacing * 3) 
        {
            const newY = topItem.getPosition().y + this.itemSpacing;
            botItem.setPosition(0, newY);
            
            // Move to end of the list
            this.reelItems.pop();
            this.reelItems.unshift(botItem);
        }
    }

    private Snap()
    {
        const top = this.itemSpacing * (this.reelItems.length - 1) / 2;
        for (let i = 0; i < this.reelItems.length; i++)
        {
            const y = top - i * this.itemSpacing;
            this.reelItems[i].setPosition(0, y);   
        } 
    }

    public SubscribeSpinComplete(callback: () => void, target?: any)
    {
        this.EventEmitter.on(Reel.Events.SPINCOMPLETE, callback, target);
    }
    
    public UnSubcribeSpinComplete(callback: () => void, target?: any)
    {
        this.EventEmitter.off(Reel.Events.SPINCOMPLETE, callback, target);
    }
}


