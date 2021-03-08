library(tidyverse)

paintings <- readr::read_csv(here::here('src/data/bob_ross_paintings.csv'))

paintings <- paintings %>%
  group_by(num_colors) %>%
  mutate(yPos = row_number()) %>%
  ungroup()

paintings[1:400,]$gridY <- rep(20:1, each = 20, length.out = 400)
paintings[1:400,]$gridX <- rep(1:20, length.out = 400)
paintings[401:403,]$gridY <- 21
paintings[401:403,]$gridX <- c(1,2,3)

readr::write_csv(paintings, here::here('src/data/bob_ross_paintings.csv'))

long <- paintings %>%
  mutate(colors = str_replace_all(colors, '\\[|\\]', ''),
         colors = str_replace_all(colors, "'", ''),
         color_hex = str_replace_all(color_hex, '\\[|\\]', ''),
         color_hex = str_replace_all(color_hex, "'", '')
  ) %>%
  mutate(colors = strsplit(colors, ','),
         color_hex = strsplit(color_hex, ',')) %>%
  unnest(c(colors, color_hex))

readr::write_csv(long, here::here('src/data/colors_long.csv'))

counts <- paintings %>%
  count(colors, sort = T) %>%
  mutate(colors = fct_reorder(colors, n))

readr::write_csv(counts, here::here('src/data/colors_counts.csv'))
