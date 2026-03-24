---
pagination:
  data: results.byDate
  size: 1
  alias: dateEntry
permalink: "tournaments/club/results/{{ dateEntry.date | replace: '/', '_' | downcase }}/"
layout: layout.liquid
eleventyComputed:
  title: "{{ dateEntry.formattedDate }} Results"
  description: "Tournament results from {{ dateEntry.formattedDate }}"
---

## {{ dateEntry.formattedDate }}

| Team | Fish Weighed | Weight | Big Bass |
|------|--------------|--------|----------|
{%- for result in dateEntry.results %}
| {{ result.angler }}{%- if result.coangler %} & {{ result.coangler }}{%- endif %} | {{ result.count }} | {{ result.weight }}lbs | {%- if result.big_bass %} {{ result.big_bass }}lbs {%- else %} - {%- endif %} |
{%- endfor %}

### Big Bass Winner
#### {{ dateEntry.bigBass.angler }}{%- if dateEntry.bigBass.coangler %} & {{ dateEntry.bigBass.coangler }}{%- endif %}
**{{ dateEntry.bigBass.big_bass }}lbs**


