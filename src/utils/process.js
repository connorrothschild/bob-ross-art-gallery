export function processData(data, long = false) {
  if (long) {
    data.forEach(function (d) {
      (d.num_colors = +d.num_colors),
        (d.episode = +d.episode),
        (d.season = +d.season),
        (d.yPos = +d.yPos),
        (d.gridX = +d.gridX),
        (d.gridY = +d.gridY),
        (d.painting_index = +d.painting_index);
    });
  } else {
    var eval2 = eval;
    data.forEach(function (d) {
      (d.num_colors = +d.num_colors),
        (d.episode = +d.episode),
        (d.season = +d.season),
        (d.painting_index = +d.painting_index),
        (d.colors = eval2(d.colors)),
        (d.yPos = +d.yPos),
        (d.gridX = +d.gridX),
        (d.gridY = +d.gridY),
        (d.color_hex = eval2(d.color_hex));
    });
  }

  return data;
}

export function getTextColor(bgColor) {
  // Handle red which should spit out white but this function doesn't handle well
  if (bgColor == "#DB0000") {
    return "#FFFFFF";
  }
  if (!bgColor) {
    return "";
  }
  return parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 1.5
    ? "#000000"
    : "#FFFFFF";
}
