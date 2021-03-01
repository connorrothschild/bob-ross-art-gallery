export function processData(data, long = false) {
  if (long) {
    data.forEach(function (d) {
      (d.num_colors = +d.num_colors),
        (d.episode = +d.episode),
        (d.season = +d.season),
        (d.yPos = +d.yPos),
        (d.painting_index = +d.painting_index);
    });
  } else {
    data.forEach(function (d) {
      (d.num_colors = +d.num_colors),
        (d.episode = +d.episode),
        (d.season = +d.season),
        (d.painting_index = +d.painting_index),
        (d.colors = eval(d.colors)),
        (d.yPos = +d.yPos),
        (d.color_hex = eval(d.color_hex));
    });
  }

  return data;
}
