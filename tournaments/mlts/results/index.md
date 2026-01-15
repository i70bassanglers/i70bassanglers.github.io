---
layout: layout.liquid
title: "MLTS Tournament Results"
description: "Milford Lake Team Series tournament results."
---

{%- for dateEntry in mlts_results.byDate %}
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

{% if mlts_tournaments.next %}
## Future Tournaments...
This page will be updated as the season progresses.  
Come back to see future tournament results!  

Our next tournament will be held {{ mlts_tournaments.next.formattedDate }} at {{ mlts_tournaments.next.location }}.
{% endif %}
