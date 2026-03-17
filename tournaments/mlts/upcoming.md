---
layout: layout.liquid
title: "Upcoming MLTS Tournament"
description: "Next Milford Lake Teams Series event for Kansas anglers."
---

## {{ mlts_tournaments.next.formattedDate }}

**Tournament Details:**
- **Check-In:** {{mlts_tournaments.next.checkin}}
- **Tournament Hours:** Safe light to {{mlts_tournaments.next.weighin}}
- **Entry Fee:** $100 per team

**Location & Directions:**
- **Launch:** {{ramps["milford_south_ramp"].name}}
- **Address:** [{{ramps["milford_south_ramp"].address}}]({{ramps["milford_south_ramp"].gmaps}})
- **GPS:** {{ramps["milford_south_ramp"].gps}}

**[See the full schedule here](/tournaments/mlts/schedule)**

---

### Contact Information

**Tournament Director:** {{club_officers.tournament_director.name}}
- **Email:** {{ contact.club.email }}

Ready to fish with us? [Contact the Tournament Director](mailto:{{ contact.club.email }}) to get registered for the next tournament!