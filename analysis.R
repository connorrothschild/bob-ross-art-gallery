library(tidyverse)

reg <- readr::read_csv(here::here('src/data/bob_ross_paintings.csv'))
long <- readr::read_csv(here::here('src/data/colors_long.csv'))

long %>%
  count(colors, color_hex) %>%
  arrange(desc(n))

long %>%
  count(painting_index) %>%
  arrange(desc(n))

long %>%
  ggplot(aes(x = painting_index, y = num_colors)) +
  geom_point() +
  geom_smooth()

# long %>%
#   ggplot(aes(x = painting_index, y = colors)) +
#   geom_point(aes(color = color_hex)) +
#   scale_color_manual(values = unique(df$color_hex))

long %>%
  count(colors, sort = T) %>%
  mutate(colors = fct_reorder(colors, n)) %>%
  ggplot(aes(x = colors, y = n)) +
  geom_col() +
  coord_flip()

reg %>%
  ggplot(aes(x = num_colors)) +
  geom_histogram(binwidth = 1)

## CREATE YOUR OWN HISTOGRAM!
reg %>%
  group_by(painting_index, num_colors) %>%
  mutate(yPos = row_number()) %>%
  ungroup() %>%
  ggplot(aes(x = num_colors, y = yPos)) +
  geom_col()
