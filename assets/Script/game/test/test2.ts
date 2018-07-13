
export class test2 {
    private a: Array<any>;
    constructor() {
        this.run = true;
    }
    public run: boolean;
    /*
        let p1 = new Array<any>();
        let p2 = new Array<any>();
        for(let i = 0;i < 10;++i)
        {
            p2.push(i);
            let t = new test2();
            t.add(p2);
            p1.push(t);
    
        }
    */
    public add(t: Array<any>) {
        this.a = t;
    }


    public onLoad(t:any) {
        if (t.run) {
            console.log("ffffffffffff");
        }
        else {
            console.log("ffffffffffffeeeee");
        }

    }
}