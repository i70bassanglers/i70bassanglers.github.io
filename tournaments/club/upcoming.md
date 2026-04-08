---
layout: layout.liquid
title: "Upcoming Club Tournament"
description: "Next I-70 Bass Anglers tournament — times, launch ramp, and directions."
bodyClass: page-ct-upcoming
hideHeader: true
templateEngineOverride: liquid
---

<section class="ct-hero ct-hero--sub">
  <div class="ct-hero-band">
    {% include "hero-nav.liquid" %}
    <div class="ct-hero-inner">
      <a href="/tournaments/club/" class="ct-hero-breadcrumb">&larr; Club Tournaments</a>
      {%- if tournaments.next %}
      <p class="ct-hero-eyebrow">Next Tournament</p>
      <h1 class="ct-hero-title">{{ tournaments.next.lake }}</h1>
      <p class="ct-hero-sub">{{ tournaments.next.formattedDate }}</p>
      {%- else %}
      <p class="ct-hero-eyebrow">{{ site.year }} Season</p>
      <h1 class="ct-hero-title">See You Next Season</h1>
      <p class="ct-hero-sub">The {{ site.year }} tournament season has wrapped up. Thanks for fishing with us.</p>
      {%- endif %}
    </div>
  </div>
</section>

<div class="container">

{%- if tournaments.next %}

  <div class="ct-bridge"><span class="ct-bridge-label">Day-Of Schedule</span></div>

  <div class="ct-upcoming-times">
    <div class="ct-upcoming-time-item">
      <span class="ct-upcoming-time-label">Check-In</span>
      {%- if tournaments.next.checkin %}
      <span class="ct-upcoming-time-value">{{ tournaments.next.checkin }}</span>
      <span class="ct-upcoming-time-note">15 min before launch</span>
      {%- else %}
      <span class="ct-upcoming-time-tbd">TBD</span>
      <span class="ct-upcoming-time-note">Posted before the tournament</span>
      {%- endif %}
    </div>
    <div class="ct-upcoming-time-item">
      <span class="ct-upcoming-time-label">Launch</span>
      {%- if tournaments.next.estimated_safe_light and tournaments.next.estimated_safe_light != "TBD" %}
      <span class="ct-upcoming-time-value">{{ tournaments.next.estimated_safe_light }}</span>
      <span class="ct-upcoming-time-note">Estimated safe light</span>
      {%- else %}
      <span class="ct-upcoming-time-tbd">TBD</span>
      <span class="ct-upcoming-time-note">Posted before the tournament</span>
      {%- endif %}
    </div>
    <div class="ct-upcoming-time-item">
      <span class="ct-upcoming-time-label">Weigh-In</span>
      {%- if tournaments.next.weighin %}
      <span class="ct-upcoming-time-value">{{ tournaments.next.weighin }}</span>
      <span class="ct-upcoming-time-note">8 hours after launch</span>
      {%- else %}
      <span class="ct-upcoming-time-tbd">TBD</span>
      <span class="ct-upcoming-time-note">Posted before the tournament</span>
      {%- endif %}
    </div>
  </div>

  <div class="ct-bridge"><span class="ct-bridge-label">Location &amp; Directions</span></div>

  {%- if tournaments.next.ramp and tournaments.next.ramp != "TBD" %}
  {%- assign ramp = ramps[tournaments.next.ramp] %}
  <div class="ct-upcoming-location-grid">
    <div class="ct-upcoming-location">
      <p class="ct-upcoming-ramp-name">{{ ramp.name }}</p>
      <p class="ct-upcoming-ramp-address">{{ ramp.address }}</p>
      <a href="{{ ramp.gmaps }}" class="ct-upcoming-maps-link" target="_blank" rel="noopener">Open in Google Maps &rarr;</a>
      <p class="ct-upcoming-gps">GPS: {{ ramp.gps }}</p>
    </div>
    {%- if ramp.image %}
    <div class="ct-upcoming-location-photo">
      <img src="{{ ramp.image }}" alt="{{ tournaments.next.lake }}" class="ct-upcoming-lake-img">
    </div>
    {%- endif %}
  </div>
  {%- else %}
  <div class="ct-upcoming-location-tbd">
    Launch ramp not yet confirmed &mdash; check back closer to the tournament date or contact the Tournament Director.
  </div>
  {%- endif %}

  <div class="ct-bridge"><span class="ct-bridge-label">First Time Out?</span></div>

  <div class="ct-upcoming-newmember">
    <p class="ct-upcoming-newmember-label">What to expect</p>
    <div class="ct-upcoming-tips">
      <div>
        <p class="ct-upcoming-tip-head">Arrive early</p>
        <p class="ct-upcoming-tip-body">Check in with the Tournament Director before launch. Rules and pairings are reviewed at check-in.</p>
      </div>
      <div>
        <p class="ct-upcoming-tip-head">5 fish, 15&Prime; minimum</p>
        <p class="ct-upcoming-tip-body">Keep your 5 biggest bass over 15 inches for the weigh-in. Catch-and-release after weigh-in.</p>
      </div>
      <div>
        <p class="ct-upcoming-tip-head">Stay for weigh-in</p>
        <p class="ct-upcoming-tip-body">Results and winnings are announced immediately after weigh-in. Stick around even if you blanked.</p>
      </div>
    </div>
  </div>

  <section class="ct-contact-strip">
    <div class="ct-contact-inner">
      <span class="ct-contact-role">Tournament Director</span>
      <span class="ct-contact-name">{{ club_officers.tournament_director.name }}</span>
      <span class="ct-contact-sep">&middot;</span>
      <a href="mailto:{{ contact.club.email }}" class="ct-contact-link">{{ contact.club.email }}</a>
      <span class="ct-contact-sep">&middot;</span>
      <a href="tel:{{ contact.club.phone }}" class="ct-contact-link">{{ contact.club.phone }}</a>
    </div>
  </section>

{%- else %}

  <div class="ct-bridge"><span class="ct-bridge-label">{{ site.year }} Season</span></div>
  <div class="ct-empty-state">
    <p>All {{ site.year }} tournaments are complete. Final standings and results are available below.</p>
    <p>
      <a href="/tournaments/club/standings/">View Final Standings &rarr;</a>
      &nbsp;&nbsp;
      <a href="/tournaments/club/results/">View All Results &rarr;</a>
    </p>
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
