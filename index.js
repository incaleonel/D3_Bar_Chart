


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
    console.log(json)
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
       .call(yAxis)
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
                .style('text-align','center');

     