---
layout: layout.liquid
title: "Welcome to I-70 Bass Anglers"
description: "I-70 Bass Anglers - Premier bass fishing club serving the I-70 corridor region. Join us for competitive tournaments and camaraderie."
---

The I-70 Bass Anglers is the premier bass fishing club serving the I-70 corridor region. Since our founding as FROGs in {{ site.founded }}, we've been dedicated to promoting the sport of bass fishing through competitive tournaments, conservation efforts, and building lasting friendships among anglers.

### Upcoming Events

**Next Club Tournament:** [Check our tournament schedule](/tournaments/club/upcoming/) for the latest information.

**Next Meeting:** First Thursday of every month at 7:00 PM

### What We Offer

- **Competitive Tournaments** - Monthly club tournaments with prizes and points standings
- **Milford Lake Team Series** - Host to the the Milford Lake Tournament Series
- **Conservation Efforts** - Supporting local lake conservation and fish habitat projects  
- **Camaraderie** - Build friendships with fellow bass fishing enthusiasts
- **Education** - Learn new techniques and strategies from experienced anglers

### Join Us

Whether you're a seasoned tournament angler or just getting started in bass fishing, the I-70 Bass Anglers welcomes you. We fish lakes throughout northeast Kansas along the I-70 corridor and are always looking for new members who share our passion for bass fishing.

[Learn more about our club organization](/club/organization/) or check out our [upcoming tournaments](/tournaments/club/upcoming/).

### Latest News

{% assign recent_posts = collections.posts | slice: 0, 3 %}
{% for post in recent_posts %}
- **{{ post.date | readableDate }}** - [{{ post.data.title }}]({{ post.url }})
{% endfor %}

[View all blog posts](/blog/)

### Our Sponsors

We're proud to be supported by local businesses and national fishing industry leaders. [View our sponsors](/sponsors/) and show them your support.
