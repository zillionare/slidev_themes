export function product() {
  var args = Array.prototype.slice.call(arguments); // makes array from arguments
  return args.reduce(function tl (accumulator, value) {
    var tmp = [];
    accumulator.forEach(function (a0) {
      value.forEach(function (a1) {
        tmp.push(a0.concat(a1));
      });
    });
    return tmp;
  }, [[]]);
}

export function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}

export function choice(arr){
    var p = Math.round(Math.random() * (arr.length - 0.5))

    return arr[p]
}

export function admonit(){
    console.log("calling admonit")
    var headings = document.evaluate("//p[starts-with(., '!!!')]", document, null, XPathResult.ANY_TYPE, null );
    var replacements = [];
    if (headings) {
        var oldNode = headings.iterateNext();
        while(oldNode) {
            var rows = oldNode.textContent.split("\n");
            if (rows.length) {
                var titles = /(?:!!!)([\w]+)(?:[\s])?(.*)/.exec(rows[0]);
                var text = "";
                rows.slice(1).forEach(r => {
                    text += r.replace(/^\s{4}/, "") + "\n"
                })
                var ihtml = marked.parse(text);
                replacements.push({oldNode, ihtml, titles1: titles[1], titles2: titles[2]});
            }
            oldNode = headings.iterateNext();
        }
    }
    replacements.forEach(x => {
        var newNode = document.createElement('div');
        newNode.classList.add("admonition", x.titles1);
        if (x.titles2 !== '""') {
            var newNodeTitle = document.createElement('p');
            newNodeTitle.classList.add('admonition-title');
            newNodeTitle.innerText = x.titles2 || x.titles1.replace(/^\w/, (c) => c.toUpperCase());;
            newNode.appendChild(newNodeTitle);
        }
        var newNodePar = document.createElement('p');
        newNodePar.innerHTML = x.ihtml;
        newNode.appendChild(newNodePar);
        x.oldNode.parentNode.replaceChild(newNode, x.oldNode);
    }); 
}


