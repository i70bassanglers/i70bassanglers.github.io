---
layout: layout.liquid
description: "Next Milford Lake Team Series tournament — times, launch ramp, and registration."
bodyClass: page-mlts-upcoming
hideHeader: true
templateEngineOverride: liquid
---

<section class="ct-hero ct-hero--sub">
  <div class="ct-hero-band">
    {% include "hero-nav.liquid" %}
    <div class="ct-hero-inner">
      <a href="/tournaments/mlts/" class="ct-hero-breadcrumb">&larr; MLTS</a>
      {%- if mlts_tournaments.next %}
      <p class="ct-hero-eyebrow">Next Tournament</p>
      <h1 class="ct-hero-title">Milford Lake</h1>
      <p class="ct-hero-sub">{{ mlts_tournaments.next.formattedDate }}</p>
      {%- else %}
      <p class="ct-hero-eyebrow">{{ site.year }} Season</p>
      <h1 class="ct-hero-title">See You Next Season</h1>
      <p class="ct-hero-sub">The {{ site.year }} MLTS season has wrapped up. Thanks for competing.</p>
      {%- endif %}
    </div>
  </div>
</section>

<div class="container">

{%- if mlts_tournaments.next %}

  <div class="ct-bridge"><span class="ct-bridge-label">Day-Of Schedule</span></div>

  <div class="ct-upcoming-times">
    <div class="ct-upcoming-time-item">
      <span class="ct-upcoming-time-label">Check-In</span>
      {%- if mlts_tournaments.next.checkin and mlts_tournaments.next.checkin != "TBD" %}
      <span class="ct-upcoming-time-value">{{ mlts_tournaments.next.checkin }}</span>
      <span class="ct-upcoming-time-note">Before launch</span>
      {%- else %}
      <span class="ct-upcoming-time-tbd">TBD</span>
      <span class="ct-upcoming-time-note">Posted before the tournament</span>
      {%- endif %}
    </div>
    <div class="ct-upcoming-time-item">
      <span class="ct-upcoming-time-label">Launch</span>
      <span class="ct-upcoming-time-value">Safe Light</span>
      <span class="ct-upcoming-time-note">8 hours of fishing</span>
    </div>
    <div class="ct-upcoming-time-item">
      <span class="ct-upcoming-time-label">Weigh-In</span>
      {%- if mlts_tournaments.next.weighin and mlts_tournaments.next.weighin != "TBD" %}
      <span class="ct-upcoming-time-value">{{ mlts_tournaments.next.weighin }}</span>
      <span class="ct-upcoming-time-note">8 hours after safe light</span>
      {%- else %}
      <span class="ct-upcoming-time-tbd">TBD</span>
      <span class="ct-upcoming-time-note">Posted before the tournament</span>
      {%- endif %}
    </div>
  </div>

  <div class="ct-bridge"><span class="ct-bridge-label">Location &amp; Directions</span></div>

  <div class="ct-upcoming-location">
    <div>
      <p class="ct-upcoming-ramp-name">{{ ramps.milford_rush_creek.name }}</p>
      <p class="ct-upcoming-ramp-address">{{ ramps.milford_rush_creek.address }}</p>
      <a href="{{ ramps.milford_rush_creek.gmaps }}" class="ct-upcoming-maps-link" target="_blank" rel="noopener">Open in Google Maps &rarr;</a>
      <p class="ct-upcoming-gps">GPS: {{ ramps.milford_rush_creek.gps }}</p>
    </div>
  </div>

  <div class="ct-bridge"><span class="ct-bridge-label">Entry &amp; Registration</span></div>

  <div class="ct-upcoming-newmember">
    <p class="ct-upcoming-newmember-label">How to compete</p>
    <div class="ct-upcoming-tips">
      <div>
        <p class="ct-upcoming-tip-head">Register your team</p>
        <p class="ct-upcoming-tip-body">Contact the Tournament Director to register. Entry fee is $100 per team, paid at check-in.</p>
      </div>
      <div>
        <p class="ct-upcoming-tip-head">5 fish, 15&Prime; minimum</p>
        <p class="ct-upcoming-tip-body">Bring your 5 biggest bass over 15 inches to the weigh-in. Catch-and-release after weigh-in.</p>
      </div>
      <div>
        <p class="ct-upcoming-tip-head">90% payout &mdash; cash</p>
        <p class="ct-upcoming-tip-body">Payouts are based on the number of competing teams. Winning teams are paid cash at the weigh-in.</p>
      </div>
    </div>
  </div>

  <section class="ct-contact-strip">
    <div class="ct-contact-inner">
      <span class="ct-contact-role">MLTS Tournament Director</span>
      <span class="ct-contact-name">{{ club_officers.mlts_tournament_director.name }}</span>
      <span class="ct-contact-sep">&middot;</span>
      <a href="mailto:{{ contact.mlts.email }}" class="ct-contact-link">{{ contact.mlts.email }}</a>
      <span class="ct-contact-sep">&middot;</span>
      <a href="tel:{{ contact.mlts.phone }}" class="ct-contact-link">{{ contact.mlts.phone }}</a>
    </div>
  </section>

{%- else %}

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Season</span></div>
  <div class="ct-empty-state">
    <p>All {{ site.year }} MLTS tournaments are complete. Season results are available below.</p>
    <p><a href="/tournaments/mlts/results/">View Season Results &rarr;</a></p>
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
