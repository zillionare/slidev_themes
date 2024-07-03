
export function isShow(rng, click){
    if (Array.isArray(rng)) {
        return rng.includes(click)
    } else {
        return [-1, click].includes(rng)
    }
}

export function choice(arr){
    var p = Math.round(Math.random() * (arr.length - 0.5))

    return arr[p]
}


export function createStyle(content){
    var ss = document.createElement('style');
    ss.innerHTML = content
    document.head.appendChild(ss);
}

export function randomString(n=8, prefix=""){
    const length = n - prefix.length;
    return Math.random().toString(36).substring(2,2+length);
}
