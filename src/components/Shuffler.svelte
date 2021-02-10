<script>
  import Card from "./Card.svelte";

  export let data;

  const LENGTH = data.length;

  let selected = [];
  let ind = 0;
  let length = 0;
  let colors = [];

  function getTextColor(bgColor) {
  if (!bgColor) { return ''; }
      return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
  }

  function selectRandom() {
    ind = Math.floor(Math.random() * LENGTH)
  }

  $: {
    selected = data[ind];
    length = eval(selected.colors).length;
    colors = [];
        
    for (let i = 0; i < length; i++) {
      colors[i] = {color: eval(selected.colors)[i], hex: eval(selected.color_hex)[i]}
    }
    
    colors.forEach(function(d) {
      d.text_color = getTextColor(d.hex)
    })
  }

</script>

<div class="button-container">
  <button on:click={selectRandom}>Show Another!</button>
</div>
<Card data="{selected}" colors="{colors}" />

<style>
  .button-container {
    text-align: center;
    margin-bottom: 1rem;
  }
</style>
