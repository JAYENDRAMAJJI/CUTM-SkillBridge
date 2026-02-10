import { Component, ElementRef, ViewChild, AfterViewInit, effect } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-placement-chart',
  standalone: true,
  template: `
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 class="text-lg font-bold text-gray-800 mb-4 font-serif">Placement Stats 2024</h3>
      <div #chartContainer class="w-full h-64"></div>
    </div>
  `
})
export class PlacementChartComponent implements AfterViewInit {
  @ViewChild('chartContainer') private chartContainer!: ElementRef;

  data = [
    { department: 'CSE', placed: 85 },
    { department: 'ECE', placed: 60 },
    { department: 'Mech', placed: 45 },
    { department: 'Civil', placed: 30 },
    { department: 'MBA', placed: 75 }
  ];

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = element.offsetWidth - margin.left - margin.right;
    const height = element.offsetHeight - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0]);

    x.domain(this.data.map(d => d.department));
    y.domain([0, 100]);

    svg.selectAll('.bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.department)!)
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.placed))
      .attr('height', d => height - y(d.placed))
      .attr('fill', '#1E2A44') // Navy Blue
      .attr('rx', 4);

    // Add labels
    svg.selectAll('.label')
      .data(this.data)
      .enter().append('text')
      .text(d => d.placed + '%')
      .attr('x', d => x(d.department)! + x.bandwidth() / 2)
      .attr('y', d => y(d.placed) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#8B1E1E');

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font-size', '10px');

    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .style('font-size', '10px');
  }
}