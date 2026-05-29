/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Compass,
  FileText,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Download,
  Copy,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Clock,
  Globe,
  Plus,
  Search,
  Check,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  RefreshCw,
  Droplet,
  Zap,
  Milestone,
  Trash2,
  Waves,
  FileBadge,
  Coins,
  HelpCircle,
  Printer,
  Award,
  Sparkles,
} from "lucide-react";

///// Localized UI strings for premium multi-language experience
const UI_TRANSLATIONS = {
  en: {
    brandName: "NagrikSeva",
    brandSubtitle: "নাগরিক সেবা",
    tagline: "Assisting citizens with curated, legally grounded drafts of official complaints and Right to Information (RTI) applications.",
    taglineSub: "Built on official State Citizen Charters and active statutes. Transparent, direct, and free of charge.",
    toggleLang: "বাংলা (Bengali)",
    tabCreate: "Draft Grievance & RTI",
    tabRights: "Know Your Rights",
    tabHelplines: "Helplines & Directory",
    tabActiveScenario: "Typical Case Studies",
    
    // Intake Stepper
    stepLocation: "1. Region & Authority",
    stepCategory: "2. Civic Department",
    stepDetails: "3. Grievance Context",
    stepReview: "4. Compiled Document",
    
    selectState: "Select State or Union Territory",
    selectDistrict: "Select Municipal Corporation Area",
    selectCategory: "Choose Issue Department Category",
    issueDescLabel: "Describe your problem in detail (Write in English, Bengali, or any regional language)",
    issueDescPlaceholder: "Describe the timeline and issue. E.g., 'Severe water logging has persisted in our ward for 4 days, with drainage overflow rendering access roads impassable...'",
    durationLabel: "How long has this issue remained unresolved?",
    prevComplaintLabel: "Has any prior complaint reference been raised? (Optional)",
    prevComplaintPlaceholder: "e.g., KMC-2026-WTR-828A",
    docTypeLabel: "Which official drafts do you wish to compile?",
    docBoth: "Both Documents (Official Complaint & RTI Application)",
    docComplaint: "Complaint Letter (Directed to the Executive Officer)",
    docRti: "RTI Application (Under RTI Section 6)",
    
    // Help and tips
    knowYourRightsHelp: "Process Framework & Legality",
    knowYourRightsText: "This application references official municipal charters, maps the designated officer's address, and correlates key regulatory codes to draft compliant office paperwork.",
    
    // Action buttons
    btnNext: "Continue",
    btnBack: "Return",
    btnGenerate: "Draft Official Papers",
    btnGenerating: "Aligning municipal charters... Drafting formal paperwork...",
    btnReset: "Review & Revise",
    
    // Output screen
    outputHeading: "Official Papers drafted successfully",
    outputSub: "Verify the drafted materials below. Copy, print or download compiled texts for formal submission.",
    tabDocComplaint: "Grievance Complaint Draft",
    tabDocRti: "Statutory RTI Petition (Section 6)",
    tabDocSummary: "Actionable Filing Advisory",
    btnCopy: "Copy Document Buffer",
    btnCopied: "Copied!",
    btnDownload: "Save Text File",
    btnDownloaded: "File Downloaded!",
    groundingHeader: "Official Source Citations & SLA Anchors",
    groundingAlert: "The compiled applications draw from active, official municipal service declarations:",
    expectedRes: "Statutory Citizen SLA Timeframe:",
    helplinePhone: "Official Departmental Direct Hotline:",
    portalLink: "Nodal Civic Web Portal:",
    
    // Canned scenarios
    demoScenariosTitle: "Predefined Case Studies",
    demoScenariosSub: "Select a real-world case study to instantly pre-fill the form with standard regional civic grievance facts.",
    demo1Title: "Case Study A: Water Supply Disruption",
    demo1Desc: "A 3-day dry tap emergency in Maheshtala Ward causing critical civic distress.",
    demo2Title: "Case Study B: Welfare Pension Delay",
    demo2Desc: "Elderly social security allowance not disbursed for 2 cycles in Siliguri.",
    demo3Title: "Case Study C: Ward Development Audit",
    demo3Desc: "Filing a public RTI enquiry on fund utilization for Kolkata Ward road repairs.",
    
    // Rights section
    rightsHeader: "Familiarize with your Statutory Rights (RTI Section 6 & Citizen Charters)",
    
    // NEW TRANSLATION STRINGS:
    sandboxLabel: "NAGRIK SEVA ASSISTANCE PROTOCOL",
    orOtherStateModel: "National / Other State Model",
    stateSelectSubtext: "* Mapped with official KMC, Siliguri, and Maheshtala municipal service charters and statutory timelines.",
    kolkataOption: "Kolkata Corporation Area (KMC)",
    maheshtalaOption: "Maheshtala Ward Unit (South 24 Pgs)",
    howrahOption: "Howrah Municipality (HMC)",
    siliguriOption: "Siliguri Municipal Board",
    districtDesc: "Determines the nodal department addresses and RTI Public Authority targets.",
    minChars: "MIN 15 Characters",
    durationOption1: "Less than 24 hours",
    durationOption2: "1 to 3 days",
    durationOption3: "3 to 7 days",
    durationOption4: "1 to 4 weeks",
    durationOption5: "More than a month (Critical Delayed Response)",
    bothDocDesc: "Draft primary civil grievance & secondary legal RTI status demand.",
    complaintDocDesc: "Draft a formal application to the sub-division municipality desk.",
    rtiDocDesc: "Draft statutory application per Section 6 RTI Act demanding files audit.",
    changeDetails: "Change details",
    statutoryBannerTitle: "Statutory & Municipal SLA Alignment",
    statutoryBannerDesc: "This partition matches official Government Citizen Charters and public service guidelines of {state}. Relevant regulatory provisions and official address lines are aligned automatically to ensure valid submittal.",
    charterCompliantLabel: "Municipal Charter Compliant",
    statutesCitationLabel: "Statutes Citation Engaged",
    trustIndexLabel: "Form Validity Index",
    sandboxActiveLabel: "Interactive Editing Mode Active",
    draftLockedLabel: "Official Petition Letter Ready",
    btnFinishEditing: "Finish Editing",
    btnEditDraft: "Edit Draft",
    btnPrintPetition: "Print Petition",
    nodalOfficeTargets: "Nodal Dispatch Office Targets",
    daysGuaranteeSLA: "Days Guaranteed SLA",
    milestonesTitle: "Grievance Filing Milestones Checklist",
    milestonesSubtitle: "Take command of your civic rights. Follow these physical execution steps to formally execute and dispatch your compiled citizen application:",
    milestonesCompleteText: "of {total} Complete",
    milestoneLabelText: "Milestone",
    databaseCheckTitle: "Municipal Code Verification Audit",
    databaseCheckDesc: "Cross-referencing target clauses from official municipal codes and citizen charters based on your issue description:",
    scanningMatchedRules: "Checking relevant citizen charter codes...",
    municipalSlaTitle: "Municipal Legal SLA targets",
    municipalSlaDesc: "Indian state codes (West Bengal Right to Public Services Act 2013) guarantee explicit processing timelines:",
    rightsSub: "A regional statutory compilation compiled by West Bengal Civil Liberties Initiative and Digital India public documentation.",
    bplWaiverTitle: "BPL Category Fees Waiver Note",
    bplWaiverDesc: "Are you holding a BPL (Below Poverty Line) card issued by the State of West Bengal / Government of India? You are completely exempted from paying any fee of Rupees 10 during the draft submittal. Be sure to reference your BPL card number.",
    helplinesSub: "Access primary municipal, district and welfare contacts directly mapped across the corpus.",
    footerText1: "© 2026 NagrikSeva Platform. Dedicated Citizen Assistance and Charter Reference Portal.",
    footerText2: "Built for Digital India & Municipal Transparency Initiative • Maheshtala, West Bengal",
    modifyTextInputs: "Modify text inputs",
    failedGenTitle: "Unable to Generate Petition"
  },
  bn: {
    brandName: "নাগরিকসেবা",
    brandSubtitle: "নাগরিক অভাবযোগ ও আরটিআই সংক্রান্ত তথ্যসহায়তা",
    tagline: "পৌরসংস্থা বা পৌরসভার নাগরিক অভাব-অভিযোগ ও তথ্য জানার অধিকার (আরটিআই) আইনের সঠিক খসড়া আবেদনপত্র প্রস্তুত করার নির্ভরযোগ্য পোর্টাল।",
    taglineSub: "সরকারি সিটিজেন চার্টার এবং তথ্য জানার অধিকার আইন ২০০৫-এর নিয়মানুযায়ী পরিচালিত। সম্পূর্ণ নিখরচায় ও স্বচ্ছভাবে চালিত নাগরিক উদ্যোগ।",
    toggleLang: "English",
    tabCreate: "অভিযোগপত্র ও আরটিআই খসড়া",
    tabRights: "নাগরিক অধিকার নির্দেশিকা",
    tabHelplines: "পৌর ডিরেক্টরি ও হেল্পলাইন",
    tabActiveScenario: "অভিযোগের বাস্তব উদাহরণ",
    
    // Intake Stepper
    stepLocation: "১. অঞ্চল ও সংশ্লিষ্ট পৌর বিভাগ",
    stepCategory: "২. নাগরিক পরিষেবার ক্যাটাগরি",
    stepDetails: "৩. অভাব-অভিযোগের বিবরণ",
    stepReview: "৪. প্রস্তুতকৃত খসড়া পত্র",
    
    selectState: "রাজ্য বা কেন্দ্রশাসিত অঞ্চল নির্বাচন করুন",
    selectDistrict: "পৌরসভা বা পৌরনিগম অঞ্চল নির্বাচন করুন",
    selectCategory: "পরিষেবা প্রদানকারী পৌর বিভাগ নির্বাচন করুন",
    issueDescLabel: "আপনার সমস্যার বিবরণ বিস্তারিত লিখুন (বাংলা, ইংরেজি বা যেকোনো ভাষায় লিখতে পারেন)",
    issueDescPlaceholder: "সমস্যার ইতিহাস এবং বিবরণ দিন। যেমন- 'আমাদের ওয়ার্ডে ৪ দিন ধরে পানীয় জলের তীব্র সংকট চলছে এবং ড্রেন উপচে রাস্তা জলমগ্ন হয়ে পড়েছে...'",
    durationLabel: "সমস্যাটি কতদিন ধরে সমাধানহীন অবস্থায় রয়েছে?",
    prevComplaintLabel: "পূর্বে কোনো অভিযোগ দায়ের করা হয়েছিল? (ঐচ্ছিক)",
    prevComplaintPlaceholder: "যেমন: KMC-2026-WTR-828A",
    docTypeLabel: "কোন ধরণের আবেদনপত্র প্রস্তুত করতে চান?",
    docBoth: "অভিযোগপত্র এবং আরটিআই আবেদনপত্র দুই-ই প্রস্তুত করুন",
    docComplaint: "পৌর দপ্তরে জমা দেওয়ার সাধারণ অভিযোগপত্র",
    docRti: "তথ্য জানার অধিকার আইনের ধারা ৬ অনুযায়ী আরটিআই আবেদনপত্র",
    
    // Help and tips
    knowYourRightsHelp: "আইনসম্মত কার্যপ্রণালী ও সময়ের বাধ্যবাধকতা",
    knowYourRightsText: "এই ব্যবস্থাটি সরাসরি সরকারি সিটিজেন চার্টার এবং তথ্য জানার অধিকার আইনের নিয়মাবলী মিলিয়ে একটি আইনসম্মত খসড়া আবেদনপত্র প্রস্তুত করবে।",
    
    // Action buttons
    btnNext: "পরবর্তী ধাপে যান",
    btnBack: "পূর্ববর্তী ধাপে যান",
    btnGenerate: "আইনি খসড়া নথি তৈরি করুন",
    btnGenerating: "বিভাগীয় নিয়মালী বিশ্লেষণ করা হচ্ছে... নথি খসড়া হচ্ছে...",
    btnReset: "নতুন করে শুরু করুন",
    
    // Output screen
    outputHeading: "খসড়া আইনি নথি সফলভাবে প্রস্তুত করা হয়েছে",
    outputSub: "নিচের নথিগুলো ভালোভাবে পড়ে নিন। আপনি এগুলো কপি অথবা ডাউনলোড করে সংশ্লিষ্ট দপ্তরে জমা দিতে পারেন।",
    tabDocComplaint: "অভিযোগ পত্র (Complaint)",
    tabDocRti: "RTI আবেদনপত্র (Sec 6)",
    tabDocSummary: "নাগরিক নির্দেশিকা ও সারসংক্ষেপ",
    btnCopy: "কপি করুন",
    btnCopied: "কপি সম্পন্ন!",
    btnDownload: "ডাউনলোড করুন",
    btnDownloaded: "ডাউনলোড সম্পন্ন!",
    groundingHeader: "অফিসিয়াল নথির তথ্যসূত্র ও উদ্ধৃতিসমূহ",
    groundingAlert: "এই তথ্যসূত্রগুলো নির্দেশ করছে যে আপনার নথিতে উল্লিখিত নিয়মগুলো সম্পূর্ণ বাস্তব এবং আইনসম্মত:",
    expectedRes: "সমাধানের সময়সীমা (সিটিজেন চার্টার):",
    helplinePhone: "সরাসরি বিভাগীয় হেল্পলাইন নাম্বার:",
    portalLink: "অফিসিয়াল পোর্টাল লিংক:",
    
    // Canned scenarios
    demoScenariosTitle: "পূর্বনির্ধারিত উদাহরণসমূহ",
    demoScenariosSub: "ফর্মটি পরীক্ষা করার জন্য নিচের যেকোনো একটি উদাহরণে ক্লিক করলে তা বিভাগীয় তথ্যসহ স্বয়ংক্রিয়ভাবে পূরণ হয়ে যাবে।",
    demo1Title: "উদাহরণ ১: জল সরবরাহ সংকট",
    demo1Desc: "মহেশতলার একজন প্রবীণ নাগরিক ৩ দিন ধরে পাইপের জল না পাওয়ার অভিযোগ জানাচ্ছেন।",
    demo2Title: "উদাহরণ ২: পেনশন বিলম্ব",
    demo2Desc: "শিলিগুড়িতে একজন অবসরপ্রাপ্ত কর্মী গত ২ মাসের পুরনো পেনশন আটকে থাকার জন্য RTI করছেন।",
    demo3Title: "উদাহরণ ৩: রাস্তা মেরামতের RTI",
    demo3Desc: "ওয়ার্ডে বরাদ্দকৃত রাস্তার উন্নয়ন তহবিলের হিসাব জানার জন্য নাগরিকের পক্ষ থেকে RTI আবেদন।",
    
    // Rights section
    rightsHeader: "আপনার আইনি ক্ষমতাগুলি জেনে নিন (RTI ধারা ৬ ও সিটিজেন চার্টার)",
    
    // NEW TRANSLATION STRINGS IN BENGALI:
    sandboxLabel: "নাগরিক সেবা পোর্টাল সহকারী",
    orOtherStateModel: "জাতীয় / অন্যান্য রাজ্যের মডেল",
    stateSelectSubtext: "* এটি কেএমসি (KMC), শিলিগুড়ি এবং মহেশতলা পৌরসভার অফিসিয়াল নাগরিক চার্টার এবং আইনি নিয়মাবলীর সাথে সংযুক্ত।",
    kolkataOption: "কলকাতা পৌরনিগম এলাকা (KMC)",
    maheshtalaOption: "মহেশতলা ওয়ার্ড ইউনিট (দক্ষিণ ২৪ পরগণা)",
    howrahOption: "হাওড়া পৌরসভা (HMC)",
    siliguriOption: "শিলিগুড়ি পৌর বোর্ড",
    districtDesc: "এটি নোডাল বিভাগের ঠিকানা এবং আরটিআই (RTI) জন কর্তৃপক্ষের লক্ষ্য নির্ধারণ করে।",
    minChars: "ন্যূনতম ১৫ টি অক্ষর",
    durationOption1: "২৪ ঘণ্টার কম সময় ধরে",
    durationOption2: "১ থেকে ৩ দিন ধরে",
    durationOption3: "৩ থেকে ৭ দিন ধরে",
    durationOption4: "১ থেকে ৪ সপ্তাহ ধরে",
    durationOption5: "এক মাসেরও বেশি সময় ধরে (গুরুতর বিলম্বিত প্রতিক্রিয়া)",
    bothDocDesc: "প্রাথমিক নাগরিক অভিযোগ এবং আরটিআই (RTI) স্ট্যাটাস চাহিদা প্রস্তুত করুন।",
    complaintDocDesc: "পৌরসভার সাব-ডিভিশন ডেস্কের জন্য একটি আনুষ্ঠানিক আবেদনপত্র খসড়া করুন।",
    rtiDocDesc: "নথিপত্র অডিট করার জন্য তথ্য জানার অধিকার আইনের ধারা ৬ অনুযায়ী আবেদনপত্র খসড়া করুন।",
    changeDetails: "তথ্য পরিবর্তন করুন",
    statutoryBannerTitle: "সিটিজেন চার্টার এবং এসএলএ (SLA) সমন্বয়",
    statutoryBannerDesc: "এই খসড়াটি {state}-এর সরাসরি নির্দেশিত স্থানীয় পৌর চার্টার এবং জনসেবার অধিকার আইনের সাথে মিলিয়ে তৈরি করা হয়েছে। আইনসম্মত প্রাসঙ্গিক বিষয় ও বিভাগীয় কর্মকর্তা নিয়োগের বিবরণ এতে সংযোজিত হয়েছে।",
    charterCompliantLabel: "সিটিজেন চার্টার সম্মত",
    statutesCitationLabel: "আইনি ধারা সংযোজিত",
    trustIndexLabel: "ফর্ম বৈধতার সূচক",
    sandboxActiveLabel: "ইন্টারেক্টিভ সম্পাদনা সক্রিয় রয়েছে",
    draftLockedLabel: "ফরমাল পিটিশন পত্র প্রস্তুত",
    btnFinishEditing: "সম্পাদনা সম্পন্ন করুন",
    btnEditDraft: "খসড়াটি সম্পাদনা করুন",
    btnPrintPetition: "পিটিশন প্রিন্ট করুন",
    nodalOfficeTargets: "সংশ্লিষ্ট বিভাগীয় দপ্তরের ঠিকানা",
    daysGuaranteeSLA: "দিনের মধ্যে সমাধানের নিশ্চয়তা (SLA)",
    milestonesTitle: "অভিযোগ জমাদানের পরবর্তী গুরুত্বপূর্ণ ধাপসমূহ",
    milestonesSubtitle: "আপনার নাগরিক अधिकार প্রয়োগ করুন। আপনার প্রস্তুতকৃত খসড়া আবেদনপত্রটি আনুষ্ঠানিকভাবে জমা দেওয়ার জন্য নিচের ধাপসমূহ অনুসরণ করুন:",
    milestonesCompleteText: "টি শেষ হয়েছে (মোট {total} টির মধ্যে)",
    milestoneLabelText: "ধাপ",
    databaseCheckTitle: "সিটিজেন চার্টার ডাটাবেস অনুসন্ধান",
    databaseCheckDesc: "আপনার বিবরণী অনুযায়ী অফিসিয়াল আইন ও সিটিজেন চার্টার থেকে পাওয়া তথ্যসূত্রের মিল সূচক:",
    scanningMatchedRules: "আপনার বিবরণী অনুযায়ী সিটিজেন চার্টার স্ক্যান করা হচ্ছে...",
    municipalSlaTitle: "আইনি সমাধান সময়সীমা (SLA)",
    municipalSlaDesc: "পশ্চিমবঙ্গ সরকারের জনসেবা অধিকার আইন ২০১৩ অনুযায়ী নাগরিক পরিষেবাদির জন্য সুনির্দিষ্ট সময়সীমা নির্ধারিত আছে:",
    rightsSub: "পশ্চিমবঙ্গ নাগরিক অধিকার ফোরাম এবং ডিজিটাল ইন্ডিয়া পাবলিক নথিপত্র থেকে সংগৃহীত একটি সংবিধিবদ্ধ সংকলন।",
    bplWaiverTitle: "বিপিএল (BPL) কার্ডধারীদের জন্য ফি মকুবের নিয়ম",
    bplWaiverDesc: "আপনার কি পশ্চিমবঙ্গ সরকার বা ভারত সরকার কর্তৃক ইস্যু করা বিপিএল (BPL) কার্ড রয়েছে? তাহলে আবেদনপত্র জমা দেওয়ার ১০ টাকার ফি থেকে আপনি সম্পূর্ণ ছাড় পাবেন। আবেদনে আপনার বিপিএল কার্ড নাম্বারটি অবশ্যই উল্লেখ করবেন।",
    helplinesSub: "আমাদের তথ্যভাণ্ডারের সাথে যুক্ত প্রধান পৌরসভা, জেলা এবং সমাজকল্যাণ দপ্তরের হেল্পলাইনসমূহ।",
    footerText1: "© ২০২৬ নাগরিকসেবা প্ল্যাটফর্ম। নাগরিক অভিযোগ ও তথ্য সহায়তা সেল।",
    footerText2: "ডিজিটাল ইন্ডিয়া এবং সরকারি স্বচ্ছতা উদ্যোগ • মহেশতলা, পশ্চিমবঙ্গ",
    modifyTextInputs: "আবেদন তথ্য সংশোধন করুন",
    failedGenTitle: "পিটিশন খসড়া করা যায়নি"
  }
};

const SAMPLE_RIGHTS_RECORDS = [
  {
    title_en: "Kolkata Municipal Corporation Water SLA",
    title_bn: "কলকাতা পৌরনিগম জল সরবরাহ সময়সীমা (SLA)",
    time_en: "24 Hours Response",
    time_bn: "২৪ ঘণ্টার মধ্যে প্রতিক্রিয়া",
    law_en: "Rule 3.1 Water Code",
    law_bn: "নিয়ম ৩.১ ওয়াটার কোড",
    desc_en: "Failure to provide standard clean water lines triggers immediate accountability of Ward Health Inspector. Temporary water tenders must be dispatched if interruption exceeds 36 hours limit.",
    desc_bn: "মানসম্মত বিশুদ্ধ জল সরবরাহ করতে ব্যর্থ হলে ওয়ার্ড হেলথ ইন্সপেক্টরের তাৎক্ষণিক জবাবদিহিতা শুরু হয়। বিভ্রাট ৩৬ ঘণ্টা অতিক্রম করলে অস্থায়ী ওয়াটার ট্যাঙ্কার পাঠাতে হবে।",
    tag_en: "Water",
    tag_bn: "পানীয় জল"
  },
  {
    title_en: "WBSEDCL Line Outage Guarantee",
    title_bn: "বিদ্যুৎ বিভ্রাটের সময়সীমা গ্যারান্টি (WBSEDCL)",
    time_en: "4 Hours (Urban) / 24 Hours (Rural)",
    time_bn: "৪ ঘণ্টা (শহরে) / ২৪ ঘণ্টা (গ্রামে)",
    law_en: "WBERC Regulation 5.2",
    law_bn: "WBERC প্রবিধান ৫.২",
    desc_en: "Provides citizens specific compensatory rights if power is not restored following major distribution breakdowns or transformers blown within statutory limits.",
    desc_bn: "আইনসম্মত সময়সীমার মধ্যে বিদ্যুৎ পুনরায় চালু না হলে অথবা বড় ধরণের ট্রান্সফরমার বিকল হলে নাগরিকদের সুনির্দিষ্ট ক্ষতিপূরণ পাওয়ার অধিকার প্রদান করে।",
    tag_en: "Electricity",
    tag_bn: "বিদ্যুৎ"
  },
  {
    title_en: "RTI Section 6(1) General Right To Request",
    title_bn: "RTI ধারা ৬(১) তথ্য চাওয়ার সাধারণ অধিকার",
    time_en: "30 Days Mandatory Action",
    time_bn: "৩০ দিনের মধ্যে বাধ্যতামূলক পদক্ষেপ",
    law_en: "RTI Act 2005",
    law_bn: "আরটিআই আইন ২০০৫",
    desc_en: "Any Indian citizen can ask for any document, circular, contractor audit bills, or roster directly from public bodies without having to state a personal reason.",
    desc_bn: "যেকোনো ভারতীয় নাগরিক কোনো ব্যক্তিগত কারণ দর্শানো ছাড়াই সরাসরি যেকোনো সরকারি দপ্তরের নথি, সার্কুলার, ঠিকাদারের অডিট বিল বা রোস্টার চাইতে পারেন।",
    tag_en: "RTI",
    tag_bn: "তথ্য অধিকার"
  },
  {
    title_en: "RTI Section 7(1) Life and Liberty Waiver",
    title_bn: "RTI ধারা ৭(১) জীবন ও ব্যক্তিগত স্বাধীনতা সম্পর্কিত ছাড়",
    time_en: "48 Hours Action Deadline",
    time_bn: "৪৮ ঘণ্টা সময়সীমা",
    law_en: "RTI Act 2005",
    law_bn: "আরটিআই আইন ২০০৫",
    desc_en: "If the requested information directly concerns the fundamental life or bodily liberty of a person, the response must be given by the Public Information Officer within 48 hours.",
    desc_bn: "যদি অনুরোধকৃত তথ্য কোনো ব্যক্তির মৌলিক জীবন বা শারীরিক স্বাধীনতার সাথে সরাসরি সম্পর্কিত হয়, তবে জনতথ্য কর্মকর্তাকে ৪৮ ঘণ্টার মধ্যে উত্তর দিতে হবে।",
    tag_en: "RTI Emergency",
    tag_bn: "জরুরি আরটিআই"
  },
  {
    title_en: "Birth & Death Registry SLA",
    title_bn: "জন্ম ও মৃত্যু শংসাপত্র প্রদানের সময়সীমা (SLA)",
    time_en: "7 Days Delivery",
    time_bn: "৭ দিনের মধ্যে ডেলিভারি",
    law_en: "WB Registry Act 2000",
    law_bn: "পশ্চিমবঙ্গ রেজিস্ট্রি আইন ২০০০",
    desc_en: "Mandates local bodies to deliver certificates within strict calendar guidelines of registration, helping eliminate bribery loops of agents.",
    desc_bn: "পৌরসভা বা স্থানীয় কর্তৃপক্ষকে নিবন্ধনের ৭ দিনের মধ্যে শংসাপত্র প্রদান বাধ্যতামূলক করে, যা দালালদের হয়রানি ও ঘুষের চক্র নির্মূল করতে সহায়তা করে।",
    tag_en: "Civil Certificates",
    tag_bn: "নাগরিক শংসাপত্র"
  }
];

export default function App() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [activeTab, setActiveTab] = useState<"create" | "rights" | "helplines">("create");
  
  // In-place editable draft buffers
  const [editableComplaint, setEditableComplaint] = useState("");
  const [editableRti, setEditableRti] = useState("");
  const [editableSummary, setEditableSummary] = useState("");
  const [isEditingDraft, setIsEditingDraft] = useState(false);

  // Compliance analysis score logic
  const getComplianceScore = () => {
    if (!generatedResult) return 74;
    const count = generatedResult.sources?.length || 0;
    if (count >= 3) return 96;
    if (count === 2) return 88;
    if (count === 1) return 81;
    return 74;
  };

  const getComplianceBadge = () => {
    if (!generatedResult) return "General practice draft";
    const count = generatedResult.sources?.length || 0;
    if (count >= 3) return "Statutory Gold Standard";
    if (count === 2) return "Legally Fortified";
    if (count === 1) return "Charter Compliant";
    return "Standard Application Framework";
  };

  // Interactive step-by-step checklist
  const [checklistItems, setChecklistItems] = useState([
    { id: "print", text_en: "Print 2 copies of the formal Complaint letter (one to submit, one for acknowledgment stamp received)", text_bn: "অভিযোগপত্রের দুটি কপি প্রিন্ট করুন (একটি জমা দেওয়ার জন্য এবং অন্যটি প্রাপ্তির রসিদ স্ট্যাম্প রাখার জন্য)", done: false },
    { id: "court_fee", text_en: "Affix standard ₹10 Court Fee Stamp or buy a Postal Order (exempted if you fall BPL)", text_bn: "অভিযোগের সাথে ১০ টাকার কোর্ট ফি স্ট্যাম্প বা ইন্ডিয়ান পোস্টাল অর্ডার দিন (বিপিএল হলে সম্পূর্ণ ছাড়)", done: false },
    { id: "sign", text_en: "Sign your name and specify contact phone details with permanent address", text_bn: "অভিযোগের শেষে আপনার নাম স্বাক্ষর করুন এবং যোগাযোগের মোবাইল নম্বর ও ঠিকানা লিখুন", done: false },
    { id: "post", text_en: "Submit standard complaint directly, or send the RTI petition via registered post", text_bn: "অভিযোগপত্র সরাসরি জমা দিন, অথবা আরটিআই আবেদনটি রেজিস্টার্ড পোস্টের মাধ্যমে প্রেরণ করুন", done: false },
  ]);

  // States prepopulated with West Bengal and local places
  const [selectedState, setSelectedState] = useState("West Bengal");
  const [selectedDistrict, setSelectedDistrict] = useState("Kolkata");
  const [selectedCategory, setSelectedCategory] = useState("water_supply");
  const [problemDescription, setProblemDescription] = useState("");
  const [duration, setDuration] = useState("3-7 days");
  const [prevRef, setPrevRef] = useState("");
  const [docType, setDocType] = useState<"complaint" | "rti" | "both">("both");
  
  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);
  
  // API states
  const [loading, setLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<{
    complaintText: string;
    rtiText: string;
    summaryText: string;
    sources: Array<{
      id: string;
      source: string;
      source_bn?: string;
      section: string;
      section_bn?: string;
      clause: string;
      clause_bn?: string;
      content: string;
      content_bn?: string;
    }>;
    department: {
      departmentName: string;
      departmentName_bn: string;
      portalUrl: string;
      helpline: string;
      expectedResolutionDays: number;
      designation: string;
      designation_bn: string;
      address: string;
      address_bn: string;
    } | null;
  } | null>(null);

  const [activeDocSubTab, setActiveDocSubTab] = useState<"complaint" | "rti" | "summary">("complaint");
  
  // User interactive copy / download feedback
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [manualRAGChunks, setManualRAGChunks] = useState<any[]>([]);

  const strings = UI_TRANSLATIONS[lang];

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case "water_supply":
        return <Droplet className="h-4 w-4 text-sky-600" />;
      case "electricity":
        return <Zap className="h-4 w-4 text-amber-500 animate-pulse" />;
      case "roads":
        return <Milestone className="h-4 w-4 text-orange-600" />;
      case "garbage":
        return <Trash2 className="h-4 w-4 text-rose-500" />;
      case "drainage":
        return <Waves className="h-4 w-4 text-blue-500" />;
      case "certificates":
        return <FileBadge className="h-4 w-4 text-teal-600" />;
      case "pension":
        return <Coins className="h-4 w-4 text-indigo-500" />;
      default:
        return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2000);
    });
  };

  const downloadTextFile = (title: string, text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/\s+/g, "_")}_draft.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloadStatus(true);
    setTimeout(() => setDownloadStatus(false), 2000);
  };

  // Auto query RAG preview from the backend dynamically when description changes (Debounced)
  useEffect(() => {
    if (problemDescription.length < 5) return;
    const delayDebounceFn = setTimeout(() => {
      fetch("/api/kb/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: problemDescription, category: selectedCategory }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.results) {
            setManualRAGChunks(data.results);
          }
        })
        .catch((err) => console.log("RAG preview err:", err));
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [problemDescription, selectedCategory]);

  // Load preset demo cases
  const applyDemoScenario = (sc: number) => {
    if (sc === 1) {
      setSelectedState("West Bengal");
      setSelectedDistrict("Maheshtala");
      setSelectedCategory("water_supply");
      setProblemDescription(
        lang === "bn"
          ? "আমার বাড়িতে গত ৩ দিন ধরে কোনো পাইপের জল আসছে না। জলের প্রচণ্ড কষ্ট হচ্ছে, বাচ্চারা রান্না করার জল পাচ্ছে না।"
          : "For the last 3 days there is absolute no water supply in Maheshtala Ward 12 near KMC border. Children and elderly are facing extreme dehydration."
      );
      setDuration("3-7 days");
      setPrevRef("");
      setDocType("both");
    } else if (sc === 2) {
      setSelectedState("West Bengal");
      setSelectedDistrict("Siliguri");
      setSelectedCategory("pension");
      setProblemDescription(
        lang === "bn"
          ? "আমার বার্ধক্য পেনশন গত ২ মাস ধরে ব্যাংকে জমা পড়েনি। আমি একজন ৬০ বছরের বিধবা এবং আমার আয়ের অন্য কোনো উৎস নেই।"
          : "My monthly old-age social security welfare pension has not been credited to my SBI account for the last 2 months. I am a 68-year-old widow with no backup livelihood."
      );
      setDuration("1-4 weeks");
      setPrevRef("WB-PENS-5532A");
      setDocType("both");
    } else if (sc === 3) {
      setSelectedState("West Bengal");
      setSelectedDistrict("Kolkata");
      setSelectedCategory("roads");
      setProblemDescription(
        lang === "bn"
          ? "আমি বিগত ২ অর্থবর্ষে (২০২৪-২৫ এবং ২০২৫-২৬) আমার ৮৫ নম্বর ওয়ার্ডের রাস্তা মেরামতের কাজের বরাদ্দকৃত ব্যয়ের বিবরণী এবং টেন্ডারের নথিপত্র চেয়ে একটি RTI আবেদন করতে চাই।"
          : "I want to file an RTI enquiry to fetch official expenditure accounts and repair tenders allocated to Ward 85 road work for the last 2 financial years (2024-25, 2025-26)."
      );
      setDuration("More than a month");
      setPrevRef("");
      setDocType("rti");
    }
    // Advance directly to step 3 review
    setCurrentStep(3);
    setGeneratedResult(null);
  };

  // Dispatch Document Generation call to back-end proxy API
  const handleGenerateDocument = async () => {
    setLoading(true);
    setErrorNotice(null);
    setGeneratedResult(null);

    try {
      const response = await fetch("/api/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: selectedState,
          city: selectedDistrict,
          category: selectedCategory,
          description: problemDescription,
          duration: duration,
          previous_ref: prevRef,
          document_type: docType,
          language: lang,
        }),
      });

      let data: any;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        throw new Error(`Invalid server response (Status ${response.status}): ${textResponse.slice(0, 150)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred building draft documents.");
      }

      const text = data.rawText;
      
      // Separate sections via regex based on markdown headers
      let complaint = "";
      let rti = "";
      let summary = "";

      // Smart parsing of split structures
      const parts = text.split(/(?=# COMPLAINT_DOCUMENT|# RTI_DOCUMENT|# CITIZEN_SUMMARY)/g);
      
      parts.forEach((part: string) => {
        if (part.startsWith("# COMPLAINT_DOCUMENT")) {
          complaint = part.replace("# COMPLAINT_DOCUMENT", "").trim();
        } else if (part.startsWith("# RTI_DOCUMENT")) {
          rti = part.replace("# RTI_DOCUMENT", "").trim();
        } else if (part.startsWith("# CITIZEN_SUMMARY")) {
          summary = part.replace("# CITIZEN_SUMMARY", "").trim();
        }
      });

      // Secondary fallback parser if markdown was not exactly delimited
      if (!complaint && !rti && !summary) {
        complaint = text; // dump all
        summary = "Refer to the comprehensive draft listed in the adjacent tab. Always submit with Rupees 10 Court Fee Stamp offline.";
      }

      const finalComplaint = complaint || "No complaint letter generated.";
      const finalRti = rti || "RTI Application was not drafted or explicitly requested for this combination.";
      const finalSummary = summary || "Citizen action guidelines and helpline checklists were generated in the primary documents.";

      setGeneratedResult({
        complaintText: finalComplaint,
        rtiText: finalRti,
        summaryText: finalSummary,
        department: data.department || null,
        sources: data.sources || [],
      });

      setEditableComplaint(finalComplaint);
      setEditableRti(finalRti);
      setEditableSummary(finalSummary);

      setCurrentStep(4);
    } catch (err: any) {
      console.error(err);
      setErrorNotice(err.message || "An unexpected error occurred during draft compilation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="nagrik_seva_root" className="min-h-screen bg-slate-50 flex flex-col justify-between">
      
      {/* Premium Header Brand bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-serif font-black text-lg">
              N
            </div>
            <div>
              <span className="font-display font-black text-slate-900 tracking-tight text-sm block">
                {strings.brandName}
              </span>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider -mt-1 font-mono">
                {strings.brandSubtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="lang_toggle_btn"
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 shadow-xs"
            >
              <Globe className="h-3.5 w-3.5 text-blue-600" />
              {strings.toggleLang}
            </button>

            {/* Manual Reset */}
            {currentStep > 1 && (
              <button
                id="reset_workspace_btn"
                onClick={() => {
                  setCurrentStep(1);
                  setProblemDescription("");
                  setPrevRef("");
                  setGeneratedResult(null);
                  setErrorNotice(null);
                }}
                className="px-3.5 py-2 text-xs bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-250 rounded-lg font-bold transition-all cursor-pointer"
              >
                {lang === "en" ? "Reset Draft" : "খসড়া মুছুন"}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Welcome Unit */}
      <section className="bg-slate-900 text-white py-12 px-4 shadow-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold bg-slate-800 text-slate-300 uppercase tracking-widest px-2.5 py-1 rounded-sm mb-3 inline-block border border-slate-700">
                {lang === "en" ? "National Citizen Support Initiative" : "জাতীয় নাগরিক সহায়তা সেল"}
              </span>
              <h1 className="text-3.5xl md:text-5xl font-black tracking-tight leading-none mb-3 font-display">
                {lang === "en" ? "NagrikSeva Hub" : "নাগরিকসেবা হাব"}
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {strings.tagline}
              </p>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 justify-center sm:justify-start">
                <ShieldCheck className="h-4.5 w-4.5 text-slate-400" />
                {strings.taglineSub}
              </p>
            </div>
            
            {/* Clean tricolor ribbon */}
            <div className="h-1.5 w-32 bg-gradient-to-r from-orange-400 via-white to-green-500 rounded-sm mx-auto md:mx-0 shadow-sm"></div>
          </div>
        </div>
      </section>

      {/* Primary Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Module Nav Toggles */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto gap-2">
          <button
            id="tab_create_btn"
            onClick={() => setActiveTab("create")}
            className={`py-3 px-5 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "create"
                ? "border-blue-600 text-blue-700 bg-white shadow-xs rounded-t-lg font-mono"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Compass className="h-4 w-4" />
            {strings.tabCreate}
          </button>
          
          <button
            id="tab_rights_btn"
            onClick={() => setActiveTab("rights")}
            className={`py-3 px-5 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "rights"
                ? "border-blue-600 text-blue-700 bg-white shadow-xs rounded-t-lg font-mono"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            {strings.tabRights}
          </button>

          <button
            id="tab_helplines_btn"
            onClick={() => setActiveTab("helplines")}
            className={`py-3 px-5 text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "helplines"
                ? "border-blue-600 text-blue-700 bg-white shadow-xs rounded-t-lg font-mono"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Phone className="h-4 w-4" />
            {strings.tabHelplines}
          </button>
        </div>

        {/* Dynamic Inner Workspace Panel */}
        {activeTab === "create" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left/Middle Column (Form & Stepper Workflow) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Stepper Status Header */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
                  <span
                    className={`text-xs px-2.5 py-1.5 rounded-full font-extrabold font-mono transition-colors ${
                      currentStep >= 1 ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    1
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                  <span
                    className={`text-xs px-2.5 py-1.5 rounded-full font-extrabold font-mono transition-colors ${
                      currentStep >= 2 ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    2
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                  <span
                    className={`text-xs px-2.5 py-1.5 rounded-full font-extrabold font-mono transition-colors ${
                      currentStep >= 3 ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    3
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                  <span
                    className={`text-xs px-2.5 py-1.5 rounded-full font-extrabold font-mono transition-colors ${
                      currentStep >= 4 ? "bg-emerald-600 text-white animate-pulse" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    4
                  </span>
                </div>
                
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-sm font-bold font-mono">
                  {currentStep === 1 && strings.stepLocation}
                  {currentStep === 2 && strings.stepCategory}
                  {currentStep === 3 && strings.stepDetails}
                  {currentStep === 4 && strings.stepReview}
                </span>
              </div>

              {/* Trigger Alert on error */}
              {errorNotice && (
                <div className="p-4 bg-rose-50 text-rose-850 rounded-xl border border-rose-200 flex items-start gap-3 shadow-md">
                  <AlertTriangle className="h-5.5 w-5.5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-sm">Failed Generation Execution</span>
                    <p className="text-xs mt-1 font-mono">{errorNotice}</p>
                  </div>
                </div>
              )}

              {/* Standard Step Content Cards */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
                
                {/* STEP 1: REGION MAP & LOCATION */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-black font-mono flex items-center gap-2 border-b border-slate-100 pb-3">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      {strings.stepLocation}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                          {strings.selectState}
                        </label>
                        <select
                          id="state_select_dropdown"
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold shadow-xs focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="West Bengal">{lang === "en" ? "West Bengal (KMC, Municipality, WBSEDCL)" : "পশ্চিমবঙ্গ (কেএমসি, পৌরসভা, বিদ্যুৎ পর্ষদ)"}</option>
                          <option value="National/General">{strings.orOtherStateModel}</option>
                        </select>
                        <p className="text-xs text-slate-400">
                          {strings.stateSelectSubtext}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                          {strings.selectDistrict}
                        </label>
                        {selectedState === "West Bengal" ? (
                          <select
                            id="district_select_dropdown"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold shadow-xs focus:ring-1 focus:ring-blue-500 cursor-pointer"
                          >
                            <option value="Kolkata">{strings.kolkataOption}</option>
                            <option value="Maheshtala">{strings.maheshtalaOption}</option>
                            <option value="Howrah">{strings.howrahOption}</option>
                            <option value="Siliguri">{strings.siliguriOption}</option>
                          </select>
                        ) : (
                          <input
                            id="district_text_input"
                            type="text"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            placeholder={lang === "en" ? "Enter City or District Name" : "শহর বা জেলার নাম লিখুন"}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold shadow-xs uppercase tracking-wide"
                          />
                        )}
                        <p className="text-xs text-slate-400">
                          {strings.districtDesc}
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3 text-blue-900">
                      <Compass className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold text-xs block">{strings.knowYourRightsHelp}</span>
                        <p className="text-xs mt-1 text-slate-600">
                          {strings.knowYourRightsText}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        id="step1_next_btn"
                        onClick={() => setCurrentStep(2)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded-lg text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        {strings.btnNext}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: CATEGORIES CARD SELECTOR */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-black font-mono flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Plus className="h-5 w-5 text-orange-500" />
                      {strings.stepCategory}
                    </h2>
                    
                    <p className="text-slate-500 text-xs">
                      {strings.selectCategory}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { id: "water_supply", name_en: "Water Supply", name_bn: "জল সরবরাহ" },
                        { id: "electricity", name_en: "Electricity", name_bn: "বিদ্যুৎ পরিষেবা" },
                        { id: "roads", name_en: "Road & Streets", name_bn: "রাস্তাঘাট" },
                        { id: "garbage", name_en: "Garbage Removal", name_bn: "আবর্জনা পরিষ্কার" },
                        { id: "drainage", name_en: "Sewerage Line", name_bn: "ড্রেনেজ ও নর্দমা" },
                        { id: "certificates", name_en: "Certificates Office", name_bn: "শংসাপত্র (Birth/Death)" },
                        { id: "pension", name_en: "Pension & Benefits", name_bn: "পেনশন ও সরকারি ভাতা" },
                      ].map((cat) => {
                        const isSel = selectedCategory === cat.id;
                        return (
                          <button
                            id={`cat_card_${cat.id}`}
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between gap-4 cursor-pointer hover:shadow-md ${
                              isSel
                                ? "border-blue-700 bg-blue-50/50 ring-1 ring-blue-600"
                                : "border-slate-200 bg-slate-50/20 hover:bg-slate-50"
                            }`}
                          >
                            <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200 text-slate-800 w-fit">
                              {getCategoryIcon(cat.id)}
                            </div>
                            <div>
                              <p className="font-extrabold text-slate-900 text-xs font-mono">{cat.name_en}</p>
                              <p className="text-[10px] text-slate-500">{cat.name_bn}</p>
                            </div>
                            
                            {isSel && (
                              <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-0.5">
                                <Check className="h-2.5 w-2.5" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        id="step2_back_btn"
                        onClick={() => setCurrentStep(1)}
                        className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-extrabold px-5 py-2.5 rounded-lg text-sm flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {strings.btnBack}
                      </button>
                      
                      <button
                        id="step2_next_btn"
                        onClick={() => setCurrentStep(3)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded-lg text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        {strings.btnNext}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: GRIEVANCE DETAIL AND DRAFT TYPE */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-black font-mono flex items-center gap-2 border-b border-slate-100 pb-3">
                      <FileText className="h-5 w-5 text-orange-500" />
                      {strings.stepDetails}
                    </h2>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-700 flex justify-between items-center">
                        <span>{strings.issueDescLabel}</span>
                        <span className="text-rose-500 text-[10px] font-bold">{strings.minChars}</span>
                      </label>
                      <textarea
                        id="issue_description_textarea"
                        rows={5}
                        value={problemDescription}
                        onChange={(e) => setProblemDescription(e.target.value)}
                        placeholder={strings.issueDescPlaceholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm shadow-inner focus:ring-1 focus:ring-blue-500 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Duration */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                          {strings.durationLabel}
                        </label>
                        <select
                          id="duration_select"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-extrabold shadow-xs cursor-pointer"
                        >
                          <option value="Less than 24 hours">{strings.durationOption1}</option>
                          <option value="1-3 days">{strings.durationOption2}</option>
                          <option value="3-7 days">{strings.durationOption3}</option>
                          <option value="1-4 weeks">{strings.durationOption4}</option>
                          <option value="More than a month">{strings.durationOption5}</option>
                        </select>
                      </div>

                      {/* Previous complaint Ref ID */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-wider">
                          {strings.prevComplaintLabel}
                        </label>
                        <input
                          id="previous_ref_input"
                          type="text"
                          value={prevRef}
                          onChange={(e) => setPrevRef(e.target.value)}
                          placeholder={strings.prevComplaintPlaceholder}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold shadow-xs uppercase tracking-wider"
                        />
                      </div>
                    </div>

                    {/* Draft compilation targets */}
                    <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-150">
                      <label className="text-xs font-black uppercase text-slate-600 tracking-wider block">
                        {strings.docTypeLabel}
                      </label>
                      
                      <div className="space-y-2">
                        {[
                          { id: "both", label: strings.docBoth, desc: strings.bothDocDesc },
                          { id: "complaint", label: strings.docComplaint, desc: strings.complaintDocDesc },
                          { id: "rti", label: strings.docRti, desc: strings.rtiDocDesc },
                        ].map((dt) => {
                          const isSel = docType === dt.id;
                          return (
                            <label
                              key={dt.id}
                              className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${
                                isSel
                                  ? "border-blue-600 bg-white shadow-xs"
                                  : "border-transparent bg-transparent hover:bg-slate-200/50"
                              }`}
                            >
                              <input
                                id={`doc_radio_${dt.id}`}
                                type="radio"
                                name="draft_type"
                                checked={isSel}
                                onChange={() => setDocType(dt.id as any)}
                                className="mt-1 text-blue-600"
                              />
                              <div>
                                <span className="text-xs font-extrabold text-slate-900 block font-mono">{dt.label}</span>
                                <span className="text-[10px] text-slate-500 font-medium">{dt.desc}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                      <button
                        id="step3_back_btn"
                        onClick={() => setCurrentStep(2)}
                        className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-extrabold px-5 py-2.5 rounded-lg text-sm flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {strings.btnBack}
                      </button>
                      
                      <button
                        id="step3_generate_btn"
                        disabled={problemDescription.trim().length < 15 || loading}
                        onClick={handleGenerateDocument}
                        className={`font-black px-6 py-2.5 rounded-lg text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
                          problemDescription.trim().length >= 15 && !loading
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        {loading ? strings.btnGenerating : strings.btnGenerate}
                        {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: OUTPUT RESULTS DISPLAY */}
                {currentStep === 4 && generatedResult && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
                      <div>
                        <h2 className="text-xl font-black font-display text-slate-900 tracking-tight">
                          {strings.outputHeading}
                        </h2>
                        <p className="text-xs text-slate-500 font-medium leading-normal mt-0.5">
                          {strings.outputSub}
                        </p>
                      </div>
                      <button
                        id="step4_back_btn"
                        onClick={() => setCurrentStep(3)}
                        className="text-xs px-3.5 py-1 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg font-bold flex items-center gap-1.5 bg-white cursor-pointer transition-all hover:bg-slate-50"
                      >
                        <ArrowLeft className="h-3 w-3" />
                        {strings.changeDetails}
                      </button>
                    </div>

                    {/* Interactive Statutory Compliance Audit Banner */}
                    <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/70 to-emerald-50/70 border border-emerald-150 p-5 rounded-2xl flex flex-col md:flex-row items-center md:items-start justify-between gap-5 shadow-sm animate-fade-in">
                      <div className="flex gap-4 items-start w-full">
                        <div className="bg-emerald-600 text-white rounded-xl p-2.5 shadow-md shrink-0">
                          <Award className="h-6 w-6" />
                        </div>
                        <div className="space-y-1 select-none">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display font-black text-slate-900 text-sm">
                              {strings.statutoryBannerTitle}
                            </h3>
                            <span className="text-[10px] bg-emerald-100 text-emerald-950 font-black tracking-wider uppercase px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200">
                              <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />
                              {getComplianceBadge()}
                            </span>
                          </div>
                          <p className="text-slate-600 font-sans text-xs mt-1.5 leading-relaxed">
                            {strings.statutoryBannerDesc.replace("{state}", selectedState)}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                            <span className="flex items-center gap-1">
                              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              {strings.charterCompliantLabel}
                            </span>
                            <span className="text-slate-300 hidden sm:inline">•</span>
                            <span className="flex items-center gap-1">
                              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              {strings.statutesCitationLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dynamic Score Gauge */}
                      <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-28 text-center bg-white p-3 rounded-xl border border-emerald-100 md:self-stretch shadow-xs">
                        <span className="text-3xl font-black font-display text-emerald-800">
                          {getComplianceScore()}%
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 font-extrabold uppercase mt-0.5 tracking-wider">
                          {strings.trustIndexLabel}
                        </span>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-1.5 rounded-full transition-all duration-1000"
                            style={{ width: `${getComplianceScore()}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Output Tabs Switcher */}
                    <div className="flex bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200">
                      {(docType === "complaint" || docType === "both") && (
                        <button
                          id="btn_subtab_complaint"
                          onClick={() => {
                            setActiveDocSubTab("complaint");
                            setIsEditingDraft(false);
                          }}
                          className={`flex-1 py-2 text-xs font-bold font-mono transition-all rounded-md cursor-pointer ${
                            activeDocSubTab === "complaint" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {strings.tabDocComplaint}
                        </button>
                      )}
                      
                      {(docType === "rti" || docType === "both") && (
                        <button
                          id="btn_subtab_rti"
                          onClick={() => {
                            setActiveDocSubTab("rti");
                            setIsEditingDraft(false);
                          }}
                          className={`flex-1 py-2 text-xs font-bold font-mono transition-all rounded-md cursor-pointer ${
                            activeDocSubTab === "rti" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {strings.tabDocRti}
                        </button>
                      )}

                      <button
                        id="btn_subtab_summary"
                        onClick={() => {
                          setActiveDocSubTab("summary");
                          setIsEditingDraft(false);
                        }}
                        className={`flex-1 py-2 text-xs font-bold font-mono transition-all rounded-md cursor-pointer ${
                          activeDocSubTab === "summary" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {strings.tabDocSummary}
                      </button>
                    </div>

                    {/* Active Output Document Area */}
                    <div className="relative border border-slate-200 rounded-2xl bg-slate-950 p-6 shadow-xl text-amber-50 font-mono text-xs overflow-hidden leading-relaxed">
                      
                      {/* Copy, Download, Edit & Print Floating Actions bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800 bg-slate-950">
                        {/* Status Label */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 rounded border border-slate-800 text-[10px]">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-slate-400 font-extrabold uppercase tracking-wide">
                            {isEditingDraft ? strings.sandboxActiveLabel : strings.draftLockedLabel}
                          </span>
                        </div>

                        {/* Actions group */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            id="btn_edit_toggle_draft"
                            onClick={() => setIsEditingDraft(!isEditingDraft)}
                            className={`${
                              isEditingDraft ? "bg-amber-600 text-white" : "bg-slate-850 hover:bg-slate-705 text-slate-205"
                            } px-3 py-1.5 rounded text-[10px] font-extrabold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer`}
                          >
                            <FileText className="h-3 w-3 text-indigo-400" />
                            {isEditingDraft ? strings.btnFinishEditing : strings.btnEditDraft}
                          </button>

                          <button
                            id="btn_copy_document"
                            onClick={() => {
                              const curText = activeDocSubTab === "complaint" ? editableComplaint : activeDocSubTab === "rti" ? editableRti : editableSummary;
                              copyTextToClipboard(curText);
                            }}
                            className={`${
                              copiedStatus ? "bg-emerald-600 text-white" : "bg-slate-850 hover:bg-slate-705 text-slate-205"
                            } px-3 py-1.5 rounded text-[10px] font-extrabold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer`}
                          >
                            {copiedStatus ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copiedStatus ? strings.btnCopied : strings.btnCopy}
                          </button>

                          <button
                            id="btn_download_document"
                            onClick={() => {
                              const curText = activeDocSubTab === "complaint" ? editableComplaint : activeDocSubTab === "rti" ? editableRti : editableSummary;
                              const title = activeDocSubTab === "complaint" ? "Complaint Letter" : activeDocSubTab === "rti" ? "RTI Application" : "Citizen Advisory";
                              downloadTextFile(title, curText);
                            }}
                            className={`${
                              downloadStatus ? "bg-emerald-600 text-white" : "bg-slate-850 hover:bg-slate-705 text-slate-205"
                            } px-3 py-1.5 rounded text-[10px] font-extrabold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer`}
                          >
                            {downloadStatus ? <CheckCircle className="h-3 w-3" /> : <Download className="h-3 w-3" />}
                            {downloadStatus ? strings.btnDownloaded : strings.btnDownload}
                          </button>

                          <button
                            id="btn_print_draft"
                            onClick={() => {
                              window.print();
                            }}
                            className="bg-slate-850 hover:bg-slate-700 text-slate-202 px-3 py-1.5 rounded text-[10px] font-extrabold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer border border-slate-800"
                          >
                            <Printer className="h-3 w-3 text-amber-400 animate-pulse" />
                            {strings.btnPrintPetition}
                          </button>
                        </div>
                      </div>

                      {/* Content representation */}
                      {isEditingDraft ? (
                        <textarea
                          id="editable_draft_textarea"
                          value={
                            activeDocSubTab === "complaint"
                              ? editableComplaint
                              : activeDocSubTab === "rti"
                              ? editableRti
                              : editableSummary
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            if (activeDocSubTab === "complaint") setEditableComplaint(val);
                            else if (activeDocSubTab === "rti") setEditableRti(val);
                            else setEditableSummary(val);
                          }}
                          className="w-full min-h-[380px] bg-slate-900 border-none text-amber-50 font-mono text-xs p-4 focus:ring-1 focus:ring-amber-500/40 rounded-xl leading-relaxed resize-y focus:outline-none"
                          placeholder="Type changes directly to customized letter placeholders before printing..."
                        />
                      ) : (
                        <div className="whitespace-pre-wrap max-h-[480px] overflow-y-auto pr-2 leading-relaxed text-amber-50 select-text font-mono">
                          {activeDocSubTab === "complaint" && editableComplaint}
                          {activeDocSubTab === "rti" && editableRti}
                          {activeDocSubTab === "summary" && editableSummary}
                        </div>
                      )}
                    </div>

                    {/* Department metadata card */}
                    {generatedResult.department && (
                      <div className="p-5 bg-slate-100 rounded-xl border border-slate-250 font-mono text-xs space-y-3">
                        <span className="text-slate-400 font-extrabold block text-[10px] uppercase tracking-wider">
                          {strings.nodalOfficeTargets}
                        </span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-slate-500 block font-sans">{strings.expectedRes}</span>
                            <span className="text-indigo-900 font-black flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {generatedResult.department.expectedResolutionDays} {strings.daysGuaranteeSLA}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-slate-500 block font-sans">{strings.helplinePhone}</span>
                            <span className="text-emerald-800 font-black flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5 text-emerald-600" />
                              {generatedResult.department.helpline}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-200 text-slate-700 font-mono text-xs">
                          <p className="font-extrabold block">{lang === "bn" ? generatedResult.department.departmentName_bn : generatedResult.department.departmentName}</p>
                          <p className="text-slate-500 mt-1 leading-normal">{lang === "bn" ? generatedResult.department.address_bn : generatedResult.department.address}</p>
                        </div>

                        <div className="pt-2">
                          <a
                            id="portal_link_anchor"
                            href={generatedResult.department.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-slate-50 border border-slate-350 px-4 py-2 rounded font-bold text-slate-800 inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                          >
                            <ExternalLink className="h-3.5 w-3.5 text-indigo-700" />
                            {strings.portalLink}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Interactive Post-Draft Filing Milestones Checklist */}
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="h-5 w-5 text-indigo-600 shrink-0" />
                          <h3 className="font-display font-black text-slate-950 text-sm">
                            {strings.milestonesTitle}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-750 bg-indigo-50 px-2 py-0.5 rounded font-extrabold border border-indigo-100 select-none">
                          {lang === 'en' ? `${checklistItems.filter(i => i.done).length} of ${checklistItems.length} Complete` : `${checklistItems.length} টির মধ্যে ${checklistItems.filter(i => i.done).length} টি সম্পূর্ণ হয়েছে`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium leading-normal -mt-1.5">
                        {strings.milestonesSubtitle}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                        {checklistItems.map((item, index) => {
                          return (
                            <label
                              key={item.id}
                              className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                item.done ? "border-emerald-200 bg-emerald-50/15 shadow-xs" : "border-slate-150 bg-slate-50/50 hover:bg-slate-50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={item.done}
                                onChange={() => {
                                  setChecklistItems(prev =>
                                    prev.map(i => (i.id === item.id ? { ...i, done: !i.done } : i))
                                  );
                                }}
                                className="mt-1 h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/30 accent-indigo-600 cursor-pointer shrink-0"
                              />
                              <div className="flex-1 select-none">
                                <p className={`text-xs leading-normal ${item.done ? "text-slate-400 line-through font-medium" : "text-slate-800 font-bold"}`}>
                                  {lang === "en" ? item.text_en : item.text_bn}
                                </p>
                                <p className="text-[8px] text-slate-400 mt-1 uppercase tracking-wider font-mono">
                                  {strings.milestoneLabelText} 0{index + 1}
                                </p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Standalone hidden print container targeted by @media print */}
                    <div id="printable_legal_document_container" className="hidden whitespace-pre-wrap font-serif leading-relaxed text-slate-900 bg-white">
                      {activeDocSubTab === "complaint" ? editableComplaint : activeDocSubTab === "rti" ? editableRti : editableSummary}
                    </div>

                    {/* Citations panel */}
                    {generatedResult.sources && generatedResult.sources.length > 0 && (
                      <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-150 space-y-3">
                        <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" />
                          {strings.groundingHeader}
                        </h4>
                        <p className="text-emerald-900 text-xs leading-normal">
                          {strings.groundingAlert}
                        </p>
                        
                        <div className="space-y-2 pt-1.5">
                          {generatedResult.sources.map((source, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg border border-emerald-100 font-mono text-[10px] text-slate-700">
                              <p className="font-black text-slate-900 flex justify-between">
                                <span>{index + 1}. {lang === "bn" ? (source.source_bn || source.source) : source.source}</span>
                                <span className="text-indigo-700">{lang === "bn" ? (source.clause_bn || source.clause) : source.clause}</span>
                              </p>
                              <p className="text-slate-500 mt-1 italic leading-relaxed">
                                &quot;{lang === "bn" ? (source.content_bn || source.content) : source.content}&quot;
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reset Button */}
                    <div className="pt-4 flex justify-between">
                      <button
                        id="btn_back_to_form"
                        onClick={() => setCurrentStep(3)}
                        className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-extrabold px-5 py-2.5 rounded-lg text-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {strings.modifyTextInputs}
                      </button>

                      <button
                        id="workspace_reset_final_btn"
                        onClick={() => {
                          setCurrentStep(1);
                          setProblemDescription("");
                          setPrevRef("");
                          setGeneratedResult(null);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded-lg text-sm transition-all cursor-pointer shadow-xs"
                      >
                        {strings.btnReset}
                      </button>
                    </div>

                  </div>
                )}

              </div>
              
            </div>

            {/* Right Column / Sidebar Info Area (Predefined Cases & SLA benchmarks) */}
            <div className="space-y-6">

              {/* DEMO CASE STUDIES PANEL */}
              <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-950 p-6 rounded-2xl border border-indigo-850 text-white shadow-lg space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-1.5 bg-orange-500 rounded text-[10px] font-black font-mono">
                    DEMO
                  </span>
                  <h3 className="text-base font-black font-mono tracking-tight text-amber-50">
                    {strings.demoScenariosTitle}
                  </h3>
                </div>
                <p className="text-indigo-200 text-xs leading-normal">
                  {strings.demoScenariosSub}
                </p>

                <div className="space-y-3 pt-2">
                  <button
                    id="demo_scenario_1_btn"
                    onClick={() => applyDemoScenario(1)}
                    className="w-full text-left bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 hover:border-slate-500 group"
                  >
                    <div className="bg-slate-800 p-2 rounded-lg text-blue-400 shrink-0">
                      <Droplet className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-black font-mono text-amber-100 group-hover:text-amber-50">{strings.demo1Title}</p>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">{strings.demo1Desc}</p>
                    </div>
                  </button>

                  <button
                    id="demo_scenario_2_btn"
                    onClick={() => applyDemoScenario(2)}
                    className="w-full text-left bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 hover:border-slate-500 group"
                  >
                    <div className="bg-slate-800 p-2 rounded-lg text-rose-400 shrink-0">
                      <Coins className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-black font-mono text-amber-100 group-hover:text-amber-50">{strings.demo2Title}</p>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">{strings.demo2Desc}</p>
                    </div>
                  </button>

                  <button
                    id="demo_scenario_3_btn"
                    onClick={() => applyDemoScenario(3)}
                    className="w-full text-left bg-slate-950 hover:bg-slate-900 border border-slate-800 p-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 hover:border-slate-500 group"
                  >
                    <div className="bg-slate-800 p-2 rounded-lg text-emerald-400 shrink-0">
                      <Milestone className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-xs font-black font-mono text-amber-100 group-hover:text-amber-50">{strings.demo3Title}</p>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">{strings.demo3Desc}</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* REAL-TIME PRE-RETRIEVAL CONTEXT RAG GRAPH PREVIEW */}
              {problemDescription.length >= 8 && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3.5 shadow-sm animate-fade-in">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
                    </span>
                    <span className="text-slate-500 font-extrabold block text-[10px] uppercase tracking-wider font-mono">
                      {strings.databaseCheckTitle}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans mt-0.5">
                    {strings.databaseCheckDesc}
                  </p>

                  <div className="space-y-2 pt-1">
                    {manualRAGChunks.length > 0 ? (
                      manualRAGChunks.map((chunk, i) => (
                        <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-mono font-medium">
                          <div className="flex justify-between font-bold text-slate-800 gap-2">
                            <span className="truncate max-w-[170px]">{lang === "bn" ? chunk.source_bn : chunk.source}</span>
                            <span className="text-emerald-700 bg-emerald-50 px-1.5 rounded shrink-0">{lang === "bn" ? chunk.clause_bn : chunk.clause}</span>
                          </div>
                          <p className="text-slate-500 mt-1.5 select-all leading-normal text-[9px] italic border-l-2 border-slate-300 pl-2">
                            &quot;{(lang === "bn" ? chunk.content_bn : chunk.content).slice(0, 115)}...&quot;
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-400 text-[10px]">
                        {strings.scanningMatchedRules}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GENERAL CITIZEN CORNUCOPIA INFO INDEX */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <span className="text-slate-400 font-extrabold block text-[10px] uppercase tracking-wider font-mono border-b border-slate-100 pb-2">
                  {strings.municipalSlaTitle}
                </span>
                
                <p className="text-[11px] text-slate-600 leading-normal">
                  {strings.municipalSlaDesc}
                </p>

                <div className="space-y-3 font-mono text-[10px]">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">{lang === "en" ? "KMC Water Supply" : "কেএমসি জল সরবরাহ"}</span>
                    <span className="font-extrabold text-blue-800 bg-blue-50 px-1 rounded">24 Hours</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">{lang === "en" ? "WBSEDCL Urban Outage" : "বিদ্যুৎ বিভ্রাট (শহরে)"}</span>
                    <span className="font-extrabold text-blue-800 bg-blue-50 px-1 rounded">4 Hours</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">{lang === "en" ? "Sewer Block Removal" : "নর্দমা সংস্কার ও নিষ্কাশন"}</span>
                    <span className="font-extrabold text-blue-800 bg-blue-50 px-1 rounded">48 Hours</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">{lang === "en" ? "Birth Certificate Issue" : "জন্ম শংসাপত্র প্রদান"}</span>
                    <span className="font-extrabold text-blue-800 bg-blue-50 px-1 rounded">7 Days</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">{lang === "en" ? "RTI Application Reply" : "আরটিআই উত্তর প্রদান"}</span>
                    <span className="font-extrabold text-red-800 bg-red-50 px-1 rounded">{lang === "en" ? "30 Days (Mandated)" : "৩০ দিন (বাধ্যতামূলক)"}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Dynamic Rights Directory Module */}
        {activeTab === "rights" && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-black font-mono text-slate-950 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-orange-500" />
                {strings.rightsHeader}
              </h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                {strings.rightsSub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {SAMPLE_RIGHTS_RECORDS.map((record, k) => {
                const tag = lang === "en" ? record.tag_en : record.tag_bn;
                const time = lang === "en" ? record.time_en : record.time_bn;
                const title = lang === "en" ? record.title_en : record.title_bn;
                const law = lang === "en" ? record.law_en : record.law_bn;
                const desc = lang === "en" ? record.desc_en : record.desc_bn;

                return (
                  <div key={k} className="p-5 rounded-xl border border-slate-200 bg-slate-50/55 hover:bg-slate-50 hover:shadow-sm transition-all relative">
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-900 rounded-sm text-[9px] font-black uppercase tracking-wider font-mono">
                        {tag}
                      </span>
                      <span className="text-rose-700 font-extrabold font-mono text-[10px] bg-rose-50 px-2 rounded-sm">
                        {time}
                      </span>
                    </div>

                    <h3 className="font-black font-mono text-slate-900 text-sm mb-1">{title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold mb-2.5">{law}</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{desc}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 bg-orange-50 text-orange-950 rounded-xl border border-orange-200 text-xs flex gap-3 leading-normal">
              <AlertTriangle className="h-5.5 w-5.5 text-orange-600 shrink-0" />
              <div>
                <span className="font-extrabold block">{strings.bplWaiverTitle}</span>
                <p className="mt-1 text-slate-700">
                  {strings.bplWaiverDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Directory & Helplines Module */}
        {activeTab === "helplines" && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black font-mono text-slate-950 flex items-center gap-2">
                  <Phone className="h-6 w-6 text-orange-500" />
                  {strings.tabHelplines}
                </h2>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                  Access primary municipal, district and welfare contacts directly mapped across the corpus.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              {[
                { org: "Kolkata Corporation (KMC)", number: "1800-103-4444", purpose: "Civic grievances", area: "Kolkata, WB" },
                { org: "WBSEDCL Support Desk", number: "19121", purpose: "Power disruptions & billing safety", area: "State-wide, WB" },
                { org: "West Bengal Dept of Health", number: "1800-3134-44222", purpose: "Birth certification & Swasthya Smart Card", area: "State-wide, WB" },
                { org: "Howrah Municipal Corp (HMC)", number: "1800-345-5555", purpose: "Sanitation and water supply", area: "Howrah, WB" },
                { org: "National Social Assistance Office", number: "1800-11-1555", purpose: "Social pensions audit", area: "National / Delhi" },
                { org: "Jal Jeevan Drinking Water Desk", number: "1800-180-3535", purpose: "State-wide water lines pipeline works", area: "National / General" },
              ].map((h, index) => (
                <div key={index} className="p-4 bg-slate-50/40 rounded-xl border border-slate-200 relative overflow-hidden">
                  <span className="absolute top-0 right-0 h-1 bg-blue-600 w-12 rounded-bl-sm"></span>
                  <p className="font-extrabold text-slate-900 border-b border-slate-100 pb-1 w-fit max-w-full text-xs">{h.org}</p>
                  <p className="text-slate-400 text-[9px] uppercase tracking-wider font-bold mt-1.5">{h.area} • {h.purpose}</p>
                  <p className="text-slate-800 font-black text-xs pt-3 flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-blue-600" />
                    {h.number}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer Branding Unit */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-400 font-mono">
          <p>© 2026 NagrikSeva Platform. Grounded RAG Citizen Interface.</p>
          <p>Built for Digital India & Municipal Transparency Sandbox • Maheshtala, West Bengal</p>
        </div>
      </footer>

    </div>
  );
}
