<script>

  export let data;
  export let colors;

  // Promise handling of images while new ones load
  const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = url;
  });

</script>

<div class="card">
  {#await loadImage(data.img_src)}
    <img src="./assets/placeholder.png" alt="Placeholder image" />
  {:then}
  <a href={data.youtube_src} target="_blank" rel="noopener noreferrer">
    <img src={data.img_src} alt="A painting titled {data.painting_title}" />
  </a>
  {:catch error} 
    <div>{error.message}</div>
  {/await}
  <h1>{data.painting_title}</h1>
  <h3 style="margin-top: 0; font-weight: 300;">
    Season {data.season}, episode {data.episode}
  </h3>

  <div class="color-container">
    {#each colors as { color, hex, text_color }}
      <div style="background: {hex}; color: {text_color}" class="color-label">
        {color}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 750px;
    width: 750px;
    padding: 1rem;
    background: white;
    border-radius: 1rem;
    margin: 1rem;
    box-shadow: 1px 1px 10px 1px #cecece;

    @media screen and (max-width: 768px) {
      min-width: auto;
      min-height: auto;
      width: auto;
    }
  }

  .color-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .color-label {
    display: inline-block;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 1px #ccc;
    font-size: 0.9rem;
  }

  img {
    height: 332px;
    width: 444px;
    object-fit: cover;
  }
</style>
