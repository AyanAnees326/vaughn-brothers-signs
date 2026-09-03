export const company = {
  name: 'The Vaughn Brothers',
  legal: 'The Vaughn Brothers Sign Co.',
  short: 'Vaughn Bros.',
  city: 'Houston, Texas',
  since: 1987,
  tagline: 'Built to be seen from the feeder road.',
  subline: 'Two brothers. One shop. Since 1987.',
  // Deliberate placeholders — example.com is IANA-reserved and 555 numbers are
  // the reserved fictional range, so nothing here can reach a real business.
  phone: '(555) 555-5555',
  email: 'hello@example.com',
  address: '1234 Example Street, Houston, TX 00000',
  hours: 'Mon–Fri 7a–5p · Saturdays by appointment',
}

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

/** Swatches for the hero neon builder. */
export const neonColors = [
  { name: 'Burnt Orange', value: '#ff7a2f' },
  { name: 'Ice Blue', value: '#4ad9ff' },
  { name: 'Hot Pink', value: '#ff3fa4' },
  { name: 'Cactus', value: '#8bff5a' },
  { name: 'Bourbon', value: '#ffc23f' },
  { name: 'Turquoise', value: '#2ee6c8' },
]

export const signFonts = [
  { id: 'block', label: 'Block', css: "'Rye', serif" },
  { id: 'script', label: 'Script', css: "'Pacifico', cursive" },
  { id: 'retro', label: 'Retro', css: "'Monoton', cursive" },
]

export const services = [
  {
    id: 'channel',
    title: 'Channel Letters',
    blurb:
      'Individually fabricated aluminum letters with LED illumination. The workhorse of Houston storefront signage.',
    specs: ['Front-lit / halo-lit', '.063 aluminum returns', 'UL-listed LED', '5-year warranty'],
  },
  {
    id: 'monument',
    title: 'Monument Signs',
    blurb:
      'Ground-level masonry and aluminum monuments that survive a Gulf Coast summer and a deed-restriction review.',
    specs: ['Masonry or fabricated', 'Engineered footings', 'Push-thru acrylic', 'ADA numbering'],
  },
  {
    id: 'pylon',
    title: 'Pylon & Pole Signs',
    blurb:
      'High-rise pylons built to be read at 65 mph from the frontage road. Wind-rated and sealed engineering included.',
    specs: ['Up to 60 ft', '140 mph wind rating', 'Multi-tenant cabinets', 'Sealed drawings'],
  },
  {
    id: 'blade',
    title: 'Blade & Projecting',
    blurb:
      'Perpendicular blade signs for walkable districts — the Heights, Montrose, EaDo, and downtown retail.',
    specs: ['Historic-district ready', 'Neon or LED', 'Custom brackets', 'Double-sided'],
  },
  {
    id: 'wraps',
    title: 'Vehicle Wraps & Fleet',
    blurb:
      'Full and partial wraps on cast vinyl. One truck on the Loop is a billboard that pays for its own gas.',
    specs: ['3M cast vinyl', 'Fleet color matching', 'Laminated 7-yr', 'In-house install bay'],
  },
  {
    id: 'led',
    title: 'LED Message Centers',
    blurb:
      'Programmable EMC displays with the pitch, permitting and brightness compliance sorted before install day.',
    specs: ['10mm–16mm pitch', 'Dimming compliance', 'Remote scheduling', 'Permit-first design'],
  },
]

export const process = [
  {
    id: 'design',
    step: '01',
    title: 'Design',
    lede: 'We measure the building, not a photo of it.',
    body: 'Site survey, elevation photos and scaled renderings so you see the sign on your actual facade before a sheet of aluminum gets cut. Two rounds of revisions come standard.',
    meta: ['Site survey', 'Scaled renderings', 'Two revisions'],
  },
  {
    id: 'permit',
    step: '02',
    title: 'Permit',
    lede: 'The part that sinks most sign projects.',
    body: 'City of Houston sign permits, deed-restriction and civic-association review, TxDOT setbacks on the highways, and sealed wind-load engineering to Gulf Coast standards. We file it, we track it, we deal with the corrections.',
    meta: ['City of Houston filing', 'Deed restrictions', '140 mph wind load', 'TxDOT setbacks'],
  },
  {
    id: 'fabricate',
    step: '03',
    title: 'Fabricate',
    lede: 'Built forty feet from where you are standing.',
    body: 'Everything is welded, painted and wired in our own shop. No white-labeling to an out-of-state fabricator, which is why we can still change something on a Thursday.',
    meta: ['In-house welding', 'Paint booth', 'UL-listed wiring'],
  },
  {
    id: 'install',
    step: '04',
    title: 'Install',
    lede: 'Crane, crew, and a final inspection.',
    body: 'Our own bucket trucks and crane crew, traffic control when the job needs it, and we stay on site until the city inspector signs off and the sign lights up.',
    meta: ['Own crane crew', 'Traffic control', 'Final inspection'],
  },
]

export const portfolio = [
  {
    id: 'rodeo',
    title: 'Rodeo Entrance Arch',
    client: 'Bayou Ranch Arena',
    type: 'Custom Structure',
    year: '2024',
    note: '38-foot welded steel arch with 1,400 bulbs, built for a three-week season and a 20-year lifespan.',
    palette: ['#c24a16', '#f0a04b'],
  },
  {
    id: 'icehouse',
    title: 'Neon Blade Sign',
    client: 'The Third Ward Icehouse',
    type: 'Blade / Neon',
    year: '2023',
    note: 'Hand-bent neon in three colors, mounted to a 1940s brick facade without touching the original masonry.',
    palette: ['#2a9d8f', '#4ad9ff'],
  },
  {
    id: 'bbq',
    title: 'Smokehouse Channel Letters',
    client: 'Pitmaster Row BBQ',
    type: 'Channel Letters',
    year: '2025',
    note: 'Halo-lit letters on a reclaimed cedar raceway. Reads clean at noon and at midnight.',
    palette: ['#a9762f', '#e2652c'],
  },
  {
    id: 'dealer',
    title: '52 ft Highway Pylon',
    client: 'Gulf Freeway Truck Center',
    type: 'Pylon',
    year: '2024',
    note: 'Double-faced cabinet on a single pole, engineered and sealed for 140 mph, visible from I-45 both directions.',
    palette: ['#17150f', '#c24a16'],
  },
  {
    id: 'honky',
    title: 'Marquee Restoration',
    client: 'The Lone Pine Saloon',
    type: 'Restoration',
    year: '2023',
    note: 'Original 1958 marquee rebuilt with the chase-bulb pattern intact and modern wiring behind it.',
    palette: ['#ff3fa4', '#ffc23f'],
  },
  {
    id: 'taqueria',
    title: 'Storefront Package',
    client: 'Eastside Taquería',
    type: 'Full Package',
    year: '2025',
    note: 'Blade sign, window vinyl, menu boards and a wrapped taco truck. One shop, one look.',
    palette: ['#e2652c', '#b8ff3c'],
  },
  {
    id: 'medical',
    title: 'Campus Wayfinding',
    client: 'Third Coast Medical Plaza',
    type: 'Wayfinding / ADA',
    year: '2024',
    note: 'Forty-two ADA-compliant interior and exterior signs on one consistent system.',
    palette: ['#2a9d8f', '#f5f1e8'],
  },
  {
    id: 'brewery',
    title: 'Rooftop Monument',
    client: 'Buffalo Bayou Brewing',
    type: 'Monument',
    year: '2022',
    note: 'Weathering-steel monument that is meant to rust, engineered so only the skin does.',
    palette: ['#a9762f', '#c24a16'],
  },
]

export const stats = [
  { value: 38, suffix: '', label: 'Years in business' },
  { value: 4200, suffix: '+', label: 'Signs built and installed' },
  { value: 140, suffix: ' mph', label: 'Wind rating, standard' },
  { value: 100, suffix: '%', label: 'Fabricated in-house' },
]

export const testimonials = [
  {
    quote:
      'They caught a deed restriction our last sign company missed entirely. That one phone call saved us from tearing down a monument we had already paid for.',
    name: 'Marisol Reyes',
    role: 'Owner, Eastside Taquería',
  },
  {
    quote:
      'The permit sat with the city for eleven weeks. Somebody from the Vaughn shop called me every single Friday with an update, even the weeks the update was nothing.',
    name: 'Dwight Okafor',
    role: 'GM, Gulf Freeway Truck Center',
  },
  {
    quote:
      'Our marquee is from 1958 and half of it was held together with hope. They rebuilt it without making it look rebuilt. Regulars did not notice, which is the whole point.',
    name: 'Carla Benavides',
    role: 'Proprietor, The Lone Pine Saloon',
  },
]

export const trustNames = [
  'Bayou Ranch Arena',
  'Pitmaster Row BBQ',
  'Third Ward Icehouse',
  'Gulf Freeway Truck Center',
  'Lone Pine Saloon',
  'Eastside Taquería',
  'Buffalo Bayou Brewing',
  'Third Coast Medical',
]

/* ---- Quote form options -------------------------------------------------- */

export const signTypeOptions = [
  { id: 'channel', label: 'Channel Letters' },
  { id: 'monument', label: 'Monument' },
  { id: 'pylon', label: 'Pylon / Pole' },
  { id: 'blade', label: 'Blade / Projecting' },
  { id: 'wrap', label: 'Vehicle Wrap' },
  { id: 'led', label: 'LED Message Center' },
  { id: 'window', label: 'Window & Vinyl' },
  { id: 'ada', label: 'Wayfinding / ADA' },
]

export const illuminationOptions = [
  { id: 'front', label: 'Front-lit' },
  { id: 'halo', label: 'Halo-lit' },
  { id: 'none', label: 'Non-illuminated' },
  { id: 'unsure', label: 'Not sure yet' },
]

export const propertyTypeOptions = [
  { id: 'retail', label: 'Retail storefront' },
  { id: 'freestanding', label: 'Freestanding building' },
  { id: 'multitenant', label: 'Multi-tenant center' },
  { id: 'vehicle', label: 'Vehicle / fleet' },
  { id: 'event', label: 'Event or temporary' },
]

export const timelineOptions = [
  { id: 'asap', label: 'ASAP' },
  { id: '1-3', label: '1–3 months' },
  { id: '3-6', label: '3–6 months' },
  { id: 'pricing', label: 'Just pricing' },
]

export const budgetOptions = [
  { id: 'u5', label: 'Under $5k' },
  { id: '5-15', label: '$5–15k' },
  { id: '15-50', label: '$15–50k' },
  { id: '50p', label: '$50k+' },
  { id: 'unsure', label: 'Not sure' },
]

export const contactMethodOptions = [
  { id: 'call', label: 'Call' },
  { id: 'text', label: 'Text' },
  { id: 'email', label: 'Email' },
]
