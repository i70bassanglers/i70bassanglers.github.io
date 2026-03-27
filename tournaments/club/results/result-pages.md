---
pagination:
  data: results.byDate
  size: 1
  alias: dateEntry
permalink: "tournaments/club/results/{{ dateEntry.date | replace: '/', '_' | downcase }}/"
layout: layout.liquid
bodyClass: page-ct-results-detail
hideHeader: true
templateEngineOverride: liquid
eleventyComputed:
  title: "{{ dateEntry.formattedDate }} Results"
  description: "Tournament results from {{ dateEntry.formattedDate }}"
---

{%- assign t_info = false %}
{%- for t in tournaments.tournaments %}
  {%- if t.date == dateEntry.date %}
    {%- assign t_info = t %}
  {%- endif %}
{%- endfor %}

<section class="ct-hero ct-hero--sub">
  <div class="ct-hero-band">
    {% include "hero-nav.liquid" %}
    <div class="ct-hero-inner">
      <a href="/tournaments/club/results/" class="ct-hero-breadcrumb">&larr; Results</a>
      <p class="ct-hero-eyebrow">Club Tournaments &middot; {{ site.year }} Season</p>
      <h1 class="ct-hero-title">{{ dateEntry.formattedDate }}</h1>
      {%- if t_info %}<p class="ct-hero-sub">{{ t_info.lake }}</p>{%- endif %}
    </div>
  </div>
</section>

<div class="container">

  {%- if dateEntry.bigBass %}
  <div class="ct-bigbass-banner">
    <div>
      <p class="ct-bigbass-banner-label">Big Bass</p>
      <p class="ct-bigbass-banner-name">{{ dateEntry.bigBass.angler }}{%- if dateEntry.bigBass.coangler %} &amp; {{ dateEntry.bigBass.coangler }}{%- endif %}</p>
    </div>
    <span class="ct-bigbass-banner-weight">{{ dateEntry.bigBass.big_bass }} lbs</span>
  </div>
  {%- endif %}

  <div class="ct-results-table-wrap">
    <table class="ct-results-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Fish</th>
          <th>Weight</th>
          <th>Big Bass</th>
        </tr>
      </thead>
      <tbody>
        {%- for result in dateEntry.results %}
        <tr class="{%- if forloop.index == 1 %}ct-results-row--1st{%- endif %}">
          <td>
            {%- if forloop.index == 1 %}
            <span class="ct-rank-badge ct-rank-badge--1">1</span>
            {%- elsif forloop.index == 2 %}
            <span class="ct-rank-badge ct-rank-badge--2">2</span>
            {%- elsif forloop.index == 3 %}
            <span class="ct-rank-badge ct-rank-badge--3">3</span>
            {%- else %}
            {{ forloop.index }}
            {%- endif %}
          </td>
          <td>
            <span>{{ result.angler }}</span>
            {%- if result.coangler %}<span class="ct-team-coangler">&amp; {{ result.coangler }}</span>{%- endif %}
          </td>
          <td>{{ result.count }}</td>
          <td>{%- if result.weight > 0 %}{{ result.weight }} lbs{%- else %}&mdash;{%- endif %}</td>
          <td>{%- if result.big_bass %}{{ result.big_bass }} lbs{%- else %}&mdash;{%- endif %}</td>
        </tr>
        {%- endfor %}
      </tbody>
    </table>
  </div>

  <a href="/tournaments/club/results/" class="ct-results-back">&larr; Back to Results</a>

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
