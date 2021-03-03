<script>
  import * as d3 from "d3";
  export let data, width, height, padding, xScale, yScale;

  $: xTicks = xScale.domain();

  function handleMouseover(e) {
    let d = e.target.attributes;
    const tip = d3.select(".tip");

    tip.html(`<p class='title'>${d.title.value}</p>
              <p class='subtitle'>${d.subtitle.value}</p>
              <div class="frame">
                <img class="painting" src=${d.img.value}></img>
              </div>`);

    tip
      .transition()
      .duration(1000)
      .style("opacity", 1)
      // If on rightmost side of screen, offset tooltip to the left
      // You should offset equal to the width of the tooltip width
      .style(
        "left",
        (e.clientX > window.innerWidth * 0.8
          ? e.layerX - parseFloat(tip.style("width"))
          : e.layerX) + "px"
      )
      .style("top", e.layerY - 28 + "px");
  }

  function handleMouseout() {
    d3.select(".tip").transition().duration(1000).style("opacity", 0);
  }
</script>

<!-- RECTS (HISTOGRAM) -->
<g>
  {#each data as d}
    <rect
      title={d.painting_title}
      subtitle={"Season " + d.season + ", episode " + d.episode}
      img={d.img_src}
      class="rects"
      width={width / d3.max(data, (d) => d.num_colors)}
      height={(height - padding.top - padding.bottom) /
        d3.max(data, (d) => d.yPos)}
      fill="grey"
      stroke-width="0"
      stroke="black"
      x={xScale(d.num_colors)}
      y={height - padding.bottom}
      on:mouseover={handleMouseover}
      on:mouseout={handleMouseout}
    />
  {/each}
</g>

<!-- X AXIS -->
<g transform="translate(0, {height - padding.bottom})">
  {#each xTicks as x}
    <g class="tick" opacity="1" transform="translate({xScale(x)},0)">
      <line stroke="currentColor" y2="6" />
      <text fill="currentColor" y="9" dy="0.71em" x="-{padding.left}">
        {x}
      </text>
    </g>
  {/each}
</g>

<!-- X AXIS -->
<style lang="scss">
  .tick {
    line {
      stroke: none;
    }

    text {
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }

  :global(.tip .painting) {
    width: 100%;
  }

  :global(.tip .title) {
    text-align: center;
    font-weight: normal;
    font-size: 1rem;
    margin: 0.5rem 0 0 0;
  }

  :global(.tip .subtitle) {
    text-align: center;
    font-weight: 100;
    font-size: 0.75rem;
    margin: 0 0 0.5rem 0;
  }
</style>
