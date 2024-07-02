
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
