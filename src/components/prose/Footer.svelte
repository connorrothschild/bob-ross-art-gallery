<script>
  import { onMount } from "svelte";
  import wordmark from "../../svg/pudding/wordmark.svg";
</script>

<footer>
  <section class="about">
    <div class="wordmark">
      {@html wordmark}
    </div>
    <p>
      <a href="https://pudding.cool">The Pudding</a>
      is a digital publication that explains ideas debated in culture with visual
      essays.
    </p>
  </section>
</footer>

<style>
  footer {
    background-color: var(--text-main);
    color: var(--background-body);
    font-family: var(--sans);
    padding: 3em 1em;
    margin-top: 3em;
  }

  a,
  a:visited,
  a:hover {
    color: var(--background-body);
  }

  .wordmark {
    max-width: 10em;
    margin: 1em auto;
  }

  .about {
    margin: 3rem auto;
    margin-top: 0;
    text-align: center;
  }
</style>
