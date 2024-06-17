
export function isShow(at, slidev){
    if (Array.isArray(at)) {
        return at.includes(slidev.nav.clicks)
    } else {
        return [-1, slidev.nav.clicks].includes(at)
    }
}
