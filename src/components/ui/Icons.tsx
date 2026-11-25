import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
)

export const ArrowUp = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Stroke>
)

export const ArrowLeft = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Stroke>
)

export const ChevronLeft = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M15 19l-7-7 7-7" />
  </Stroke>
)

export const ChevronRight = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M9 5l7 7-7 7" />
  </Stroke>
)

export const ExternalLink = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M14 5h5v5M19 5l-8 8M11 7H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-4" />
  </Stroke>
)

export const Menu = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
)

export const Close = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Stroke>
)

export const Sun = (props: IconProps) => (
  <Stroke {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M5.6 18.4l1.1-1.1M17.3 6.7l1.1-1.1" />
  </Stroke>
)

export const Moon = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M20.4 15.4A9 9 0 018.6 3.6 9 9 0 1020.4 15.4z" />
  </Stroke>
)

export const Mail = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7.5l8.5 6 8.5-6" />
  </Stroke>
)

export const MapPin = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.900 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Stroke>
)

export const Search = (props: IconProps) => (
  <Stroke {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </Stroke>
)

export const Check = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Stroke>
)

export const Layers = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17.500l9 5 9-5" />
  </Stroke>
)

export const Plug = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0V8zM12 17v4" />
  </Stroke>
)

export const Sparkles = (props: IconProps) => (
  <Stroke {...props}>
    <path d="M10 4l1.6 4.400L16 10l-4.400 1.600L10 16l-1.600-4.400L4 10l4.400-1.600L10 4zM18 14l.9 2.100L21 17l-2.100.9L18 20l-.9-2.100L15 17l2.100-.9L18 14z" />
  </Stroke>
)

export const Server = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.500h.01" />
  </Stroke>
)

export const Play = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 5.500v13l11-6.500-11-6.500z" />
  </svg>
)

export const WhatsApp = (props: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M11.42 9.490c-.19-.09-1.100-.54-1.270-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.130 5.130 0 01-1.490-.92 5.250 5.250 0 01-1-1.290c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.390 1.390 0 00.18-.31.380.380 0 000-.33c0-.09-.42-1-.58-1.370s-.3-.32-.41-.32h-.4a.720.720 0 00-.5.23 2.100 2.100 0 00-.65 1.550A3.590 3.590 0 005 8.200 8.320 8.320 0 008.190 11c.44.19.78.3 1.050.39a2.530 2.530 0 001.170.07 1.930 1.930 0 001.260-.88 1.670 1.670 0 00.11-.88c-.05-.07-.17-.12-.36-.21z" />
    <path d="M13.290 2.680A7.360 7.360 0 008 .5a7.440 7.440 0 00-6.410 11.150l-1 3.850 3.940-1a7.400 7.400 0 003.550.9H8a7.440 7.440 0 005.290-12.720zM8 14.120a6.120 6.120 0 01-3.150-.87l-.22-.13-2.340.61.62-2.280-.14-.23a6.180 6.180 0 019.600-7.650 6.120 6.120 0 011.810 4.370A6.190 6.190 0 018 14.120z" />
  </svg>
)

export const GitHub = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.800 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.070 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.230a11.500 11.500 0 016.009 0c2.291-1.552 3.297-1.230 3.297-1.230.653 1.653.242 2.874.118 3.176.770.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

export const LinkedIn = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.900 1.637-1.850 3.370-1.850 3.601 0 4.267 2.370 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.200 24 24 23.227 24 22.271V1.729C24 .774 23.200 0 22.222 0h.003z" />
  </svg>
)

export const Instagram = (props: IconProps) => (
  <Stroke {...props}>
    <rect x="3.500" y="3.500" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.200 6.800h.01" />
  </Stroke>
)
