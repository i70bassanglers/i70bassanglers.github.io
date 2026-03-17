---
layout: layout.liquid
title: "Upcoming Club Tournament Information"
description: "Next I-70 Bass Anglers club tournaments, registration details, and lake information."
---

## {{ tournaments.next.formattedDate }}
### **{{ tournaments.next.lake }}**

**Tournament Details:**
- **Date:** {{ tournaments.next.formattedDate }}
- **Check-In:** {% if tournaments.next.checkin %}{{tournaments.next.checkin}}{% else %}TBD{% endif %}
- **Estimated Tournament Hours:** {% if tournaments.next.estimated_safe_light and tournaments.next.estimated_safe_light != "TBD" %}{{tournaments.next.estimated_safe_light}} to {{tournaments.next.weighin}}{% else %}TBD{% endif %}
- **Entry Fee:** $50 per angler

**Location & Directions:**
{% if tournaments.next.ramp and tournaments.next.ramp != "TBD" %}
- **Launch:** {{ramps[tournaments.next.ramp].name}}
- **Address:** [{{ramps[tournaments.next.ramp].address}}]({{ramps[tournaments.next.ramp].gmaps}})
- **GPS:** {{ramps[tournaments.next.ramp].gps}}
{% else %}
- **Launch:** TBD
{% endif %}

**[See the full schedule here](/tournaments/club/schedule)**

---
### New Member Welcome

First time joining us? Here's what to expect:

**Registration:**
- Arrive early to meet other anglers and get oriented
- Tournament Director will review rules and answer questions

**During Tournament:**
- Practice good sportsmanship, have fun, and stay safe
- Keep your 5 biggest fish over 15 inches for the weigh-in

**Post-Tournament:**
- Stay for weigh-in even if you didn't catch fish
- Results announced and winnings awarded immediately

---

### Contact Information

**Tournament Director:** {{club_officers.tournament_director.name}}
- **Email:** {{ contact.club.email }}

Ready to fish with us? [Contact the Tournament Director](mailto:{{ contact.club.email }}) to get registered for the next tournament!
