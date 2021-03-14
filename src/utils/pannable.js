/* I took this from https://svelte.dev/tutorial/actions 
And adapted it to include touch events */
export function pannable(node) {
  let x;
  let y;
  let dx;
  let dy;

  function handleMousedown(event) {
    // if (event.type == "touchmove") {
    //   x = event.touches[0].clientX;
    //   y = event.touches[0].clientY;
    // } else {
      x = event.clientX;
      y = event.clientY;
    // }

    node.dispatchEvent(
      new CustomEvent("panstart", {
        detail: { x, y },
      })
    );

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
    // window.addEventListener("touchmove", handleMousemove);
    // window.addEventListener("touchend", handleMouseup);
    // window.addEventListener("touchcancel", handleMouseup);
  }

  function handleMousemove(event) {
    // if (event.type == "touchmove") {
    //   dx = event.touches[0].clientX - x;
    //   dy = event.touches[0].clientY - y;

    //   x = event.touches[0].clientX;
    //   y = event.touches[0].clientY;
    // } else {
      dx = event.clientX - x;
      dy = event.clientY - y;

      x = event.clientX;
      y = event.clientY;
    // }

    node.dispatchEvent(
      new CustomEvent("panmove", {
        detail: { x, y, dx, dy },
      })
    );
  }

  function handleMouseup(event) {
    // if (event.type == "touchmove") {
    //   x = event.touches[0].clientX;
    //   y = event.touches[0].clientY;
    // } else {
      x = event.clientX;
      y = event.clientY;
    // }

    node.dispatchEvent(
      new CustomEvent("panend", {
        detail: { x, y },
      })
    );

    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("mouseup", handleMouseup);
    // window.addEventListener("touchmove", handleMousemove);
    // window.addEventListener("touchend", handleMouseup);
    // window.addEventListener("touchcancel", handleMouseup);
  }

  node.addEventListener("mousedown", handleMousedown);
  // node.addEventListener("touchstart", handleMousedown);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
      // node.removeEventListener("touchstart", handleMousedown);
    },
  };
}
