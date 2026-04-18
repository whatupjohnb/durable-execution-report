# Hero Textures

The hero composites two texture layers on top of the gradient. Drop the
PNG files here with these exact names:

- `noise.png` — the worn, distressed base texture.
  Applied full-cover with `mix-blend-mode: soft-light` at 35% opacity.
  Any image that reads as organic grain will work; the blend mode does
  the heavy lifting. A ~2000×2000 px PNG is plenty.

- `shape.png` — the larger radial/organic "Shape" graphic.
  Applied at 5% opacity, contained, scaled up 15% past each edge so it
  bleeds out of the frame. The alpha-transparent cutout reads best; a
  high-res PNG (2000×2000+) keeps the edges crisp when scaled.

If either file is missing the hero still renders — the gradient shows
through cleanly.
