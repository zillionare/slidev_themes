import { randomString } from '../../utils';
export function _buildChatBotClipPath(id_, rectWidth, rectHeight, triangleSide, side, borderRadius) {
    const triangleHeight = triangleSide * Math.sqrt(3) / 2; // 根据正三角形性质计算高度

    let [x0, y0, x1, y1, x2, y2] = [0, 0, 0, 0, 0, 0, 0, 0]
    let [rx, ry, rw, rh] = [0, 0, rectWidth, rectHeight]
    if (side === "right"){
        x0 = x1 = rectWidth - triangleHeight
        y0 = rectHeight / 2 - triangleSide / 2
        y1 = rectHeight/2 + triangleSide / 2
        x2 = rectWidth
        y2 = rectHeight /2

        //for the rect
        rx = 0
        ry = 0
        rw = rectWidth - triangleHeight
        rh = rectHeight

    }else if (side === "left"){
        x0 = x1 = triangleHeight
        y0 = rectHeight/2 - triangleSide / 2
        y1 = rectHeight/2 + triangleSide / 2
        y2 = rectHeight/2

        //for the rect
        rx = triangleHeight
        ry = 0
        rw = rectWidth - triangleHeight
        rh = rectHeight
    }else if (side === "top"){
        x0 = rectWidth/2 - triangleSide / 2
        x1 = rectWidth/2 + triangleSide / 2
        y0 = y1 = triangleHeight
        x2 = rectWidth / 2

        //for the rect
        rx = triangleHeight
        ry = 0
        rw = rectWidth
        rh = rectHeight - triangleHeight
    }else{
        y0 = y1 = rectHeight
        x0 = rectWidth/2 - triangleSide / 2
        x1 = rectWidth/2 + triangleSide / 2
        x2 = rectWidth / 2 
        y2 = triangleHeight / 2 + rectHeight

        //for the rect
        rx = 0
        ry = 0
        rw = rectWidth
        rh = rectHeight - triangleHeight
    }

    const polygonPoints = [
    `${x0} ${y0}`,
    `${x1} ${y1}`,
    `${x2} ${y2}`
    ].join(', ');

    return `
    <clipPath id="${id_}">
        <rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" rx="${borderRadius}" />
        <polygon points="${polygonPoints}" />
    </clipPath>
    `;
}

//chatbox是指一个矩形，其中一边有三角形凸起。

export function buildChatBotClipPath(rectWidth, rectHeight, side="left", triSideLen=0, borderRadius=10, id_=""){
    if (!id_){
        id_ = randomString();
    }

    if (!triSideLen){
        if (side in ["left", "right"]){
            triSideLen = rectHeight / 7
        }else{
            triSideLen = rectWidth / 7
        }
    }
    const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgDefs.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgDefs.setAttribute('width', '0');
    svgDefs.setAttribute('height', '0');
    let clipPath = _buildChatBotClipPath(id_, rectWidth, rectHeight, triSideLen, side, borderRadius);
    svgDefs.innerHTML = clipPath
    document.body.appendChild(svgDefs);

    console.debug("clip path is", clipPath);
    //返回clipPath, 可以用el.style.clipPath = buildChatBotClipPath()...
    return `url(#${id_})`;
}
