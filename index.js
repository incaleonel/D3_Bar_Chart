


const w = 1000;
const h = 500;
const padding = 90;

const req = new XMLHttpRequest();
req.open('GET','https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
req.send();
req.onload = function(){
    const json = JSON.parse(req.responseText);
    const dateMin = new Date(json.from_date + 'T00:00:00');
    const dateMax = new Date(json.to_date + 'T00:00:00')
    
    const xScale = d3.scaleTime()
                     .domain([ dateMin , dateMax ])
                     .range([ padding , w-padding ]);
    console.log(json.data[0][1])
    const yScale = d3.scaleLinear()
                     .domain([0,d3.max(json.data, d => d[1])])
                     .range([ h-padding , padding ]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
                    

const svg = d3.select('#main')
              .style('background-color','white')
              .append('svg')
              .attr('width',w)
              .attr('height',h);
        
    svg.append('g')
       .attr('id','x-axis')
       .attr('transform','translate(0,'+(h-padding)+')')
       .call(xAxis);
    
    svg.append('g')
       .attr('id','y-axis')
       .attr('transform','translate('+ padding +', 0)')
       .call(yAxis);

    svg.append('text')
       .text('Gross Domestic Product')
       .attr('transform','rotate(-90)')
       .attr('x',-(padding + 180))
       .attr('y',padding + 20);

    svg.append('text')
       .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
       .attr('font-size', '12px')
       .attr('x', 6*padding)
       .attr('y', h + 50 - padding);

    svg.selectAll('rect')
       .data(json.data)
       .enter()
       .append('rect')
       .attr('class','bar')
       .attr('x',(d,i)=> padding + i*2.985)
       .attr('y',d=>h-d[1]/70 -padding)
       .attr('width','2.985')
       .attr('height',(d)=>{return d[1]/70})

       
}

const body=d3.select('body')
             .style('background-color','#064D81')
             .style('margin','0')
             .style('padding','0')
             .style('width','100vw')
             .style('height','100vh')
             .attr('class','d-flex justify-content-center align-items-center');
             
const title = d3.select('#title')
                .style('margin','0')
                .style('margin-top','20px')
                .style('text-align','center');

     