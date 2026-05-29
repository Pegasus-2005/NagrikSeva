/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KnowledgeChunk {
  id: string;
  source: string;
  source_bn: string;
  section: string;
  section_bn: string;
  clause: string;
  clause_bn: string;
  content: string;
  content_bn: string;
  keywords: string[];
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "wb_water_01",
    source: "Kolkata Municipal Corporation Citizen Charter (2023)",
    source_bn: "কলকাতা পৌরনিগম সিটিজেন চার্টার (২০২৩)",
    section: "Water Supply standards",
    section_bn: "জল সরবরাহ ব্যবস্থা ও পরিষেবার মানদণ্ড",
    clause: "Clause 3.1",
    clause_bn: "ধারা ৩.১",
    content: "The Kolkata Municipal Corporation (KMC) is obligated to provide clean, potable water to all registered holdings. In the event of a total water supply breakdown, the Ward Health Inspector must be notified. Under Clause 3.1, standard pipeline repairs must be conducted and regular supply restored within 24 working hours.",
    content_bn: "কলকাতা পৌরনিগম (KMC) সমস্ত নিবন্ধিত হোল্ডিংয়ে পরিচ্ছন্ন ও পানীয় জল সরবরাহ করতে বাধ্য। সম্পূর্ণ জল সরবরাহ বন্ধ হওয়ার ক্ষেত্রে সংশ্লিষ্ট ওয়ার্ড হেলথ ইন্সপেক্টরকে জানাতে হবে। ধারা ৩.১ অনুযায়ী, সাধারণ পাইপলাইন মেরামতির কাজ এবং জল সরবরাহ ২৪ ঘণ্টার মধ্যে স্বাভাবিক করতে হবে।",
    keywords: ["water", "supply", "breakdown", "kmc", "pipeline", "repair", "drinking", "tap", "kolkata"]
  },
  {
    id: "wb_water_02",
    source: "West Bengal Municipal Service Rules & Standards",
    source_bn: "পশ্চিমবঙ্গ পৌরসেবা নিয়মাবলী ও মানদণ্ড",
    section: "Public Health Engineering",
    section_bn: "জনস্বাস্থ্য প্রকৌশল বিভাগ",
    clause: "Section 4(II)",
    clause_bn: "ধারা ৪(II)",
    content: "Under Section 4(II), any municipal citizen experiencing water contamination or high iron content in their municipal tap can request safety testing and chlorination. Safe tap-water quality standards require iron content under 0.3 mg/l and zero residual chlorine smell. Action must be taken within 48 to 72 hours of receiving written complaint.",
    content_bn: "ধারা ৪(II) অনুযায়ী, কোনো নাগরিক কল থেকে দূষিত জল বা অতিরিক্ত আয়রনযুক্ত লাল জল পেলে নিরাপত্তা পরীক্ষা ও ক্লোরিনেশনের অনুরোধ করতে পারেন। পানীয় জলের মানদণ্ড অনুযায়ী আয়রন ০.৩ মিলিগ্রাম/লিটারের কম এবং ব্যাকটেরিয়ামুক্ত হতে হবে। লিখিত অভিযোগ পাওয়ার ৪৮ থেকে ৭২ ঘণ্টার মধ্যে পদক্ষেপ নিতে হবে।",
    keywords: ["water", "contamination", "chlorine", "iron", "smell", "chlorination", "dirty", "tap"]
  },
  {
    id: "wb_elec_01",
    source: "West Bengal Electricity Regulatory Commission (WBERC) Performance Standards",
    source_bn: "পশ্চিমবঙ্গ বিদ্যুৎ নিয়ন্ত্রণ কমিশন (WBERC) কর্মক্ষমতা প্রবিধান",
    section: "Electricity Supply Guidelines",
    section_bn: "বিদ্যুৎ সরবরাহ গাইডলাইন",
    clause: "Regulation 5.2",
    clause_bn: "প্রবিধান ৫.২",
    content: "Under Regulation 5.2, power interruptions due to line fuse or transformer failure must be resolved by WBSEDCL or CESC within 4 hours in urban areas, and 24 hours in rural areas. Faulty meters must be inspected within 3 working days and replaced within 7 days of deposit fee payment.",
    content_bn: "প্রবিধান ৫.২ অনুযায়ী, বিদ্যুৎ লাইনের ফিউজ বা ট্রান্সফরমার বিকল হওয়ার জন্য লোডশেডিং হলে শহরাঞ্চলে ৪ ঘণ্টা এবং গ্রামাঞ্চলে ২৪ ঘণ্টার মধ্যে WBSEDCL বা CESC-কে পরিষেবা স্বাভাবিক করতে হবে। ত্রুটিপূর্ণ মিটার ৩ কার্যদিবসের মধ্যে পরিদর্শন এবং জমা ফি দেওয়ার ৭ দিনের মধ্যে বদলাতে হবে।",
    keywords: ["electricity", "power", "fuse", "transformer", "load", "blackout", "meter", "wbsedcl", "cesc"]
  },
  {
    id: "wb_elec_02",
    source: "West Bengal Electricity Safety & Billing Rules",
    source_bn: "পশ্চিমবঙ্গ বিদ্যুৎ নিরাপত্তা ও বিলিং বিধি",
    section: "Billing Disputes",
    section_bn: "বিল সংক্রান্ত বিরোধ নিষ্পত্তি",
    clause: "Section 56(1)",
    clause_bn: "ধারা ৫৬(১)",
    content: "Section 56(1) of the Electricity Act outlines that no power disconnection can happen without a 15-day clear written notice. If a consumer raises a billing dispute, WBSEDCL must offer a provisional bill correction based on prior 6 months' average consumption pending formal physical testing of the meter.",
    content_bn: "বিদ্যুৎ আইনের ধারা ৫৬(১) অনুযায়ী, ১৫ দিনের স্পষ্ট লিখিত নোটিশ ছাড়া বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা যাবে না। গ্রাহক বিল নিয়ে আপত্তি জানালে, মিটার পরীক্ষার সিদ্ধান্ত বিচারাধীন থাকাকালীন পূর্ববর্তী ৬ মাসের গড় ব্যবহারের ভিত্তিতে ট্রায়াল বিল দিতে হবে।",
    keywords: ["electricity", "bill", "billing", "dispute", "disconnection", "meter", "reading", "charge", "overcharging"]
  },
  {
    id: "wb_road_01",
    source: "West Bengal PWD Roads & Bridges Maintenance Charter",
    source_bn: "পশ্চিমবঙ্গ পিডাব্লুডি (PWD) রাস্তা ও সেতু রক্ষণাবেক্ষণ চার্টার",
    section: "Road Repairs & Potholes",
    section_bn: "রাস্তা মেরামত ও খানাখন্দ",
    clause: "Section 8A",
    clause_bn: "ধারা ৮A",
    content: "Pothole repairs on key arterial municipal roads must be undertaken in non-monsoon periods and completed within 7 to 14 days of filing a grievance with local PWD division. For rural roads under Pathasree scheme, the turnaround time for repair allocation of funds is 21 working days.",
    content_bn: "প্রধান পৌর রাস্তাগুলির খানাখন্দ বর্ষা বাদে অন্য সময়ে স্থানীয় পিডাব্লুডি দপ্তরে অভিযোগ জানানোর ৭ থেকে ১৪ দিনের মধ্যে মেরামত করতে হবে। পথশ্রী প্রকল্পের আওতায় গ্রামীণ রাস্তা মেরামতের তহবিল মঞ্জুর করার সময়সীমা ২১ কার্যদিবস।",
    keywords: ["road", "street", "pothole", "pave", "pwd", "highway", "broken", "accident", "pathasree"]
  },
  {
    id: "wb_garbage_01",
    source: "Kolkata Municipal Corporation Solid Waste Management Bye-laws",
    source_bn: "কলকাতা পৌরনিগম কঠিন বর্জ্য ব্যবস্থাপনা উপ-আইন",
    section: "Garbage Clearance",
    section_bn: "আবর্জনা অপসারণ বিধি",
    clause: "Regulation 2018-C",
    clause_bn: "প্রবিধান ২০১৮-C",
    content: "The disposal of solid non-hazardous waste is managed daily. Municipal dustbins must be cleared once every 24 hours. The failure to clear accumulated garbage in neighborhood collection vats within 48 hours is a direct violation of Ward Sanitary Guidelines. Complaining citizens can invoke Clause C to demand clearance.",
    content_bn: "কঠিন সাধারণ বর্জ্য দৈনিক ভিত্তিতে পরিষ্কার করতে হবে। জনবহুল ডাস্টবিনগুলি প্রতি ২৪ ঘণ্টায় অন্তত একবার খালি করতে হবে। পাড়ার ভ্যাট থেকে ৪৮ ঘণ্টার মধ্যে বর্জ্য অপসারণ করতে ব্যর্থ হওয়া স্যানিটারি নির্দেশিকার প্রত্যক্ষ লঙ্ঘন। নাগরিকরা ধারা C অনুযায়ী অবিলম্বে আবর্জনা সরানোর দাবি জানাতে পারেন।",
    keywords: ["garbage", "dump", "dustbin", "waste", "cleaning", "vat", "smell", "scraps", "solid waste"]
  },
  {
    id: "wb_drain_01",
    source: "Kolkata Municipal Corporation Sewerage & Drainage Rules",
    source_bn: "কলকাতা পৌরনিগম নিষ্কাশন ও নর্দমা প্রণালী বিধি",
    section: "Water Logging & Drain Clogs",
    section_bn: "জলমগ্নতা ও নর্দমা অবরুদ্ধতা",
    clause: "Rule 12.3",
    clause_bn: "নিয়ম ১২.৩",
    content: "Blocked water-pipes, sewer overflows, or gully-pit clogs causing active water-logging in residential streets must be cleared within 24 to 48 hours of reporting. If natural heavy monsoon water collects, drainage pumping stations must be operated continuously until water level goes below curb level, as per Rule 12.3.",
    content_bn: "আবাসিক রাস্তায় জল জমে থাকা, কালভার্ট উপচে নর্দমার পাইপ জ্যাম হওয়া ২৪ থেকে ৪৮ ঘণ্টার মধ্যে পরিষ্কার করতে হবে। বর্ষায় অতিরিক্ত জল জমলে পাম্পিং স্টেশন লাগাতার সচল রেখে জল নিকাশি স্তর নামিয়ে আনতে হবে, নিয়ম ১২.৩ অনুযায়ী।",
    keywords: ["drain", "drainage", "sewer", "water-logging", "clog", "flood", "stagnant", "mosquitos"]
  },
  {
    id: "rti_act_01",
    source: "Right to Information Act (RTI) 2005",
    source_bn: "তথ্য জানার অধিকার আইন (RTI) ২০০৫",
    section: "Processing and Timelines",
    section_bn: "আবেদন প্রক্রিয়াকরণ ও সময়সীমা",
    clause: "Section 6 & 7",
    clause_bn: "ধারা ৬ ও ৭",
    content: "Under Section 6(1) of the Right to Information Act 2005, a citizen can file an application requesting information from any Public Authority in English, Hindi, or local language. Under Section 7(1), the Public Information Officer (PIO) must provide the requested information within 30 days of application receipt. If it relates to life and liberty, it must be provided within 48 hours.",
    content_bn: "তথ্য জানার অধিকার আইন ২০০৫-এর ধারা ৬(১) অনুযায়ী, ভারতের যেকোনো নাগরিক ইংরেজি, হিন্দি বা স্থানীয় ভাষায় যেকোনো জন-কর্তৃপক্ষের কাছে তথ্য চেয়ে আবেদন করতে পারেন। ধারা ৭(১) অনুযায়ী, আবেদন প্রাপ্তির ৩০ দিনের মধ্যে তথ্য প্রদান বাধ্যতামুলক। তথ্য যদি জীবন ও স্বাধীনতার সাথে জড়িত হয়, তবে তা ৪৮ ঘণ্টার মধ্যে প্রদান করতে হবে।",
    keywords: ["rti", "information", "fee", "application", "pio", "rupees", "authority", "records", "fund", "spend", "delay"]
  },
  {
    id: "rti_act_02",
    source: "Right to Information Act (RTI) 2005 - Fee structure",
    source_bn: "তথ্য জানার অধিকার আইন (RTI) ২০০৫ - ফি কাঠামো",
    section: "Application Fees",
    section_bn: "আবেদন ফি",
    clause: "Section 6 (Fee Clause)",
    clause_bn: "ধারা ৬ (ফি প্রবিধান)",
    content: "A standard application fee of Rupees Ten (Rs. 10/-) is required for filing an RTI. This can be paid via Court Fee Stamp, Demand Draft, Indian Postal Order (IPO), or online portal. Citizens belonging to the Below Poverty Line (BPL) category are completely exempt from paying any application fees upon submitting copy of BPL card.",
    content_bn: "RTI আবেদনের জন্য ১০ টাকার কোর্ট ফি বা পোস্টাল অর্ডার ফি প্রয়োজন। দারিদ্র্যসীমার নিচে (BPL) বসবাসকারী নাগরিকরা বিপিএল কার্ডের কপি জমা দিলে কোনো আবেদন ফি ছাড়াই সম্পূর্ণ বিনামূল্যে তথ্য পাওয়ার অধিকারী।",
    keywords: ["rti", "fee", "payment", "rupees", "ten", "court", "bpl", "exempt", "poverty", "ipo", "postal"]
  },
  {
    id: "wb_cert_01",
    source: "West Bengal Registration of Births and Deaths Rules (2000)",
    source_bn: "পশ্চিমবঙ্গ জন্ম ও মৃত্যু নিবন্ধন নিয়মাবলী (২০০০)",
    section: "Issuance of Certificates",
    section_bn: "শংসাপত্র প্রদান",
    clause: "Rule 9(4)",
    clause_bn: "নিয়ম ৯(৪)",
    content: "Births and deaths must be registered within 21 days of occurrence with local health registrars (KMC, Municipalities, or Panchayats). Certificate issuance takes peak 5-7 working days. Late registrations (after 30 days but under 1 year) require District Registrar permission and late fee, as per Rule 9(4).",
    content_bn: "জন্ম বা মৃত্যুর ২১ দিনের মধ্যে স্থানীয় নিবন্ধকের (কেএমসি, পৌরসভা বা পঞ্চায়েত) কাছে নথিভুক্তি করতে হবে। শংসাপত্র ৫ থেকে ৭ কার্যদিবসের মধ্যে দেওয়া সম্পন্ন হয়। ৩০ দিনের পর ও ১ বছরের নিচের বিলম্বিত নিবন্ধনের জন্য উপযুক্ত কর্তৃপক্ষের অনুমতি প্রয়োজন, নিয়ম ৯(৪) অনুযায়ী।",
    keywords: ["birth", "death", "certificate", "registration", "delay", "hospital", "delivery", "marriage", "registrar"]
  },
  {
    id: "wb_pension_01",
    source: "Swasthya Sathi & State Pension Benefit Schemes",
    source_bn: "স্বাস্থ্যসাথী ও বার্ধক্য সামাজিক নিরাপত্তা পেনশন স্কিম",
    section: "Eligibility Criteria",
    section_bn: "যোগ্যতার মানদণ্ড",
    clause: "West Bengal Welfare Act (2016)",
    clause_bn: "পশ্চিমবঙ্গ জনকল্যাণ নির্দেশিকা (২০১৬)",
    content: "Under National Social Assistance Programme (NSAP) and State Indira Gandhi Old Age Pension Scheme in West Bengal, citizens aged 60 and above with household income below state-stipulated guidelines are entitled to a monthly pension. Swasthya Sathi family health insurance provides smart-card coverage up to Rs 5 Lakhs per family annually, registered primarily under the female head of the family.",
    content_bn: "জাতীয় সামাজিক সহায়তা কর্মসূচির আওতায় পশ্চিমবঙ্গে ৬০ বছর বা তার বেশি বয়সী বিপন্ন নাগরিকদের জন্য বার্ধক্য সমাজকল্যাণ মাসিক পেনশন বরাদ্দ করা হয়। স্বাস্থ্যসাথী বীমার মাধ্যমে নারী প্রধান পরিবারের জন্য বার্ষিক ৫ লক্ষ টাকা পর্যন্ত ক্যাশলেস চিকিৎসার সুবিধা কার্ডের মাধ্যমে পাওয়া যায়।",
    keywords: ["pension", "aged", "monthly", "swasthya sathi", "health", "smart card", "old age", "welfare", "bpl"]
  }
];

/**
 * Perform a simple local keyword and score-based search over the knowledge base.
 */
export function queryKnowledgeBase(userDescription: string, category: string): KnowledgeChunk[] {
  const normDescription = userDescription.toLowerCase();
  const normCategory = category.toLowerCase().replace("_", " ");

  const scoredChunks = KNOWLEDGE_BASE.map(chunk => {
    let score = 0;

    // Direct category matches
    if (chunk.keywords.some(kw => normCategory.includes(kw) || kw.includes(normCategory))) {
      score += 4;
    }

    // Specific user description matches
    chunk.keywords.forEach(kw => {
      if (normDescription.includes(kw)) {
        score += 2;
      }
    });

    // Content checks
    const kwInContentMatches = chunk.keywords.filter(kw => chunk.content.toLowerCase().includes(kw)).length;
    score += kwInContentMatches * 0.1;

    return { chunk, score };
  });

  // Sort and filter chunks that have score > 0.5
  const results = scoredChunks
    .filter(item => item.score > 0.5)
    .sort((a, b) => b.score - a.score)
    .map(item => item.chunk);

  // Return top 3, fallback is to return General RTI chunks if nothing matches
  if (results.length === 0) {
    return KNOWLEDGE_BASE.filter(c => c.id.startsWith("rti_") || c.id === "rti_act_01" || c.id === "rti_act_02");
  }

  return results.slice(0, 3);
}
