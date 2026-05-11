---
layout: layout.liquid
description: "Milford Lake Team Series team standings for the 2026 season."
bodyClass: page-mlts-standings
hideHeader: true
templateEngineOverride: liquid
---

<section class="ct-hero ct-hero--sub">
  <div class="ct-hero-band">
    {% include "hero-nav.liquid" %}
    <div class="ct-hero-inner">
      <a href="/tournaments/mlts/" class="ct-hero-breadcrumb">&larr; MLTS</a>
      <p class="ct-hero-eyebrow">{{ site.year }} Season</p>
      <h1 class="ct-hero-title">Team Standings</h1>
      <p class="ct-hero-sub">Team of the Year &mdash; $500 awarded to the top team at season end.</p>
    </div>
  </div>
</section>

<div class="container">

  {%- if mlts_results.standings.size == 0 %}

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Season</span></div>
  <div class="ct-empty-state">
    <p>The {{ site.year }} MLTS season is just getting started! Team standings will be updated after the first tournament.</p>
    {%- if mlts_tournaments.next %}
    <p>Our next tournament: <strong>{{ mlts_tournaments.next.formattedDate }}</strong> at Milford Lake.</p>
    {%- endif %}
  </div>

  {%- else %}

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Team Standings</span></div>

  <div class="ct-standings-section">
    <p class="ct-standings-intro">Best {{ site.mlts_scoring.best_tournaments_count }} of {{ mlts_results.byDate.size }} tournaments count. Dropped scores are shown in grey.</p>
    <div class="standings-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            {%- for dateEntry in mlts_results.byDate %}
            <th>{{ dateEntry.formattedDate }}</th>
            {%- endfor %}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {%- for team in mlts_results.standings %}
          <tr>
            <td>{{ forloop.index }}</td>
            <td>{{ team.angler1 }} <span class="ct-mlts-angler2">&amp; {{ team.angler2 }}</span></td>
            {%- for dateEntry in mlts_results.byDate %}
              {%- assign entry = false %}
              {%- for t in team.tournaments %}
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
            <td class="total-pts">{{ team.totalPoints }}</td>
          </tr>
          {%- endfor %}
        </tbody>
      </table>
    </div>
  </div>

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
