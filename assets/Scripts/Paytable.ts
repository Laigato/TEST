import { _decorator } from 'cc';
const { ccclass } = _decorator;

@ccclass('Paytable')
export class Paytable 
{
    private table: Map<string, number> = new Map();

    private GetKey(item: string, count: number): string 
    {
        return `${item}_${count}`;
    }

    public Add(item: string, count: number, multiplier: number): void 
    {
        const key = this.GetKey(item, count);
        this.table.set(key, multiplier);
    }

    public GetMultiplier(item: string, count: number): number 
    {
        const key = this.GetKey(item, count);
        return this.table.get(key) ?? 0;
    }

    public Contain(item: string, count: number): boolean 
    {
        return this.table.has(this.GetKey(item, count));
    }
}

