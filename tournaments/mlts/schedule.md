---
layout: layout.liquid
title: "MLTS Tournament Schedule"
description: "Milford Lake Team Series tournament schedule, results, and information."
---

### {{site.year}} Tournament Schedule
All tournaments are held at Milford Lake.

| Date | Results |
|------|------|
{%- for tournament in mlts_tournaments.tournaments %}
{%- case tournament.status %}
{%- when "scheduled" %}
| {{tournament.date}} | TBD |
{%- when "rescheduled" %}
| ~~{{tournament.date}}~~ | Rescheduled |
{%- when "complete" %}
{%- assign date_slug = tournament.date | replace: '/', '_' | downcase %}
| {{tournament.date}} | [Results]({{ "/tournaments/mlts/results/" | append: date_slug | url }}) |
{%- endcase %}
{%- endfor %}

<!--#### [View the Tournament Highlights!](/tournaments/mlts/results/)-->
---