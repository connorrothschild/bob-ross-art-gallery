<script>
  import * as d3 from "d3";

  export let data,
    grouped,
    width,
    height,
    padding,
    xScaleBar,
    yScaleBar,
    xScaleTimeline,
    yScaleTimeline,
    xTicks;

  const num_paintings = 403;
  const unique_colors = grouped.length;

  function handleMouseover(e) {
    let d = e.target.attributes;
    console.log(d);
    const tip = d3.select(".timelineTip");

    tip.html(
      `<p class='title' style="background: ${d.fill.value}; color: ${d.text_color.value}">${d.background_color.value}</p>`
    );

    tip
      .transition("tip-in")
      .duration(200)
      .style("opacity", 1)
      // Below handles offset on edges of screen
      .style("left", e.layerX + "px")
      .style("top", e.layerY - 28 + "px");
  }
  function handleMouseout() {
    d3.select(".timelineTip")
      .transition("tip-out")
      .duration(200)
      .style("opacity", 0);
  }
</script>

<g>
  {#each grouped as d}
    <rect
      width="0"
      height={(height / unique_colors) * 0.9}
      class="colorBar"
      fill={d.key}
      background_color={d.colors}
      text_color={d.text_color}
      x={0}
      y={yScaleBar(d.key)}
      on:mouseover={handleMouseover}
      on:mouseout={handleMouseout}
    />
  {/each}
</g>
<g>
  {#each data as d}
    <rect
      width={width / num_paintings}
      height={(height / unique_colors) * 0.9}
      fill={d.color_hex}
      background_color={d.colors}
      text_color={d.text_color}
      x={0}
      y={yScaleTimeline(d.color_hex)}
      class="timelineRect"
      on:mouseover={handleMouseover}
      on:mouseout={handleMouseout}
    />
  {/each}
</g>

<style lang="scss"></style>
