<script>
  import Hero from "./Hero.svelte";
  import Shuffler from "./Shuffler.svelte";

  import copyData from "../data/copy.json";
  import data from '../data/bob_ross_paintings.csv';

  data.forEach(function(d) { 
    d.num_colors = +d.num_colors,
    d.episode = +d.episode,
    d.season = +d.season,
    d.painting_index = +d.painting_index
  })

  console.log(data);
</script>

<Hero />

<section class='prose'>
  <p>{copyData.paragraph1}</p>
</section>

<section class='visual'>
  <Shuffler data="{data}"/>
</section>

<style lang="scss">
  section {
      padding: 1rem;
      margin: 0 auto;
      
    &.prose {
      max-width: 78ch;
    }

    &.visual {
      max-width: 1200px;
    }
  }

  /* td:nth-child(2),
  th:nth-child(2) {
    text-align: right;
    padding: 0.5em;
  } */
</style>
