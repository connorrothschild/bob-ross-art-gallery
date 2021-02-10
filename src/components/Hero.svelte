<script>
  import copyData from "../data/copy.json";
</script>

<div class='hero-background'>
  <div class="hero">
    <h1 class="headline">{copyData.headline}</h1>
    <h2 class="subtitle">{copyData.subtitle}</h2>
    <h3>{@html copyData.attribution}</h3>
  </div>
</div>

<style>

  .hero-background {
    background: #1da1f290;
    background: linear-gradient(#1da1f290, white);
  }

  .hero {
    text-align: center;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin: 0 auto;
  }

  .headline {
    margin-top: 5rem;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 5rem;
  }

  .subtitle {
    font-size: 2.5rem;
    color: #353535;
  }
</style>
