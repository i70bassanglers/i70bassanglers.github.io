---
layout: layout.liquid
title: "Club Member Standings"
description: "I-70 Bass Anglers club tournament standings for the 2026 season."
bodyClass: page-ct-standings
hideHeader: true
templateEngineOverride: liquid
---

<section class="ct-hero ct-hero--sub">
  <div class="ct-hero-band">
    {% include "hero-nav.liquid" %}
    <div class="ct-hero-inner">
      <a href="/tournaments/club/" class="ct-hero-breadcrumb">&larr; Club Tournaments</a>
      <p class="ct-hero-eyebrow">{{ site.year }} Season</p>
      <h1 class="ct-hero-title">Season Standings</h1>
      <p class="ct-hero-sub">Angler &amp; Co-Angler of the Year &mdash; best {{ site.scoring.best_tournaments_count }} of 8 tournaments count.</p>
    </div>
  </div>
</section>

<div class="container">

  {%- if results.standings.anglers.size == 0 %}

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Season</span></div>
  <div class="ct-empty-state">
    <p>The {{ site.year }} season is just getting started! Standings will be updated after the first club tournament.</p>
    {%- if tournaments.next %}
    <p>Our next tournament: <strong>{{ tournaments.next.formattedDate }}</strong> at {{ tournaments.next.lake }}.</p>
    {%- endif %}
  </div>

  {%- else %}

  <div class="ct-bridge"><span class="ct-bridge-label">Angler of the Year</span></div>

  <div class="ct-standings-section">
    <p class="ct-standings-intro">Only the best {{ site.scoring.best_tournaments_count }} tournament scores count. Dropped scores are shown in grey.</p>
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
              {%- assign entry = false %}
              {%- for t in angler.tournaments %}
                {%- if t.date == dateEntry.date %}
                  {%- assign entry = t %}
                {%- endif %}
              {%- endfor %}
              {%- if entry %}
                <td class="{% unless entry.counted %}dropped{% endunless %}">{{ entry.points }}</td>
              {%- else %}
                <td>&mdash;</td>
              {%- endif %}
            {%- endfor %}
            <td>{{ angler.meetingPoints }}</td>
            <td class="total-pts">{{ angler.totalPoints }}</td>
          </tr>
          {%- endfor %}
        </tbody>
      </table>
    </div>
  </div>

  {%- if results.standings.coAnglers.size > 0 %}

  <div class="ct-bridge"><span class="ct-bridge-label">Co-Angler of the Year</span></div>

  <div class="ct-standings-section">
    <p class="ct-standings-intro">Only the best {{ site.scoring.best_tournaments_count }} tournament scores count. Dropped scores are shown in grey.</p>
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
              {%- assign entry = false %}
              {%- for t in coangler.tournaments %}
                {%- if t.date == dateEntry.date %}
                  {%- assign entry = t %}
                {%- endif %}
              {%- endfor %}
              {%- if entry %}
                <td class="{% unless entry.counted %}dropped{% endunless %}">{{ entry.points }}</td>
              {%- else %}
                <td>&mdash;</td>
              {%- endif %}
            {%- endfor %}
            <td>{{ coangler.meetingPoints }}</td>
            <td class="total-pts">{{ coangler.totalPoints }}</td>
          </tr>
          {%- endfor %}
        </tbody>
      </table>
    </div>
  </div>

  {%- endif %}

  {%- endif %}

</div>

<section class="home-footer">
  <div class="home-footer-inner">
    <div class="home-footer-brand">
      <p class="home-footer-name">I-70 Bass Anglers</p>
      <p class="home-footer-tagline">Northeast Kansas &middot; I-70 Corridor</p>
    </div>
    <div class="home-footer-contact">
      <a href="mailto:{{ contact.club.email }}">{{ contact.club.email }}</a>
      <span class="home-footer-sep">&middot;</span>
      <a href="https://facebook.com/I70.Bass.Anglers">Facebook</a>
    </div>
    <p class="home-footer-copy">&copy; {{ site.year }} I-70 Bass Anglers. All rights reserved.</p>
  </div>
</section>
