---
layout: layout.liquid
title: "Upcoming MLTS Tournament"
description: "Next Milford Lake Teams Series event for Kansas anglers."
---

## {{ mlts_tournaments.next.formattedDate }}
### **{{ mlts_tournaments.next.lake }}**

**Tournament Details:**
- **Date:** {{ mlts_tournaments.next.formattedDate }}
- **Check-In:** {{mlts_tournaments.next.checkin}}
- **Tournament Hours:** Safe light to {{mlts_tournaments.next.weighin}}
- **Entry Fee:** $50 per angler

**Location & Directions:**
- **Launch:** {{ramps[mlts_tournaments.next.ramp].name}}
- **Address:** {{ramps[mlts_tournaments.next.ramp].address}}
- **GPS:** {{ramps[mlts_tournaments.next.ramp].gps}}

---

### Contact Information

**Tournament Director:** {{club_officers.tournament_director.name}}
- **Email:** {{ contact.email }}

Ready to fish with us? [Contact the Tournament Director](mailto:{{ contact.email }}) to get registered for the next tournament!