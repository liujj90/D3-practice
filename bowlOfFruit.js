const w = 960
const h = 500



const colorScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range(['#c11d1d', '#eae600']);

const radiusScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range([80, 50]);

const fruitBowl = (selection, props) => {
  const { fruits, height } = props;

  const bowl = selection.selectAll('rect')
    .data([null])
    .enter().append('rect')
      .attr('y', 110)
      .attr('width', 920)
      .attr('height', 300)
      .attr('rx', 300 / 2);

  const groups = selection.selectAll('g')
    .data(fruits);
  const groupsEnter = groups.enter().append('g');
  groupsEnter
    .merge(groups)
      .attr('transform', (d, i) =>
        `translate(${i * 180 + 100},${height / 2})`
      );
  groups.exit().remove();

  groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('r', d => radiusScale(d.type))
      .attr('fill', d => colorScale(d.type));

  groupsEnter.append('text')
    .merge(groups.select('text'))
      .text(d => d.type)
      .attr('y', 120);
}

const svg = d3.select('svg')
 .attr("height", h)
 .attr("width", w)

let fruits;

const render = () => {
  fruitBowl(svg, {
    fruits,
    height: +svg.attr('height')
  });
};

// Buy 5 apples.
const makeFruit = type => ({ type });
fruits = d3.range(5).map(() => makeFruit('apple'));
render();

// Eat an apple.
setTimeout(() => {
  fruits.pop();
  render();
}, 1000);

// Replace an apple with a lemon.
setTimeout(() => {
  fruits[2].type = 'lemon';
  render();
}, 2000);

// Eat an apple (second one from the left).
setTimeout(() => {
  fruits = fruits.filter((d, i) => i !== 1);
  render();
}, 3000);
