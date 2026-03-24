---
layout: layout.liquid
title: "Club Tournament Schedule"
description: "I-70 Bass Anglers club tournament schedule, results, and information."
---

### {{site.year}} Tournament Schedule

| Date | Lake | |
|------|------|------|
{%- for tournament in tournaments.tournaments %}
{%- case tournament.status %}
{%- when "rescheduled" %}
| ~~{{tournament.date}}~~ | ~~{{tournament.lake}}~~ | Rescheduled |
{%- else %}
| {{tournament.date}} | {{tournament.lake}} | {% if tournament.hasResults %}[Results](/tournaments/club/results/{{ tournament.slug }}/){% endif %} |
{%- endcase %}
{%- endfor %}

<!--#### [View the Tournament Highlights!](/tournaments/club/results/)-->
---
