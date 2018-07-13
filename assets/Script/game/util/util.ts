

export function distance_sq(x1, y1, x2, y2): number {
    return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
}

export function distance(x1, y1, x2, y2): number {
    return ((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
}


export function getFlipX(x: number): number {
    //暂时写死
    return 2000 - x;
}


//将tick数转化为字符串 xx：xx
export function tickTransMMSS(num: number): string {
    let ret: string;
    let p = Math.floor(num / 10);
    let m = Math.floor(p / 60);
    let s = p % 60;
    if (s < 10) {
        ret = m.toString() + ":0" + s.toString();
    }
    else {
        ret = m.toString() + ":" + s.toString();
    }


    return ret;
}

