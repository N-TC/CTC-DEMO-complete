# Product Box Documentation

- Product Box
  - Horizontal layout by default
  - Input:
    - Category (required)
      - hidden in interface
      - used to determine category filters
    - Image (required)
    - Description (required)
      - gets truncated if it overflows the space
    - Product Code (required)
    - Price Box (required)
      - broken into two sizes in any order:
        - full height (default)
        - superscript
      - variations (none by default)
        - Sale
          - Subtext, eg. "Save $2 LB" (required)
        - Multi Buy
          - Subtext, eg. "less than $4.79 ea" (required)
        – Local
        - Canada
        - Generic
          - Text, eg. "Now Available" (required)
    - Add to List button
      - sends a request to Loblaws API when clicked
    - Badges (optional):
      - Points Badge
        - Points (required)
      - Logo Badge
        - Type of Logo (required)

- Vertical Product Box
  - all attributes same as default Product box **except the following**:
    - Badges:
      - placement unspecified
      
- Must Buy Product Box
  - all attributes same as default Product box **except the following**:
      - Badges:
        - placement unspecified
      - Price Box Variations:
        - design unspecified (background colour conflicts)

- Video Product Box
  - Title (required)
  - Subtitle (required)
  - Video Path (required)
    - video should not be letterboxed. Current videos are.
  - Thumbnail image path
    - displayed until user clicks "play", then video loads

- Recipe Product Box
  - Title (required)
  - *Recipe requirements outstanding*

- Double Product Box
  - Price Box and variations same as default Product Box (required)
  - Description (required)
  - Product Code (required)
  - Image or Video (required)
    - fills entire background
    - if video, autoplays and loops

- Promotional Product Box
  - TBD