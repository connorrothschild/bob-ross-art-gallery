<script>
  import Hero from "./prose/Hero.svelte";
  import Intro from "./prose/Intro.svelte";
  import GridHistogramWrapper from "./GridHistogramWrapper.svelte";
  import Gallery from "./Gallery.svelte";
  import ColorVizWrapper from "./ColorVizWrapper.svelte";
  import { processData, getTextColor } from "../utils/process.js";
  import debounceFn from "lodash.debounce";

  import data from "../data/bob_ross_paintings.csv";
  import long_data from "../data/colors_long.csv";
  import { onMount } from "svelte";

  import { windowHeight } from "../stores/global.js";

  processData(data);
  processData(long_data, true);

  long_data.forEach(function (d) {
    d.text_color = getTextColor(d.color_hex);
  });

  console.log(data);

  //RESIZING
  let height = 800;

  onMount(() => {
    height = $windowHeight * 0.8;

    function resizeFn() {
      if (window.innerWidth > 768) {
        height = $windowHeight * 0.8;
      }
    }
    window.addEventListener("resize", debounceFn(resizeFn, 300));
  });
</script>

<Hero />

<Intro />

<section>
  <GridHistogramWrapper {data} {height} />
</section>

<section>
  <ColorVizWrapper data={long_data} {height} />
</section>

<!-- <section> -->
<Gallery {data} {long_data} />
<!-- </section> -->

<!-- </section> -->
<style lang="scss" global>
  section {
    padding: 1rem;
    margin: 0 auto;

    &.prose {
      max-width: 78ch;
    }

    &.visual {
      max-width: 800px;
    }
  }
</style>
