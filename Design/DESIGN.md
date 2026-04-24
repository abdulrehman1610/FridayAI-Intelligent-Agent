---
name: Cybernetic Interface
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d1c1d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9a8ca0'
  outline-variant: '#4e4355'
  surface-tint: '#e3b5ff'
  primary: '#e3b5ff'
  on-primary: '#4d007a'
  primary-container: '#a020f0'
  on-primary-container: '#f9e8ff'
  inverse-primary: '#9000de'
  secondary: '#ffe2ab'
  on-secondary: '#402d00'
  secondary-container: '#ffbf00'
  on-secondary-container: '#6d5000'
  tertiary: '#00dbe9'
  on-tertiary: '#00363a'
  tertiary-container: '#00777f'
  on-tertiary-container: '#b7f8ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f3daff'
  primary-fixed-dim: '#e3b5ff'
  on-primary-fixed: '#2f004c'
  on-primary-fixed-variant: '#6e00ab'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#fbbc00'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#7df4ff'
  tertiary-fixed-dim: '#00dbe9'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  data-mono:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 40px
---

## Brand & Style
This design system is engineered for high-velocity desktop environments where data density and visual energy are paramount. It targets a technical audience—power users, security analysts, and developers—who require an interface that feels alive and responsive. 

The aesthetic is a fusion of **Glassmorphism** and **Technical Brutalism**. It prioritizes precision through sharp edges and high-contrast interactions, while maintaining a sense of depth through translucent, layered surfaces. The emotional response is one of total control, immersion, and high-performance urgency.

## Colors
The palette is anchored in a deep obsidian environment to maximize the luminance of neon accents. 

- **Primary (Neon Purple):** Used for primary actions, active states, and primary glow effects. It represents the "energy" of the system.
- **Secondary (Amber):** Reserved for warnings, critical data points, and secondary highlights. It provides a warm, high-contrast counterpoint to the purple.
- **Tertiary (Cyber Cyan):** Used sparingly for success states or supplemental data visualizations.
- **Neutral (Obsidian):** Various shades of near-black are used to create structural hierarchy without breaking the immersion of the dark environment.

## Typography
The typography strategy leverages **Space Grotesk** for its technical, geometric edge in headers, and **Inter** for legible, systematic body text. 

For all numerical data, code snippets, and system telemetry, a **Monospaced font stack** (system-default like JetBrains Mono or SF Mono) must be used to ensure tabular alignment and a "low-level" terminal aesthetic. Headers should always be bold to command attention against the vibrant background elements.

## Layout & Spacing
The design system utilizes a **12-column fluid grid** for desktop, optimized for ultra-wide displays. The spacing rhythm is strictly based on an **8px base unit**, ensuring mathematical precision in alignment. 

Layouts should favor high information density. Content containers are separated by 24px gutters. Use tight padding (12px - 16px) within glass cards to maintain a compact, high-energy feel. Margins are generous at the edges of the screen (40px) to frame the interface as a "HUD" (Heads-Up Display).

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Luminance** rather than traditional shadows. 

- **Tier 1 (Base):** Deep obsidian (#0A0A0B).
- **Tier 2 (Panels):** Translucent obsidian (80% opacity) with a 12px backdrop-blur. 
- **Tier 3 (Modals/Popovers):** Higher translucency (60% opacity) with a 20px backdrop-blur and a 1px solid neon purple border.

**Glowing Borders:** Use 1px inner or outer strokes with CSS `box-shadow` (spread: 2px, blur: 8px) in neon purple or amber to indicate focus or "on" states. Elements should appear as if they are emitting light from within the glass.

## Shapes
The shape language of this design system is defined by **Zero Radii**. Every element—buttons, cards, inputs, and windows—must have sharp, 90-degree corners. 

This creates a digital, aggressive, and engineered look that contrasts with the soft blur of the glassmorphic backgrounds. To soften the harshness of the sharp edges, use the 1px glowing strokes mentioned in the Elevation section to create a "light-leak" effect at the boundaries.

## Components
- **Buttons:** Sharp-edged boxes with a 1px amber border. On hover, the background fills with a neon purple gradient and the border glows. Use uppercase labels in Space Grotesk.
- **Glass Cards:** The primary container. Must feature a `backdrop-filter: blur(15px)` and a subtle 1px top-left highlight stroke to simulate a glass edge.
- **Inputs:** Minimalist bottom-border only or full sharp box with 10% opacity white fill. Focus state triggers a full amber glow border.
- **Data Tables:** High-density grids using monospaced typography. Row dividers are 1px semi-transparent obsidian. Active rows feature a neon purple left-accent bar (4px width).
- **Chips/Status Indicators:** Sharp rectangular tags. Use Amber for "Warning," Purple for "Active," and Cyan for "Standby."
- **Scrollbars:** Ultra-thin (4px), neon purple thumb with no track background, appearing only on interaction.