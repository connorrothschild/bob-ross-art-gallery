<script>
  export let selected;

  // Promise handling of images while new ones load
  const loadImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (err) => reject(err));
      img.src = url;
    });
</script>

<div class="frame">
  <img
    src={`./assets/paintings/${selected.img}`}
    alt="A painting titled {selected.painting_title}"
  />
</div>

<style lang="scss">
  img {
    aspect-ratio: 4/3;
    object-fit: cover;
    box-shadow: 1px 1px 10px 1px #cecece;
    border: 2px solid;
    border-bottom-color: #ffe;
    border-left-color: #eed;
    border-right-color: #eed;
    border-top-color: #ccb;
  }

  :global(.frame) {
    background-color: #ddc;
    border: solid 2.5vmin #eee;
    border-bottom-color: #fff;
    border-left-color: #eee;
    border-radius: 2px;
    border-right-color: #eee;
    border-top-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25) inset,
      0 3px 10px 3px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    display: inline-block;
    padding: 12px;
    position: relative;
    text-align: center;
    &:before {
      border-radius: 2px;
      bottom: -1vmin;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25) inset;
      content: "";
      left: -1vmin;
      position: absolute;
      right: -1vmin;
      top: -1vmin;
    }
    &:after {
      border-radius: 2px;
      bottom: -2.5vmin;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
      content: "";
      left: -2.5vmin;
      position: absolute;
      right: -2.5vmin;
      top: -2.5vmin;
    }
  }
</style>
