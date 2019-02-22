// Virtual Wall Drawings: An Homage to Sol LeWitt
// Author: Chris Prince (@superdupercrispy)
// 

// Wall Drawing 130
// "Grid and arcs from four corners"
//
//

const svg = d3.select("#wall").append("svg")
      .style("width", "100%")
      .style("height", "100%")
      .style("font", "10px sans-serif");

const wallBBox = wall.getBoundingClientRect()
const center = new Object({x: wallBBox.width/2, y: wallBBox.height/2})

function draw130() {

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
                .style("stroke-width", "0.1px")
                .style("fill", "none")
    }
}

draw130();
