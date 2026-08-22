/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KnowledgeChunk {
  id: string;
  /** 'West Bengal' | 'Maharashtra' | 'National' — used to filter strictly by selected state */
  state: "West Bengal" | "Maharashtra" | "National";
  source: string;
  source_bn: string;
  source_hi: string;
  source_mr: string;
  section: string;
  section_bn: string;
  section_hi: string;
  section_mr: string;
  clause: string;
  clause_bn: string;
  clause_hi: string;
  clause_mr: string;
  content: string;
  content_bn: string;
  content_hi: string;
  content_mr: string;
  keywords: string[];
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // ── WEST BENGAL CHARTERS ──────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "wb_water_01",
    state: "West Bengal",
    source: "Kolkata Municipal Corporation Citizen Charter (2023)",
    source_bn: "কলকাতা পৌরনিগম সিটিজেন চার্টার (২০২৩)",
    source_hi: "कोलकाता नगर निगम नागरिक घोषणा पत्र (2023)",
    source_mr: "कोलकाता महानगरपालिका नागरिक सनद (२०२३)",
    section: "Water Supply Standards",
    section_bn: "জল সরবরাহ ব্যবস্থা ও পরিষেবার মানদণ্ড",
    section_hi: "जल आपूर्ति मानक एवं नागरिक अधिकार",
    section_mr: "पाणी पुरवठा मानके आणि सेवा हमी",
    clause: "Clause 3.1",
    clause_bn: "ধারা ৩.১",
    clause_hi: "खंड 3.1",
    clause_mr: "कलम ३.१",
    content: "The Kolkata Municipal Corporation (KMC) is obligated to provide clean, potable water to all registered holdings. In the event of a total water supply breakdown, the Ward Health Inspector must be notified. Under Clause 3.1, standard pipeline repairs must be conducted and regular supply restored within 24 working hours.",
    content_bn: "কলকাতা পৌরনিগম (KMC) সমস্ত নিবন্ধিত হোল্ডিংয়ে পরিচ্ছন্ন ও পানীয় জল সরবরাহ করতে বাধ্য। সম্পূর্ণ জল সরবরাহ বন্ধ হওয়ার ক্ষেত্রে সংশ্লিষ্ট ওয়ার্ড হেলথ ইন্সপেক্টরকে জানাতে হবে। ধারা ৩.১ অনুযায়ী, সাধারণ পাইপলাইন মেরামতির কাজ এবং জল সরবরাহ ২৪ ঘণ্টার মধ্যে স্বাভাবিক করতে হবে।",
    content_hi: "कोलकाता नगर निगम (KMC) सभी नागरिकों को स्वच्छ पेयजल उपलब्ध कराने के लिए बाध्य है। जल आपूर्ति बाधित होने की स्थिति में, संबंधित वार्ड स्वास्थ्य निरीक्षक को सूचित किया जाना चाहिए। खंड 3.1 के तहत 24 घंटे के भीतर मरम्मत कर आपूर्ति बहाल करनी होगी।",
    content_mr: "कोलकाता महानगरपालिका (KMC) सर्व नोंदणीकृत मालमत्तांना स्वच्छ पिण्याचे पाणी पुरवण्यास बांधील आहे. पाणी पुरवठा खंडित झाल्यास, २४ तासांच्या आत दुरुस्ती करून पाणी पुरवठा पूर्ववत करणे बंधनकारक आहे.",
    keywords: ["water", "supply", "breakdown", "kmc", "pipeline", "repair", "drinking", "tap", "kolkata", "jol", "ashche na", "jol nei", "জল", "পানি", "পানি", "नळ", "जलकल"]
  },
  {
    id: "wb_water_02",
    state: "West Bengal",
    source: "West Bengal Municipal Service Rules & Standards",
    source_bn: "পশ্চিমবঙ্গ পৌরসেবা নিয়মাবলী ও মানদণ্ড",
    source_hi: "पश्चिम बंगाल नगर पालिका सेवा नियम एवं मानक",
    source_mr: "पश्चिम बंगाल नागरी सेवा नियम व मानके",
    section: "Public Health Engineering & Water Potability",
    section_bn: "জনস্বাস্থ্য প্রকৌশল বিভাগ ও পানীয় জলের বিশুদ্ধতা",
    section_hi: "लोक स्वास्थ्य यांत्रिकी विभाग एवं जल शुद्धता",
    section_mr: "सार्वजनिक आरोग्य अभियांत्रिकी",
    clause: "Section 4(II)",
    clause_bn: "ধারা ৪(II)",
    clause_hi: "धारा 4(II)",
    clause_mr: "कलम ४(II)",
    content: "Under Section 4(II), any municipal citizen experiencing water contamination or high iron content in their municipal tap can request safety testing and chlorination. Safe tap-water quality standards require iron content under 0.3 mg/l and zero residual chlorine smell. Action must be taken within 48 to 72 hours of receiving written complaint.",
    content_bn: "ধারা ৪(II) অনুযায়ী, কোনো নাগরিক কল থেকে দূষিত জল বা অতিরিক্ত আয়রনযুক্ত লাল জল পেলে নিরাপত্তা পরীক্ষা ও ক্লোরিনেশনের অনুরোধ করতে পারেন। পানীয় জলের মানদণ্ড অনুযায়ী আয়রন ০.৩ মিলিগ্রাম/লিটারের কম এবং ব্যাকটেরিয়ামুক্ত হতে হবে। লিখিত অভিযোগ পাওয়ার ৪৮ থেকে ৭২ ঘণ্টার মধ্যে পদক্ষেপ নিতে হবে।",
    content_hi: "धारा 4(II) के तहत, यदि किसी नागरिक को नल से दूषित या लाल पानी मिलता है, तो वह जल परीक्षण की मांग कर सकता है। लिखित शिकायत मिलने के 48 से 72 घंटों के भीतर कार्रवाई अनिवार्य है।",
    content_mr: "कलम ४(II) नुसार, नळाचे पाणी दूषित किंवा गढूळ असल्यास नागरिक तपासणीची मागणी करू शकतात. तक्रार प्राप्त झाल्यापासून ४৮ ते ७२ तासांच्या आत कारवाई करणे आवश्यक आहे.",
    keywords: ["water", "contamination", "chlorine", "iron", "smell", "chlorination", "dirty", "tap", "turbid", "red water", "দূষিত জল", "গন্দা পানি", "गंदा पानी", "दूषित पाणी"]
  },
  {
    id: "wb_water_03",
    state: "West Bengal",
    source: "West Bengal Municipal Act 1993",
    source_bn: "পশ্চিমবঙ্গ পৌর আইন ১৯৯৩",
    source_hi: "पश्चिम बंगाल नगर पालिका अधिनियम 1993",
    source_mr: "पश्चिम बंगाल नगरपालिका कायदा १९९३",
    section: "Maintenance of Water Mains & Tanker Deployment",
    section_bn: "জল সরবরাহ পাইপলাইন রক্ষণাবেক্ষণ ও বিকল্প পানীয় জলের ব্যবস্থা",
    section_hi: "जल आपूर्ति मुख्य लाइन रखरखाव एवं वैकल्पिक जलापूर्ति",
    section_mr: "पाणी पुरवठा मुख्य वाहिनी देखभाल व टँकर वाटप",
    clause: "Section 234 & 240",
    clause_bn: "ধারা ২৩৪ এবং ২৪০",
    clause_hi: "धारा 234 एवं 240",
    clause_mr: "कलम २३४ व २४०",
    content: "Under Sections 234 and 240 of the West Bengal Municipal Act 1993, the municipality is legally bound to maintain continuous pressure in public water mains. In the event of an extended disruption exceeding 24 hours, the municipal authority must arrange free potable water tankers for the affected ward.",
    content_bn: "পশ্চিমবঙ্গ পৌর আইন ১৯৯৩-এর ধারা ২৩৪ ও ২৪০ অনুযায়ী পৌরসভা সর্বসাধারণের জল সরবরাহের পাইপলাইনে নিয়মিত চাপ বজায় রাখতে বাধ্য। ২৪ ঘণ্টার বেশি জল সরবরাহ ব্যাহত হলে পৌর কর্তৃপক্ষকে ক্ষতিগ্রস্ত এলাকায় বিনামূল্যে জলের ট্যাঙ্কার পাঠাতে হবে।",
    content_hi: "पश्चिम बंगाल नगर पालिका अधिनियम 1993 की धारा 234 एवं 240 के अनुसार, नगर पालिका मुख्य पाइपलाइन में नियमित जलापूर्ति बनाए रखने हेतु उत्तरदायी है। 24 घंटे से अधिक व्यवधान होने पर प्रभावित क्षेत्र में निःशुल्क पानी का टैंकर उपलब्ध कराना अनिवार्य है।",
    content_mr: "पश्चिम बंगाल नगरपालिका कायदा १९९३ नुसार, २४ तासांपेक्षा जास्त पाणी पुरवठा खंडित झाल्यास मोफत टँकर पुरवणे पालिकेवर बंधनकारक आहे.",
    keywords: ["water", "tanker", "disruption", "pressure", "wb municipal act", "pipeline", "kmc", "hmc", "smc", "ট্যাঙ্কার", "জল বন্ধ", "পানি নেই"]
  },
  {
    id: "wb_elec_01",
    state: "West Bengal",
    source: "West Bengal Electricity Regulatory Commission (WBERC) Performance Standards",
    source_bn: "পশ্চিমবঙ্গ বিদ্যুৎ নিয়ন্ত্রণ কমিশন (WBERC) কর্মক্ষমতা প্রবিধান",
    source_hi: "पश्चिम बंगाल विद्युत नियामक आयोग (WBERC) मानक",
    source_mr: "पश्चिम बंगाल विद्युत नियामक आयोग (WBERC) कार्यक्षमता मानके",
    section: "Electricity Supply & Outage Guidelines",
    section_bn: "বিদ্যুৎ সরবরাহ ও লোডশেডিং গাইডলাইন",
    section_hi: "विद्युत आपूर्ति एवं ब्रेकडाउन दिशानिर्देश",
    section_mr: "वीज पुरवठा मार्गदर्शक तत्त्वे",
    clause: "Regulation 5.2",
    clause_bn: "প্রবিধান ৫.২",
    clause_hi: "विनियम 5.2",
    clause_mr: "विनियम ५.२",
    content: "Under Regulation 5.2, power interruptions due to line fuse or transformer failure must be resolved by WBSEDCL or CESC within 4 hours in urban areas, and 24 hours in rural areas. Faulty meters must be inspected within 3 working days and replaced within 7 days of deposit fee payment.",
    content_bn: "প্রবিধান ৫.২ অনুযায়ী, বিদ্যুৎ লাইনের ফিউজ বা ট্রান্সফরমার বিকল হওয়ার জন্য লোডশেডিং হলে শহরাঞ্চলে ৪ ঘণ্টা এবং গ্রামাঞ্চলে ২৪ ঘণ্টার মধ্যে WBSEDCL বা CESC-কে পরিষেবা স্বাভাবিক করতে হবে। ত্রুটিপূর্ণ মিটার ৩ কার্যদিবসের মধ্যে পরিদর্শন এবং জমা ফি দেওয়ার ৭ দিনের মধ্যে বদলাতে হবে।",
    content_hi: "विनियम 5.2 के तहत, फ्यूज या ट्रांसफार्मर खराब होने पर शहरी क्षेत्रों में 4 घंटे और ग्रामीण क्षेत्रों में 24 घंटे के भीतर बिजली बहाल करना आवश्यक है। खराब मीटर की जांच 3 दिनों में होनी चाहिए।",
    content_mr: "विनियम ५.२ नुसार, शहरी भागात ४ तास आणि ग्रामीण भागात २४ तासांच्या आत वीज पुरवठा पूर्ववत करणे बंधनकारक आहे. सदोष मीटरची तपासणी ३ कामकाजाच्या दिवसांत करणे आवश्यक आहे.",
    keywords: ["electricity", "power", "fuse", "transformer", "load shedding", "blackout", "meter", "wbsedcl", "cesc", "বিদ্যুৎ", "লোডশেডিং", "বিজলি", "विद्युत", "वीज"]
  },
  {
    id: "wb_road_01",
    state: "West Bengal",
    source: "West Bengal PWD Roads & Bridges Maintenance Charter",
    source_bn: "পশ্চিমবঙ্গ পিডাব্লুডি (PWD) রাস্তা ও সেতু রক্ষণাবেক্ষণ চার্টার",
    source_hi: "पश्चिम बंगाल पीडब्ल्यूडी सड़क एवं पुल रखरखाव घोषणा पत्र",
    source_mr: "पश्चिम बंगाल सार्वजनिक बांधकाम रस्ते व पूल देखभाल सनद",
    section: "Road Repairs & Pothole Patching",
    section_bn: "রাস্তা মেরামত ও খানাখন্দ সংস্কার",
    section_hi: "सड़क मरम्मत एवं गड्ढे",
    section_mr: "रस्ते दुरुस्ती आणि खड्डे",
    clause: "Section 8A",
    clause_bn: "ধারা ৮A",
    clause_hi: "धारा 8A",
    clause_mr: "कलम ८A",
    content: "Pothole repairs on key arterial municipal roads must be undertaken in non-monsoon periods and completed within 7 to 14 days of filing a grievance with local PWD division. For rural roads under Pathasree scheme, the turnaround time for repair allocation of funds is 21 working days.",
    content_bn: "প্রধান পৌর রাস্তাগুলির খানাখন্দ বর্ষা বাদে অন্য সময়ে স্থানীয় পিডাব্লুডি দপ্তরে অভিযোগ জানানোর ৭ থেকে ১৪ দিনের মধ্যে মেরামত করতে হবে। পথশ্রী প্রকল্পের আওতায় গ্রামীণ রাস্তা মেরামতের তহবিল মঞ্জুর করার সময়সীমা ২১ কার্যদিবস।",
    content_hi: "प्रमुख नगर पालिका सड़कों पर गड्ढों की मरम्मत की शिकायत दर्ज होने के 7 से 14 दिनों के भीतर पीडब्ल्यूडी द्वारा पूरा किया जाना चाहिए।",
    content_mr: "रस्त्यावरील खड्डे दुरुस्तीची तक्रार आल्यानंतर ७ ते १४ दिवसांच्या आत सार्वजनिक बांधकाम विभागाने दुरुस्ती करणे आवश्यक आहे.",
    keywords: ["road", "street", "pothole", "pave", "pwd", "highway", "broken", "accident", "pathasree", "রাস্তা", "সড়ক", "सड़क", "गड्ढा", "रस्ता", "खड्डे"]
  },
  {
    id: "wb_garbage_01",
    state: "West Bengal",
    source: "Kolkata Municipal Corporation Solid Waste Management Bye-laws",
    source_bn: "কলকাতা পৌরনিগম কঠিন বর্জ্য ব্যবস্থাপনা উপ-আইন",
    source_hi: "कोलकाता नगर निगम ठोस अपशिष्ट प्रबंधन उप-नियम",
    source_mr: "कोलकाता महानगरपालिका घनकचरा व्यवस्थापन उपविधी",
    section: "Daily Garbage Clearance & Vat Sanitation",
    section_bn: "দৈনিক আবর্জনা অপসারণ ও ভ্যাট স্যানিটেশন",
    section_hi: "दैनिक कचरा उठाव एवं सफाई",
    section_mr: "कचरा उचल व स्वच्छता",
    clause: "Regulation 2018-C",
    clause_bn: "প্রবিধান ২০১৮-C",
    clause_hi: "विनियम 2018-C",
    clause_mr: "विनियम २०१८-C",
    content: "The disposal of solid non-hazardous waste is managed daily. Municipal dustbins must be cleared once every 24 hours. The failure to clear accumulated garbage in neighborhood collection vats within 48 hours is a direct violation of Ward Sanitary Guidelines. Complaining citizens can invoke Clause C to demand clearance.",
    content_bn: "কঠিন সাধারণ বর্জ্য দৈনিক ভিত্তিতে পরিষ্কার করতে হবে। জনবহুল ডাস্টবিনগুলি প্রতি ২৪ ঘণ্টায় অন্তত একবার খালি করতে হবে। পাড়ার ভ্যাট থেকে ৪৮ ঘণ্টার মধ্যে বর্জ্য অপসারণ করতে ব্যর্থ হওয়া স্যানিটারি নির্দেশিকার প্রত্যক্ষ লঙ্ঘন। নাগরিকরা ধারা C অনুযায়ী অবিলম্বে আবর্জনা সরানোর দাবি জানাতে পারেন।",
    content_hi: "ठोस कचरे का निस्तारण प्रतिदिन होना चाहिए। सार्वजनिक कूड़ेदानों को 24 घंटे में एक बार खाली करना अनिवार्य है। 48 घंटे से अधिक कचरा जमा रहना नियमों का उल्लंघन है।",
    content_mr: "घनकचरा दररोज उचलणे आवश्यक आहे. ४८ तासांपेक्षा जास्त काळ कचरा पडून राहिल्यास नियमांचे उल्लंघन मानले जाते.",
    keywords: ["garbage", "dump", "dustbin", "waste", "cleaning", "vat", "smell", "solid waste", "dengue", "আবর্জনা", "ময়লা", "कचरा", "सफाई", "घाण"]
  },
  {
    id: "wb_drain_01",
    state: "West Bengal",
    source: "Kolkata Municipal Corporation Sewerage & Drainage Rules",
    source_bn: "কলকাতা পৌরনিগম নিষ্কাশন ও নর্দমা প্রণালী বিধি",
    source_hi: "कोलकाता नगर निगम सीवरेज एवं जल निकासी नियम",
    source_mr: "कोलकाता महानगरपालिका सांडपाणी व निचरा नियम",
    section: "Water Logging & Drain Clogs",
    section_bn: "জলমগ্নতা ও নর্দমা অবরুদ্ধতা",
    section_hi: "जलभराव एवं नाली जाम",
    section_mr: "पाणी साचणे आणि गटार तुंबणे",
    clause: "Rule 12.3",
    clause_bn: "নিয়ম ১২.৩",
    clause_hi: "नियम 12.3",
    clause_mr: "नियम १२.३",
    content: "Blocked water-pipes, sewer overflows, or gully-pit clogs causing active water-logging in residential streets must be cleared within 24 to 48 hours of reporting. If natural heavy monsoon water collects, drainage pumping stations must be operated continuously until water level goes below curb level, as per Rule 12.3.",
    content_bn: "আবাসিক রাস্তায় জল জমার কারণ নর্দমা বা ড্রেন বন্ধ হওয়া হলে অভিযোগের ২৪ থেকে ৪৮ ঘণ্টার মধ্যে তা পরিষ্কার করতে হবে। ভারী বৃষ্টির ক্ষেত্রে ড্রেনেজ পাম্পিং স্টেশনগুলি অবিরাম চালাতে হবে যতক্ষণ না জল স্বাভাবিক স্তরে নামে।",
    content_hi: "नाली या सीवर जाम होने के कारण जलभराव की समस्या को 24 से 48 घंटे के भीतर ठीक किया जाना चाहिए।",
    content_mr: "गटारे तुंबल्यामुळे रस्त्यावर पाणी साचल्यास २४ ते ४८ तासांत उपसा करून गटारे साफ करणे आवश्यक आहे.",
    keywords: ["drain", "drainage", "waterlogging", "sewer", "clog", "overflow", "monsoon", "stagnant", "নর্দমা", "ড্রেন", "জলমগ্ন", "নাली", "सीवर", "गटार"]
  },
  {
    id: "wb_cert_01",
    state: "West Bengal",
    source: "West Bengal Right to Public Services Act 2013 (WBRTPS)",
    source_bn: "পশ্চিমবঙ্গ জনপরিষেবা অধিকার আইন ২০১৩",
    source_hi: "पश्चिम बंगाल लोक सेवा का अधिकार अधिनियम 2013",
    source_mr: "पश्चिम बंगाल सार्वजनिक सेवा हमी कायदा २०१३",
    section: "Civic Registrations & Certificates",
    section_bn: "পৌর নিবন্ধন ও শংসাপত্র প্রদান",
    section_hi: "नागरिक पंजीकरण एवं प्रमाणपत्र",
    section_mr: "नागरी नोंदणी व प्रमाणपत्रे",
    clause: "Schedule I, Entry 14",
    clause_bn: "তফসিল ১, এন্ট্রি ১৪",
    clause_hi: "अनुसूची I, प्रविष्टि 14",
    clause_mr: "अनुसूची I, नोंद १४",
    content: "Under the West Bengal Right to Public Services Act 2013, municipal birth and death certificates must be issued within 7 working days of document verification. Caste, income, and residential certificates from BDO/SDO must be finalized within 15 working days.",
    content_bn: "পশ্চিমবঙ্গ জনপরিষেবা অধিকার আইন ২০১৩ অনুযায়ী, প্রয়োজনীয় নথি যাচাইয়ের পর ৭ কার্যদিবসের মধ্যে পৌরসভা থেকে জন্ম ও মৃত্যু শংসাপত্র দিতে হবে। বিডিও দপ্তর থেকে অন্যান্য শংসাপত্র ১৫ কার্যদিবসের মধ্যে প্রদান বাধ্যতামূলক।",
    content_hi: "पश्चिम बंगाल लोक सेवा का अधिकार अधिनियम 2013 के तहत, जन्म और मृत्यु प्रमाण पत्र 7 कार्य दिवसों में जारी किया जाना चाहिए।",
    content_mr: "पश्चिम बंगाल सार्वजनिक सेवा हमी कायद्यांतर्गत, जन्म व मृत्यू प्रमाणपत्र ७ कामकाजाच्या दिवसांत देणे आवश्यक आहे.",
    keywords: ["certificate", "birth", "death", "income", "caste", "bdo", "municipality", "rtps", "wbrtps", "শংসাপত্র", "নিবন্ধন", "प्रमाणपत्र", "दाखला"]
  },
  {
    id: "wb_pension_01",
    state: "West Bengal",
    source: "Department of Women & Child Development and Social Welfare, Govt of West Bengal",
    source_bn: "নারী ও শিশু বিকাশ এবং সমাজকল্যাণ দপ্তর, পশ্চিমবঙ্গ সরকার",
    source_hi: "महिला एवं बाल विकास और समाज कल्याण विभाग, पश्चिम बंगाल सरकार",
    source_mr: "महिला व बालविकास आणि समाजकल्याण विभाग, पश्चिम बंगाल शासन",
    section: "Jai Bangla Pension Scheme & Direct Benefit Transfer",
    section_bn: "জয় বাংলা পেনশন স্কিম ও মাসিক ভাতা বিতরণ",
    section_hi: "जय बांग्ला पेंशन योजना एवं प्रत्यक्ष लाभ अंतरण",
    section_mr: "जय बांग्ला पेन्शन योजना",
    clause: "Notification No. 1021-SW/2020",
    clause_bn: "বিজ্ঞপ্তি নং ১০২১-SW/২০২০",
    clause_hi: "अधिसूचना संख्या 1021-SW/2020",
    clause_mr: "अधिसूचना क्र. १०२१-SW/२०२०",
    content: "Under the Jai Bangla Pension Scheme (encompassing Taposili Bandhu, Jai Johar, and Old Age Pension), eligible beneficiaries are entitled to regular monthly financial support credited directly to bank accounts. BDOs and Municipal Executive Officers must complete inquiry into missing or delayed pension credits within 30 days.",
    content_bn: "জয় বাংলা পেনশন প্রকল্পের আওতায় প্রবীণ, বিধবা ও তপশিলি উপভোক্তারা সরাসরি ব্যাংক অ্যাকাউন্টে মাসিক ভাতা পাওয়ার অধিকারী। পেনশন বন্ধ বা জমা না পড়ার অভিযোগ বিডিও ও পৌর আধিকারিককে ৩০ দিনের মধ্যে তদন্ত করে নিষ্পত্তি করতে হবে।",
    content_hi: "जय बांग्ला पेंशन योजना के तहत वृद्ध, विधवा एवं पात्र नागरिकों को मासिक सहायता का अधिकार है। पेंशन न मिलने पर बीडीओ को 30 दिनों में जांच कर समाधान करना होगा।",
    content_mr: "पश्चिम बंगाल जय बांग्ला पेन्शन योजनेअंतर्गत मासिक मानधन वेळेत बँक खात्यात जमा न झाल्यास ३० दिवसांत निवारण अनिवार्य आहे.",
    keywords: ["pension", "jai bangla", "taposili bandhu", "old age", "widow", "bdo", "west bengal", "social welfare", "পেনশন", "ভাতা", "पेंशन", "पेन्शन"]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ── MAHARASHTRA CHARTERS (RTS Act 2015 & BMC / PMC / TMC) ─────────────────
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "mh_water_01",
    state: "Maharashtra",
    source: "Maharashtra Right to Public Services Act 2015 (RTS Maharashtra) & BMC Citizen Charter",
    source_bn: "মহারাষ্ট্র জনসেবার অধিকার আইন ২০১৫ এবং বিএমসি (BMC) চার্টার",
    source_hi: "महाराष्ट्र लोकसेवा हक्क अधिनियम 2015 (RTS) एवं बीएमसी नागरिक सनद",
    source_mr: "महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ (RTS) व बीएमसी नागरिक सनद",
    section: "Municipal Water Supply Standards",
    section_bn: "পৌর পানীয় জল সরবরাহের মানদণ্ড",
    section_hi: "नगर निगम जल आपूर्ति मानक",
    section_mr: "महानगरपालिका पाणी पुरवठा व सेवा हमी",
    clause: "Service Code RTS-MCGM-04",
    clause_bn: "সার্ভিস কোড RTS-MCGM-০৪",
    clause_hi: "सेवा कोड RTS-MCGM-04",
    clause_mr: "सेवा कोड RTS-MCGM-०४",
    content: "Under the Maharashtra Right to Public Services Act 2015, municipal corporations (BMC Mumbai, PMC Pune, TMC Thane) are legally required to resolve contaminated or low-pressure water pipeline complaints within 3 working days. In case of mainline pipeline burst, supply must be restored within 24 hours.",
    content_bn: "মহারাষ্ট্র জনসেবার অধিকার আইন ২০১৫ অনুযায়ী, পৌরসংস্থাগুলোকে (BMC, PMC, TMC) দূষিত জল বা কম প্রেসারের জলের অভিযোগ ৩ কার্যদিবসের মধ্যে সমাধান করতে হবে। মূল পাইপলাইন ফেটে গেলে ২৪ ঘণ্টার মধ্যে মেরামত বাধ্যতামূলক।",
    content_hi: "महाराष्ट्र लोकसेवा हक्क अधिनियम 2015 के तहत, बीएमसी, पीएमसी और टीएमसी को दूषित जल या कम दबाव की शिकायतों का निवारण 3 कार्य दिवसों के भीतर करना अनिवार्य है।",
    content_mr: "महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ अंतर्गत, महापालिकांनी (BMC, PMC, TMC) दूषित पाणी किंवा कमी दाबाच्या तक्रारींचे निवारण ३ कामकाजाच्या दिवसांत करणे कायदेशीररित्या बंधनकारक आहे. मुख्य वाहिनी फुटल्यास २४ तासांत दुरुस्ती आवश्यक आहे.",
    keywords: ["bmc", "mumbai", "pune", "pmc", "water", "pipeline", "pressure", "maharashtra", "rts", "thane", "paani", "nall", "pani", "पाणी", "जल", "पानी", "महापालिका", "मुंबई"]
  },
  {
    id: "mh_water_02",
    state: "Maharashtra",
    source: "Brihanmumbai Municipal Corporation (BMC) Hydraulic Engineer Manual & MMC Act",
    source_bn: "বিএমসি হাইড্রোলিক ইঞ্জিনিয়ারিং নির্দেশিকা ও পৌর আইন",
    source_hi: "बीएमसी जल अभियंता नियमावली एवं एमएमसी अधिनियम",
    source_mr: "बृहन्मुंबई महानगरपालिका जल अभियंता नियमावली व म.म.पा. कायदा",
    section: "Continuous Potable Supply & Emergency Tanker Obligations",
    section_bn: "নিরবচ্ছিন্ন পানীয় জল সরবরাহ ও জরুরি ট্যাঙ্কার পরিষেবা",
    section_hi: "निरंतर जलापूर्ति एवं आपातकालीन टैंकर व्यवस्था",
    section_mr: "अखंडित पिण्याचे पाणी पुरवठा व आपत्कालीन टँकर वाटप",
    clause: "Section 169 & BMC Water Byelaws",
    clause_bn: "ধারা ১৬৯ এবং বিএমসি জল উপ-বিধি",
    clause_hi: "धारा 169 एवं बीएमसी जल उपनियम",
    clause_mr: "कलम १६९ व पाणी पुरवठा उपविधी",
    content: "Under Section 169 of the Mumbai Municipal Corporation Act and BMC Water Byelaws, the Hydraulic Engineer is statutorily mandated to ensure safe tap water potability with zero coliform contamination. If mainline repairs take more than 24 hours, ward officers must dispatch free municipal water tankers to affected residential chawls and societies.",
    content_bn: "মুম্বাই মিউনিসিপ্যাল কর্পোরেশন আইনের ধারা ১৬৯ এবং বিএমসি জল উপ-বিধি অনুযায়ী, হাইড্রোলিক ইঞ্জিনিয়ারকে ব্যাকটেরিয়ামুক্ত ও বিশুদ্ধ পানীয় জল সরবরাহ নিশ্চিত করতে হবে। ২৪ ঘণ্টার বেশি জল সরবরাহ বন্ধ থাকলে ওয়ার্ড অফিসকে বিনামূল্যে জলের ট্যাঙ্কার পাঠাতে হবে।",
    content_hi: "एमएमसी अधिनियम की धारा 169 के अनुसार, बीएमसी जल अभियंता को शुद्ध एवं स्वच्छ पेयजल सुनिश्चित करना अनिवार्य है। 24 घंटे से अधिक समय तक आपूर्ति बाधित होने पर प्रभावित क्षेत्रों में निःशुल्क टैंकर भेजना अनिवार्य है।",
    content_mr: "मुंबई महानगरपालिका कायद्याच्या कलम १६९ नुसार, जल अभियंत्याने शुद्ध पिण्याच्या पाण्याचा पुरवठा करणे आवश्यक आहे. २४ तासांपेक्षा जास्त वेळ पाणी पुरवठा खंडित राहिल्यास मोफत टँकर पाठवणे बंधनकारक आहे.",
    keywords: ["bmc", "hydraulic engineer", "water", "tanker", "potable", "coliform", "mumbai", "mmc act", "maharashtra", "पाणी पुरवठा", "टँकर", "जल"]
  },
  {
    id: "mh_elec_01",
    state: "Maharashtra",
    source: "Maharashtra Electricity Regulatory Commission (MERC) Standards of Performance",
    source_bn: "মহারাষ্ট্র বিদ্যুৎ নিয়ন্ত্রণ কমিশন (MERC) পরিষেবা মানদণ্ড",
    source_hi: "महाराष्ट्र विद्युत नियामक आयोग (MERC) सेवा मानक",
    source_mr: "महाराष्ट्र वीज नियामक आयोग (MERC) सेवा कार्यक्षमता मानके",
    section: "MSEDCL / Mahavitaran Supply Guarantees",
    section_bn: "মহাবিতরণ বিদ্যুৎ সরবরাহ গ্যারান্টি",
    section_hi: "महावितरण विद्युत आपूर्ति गारंटी",
    section_mr: "महावितरण वीज पुरवठा हमी व नुकसानभरपाई",
    clause: "MERC SOP Regulation 4.1",
    clause_bn: "MERC প্রবিধান ৪.১",
    clause_hi: "MERC विनियम 4.1",
    clause_mr: "MERC विनियम ४.১",
    content: "Under MERC SOP Regulations, normal fuse-off calls in Mumbai/Pune urban areas must be resolved within 4 hours, and rural Maharashtra within 18 hours. Failure to replace a burnt distribution transformer within 24 hours in cities entitles the citizen to statutory daily compensation.",
    content_bn: "MERC নিয়মাবলী অনুযায়ী, মুম্বাই বা পুনের শহরাঞ্চলে ফিউজ চলে গেলে ৪ ঘণ্টা এবং গ্রামীণ মহারাষ্ট্রে ১৮ ঘণ্টার মধ্যে বিদ্যুৎ ফেরাতে হবে। ২৪ ঘণ্টার মধ্যে পুড়ে যাওয়া ট্রান্সফরমার না বদলালে নাগরিক দৈনিক ক্ষতিপূরণের দাবিদার।",
    content_hi: "MERC नियमों के तहत, फ्यूज खराब होने पर शहरी इलाकों में 4 घंटे और ग्रामीण इलाकों में 18 घंटे के भीतर बिजली बहाल करना आवश्यक है। ट्रांसफार्मर खराब होने पर 24 घंटे में बदलना जरूरी है।",
    content_mr: "MERC नियमांनुसार, शहरी भागात ४ तासांत व ग्रामीण भागात १८ तासांत वीज पुरवठा सुरळीत करणे आवश्यक आहे. ट्रान्सफॉर्मर जळाल्यास २४ तासांत बदलणे महावितरणवर बंधनकारक आहे.",
    keywords: ["msedcl", "mahavitaran", "merc", "power", "blackout", "fuse", "transformer", "maharashtra", "mumbai", "pune", "वीज", "महावितरण", "बिजली", "विद्युत"]
  },
  {
    id: "mh_road_01",
    state: "Maharashtra",
    source: "Brihanmumbai Municipal Corporation (BMC) Pothole & Road Maintenance SOP",
    source_bn: "বিএমসি (BMC) রাস্তা ও খানাখন্দ রক্ষণাবেক্ষণ কার্যপ্রণালী",
    source_hi: "बीएमसी मुंबई सड़क एवं गड्ढा निवारण मानक",
    source_mr: "बृहन्मुंबई महानगरपालिका (BMC) रस्ते व खड्डे निवारण कार्यपद्धती",
    section: "Road Repair & Traffic Mobility",
    section_bn: "রাস্তা মেরামত ও যান চলাচল",
    section_hi: "सड़क मरम्मत एवं यातायात",
    section_mr: "रस्ते दुरुस्ती आणि खड्डे बुजवणे",
    clause: "BMC Circular RD-2022/POTH",
    clause_bn: "বিএমসি সার্কুলার RD-২০২২",
    clause_hi: "बीएमसी परिपत्रक RD-2022",
    clause_mr: "बीएमसी परिपत्रक RD-२०२२",
    content: "BMC mandates that all reported potholes on municipal asphalt roads must be inspected and filled using cold mix asphalt within 48 hours of citizen reporting on the portal. For major road resurfacing delays, Executive Engineers are held accountable under the Right to Public Services Act.",
    content_bn: "বিএমসির নির্দেশ অনুযায়ী, যেকোনো পৌর রাস্তার খানাখন্দ নাগরিক অভিযোগ পাওয়ার ৪৮ ঘণ্টার মধ্যে কোল্ড মিক্স অ্যাসফল্ট দিয়ে মেরামত করতে হবে। বড় রাস্তার কাজে বিলম্ব হলে জনসেবা অধিকার আইনের আওতায় ব্যবস্থা নেওয়া হয়।",
    content_hi: "बीएमसी के नियमानुसार, सड़क पर गड्ढों की शिकायत मिलने के 48 घंटे के भीतर कोल्ड मिक्स डामर से गड्ढों को भरना अनिवार्य है।",
    content_mr: "बीएमसीच्या नियमांनुसार, महापालिकेच्या रस्त्यावरील खड्ड्यांची तक्रार आल्यानंतर ४८ तासांच्या आत कोल्ड मिक्स डांबराने खड्डे बुजवणे अनिवार्य आहे.",
    keywords: ["pothole", "bmc", "mumbai", "road", "pwd", "traffic", "asphalt", "खड्डे", "रस्ता", "सड़क", "गड्ढे", "मुंबई", "पुणे"]
  },
  {
    id: "mh_garbage_01",
    state: "Maharashtra",
    source: "Maharashtra Right to Public Services Act 2015 & BMC Solid Waste Management Rules",
    source_bn: "মহারাষ্ট্র আরটিএস আইন ও বিএমসি কঠিন বর্জ্য ব্যবস্থাপনা বিধি",
    source_hi: "महाराष्ट्र RTS अधिनियम एवं बीएमसी ठोस अपशिष्ट प्रबंधन नियम",
    source_mr: "महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ व बीएमसी घनकचरा व्यवस्थापन नियमावली",
    section: "Daily Solid Waste Clearance & Sanitation",
    section_bn: "দৈনিক বর্জ্য নিষ্কাশন ও স্যানিটেশন",
    section_hi: "दैनिक कचरा संग्रहण एवं सफाई",
    section_mr: "दैनिक कचरा संकलन व स्वच्छता",
    clause: "Service Code RTS-SWM-02",
    clause_bn: "সার্ভিস কোড RTS-SWM-০২",
    clause_hi: "सेवा कोड RTS-SWM-02",
    clause_mr: "सेवा कोड RTS-SWM-०২",
    content: "Under the Maharashtra RTS Act 2015, municipal corporations (BMC, PMC) must ensure daily morning garbage lifting from designated community bins. Uncleared community dustbins or overflow complaints must be addressed within 24 hours of registration on the grievance portal.",
    content_bn: "মহারাষ্ট্র আরটিএস আইন ২০১৫ অনুসারে, বিএমসি এবং পিএমসি-কে প্রতিদিন সকালে নির্দিষ্ট ডাস্টবিন থেকে আবর্জনা পরিষ্কার করতে হবে। উপচে পড়া আবর্জনার অভিযোগ ২৪ ঘণ্টার মধ্যে সমাধান করতে হবে।",
    content_hi: "महाराष्ट्र RTS अधिनियम के तहत, कचरा पेटी से कचरा न उठने की शिकायत का समाधान 24 घंटे के भीतर अनिवार्य है।",
    content_mr: "महाराष्ट्र लोकसेवा हक्क अधिनियमानुसार, सार्वजनिक कचराकुंडीतील कचरा न उचलल्याची तक्रार आल्यास २४ तासांत कचरा उचलणे बंधनकारक आहे.",
    keywords: ["garbage", "bmc", "mumbai", "pune", "pmc", "waste", "cleaning", "dump", "dustbin", "sanitation", "कचरा", "घाण", "सफाई", "আবর্জনা"]
  },
  {
    id: "mh_drain_01",
    state: "Maharashtra",
    source: "BMC Storm Water Drain (SWD) Department Standard Operating Procedure",
    source_bn: "বিএমসি স্টর্ম ওয়াটার ড্রেন (SWD) কার্যপ্রণালী",
    source_hi: "बीएमसी जल निकासी एवं नाला सफाई मानक",
    source_mr: "बृहन्मुंबई महानगरपालिका पर्जन्य जलवाहिन्या (SWD) कार्यपद्धती",
    section: "Monsoon Waterlogging & Nullah Desilting",
    section_bn: "বর্ষায় জল জমা ও নর্দমা পরিষ্কার",
    section_hi: "जलभराव एवं नाला सफाई",
    section_mr: "पावसाळी पाणी साचणे व नाले सफाई",
    clause: "SWD Circular 2023/MONSOON-09",
    clause_bn: "SWD সার্কুলার ২০২৩",
    clause_hi: "SWD परिपत्रक 2023",
    clause_mr: "SWD परिपत्रक २०२३/नाला-०९",
    content: "BMC requires local ward assistant commissioners to ensure that choked storm water drains, overflowing roadside gutters, or waterlogging spots in Mumbai municipal wards are cleared within 24 to 48 hours. During active high tide or heavy monsoon rainfall, dewatering pumps must be deployed immediately.",
    content_bn: "বিএমসির নিয়ম অনুযায়ী, মুম্বাইয়ের যেকোনো ওয়ার্ডে নর্দমা বন্ধ হলে বা জল জমলে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ড্রেন পরিষ্কার করতে হবে এবং জল নিষ্কাশন পাম্প চালাতে হবে।",
    content_hi: "बीएमसी के अनुसार, नाली या गटर जाम होने पर 24 से 48 घंटे के भीतर सफाई सुनिश्चित की जानी चाहिए।",
    content_mr: "बीएमसीच्या नियमांनुसार, तुंबलेले नाले किंवा पावसाळी गटारे २४ ते ४८ तासांत मोकळे करणे आणि उपसा पंप तातडीने सुरू करणे अनिवार्य आहे.",
    keywords: ["drain", "drainage", "waterlogging", "bmc", "mumbai", "pune", "nullah", "sewer", "gutter", "गटार", "नाले", "पाणी साचणे", "নাली", "ড্রেন"]
  },
  {
    id: "mh_cert_01",
    state: "Maharashtra",
    source: "Maharashtra Right to Public Services Act 2015 (RTS Maharashtra)",
    source_bn: "মহারাষ্ট্র জনসেবা অধিকার আইন ২০১৫",
    source_hi: "महाराष्ट्र लोकसेवा हक्क अधिनियम 2015",
    source_mr: "महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ (RTS)",
    section: "Civil Registration & Citizen Certificates",
    section_bn: "নাগরিক নিবন্ধন ও শংসাপত্র",
    section_hi: "नागरिक सेवाएं एवं प्रमाणपत्र",
    section_mr: "नागरी नोंदणी व प्रमाणपत्र हमी",
    clause: "Schedule Entry RTS-REV-01",
    clause_bn: "তফসিল এন্ট্রি RTS-REV-০১",
    clause_hi: "अनुसूची प्रविष्टि RTS-REV-01",
    clause_mr: "अनुसूची नोंद RTS-REV-०१",
    content: "Under Maharashtra RTS Act 2015, municipal birth and death certificates must be issued within 7 working days through Aaple Sarkar portal. Income, Domicile, and Caste verification certificates through Tehsil / Collectorate must be completed within 21 working days.",
    content_bn: "মহারাষ্ট্র আরটিএস আইন ২০১৫ অনুযায়ী, আপনার সরকার পোর্টালের মাধ্যমে ৭ কার্যদিবসের মধ্যে জন্ম ও মৃত্যু শংসাপত্র প্রদান বাধ্যতামূলক।",
    content_hi: "महाराष्ट्र RTS अधिनियम के तहत 7 दिनों के भीतर जन्म-मृत्यु प्रमाणपत्र जारी करना अनिवार्य है।",
    content_mr: "महाराष्ट्र लोकसेवा हक्क कायद्यानुसार, आपले सरकार पोर्टलद्वारे जन्म व मृत्यू दाखला ७ कामकाजाच्या दिवसांत देणे बंधनकारक आहे.",
    keywords: ["certificate", "birth", "death", "income", "domicile", "caste", "aaple sarkar", "rts", "दाखला", "प्रमाणपत्र", "শংসাপত্র"]
  },
  {
    id: "mh_pension_01",
    state: "Maharashtra",
    source: "Government of Maharashtra Social Justice & Assistance Department",
    source_bn: "মহারাষ্ট্র সরকার সমাজ ন্যায়বিচার ও বিশেষ সহায়তা বিভাগ",
    source_hi: "महाराष्ट्र शासन सामाजिक न्याय एवं विशेष सहायता विभाग",
    source_mr: "महाराष्ट्र शासन सामाजिक न्याय व विशेष सहाय्य विभाग",
    section: "Sanjay Gandhi Niradhar & Shravanbal Pension Scheme",
    section_bn: "সঞ্জয় গান্ধী নিরাধার ও শ্রাবণবাল পেনশন যোজনা",
    section_hi: "संजय गांधी निराधार एवं श्रावणबाळ योजना",
    section_mr: "संजय गांधी निराधार व श्रावणबाळ पेन्शन योजना",
    clause: "GR-SJN-2019/PEN-08",
    clause_bn: "সরকারি নির্দেশিকা ২০১৯",
    clause_hi: "शासनादेश 2019/पेंशन",
    clause_mr: "शासन निर्णय २०१९/पेन्शन-०८",
    content: "Under the Sanjay Gandhi Niradhar and Shravanbal Pension schemes, destitute elderly, widows, and disabled citizens are entitled to monthly financial assistance. Verification of submitted applications must be completed by the Tehsil Committee within 30 days under the Maharashtra RTS Act.",
    content_bn: "মহারাষ্ট্রে সঞ্জয় গান্ধী নিরাধার এবং শ্রাবণবাল যোজনার আওতায় প্রবীণ, বিধবা ও বিশেষ ক্ষমতাসম্পন্ন নাগরিকরা মাসিক সরকারি ভাতা পাওয়ার অধিকারী। তহসিল কমিটিকে ৩০ দিনের মধ্যে আবেদন অনুমোদন করতে হয়।",
    content_hi: "संजय गांधी निराधार योजना के तहत वृद्ध, विधवा और दिव्यांग नागरिकों को मासिक पेंशन का अधिकार है। तहसील कार्यालय द्वारा 30 दिनों में सत्यापन पूरा करना अनिवार्य है।",
    content_mr: "संजय गांधी निराधार व श्रावणबाळ योजनेअंतर्गत वृद्ध, विधवा व दिव्यांगांना दरमहा पेन्शन मिळण्याचा अधिकार आहे. अर्जाची पडताळणी ३० दिवसांच्या आत पूर्ण करणे बंधनकारक आहे.",
    keywords: ["pension", "sanjay gandhi", "shravanbal", "widow", "elderly", "disability", "maharashtra", "tehsildar", "पेन्शन", "निराधार", "वृद्ध", "पेंशन", "ভাতা"]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ── NATIONAL STATUTORY (RTI ACT 2005 & CENTRAL LAWS) ─────────────────────
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "nat_rti_01",
    state: "National",
    source: "Right to Information Act 2005 (Central Statute)",
    source_bn: "তথ্য জানার অধিকার আইন ২০০৫ (কেন্দ্রীয় আইন)",
    source_hi: "सूचना का अधिकार अधिनियम 2005 (केंद्रीय कानून)",
    source_mr: "माहितीचा अधिकार अधिनियम २००५ (केंद्रीय कायदा)",
    section: "Filing Procedure & Application Rights",
    section_bn: "আবেদন প্রক্রিয়া ও নাগরিক অধিকার",
    section_hi: "आवेदन प्रक्रिया एवं नागरिक अधिकार",
    section_mr: "अर्ज प्रक्रिया व नागरिकांचे हक्क",
    clause: "Section 6(1)",
    clause_bn: "ধারা ৬(১)",
    clause_hi: "धारा 6(1)",
    clause_mr: "कलम ६(১)",
    content: "Under Section 6(1) of the RTI Act 2005, any Indian citizen has the statutory right to request information, inspect municipal registers, obtain certified copies of contracts, tender documents, or fund allocation vouchers from any Public Information Officer (PIO) without disclosing personal motive.",
    content_bn: "আরটিআই আইন ২০০৫-এর ধারা ৬(১) অনুযায়ী, যেকোনো ভারতীয় নাগরিক কোনো ব্যক্তিগত কারণ দর্শানো ছাড়াই যেকোনো জনতথ্য কর্মকর্তার (PIO) কাছ থেকে সরকারি কাজের নথিপত্র, টেন্ডারের বিল বা ব্যয়ের সার্টিফায়েড কপি চাইতে পারেন।",
    content_hi: "सूचना का अधिकार अधिनियम 2005 की धारा 6(1) के तहत कोई भी नागरिक बिना कारण बताए किसी भी लोक सूचना अधिकारी से सरकारी दस्तावेजों, टेंडरों और खर्च के प्रमाणित रिकॉर्ड मांग सकता है।",
    content_mr: "माहितीचा अधिकार कायदा २००५ च्या कलम ६(१) नुसार, कोणताही भारतीय नागरिक कारण न देता सरकारी कामांची कागदपत्रे, निविदा आणि खर्चाचे प्रमाणित उतारे मागू शकतो.",
    keywords: ["rti", "information", "act", "section 6", "records", "audit", "tender", "fund", "inspection", "আরটিআই", "তথ্য অধিকার", "सूचना का अधिकार", "माहिती अधिकार"]
  },
  {
    id: "nat_rti_02",
    state: "National",
    source: "Right to Information Act 2005 (Central Statute)",
    source_bn: "তথ্য জানার অধিকার আইন ২০০৫ (কেন্দ্রীয় আইন)",
    source_hi: "सूचना का अधिकार अधिनियम 2005 (केंद्रीय कानून)",
    source_mr: "माहितीचा अधिकार अधिनियम २००५ (केंद्रीय कायदा)",
    section: "Mandatory Time Limit for Disposal",
    section_bn: "বাধ্যতামূলক সময়সীমা নিষ্পত্তি",
    section_hi: "सूचना प्रदान करने की अनिवार्य समय सीमा",
    section_mr: "माहिती देण्याची अनिवार्य मुदत",
    clause: "Section 7(1)",
    clause_bn: "ধারা ৭(১)",
    clause_hi: "धारा 7(1)",
    clause_mr: "कलम ৭(১)",
    content: "Under Section 7(1), the PIO must provide the requested information within 30 days of receiving the fee. If the information sought concerns the life or bodily liberty of a person, the response must strictly be supplied within 48 hours. BPL applicants are completely exempted from payment of RTI fees.",
    content_bn: "ধারা ৭(১) অনুযায়ী, জনতথ্য কর্মকর্তাকে ৩০ দিনের মধ্যে তথ্য প্রদান করতে হবে। জীবন বা ব্যক্তিগত স্বাধীনতার বিষয় হলে ৪৮ ঘণ্টার মধ্যে উত্তর দিতে হবে। বিপিএল (BPL) কার্ডধারীদের জন্য কোনো আবেদন ফি লাগবে না।",
    content_hi: "धारा 7(1) के तहत, पीआईओ को 30 दिनों के भीतर जानकारी देनी होगी। यदि मामला जीवन या व्यक्तिगत स्वतंत्रता से जुड़ा है, तो 48 घंटे में सूचना देना अनिवार्य है। बीपीएल कार्डधारकों के लिए कोई शुल्क नहीं है।",
    content_mr: "कलम ७(१) नुसार, जन माहिती अधिकाऱ्याने ३० दिवसांत माहिती देणे बंधनकारक आहे. जीविताशी संबंधित असल्यास ४८ तासांत माहिती द्यावी लागेल. दारिद्र्यरेषेखालील (BPL) व्यक्तींना कोणतेही शुल्क नाही.",
    keywords: ["rti", "deadline", "30 days", "48 hours", "life", "liberty", "bpl", "waiver", "fee", "আরটিআই", "সময়সীমা", "সময়সীমা", "मुदत", "समय सीमा"]
  },
  {
    id: "nat_cpgram_01",
    state: "National",
    source: "Department of Administrative Reforms and Public Grievances (DARPG)",
    source_bn: "প্রশাসনিক সংস্কার ও জনঅভিযোগ বিভাগ (কেন্দ্রীয় সরকার)",
    source_hi: "प्रशासनिक सुधार एवं लोक शिकायत विभाग (DARPG)",
    source_mr: "प्रशासकीय सुधारणा व सार्वजनिक तक्रार निवारण विभाग (DARPG)",
    section: "Centralized Public Grievance Redressal and Monitoring System (CPGRAMS)",
    section_bn: "কেন্দ্রীয় পাবলিক গ্রিভেন্স রিড্রেসাল ও মনিটরিং সিস্টেম (CPGRAMS)",
    section_hi: "केंद्रीकृत लोक शिकायत निवारण एवं निगरानी प्रणाली (CPGRAMS)",
    section_mr: "केंद्रीकृत सार्वजनिक तक्रार निवारण व सनियंत्रण प्रणाली (CPGRAMS)",
    clause: "DARPG Standard Grievance SLA (2021)",
    clause_bn: "DARPG নাগরিক অভিযোগ নিষ্পত্তির মানদণ্ড",
    clause_hi: "डीएआरपीजी शिकायत निवारण मानक 2021",
    clause_mr: "DARPG तक्रार निवारण मानके २०२१",
    content: "Under Government of India DARPG guidelines, all citizen civic grievances lodged on official municipal/state grievance portals must be conclusively resolved within a maximum period of 21 to 30 days, with regular status tracking and reasoned closure reports.",
    content_bn: "ভারত সরকারের DARPG নির্দেশিকা অনুযায়ী, সরকারি পোর্টালে জমা পড়া নাগরিকদের সমস্ত অভিযোগ সর্বোচ্চ ২১ থেকে ৩০ দিনের মধ্যে সুনির্দিষ্টভাবে নিষ্পত্তি করতে হবে এবং কারণ দর্শিয়ে ক্লোজার রিপোর্ট দিতে হবে।",
    content_hi: "भारत सरकार के DARPG दिशानिर्देशों के तहत नागरिक शिकायतों का निवारण अधिकतम 21 से 30 दिनों के भीतर होना अनिवार्य है।",
    content_mr: "केंद्र सरकारच्या DARPG मार्गदर्शक तत्त्वांनुसार, नागरिकांच्या तक्रारींचे निवारण २१ ते ३० दिवसांच्या आत करणे आवश्यक आहे.",
    keywords: ["cpgrams", "darpg", "grievance", "redressal", "central", "sla", "complaint", "অভিযোগ", "शिकायत", "तक्रार"]
  }
];

/**
 * Resolves any raw state string into a canonical state value.
 */
export function resolveCanonicalState(
  state?: string
): "West Bengal" | "Maharashtra" | "National" {
  if (!state || typeof state !== "string" || !state.trim()) {
    return "National";
  }

  const s = state.trim().toLowerCase();

  // West Bengal matchers
  if (
    s.includes("west bengal") ||
    s.includes("bengal") ||
    s.includes("পশ্চিমবঙ্গ") ||
    s.includes("kolkata") ||
    s.includes("howrah") ||
    s.includes("siliguri") ||
    s.includes("maheshtala") ||
    s === "wb"
  ) {
    return "West Bengal";
  }

  // Maharashtra matchers
  if (
    s.includes("maharashtra") ||
    s.includes("महाराष्ट्र") ||
    s.includes("mumbai") ||
    s.includes("bmc") ||
    s.includes("pune") ||
    s.includes("pmc") ||
    s.includes("thane") ||
    s.includes("tmc") ||
    s.includes("nagpur") ||
    s.includes("nashik") ||
    s.includes("pcmc") ||
    s === "mh"
  ) {
    return "Maharashtra";
  }

  return "National";
}

/**
 * Query the knowledge base, STRICTLY filtering to only return chunks relevant to the
 * selected state.
 *
 * GUARANTEES:
 * - If state is 'Maharashtra': West Bengal chunks are NEVER returned.
 * - If state is 'West Bengal': Maharashtra chunks are NEVER returned.
 * - If state is 'National': Only Central/National statutes are returned.
 *
 * @param queryText  The citizen's raw description (in any language/script)
 * @param category   The complaint category (water_supply, electricity, etc.)
 * @param state      The selected state name (e.g. 'West Bengal', 'Maharashtra')
 */
export function queryKnowledgeBase(
  queryText: string,
  category: string,
  state?: string
): KnowledgeChunk[] {
  const normalizedQuery = (queryText || "").toLowerCase();
  const canonicalState = resolveCanonicalState(state);

  // ── 1. Strict State-Scope Isolation ─────────────────────────────────────────
  const stateScopedChunks = KNOWLEDGE_BASE.filter((chunk) => {
    if (canonicalState === "West Bengal") {
      return chunk.state === "West Bengal" || chunk.state === "National";
    }
    if (canonicalState === "Maharashtra") {
      return chunk.state === "Maharashtra" || chunk.state === "National";
    }
    return chunk.state === "National";
  });

  // ── 2. Category Keyword Boosting ─────────────────────────────────────────
  const categoryTerms: Record<string, string[]> = {
    water_supply: [
      "water", "tap", "drinking", "pipeline", "kmc", "bmc", "jol", "ashche", "nei", "paani", "nall", "leakage", "dirty", "contamination",
      "জল", "পানি", "জলকাল", "নল", "नळ", "पाणी", "पानी", "जलकल"
    ],
    electricity: [
      "electricity", "power", "transformer", "bill", "meter", "wbsedcl", "cesc", "msedcl", "mahavitaran", "fuse", "blackout", "load shedding", "current",
      "বিদ্যুৎ", "লোডশেডিং", "বিজলি", "बिजली", "विद्युत", "वीज"
    ],
    roads: [
      "road", "street", "pothole", "pwd", "nhai", "highway", "asphalt", "broken", "khadda", "gaddha", "rasta",
      "রাস্তা", "সড়ক", "सड़क", "रस्ता", "गड्ढा", "खड्डे"
    ],
    garbage: [
      "garbage", "waste", "cleaning", "dump", "dustbin", "vat", "sanitation", "dengue", "smell", "mosquito", "kachra",
      "আবর্জনা", "ময়লা", "कचरा", "घाण", "सफाई"
    ],
    drainage: [
      "drain", "drainage", "waterlogging", "sewer", "clog", "monsoon", "nullah", "gutter", "water log", "stagnant",
      "নর্দমা", "ড্রেন", "জলমগ্ন", "নাली", "सीवर", "गटार", "नाले", "पाणी साचणे"
    ],
    certificates: [
      "certificate", "birth", "death", "registry", "health", "hospital", "income", "domicile", "caste", "dakhla", "pramanpatra",
      "শংসাপত্র", "নিবন্ধন", "प्रमाणपत्र", "दाखला"
    ],
    pension: [
      "pension", "allowance", "bdo", "widow", "elderly", "sanjay gandhi", "shravanbal", "jai bangla", "taposili", "bhata",
      "পেনশন", "ভাতা", "पेंशन", "पेन्शन", "निराधार"
    ]
  };

  const currentCategoryKeywords = categoryTerms[category] || [];

  const categoryPrefix =
    category === "water_supply"
      ? "water"
      : category === "electricity"
        ? "elec"
        : category === "roads"
          ? "road"
          : category === "garbage"
            ? "garbage"
            : category === "drainage"
              ? "drain"
              : category === "certificates"
                ? "cert"
                : category === "pension"
                  ? "pension"
                  : "";

  // ── 3. Score & Rank ───────────────────────────────────────────────────────
  const scored = stateScopedChunks.map((chunk) => {
    let score = 0;
    const isCategoryMatch = categoryPrefix ? chunk.id.includes(categoryPrefix) : false;

    // High boost for direct category match
    if (isCategoryMatch) {
      score += 50;
    }

    // Keyword match against citizen description
    chunk.keywords.forEach((kw) => {
      const kwLower = kw.toLowerCase();
      if (kwLower.length >= 2 && normalizedQuery.includes(kwLower)) {
        score += 8;
      }
      if (currentCategoryKeywords.includes(kwLower)) {
        score += 3;
      }
    });

    // Content match across localized text
    if (normalizedQuery.length >= 3) {
      if (chunk.content.toLowerCase().includes(normalizedQuery)) score += 10;
      if (chunk.content_bn && chunk.content_bn.includes(queryText)) score += 10;
      if (chunk.content_hi && chunk.content_hi.includes(queryText)) score += 10;
      if (chunk.content_mr && chunk.content_mr.includes(queryText)) score += 10;
    }

    // Give state-specific category chunks higher priority over national chunks
    if (chunk.state === canonicalState && isCategoryMatch) {
      score += 15;
    }

    return { chunk, score, isCategoryMatch };
  });

  // Filter out irrelevant non-category chunks if category matches exist
  const categoryScoped = scored.filter((s) => s.isCategoryMatch && s.score > 0);
  categoryScoped.sort((a, b) => b.score - a.score);

  if (categoryScoped.length > 0) {
    const topCategoryChunks = categoryScoped.slice(0, 3).map((s) => s.chunk);

    // Hard boundary verification: ensure zero contamination
    return topCategoryChunks.filter((c) => {
      if (canonicalState === "West Bengal") return c.state === "West Bengal" || c.state === "National";
      if (canonicalState === "Maharashtra") return c.state === "Maharashtra" || c.state === "National";
      return c.state === "National";
    });
  }

  // Fallback: If no direct category match, prioritize state-specific chunks then national statutes
  scored.sort((a, b) => b.score - a.score);
  const fallbackChunks = scored
    .map((s) => s.chunk)
    .filter((c) => {
      if (canonicalState === "West Bengal") return c.state === "West Bengal" || c.state === "National";
      if (canonicalState === "Maharashtra") return c.state === "Maharashtra" || c.state === "National";
      return c.state === "National";
    });

  return fallbackChunks.slice(0, 2);
}
