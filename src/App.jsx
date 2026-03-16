import { useState, useRef } from "react";

// ── BRAND TOKENS ────────────────────────────────────────────────────────────
const B = {
  // NovusIn — Dark & Sleek
  navy:      "#0f1117",
  navyLight: "#161b25",
  gold:      "#10b981",
  goldLight: "#34d399",
  goldDim:   "#059669",
  goldBg:    "#0d2818",
  white:     "#f1f5f9",
  offWhite:  "#1e2530",
  steel:     "#64748b",
  steelBg:   "#1a2035",
  border:    "#1e2d3d",
  ink:       "#f1f5f9",
  inkLight:  "#94a3b8",
  danger:    "#f87171",
  dangerBg:  "#1f0d0d",
  success:   "#10b981",
  successBg: "#0d2818",
  blue:      "#60a5fa",
  blueBg:    "#0d1f35",
  tag:       "#1e2d3d",
};

// ── LOGO SVG COMPONENT ──────────────────────────────────────────────────────
function Logo({ size = 36, dark = true }) {
  const em = "#10b981";
  const emFaint = "#10b981";
  const textCol = dark ? "#0f1117" : "#f1f5f9";
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Diamond outline */}
      <path d="M40 4 L76 40 L40 76 L4 40 Z" fill="none" stroke={em} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Inner diamond — subtle fill */}
      <path d="M40 18 L62 40 L40 62 L18 40 Z" fill={em} opacity="0.1"/>
      {/* N monogram centered */}
      <text x="40" y="52" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="34" fontWeight="700" fill={em}>N</text>
    </svg>
  );
}

function LogoIcon({ size = 40, dark = true }) {
  const em = "#10b981";
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 4 L76 40 L40 76 L4 40 Z" fill="none" stroke={em} strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M40 18 L62 40 L40 62 L18 40 Z" fill={em} opacity="0.1"/>
      <text x="40" y="52" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="34" fontWeight="700" fill={em}>N</text>
    </svg>
  );
}
const REGIONS = [
  {
    id:"us", flag:"🇺🇸", name:"United States", currency:"USD", symbol:"$", locale:"en-US",
    platforms:[
      {name:"Fidelity", note:"Best for beginners. No minimums.", star:true},
      {name:"Schwab", note:"Great research tools. No minimums.", star:true},
      {name:"Robinhood", note:"Easy mobile app. Good for starters.", star:false},
      {name:"eToro", note:"Copy trading. US stocks available.", star:false},
    ],
    funds:{
      short:[{ticker:"HYSA",name:"High-Yield Savings (Marcus/Ally)",pct:70,rate:4.8,risk:"Very Low",why:"Safe & liquid. Currently 4-5% APY."},{ticker:"BND",name:"Vanguard Bond ETF",pct:30,rate:4.8,risk:"Low",why:"Stable income with low volatility."}],
      moderate:[{ticker:"VOO",name:"Vanguard S&P 500 ETF",pct:50,rate:10.5,risk:"Medium",why:"Most recommended beginner fund. Set and forget."},{ticker:"VTI",name:"Vanguard Total Market ETF",pct:30,rate:10.2,risk:"Medium",why:"Broader diversification than S&P 500."},{ticker:"BND",name:"Vanguard Bond ETF",pct:20,rate:4.8,risk:"Low",why:"Cushion for market dips."}],
      conservative:[{ticker:"BND",name:"Vanguard Bond ETF",pct:40,rate:4.8,risk:"Low",why:"Stable core for cautious investors."},{ticker:"VOO",name:"Vanguard S&P 500 ETF",pct:40,rate:10.5,risk:"Medium",why:"Long-term growth anchor."},{ticker:"VTI",name:"Vanguard Total Market ETF",pct:20,rate:10.2,risk:"Medium",why:"Extra diversification."}],
      aggressive:[{ticker:"QQQ",name:"Invesco Nasdaq 100 ETF",pct:40,rate:13.2,risk:"Med-High",why:"Tech-heavy, high growth potential."},{ticker:"VOO",name:"Vanguard S&P 500 ETF",pct:35,rate:10.5,risk:"Medium",why:"Core market exposure."},{ticker:"SCHG",name:"Schwab Growth ETF",pct:25,rate:14.1,risk:"Med-High",why:"Large-cap growth stocks."}],
    },
    taxNote:"Consider a Roth IRA ($7,000/yr) or 401(k) employer match for tax-free growth.",
  },
  {
    id:"uk", flag:"🇬🇧", name:"United Kingdom", currency:"GBP", symbol:"£", locale:"en-GB",
    platforms:[
      {name:"Trading 212", note:"Free. ISA account available. Great UI.", star:true},
      {name:"Freetrade", note:"Commission-free. ISA wrapper included.", star:true},
      {name:"Hargreaves Lansdown", note:"UK's largest. Most trusted.", star:false},
      {name:"eToro", note:"Copy trading. Wide asset selection.", star:false},
    ],
    funds:{
      short:[{ticker:"HYSA",name:"Marcus / Chase Savings",pct:70,rate:5.1,risk:"Very Low",why:"FSCS protected up to £85,000."},{ticker:"VAGF",name:"Vanguard UK Gov Bond ETF",pct:30,rate:4.5,risk:"Low",why:"Stable gilts-based bond fund."}],
      moderate:[{ticker:"VUSA",name:"Vanguard S&P 500 UCITS ETF",pct:50,rate:10.5,risk:"Medium",why:"UK-compliant S&P 500 tracker. Most popular."},{ticker:"VWRL",name:"Vanguard FTSE All-World ETF",pct:30,rate:9.8,risk:"Medium",why:"Global diversification in one fund."},{ticker:"VAGF",name:"Vanguard UK Gov Bond ETF",pct:20,rate:4.5,risk:"Low",why:"Reduces portfolio volatility."}],
      conservative:[{ticker:"VAGF",name:"Vanguard UK Gov Bond ETF",pct:40,rate:4.5,risk:"Low",why:"Stable and protected."},{ticker:"VUSA",name:"Vanguard S&P 500 UCITS ETF",pct:40,rate:10.5,risk:"Medium",why:"Core global growth."},{ticker:"VWRL",name:"Vanguard FTSE All-World ETF",pct:20,rate:9.8,risk:"Medium",why:"Global spread."}],
      aggressive:[{ticker:"EQQQ",name:"Invesco Nasdaq 100 UCITS ETF",pct:40,rate:13.2,risk:"Med-High",why:"Tech-focused growth fund."},{ticker:"VUSA",name:"Vanguard S&P 500 UCITS ETF",pct:35,rate:10.5,risk:"Medium",why:"Core holding."},{ticker:"VWRL",name:"Vanguard FTSE All-World ETF",pct:25,rate:9.8,risk:"Medium",why:"Global diversification."}],
    },
    taxNote:"Use a Stocks & Shares ISA (£20,000/yr) — all growth and income is completely tax-free.",
  },
  {
    id:"eu", flag:"🇪🇺", name:"Europe (EU)", currency:"EUR", symbol:"€", locale:"de-DE",
    platforms:[
      {name:"Trade Republic", note:"€1 trades. Very popular in Germany/EU.", star:true},
      {name:"DEGIRO", note:"Low-cost. Wide ETF selection.", star:true},
      {name:"eToro", note:"Copy trading. CopyPortfolios available.", star:false},
      {name:"Scalable Capital", note:"German robo-advisor. Good for beginners.", star:false},
    ],
    funds:{
      short:[{ticker:"HYSA",name:"Trade Republic 4% Savings",pct:70,rate:4.0,risk:"Very Low",why:"Fully insured. Currently ~4% in EUR."},{ticker:"IEAG",name:"iShares EUR Aggregate Bond",pct:30,rate:4.2,risk:"Low",why:"EUR-denominated bonds."}],
      moderate:[{ticker:"VWCE",name:"Vanguard FTSE All-World UCITS",pct:50,rate:9.8,risk:"Medium",why:"Top EU-listed global ETF. UCITS compliant."},{ticker:"CSPX",name:"iShares Core S&P 500 UCITS ETF",pct:30,rate:10.5,risk:"Medium",why:"US market exposure, EU-listed."},{ticker:"IEAG",name:"iShares EUR Aggregate Bond",pct:20,rate:4.2,risk:"Low",why:"Stability buffer."}],
      conservative:[{ticker:"IEAG",name:"iShares EUR Aggregate Bond",pct:40,rate:4.2,risk:"Low",why:"Stable EUR bonds."},{ticker:"VWCE",name:"Vanguard FTSE All-World UCITS",pct:40,rate:9.8,risk:"Medium",why:"Global equity growth."},{ticker:"CSPX",name:"iShares Core S&P 500 UCITS ETF",pct:20,rate:10.5,risk:"Medium",why:"US market exposure."}],
      aggressive:[{ticker:"CNDX",name:"iShares Nasdaq 100 UCITS ETF",pct:40,rate:13.2,risk:"Med-High",why:"Tech growth, EU-listed."},{ticker:"VWCE",name:"Vanguard FTSE All-World UCITS",pct:35,rate:9.8,risk:"Medium",why:"Global diversification."},{ticker:"CSPX",name:"iShares Core S&P 500 UCITS ETF",pct:25,rate:10.5,risk:"Medium",why:"Core US exposure."}],
    },
    taxNote:"Check your country's tax-advantaged accounts (e.g. Germany's €1,000/yr Sparerpauschbetrag exemption).",
  },
  {
    id:"ca", flag:"🇨🇦", name:"Canada", currency:"CAD", symbol:"CA$", locale:"en-CA",
    platforms:[
      {name:"Wealthsimple", note:"Best Canadian beginner app. TFSA/RRSP.", star:true},
      {name:"Questrade", note:"Low fees. ETF buys are free.", star:true},
      {name:"TD Direct", note:"Big bank option. Higher fees.", star:false},
      {name:"eToro", note:"Available in Canada. USD exposure.", star:false},
    ],
    funds:{
      short:[{ticker:"HYSA",name:"EQ Bank Savings (3.5%+)",pct:70,rate:3.5,risk:"Very Low",why:"CDIC insured. Best Canadian savings rates."},{ticker:"ZAG",name:"BMO Aggregate Bond ETF",pct:30,rate:4.2,risk:"Low",why:"Canadian bond exposure."}],
      moderate:[{ticker:"XEQT",name:"iShares Core Equity ETF Portfolio",pct:50,rate:10.0,risk:"Medium",why:"One-fund global equity solution."},{ticker:"VEQT",name:"Vanguard All-Equity ETF Portfolio",pct:30,rate:9.9,risk:"Medium",why:"Global diversified, Canada-listed."},{ticker:"ZAG",name:"BMO Aggregate Bond ETF",pct:20,rate:4.2,risk:"Low",why:"Canadian bond stability."}],
      conservative:[{ticker:"XBAL",name:"iShares Core Balanced ETF",pct:50,rate:7.5,risk:"Low-Med",why:"60/40 stocks/bonds. Simple."},{ticker:"VEQT",name:"Vanguard All-Equity ETF Portfolio",pct:30,rate:9.9,risk:"Medium",why:"Growth component."},{ticker:"ZAG",name:"BMO Aggregate Bond ETF",pct:20,rate:4.2,risk:"Low",why:"Stability buffer."}],
      aggressive:[{ticker:"VEQT",name:"Vanguard All-Equity ETF Portfolio",pct:45,rate:9.9,risk:"Medium",why:"Global equities, one fund."},{ticker:"XEQT",name:"iShares Core Equity ETF Portfolio",pct:35,rate:10.0,risk:"Medium",why:"Complementary global ETF."},{ticker:"ZQQ",name:"BMO Nasdaq 100 ETF (CAD)",pct:20,rate:13.2,risk:"Med-High",why:"Tech growth exposure."}],
    },
    taxNote:"Max out your TFSA ($7,000/yr) first — all growth is completely tax-free.",
  },
  {
    id:"au", flag:"🇦🇺", name:"Australia", currency:"AUD", symbol:"A$", locale:"en-AU",
    platforms:[
      {name:"Stake", note:"US & ASX shares. Popular for beginners.", star:true},
      {name:"CommSec Pocket", note:"CBA beginner app. 7 ETFs, easy setup.", star:true},
      {name:"Pearler", note:"Designed for long-term investing.", star:false},
      {name:"eToro", note:"Available in AU. Wide asset selection.", star:false},
    ],
    funds:{
      short:[{ticker:"HYSA",name:"ING / UBank Savings (5%+)",pct:70,rate:5.0,risk:"Very Low",why:"Government guaranteed up to AUD 250,000."},{ticker:"IAF",name:"iShares Core Composite Bond ETF",pct:30,rate:4.3,risk:"Low",why:"Australian bond exposure."}],
      moderate:[{ticker:"VGS",name:"Vanguard MSCI Index International",pct:50,rate:10.2,risk:"Medium",why:"Most popular ETF for Australians."},{ticker:"VAS",name:"Vanguard Australian Shares ETF",pct:30,rate:9.5,risk:"Medium",why:"Local ASX 300 + franking credits."},{ticker:"IAF",name:"iShares Core Composite Bond",pct:20,rate:4.3,risk:"Low",why:"Stability component."}],
      conservative:[{ticker:"IAF",name:"iShares Core Composite Bond",pct:40,rate:4.3,risk:"Low",why:"Stable core."},{ticker:"VGS",name:"Vanguard MSCI International",pct:35,rate:10.2,risk:"Medium",why:"Global growth."},{ticker:"VAS",name:"Vanguard Australian Shares",pct:25,rate:9.5,risk:"Medium",why:"Local exposure with franking."}],
      aggressive:[{ticker:"NDQ",name:"BetaShares Nasdaq 100 ETF",pct:40,rate:13.2,risk:"Med-High",why:"Tech growth, ASX-listed."},{ticker:"VGS",name:"Vanguard MSCI International",pct:35,rate:10.2,risk:"Medium",why:"Global diversification."},{ticker:"VAS",name:"Vanguard Australian Shares",pct:25,rate:9.5,risk:"Medium",why:"Local market exposure."}],
    },
    taxNote:"Consider contributing to your Super — concessional contributions taxed at only 15%.",
  },
  {
    id:"latam", flag:"🌎", name:"Latin America", currency:"USD", symbol:"$", locale:"es-419",
    platforms:[
      {name:"eToro", note:"Widest availability in LATAM. Copy trading.", star:true},
      {name:"Interactive Brokers", note:"Professional-grade. Available across LATAM.", star:true},
      {name:"Charles Schwab Intl", note:"US-based. Some LATAM countries.", star:false},
      {name:"XTB", note:"Growing presence in Latin America.", star:false},
    ],
    funds:{
      short:[{ticker:"HYSA",name:"USD Money Market / Savings",pct:70,rate:4.5,risk:"Very Low",why:"Hold savings in USD for currency stability."},{ticker:"BND",name:"Vanguard Bond ETF (USD)",pct:30,rate:4.8,risk:"Low",why:"Stable USD income."}],
      moderate:[{ticker:"VOO",name:"Vanguard S&P 500 ETF",pct:50,rate:10.5,risk:"Medium",why:"Most accessible global fund via eToro/IBKR."},{ticker:"VTI",name:"Vanguard Total Market ETF",pct:30,rate:10.2,risk:"Medium",why:"Broader US & global diversification."},{ticker:"BND",name:"Vanguard Bond ETF",pct:20,rate:4.8,risk:"Low",why:"Stability in USD."}],
      conservative:[{ticker:"BND",name:"Vanguard Bond ETF",pct:40,rate:4.8,risk:"Low",why:"Stable USD bonds."},{ticker:"VOO",name:"Vanguard S&P 500 ETF",pct:40,rate:10.5,risk:"Medium",why:"Core global growth."},{ticker:"VTI",name:"Vanguard Total Market",pct:20,rate:10.2,risk:"Medium",why:"Extra diversification."}],
      aggressive:[{ticker:"QQQ",name:"Invesco Nasdaq 100 ETF",pct:40,rate:13.2,risk:"Med-High",why:"Tech growth exposure."},{ticker:"VOO",name:"Vanguard S&P 500 ETF",pct:35,rate:10.5,risk:"Medium",why:"Core holding."},{ticker:"VGT",name:"Vanguard IT Sector ETF",pct:25,rate:15.0,risk:"High",why:"Technology sector focus."}],
    },
    taxNote:"Investing in USD can protect savings from local currency devaluation. Check your country's capital gains tax rules.",
  },
  {
    id:"other", flag:"🌍", name:"Rest of World", currency:"USD", symbol:"$", locale:"en-US",
    platforms:[
      {name:"eToro", note:"Available in 140+ countries. Widest reach.", star:true},
      {name:"Interactive Brokers", note:"Available in 200+ countries.", star:true},
      {name:"Saxo Bank", note:"Global reach. Wide ETF selection.", star:false},
      {name:"XM / Exness", note:"Available in many emerging markets.", star:false},
    ],
    funds:{
      short:[{ticker:"HYSA",name:"USD Savings / Money Market",pct:70,rate:4.5,risk:"Very Low",why:"Stable USD-denominated savings."},{ticker:"BND",name:"Vanguard Bond ETF",pct:30,rate:4.8,risk:"Low",why:"Low-risk USD income."}],
      moderate:[{ticker:"VOO",name:"Vanguard S&P 500 ETF",pct:50,rate:10.5,risk:"Medium",why:"Global benchmark. Available via eToro/IBKR."},{ticker:"VTI",name:"Vanguard Total Market ETF",pct:30,rate:10.2,risk:"Medium",why:"Broad US market exposure."},{ticker:"BND",name:"Vanguard Bond ETF",pct:20,rate:4.8,risk:"Low",why:"Portfolio stability."}],
      conservative:[{ticker:"BND",name:"Vanguard Bond ETF",pct:40,rate:4.8,risk:"Low",why:"Stable low-risk core."},{ticker:"VOO",name:"Vanguard S&P 500 ETF",pct:40,rate:10.5,risk:"Medium",why:"Global growth."},{ticker:"VTI",name:"Vanguard Total Market",pct:20,rate:10.2,risk:"Medium",why:"Additional diversification."}],
      aggressive:[{ticker:"QQQ",name:"Invesco Nasdaq 100 ETF",pct:40,rate:13.2,risk:"Med-High",why:"Tech growth."},{ticker:"VOO",name:"Vanguard S&P 500 ETF",pct:35,rate:10.5,risk:"Medium",why:"Core position."},{ticker:"VGT",name:"Vanguard IT Sector ETF",pct:25,rate:15.0,risk:"High",why:"Tech sector concentration."}],
    },
    taxNote:"Investing in USD-denominated assets can protect against local currency risk. Always check local capital gains tax laws.",
  },
];

const GOAL_PRESETS = [
  {id:"debt",      emoji:"⛓️", label:"Pay Off Debt",    color:B.danger,   colorBg:B.dangerBg,  defaultPrice:8000,   desc:"Credit cards, loans, medical bills",          dpPct:1.0},
  {id:"car",       emoji:"🚗", label:"Buy a Car",       color:B.blue,     colorBg:B.blueBg,    defaultPrice:25000,  desc:"We calculate 20% down payment for you",       dpPct:0.20},
  {id:"house",     emoji:"🏠", label:"Buy a House",     color:B.goldDim,  colorBg:B.goldBg,    defaultPrice:300000, desc:"We calculate 35% down payment for you",       dpPct:0.35},
  {id:"emergency", emoji:"🛡️", label:"Emergency Fund",  color:B.success,  colorBg:B.successBg, defaultPrice:5000,   desc:"3-6 months of living expenses",               dpPct:1.0},
  {id:"custom",    emoji:"✨", label:"Custom Goal",     color:B.inkLight, colorBg:B.tag,       defaultPrice:10000,  desc:"Set your own target amount",                  dpPct:1.0},
];

const fmtCurrency = (n, region) => {
  try { return new Intl.NumberFormat(region.locale, {style:"currency", currency:region.currency, maximumFractionDigits:0}).format(n); }
  catch { return `${region.symbol}${Math.round(n).toLocaleString()}`; }
};

const getSuggestions = (years, risk, region) => {
  if (years <= 1) return region.funds.short;
  if (years <= 3) return [{...region.funds.short[0], pct:40},{...region.funds.short[1], pct:30},{...region.funds.moderate[0], pct:30}];
  if (risk === "conservative") return region.funds.conservative;
  if (risk === "aggressive") return region.funds.aggressive;
  return region.funds.moderate;
};

const getAIReply = (msg, ctx, region) => {
  const m = msg.toLowerCase();
  const sym = region.symbol;
  if (m.includes("motivat") || m.includes("hard") || m.includes("impossible") || m.includes("give up"))
    return `💪 Balancing a full-time job and saving is genuinely hard.\n\n**Most people never start because it feels overwhelming.** You already did the hardest part.\n\nEven saving ${sym}${ctx.monthly||200}/month puts you ahead of most people. Progress beats perfection every single time.\n\n🎯 Focus on your next 30 days, not the full timeline.`;
  if (m.includes("etoro") || m.includes("platform") || m.includes("broker"))
    return `📱 **Best platforms for ${region.name}:**\n\n${region.platforms.map(p=>`${p.star?"⭐":"•"} **${p.name}** — ${p.note}`).join("\n")}\n\n${region.taxNote}\n\n⚠️ Educational info only, not financial advice.`;
  if (m.includes("tax") || m.includes("isa") || m.includes("tfsa") || m.includes("roth") || m.includes("super"))
    return `🏦 **Tax-advantaged accounts for ${region.name}:**\n\n${region.taxNote}\n\nUsing the right account wrapper can save you significant money in taxes over time.\n\n⚠️ Consult a local tax advisor for your specific situation.`;
  if (m.includes("debt") || m.includes("loan") || m.includes("credit card"))
    return `⛓️ **Paying off debt first is often the smartest move:**\n\nHigh-interest debt costs more than investing earns.\n\n**Recommended order:**\n1. Minimum payments on all debts\n2. Build ${sym}1,000 starter emergency fund\n3. Attack highest-interest debt first\n4. Once debt-free, redirect to investing\n\n⚠️ Educational info only, not financial advice.`;
  if (m.includes("house") || m.includes("mortgage") || m.includes("deposit"))
    return `🏠 **Saving for a home in ${region.name}:**\n\nTypically need 10-35% deposit plus closing costs.\n\n• Savings account for goals under 3 years\n• Bonds + ETFs for 3+ year timelines\n• Avoid stocks for money needed soon\n\n${region.taxNote}\n\n⚠️ Educational info only, not financial advice.`;
  if (m.includes("car"))
    return `🚗 **Saving for a car:**\n\nAim for 20% down minimum. Buy used to avoid first-year depreciation.\n\nWhile saving: use a high-yield savings account only.\n\n⚠️ Educational info only, not financial advice.`;
  if (m.includes("invest") || m.includes("etf") || m.includes("fund"))
    return `📈 **Investing basics for ${region.name}:**\n\nTop platforms: ${region.platforms.filter(p=>p.star).map(p=>p.name).join(" and ")}\n\nBest starting funds:\n${getSuggestions(5,"moderate",region).map(f=>`• **${f.ticker}** — ${f.name}`).join("\n")}\n\n${region.taxNote}\n\n⚠️ Educational info only, not financial advice.`;
  if (m.includes("budget") || m.includes("afford") || m.includes("salary"))
    return `💰 **The 50/30/20 budget rule:**\n\n• 50% — Needs (rent, food, bills)\n• 30% — Wants (dining out, fun)\n• 20% — Savings & debt payoff\n\nIf 20% feels impossible, start with 5% and increase by 1% every 3 months.\n\n⚠️ Educational info only, not financial advice.`;
  return `👋 I can help with:\n\n• **Platforms** — "what platforms should I use?"\n• **Tax accounts** — "what tax accounts are available?"\n• **Debt** — "how do I pay off debt?"\n• **House savings** — "how do I save for a house?"\n• **Investing** — "how do I start investing?"\n• **Budgeting** — "how do I afford to save?"\n• **Motivation** — "this feels impossible"\n\n⚠️ Education only, not licensed financial advice.`;
};

function Sparkline({data, color, h=52}) {
  if (!data || data.length < 2) return null;
  const max=Math.max(...data), min=Math.min(...data), range=max-min||1, W=240;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*W},${h-((v-min)/range)*(h-6)-3}`).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.2"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <polygon points={`${pts} ${W},${h} 0,${h}`} fill="url(#sg)"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Ring({pct, color, size=76}) {
  const r=(size-12)/2, circ=2*Math.PI*r, dash=(Math.min(Math.max(pct,0),100)/100)*circ;
  return (
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={B.border} strokeWidth="8"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{transition:"stroke-dasharray 0.7s ease"}}/>
    </svg>
  );
}

// ── ONBOARDING ───────────────────────────────────────────────────────────────
function Onboarding({onSelect}) {
  return (
    <div style={{minHeight:"100vh", background:"radial-gradient(ellipse at 40% 30%, #0d2818 0%, #0f1117 55%, #080b10 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"Georgia, serif"}}>
      <div style={{maxWidth:420, width:"100%"}}>

        {/* Logo */}
        <div style={{textAlign:"center", marginBottom:36}}>
          <div style={{display:"flex", justifyContent:"center", marginBottom:16}}>
            <LogoIcon size={72} dark={true}/>
          </div>
          <div style={{fontSize:32, fontWeight:700, color:B.white, letterSpacing:"-0.5px"}}>
            Novus<span style={{color:B.gold, fontWeight:400}}>In</span>
          </div>
          <div style={{fontSize:11, color:B.gold, textTransform:"uppercase", letterSpacing:"0.15em", fontFamily:"monospace", marginTop:6}}>New Investor Coach</div>
          <div style={{fontSize:13, color:B.steel, marginTop:14, lineHeight:1.7, fontStyle:"italic"}}>"The new investor's coach."</div>
          <div style={{width:40, height:2, background:B.gold, borderRadius:1, margin:"16px auto 0"}}/>
        </div>

        <div style={{fontSize:14, color:B.steel, textAlign:"center", marginBottom:20}}>Where are you based?</div>

        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          {REGIONS.map(r => (
            <button key={r.id} onClick={()=>onSelect(r)} style={{padding:"13px 18px", borderRadius:12, border:`1.5px solid ${B.navyLight}`, background:B.navyLight, cursor:"pointer", display:"flex", alignItems:"center", gap:14, fontFamily:"Georgia, serif", textAlign:"left", transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=B.gold; e.currentTarget.style.background="#1e3460";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=B.navyLight; e.currentTarget.style.background=B.navyLight;}}>
              <span style={{fontSize:24}}>{r.flag}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:14, fontWeight:600, color:B.white}}>{r.name}</div>
                <div style={{fontSize:12, color:B.steel, marginTop:2}}>{r.currency} · {r.platforms.filter(p=>p.star).map(p=>p.name).join(", ")}</div>
              </div>
              <span style={{color:B.gold, fontSize:14}}>→</span>
            </button>
          ))}
        </div>

        <div style={{textAlign:"center", fontSize:11, color:B.steel, marginTop:24, lineHeight:1.7}}>
          🌱 novusin.com  ·  Educational only  ·  Not financial advice
        </div>
      </div>
    </div>
  );
}

const TABS = ["Goals","Plan","Invest","Chat","Learn"];

export default function NovusIn() {
  const [region, setRegion]               = useState(null);
  const [tab, setTab]                     = useState("Goals");
  const [goalType, setGoalType]           = useState("house");
  const [goalName, setGoalName]           = useState("Buy a House");
  const [fullPrice, setFullPrice]         = useState(300000);
  const [savedSoFar, setSavedSoFar]       = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(300);
  const [risk, setRisk]                   = useState("moderate");
  const [messages, setMessages]           = useState([]);
  const [chatInput, setChatInput]         = useState("");
  const [typing, setTyping]               = useState(false);
  const chatEndRef = useRef(null);

  const fmt = (n) => region ? fmtCurrency(n, region) : `$${Math.round(n).toLocaleString()}`;

  const handleRegionSelect = (r) => {
    setRegion(r);
    setMessages([{role:"ai", text:`${r.flag} Welcome to **NovusIn**! 🌱 I'm set up for **${r.name}** — all suggestions use **${r.currency}** and local platforms.\n\n*"The new investor's coach."*\n\nSet your goal in the Goals tab, then come back to chat!\n\n⚠️ Education only, not licensed financial advice.`}]);
  };

  if (!region) return <Onboarding onSelect={handleRegionSelect}/>;

  const preset = GOAL_PRESETS.find(p=>p.id===goalType) || GOAL_PRESETS[2];
  const dpPct = preset.dpPct;
  const dpLabel = goalType==="house" ? "35% down payment" : goalType==="car" ? "20% down payment" : "Full amount";
  const goalAmount = Math.round(fullPrice * dpPct);
  const remaining = Math.max(0, goalAmount - savedSoFar);
  const progressPct = goalAmount > 0 ? Math.min(100,(savedSoFar/goalAmount)*100) : 0;

  const seedSuggestions = getSuggestions(5, risk, region);
  const seedRate = seedSuggestions.reduce((s,a)=>s+(a.pct/100)*a.rate, 0);
  const mRate = seedRate/100/12;

  let monthsNeeded = 0;
  if (monthlyBudget > 0 && remaining > 0) {
    let fv = savedSoFar;
    while (fv < goalAmount && monthsNeeded < 600) { fv = fv*(1+mRate)+monthlyBudget; monthsNeeded++; }
  }

  const goalYears = Math.max(1, Math.ceil(monthsNeeded/12));
  const finalSuggestions = getSuggestions(goalYears, risk, region);
  const finalBlendedRate = finalSuggestions.reduce((s,a)=>s+(a.pct/100)*a.rate, 0);
  const mRate2 = finalBlendedRate/100/12;

  const yearlySamples = Array.from({length:goalYears+1},(_,i)=>{
    const mo=i*12;
    return mRate2>0 ? savedSoFar*Math.pow(1+mRate2,mo)+monthlyBudget*((Math.pow(1+mRate2,mo)-1)/mRate2) : savedSoFar+monthlyBudget*mo;
  });
  const projectedFinal = yearlySamples[yearlySamples.length-1];

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const txt = chatInput.trim(); setChatInput("");
    setMessages(m=>[...m,{role:"user",text:txt}]);
    setTyping(true);
    setTimeout(()=>{
      setTyping(false);
      setMessages(m=>[...m,{role:"ai",text:getAIReply(txt,{monthly:monthlyBudget},region)}]);
      setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:"smooth"}),50);
    },1100);
  };

  const renderMd = (t) => t
    .replace(/\*\*(.*?)\*\*/g,`<strong style="color:${B.ink}">$1</strong>`)
    .replace(/\n/g,"<br/>");

  // ── SHARED STYLES ──
  const cardStyle = {background:B.navyLight, borderRadius:14, padding:18, border:`1px solid ${B.border}`};
  const labelStyle = {fontSize:12, color:B.inkLight, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"monospace"};
  const goldInput = (accentColor) => ({display:"flex", alignItems:"center", borderRadius:10, border:`1.5px solid ${accentColor}`, overflow:"hidden", background:B.steelBg});

  return (
    <div style={{fontFamily:"Georgia, 'Times New Roman', serif", background:B.navy, minHeight:"100vh", color:B.ink, maxWidth:500, margin:"0 auto", display:"flex", flexDirection:"column"}}>

      {/* ── HEADER ── */}
      <div style={{padding:"14px 18px", background:B.navy, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <LogoIcon size={32} dark={true}/>
          <div>
            <div style={{fontSize:18, fontWeight:700, color:B.white, letterSpacing:"-0.5px"}}>
              Novus<span style={{color:B.gold, fontWeight:400}}>In</span>
            </div>
            <div style={{fontSize:9, color:B.steel, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"monospace"}}>New Investor Coach</div>
          </div>
        </div>
        <button onClick={()=>setRegion(null)} style={{display:"flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:20, border:`1px solid ${B.navyLight}`, background:B.navyLight, cursor:"pointer", fontSize:12, color:B.steel, fontFamily:"inherit"}}>
          {region.flag} {region.currency} ▾
        </button>
      </div>

      {/* ── TABS ── */}
      <div style={{display:"flex", background:B.navy, borderBottom:`2px solid ${B.navyLight}`}}>
        {TABS.map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1, padding:"10px 2px", border:"none", background:"none", fontFamily:"inherit", fontSize:11, fontWeight:tab===t?700:400, cursor:"pointer", color:tab===t?B.gold:B.steel, borderBottom:tab===t?`2px solid ${B.gold}`:"2px solid transparent"}}>
            {t==="Goals"?"🎯":t==="Plan"?"📋":t==="Invest"?"📈":t==="Chat"?"💬":"📚"} {t}
          </button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{flex:1, overflowY:"auto"}}>

        {/* ════ GOALS ════ */}
        {tab==="Goals" && (
          <div style={{padding:18, display:"flex", flexDirection:"column", gap:16}}>

            <div style={{...labelStyle}}>Step 1 — What do you want to achieve?</div>

            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              {GOAL_PRESETS.map(p=>(
                <button key={p.id} onClick={()=>{setGoalType(p.id);setGoalName(p.label);setFullPrice(p.defaultPrice);}} style={{padding:"13px 15px", borderRadius:12, border:`1.5px solid ${goalType===p.id?p.color:B.border}`, background:goalType===p.id?p.colorBg:B.navyLight, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12, fontFamily:"inherit"}}>
                  <span style={{fontSize:22}}>{p.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14, fontWeight:600, color:goalType===p.id?p.color:B.ink}}>{p.label}</div>
                    <div style={{fontSize:12, color:B.inkLight, marginTop:1}}>{p.desc}</div>
                  </div>
                  {goalType===p.id && <span style={{color:p.color, fontSize:16}}>✓</span>}
                </button>
              ))}
            </div>

            <div style={{...cardStyle, border:`1.5px solid ${preset.color}44`}}>
              <div style={{...labelStyle, marginBottom:14}}>
                Step 2 — {goalType==="house"?"Full house price":goalType==="car"?"Full car price":goalType==="debt"?"Total debt amount":goalType==="emergency"?"Emergency fund target":"Total amount needed"}
              </div>

              {goalType==="custom" && (
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:12, color:B.inkLight, display:"block", marginBottom:5}}>Goal Name</label>
                  <input value={goalName} onChange={e=>setGoalName(e.target.value)} style={{width:"100%", padding:"9px 12px", borderRadius:8, border:`1px solid ${B.border}`, fontSize:14, fontFamily:"inherit", color:B.ink, background:B.steelBg, boxSizing:"border-box", outline:"none"}}/>
                </div>
              )}

              <div style={{...goldInput(preset.color), marginBottom:10}}>
                <span style={{padding:"12px 14px", fontSize:18, fontWeight:700, color:preset.color, background:`${preset.color}12`}}>{region.symbol}</span>
                <input type="number" value={fullPrice} onChange={e=>setFullPrice(Number(e.target.value))} style={{flex:1, padding:"12px 14px", border:"none", fontSize:22, fontWeight:700, fontFamily:"inherit", color:B.ink, background:"transparent", outline:"none"}}/>
              </div>
              <input type="range" min={1000} max={1000000} step={1000} value={fullPrice} onChange={e=>setFullPrice(Number(e.target.value))} style={{width:"100%", marginBottom:4, accentColor:preset.color}}/>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:B.inkLight, marginBottom:14}}>
                <span>{region.symbol}1K</span><span>{region.symbol}250K</span><span>{region.symbol}500K</span><span>{region.symbol}1M</span>
              </div>

              {(goalType==="house"||goalType==="car") && (
                <div style={{padding:"12px 14px", borderRadius:10, background:`${preset.color}10`, border:`1px solid ${preset.color}30`, marginBottom:14}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:12, color:B.inkLight}}>{dpLabel} required</div>
                      <div style={{fontSize:11, color:B.inkLight, marginTop:2}}>{goalType==="house"?"35% down = better mortgage rates & no PMI":"20% down = avoid being underwater on your loan"}</div>
                    </div>
                    <div style={{fontSize:24, fontWeight:700, color:preset.color}}>{fmt(goalAmount)}</div>
                  </div>
                </div>
              )}

              <label style={{fontSize:12, color:B.inkLight, display:"block", marginBottom:6}}>
                Already saved: <strong style={{color:B.ink}}>{fmt(savedSoFar)}</strong>
                {savedSoFar>0 && <span style={{color:B.success, marginLeft:6}}>({progressPct.toFixed(0)}% there! 🎉)</span>}
              </label>
              <input type="range" min={0} max={goalAmount} step={100} value={savedSoFar} onChange={e=>setSavedSoFar(Number(e.target.value))} style={{width:"100%", accentColor:B.gold}}/>
            </div>

            <div style={{...cardStyle}}>
              <div style={{...labelStyle, marginBottom:14}}>Step 3 — How much can you invest monthly?</div>
              <div style={{...goldInput(B.gold), marginBottom:10}}>
                <span style={{padding:"12px 14px", fontSize:18, fontWeight:700, color:B.gold, background:`${B.gold}12`}}>{region.symbol}</span>
                <input type="number" value={monthlyBudget} onChange={e=>setMonthlyBudget(Number(e.target.value))} style={{flex:1, padding:"12px 14px", border:"none", fontSize:22, fontWeight:700, fontFamily:"inherit", color:B.ink, background:"transparent", outline:"none"}}/>
                <span style={{padding:"12px 14px", fontSize:13, color:B.inkLight}}>/mo</span>
              </div>
              <input type="range" min={10} max={5000} step={10} value={monthlyBudget} onChange={e=>setMonthlyBudget(Number(e.target.value))} style={{width:"100%", accentColor:B.gold}}/>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:B.inkLight, marginTop:2}}>
                <span>{region.symbol}10</span><span>{region.symbol}500</span><span>{region.symbol}1K</span><span>{region.symbol}5K</span>
              </div>
            </div>

            {monthlyBudget>0 && goalAmount>0 && (
              <div style={{background:B.navy, borderRadius:16, padding:20, border:`1.5px solid ${B.navyLight}`}}>
                <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:16}}>
                  <LogoIcon size={24} dark={true}/>
                  <div style={{fontSize:12, color:B.gold, textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:"monospace"}}>Your Personalized Plan</div>
                </div>

                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14}}>
                  {[
                    {label:"You need to save", value:fmt(goalAmount), sub:dpLabel, color:B.gold},
                    {label:"Investing monthly", value:`${fmt(monthlyBudget)}/mo`, sub:"your contribution", color:B.goldLight},
                    {label:"Still needed", value:fmt(remaining), sub:savedSoFar>0?`${fmt(savedSoFar)} already saved`:"starting from zero", color:remaining>0?B.goldLight:B.gold},
                    {label:"Time to goal", value:monthsNeeded<13?`${monthsNeeded} mo`:`~${goalYears} yrs`, sub:`with ${finalBlendedRate.toFixed(1)}%/yr avg`, color:B.steel},
                  ].map((item,i)=>(
                    <div key={i} style={{background:B.navyLight, borderRadius:10, padding:"12px 13px"}}>
                      <div style={{fontSize:11, color:B.steel, marginBottom:3}}>{item.label}</div>
                      <div style={{fontSize:17, fontWeight:700, color:item.color, lineHeight:1.1}}>{item.value}</div>
                      <div style={{fontSize:11, color:B.steel, marginTop:3}}>{item.sub}</div>
                    </div>
                  ))}
                </div>

                <div style={{background:B.navyLight, borderRadius:10, padding:"12px 14px", marginBottom:12}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4}}>
                    <span style={{fontSize:13, color:B.steel}}>Projected total with investing</span>
                    <span style={{fontSize:16, fontWeight:700, color:B.gold}}>{fmt(projectedFinal)}</span>
                  </div>
                  <div style={{fontSize:12, color:projectedFinal>=goalAmount?B.gold:B.steel}}>
                    {projectedFinal>=goalAmount?`✅ Goal reached in ~${goalYears} year${goalYears!==1?"s":""}!`:"📈 Investing grows savings faster than cash alone"}
                  </div>
                </div>

                <div style={{background:B.navyLight, borderRadius:10, padding:"12px 14px", marginBottom:14}}>
                  <div style={{fontSize:12, color:B.steel, marginBottom:10, fontWeight:600}}>How to invest your {fmt(monthlyBudget)}/month:</div>
                  {finalSuggestions.map((s,i)=>(
                    <div key={i} style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:i<finalSuggestions.length-1?8:0}}>
                      <div style={{display:"flex", alignItems:"center", gap:8}}>
                        <div style={{width:32, height:32, borderRadius:8, background:`${B.gold}22`, border:`1px solid ${B.gold}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:B.gold, flexShrink:0}}>{s.pct}%</div>
                        <div>
                          <div style={{fontSize:13, fontWeight:700, color:B.white}}>{s.ticker}</div>
                          <div style={{fontSize:11, color:B.steel}}>{s.name.split(" ").slice(0,3).join(" ")}</div>
                        </div>
                      </div>
                      <div style={{fontSize:15, fontWeight:700, color:B.gold}}>{fmt(monthlyBudget*s.pct/100)}</div>
                    </div>
                  ))}
                </div>

                <div style={{fontSize:11, color:B.steel, marginBottom:14, lineHeight:1.5}}>⚠️ Projections use historical averages. Not a guarantee.</div>

                <button onClick={()=>setTab("Plan")} style={{width:"100%", padding:"14px", borderRadius:12, background:`linear-gradient(135deg, ${B.gold}, ${B.goldDim})`, border:"none", color:B.navy, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit", letterSpacing:"-0.2px"}}>
                  See Full Breakdown →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ════ PLAN ════ */}
        {tab==="Plan" && (
          <div style={{padding:18, display:"flex", flexDirection:"column", gap:16}}>

            <div style={{background:B.navy, borderRadius:14, padding:16}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12}}>
                <div>
                  <div style={{fontSize:20, fontWeight:700, color:B.white}}>{preset.emoji} {goalName}</div>
                  <div style={{fontSize:13, color:B.steel, marginTop:2}}>Full price: {fmt(fullPrice)}</div>
                </div>
                <button onClick={()=>setTab("Goals")} style={{padding:"5px 11px", borderRadius:20, border:`1px solid ${B.navyLight}`, background:B.navyLight, fontSize:12, color:B.steel, cursor:"pointer", fontFamily:"inherit"}}>Edit ✎</button>
              </div>
              <div style={{display:"flex", gap:10}}>
                <div style={{flex:1, padding:"10px 12px", background:B.navyLight, borderRadius:10}}>
                  <div style={{fontSize:11, color:B.steel}}>{dpLabel}</div>
                  <div style={{fontSize:18, fontWeight:700, color:B.gold}}>{fmt(goalAmount)}</div>
                </div>
                <div style={{flex:1, padding:"10px 12px", background:B.navyLight, borderRadius:10}}>
                  <div style={{fontSize:11, color:B.steel}}>Monthly investing</div>
                  <div style={{fontSize:18, fontWeight:700, color:B.goldLight}}>{fmt(monthlyBudget)}/mo</div>
                </div>
              </div>
            </div>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
              {[
                {label:"Time to goal", value:goalYears<2?`${monthsNeeded} months`:`~${goalYears} years`, sub:`at ${fmt(monthlyBudget)}/month`, color:B.blue},
                {label:"Projected value", value:fmt(projectedFinal), sub:projectedFinal>=goalAmount?"✅ Goal exceeded!":"Keep going!", color:B.success},
                {label:"Still needed", value:fmt(remaining), sub:`${fmt(savedSoFar)} saved so far`, color:remaining>0?B.goldDim:B.success},
                {label:"Investment gain", value:fmt(Math.max(0,projectedFinal-monthlyBudget*monthsNeeded-savedSoFar)), sub:"from compound growth", color:B.gold},
              ].map((card,i)=>(
                <div key={i} style={{...cardStyle}}>
                  <div style={{fontSize:11, color:B.inkLight, marginBottom:3}}>{card.label}</div>
                  <div style={{fontSize:16, fontWeight:700, color:card.color, lineHeight:1.2}}>{card.value}</div>
                  <div style={{fontSize:11, color:B.inkLight, marginTop:2}}>{card.sub}</div>
                </div>
              ))}
            </div>

            <div style={{...cardStyle}}>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
                <div>
                  <div style={{...labelStyle}}>Growth at {finalBlendedRate.toFixed(1)}%/yr avg</div>
                  <div style={{fontSize:22, fontWeight:700, color:B.gold, marginTop:4}}>{fmt(projectedFinal)}</div>
                  <div style={{fontSize:12, color:B.inkLight}}>Goal: {fmt(goalAmount)}</div>
                </div>
                <div style={{fontSize:12, color:projectedFinal>=goalAmount?B.success:B.danger, textAlign:"right", paddingTop:4}}>
                  {projectedFinal>=goalAmount?"✅ Goal reached!":`⚠️ ${fmt(goalAmount-projectedFinal)} short`}
                </div>
              </div>
              <Sparkline data={yearlySamples} color={projectedFinal>=goalAmount?B.gold:B.goldDim} h={64}/>
              <div style={{display:"flex", justifyContent:"space-between", fontSize:11, color:B.inkLight, marginTop:4}}>
                <span>Now</span><span>{Math.round(goalYears/2)} yr</span><span>{goalYears} yr</span>
              </div>
              <div style={{fontSize:11, color:B.inkLight, marginTop:6}}>⚠️ Historical averages only. Not a guarantee.</div>
            </div>

            <div style={{...cardStyle, display:"flex", justifyContent:"space-around"}}>
              {[
                {pct:progressPct, color:B.gold, label:"Saved", val:`${progressPct.toFixed(0)}%`},
                {pct:Math.min(100,(projectedFinal/goalAmount)*100), color:B.success, label:"On Track", val:`${Math.min(100,(projectedFinal/goalAmount)*100).toFixed(0)}%`},
                {pct:Math.min(100,(monthlyBudget/(goalAmount/12||1))*100), color:B.blue, label:"Monthly %", val:`${Math.min(100,(monthlyBudget/(goalAmount/12||1))*100).toFixed(0)}%`},
              ].map((ring,i)=>(
                <div key={i} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:4}}>
                  <Ring pct={ring.pct} color={ring.color}/>
                  <div style={{fontSize:14, fontWeight:700, color:ring.color}}>{ring.val}</div>
                  <div style={{fontSize:11, color:B.inkLight}}>{ring.label}</div>
                </div>
              ))}
            </div>

            <button onClick={()=>setTab("Invest")} style={{padding:"14px", borderRadius:12, background:`linear-gradient(135deg, ${B.gold}, ${B.goldDim})`, border:"none", color:B.navy, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit"}}>
              See Where to Invest in {region.name} →
            </button>
          </div>
        )}

        {/* ════ INVEST ════ */}
        {tab==="Invest" && (
          <div style={{padding:18, display:"flex", flexDirection:"column", gap:16}}>

            <div style={{...cardStyle}}>
              <div style={{...labelStyle, marginBottom:12}}>Best Platforms in {region.name} {region.flag}</div>
              {region.platforms.map((p,i)=>(
                <div key={i} style={{display:"flex", gap:10, marginBottom:i<region.platforms.length-1?12:0, paddingBottom:i<region.platforms.length-1?12:0, borderBottom:i<region.platforms.length-1?`1px solid ${B.border}`:"none"}}>
                  <span>{p.star?"⭐":"◦"}</span>
                  <div>
                    <div style={{fontSize:14, fontWeight:p.star?700:500, color:p.star?B.ink:B.inkLight}}>{p.name}</div>
                    <div style={{fontSize:12, color:B.inkLight, marginTop:1}}>{p.note}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{...cardStyle}}>
              <div style={{...labelStyle, marginBottom:10}}>Your Risk Comfort</div>
              <div style={{display:"flex", gap:8}}>
                {[["conservative","🛡️","Safe"],["moderate","⚖️","Balanced"],["aggressive","🚀","Growth"]].map(([key,em,label])=>(
                  <button key={key} onClick={()=>setRisk(key)} style={{flex:1, padding:"9px 4px", borderRadius:10, border:`1.5px solid ${risk===key?B.gold:B.border}`, background:risk===key?B.navy:B.offWhite, color:risk===key?B.gold:B.inkLight, fontSize:12, fontWeight:risk===key?700:400, cursor:"pointer", fontFamily:"inherit"}}>
                    {em}<br/>{label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{...cardStyle}}>
              <div style={{...labelStyle, marginBottom:4}}>Suggested Funds</div>
              <div style={{fontSize:12, color:B.inkLight, marginBottom:14}}>{goalYears}-year {risk} strategy · {region.name}</div>
              {finalSuggestions.map((s,i)=>(
                <div key={i} style={{marginBottom:14, paddingBottom:14, borderBottom:i<finalSuggestions.length-1?`1px solid ${B.border}`:"none"}}>
                  <div style={{display:"flex", justifyContent:"space-between", marginBottom:5}}>
                    <div>
                      <span style={{fontSize:15, fontWeight:700}}>{s.ticker}</span>
                      <span style={{fontSize:12, color:B.inkLight, marginLeft:7}}>{s.name}</span>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:14, fontWeight:700, color:B.gold}}>{s.pct}%</div>
                      <div style={{fontSize:11, color:B.inkLight}}>{fmt(monthlyBudget*s.pct/100)}/mo</div>
                    </div>
                  </div>
                  <div style={{height:5, borderRadius:3, background:B.border, marginBottom:6}}>
                    <div style={{height:"100%", width:`${s.pct}%`, borderRadius:3, background:`linear-gradient(90deg, ${B.gold}, ${B.goldLight})`, transition:"width 0.5s"}}/>
                  </div>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div style={{fontSize:12, color:B.inkLight, flex:1}}>{s.why}</div>
                    <span style={{marginLeft:8, padding:"2px 8px", borderRadius:20, background:B.tag, fontSize:11, color:B.inkLight, whiteSpace:"nowrap"}}>{s.risk}</span>
                  </div>
                </div>
              ))}
              <div style={{padding:"10px 13px", background:B.navy, borderRadius:10}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <span style={{fontSize:13, color:B.steel}}>Blended avg. return</span>
                  <span style={{fontSize:14, fontWeight:700, color:B.gold}}>{finalBlendedRate.toFixed(1)}%/yr</span>
                </div>
                <div style={{fontSize:11, color:B.steel, marginTop:3}}>Historical average · Not a guarantee</div>
              </div>
            </div>

            <div style={{background:B.navy, borderRadius:12, padding:14}}>
              <div style={{fontSize:13, fontWeight:700, color:B.gold, marginBottom:6}}>🏦 Tax tip for {region.name}</div>
              <div style={{fontSize:13, color:B.steel, lineHeight:1.6}}>{region.taxNote}</div>
            </div>

            <div style={{background:B.goldBg, borderRadius:12, padding:13, border:`1px solid ${B.gold}33`, fontSize:12, color:B.inkLight, lineHeight:1.6}}>
              ⚠️ <strong style={{color:B.goldDim}}>Disclaimer:</strong> Educational only. Not financial advice. Consult a licensed advisor in {region.name} before investing.
            </div>
          </div>
        )}

        {/* ════ CHAT ════ */}
        {tab==="Chat" && (
          <div style={{display:"flex", flexDirection:"column", height:"calc(100vh - 155px)"}}>
            <div style={{padding:"7px 14px", background:B.navy, fontSize:12}}>
              <span style={{color:B.gold, fontWeight:600}}>{region.flag} {region.name} · {region.currency}</span>
              <span style={{color:B.steel}}> · {preset.emoji} {goalName} · {fmt(goalAmount)} · {fmt(monthlyBudget)}/mo</span>
            </div>
            <div style={{flex:1, overflowY:"auto", padding:14, display:"flex", flexDirection:"column", gap:12}}>
              {messages.map((msg,i)=>(
                <div key={i} style={{display:"flex", justifyContent:msg.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{maxWidth:"86%", padding:"11px 13px", borderRadius:msg.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", background:msg.role==="user"?B.goldDim:B.navyLight, border:msg.role==="ai"?`1px solid ${B.border}`:"none", color:msg.role==="user"?B.white:B.ink, fontSize:14, lineHeight:1.65}}
                    dangerouslySetInnerHTML={{__html:renderMd(msg.text)}}/>
                </div>
              ))}
              {typing && (
                <div style={{display:"flex", gap:5, padding:"11px 13px", background:B.navyLight, border:`1px solid ${B.border}`, borderRadius:"18px 18px 18px 4px", width:"fit-content"}}>
                  {[0,1,2].map(i=><div key={i} style={{width:7, height:7, borderRadius:"50%", background:B.gold, animation:`dot 1s ${i*0.2}s infinite`}}/>)}
                </div>
              )}
              <div ref={chatEndRef}/>
            </div>
            <div style={{padding:"7px 12px", display:"flex", gap:6, overflowX:"auto", borderTop:`1px solid ${B.border}`, background:B.navyLight}}>
              {["What platforms should I use?","How do I pay off debt?","Best tax accounts?","This feels impossible"].map(q=>(
                <button key={q} onClick={()=>setChatInput(q)} style={{padding:"5px 11px", borderRadius:20, border:`1px solid ${B.border}`, background:B.steelBg, fontSize:11, color:B.inkLight, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit"}}>{q}</button>
              ))}
            </div>
            <div style={{padding:"10px 14px", borderTop:`1px solid ${B.border}`, display:"flex", gap:8, background:B.navyLight}}>
              <input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder={`Ask about investing in ${region.name}...`} style={{flex:1, padding:"9px 13px", borderRadius:24, border:`1px solid ${B.border}`, fontSize:14, fontFamily:"inherit", color:B.ink, background:B.steelBg, outline:"none"}}/>
              <button onClick={sendChat} style={{width:38, height:38, borderRadius:"50%", background:B.navy, border:"none", cursor:"pointer", fontSize:15, color:B.gold}}>➤</button>
            </div>
          </div>
        )}

        {/* ════ LEARN ════ */}
        {tab==="Learn" && (
          <div style={{padding:18, display:"flex", flexDirection:"column", gap:14}}>
            <div style={{...labelStyle}}>Financial Education for Working Adults</div>
            {[
              {emoji:"⛓️", title:"Pay Off Debt First", tag:"Priority #1", tagColor:B.danger, body:"High-interest debt (18-25%) costs more than investing earns. Paying off a credit card at 20% APR is like a guaranteed 20% return — better than the stock market.\n\nUse the avalanche method: pay minimums on all debts, then throw every extra dollar at the highest-interest one first."},
              {emoji:"🛡️", title:"Build Your Emergency Fund", tag:"Foundation", tagColor:B.success, body:"Before investing aggressively, save 1-3 months of expenses in a savings account. This stops you from selling investments during emergencies and going back into debt.\n\nStart with just 1 month's expenses as your first milestone."},
              {emoji:"📅", title:"Dollar-Cost Averaging", tag:"Core Strategy", tagColor:B.blue, body:"Invest a fixed amount every month regardless of market conditions. When prices drop, you buy more shares. When they rise, your shares grow.\n\nThis works perfectly with a monthly salary. Automate it and stop worrying about timing the market."},
              {emoji:"⏳", title:"Compound Growth — Start Now", tag:"Why Time Matters", tagColor:B.goldDim, body:`Investing ${region.symbol}200/month at 10%/year:\n• 10 years → ~${region.symbol}38,000\n• 20 years → ~${region.symbol}137,000\n• 30 years → ~${region.symbol}395,000\n\nYou only contributed ${region.symbol}72,000. The rest is compound growth. Starting today beats starting later with more money.`},
              {emoji:"📊", title:"Index Funds: Keep It Simple", tag:"What to Buy", tagColor:B.success, body:`Index funds automatically own hundreds of companies at once. They're:\n\n• Diversified by design\n• Low cost — typically 0.03-0.20% annual fees\n• Historically ~10%/year average over long periods\n• Available on ${region.platforms.filter(p=>p.star).map(p=>p.name).join(" and ")}\n\nMost experts recommend them over picking individual stocks.`},
              {emoji:"🏠", title:"Saving for Big Purchases", tag:"Cars & Houses", tagColor:B.goldDim, body:"For goals under 3 years: keep savings in a high-yield savings account. Don't invest near-term money in stocks — markets can drop 30% right when you need it.\n\nFor goals 3+ years away: a mix of bonds and index ETFs can grow your savings while managing risk."},
              {emoji:"💰", title:"The 50/30/20 Budget Rule", tag:"Budgeting", tagColor:B.blue, body:"A simple framework for full-time workers:\n\n• 50% — Needs: rent, food, transport, bills\n• 30% — Wants: dining out, entertainment\n• 20% — Savings & debt payoff\n\nIf 20% feels impossible, start with 5% and increase by 1% every 3 months. Pay yourself first on payday."},
              {emoji:"🧠", title:"Mistakes to Avoid", tag:"Common Traps", tagColor:B.danger, body:"1. Panic selling when markets drop — locks in losses\n2. Waiting for the perfect time — time in market beats timing\n3. Investing before clearing high-interest debt\n4. Investing money needed within 1-2 years\n5. Checking your portfolio every day\n6. Chasing trending stocks or crypto hype\n\nPatience and consistency beat cleverness every time."},
            ].map((card,i)=>(
              <div key={i} style={{...cardStyle}}>
                <div style={{display:"flex", alignItems:"flex-start", gap:11, marginBottom:10}}>
                  <span style={{fontSize:26, flexShrink:0}}>{card.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex", alignItems:"center", gap:8, flexWrap:"wrap"}}>
                      <span style={{fontSize:14, fontWeight:700}}>{card.title}</span>
                      <span style={{padding:"2px 8px", borderRadius:20, background:`${card.tagColor}15`, border:`1px solid ${card.tagColor}40`, fontSize:11, color:card.tagColor, fontWeight:600}}>{card.tag}</span>
                    </div>
                  </div>
                </div>
                <div style={{fontSize:13, color:B.inkLight, lineHeight:1.75, whiteSpace:"pre-line"}}>{card.body}</div>
              </div>
            ))}
            <div style={{background:B.navy, borderRadius:12, padding:14, fontSize:12, color:B.steel, lineHeight:1.6}}>
              ⚠️ <strong style={{color:B.gold}}>Disclaimer:</strong> All content is educational only. Not financial advice. Consult a licensed advisor in {region.name}.
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes dot { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: #c9a84c44; border-radius: 2px; }
        input[type=range] { height: 4px; border-radius: 2px; }
      `}</style>
    </div>
  );
}
