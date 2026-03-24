---
layout: layout.liquid
title: "Club Member Standings"
description: "I-70 Bass Anglers club tournament standings for the current season."
---

### {{ site.year }} Member Standings

{% if results.standings.anglers.size == 0 %}
The {{ site.year }} season is just getting started! Standings will be updated after the first club tournament.
{% else %}

<p><em>Only the best {{ site.scoring.best_tournaments_count }} tournament scores count toward standings. Dropped scores are shown in grey.</em></p>

---

#### Angler of the Year Standings

<div class="standings-table">
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Angler</th>
      {%- for dateEntry in results.byDate %}
      <th>{{ dateEntry.formattedDate }}</th>
      {%- endfor %}
      <th>Meetings</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {%- for angler in results.standings.anglers %}
    <tr>
      <td>{{ forloop.index }}</td>
      <td>{{ angler.name }}</td>
      {%- for dateEntry in results.byDate %}
        {%- assign entry = null %}
        {%- for t in angler.tournaments %}
          {%- if t.date == dateEntry.date %}
            {%- assign entry = t %}
          {%- endif %}
        {%- endfor %}
        {%- if entry %}
          <td class="{% unless entry.counted %}dropped{% endunless %}">{{ entry.points }}</td>
        {%- else %}
          <td>—</td>
        {%- endif %}
      {%- endfor %}
      <td>{{ angler.meetingPoints }}</td>
      <td class="total-pts">{{ angler.totalPoints }}</td>
    </tr>
    {%- endfor %}
  </tbody>
</table>
</div>

---

#### Co-Angler of the Year Standings

{% if results.standings.coAnglers.size == 0 %}
No co-angler data yet.
{% else %}
<div class="standings-table">
<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Co-Angler</th>
      {%- for dateEntry in results.byDate %}
      <th>{{ dateEntry.formattedDate }}</th>
      {%- endfor %}
      <th>Meetings</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {%- for coangler in results.standings.coAnglers %}
    <tr>
      <td>{{ forloop.index }}</td>
      <td>{{ coangler.name }}</td>
      {%- for dateEntry in results.byDate %}
        {%- assign entry = null %}
        {%- for t in coangler.tournaments %}
          {%- if t.date == dateEntry.date %}
            {%- assign entry = t %}
          {%- endif %}
        {%- endfor %}
        {%- if entry %}
          <td class="{% unless entry.counted %}dropped{% endunless %}">{{ entry.points }}</td>
        {%- else %}
          <td>—</td>
        {%- endif %}
      {%- endfor %}
      <td>{{ coangler.meetingPoints }}</td>
      <td class="total-pts">{{ coangler.totalPoints }}</td>
    </tr>
    {%- endfor %}
  </tbody>
</table>
</div>
{% endif %}

{% endif %}
