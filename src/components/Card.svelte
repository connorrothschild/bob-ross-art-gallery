<script>
import { fade } from "svelte/transition";

export let data;
export let colors;
</script>

<div class='card'>
    <a href="{data.youtube_src}" target="_blank" rel="noopener noreferrer">
        <img src="{data.img_src}" alt="A painting titled {data.painting_title}"/>
    </a>
    <h1>{data.painting_title}</h1>
    <h3 style="margin-top: 0">Season {data.season}, episode {data.episode}</h3>

    <div class='color-container'>
        {#each colors as { color, hex, text_color }}
            <div style="background: {hex}; color: {text_color}" class="color-label" transition:fade> {color} </div>
        {/each}
    </div>    

    <!-- {#each colors as { color, hex, text_color }}
	<div> 
        <span style="text-decoration: underline; text-decoration-color: {hex};">{color}</span>
        <svg width="10" height="10">
            <circle cx="50%" cy="50%" r="5" fill="{hex}"/>
        </svg>
    </div>
	{/each} -->
</div>

<style>

.card {
   display:flex;
   flex-direction: column;
   align-items: center;
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
    font-size: .9rem;
}
</style>