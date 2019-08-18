const colourLegend = (selection, props) => {
  const { colorScale, circleRadius, spacing, textOffset,backgroundRectWidth } = props;

  const groups = selection.selectAll('g')
    .data(colorScale.domain())
    ;
  const backgroundRect = selection.selectAll('rect')
      .data([null])
  const n = colorScale.domain().length;
  backgroundRect.enter().append('rect')
    .merge(backgroundRect)
    .attr('x', -circleRadius *2)
    .attr('y', -circleRadius *2)
    .attr('width', backgroundRectWidth)
    .attr('height', spacing * n + circleRadius *2)
    .attr('rx', circleRadius*2)
    .attr('fill', 'white')
    .attr('opacity', '0.8');

  const groupsEnter = groups.enter().append('g');
  groupsEnter
    .merge(groups)
    .attr('class', 'tick')
    .attr('transform', (d, i) =>
    `translate(0,  ${i * spacing})`
  );

  groups.exit().remove();

  groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('r', circleRadius)
      .attr('fill', colorScale);

  groupsEnter.append('text')
    .merge(groups.select('text'))
      .text(d => d)
      .attr('dy', '0.32em')
      .attr('x', textOffset);

  //rect behind colour sizeLegend



};

const sizeLegend = (selection, props) => {
  const { sizeScale, spacing, textOffset, numTicks } = props;

  //get items
  const ticks = sizeScale.ticks(numTicks).filter(d => d!=0)
    .reverse(); //reverse array to big to small

  const groups = selection.selectAll('g')
    .data(ticks);

  const groupsEnter = groups.enter().append('g');
  groupsEnter
    .merge(groups)
    .attr('transform', (d, i) =>
    `translate(0,  ${i * spacing})`
  );

  groups.exit().remove();

  groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('r', sizeScale)
      .attr('fill', 'rgba(0,0,0,0.5)');

  groupsEnter.append('text')
    .merge(groups.select('text'))
      .text(d => d)
      .attr('dy', '0.32em')
      .attr('x', textOffset);
}

export {colourLegend, sizeLegend}
