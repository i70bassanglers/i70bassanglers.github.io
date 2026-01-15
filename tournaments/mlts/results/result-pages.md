---
pagination:
  data: mlts_results.byDate
  size: 1
  alias: dateEntry
permalink: "tournaments/mlts/results/{{ dateEntry.date | replace: '/', '_' | downcase }}/"
layout: layout.liquid
eleventyComputed:
  title: "{{ dateEntry.formattedDate }} Results"
  description: "MLTS tournament results from {{ dateEntry.formattedDate }}"
---

## {{ dateEntry.formattedDate }}

| Team | Fish Weighed | Weight | Big Bass |
|------|--------------|--------|----------|
{%- for result in dateEntry.results %}
| {{ result.angler }}{% if result.coangler %} & {{ result.coangler }}{% endif %} | {{ result.count }} | {{ result.weight }}lbs | {{ result.big_bass }}lbs |
{%- endfor %}

### Big Bass Winner
#### {{ dateEntry.bigBass.angler }}{% if dateEntry.bigBass.coangler %} & {{ dateEntry.bigBass.coangler }}{% endif %}
**{{ dateEntry.bigBass.big_bass }}lbs**
