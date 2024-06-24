
export function isShow(at, slidev){
    if (Array.isArray(at)) {
        return at.includes(slidev.nav.clicks)
    } else {
        return [-1, slidev.nav.clicks].includes(at)
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
