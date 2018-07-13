

export class Random {
    private seed: number;
    private static pool: Array<number>;
    constructor() {
        if (!Random.pool) {
            Random.pool = new Array<number>();
            Random.pool.push(5);
            Random.pool.push(4);
            Random.pool.push(6);
            Random.pool.push(3);
            Random.pool.push(7);
            Random.pool.push(2);
            Random.pool.push(8);
            Random.pool.push(1);
            Random.pool.push(9);
            Random.pool.push(10);
        }
    }


    public setSeed(seed: number) {
        this.seed = seed % 10;
    }

    public getRand() {
        let ret = Random.pool[this.seed]
        this.seed += 1;
        return ret;
    }

}
