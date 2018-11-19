const players = [
    { player: 'Steve', result: 'made', con_x: 29.2, con_y: 69.5, shot_d: 20 },
    { player: 'Steve', result: 'missed', con_x: 25.6, con_y: 83.5, shot_d: 6 },
    { player: 'Steve', result: 'made', con_x: 24.4, con_y: 89.6, shot_d: 1 },
    { player: 'Tyson', result: 'made', con_x: 12, con_y: 87.8, shot_d: 13 },
    { player: 'Tyson', result: 'missed', con_x: 2.4, con_y: 85.4, shot_d: 23 },
    { player: 'Tyson', result: 'missed', con_x: 2, con_y: 5.4, shot_d: 23 },
]

// d3.select('body')
//     .selectAll('p')
//     .data(["helo", "hi", "hey", "hola", "yo"])
//     .enter()
//     .append('p')
//         .text((d) => {
//             return d + ", world"
//         })

const shots = d3.select('svg')
    .selectAll('g')
        .data(players)
        .enter()
        .append('g')
            .attr('class', 'shot')
            .attr('transform', (d) => {
                return "translate(" + 10 * d.con_y + "," + 10 * d.con_x + ")"
            })
        .on("mouseover", function(d){
            d3.select(this).raise()
            .append("text")
            .attr("class", "playername")
            .attr("transform", "translate(10,-5)")
            .text(d.player)
        })
        .on("mouseout", function(d){
            d3.selectAll("text.playername").remove()
        })

shots.append('circle')
    .attr('r', 5)
    .attr('fill', (d) => {
        if (d.result === 'made') {
            return "green"
        } else {
            return "red"
        }
    })

    const playergs = d3.nest()
    .key((d) => {
        return d.player
    })
    .rollup((array) => {return array.length})
    .entries(players)

playergs.unshift({"key": "ALL", "value": d3.sum(playergs, (d) => {return d.value})})

const selector = d3.select('#selector')

selector
    .selectAll('option')
    .data(playergs)
    .enter()
    .append("option")
        .text((d) => {
            return "Player: " + d.key + ": " + d.value
        })
        .attr("value", (d) => { return d.key })

selector
        .on('change', () => {
            d3.selectAll('.shot')
            .attr('opacity', 1)
            const value = selector.property('value')
            if (value != "ALL") {
                d3.selectAll(".shot")
                    .filter((d) => {
                        return d.player != value
                    })
                    .attr("opacity", 0.2)
            }
        })
