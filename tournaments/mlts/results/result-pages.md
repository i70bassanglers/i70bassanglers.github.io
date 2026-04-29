---
pagination:
  data: mlts_results.byDate
  size: 1
  alias: dateEntry
permalink: "tournaments/mlts/results/{{ dateEntry.date | replace: '/', '_' | downcase }}/"
layout: layout.liquid
bodyClass: page-mlts-results-detail
hideHeader: true
templateEngineOverride: liquid
eleventyComputed:
  title: "{{ dateEntry.formattedDate }} MLTS Results"
  description: "MLTS tournament results from {{ dateEntry.formattedDate }}"
---

<section class="ct-hero ct-hero--sub">
  <div class="ct-hero-band">
    {% include "hero-nav.liquid" %}
    <div class="ct-hero-inner">
      <a href="/tournaments/mlts/results/" class="ct-hero-breadcrumb">&larr; MLTS Results</a>
      <p class="ct-hero-eyebrow">MLTS &middot; Milford Lake</p>
      <h1 class="ct-hero-title">{{ dateEntry.formattedDate }}</h1>
      <p class="ct-hero-sub">Tournament results &mdash; teams, weights, and Big Bass.</p>
    </div>
  </div>
</section>

<div class="container">

  {%- if dateEntry.bigBass %}
  <div class="ct-bigbass-banner">
    <div>
      <p class="ct-bigbass-banner-label">Big Bass</p>
      <p class="ct-bigbass-banner-name">{% if dateEntry.bigBass.alt1 %}{{ dateEntry.bigBass.alt1 }}{% else %}{{ dateEntry.bigBass.angler1 }}{% endif %} &amp; {% if dateEntry.bigBass.alt2 %}{{ dateEntry.bigBass.alt2 }}{% else %}{{ dateEntry.bigBass.angler2 }}{% endif %}</p>
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
            <span>{%- if result.alt1 %}{{ result.alt1 }}{%- else %}{{ result.angler1 }}{%- endif %}</span>
            <span class="ct-mlts-angler2">&amp; {% if result.alt2 %}{{ result.alt2 }}{% else %}{{ result.angler2 }}{% endif %}</span>
            {%- if result.alt1 %}<span class="ct-mlts-alt-note">{{ result.alt1 }} alt. for {{ result.angler1 }}</span>{%- endif %}
            {%- if result.alt2 %}<span class="ct-mlts-alt-note">{{ result.alt2 }} alt. for {{ result.angler2 }}</span>{%- endif %}
          </td>
          <td>{%- if result.fish %} {{ result.fish }}{%- else %}&mdash;{%- endif %}</td>
          <td>{%- if result.final_weight > 0 %}{{ result.final_weight }} lbs{%- else %}&mdash;{%- endif %}</td>
          <td>{%- if result.big_bass %}{{ result.big_bass }} lbs{%- else %}&mdash;{%- endif %}</td>
        </tr>
        {%- endfor %}
      </tbody>
    </table>
  </div>

  <a href="/tournaments/mlts/results/" class="ct-results-back">&larr; Back to Results</a>

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
