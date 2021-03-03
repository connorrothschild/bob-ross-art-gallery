<script>
  import Hero from "./Hero.svelte";
  import HistogramWrapper from "./HistogramWrapper.svelte";
  import Shuffler from "./Shuffler.svelte";
  import { processData } from "../utils/process.js";

  import copyData from "../data/copy.json";
  import data from "../data/bob_ross_paintings.csv";

  processData(data);

  console.log(data);
</script>

<Hero />

<section class="prose">
  <p>{copyData.paragraph1}</p>
</section>

<section class="visual">
  <Shuffler {data} />
</section>

<section>
  <HistogramWrapper {data} />
</section>

<style lang="scss">
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
