library(tidyverse)

df <- readr::read_csv(here::here('src/data/bob_ross_paintings.csv'))

long <- df %>%
  mutate(colors = str_replace_all(colors, '\\[|\\]', ''),
         colors = str_replace_all(colors, "'", ''),
         color_hex = str_replace_all(color_hex, '\\[|\\]', ''),
         color_hex = str_replace_all(color_hex, "'", '')
  ) %>%
  mutate(colors = strsplit(colors, ','),
         color_hex = strsplit(color_hex, ',')) %>%
  unnest(c(colors, color_hex))

readr::write_csv(long, here::here('src/data/colors_long.csv'))
