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

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Season</span></div>
  <div class="ct-empty-state">
    <p>The {{ site.year }} MLTS season is just getting started! Team standings will be updated after the first tournament.</p>
    {%- if mlts_tournaments.next %}
    <p>Our next tournament: <strong>{{ mlts_tournaments.next.formattedDate }}</strong> at Milford Lake.</p>
    {%- endif %}
  </div>

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
