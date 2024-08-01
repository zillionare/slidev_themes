
export function isShow(rng, click) {
    if (Array.isArray(rng)) {
        return rng.includes(click)
    } else {
        return [-1, click].includes(rng)
    }
}

export function choice(arr) {
    var p = Math.round(Math.random() * (arr.length - 0.5))

    return arr[p]
}


export function createStyle(content) {
    var ss = document.createElement('style');
    ss.innerHTML = content
    document.head.appendChild(ss);
}

export function randomString(n = 8, prefix = "") {
    const length = n - prefix.length;
    return Math.random().toString(36).substring(2, 2 + length);
}


export function mergeTransform(baseTransform, additionalTransform) {
    // If there's no base transform, just return the additional one.
    if (!baseTransform) return additionalTransform;

    // Split the base transform into an array, assuming each transformation is separated by a space.
    let transforms = baseTransform.split(' ');

    // Check if the additional transform is already present to avoid duplication.
    // This is a simplistic check and assumes the additional transform does not contain complex cases like chained transformations.
    if (!transforms.includes(additionalTransform)) {
        // If it's not present, append the new transformation ensuring there's a space before it for proper CSS formatting.
        transforms.push(additionalTransform);
    }

    // Join the array back into a single string and return.
    return transforms.join(' ');
}
