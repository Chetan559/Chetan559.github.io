# Design System Inspired by Dayos

## 1. Visual Theme & Atmosphere

Dayos embodies a modern, tech-forward aesthetic grounded in enterprise sophistication with bold typographic presence and playful accent moments. The design celebrates AI's transformative power through clean, minimalist layouts punctuated by vibrant geometric elements and striking color accents. The visual language balances heavyweight sans-serif typography with generous whitespace, creating an approachable yet authoritative presence that appeals to enterprise decision-makers. Accent colors (magenta, cyan, yellow) inject energy and personality, signaling innovation and dynamism within an otherwise neutral, professional framework.

**Key Characteristics**
- Bold, condensed typography as primary visual anchor
- Generous whitespace and breathing room between elements
- Strategic use of bright accent colors for highlights and CTAs
- Clean, minimal component styling with soft rounded corners
- High contrast between dark text and light backgrounds
- Enterprise-appropriate with creative, energetic accents
- Geometric, three-dimensional imagery supporting narrative
- Functional simplicity prioritizing clarity and hierarchy

## 2. Color Palette & Roles

### Primary
- **Black** (`#000000`): Primary text, headings, and foreground elements
- **White** (`#FFFFFF`): Primary background and content surfaces

### Accent Colors
- **Magenta** (`#FF7EF2`): Highlight accents and geometric shapes
- **Light Magenta** (`#FFD5F8`): Soft accent backgrounds and overlays
- **Cyan** (`#00D1FF`): Secondary accent for interactive elements and callouts
- **Green** (`#00FD74`): Tertiary accent for success states and highlights
- **Light Green** (`#D1FFCA`): Soft accent backgrounds
- **Yellow** (`#FFF100`): Warning states and attention-grabbing elements
- **Dark Green** (`#0A2D05`): Deep accent for contrast layering
- **Dark Magenta** (`#3D0E35`): Dark accent for depth variation

### Interactive
- **Primary Button Text** (`#000000`): Text on primary CTAs
- **Secondary Link Text** (`#979797`): Secondary navigation and links
- **Dark Link Text** (`#444444`): Secondary interactive elements

### Neutral Scale
- **Light Gray** (`#E5E7EB`): Primary neutral background and dividers (most frequent)
- **Medium Gray** (`#C6C6C6`): Mid-tone neutral borders and subtle elements
- **Dark Gray** (`#1A1A1A`): Deep neutral for text alternatives
- **Medium-Dark Gray** (`#444444`): Secondary text and muted elements
- **Pale Gray** (`#E5E5E5`): Subtle dividers and minimal borders

### Surface & Borders
- **Card Background** (`#FFFFFF`): Default surface color with soft border at `#E5E7EB`
- **Border Gray** (`#E5E7EB`): Standard border color across cards and containers

### Semantic / Status
- **Warning** (`#FFF100`): Warning states and cautionary alerts
- **Error / Danger** (`#C9372C`): Error messages and destructive actions

## 3. Typography Rules

### Font Family
**Primary:** SuisseIntlCond (condensed variant)
**Secondary:** SuisseIntl (standard variant)
**Fallback stack:** `SuisseIntlCond, SuisseIntl, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | SuisseIntlCond | 130px | 700 | 117px | Default | Hero headline; maximum impact |
| Heading / H2 | SuisseIntlCond | 80px | 700 | 72px | Default | Section heading; bold presence |
| Body | SuisseIntl | 20px | 400 | 24px | Default | Main content paragraphs |
| Subheading | SuisseIntl | 16px | 400 | 20px | Default | Secondary content and descriptions |
| Button / Label | SuisseIntl | 14px | 500 | 18.2px | Default | Interactive text and labels |
| Caption / Small | SuisseIntl | 14px | 500 | 18.2px | Default | Metadata and small text |
| Link | SuisseIntl | 16px | 400 | 20px | Default | Hyperlink navigation |

### Principles
- **Condensed for Impact:** SuisseIntlCond reserved for headlines requiring maximum visual weight and presence
- **Legibility First:** Body text defaults to standard SuisseIntl at 20px for comfortable reading
- **Weight Hierarchy:** Bold (700) signals importance; regular (400) for content; medium (500) for interactive elements
- **Vertical Rhythm:** Line heights maintain visual consistency and reading flow across scales
- **Minimal Letter Spacing:** Natural letter spacing preserves brand distinctiveness and readability

## 4. Component Stylings

### Buttons

#### Primary Button (CTA)
- **Background:** `#000000`
- **Text Color:** `#FFFFFF`
- **Font:** SuisseIntl, 14px, weight 500
- **Padding:** `12px 24px`
- **Border Radius:** `24px`
- **Border:** None
- **Line Height:** 18.2px
- **Height:** 48px
- **Hover State:** Background `#1A1A1A`, text `#FFFFFF`
- **Active State:** Background `#000000`, text `#FFFFFF`

#### Secondary Button
- **Background:** `transparent`
- **Text Color:** `#444444`
- **Font:** SuisseIntl, 14px, weight 500
- **Padding:** `12px 24px`
- **Border Radius:** `0px`
- **Border:** `1px solid #E5E7EB`
- **Line Height:** 18.2px
- **Height:** 48px
- **Hover State:** Background `#E5E7EB`, text `#000000`
- **Active State:** Background `#D4D4D8`, text `#000000`

#### Ghost Button
- **Background:** `transparent`
- **Text Color:** `#000000`
- **Font:** SuisseIntl, 16px, weight 400
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** None
- **Line Height:** 20px
- **Height:** 40px
- **Hover State:** Text color `#444444`, text-decoration underline
- **Active State:** Text color `#000000`, text-decoration underline

### Cards & Containers

#### Default Card
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Font:** SuisseIntl, 16px, weight 400
- **Padding:** `32px`
- **Border Radius:** `24px`
- **Border:** `1px solid #E5E7EB`
- **Box Shadow:** None
- **Line Height:** 20px
- **Hover State:** Border `1px solid #C6C6C6`, slight elevation

#### Content Section
- **Background:** `#FFFFFF` or `transparent`
- **Text Color:** `#000000`
- **Padding:** `96px 160px` (desktop)
- **Border Radius:** `0px`
- **Border:** None
- **Box Shadow:** None

### Inputs & Forms

#### Text Input
- **Background:** `#FFFFFF`
- **Text Color:** `#000000`
- **Font:** SuisseIntl, 16px, weight 400
- **Padding:** `12px 16px`
- **Border Radius:** `8px`
- **Border:** `1px solid #E5E7EB`
- **Line Height:** 20px
- **Height:** 48px
- **Focus State:** Border `1px solid #000000`, box-shadow `0 0 0 3px rgba(0, 0, 0, 0.1)`
- **Error State:** Border `1px solid #C9372C`

#### Placeholder Text
- **Color:** `#979797`
- **Font:** SuisseIntl, 16px, weight 400

### Navigation

#### Header Navigation
- **Background:** `transparent` or `rgba(255, 255, 255, 0.95)`
- **Text Color:** `#000000`
- **Font:** SuisseIntl, 16px, weight 400
- **Padding:** `24px 32px` (horizontal)
- **Height:** 80px
- **Border:** None or `1px solid #E5E7EB` (bottom)
- **Box Shadow:** None or `0 1px 3px rgba(0, 0, 0, 0.05)` (scrolled state)

#### Navigation Links
- **Default Color:** `#000000`
- **Hover Color:** `#444444`
- **Active Color:** `#000000` with underline
- **Font:** SuisseIntl, 16px, weight 400
- **Padding:** `8px 0px`

### Links

#### Standard Link
- **Color:** `#000000`
- **Font:** SuisseIntl, 16px, weight 400
- **Text Decoration:** None
- **Line Height:** 20px
- **Hover State:** Color `#444444`, text-decoration underline
- **Visited State:** Color `#979797`

#### Secondary Link / Caption
- **Color:** `#979797`
- **Font:** SuisseIntl, 14px, weight 500
- **Text Decoration:** None
- **Line Height:** 18.2px
- **Hover State:** Color `#444444`, text-decoration underline

## 5. Layout Principles

### Spacing System
**Base Unit:** 8px

**Scale & Context:**
- `8px`: Micro-spacing between inline elements, tight component gutters
- `16px`: Small padding within components, minimal gaps
- `24px`: Medium gaps between elements, section dividers
- `32px`: Standard padding within cards and containers
- `36px`: Custom spacing for specific component layouts
- `88px`: Vertical rhythm between major sections
- `96px`: Section padding (top/bottom)
- `160px`: Horizontal padding on full-width sections
- `176px`: Extended horizontal padding for hero and prominent sections

### Grid & Container
- **Max Width:** 1440px (desktop viewport width observed)
- **Column Strategy:** Flexible grid with responsive column adjustment
- **Section Patterns:** Full-width sections with internal max-width constraints
- **Horizontal Alignment:** Center-aligned major content blocks with asymmetric left-aligned hero text
- **Content Padding:** 160px horizontal padding for standard sections; 176px for hero

### Whitespace Philosophy
Dayos employs generous whitespace as a design principle, creating breathing room around typography and components. Vertical spacing emphasizes hierarchy and visual separation between distinct content zones. Horizontal padding is substantial, framing content within container bounds and creating visual focus. The design avoids clutter through strategic negative space rather than dense layouts.

### Border Radius Scale
- `0px`: Navigation, buttons (secondary/ghost), images, large structural elements
- `8px`: Form inputs, subtle contained elements
- `24px`: Cards, modals, contained content blocks
- Consistency: Most rounded elements use `24px` for visual cohesion

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Navigation, buttons, typography, flat surfaces |
| Raised (1) | `0 1px 3px rgba(0, 0, 0, 0.05)` | Cards at rest, subtle depth |
| Hovered (2) | `0 4px 12px rgba(0, 0, 0, 0.1)` | Cards on hover, interactive elevation |
| Modal (3) | `0 20px 25px rgba(0, 0, 0, 0.15)` | Modals, overlays, maximum emphasis |

**Shadow Philosophy:**
Dayos uses minimal, subtle shadows to avoid visual clutter. Shadows primarily signal interactivity or state change rather than serving as primary depth indicators. The design maintains a flat aesthetic with shadows reserved for hover states and modal overlays. Natural lighting is suggested through soft shadow treatment rather than dramatic elevation.

## 7. Do's and Don'ts

### Do
- Use **condensed typography** (SuisseIntlCond) for headlines to establish visual hierarchy and impact
- Maintain **generous whitespace** around content blocks—avoid cramped layouts
- Apply **accent colors sparingly** (magenta, cyan, yellow) for strategic emphasis and CTAs
- Employ **soft borders** (`#E5E7EB`) to define card and container boundaries
- Implement **24px border radius** consistently on cards and rounded components
- Use **black text** (`#000000`) on white backgrounds for maximum contrast and readability
- Keep buttons **minimal and functional**—avoid shadow and decoration
- Organize **navigation in horizontal layout** with appropriate vertical alignment
- Leverage **geometric accent shapes** to add personality without overwhelming content
- Design for **enterprise audiences** first; innovate through color and form, not decoration

### Don't
- Avoid **excessive shadows** or complex elevation treatments
- Don't mix font families unnecessarily—stick to SuisseIntlCond and SuisseIntl
- Don't use accent colors on large background areas—reserve for highlights and callouts
- Avoid **rounded corners** on buttons, navigation, and large structural elements
- Don't overcrowd layouts—whitespace is intentional and valuable
- Avoid **thin weight typography** for body text—maintain weight 400+ for readability
- Don't apply multiple borders or overly complex border treatments
- Avoid **hover animations** beyond simple color transitions
- Don't reduce contrast by mixing dark grays with black text
- Avoid **decorative elements** that don't serve a functional purpose

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | 320px–639px | Single column, 16px padding, 80px typography, stacked navigation |
| Tablet | 640px–1023px | Two-column grid, 32px padding, 60px typography, hamburger nav |
| Desktop | 1024px–1440px | Full layout, 160px padding, 130px H1 typography, expanded navigation |
| Large Desktop | 1440px+ | Max-width constraint, centered layout, consistent spacing |

### Touch Targets
- **Minimum Height:** 48px for all interactive buttons and links
- **Minimum Width:** 48px for icon buttons and small interactive elements
- **Padding:** Minimum `12px` around all touchable elements
- **Spacing Between:** Minimum `8px` between adjacent interactive elements

### Collapsing Strategy
- **Hero Text:** Scales from 130px (desktop) → 80px (tablet) → 48px (mobile)
- **Section Padding:** Adjusts from 160px (desktop) → 96px (tablet) → 32px (mobile)
- **Card Layout:** Changes from multi-column grid (desktop) → single column (mobile)
- **Navigation:** Transforms from horizontal list (desktop) → hamburger menu (mobile)
- **Images:** Responsive sizing maintaining aspect ratio; full-width on mobile
- **Line Length:** Body text constrained to improve readability on narrow screens

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA Button:** Black (`#000000`) background with white text
- **Secondary CTA Button:** Transparent with gray border (`#E5E7EB`)
- **Accent / Highlight:** Magenta (`#FF7EF2`) or Cyan (`#00D1FF`)
- **Background:** White (`#FFFFFF`)
- **Body Text:** Black (`#000000`)
- **Secondary Text:** Gray (`#979797`)
- **Borders / Dividers:** Light Gray (`#E5E7EB`)
- **Success / Positive:** Green (`#00FD74`)
- **Warning:** Yellow (`#FFF100`)
- **Error:** Red (`#C9372C`)

### Iteration Guide

1. **Typography Hierarchy:** Use SuisseIntlCond (700 weight) for all headlines; SuisseIntl (400 weight) for body text; prioritize contrast and clarity over decoration.

2. **Color Restraint:** Default to black text on white backgrounds; introduce accent colors (magenta, cyan, yellow) only for CTAs, highlights, or geometric accents—never as large background areas.

3. **Component Simplicity:** Build buttons, cards, and inputs with minimal styling—flat designs, soft borders (`#E5E7EB`), and zero shadow. Add `24px` border radius only to cards and rounded containers.

4. **Spacing Discipline:** Apply base 8px unit consistently. Use `160px` horizontal padding on full-width sections; `96px` vertical padding between major sections; `24px` gaps within component groups.

5. **Navigation Clarity:** Position horizontal navigation at `80px` height with black text. Use ghost buttons for secondary actions. Implement hamburger menu navigation for screens below 1024px width.

6. **Card Design:** Style cards with white background (`#FFFFFF`), `24px` border radius, `1px solid #E5E7EB` border, and `32px` padding. No shadow at rest; subtle shadow (`0 4px 12px rgba(0, 0, 0, 0.1)`) on hover.

7. **Responsive Scaling:** H1 typography scales from `130px` (desktop) to `80px` (tablet) to `48px` (mobile). Section padding shrinks from `160px` (desktop) to `96px` (tablet) to `32px` (mobile). Maintain 48px minimum touch target height across all breakpoints.

8. **Visual Focus:** Use generous whitespace to separate content zones. Employ condensed typography to create visual impact. Leverage accent colors strategically to guide attention without cluttering the interface.

9. **Accessibility & Contrast:** Ensure WCAG AA compliance with minimum 4.5:1 contrast ratio for all text. Maintain consistent focus indicators (`0 0 0 3px rgba(0, 0, 0, 0.1)` on inputs). Test interactive elements at 48px minimum sizes.

10. **Enterprise Tone:** Design for decision-makers and technical stakeholders. Balance professionalism (black/white/gray palette) with innovation signals (magenta, cyan, yellow accents). Avoid playfulness in typography or excessive decoration; let geometric imagery and color carry personality.