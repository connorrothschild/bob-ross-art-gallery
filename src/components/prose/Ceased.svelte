<script>
  import { desisted } from "../../stores/global.js";

  let lol = 0;

  const increment = () => {
    lol++;
    hahaha(lol);
  };

  const hahaha = () => {
    if (lol == 5) {
      console.log("🎉 You found the easter egg 🥚");
      desisted.set(false);
    }
  };
</script>

<div class="hero-background">
  <div class="hero">
    <h1 class="headline">
      The <span class="easter" on:click={increment}>Bob Ross</span> Virtual Art Gallery
    </h1>
    <h2 class="subtitle">
      has been retired due to a cease and desist from Bob Ross, Inc. 😢
    </h2>
    <h2 class="twitter">
      Get a glimpse of what this project looked like on <a
        href="https://twitter.com/CL_Rothschild/status/1374067874759802882"
        >Twitter</a
      >.
    </h2>
    <h3>
      By <a href="https://twitter.com/CL_Rothschild">Connor Rothschild</a>
    </h3>
  </div>
</div>

<style>
  .hero-background {
    background: #1da1f290;
    background: linear-gradient(#1da1f290, var(--background));
  }

  .hero {
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 0.5rem;
  }

  .headline {
    margin-top: 12rem;
    text-transform: uppercase;
    font-weight: 900;
    font-size: clamp(1vw, 5rem, 12vw);
    padding: 0 1rem;
    color: white;
    line-height: 1.1;
    text-shadow: 1px 1px 6px black;
  }

  .subtitle {
    font-size: clamp(1vw, 2rem, 5vw);
    color: black;
    font-weight: 300;
  }

  .twitter {
    font-size: 1.5rem;
    color: black;
    font-weight: 300;
  }

  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
  }

  .easter {
    cursor: pointer;
  }
</style>
