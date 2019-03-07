// Virtual Wall Drawings: An Homage to Sol LeWitt
// Author: Chris Prince (@superdupercrispy)
// 

// Obtain dimensions of the wall and calculate its centerpoint
const wallBBox = wall.getBoundingClientRect()
const center = new Object({x: wallBBox.width/2, y: wallBBox.height/2})
const solColors = new Object({red: "#f00", yellow: "#ff0", blue: "#00f"})

function draw047() {

    const svg = d3.select("#wall").append("svg")
        .style("width", "100%")
        .style("height", "100%")

    const data = [[0,0,0,1], [0,0,1,0], [0,1,0,0], [1,0,0,0],
                  [0,0,1,1], [0,1,0,1], [1,0,0,1], [0,1,1,0], [1,0,1,0], [1,1,0,0],
                  [0,1,1,1], [1,0,1,1], [1,1,0,1], [1,1,1,0],
                  [1,1,1,1]]
    const panelWidth = wallBBox.width/15
    const gridSpace = 8

    const svgDefs = svg.append("defs")
    svgDefs.append('g')
        .attr("id", "hline")
        .selectAll('line')
        .data([...Array((wallBBox.height/gridSpace)|0 + 1).keys()]).enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', panelWidth)
        .attr('y1', d=>d*gridSpace)
        .attr('y2', d=>d*gridSpace)
    svgDefs.append('g')
        .attr("id", "vline")
        .selectAll('line')
        .data([...Array((panelWidth/gridSpace)|0 + 1).keys()]).enter()
        .append('line')
        .attr('x1', d=>d*gridSpace)
        .attr('x2', d=>d*gridSpace)
        .attr('y1', 0)
        .attr('y2', wallBBox.height)
    svgDefs.append('g')
        .attr("id", "uline")
        .selectAll('line')
        .data([...Array(((wallBBox.height+panelWidth)/gridSpace/1.4)|0 + 1).keys()]).enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', panelWidth) //d=>d*gridSpace*1.414)
        .attr('y1', d=>d*gridSpace*1.414-panelWidth)
        .attr('y2', d=>d*gridSpace*1.414)
    svgDefs.append('g')
        .attr("id", "dline")
        .selectAll('line')
        .data([...Array(((wallBBox.height+panelWidth)/gridSpace/1.4)|0 + 1).keys()]).enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', panelWidth)
        .attr('y1', d=>d*gridSpace*1.414)
        .attr('y2', d=>d*gridSpace*1.414-panelWidth)

    const orients = ["#dline", "#uline", "#vline", "#hline"]

    for (i = 0; i<15; i++){
        let panelLines = data[i]

        for (j=0; j<4; j++){
            svg.append('g')
                .append("use")
                .attr("xlink:href", orients[j])
                .attr("transform", "translate(" + panelWidth*i + ")")
                .style("stroke-width", panelLines[j]*0.8)
                .style("stroke", "#000")
        }
    }

}


function draw130() {
    // Wall Drawing 130
    // "Grid and arcs from four corners"
    //
    const svg = d3.select("#wall").append("svg")
        .style("width", "100%")
        .style("height", "100%")

    const radii = [...Array(200).keys()]
    const spacing = 20
    const offWall = spacing * 50

    for (i = 0; i<5; i++){
        d3.select("svg").append("g")
            .selectAll("circle")
            .data(radii)
            .enter()
            .append("circle")
            .attr("r", d => spacing*d)
            .attr("cx", i == 0 ? center.x - offWall 
                : i < 4 ? center.x 
                : center.x + offWall) 
            .attr("cy", i%2 == 0 ? center.y 
                : i == 1 ? center.y - offWall
                : center.y + offWall)
            .style("stroke", "#000")
            .style("stroke-width", d => (0.1 + 0.1*Math.random())+"px")
            .style("fill", "none")
    }
}

function draw289_4() {
    // From MassMOCA description:
    // A 6-inch (15 cm) grid covering each of the four black walls. 
    // White lines to points on the grids. 
    // Fourth wall: twenty-four lines from the center, 
    // twelve lines from the midpoint of each of the sides, 
    // twelve lines from each corner. 
    // (The length of the lines and their placement are determined by the drafter.) 
    // (Detail: 4th wall only)

    //black wall
    const svg = d3.select("#wall").append("svg")
        .style("width", "100%")
        .style("height", "100%")
        .style("background-color", "#000")

    // 24 lines from center
    let rays = [...Array(24).keys()]
    let map = rays.map(ang => new Object(
        {a: (Math.PI/180) * (15*ang + 12*Math.random()), 
            l: 200 + 700*Math.random()}))

    d3.select("svg").append("g")
        .attr("transform", "translate(" + center.x +"," + center.y +")")
        .selectAll("line")
        .data(map)
        .enter()
        .append("line")
        .attr("x1", 0) 
        .attr("y1", 0)
        .attr("x2", d=> 30* ~~((d.l * Math.cos(d.a))/30) )
        .attr("y2", d=> 30* ~~((d.l * Math.sin(d.a))/30) )
        .style("stroke", "#fff")
        .style("stroke-width", "1.5px")

    // 12 lines from each midpoint and corner
    const points = [
        [0,0],
        [center.x,0],
        [2*center.x,0],
        [2*center.x,center.y],
        [2*center.x,2*center.y],
        [center.x,2*center.y],
        [0,2*center.y],
        [0,center.y]] 
    const orients = [0,0,90,90,180,180,270,270]

    for(i = 0; i<8; i++){
        rays = [...Array(12).keys()]
        map = rays.map(ang => new Object(
            {a: (Math.PI/180) * (7.5*(i%2 + 1)*ang + 6*(i%2 + 1)*Math.random()), 
                l: 200 + 700*Math.random()}))

        d3.select("svg").append("g")
            .attr("transform", "translate(" + points[i][0] +"," + points[i][1] +") rotate(" + orients[i]+ ")")
            .selectAll("line")
            .data(map)
            .enter()
            .append("line")
            .attr("x1", 0) 
            .attr("y1", 0)
            .attr("x2", d=> 30* ~~((d.l * Math.cos(d.a))/30) )
            .attr("y2", d=> 30* ~~((d.l * Math.sin(d.a))/30) )
            .style("stroke", "#fff")
            .style("stroke-width", "1.5px")}
}

function draw340() {

    let closeShape = d3.line().curve(d3.curveLinearClosed)

    const divWidth = "30%"
    const divHeight = "45%"
    const data = [
        {"position": "topleft", "top": "3%", "left": "3%", "bgcolor": solColors.red, "hcolor": solColors.blue, "vcolor": solColors.yellow, 
            "shape": "circle", "sh_data": new Object({'cx': 0, 'cy':0, 'r':50})},
        {"position": "topcenter", "top": "3%", "left": "35%", "bgcolor": solColors.yellow, "hcolor": solColors.red, "vcolor": solColors.blue, 
            "shape": "rect", "sh_data": new Object({'x':-50,'y':-50,'width':100,'height':100})}, //square
        {"position": "topright", "top": "3%", "left": "67%", "bgcolor": solColors.blue, "hcolor": solColors.yellow, "vcolor": solColors.red, 
            "shape": "path", "sh_data": new Object({'d': closeShape([[0,-50],[-50,50],[50,50]])})}, //triangle
        {"position": "bottomleft", "top": "52%", "left": "3%", "bgcolor": solColors.red, "hcolor": solColors.yellow, "vcolor": solColors.blue, 
            "shape": "rect", "sh_data": new Object({'x':-25,'y':-50,'width':50,'height':100})}, //rectangle
        {"position": "bottomcenter", "top": "52%", "left": "35%", "bgcolor": solColors.yellow, "hcolor": solColors.blue, "vcolor": solColors.red, 
            "shape": "path", "sh_data": new Object({'d': closeShape([[-25,-50],[25,-50],[50,50],[-50,50]])})}, //trapezoid
        {"position": "bottomright", "top": "52%", "left": "67%", "bgcolor": solColors.blue, "hcolor": solColors.red, "vcolor": solColors.yellow, 
            "shape": "path", "sh_data": new Object({'d': closeShape([[-25,-50],[50,-50],[25,50],[-50,50]])})} //parallelogram
    ]
    const gridspace = 7
    const gridfill = 0.2

    let panels = d3.select('#wall')
        .selectAll('div')
        .data(data).enter()
        .append('div')
        .style('position','absolute')
        .style('top', d => d.top)
        .style('left', d => d.left)
        .style('width', divWidth)
        .style('height', divHeight)
        .style('background-color', d => d.bgcolor)
        .append('svg')
        .style("width", "100%")
        .style("height", "100%")

    panels.each(function(p,j) {
        let svgBBox = d3.select(this).node().getBoundingClientRect()
        let h = svgBBox.height, w = svgBBox.width, scaleFactor = 0.85*Math.min(h, w)/100
        let transformString = "translate(" + w/2 + "," + h/2 + ")scale(" + scaleFactor + ")"

        d3.select(this).append('g')
            .selectAll('line')
            .data([...Array((h/gridspace)|0 + 3).keys()]).enter()
            .append("line")
            .attr("x1", 0)
            .attr("y1", d => gridspace*d)
            .attr("x2", w) 
            .attr("y2", d => gridspace*d)
            .style("stroke", p.hcolor)
            .style("stroke-width", gridfill*gridspace)
        d3.select(this)
            .append("defs").append("clipPath")
            .attr("id", "clip_" + p.position)
            .append(p.shape)
            .attrs(p.sh_data)
            .attr("transform", transformString)
        d3.select(this)
            .append(p.shape)
            .attrs(p.sh_data)
            .attr("transform", transformString) 
            .style("fill", p.bgcolor)
        d3.select(this).append('g')
            .attr("clip-path", "url(#clip_" + p.position + ")")
            .selectAll('line')
            .data([...Array((w/gridspace)|0 + 3).keys()]).enter()
            .append('line')
            .attr("x1", d => gridspace*d)
            .attr("y1", 0)
            .attr("x2", d => gridspace*d)
            .attr("y2", h)
            .style("stroke", p.vcolor)
            .style("stroke-width", gridfill*gridspace)
    })

}

draw047();
//draw130();
//draw289_4();
//draw340();
