---
layout: layout.liquid
title: "Club Tournament Results"
description: "I-70 Bass Anglers club tournament schedule, results, and information."
---

{%- for dateEntry in results.byDate %}
## {{ dateEntry.formattedDate }}
**Top 3**  
{%- for result in dateEntry.results limit:3 %}
{{ forloop.index }}. {{ result.angler }}{% if result.coangler %} & {{ result.coangler }}{% endif %} - {{ result.count }} fish, {{ result.weight }}lbs
{%- endfor %}

**Big Bass**  
{{ dateEntry.bigBass.angler }}{% if dateEntry.bigBass.coangler %} & {{ dateEntry.bigBass.coangler }}{% endif %} - {{ dateEntry.bigBass.big_bass }}lbs

{%- assign date_slug = dateEntry.date | replace: '/', '_' | downcase %}

**[Full Results]({{ date_slug }})**

{%- endfor %}

## Future Tournaments...
This page will be updated as the season progresses.  
Come back to see future tournament results!   

  
{% if tournaments.next %}
Our next tournament will be held {{ tournaments.next.formattedDate }} at {{ tournaments.next.lake }}.
{% endif %}
