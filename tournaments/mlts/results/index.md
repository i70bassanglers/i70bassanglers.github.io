---
layout: layout.liquid
title: "MLTS Tournament Results"
description: "Milford Lake Team Series tournament results for the 2026 season."
bodyClass: page-mlts-results
hideHeader: true
templateEngineOverride: liquid
---

<section class="ct-hero ct-hero--sub">
  <div class="ct-hero-band">
    {% include "hero-nav.liquid" %}
    <div class="ct-hero-inner">
      <a href="/tournaments/mlts/" class="ct-hero-breadcrumb">&larr; MLTS</a>
      <p class="ct-hero-eyebrow">{{ site.year }} Season</p>
      <h1 class="ct-hero-title">Tournament Results</h1>
      <p class="ct-hero-sub">Results posted after each event &mdash; top teams, Big Bass, and full breakdowns.</p>
    </div>
  </div>
</section>

<div class="container">

  {%- if mlts_results.byDate.size == 0 %}

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Season</span></div>
  <div class="ct-empty-state">
    <p>The {{ site.year }} MLTS season is just getting started. Results will appear here after each tournament.</p>
    {%- if mlts_tournaments.next %}
    <p>Our next tournament: <strong>{{ mlts_tournaments.next.formattedDate }}</strong> at Milford Lake.</p>
    {%- endif %}
  </div>

  {%- else %}

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Season Results</span></div>

  <div class="ct-results-list">
    {%- for dateEntry in mlts_results.byDate reversed %}
    {%- assign date_slug = dateEntry.date | replace: '/', '_' | downcase %}
    <div class="ct-result-card">
      <div class="ct-result-card-header">
        <div>
          <span class="ct-result-card-date">{{ dateEntry.formattedDate }}</span>
          <span class="ct-result-card-lake">&middot; Milford Lake</span>
        </div>
        <a href="/tournaments/mlts/results/{{ date_slug }}/" class="ct-result-card-link">Full Results &rarr;</a>
      </div>
      <div class="ct-result-card-body">
        <div class="ct-podium">
          {%- for result in dateEntry.results limit:3 %}
          <div class="ct-podium-item">
            <span class="ct-podium-rank ct-podium-rank--{{ forloop.index }}">{{ forloop.index }}</span>
            <span class="ct-podium-name">{%- if result.alt1 %}{{ result.alt1 }}{%- else %}{{ result.angler1 }}{%- endif %} &amp; {% if result.alt2 %}{{ result.alt2 }}{% else %}{{ result.angler2 }}{% endif %}</span>
            {%- if result.alt1 or result.alt2 %}<span class="ct-podium-alt">{%- if result.alt1 %}{{ result.alt1 }} alt. for {{ result.angler1 }}{%- endif %}{%- if result.alt1 and result.alt2 %} &middot; {%- endif %}{%- if result.alt2 %}{{ result.alt2 }} alt. for {{ result.angler2 }}{%- endif %}</span>{%- endif %}
            <span class="ct-podium-detail">{%- if result.fish %}{{ result.fish }} fish &middot; {%- endif %}{{ result.final_weight }} lbs</span>
          </div>
          {%- endfor %}
        </div>
        {%- if dateEntry.bigBass %}
        <div class="ct-bigbass-pill">
          <span class="ct-bigbass-pill-label">Big Bass</span>
          <span class="ct-bigbass-pill-weight">{{ dateEntry.bigBass.big_bass }} lbs</span>
          <span class="ct-bigbass-pill-angler">{%- if dateEntry.bigBass.alt1 %}{{ dateEntry.bigBass.alt1 }}{%- else %}{{ dateEntry.bigBass.angler1 }}{%- endif %} &amp; {% if dateEntry.bigBass.alt2 %}{{ dateEntry.bigBass.alt2 }}{% else %}{{ dateEntry.bigBass.angler2 }}{% endif %}</span>
        </div>
        {%- endif %}
      </div>
    </div>
    {%- endfor %}
  </div>

  {%- if mlts_tournaments.next %}
  <div class="ct-bridge"><span class="ct-bridge-label">Coming Up</span></div>
  <section class="ct-next-bar">
    <a href="/tournaments/mlts/upcoming/" class="ct-next-cell">
      <p class="ct-event-label">Next Tournament</p>
      <p class="ct-event-date">{{ mlts_tournaments.next.formattedDate }}</p>
      <p class="ct-event-sub">Milford Lake</p>
      <span class="ct-event-arrow">Details &amp; Registration &rarr;</span>
    </a>
  </section>
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
