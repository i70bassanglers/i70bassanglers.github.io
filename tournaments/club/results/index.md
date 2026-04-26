---
layout: layout.liquid
title: "Club Tournament Results"
description: "I-70 Bass Anglers club tournament results for the 2026 season."
bodyClass: page-ct-results
hideHeader: true
templateEngineOverride: liquid
---

<section class="ct-hero ct-hero--sub">
  <div class="ct-hero-band">
    {% include "hero-nav.liquid" %}
    <div class="ct-hero-inner">
      <a href="/tournaments/club/" class="ct-hero-breadcrumb">&larr; Club Tournaments</a>
      <p class="ct-hero-eyebrow">{{ site.year }} Season</p>
      <h1 class="ct-hero-title">Tournament Results</h1>
      <p class="ct-hero-sub">Results posted after each event &mdash; top finishers, Big Bass, and full breakdowns.</p>
    </div>
  </div>
</section>

<div class="container">

  {%- if results.byDate.size == 0 %}

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Season</span></div>
  <div class="ct-empty-state">
    <p>The {{ site.year }} season is just getting started. Results will appear here after each tournament.</p>
    {%- if tournaments.next %}
    <p>Our next tournament: <strong>{{ tournaments.next.formattedDate }}</strong> at {{ tournaments.next.lake }}.</p>
    {%- endif %}
  </div>

  {%- else %}

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Season Results</span></div>

  <div class="ct-results-list">
    {%- for dateEntry in results.byDate reversed %}
    {%- assign date_slug = dateEntry.date | replace: '/', '_' | downcase %}
    {%- assign t_info = false %}
    {%- for t in tournaments.tournaments %}
      {%- if t.date == dateEntry.date %}
        {%- assign t_info = t %}
      {%- endif %}
    {%- endfor %}
    <div class="ct-result-card">
      <div class="ct-result-card-header">
        <div>
          <span class="ct-result-card-date">{{ dateEntry.formattedDate }}</span>
          {%- if t_info %}<span class="ct-result-card-lake">&middot; {{ t_info.lake }}</span>{%- endif %}
        </div>
        <a href="/tournaments/club/results/{{ date_slug }}/" class="ct-result-card-link">Full Results &rarr;</a>
      </div>
      <div class="ct-result-card-body">
        <div class="ct-podium">
          {%- for result in dateEntry.results limit:3 %}
          <div class="ct-podium-item">
            <span class="ct-podium-rank ct-podium-rank--{{ forloop.index }}">{{ forloop.index }}</span>
            <span class="ct-podium-name">{{ result.angler }}{%- if result.coangler %} &amp; {{ result.coangler }}{%- endif %}</span>
            <span class="ct-podium-detail">{{ result.fish }} fish &middot; {{ result.final_weight }} lbs</span>
          </div>
          {%- endfor %}
        </div>
        {%- if dateEntry.bigBass %}
        <div class="ct-bigbass-pill">
          <span class="ct-bigbass-pill-label">Big Bass</span>
          <span class="ct-bigbass-pill-weight">{{ dateEntry.bigBass.big_bass }} lbs</span>
          <span class="ct-bigbass-pill-angler">{{ dateEntry.bigBass.angler }}{%- if dateEntry.bigBass.coangler %} &amp; {{ dateEntry.bigBass.coangler }}{%- endif %}</span>
        </div>
        {%- endif %}
      </div>
    </div>
    {%- endfor %}
  </div>

  {%- if tournaments.next %}
  <div class="ct-bridge"><span class="ct-bridge-label">Coming Up</span></div>
  <section class="ct-next-bar">
    <a href="/tournaments/club/upcoming/" class="ct-next-cell">
      <p class="ct-event-label">Next Tournament</p>
      <p class="ct-event-date">{{ tournaments.next.formattedDate }}</p>
      <p class="ct-event-sub">{{ tournaments.next.lake }}</p>
      <span class="ct-event-arrow">Details &amp; Directions &rarr;</span>
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
