'use client';

import { Link } from '@/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Search, Home as HomeIcon, Key, ShieldCheck, Globe, Landmark,
  ChevronDown, ChevronUp, MapPin, Bed, Euro, ArrowRight,
  TrendingUp, MessageSquare, CheckCircle2, Building2, Users
} from 'lucide-react';

/* ─────────── types ─────────── */
interface Listing {
  id: number;
  title: string;
  price?: number;
  bedrooms?: number;
  area?: number;
  address?: string;
  city?: string;
  status: string;
  listing_type?: 'sale' | 'rent';
  image_url?: string;
  featured: boolean;
}

/* ─────────── status & listing styles ─────────── */
const statusStyles: Record<string, string> = {
  available: 'bg-emerald-50/90 text-emerald-700 backdrop-blur-sm',
  'under-consideration': 'bg-amber-50/90 text-amber-700 backdrop-blur-sm',
  sold: 'bg-stone-100/90 text-warm-gray backdrop-blur-sm',
  rented: 'bg-blue-50/90 text-blue-700 backdrop-blur-sm',
};

const listingTypeStyles: Record<string, string> = {
  sale: 'bg-brass/15 text-brass-dark backdrop-blur-sm',
  rent: 'bg-stone-200/80 text-warm-gray backdrop-blur-sm',
};

const listingTypeLabels: Record<string, Record<string, string>> = {
  en: { sale: 'For Sale', rent: 'For Rent' },
  nl: { sale: 'Te Koop', rent: 'Te Huur' },
};

const statusLabels: Record<string, Record<string, string>> = {
  en: {
    available: 'Available',
    'under-consideration': 'Under Consideration',
    sold: 'Sold',
    rented: 'Rented',
  },
  nl: {
    available: 'Beschikbaar',
    'under-consideration': 'In Onderhandeling',
    sold: 'Verkocht',
    rented: 'Verhuurd',
  },
};

/* ─────────── scroll-reveal hook ─────────── */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─────────── count-up hook ─────────── */
function useCountUp(end: number, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(
    (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [end, duration]
  );

  useEffect(() => {
    if (inView) {
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, animate]);

  return count;
}

/* ─────────── content ─────────── */
const content = {
  en: {
    heroSubtitle: 'Amsterdam, Het Gooi & De Vechtstreek · Since 2000',
    heroTitle: 'Your next home, well found',
    heroLead: 'Finding a home begins with looking closely.',
    heroDescription: 'For more than 25 years we have guided people to the place that fits, from canal houses in Amsterdam to villas in Het Gooi, and now throughout the Netherlands.',
    viewProperties: 'View Portfolio',
    getInTouch: 'Get in Touch',
    searchPlaceholder: 'Search by neighbourhood or address...',
    searchBuy: 'Buy',
    searchRent: 'Rent',
    searchType: 'Type',
    searchBedrooms: 'Beds',
    searchPrice: 'Price',
    searchBtn: 'Search',
    allTypes: 'All Types',
    allBedrooms: 'Any',
    allPrices: 'Any Price',
    valuationEyebrow: 'Thinking of selling?',
    valuationTitle: "What's your home worth?",
    valuationAssetLine: 'Your property is more than a home. It is your most important asset.',
    valuationDesc: 'Get a free, no-obligation valuation from agents who know the Amsterdam, Gooi and Vecht markets inside out. We will reply within 24 hours with honest numbers.',
    valuationAddress: 'Your address',
    valuationEmail: 'Your email',
    valuationBtn: 'Get My Valuation',
    valuationTrust: 'No spam. No pressure. Just honest numbers.',
    servicesEyebrow: 'What we offer',
    servicesTitle: 'Our services',
    heritageEyebrow: 'Rooted in Amsterdam, Het Gooi, the Vechtstreek and beyond',
    heritageTitle: 'Twenty-five years deeply rooted in the Netherlands’ most sought-after places to live',
    heritageDesc: 'A house is more than bricks, space and an address. It is the place where your life unfolds. We know not only the streets and neighbourhoods, but the stories behind them, and the value they carry. Since 2000 we have guided clients in the purchase, sale and letting of distinguished property in Amsterdam, Het Gooi and the Vechtstreek, and beyond: throughout the Netherlands and abroad. Discretion, care and precision are central. Not quick deals, but considered decisions that fit your life. Our office on Leliegracht has long been the starting point for people looking for more than a house: a place that feels right.',
    yearsExp: 'Years on the Market',
    regions: 'Regions We Serve',
    transactions: 'Properties Sold & Let',
    readStory: 'Discover Our Story',
    portfolioEyebrow: 'Hand-picked listings',
    portfolioTitle: 'Properties we like',
    viewAll: 'View Full Portfolio',
    whyEyebrow: 'Why owners trust us',
    whyTitle: 'The difference local knowledge makes',
    whyDesc: 'There are faster ways to sell a house and cheaper agents to hire. But we think finding or selling a home deserves more than a quick transaction. We take the time to understand what you actually need.',
    whyAccess: 'Access to Off-Market Homes',
    whyAccessDesc: 'In Amsterdam, Het Gooi and the Vechtstreek, some of the best properties never make it to the public portals. After twenty-five years, we know the owners, the developers, and the landlords who prefer discretion.',
    whyIntl: 'International Reach, Local Roots',
    whyIntlDesc: 'We speak English and Dutch, and we work with buyers and sellers from around the world. Whether you are relocating from London, Singapore or Berlin, we make the Dutch property system feel straightforward.',
    whyHistoric: 'Expertise in Historic Homes',
    whyHistoricDesc: 'Canal houses, monuments, and period villas have their own rules. We know the difference between a protected facade and a full monument status, and we will tell you exactly what maintenance and renovation really costs.',
    faqEyebrow: 'Questions before you start',
    faqTitle: 'What people usually ask',
    faq: [
      { q: 'How long does it take to sell a property in Amsterdam, Het Gooi or the Vechtstreek?', a: 'Most properties sell within 4 to 12 weeks, depending on price, location, and market conditions. We price honestly from day one, using our deep knowledge of the Amsterdam, Gooi and Vecht markets, so you do not sit unsold for months.' },
      { q: 'Do you work with international buyers and sellers?', a: 'Absolutely. Around 40% of our clients come from outside the Netherlands. We handle the paperwork, introduce you to mortgage advisors who understand international income, and guide you through the notary process step by step.' },
      { q: 'What fees should I expect when selling?', a: 'Our commission is competitive and fully transparent. Before you sign anything, we give you a complete breakdown: no hidden costs, no surprise charges at the notary, and no vague estimates.' },
      { q: 'Can you help me find a rental before I move?', a: 'Yes. We maintain relationships with landlords across Amsterdam, Het Gooi and the Vechtstreek. We can arrange virtual viewings, short-term options, and even introduce you to relocation services if you are moving from abroad.' },
      { q: 'Do you manage rental properties for owners?', a: 'We do. From finding the right tenants to handling maintenance, rent collection, and legal compliance, we treat your property as if it were our own. Many of our landlord clients have been with us for over a decade.' },
    ],
    finalCtaTitle: "Let's talk about your next move",
    finalCtaDesc: 'Buying, selling, renting, or just curious about the market in Amsterdam, Het Gooi or the Vechtstreek? Come by our office on Leliegracht for a coffee. No pitch, no pressure. Just an honest conversation with people who know these markets properly.',
    finalCtaBtn: 'Come Say Hello',
    finalCtaSell: 'Or list your property',
    finalCtaSellBtn: 'Get a Free Valuation',
  },
  nl: {
    heroSubtitle: 'Amsterdam, Het Gooi & De Vechtstreek · Sinds 2000',
    heroTitle: 'Uw volgende thuis goed gevonden',
    heroLead: 'Een thuis vinden begint met goed kijken.',
    heroDescription: 'Al meer dan 25 jaar begeleiden wij mensen naar de plek die past, van een grachtenpand in Amsterdam tot een villa in het Gooi, en inmiddels door heel Nederland.',
    viewProperties: 'Bekijk Portfolio',
    getInTouch: 'Neem Contact Op',
    searchPlaceholder: 'Zoek op buurt of adres...',
    searchBuy: 'Kopen',
    searchRent: 'Huren',
    searchType: 'Type',
    searchBedrooms: 'Slaapkamers',
    searchPrice: 'Prijs',
    searchBtn: 'Zoeken',
    allTypes: 'Alle Types',
    allBedrooms: 'Alle',
    allPrices: 'Alle Prijzen',
    valuationEyebrow: 'Overweegt u te verkopen?',
    valuationTitle: 'Wat is uw huis waard?',
    valuationAssetLine: 'Uw woning is meer dan een thuis. Het is uw belangrijkste bezit.',
    valuationDesc: 'Ontvang een gratis, vrijblijvende taxatie van makelaars die de markten van Amsterdam, Het Gooi en de Vechtstreek door en door kennen. We reageren binnen 24 uur met eerlijke cijfers.',
    valuationAddress: 'Uw adres',
    valuationEmail: 'Uw e-mail',
    valuationBtn: 'Vraag Taxatie Aan',
    valuationTrust: 'Geen spam. Geen druk. Gewoon eerlijke cijfers.',
    servicesEyebrow: 'Wat wij bieden',
    servicesTitle: 'Onze diensten',
    heritageEyebrow: 'Verankerd in Amsterdam, Het Gooi, Vechtstreek e.o.',
    heritageTitle: 'Al vijfentwintig jaar diepgeworteld in de meest gewilde woongebieden van Nederland',
    heritageDesc: 'Een huis is meer dan stenen, ruimte en een adres. Het is de plek waar uw leven zich afspeelt. We kennen niet alleen de straten en buurten, maar ook de verhalen erachter, en de waarde die ze dragen. Sinds 2000 begeleiden wij cliënten bij de aankoop, verkoop en verhuur van exclusief vastgoed in Amsterdam, Het Gooi, de Vechtstreek, en daarbuiten: in geheel Nederland en internationaal. Discretie, aandacht en precisie staan daarbij centraal. Geen snelle deals, maar doordachte beslissingen die passen bij uw leven. Ons kantoor aan de Leliegracht is al jaren het vertrekpunt voor mensen die zoeken naar meer dan een woning: een plek die klopt.',
    yearsExp: 'Jaar op de Markt',
    regions: 'Regio\'s die Wij Bedienen',
    transactions: 'Woningen Verkocht & Verhuurd',
    readStory: 'Ontdek Ons Verhaal',
    portfolioEyebrow: 'Zorgvuldig geselecteerd',
    portfolioTitle: 'Woningen die we mooi vinden',
    viewAll: 'Bekijk Volledig Portfolio',
    whyEyebrow: 'Waarom eigenaren ons vertrouwen',
    whyTitle: 'Het verschil dat lokale kennis maakt',
    whyDesc: 'Er zijn snellere manieren om een huis te verkopen en goedkopere makelaars te vinden. Maar een huis kopen of verkopen verdient meer dan een snelle transactie. We nemen de tijd om te begrijpen wat u écht nodig hebt.',
    whyAccess: 'Toegang Tot Off-Market Woningen',
    whyAccessDesc: 'In Amsterdam, Het Gooi en de Vechtstreek komen sommige van de beste woningen nooit op de openbare portals. Na vijfentwintig jaar kennen we de eigenaren, de ontwikkelaars, en de verhuurders die discretie verkiezen.',
    whyIntl: 'Internationaal Bereik, Lokale Wortels',
    whyIntlDesc: 'We spreken Nederlands en Engels, en werken met kopers en verkopers van over de hele wereld. Of u nu verhuist vanuit Londen, Singapore of Berlijn, we maken het Nederlandse vastgoedsysteem begrijpelijk.',
    whyHistoric: 'Expertise in Monumentale Panden',
    whyHistoricDesc: 'Grachtenpanden, monumenten en villa\'s uit een eerdere tijd hebben hun eigen regels. We kennen het verschil tussen een beschermd gezicht en een volledig monument, en we vertellen u precies wat onderhoud en renovatie echt kost.',
    faqEyebrow: 'Vragen voordat u begint',
    faqTitle: 'Wat mensen ons meestal vragen',
    faq: [
      { q: 'Hoe lang duurt het om een woning te verkopen in Amsterdam, Het Gooi of de Vechtstreek?', a: 'De meeste woningen worden binnen 4 tot 12 weken verkocht, afhankelijk van prijs, locatie en marktomstandigheden. We hanteren vanaf dag één een eerlijke vraagprijs, op basis van onze diepe kennis van de markten in Amsterdam, Het Gooi en de Vechtstreek, zodat u niet maandenlang onverkocht blijft staan.' },
      { q: 'Werken jullie met internationale kopers en verkopers?', a: 'Zeker. Ongeveer 40% van onze klanten komt van buiten Nederland. We regelen de papierwinkel, introduceren u bij hypotheekadviseurs die internationaal inkomen begrijpen, en begeleiden u stap voor stap door het notarisproces.' },
      { q: 'Welke kosten kan ik verwachten bij verkoop?', a: 'Onze courtage is concurrerend en volledig transparant. Voordat u iets ondertekent geven we u een volledig overzicht: geen verborgen kosten, geen verrassingen bij de notaris, en geen vaag geraamte.' },
      { q: 'Kunnen jullie helpen met een huurwoning vóórdat ik verhuis?', a: 'Ja. We onderhouden relaties met verhuurders door heel Amsterdam, Het Gooi en de Vechtstreek. We kunnen virtuele bezichtigingen, tijdelijke opties en zelfs relocatiediensten regelen als u vanuit het buitenland verhuist.' },
      { q: 'Beheren jullie ook verhuurwoningen voor eigenaren?', a: 'Dat doen we. Van het vinden van de juiste huurders tot onderhoud, huurincasso en juridische compliance: we behandelen uw woning alsof het onze eigen is. Veel van onze verhuurders zijn al meer dan tien jaar bij ons.' },
    ],
    finalCtaTitle: 'Laten we praten over uw volgende stap',
    finalCtaDesc: 'Kopen, verkopen, huren, of gewoon benieuwd naar de markt in Amsterdam, Het Gooi of de Vechtstreek? Kom langs bij ons kantoor aan de Leliegracht voor een kop koffie. Geen verkooppraatje, geen druk. Gewoon een eerlijk gesprek met mensen die deze markten echt kennen.',
    finalCtaBtn: 'Kom Eens Langs',
    finalCtaSell: 'Of verkoop uw woning',
    finalCtaSellBtn: 'Gratis Taxatie Aanvragen',
  },
};

/* ─────────── service icons (unique per card) ─────────── */
const serviceIcons = [
  { Icon: HomeIcon, label: 'buying' },
  { Icon: Key, label: 'selling' },
  { Icon: Building2, label: 'renting' },
  { Icon: ShieldCheck, label: 'leasing' },
  { Icon: Landmark, label: 'property-management' },
  { Icon: Globe, label: 'expat-services' },
];

/* ─────────── main component ─────────── */
export default function Home() {
  const pathname = usePathname();
  const locale = (pathname.split('/')[1] || 'en') as 'en' | 'nl';
  const t = content[locale] || content.en;
  const statusLabelsLocale = statusLabels[locale] || statusLabels.en;

  const [featuredProperties, setFeaturedProperties] = useState<Listing[]>([]);

  /* search state */
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'sale' | 'rent'>('all');
  const [searchPropertyType, setSearchPropertyType] = useState('all');
  const [searchBeds, setSearchBeds] = useState('all');
  const [searchPrice, setSearchPrice] = useState('all');

  /* valuation state */
  const [valAddress, setValAddress] = useState('');
  const [valEmail, setValEmail] = useState('');
  const [valSubmitted, setValSubmitted] = useState(false);
  const [valSubmitting, setValSubmitting] = useState(false);
  const [valError, setValError] = useState('');

  /* FAQ state */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* scroll reveal refs */
  const heroRef = useInView<HTMLDivElement>(0.1);
  const searchRef = useInView<HTMLDivElement>(0.1);
  const valRef = useInView<HTMLDivElement>(0.15);
  const servicesRef = useInView<HTMLDivElement>(0.1);
  const heritageRef = useInView<HTMLDivElement>(0.1);
  const statsRef = useInView<HTMLDivElement>(0.3);
  const portfolioRef = useInView<HTMLDivElement>(0.1);
  const whyRef = useInView<HTMLDivElement>(0.1);
  const faqRef = useInView<HTMLDivElement>(0.1);
  const finalCtaRef = useInView<HTMLDivElement>(0.1);

  /* counters */
  const yearsCount = useCountUp(25, 2000, statsRef.inView);

  /* fetch featured properties */
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();
        if (!response.ok || !Array.isArray(data)) return;
        const featured = data
          .filter((p: Listing) => p.featured)
          .slice(0, 3);
        if (featured.length > 0) setFeaturedProperties(featured);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      }
    };
    fetchFeatured();
  }, []);

  /* search handler */
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (searchType !== 'all') params.set('type', searchType);
    if (searchPropertyType !== 'all') params.set('property', searchPropertyType);
    if (searchBeds !== 'all') params.set('beds', searchBeds);
    if (searchPrice !== 'all') params.set('price', searchPrice);
    window.location.href = `/properties?${params.toString()}`;
  };

  /* valuation handler */
  const handleValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valAddress || !valEmail || valSubmitting) return;

    setValSubmitting(true);
    setValError('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Valuation request',
          email: valEmail,
          message: `Valuation request for: ${valAddress}`,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as { error?: string })?.error || 'Failed to submit valuation');
      }

      setValSubmitted(true);
      setTimeout(() => {
        setValSubmitted(false);
        setValAddress('');
        setValEmail('');
      }, 4000);
    } catch (error) {
      console.error('Error submitting valuation request:', error);
      setValError('Something went wrong. Please try again.');
    } finally {
      setValSubmitting(false);
    }
  };

  const revealClass = (inView: boolean) =>
    `transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  return (
    <div className="min-h-screen">
      <link rel="preload" as="image" href="/hakkenbroek-home.webp" type="image/webp" />
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        id="nav-sentinel"
        ref={heroRef.ref}
        className="relative overflow-hidden lg:overflow-visible"
      >
        <div className="relative flex flex-col lg:flex-row lg:min-h-[760px] xl:min-h-[820px] xl:h-[92vh]">
          {/* Left: full-bleed image with atmospheric gradient */}
          <div className="relative w-full lg:w-[52%] h-[48vh] sm:h-[54vh] md:h-[62vh] lg:h-auto">
            <img
              src="/hakkenbroek-home.webp"
              alt="Elegant Amsterdam interior with green velvet sofa and natural light"
              width="1444"
              height="1696"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent md:hidden" />
          </div>

          {/* Right: content */}
          <div className="relative w-full lg:w-[48%] bg-stone-50 flex items-center">
            {/* subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative px-8 pt-12 pb-16 md:px-10 md:pt-16 md:pb-14 lg:px-12 lg:pt-32 lg:pb-28 xl:px-14 xl:pt-36 xl:pb-32 max-w-[36rem]">
              <p
                className={`font-body text-xs uppercase tracking-[0.2em] text-brass mb-6 ${revealClass(heroRef.inView)}`}
                style={{ transitionDelay: '100ms' }}
              >
                {t.heroSubtitle}
              </p>
              <h1
                className={`font-display text-4xl md:text-[3rem] lg:text-[3.2rem] xl:text-[3.55rem] leading-[1.06] text-charcoal mb-5 ${revealClass(heroRef.inView)}`}
                style={{ transitionDelay: '200ms' }}
              >
                {t.heroTitle}
              </h1>
              <p
                className={`font-body text-lg md:text-xl text-charcoal leading-snug mb-5 max-w-[32rem] ${revealClass(heroRef.inView)}`}
                style={{ transitionDelay: '250ms' }}
              >
                {t.heroLead}
              </p>
              <p
                className={`font-body text-base text-warm-gray leading-relaxed mb-8 max-w-[30rem] ${revealClass(heroRef.inView)}`}
                style={{ transitionDelay: '300ms' }}
              >
                {t.heroDescription}
              </p>
              <div
                className={`flex flex-wrap gap-4 ${revealClass(heroRef.inView)}`}
                style={{ transitionDelay: '350ms' }}
              >
                <Link
                  href={`/properties`}
                  className="inline-flex items-center gap-2 bg-brass text-white px-8 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-brass-light hover:scale-[1.02] transition-all duration-300 rounded-sm"
                >
                  {t.viewProperties}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/contact`}
                  className="inline-flex items-center gap-2 border border-charcoal text-charcoal px-8 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all duration-300 rounded-sm"
                >
                  {t.getInTouch}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search module — inline below hero on laptop/tablet, overlapping only on wide desktop */}
        <div
          ref={searchRef.ref}
          className={`relative z-10 mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:mt-6 lg:px-8 xl:-mt-12 ${revealClass(searchRef.inView)}`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="bg-white border border-stone-200 shadow-xl shadow-stone-900/5 px-5 py-5 lg:px-8 lg:py-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.35fr)_auto_minmax(180px,0.9fr)_minmax(120px,0.6fr)_minmax(140px,0.7fr)_auto] xl:items-stretch">
              {/* Query */}
              <div className="relative md:col-span-2 xl:col-span-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 font-body text-sm text-ink placeholder:text-stone-400 focus:outline-none focus:border-brass transition-colors"
                />
              </div>

              {/* Type toggle */}
              <div className="flex w-full border border-stone-200">
                <button
                  onClick={() => setSearchType('all')}
                  className={`flex-1 px-4 py-3 font-body text-xs uppercase tracking-wider text-center transition-colors ${searchType === 'all' ? 'bg-charcoal text-white' : 'bg-stone-50 text-warm-gray hover:text-ink'}`}
                >
                  {locale === 'nl' ? 'Alles' : 'All'}
                </button>
                <button
                  onClick={() => setSearchType('sale')}
                  className={`flex-1 px-4 py-3 font-body text-xs uppercase tracking-wider text-center transition-colors ${searchType === 'sale' ? 'bg-charcoal text-white' : 'bg-stone-50 text-warm-gray hover:text-ink'}`}
                >
                  {t.searchBuy}
                </button>
                <button
                  onClick={() => setSearchType('rent')}
                  className={`flex-1 px-4 py-3 font-body text-xs uppercase tracking-wider text-center transition-colors ${searchType === 'rent' ? 'bg-charcoal text-white' : 'bg-stone-50 text-warm-gray hover:text-ink'}`}
                >
                  {t.searchRent}
                </button>
              </div>

              {/* Property type */}
              <div className="relative xl:min-w-[160px]">
                <select
                  value={searchPropertyType}
                  onChange={(e) => setSearchPropertyType(e.target.value)}
                  aria-label={t.searchType}
                  className="w-full appearance-none px-4 py-3 pr-10 bg-stone-50 border border-stone-200 font-body text-sm text-ink focus:outline-none focus:border-brass transition-colors"
                >
                  <option value="all">{t.allTypes}</option>
                  <option value="apartment">{locale === 'nl' ? 'Appartement' : 'Apartment'}</option>
                  <option value="house">{locale === 'nl' ? 'Huis' : 'House'}</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="villa">Villa</option>
                  <option value="loft">Loft</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
              </div>

              {/* Bedrooms */}
              <div className="relative xl:min-w-[120px]">
                <select
                  value={searchBeds}
                  onChange={(e) => setSearchBeds(e.target.value)}
                  aria-label={t.searchBedrooms}
                  className="w-full appearance-none px-4 py-3 pr-10 bg-stone-50 border border-stone-200 font-body text-sm text-ink focus:outline-none focus:border-brass transition-colors"
                >
                  <option value="all">{t.searchBedrooms}</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
                <Bed className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
              </div>

              {/* Price */}
              <div className="relative xl:min-w-[140px]">
                <select
                  value={searchPrice}
                  onChange={(e) => setSearchPrice(e.target.value)}
                  aria-label={t.searchPrice}
                  className="w-full appearance-none px-4 py-3 pr-10 bg-stone-50 border border-stone-200 font-body text-sm text-ink focus:outline-none focus:border-brass transition-colors"
                >
                  <option value="all">{t.searchPrice}</option>
                  <option value="500000">€500k</option>
                  <option value="1000000">€1M</option>
                  <option value="2000000">€2M</option>
                  <option value="3000000">€3M+</option>
                </select>
                <Euro className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="inline-flex w-full md:col-span-2 xl:col-span-1 items-center justify-center gap-2 bg-charcoal text-white px-8 py-3 font-body text-sm uppercase tracking-wider hover:bg-ink hover:scale-[1.02] transition-all duration-300 rounded-sm xl:min-w-[140px]"
              >
                <Search className="w-4 h-4" />
                {t.searchBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for floating search bar on desktop */}
      <div className="hidden xl:block h-16" />

      {/* anchor for valuation scroll */}
      <div id="valuation-section" className="scroll-mt-24" />

      {/* ═══════════════════ VALUATION CTA ═══════════════════ */}
      <section ref={valRef.ref} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-earth overflow-hidden">
            {/* atmospheric glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brass/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brass/5 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
              <div>
                <p
                  className={`font-body text-xs uppercase tracking-[0.2em] text-stone-300 mb-4 ${revealClass(valRef.inView)}`}
                  style={{ transitionDelay: '100ms' }}
                >
                  {t.valuationEyebrow}
                </p>
                <h2
                  className={`font-display text-3xl md:text-4xl lg:text-[2.75rem] text-white mb-5 leading-[1.15] ${revealClass(valRef.inView)}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  {t.valuationTitle}
                </h2>
                <p
                  className={`text-stone-100/90 leading-relaxed max-w-md mb-4 ${revealClass(valRef.inView)}`}
                  style={{ transitionDelay: '250ms' }}
                >
                  {t.valuationAssetLine}
                </p>
                <p
                  className={`text-stone-100/80 leading-relaxed max-w-md ${revealClass(valRef.inView)}`}
                  style={{ transitionDelay: '300ms' }}
                >
                  {t.valuationDesc}
                </p>
                <div
                  className={`flex items-center gap-2 mt-6 text-stone-100/70 text-sm ${revealClass(valRef.inView)}`}
                  style={{ transitionDelay: '400ms' }}
                >
                  <CheckCircle2 className="w-4 h-4 text-stone-100/90" />
                  {t.valuationTrust}
                </div>
              </div>

              <form onSubmit={handleValuation} className="space-y-4">
                <div
                  className={`relative ${revealClass(valRef.inView)}`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-100/70" />
                  <input
                    type="text"
                    required
                    placeholder={t.valuationAddress}
                    value={valAddress}
                    onChange={(e) => setValAddress(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.08] border border-white/20 text-white placeholder:text-stone-100/55 font-body text-sm focus:outline-none focus:border-white/35 transition-colors"
                  />
                </div>
                <div
                  className={`relative ${revealClass(valRef.inView)}`}
                  style={{ transitionDelay: '300ms' }}
                >
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-100/70" />
                  <input
                    type="email"
                    required
                    placeholder={t.valuationEmail}
                    value={valEmail}
                    onChange={(e) => setValEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.08] border border-white/20 text-white placeholder:text-stone-100/55 font-body text-sm focus:outline-none focus:border-white/35 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full inline-flex items-center justify-center gap-2 bg-brass text-white px-8 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light hover:scale-[1.01] transition-all duration-300 rounded-sm ${revealClass(valRef.inView)}`}
                  style={{ transitionDelay: '400ms' }}
                  disabled={valSubmitting}
                >
                  {valSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      {locale === 'nl' ? 'Verzonden!' : 'Sent!'}
                    </>
                  ) : (
                    <>
                      {t.valuationBtn}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                {valError ? (
                  <p className="text-sm text-rose-200">{valError}</p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES BENTO ═══════════════════ */}
      <section ref={servicesRef.ref} className="py-20 lg:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p
              className={`font-body text-xs uppercase tracking-[0.2em] text-brass mb-4 ${revealClass(servicesRef.inView)}`}
            >
              {t.servicesEyebrow}
            </p>
            <h2
              className={`font-display text-3xl md:text-4xl lg:text-[2.75rem] text-charcoal leading-[1.15] ${revealClass(servicesRef.inView)}`}
              style={{ transitionDelay: '100ms' }}
            >
              {t.servicesTitle}
            </h2>
          </div>

          {/* Bento grid: 4 columns, 3 rows — zero gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Buying — 2x2 hero card */}
            <Link
              href={`/buying`}
              className={`group sm:col-span-2 sm:row-span-2 relative bg-white border border-stone-200 p-8 lg:p-10 hover:border-brass transition-all duration-500 flex flex-col justify-between min-h-[320px] ${revealClass(servicesRef.inView)}`}
              style={{ transitionDelay: '150ms' }}
            >
              <div>
                <div className="w-12 h-12 flex items-center justify-center border border-stone-200 group-hover:border-brass group-hover:bg-brass/5 transition-all duration-300 mb-6">
                  <HomeIcon className="w-5 h-5 text-charcoal group-hover:text-brass transition-colors" />
                </div>
                <h3 className="font-display text-2xl lg:text-3xl text-charcoal mb-3 group-hover:text-brass transition-colors">
                  {locale === 'nl' ? 'Kopen' : 'Buying'}
                </h3>
                <p className="text-warm-gray leading-relaxed max-w-sm">
                  {locale === 'nl'
                    ? 'Exclusieve toegang tot off-market woningen, strategische onderhandeling en volledige discretie, van eerste consult tot sleuteloverdracht.'
                    : 'Exclusive access to off-market homes, strategic negotiation, and complete discretion, from first consultation to key transfer.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-charcoal group-hover:text-brass transition-colors mt-6">
                <span className="font-body text-xs uppercase tracking-wider">
                  {locale === 'nl' ? 'Meer info' : 'Learn more'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Selling */}
            <Link
              href={`/selling`}
              className={`group relative bg-white border border-stone-200 p-6 lg:p-8 hover:border-brass transition-all duration-500 flex flex-col justify-between min-h-[150px] ${revealClass(servicesRef.inView)}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div>
                <div className="w-10 h-10 flex items-center justify-center border border-stone-200 group-hover:border-brass group-hover:bg-brass/5 transition-all duration-300 mb-4">
                  <Key className="w-4 h-4 text-charcoal group-hover:text-brass transition-colors" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-2 group-hover:text-brass transition-colors">
                  {locale === 'nl' ? 'Verkopen' : 'Selling'}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {locale === 'nl'
                    ? 'Zorgvuldige positionering, discrete bezichtigingen, de juiste koper.'
                    : 'Careful positioning, private viewings, the right buyer.'}
                </p>
              </div>
            </Link>

            {/* Renting */}
            <Link
              href={`/services/renting`}
              className={`group relative bg-white border border-stone-200 p-6 lg:p-8 hover:border-brass transition-all duration-500 flex flex-col justify-between min-h-[150px] ${revealClass(servicesRef.inView)}`}
              style={{ transitionDelay: '250ms' }}
            >
              <div>
                <div className="w-10 h-10 flex items-center justify-center border border-stone-200 group-hover:border-brass group-hover:bg-brass/5 transition-all duration-300 mb-4">
                  <Building2 className="w-4 h-4 text-charcoal group-hover:text-brass transition-colors" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-2 group-hover:text-brass transition-colors">
                  {locale === 'nl' ? 'Huren' : 'Renting'}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {locale === 'nl'
                    ? 'Huurwoningen die echt fijn zijn om in te wonen.'
                    : 'Rental properties you actually want to live in.'}
                </p>
              </div>
            </Link>

            {/* Leasing */}
            <Link
              href={`/services/leasing`}
              className={`group relative bg-white border border-stone-200 p-6 lg:p-8 hover:border-brass transition-all duration-500 flex flex-col justify-between min-h-[150px] ${revealClass(servicesRef.inView)}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div>
                <div className="w-10 h-10 flex items-center justify-center border border-stone-200 group-hover:border-brass group-hover:bg-brass/5 transition-all duration-300 mb-4">
                  <ShieldCheck className="w-4 h-4 text-charcoal group-hover:text-brass transition-colors" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-2 group-hover:text-brass transition-colors">
                  {locale === 'nl' ? 'Verhuur' : 'Leasing'}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {locale === 'nl'
                    ? 'Goede huurders, huur op tijd, juridische zaken geregeld.'
                    : 'Good tenants, rent on time, legal handled.'}
                </p>
              </div>
            </Link>

            {/* Property Management */}
            <Link
              href={`/services/property-management`}
              className={`group relative bg-white border border-stone-200 p-6 lg:p-8 hover:border-brass transition-all duration-500 flex flex-col justify-between min-h-[150px] ${revealClass(servicesRef.inView)}`}
              style={{ transitionDelay: '350ms' }}
            >
              <div>
                <div className="w-10 h-10 flex items-center justify-center border border-stone-200 group-hover:border-brass group-hover:bg-brass/5 transition-all duration-300 mb-4">
                  <Landmark className="w-4 h-4 text-charcoal group-hover:text-brass transition-colors" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-2 group-hover:text-brass transition-colors">
                  {locale === 'nl' ? 'Vastgoedbeheer' : 'Property Management'}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {locale === 'nl'
                    ? 'Onderhoud, financiën, contact met huurders.'
                    : 'Maintenance, finances, tenant relations.'}
                </p>
              </div>
            </Link>

            {/* Expat Services — wide bottom card */}
            <Link
              href={`/services/expat-services`}
              className={`group sm:col-span-2 relative bg-white border border-stone-200 p-6 lg:p-8 hover:border-brass transition-all duration-500 flex flex-col sm:flex-row items-start sm:items-center gap-6 min-h-[120px] ${revealClass(servicesRef.inView)}`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-stone-200 group-hover:border-brass group-hover:bg-brass/5 transition-all duration-300">
                <Globe className="w-4 h-4 text-charcoal group-hover:text-brass transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl text-charcoal mb-1 group-hover:text-brass transition-colors">
                  {locale === 'nl' ? 'Expat Diensten' : 'Expat Services'}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {locale === 'nl'
                    ? 'Honderden mensen geholpen met settelen in Amsterdam. We kennen de buurten, de papierwinkel, en waar u goede koffie kunt krijgen.'
                    : 'Hundreds of people helped settle in Amsterdam. We know the neighbourhoods, the paperwork, and where to get good coffee.'}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-brass group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ HERITAGE / STATS ═══════════════════ */}
      <section ref={heritageRef.ref} className="py-20 lg:py-28 bg-stone-100 relative overflow-hidden">
        {/* atmospheric subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/about-home-2.webp"
                alt="Elegant Amsterdam interior with natural light"
                width="1444"
                height="1696"
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover transition-all duration-1000 ${heritageRef.inView ? 'scale-100' : 'scale-105'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
            <div>
              <p
                className={`font-body text-xs uppercase tracking-[0.2em] text-brass mb-4 ${revealClass(heritageRef.inView)}`}
              >
                {t.heritageEyebrow}
              </p>
              <h2
                className={`font-display text-3xl md:text-4xl lg:text-[2.5rem] text-charcoal mb-6 leading-[1.15] ${revealClass(heritageRef.inView)}`}
                style={{ transitionDelay: '100ms' }}
              >
                {t.heritageTitle}
              </h2>
              <p
                className={`text-warm-gray leading-relaxed mb-10 ${revealClass(heritageRef.inView)}`}
                style={{ transitionDelay: '200ms' }}
              >
                {t.heritageDesc}
              </p>
              <Link
                href={`/about`}
                className={`inline-flex items-center gap-2 border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300 ${revealClass(heritageRef.inView)}`}
                style={{ transitionDelay: '300ms' }}
              >
                {t.readStory}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div
            ref={statsRef.ref}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pt-12 border-t border-stone-300"
          >
            <div className={`text-center ${revealClass(statsRef.inView)}`} style={{ transitionDelay: '100ms' }}>
              <p className="font-display text-5xl lg:text-6xl text-stone-300 mb-2">{yearsCount}+</p>
              <p className="font-body text-xs uppercase tracking-widest text-warm-gray">{t.yearsExp}</p>
            </div>
            <div className={`text-center ${revealClass(statsRef.inView)}`} style={{ transitionDelay: '200ms' }}>
              <p className="font-display text-5xl lg:text-6xl text-stone-300 mb-2">3</p>
              <p className="font-body text-xs uppercase tracking-widest text-warm-gray">{t.regions}</p>
            </div>
            <div className={`text-center ${revealClass(statsRef.inView)}`} style={{ transitionDelay: '300ms' }}>
              <p className="font-display text-5xl lg:text-6xl text-stone-300 mb-2">2800+</p>
              <p className="font-body text-xs uppercase tracking-widest text-warm-gray">{t.transactions}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED PROPERTIES ═══════════════════ */}
      <section ref={portfolioRef.ref} className="py-20 lg:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <p
                className={`font-body text-xs uppercase tracking-[0.2em] text-brass mb-4 ${revealClass(portfolioRef.inView)}`}
              >
                {t.portfolioEyebrow}
              </p>
              <h2
                className={`font-display text-3xl md:text-4xl lg:text-[2.75rem] text-charcoal leading-[1.15] ${revealClass(portfolioRef.inView)}`}
                style={{ transitionDelay: '100ms' }}
              >
                {t.portfolioTitle}
              </h2>
            </div>
            <Link
              href={`/properties`}
              className={`mt-6 md:mt-0 inline-flex items-center gap-2 border-b border-charcoal text-charcoal pb-1 font-body text-sm uppercase tracking-wider hover:text-brass hover:border-brass transition-colors duration-300 ${revealClass(portfolioRef.inView)}`}
              style={{ transitionDelay: '200ms' }}
            >
              {t.viewAll}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {featuredProperties.length === 0 ? (
            <p className="text-center text-stone-400 py-12">
              {locale === 'nl'
                ? 'Geen uitgelichte woningen gevonden. Markt een woning als "Uitgelicht" in het dashboard om deze hier te tonen.'
                : 'No featured properties found. Mark a listing as "Featured" in the dashboard to display it here.'}
            </p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, i) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className={`group bg-white border border-stone-200 overflow-hidden hover:border-brass hover:shadow-lg hover:shadow-stone-900/5 transition-all duration-500 block ${revealClass(portfolioRef.inView)}`}
                style={{ transitionDelay: `${150 + i * 100}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image_url}
                    alt={property.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span
                      className={`text-xs font-body uppercase tracking-wider px-3 py-1.5 ${statusStyles[property.status] || statusStyles.available}`}
                    >
                      {statusLabelsLocale[property.status] || property.status}
                    </span>
                    {property.listing_type && property.status !== 'sold' && property.status !== 'rented' && (
                      <span
                        className={`text-xs font-body uppercase tracking-wider px-3 py-1.5 ${listingTypeStyles[property.listing_type] || ''}`}
                      >
                        {(listingTypeLabels[locale] || listingTypeLabels.en)[property.listing_type]}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal mb-1 group-hover:text-brass transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-warm-gray text-sm mb-4">{property.address}, {property.city}</p>
                  <div className="flex justify-between items-end">
                    <span className="font-display text-2xl text-brass">
                      {property.price
                        ? `€${property.price.toLocaleString('nl-NL', { maximumFractionDigits: 0, useGrouping: true })}`
                        : locale === 'nl' ? 'Prijs op aanvraag' : 'Price on request'}
                    </span>
                    <span className="text-warm-gray text-sm">
                      {property.area} m² · {property.bedrooms} {locale === 'nl' ? 'slaapkamers' : 'bed'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
      <section ref={whyRef.ref} className="py-20 lg:py-28 bg-earth text-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brass/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brass/3 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <p
                className={`font-body text-xs uppercase tracking-[0.2em] text-stone-100/75 mb-4 ${revealClass(whyRef.inView)}`}
              >
                {t.whyEyebrow}
              </p>
              <h2
                className={`font-display text-3xl md:text-4xl lg:text-[2.75rem] mb-6 leading-[1.15] ${revealClass(whyRef.inView)}`}
                style={{ transitionDelay: '100ms' }}
              >
                {t.whyTitle}
              </h2>
              <p
                className={`text-stone-100/80 leading-relaxed max-w-md ${revealClass(whyRef.inView)}`}
                style={{ transitionDelay: '200ms' }}
              >
                {t.whyDesc}
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: t.whyAccess,
                  desc: t.whyAccessDesc,
                  icon: TrendingUp,
                },
                {
                  title: t.whyIntl,
                  desc: t.whyIntlDesc,
                  icon: Globe,
                },
                {
                  title: t.whyHistoric,
                  desc: t.whyHistoricDesc,
                  icon: Landmark,
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`group bg-white/[0.08] border border-white/20 p-8 hover:border-white/30 hover:bg-white/[0.11] transition-all duration-500 ${revealClass(whyRef.inView)}`}
                  style={{ transitionDelay: `${250 + i * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-white/20 group-hover:border-white/30 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-stone-100/90" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-2 text-white group-hover:text-stone-50 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-stone-100/75 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ACCORDION ═══════════════════ */}
      <section ref={faqRef.ref} className="py-20 lg:py-28 bg-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              className={`font-body text-xs uppercase tracking-[0.2em] text-brass mb-4 ${revealClass(faqRef.inView)}`}
            >
              {t.faqEyebrow}
            </p>
            <h2
              className={`font-display text-3xl md:text-4xl text-charcoal leading-[1.15] ${revealClass(faqRef.inView)}`}
              style={{ transitionDelay: '100ms' }}
            >
              {t.faqTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {t.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`bg-white border border-stone-200 overflow-hidden transition-all duration-500 ${revealClass(faqRef.inView)}`}
                  style={{ transitionDelay: `${150 + i * 80}ms` }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-display text-lg text-charcoal pr-4">{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brass flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-warm-gray flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="px-6 pb-5 text-warm-gray leading-relaxed">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section ref={finalCtaRef.ref} className="py-20 lg:py-28 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p
            className={`font-body text-xs uppercase tracking-[0.2em] text-brass mb-4 ${revealClass(finalCtaRef.inView)}`}
          >
            {locale === 'nl' ? 'Klaar voor de volgende stap?' : 'Ready for your next move?'}
          </p>
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-[3rem] text-charcoal mb-6 leading-[1.15] ${revealClass(finalCtaRef.inView)}`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.finalCtaTitle}
          </h2>
          <p
            className={`text-warm-gray text-lg mb-10 leading-relaxed max-w-2xl mx-auto ${revealClass(finalCtaRef.inView)}`}
            style={{ transitionDelay: '200ms' }}
          >
            {t.finalCtaDesc}
          </p>
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${revealClass(finalCtaRef.inView)}`}
            style={{ transitionDelay: '300ms' }}
          >
            <Link
              href={`/contact`}
              className="inline-flex items-center gap-2 bg-brass text-white px-10 py-4 font-body text-sm uppercase tracking-wider hover:bg-brass-light hover:scale-[1.02] transition-all duration-300 rounded-sm"
            >
              {t.finalCtaBtn}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-stone-400 text-sm">{t.finalCtaSell}</span>
              <button
                onClick={() => {
                  const el = document.getElementById('valuation-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 border border-charcoal text-charcoal px-6 py-4 font-body text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all duration-300 rounded-sm"
              >
                {t.finalCtaSellBtn}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
