

const data = [
             {
               region: 'North Coast and Nechako',
               value: 87,
             },
 			{
               region: 'Northeast',
               value: 62,
             },
 			{
               region: 'Cariboo',
               value: 88,
             },
 			{
               region: 'Thompson-Okanagan',
               value: 25,
             },
 			{
               region: 'Kootenay',
               value: 16,
             },
 			{
               region: 'Mainland-Southwest',
               value: 21,
             },
 		    {
               region: 'Vancouver Island-Coast',
               value: 49,
             },
 			{
               region: 'Prefer not to answer',
               value: 3,
             }];

    // this is the chart size

    const marginTopBottom = 60;
    const marginSides = 175;
    const width = 1000 - (2 * marginSides);
    const height = 600 - (2 * marginTopBottom);

    const svg = d3.select('svg');

    const chart = svg.append('g')
        .attr('transform', `translate(${marginSides} ${marginTopBottom})`);

    // y axis (side)

    const yScale = d3.scaleBand()
        .range([0, height])
        .domain(data.map((s) => s.region))
        .padding(0.2);

    chart.append('g')
        .call(d3.axisLeft(yScale));

    // x axis (bottom)

    let maxVal = d3.max(data,(d) => {return d.value})

    const xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0, maxVal]);


      chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(4).tickFormat(d3.format(".0f")));

// these are the bars
  const barGroups = chart.selectAll()
          .data(data)
          .enter()
          .append('g')

    barGroups
          .append('rect')
          .attr('class', 'bar')
          .attr('x', 1)
          .attr('y', (s) => yScale(s.region))
          .attr('width', (s) => xScale(s.value))
          .attr('height', yScale.bandwidth())

          //interactivity
          .on('mouseenter', function(actual, i){
              d3.selectAll(".value")
                .attr('opacity', 0)

              d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 0.6)

              barGroups.append('text')
               .attr('class', 'value')
               .attr('x',
                  function(s){
                    if(xScale(s.value) - 20 < 3){
                    return xScale(s.value) + 10}
                    else{
                      return xScale(s.value) - 15
                    }
               })
               .attr('y', (a) => yScale(a.region) + 30)
               .attr('font-weight', 'bold')
               .attr('text-anchor', 'middle')
               .text((a, idx) => {
                 let text = ''
                 return idx !== i ? text : a.value;
               })





          })
          .on('mouseleave', function () {
            d3.selectAll('.value')
              .attr('opacity', 0)
            d3.select(this)
              .transition()
              .duration(300)
              .attr('opacity', 1)

          })








//these are grid lines
      chart.append('g')
          .attr('class','grid')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom()
              .scale(xScale)
              .tickSize(-height, 0, 0)
              .tickFormat(''))

//text
        svg.append('text')
            .attr('x', width/2 + marginSides)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .attr('class', 'title')
            .text('Survey Completes by BC Region')

        svg.append('text')
            .attr('x', width/2 + marginSides)
            .attr('y',575)
            .attr('text-anchor', 'middle')
            .text('Survey Completions')
