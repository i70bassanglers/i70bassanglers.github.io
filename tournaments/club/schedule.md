---
layout: layout.liquid
title: "Club Tournament Schedule"
description: "I-70 Bass Anglers club tournament schedule, results, and information."
---

### {{site.year}} Tournament Schedule

| Date | Lake | Results |
|------|------|------|
{%- for tournament in tournaments.tournaments %}
{%- case tournament.status %}
{%- when "scheduled" %}
| {{tournament.date}} | {{tournament.lake}} | TBD |
{%- when "rescheduled" %}
| ~~{{tournament.date}}~~ | ~~{{tournament.lake}}~~ | Rescheduled |
{%- when "complete" %}
{%- assign date_slug = tournament.date | replace: '/', '_' | downcase %}
| {{tournament.date}} | {{tournament.lake}} | [Results]({{ "/tournaments/club/results/" | append: date_slug | url }}) |
{%- endcase %}
{%- endfor %}

<!--#### [View the Tournament Highlights!](/tournaments/club/results/)-->
---