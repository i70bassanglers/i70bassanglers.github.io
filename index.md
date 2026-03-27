---
layout: layout.liquid
description: "I-70 Bass Anglers - Premier bass fishing club serving the I-70 corridor region. Join us for competitive tournaments and camaraderie."
---

<section class="home-hero">
  <div class="hero-inner">
    <div class="hero-logo">
      <a href="/">
        <img src="/images/i70-image.png" alt="I-70 Bass Anglers" class="logo-image">
      </a>
    </div>
    <div class="hero-text">
      <p class="hero-eyebrow">Northeast Kansas &middot; I-70 Corridor</p>
      <p class="hero-sub">A grassroots bass fishing club built on tight lines, good company, and a love of bass fishing — from the reservoir to the tournament weigh-in.</p>
    </div>
  </div>
</section>

<div class="container">

<section class="home-features">
  <a href="/tournaments/club/" class="home-feature-card">
    <h3 class="home-feature-title">Club Tournaments</h3>
    <p class="home-feature-desc">Monthly tournaments with prize payouts and a season-long points chase. Schedule, results, and standings all in one place.</p>
    <span class="home-feature-link">Schedule &amp; Results &rarr;</span>
  </a>
  <a href="/tournaments/mlts/" class="home-feature-card">
    <h3 class="home-feature-title">Milford Lake Team Series</h3>
    <p class="home-feature-desc">I-70 Bass Anglers hosts the MLTS — a team format series on one of northeast Kansas's premier bass fisheries.</p>
    <span class="home-feature-link">MLTS Info &amp; Standings &rarr;</span>
  </a>
  <div class="home-feature-card">
    <h3 class="home-feature-title">Monthly Meetings</h3>
    <p class="home-feature-desc">1st Thursday at 7:00pm</p>
    <div class="home-meta-item">
      <span class="home-meta-label">Location</span>
      <span class="home-feature-desc">Acorns Resort &middot; Milford, KS</span>
    </div>
    <p class="home-feature-desc">All are welcome.</p>
  </div>
</section>

<div class="home-bridge">
  <span class="home-bridge-label">Upcoming Events</span>
</div>

<section class="home-events-bar">
  <a href="/tournaments/club/upcoming/" class="home-event-cell">
    <p class="home-event-label">Next Club Tournament</p>
    <p class="home-event-date">{{ tournaments.next.formattedDate }}</p>
    <p class="home-event-sub">{{ tournaments.next.lake }}</p>
  </a>
  <a href="/tournaments/mlts/upcoming/" class="home-event-cell">
    <p class="home-event-label">Next MLTS Tournament</p>
    <p class="home-event-date">{{ mlts_tournaments.next.formattedDate }}</p>
    <p class="home-event-sub">Milford Lake Team Series</p>
  </a>
</section>

<div class="home-bridge">
  <span class="home-bridge-label">Results &amp; Standings</span>
</div>

<section class="home-quicklinks-bar">
  <a href="/tournaments/club/results/" class="home-quicklink-cell">
    <p class="home-quicklink-label">Latest Club Results</p>
    <p class="home-quicklink-date">{{ tournaments.prev.formattedDate }}</p>
    <p class="home-quicklink-sub">{{ tournaments.prev.lake }}</p>
  </a>
  <a href="/tournaments/club/standings/" class="home-quicklink-cell">
    <p class="home-quicklink-label">Season Standings</p>
    <p class="home-quicklink-date">Angler &amp; Co-Angler Points</p>
  </a>
</section>

<section class="home-sponsors-bar">
  <span class="home-sponsors-label">Proud Sponsors</span>
  <div class="home-sponsors-pills">
    <a href="/sponsors/" class="home-sponsor-pill">
      <img src="/images/sponsors/Acorns_Logo.png" alt="Acorns Resort" class="home-sponsor-pill-logo">
      <span>Acorns Resort</span>
    </a>
    <a href="/sponsors/" class="home-sponsor-pill">
      <img src="/images/sponsors/Handys-Logo.png" alt="Handy's" class="home-sponsor-pill-logo">
      <span>Handy's</span>
    </a>
    <a href="/sponsors/" class="home-sponsor-pill home-sponsor-pill--walsh">
      <span class="home-sponsor-pill-walsh-name"><span class="walsh-block">WALSH</span><span class="walsh-cursive">Customs</span></span>
    </a>
    <a href="/sponsors/" class="home-sponsor-pill">
      <img src="/images/sponsors/mikebean_shelterinsurance.svg" alt="Mike Bean Agency LLC" class="home-sponsor-pill-logo">
      <span>Mike Bean Agency LLC</span>
    </a>
  </div>
  <a href="/sponsors/" class="home-sponsors-more">View all sponsors &rarr;</a>
</section>

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
    <p class="home-footer-copy">&copy; 2026 I-70 Bass Anglers. All rights reserved.</p>
  </div>
</section>
