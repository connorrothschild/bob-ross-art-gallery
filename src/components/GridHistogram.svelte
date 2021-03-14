<script>
  import * as d3 from "d3";
  import { fade } from "svelte/transition";
  export let data, height, padding, xScaleHist, xTicks;

  function handleMouseover(e) {
    let d = e.target.attributes;
    const tip = d3.select(".gridTip");

    tip.html(`<p class='title'>${d.title.value}</p>
              <p class='subtitle'>${d.subtitle.value}</p>
              <div class="frame">
                <img class="painting" src=${d.img.value}></img>
              </div>`);

    const paintingHeight = parseFloat(tip.style("height"));
    const paintingWidth = parseFloat(tip.style("width"));

    tip
      // .transition("tip-in")
      // .duration(200)
      .style("opacity", 1)
      // Below handles offset on edges of screen
      .style(
        "left",
        (e.clientX > window.innerWidth - paintingWidth
          ? e.layerX - paintingWidth
          : e.layerX) + "px"
      )
      .style(
        "top",
        (e.clientY > window.innerHeight - paintingHeight
          ? e.layerY - paintingHeight
          : e.layerY - 28) + "px"
      );
  }

  function handleMouseout() {
    d3.select(".gridTip")
      // .transition("tip-out")
      // .duration(200)
      .style("opacity", 0);
  }
</script>

<!-- RECTS (HISTOGRAM) -->
<g on:mouseover={handleMouseover} on:mouseout={handleMouseout}>
  {#each data as d}
    <rect
      title={d.painting_title}
      subtitle={"Season " + d.season + ", episode " + d.episode}
      img={d.img_src}
      class="gridRect"
      fill="grey"
      stroke="white"
    />
  {/each}
</g>

<!-- X AXIS -->
<g transform="translate(0, {height - padding.bottom})">
  {#if xTicks}
    {#each xTicks as x}
      <g
        class="tick"
        opacity="1"
        transform="translate({xScaleHist(x)},0)"
        transition:fade
      >
        <line stroke="currentColor" y2="6" />
        <text fill="currentColor" y="9" dy="1em" x="-{padding.left}">
          {x}
        </text>
      </g>
    {/each}
  {/if}
</g>

<!-- X AXIS -->
<style lang="scss">
  .tick {
    line {
      stroke: none;
    }

    text {
      font-weight: 200;
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }

  :global(.gridTip .painting) {
    width: 100%;
  }

  :global(.gridTip .title) {
    text-align: center;
    font-weight: normal;
    font-size: 1rem;
    margin: 0.5rem 0 0 0;
    padding: 0 0.1rem;
  }

  :global(.gridTip .subtitle) {
    text-align: center;
    font-weight: 100;
    font-size: 0.75rem;
    margin: 0 0 0.5rem 0;
  }
</style>
