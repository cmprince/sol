// Virtual Wall Drawings: An Homage to Sol LeWitt
// Author: Chris Prince (@superdupercrispy)
// 

// Create an svg canvas on the "wall"

// Obtain dimensions of the wall and calculate its centerpoint
const wallBBox = wall.getBoundingClientRect()
const center = new Object({x: wallBBox.width/2, y: wallBBox.height/2})

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

    const width = "30%"
    const height = "45%"
    const data = [
        {"class": "topleft", "top": "3%", "left": "3%", "bgcolor": "#f00", "hcolor": "#00f", "shape": "circle", "sh_data": new Object({'cx': 0, 'cy':0, 'r':50})},
        {"class": "topcent", "top": "3%", "left": "35%", "bgcolor": "#ff0", "hcolor": "#f00", "shape": "rect", "sh_data": new Object({'x':-50,'y':-50,'width':100,'height':100})}, //square
        {"class": "topright", "top": "3%", "left": "67%", "bgcolor": "#00f", "hcolor": "#ff0", "shape": "path", "sh_data": new Object({'d': closeShape([[0,-50],[-50,50],[50,50]])})},//trian
        {"class": "bottomleft", "top": "52%", "left": "3%", "bgcolor": "#f00", "hcolor": "#ff0", "shape": "rect", "sh_data": new Object({'x':-25,'y':-50,'width':50,'height':100})},//rect
        {"class": "bottomcent", "top": "52%", "left": "35%", "bgcolor": "#ff0", "hcolor": "#00f", "shape": "path", "sh_data": new Object({'d': closeShape([[-25,-50],[25,-50],[50,50],[-50,50]])})},//trap
        {"class": "bottomright", "top": "52%", "left": "67%", "bgcolor": "#00f", "hcolor": "#f00", "shape": "path", "sh_data": new Object({'d': closeShape([[-25,-50],[50,-50],[25,50],[-50,50]])})}//parall
    ]

    let w = d3.select('#wall')
    	.selectAll('div')
    	.data(data).enter()
    	.append('div')
    		.style('position','absolute')
    		.style('top', function (d) { return d.top; })
    		.style('left', function (d) { return d.left; })
    		.style('width', width)
    		.style('height', height)
    		.style('background-color', function (d) { return d.bgcolor; })
        .append('svg')
            .attr('class', function (d) { return d.class; })
            .style("width", "100%")
            .style("height", "100%")

    w.selectAll('line')
        .data([...Array(100).keys()]).enter()
        .append("line")
        .attr("x1", 0)
        .attr("y1", d=>10*d)
        .attr("x2", function() {return d3.select(this.parentNode).node().getBoundingClientRect().width } )
        .attr("y2", d=>10*d)
        .style("stroke", function() {return d3.select(this.parentNode).datum().hcolor} )
 
    w.each(function(p,j) {
        let svgBBox = d3.select(this).node().getBoundingClientRect()
        d3.select(this).selectAll("path")
            .data([1]).enter()
            .append(p.shape)
            .attrs(p.sh_data)
			.attr("id", "shape_" + p.class)
			.attr("transform", "translate("+svgBBox.width/2+"," +svgBBox.height/2+")scale(2.5)")
            .style("fill", p.hcolor)
            .style("stroke-width", "5px")
		d3.select(this).append('g')
			.selectAll('line')
			.data([...Array(100).keys()]).enter()
			.append('line')
			.attr("x1", d=>10*d)
			.attr("y1", 0)
			.attr("x2", d=>10*d)
			.attr("y2", 200) //function() {return d3.select(this.parentNode).node().getBoundingClientRect().height } )
			.attr("clip-path", "url(#shape_" + p.class + ")")
			.style("stroke", '#000') //function() {return d3.select(this.parentNode).datum().bgcolor} )
			
        })
        
}

//draw130();
//draw289_4();
draw340();
