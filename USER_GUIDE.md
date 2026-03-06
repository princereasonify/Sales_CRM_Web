# EduCRM — User Guide

A complete guide to using EduCRM, the Sales CRM built for education technology companies selling to schools.

---

## What is EduCRM?

EduCRM helps your sales team manage the entire journey of selling an EdTech product to schools — from the first cold call to signing a contract. Think of it as your sales team's command center.

**Real-world example:** Imagine your company sells an AI-powered learning platform to schools across India. You have Field Officers visiting schools daily, Zonal Heads managing those officers, Regional Heads overseeing multiple zones, and a Sales Head watching the national picture. EduCRM gives each person exactly the dashboard and tools they need.

---

## Roles in EduCRM

EduCRM has 4 roles, each with a different level of access:

### 1. Field Officer (FO) — The Salesperson on the Ground
- Visits schools, makes calls, gives demos
- Creates and manages leads
- Submits deals for approval
- **Think of them as:** A real estate agent visiting properties and closing deals

### 2. Zonal Head (ZH) — The Team Manager
- Manages a group of FOs in a zone (e.g., "Mumbai West")
- Approves or rejects deals that need discount authorization
- Tracks each FO's performance
- **Think of them as:** A bank branch manager overseeing their team of relationship managers

### 3. Regional Head (RH) — The Regional Director
- Oversees multiple zones in a region (e.g., "West Region")
- Compares zone performance side-by-side
- Accesses detailed reports
- **Think of them as:** A retail chain's regional director managing 5-10 store managers

### 4. Sales Head (SH) — The National Leader
- Views the entire company's sales performance
- Sees all regions, win rates, and loss reasons
- Makes strategic decisions based on national data
- **Think of them as:** The VP of Sales at a large company

---

## Logging In

1. Open the app in your browser (`http://localhost:5173`)
2. Enter your email and password
3. Click **Sign In**

**Quick Login (for testing):** Click any of the role buttons (FO, ZH, RH, SH) to instantly log in as a test user.

| Role | Email | Password |
|---|---|---|
| Field Officer | arjun@educrm.in | fo123 |
| Zonal Head | priya@educrm.in | zh123 |
| Regional Head | rajesh@educrm.in | rh123 |
| Sales Head | anita@educrm.in | sh123 |

---

## Field Officer (FO) Features

### Dashboard

Your home screen showing everything important at a glance:

- **Revenue** — How much you've earned this month vs your target
- **Visits This Week** — Number of school visits completed
- **Demos This Month** — Product demonstrations given
- **Pipeline** — Active leads you're working on
- **Hot Leads** — Your highest-scoring leads that are closest to closing
- **Today's Tasks** — Scheduled calls, visits, and demos for today

**Real-world example:** Arjun logs in Monday morning and sees he has 3 tasks today: a call at 9 AM, a school visit at 11 AM, and a demo at 3 PM. His dashboard shows he's at 77% of his monthly target — he needs 2 more deals to hit it.

---

### Leads

A lead is a school that might buy your product. Every school starts as a lead.

#### Lead Stages (the journey of a sale):

| Stage | What it means | Example |
|---|---|---|
| **New Lead** | Just added to the system | "I got DPS Andheri's principal's number" |
| **Contacted** | First call or visit done | "I called the principal and she's interested" |
| **Qualified** | School has budget and interest | "They have budget and want a demo" |
| **Demo Stage** | Demo is scheduled | "Demo booked for next Tuesday" |
| **Demo Done** | Demo completed | "Showed them the platform, they loved it" |
| **Proposal Sent** | Formal quote sent | "Sent them pricing for 3 modules at ₹4.8L" |
| **Negotiation** | Discussing terms | "They want 15% discount, I offered 10%" |
| **Contract Sent** | Agreement sent for signing | "Contract sent, waiting for signature" |
| **Won** | Deal closed! | "Contract signed, onboarding starts next week" |
| **Lost** | Did not convert | "They chose a competitor" |

#### Viewing Leads

- **Leads List** — See all your leads in a table
- **Search** — Type a school name to find it quickly
- **Filter by Stage** — Show only "Demo Done" leads, for example
- **Lead Score** — Each lead gets a score (0-100) showing how likely it is to close
  - 70+ = Hot (green) — likely to close
  - 40-69 = Warm (amber) — needs nurturing
  - Below 40 = Cold (red) — low probability

#### Adding a New Lead

1. Click **"+ Add Lead"** button
2. Fill in school details:
   - School name, board (CBSE/ICSE/IB), city, state
   - Number of students, school type
   - Contact person's name, phone, email
   - How you found them (Field Visit, Referral, Website, etc.)
3. Click **Create Lead**

**Real-world example:** Arjun visits a new school "Greenfield Academy" during his field rounds. He opens EduCRM on his phone, taps "Add Lead", fills in the principal's details, and saves it. Now it appears in his leads list as a "New Lead".

#### Lead Detail Page

Click on any lead to see its full profile:
- School information and contact details
- Current stage and lead score
- **Activity Timeline** — Every call, visit, demo, and follow-up recorded in order
- Notes and next steps

---

### Activity Log

Every interaction with a school is logged as an activity. This creates a complete history.

#### Activity Types:
| Type | When to use |
|---|---|
| **Visit** | You physically went to the school |
| **Call** | Phone call with school contact |
| **Demo** | Product demonstration |
| **Follow-up** | Any follow-up action |
| **Proposal** | Sent a pricing proposal |
| **Contract** | Contract-related activity |

#### Logging an Activity:
1. Go to **Activity Log**
2. Click **"+ Log Activity"**
3. Select the lead (school), activity type, outcome, and add notes
4. Click **Save**

#### Outcomes:
- **Positive** — Good response, moving forward
- **Neutral** — No clear progress
- **Negative** — Bad response or objection raised

**Real-world example:** Arjun visits DPS Andheri and gives a demo to the principal and IT head. Afterward, he logs: Type = "Demo", Outcome = "Positive", Notes = "Principal loved the AI module. IT head wants a technical deep-dive next week."

---

### Pipeline Kanban

A visual board showing all your leads organized by stage — like sticky notes on a wall.

```
| New/Contacted | Qualified | Demo | Proposal/Negotiation | Won |
|    School A   | School C  | E    |    School F          |  H  |
|    School B   | School D  |      |    School G          |     |
```

This helps you see at a glance:
- Where most of your leads are stuck
- Which stages need attention
- Your overall pipeline health

**Real-world example:** Arjun opens his pipeline and notices 5 leads stuck in "Qualified" but only 1 in "Demo". That tells him he needs to schedule more demos this week.

---

### Create Deal

When a lead is ready to close, you create a deal with the commercial terms.

1. Go to **Create Deal**
2. Select the lead (only "Won" stage leads or advanced leads are shown)
3. Fill in:
   - **Contract Value** — Total price (e.g., ₹8,90,000)
   - **Discount %** — Any discount offered (e.g., 15%)
   - **Final Value** — Auto-calculated after discount
   - **Payment Terms** — e.g., "50% upfront, 50% post-go-live"
   - **Duration** — Contract length (e.g., "3 years")
   - **Modules** — Which products are included
4. Click **Submit Deal**

#### Discount Approval Rules:
- **0-10% discount** — FO can self-approve
- **Above 10%** — Requires Zonal Head (ZH) approval

**Real-world example:** Arjun closes a deal with Campion School for ₹8.9L but they want 15% off. Since it's above 10%, the deal goes to Priya (his ZH) for approval. She sees it in her "Pending Approvals" section.

---

## Zonal Head (ZH) Features

### Zone Dashboard

See your entire zone's performance:

- **Zone Revenue MTD** — Total revenue your zone earned this month
- **Active Pipeline** — Number of leads your FOs are working on
- **Pending Approvals** — Deals waiting for your approval (action required!)
- **Zone Win Rate** — Percentage of submitted deals that were won

#### Pending Deal Approvals

When an FO submits a deal with a high discount, it appears here. You can:
- **Approve** — Accept the deal terms
- **Reject** — Send it back (with a reason)

Each pending deal shows: school name, FO name, deal value, discount %, and submission date.

#### FO Leaderboard

A ranked table of your Field Officers showing:
- Revenue earned
- Target achievement %
- Weekly visits
- Status (On Track / At Risk / Underperforming)

**Real-world example:** Priya (ZH) opens her dashboard Monday morning. She sees 1 pending approval — Arjun's Campion School deal at 15% discount. She reviews the deal value (₹7.56L after discount) and approves it. She also notices Vikram is underperforming at 17% of target and makes a note to schedule a coaching call.

---

### Team Management

A card-based view of each FO with detailed stats:

Each card shows:
- FO name, territory, and status badge
- Revenue, visits/week, deals won
- Target progress bar
- **Assign Task** button — Give specific tasks to FOs
- **Coaching Needed** flag — Appears for underperforming FOs

**Real-world example:** Priya sees Vikram's card is red (Underperforming). She clicks "Assign Task" and types "Schedule demo for Vibgyor High Thane by Friday" — this ensures he takes action on a stagnant lead.

---

## Regional Head (RH) Features

### Region Dashboard

A high-level view across all zones in your region:

- **Region Revenue MTD** — Total revenue across all zones
- **Active Leads** — Total leads across all zones
- **Deals Won** — Total closed deals this month
- **Forecast Accuracy** — How close your predictions are to actual results

#### Zone Comparison Table

Side-by-side comparison of all zones:

| Zone | Revenue | Target % | Win Rate | Pipeline | Health |
|---|---|---|---|---|---|
| Mumbai West | ₹27L | 34% | 28% | 27 | At Risk |
| Pune Central | ₹52L | 52% | 38% | 41 | Strong |

Health indicators:
- **Strong** (green) — On track, performing well
- **Good** (teal) — Satisfactory performance
- **At Risk** (amber) — Needs attention
- **Weak** (red) — Immediate intervention needed

#### Territory Coverage

A visual bubble map showing each zone. Bubble size = number of leads. Color = health status. This helps you quickly spot underperforming territories.

**Real-world example:** Rajesh (RH) sees that Pune Central is "Strong" at 52% target while Nashik is "Weak" at 12%. He decides to reallocate two FOs from Pune to Nashik to boost coverage there.

---

### Reports Library

A catalog of standard reports available to your role:

| Report | What it shows |
|---|---|
| Monthly Performance | Revenue, targets, win rate by region/zone/FO |
| Deal Aging | Deals stuck in the same stage for 10+ days |
| Conversion Funnel | Drop-off rates at each pipeline stage |
| Lost Deal Analysis | Why deals were lost — price, competition, no decision |
| Territory Coverage | Schools contacted vs unreached by district |
| Team Leaderboard | FO rankings across all KPIs |
| Revenue Forecast | Predicted revenue vs official target |
| School Onboarding | Won deals through setup and go-live tracking |

Each report can be **viewed** in-app or **exported** for offline analysis.

---

## Sales Head (SH) Features

### National Dashboard

The complete national picture:

- **National Revenue MTD** — Company-wide revenue this month
- **Schools Won** — Total new contracts signed
- **Total Pipeline Value** — Value of all active leads
- **National Win Rate** — Overall deal success rate

#### Regional Scorecard

A table comparing all regions:

| Region | Revenue | Target % | Schools | Win Rate | Forecast | Health |
|---|---|---|---|---|---|---|
| South | ₹2.2Cr | 44% | 29 | 38% | ₹4.8Cr | Strong |
| West | ₹1.4Cr | 35% | 18 | 31% | ₹3.8Cr | Good |
| East | ₹82L | 27% | 10 | 22% | ₹2.6Cr | At Risk |

Click any region row to drill down into that region's dashboard.

#### Loss Reasons

A horizontal bar chart showing why deals are being lost:
- Price/Budget (most common)
- Competitor
- No Decision
- No Fit

This guides pricing strategy and product improvements.

**Real-world example:** Anita (SH) sees that "Price/Budget" is the #1 loss reason with 38 deals lost. She decides to introduce a "Lite" package at 40% lower cost for budget-conscious schools. She also notices the East region is "At Risk" and schedules a review call with the Regional Head.

---

## Notifications

The bell icon in the top-right shows unread notifications. Types include:

| Type | Example |
|---|---|
| **Urgent** | "Vibgyor High — no activity for 20 days. Follow up NOW." |
| **Reminder** | "Demo scheduled today at 3 PM — prepare materials." |
| **Success** | "Deal approved! Ryan International — 8% discount approved." |
| **Warning** | "Euro Kids stuck in Contacted for 13 days." |
| **Info** | "Monthly target updated: ₹20L per FO for March." |

---

## Key Concepts

### Lead Score (0–100)

A number showing how likely a lead is to convert. Higher = better.

Factors that increase score:
- Large school (more students)
- Budget confirmed
- Multiple positive interactions
- Decision maker engaged
- Short time since last activity

### Deal Approval Flow

```
FO creates deal
    ↓
Discount ≤ 10%  →  Self-approved (FO can close it)
Discount > 10%  →  Goes to ZH for approval
    ↓
ZH reviews  →  Approve ✓  or  Reject ✗
    ↓
If approved  →  Deal is active, FO proceeds to close
```

### The Sales Funnel

```
New Lead          ████████████████████████  100 leads
Contacted         ██████████████████        70 leads
Qualified         ████████████              45 leads
Demo              ████████                  30 leads
Proposal          █████                     18 leads
Negotiation       ███                       10 leads
Won               ██                        6 leads    ← 6% conversion
```

Not every lead becomes a deal. The funnel helps identify where leads drop off so you can improve.

---

## Tips for Each Role

### For Field Officers:
1. Log every activity immediately — don't wait until end of day
2. Focus on leads with score 70+ (Hot Leads) first
3. Check your pipeline kanban weekly — don't let leads stagnate
4. If a lead has no activity for 10+ days, schedule a follow-up

### For Zonal Heads:
1. Review pending approvals daily — don't block your FOs
2. Watch the leaderboard — coach underperforming FOs early
3. Assign specific, actionable tasks (not vague instructions)

### For Regional Heads:
1. Compare zones weekly — spot trends early
2. Use territory coverage to find underserved areas
3. Review Deal Aging report to find stagnant deals

### For Sales Head:
1. Focus on loss reasons — they reveal systemic issues
2. Compare regions fairly (different targets, different markets)
3. Use forecast data for board-level reporting

---

## Glossary

| Term | Meaning |
|---|---|
| **MTD** | Month-to-Date — from the 1st of this month to today |
| **Pipeline** | All active leads that haven't been won or lost yet |
| **Win Rate** | Percentage of submitted deals that were won |
| **KPI** | Key Performance Indicator — a metric that matters |
| **Kanban** | A visual board organizing items by status/stage |
| **FO** | Field Officer (salesperson) |
| **ZH** | Zonal Head (team manager) |
| **RH** | Regional Head (regional director) |
| **SH** | Sales Head (national leader) |
| **Lead Score** | 0-100 rating of how likely a lead is to close |
| **Deal Aging** | How long a deal has been stuck in the same stage |
| **Forecast** | Predicted revenue based on current pipeline |

---

*Built with React + ASP.NET Core + PostgreSQL*
