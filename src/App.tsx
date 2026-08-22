/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
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
  Building2,
  Landmark,
  FileCheck,
  PhoneCall,
  CheckSquare,
  Edit3,
  Stethoscope,
  Users,
  Mic,
  MicOff,
  Navigation,
  User,
  History,
  Save,
  X,
  Share2,
} from "lucide-react";

export type LanguageCode = "en" | "bn" | "hi" | "mr";

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
  wardVillage: string;
  district: string;
  state: string;
  pincode: string;
  isBpl: boolean;
  bplNumber: string;
}

interface SavedComplaint {
  id: string;
  date: string;
  category: string;
  state: string;
  district: string;
  description: string;
  complaintText: string;
  rtiText: string;
  summaryText: string;
}

const UI_TRANSLATIONS = {
  en: {
    brandName: "NagrikSeva",
    brandSubtitle: "Citizen Grievance & RTI Portal",
    nationalBadge: "National Citizen Support Initiative",
    tagline: "Assisting citizens with curated, legally grounded drafts of official complaints and Right to Information (RTI) applications.",
    taglineSub: "Built on official State Citizen Charters and active statutes. Transparent, direct, and free of charge.",
    tabCreate: "Draft Grievance & RTI",
    tabRights: "Know Your Rights",
    tabHelplines: "Helplines & Directory",
    tabMyComplaints: "My Saved Drafts",

    // Intake Stepper
    stepLocation: "1. Region & Authority",
    stepCategory: "2. Civic Department",
    stepDetails: "3. Grievance Context",
    stepReview: "4. Compiled Document",

    detectLocation: "Detect My Location",
    detectingLocation: "Locating your municipality...",
    locationDetected: "Location Detected",
    selectState: "Select State or Union Territory",
    selectDistrict: "Select Municipal Corporation / District",
    selectCategory: "Choose Issue Department Category",
    issueDescLabel: "Describe your problem in detail (Speak or write in any language)",
    issueDescPlaceholder: "Describe your issue. E.g., 'Severe water logging has persisted in our ward for 4 days, with drainage overflow rendering access roads impassable...'",
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
    btnStartOver: "Start Over",

    // Voice mic
    micStart: "Click to speak your problem",
    micListening: "Listening... Speak your problem clearly",
    micStop: "Stop Voice Recording",
    micNotSupported: "Voice recognition is not supported in this browser.",

    // User Profile
    profileTitle: "Citizen Profile & Auto-Fill",
    profileSubtitle: "Save your details once. We will automatically fill your name, address, and date in every complaint letter and RTI petition.",
    myAccountBtn: "My Profile",
    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    emailOptional: "Email Address (Optional)",
    fullAddress: "Street Address / House No.",
    wardVillage: "Ward No. / Village / Gram Panchayat",
    pincode: "PIN Code",
    bplQuestion: "Are you a BPL (Below Poverty Line) card holder?",
    bplCardNo: "BPL Card Number",
    saveProfileBtn: "Save Profile",
    profileSavedNotice: "Profile saved! Letters will be automatically filled with your details.",

    // Output screen
    outputHeading: "Official Papers Drafted Successfully",
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
    demo1Desc: "A 3-day dry tap emergency in municipal ward causing critical civic distress.",
    demo2Title: "Case Study B: Welfare Pension Delay",
    demo2Desc: "Elderly social security allowance not disbursed for 2 cycles.",
    demo3Title: "Case Study C: Ward Development Audit",
    demo3Desc: "Filing a public RTI enquiry on fund utilization for ward road repairs.",

    // Rights section
    rightsHeader: "Familiarize With Your Statutory Rights (RTI Section 6 & Citizen Charters)",

    sandboxLabel: "NAGRIK SEVA ASSISTANCE PROTOCOL",
    orOtherStateModel: "National / Other State Model",
    stateSelectSubtext: "* Mapped with official West Bengal (KMC, Siliguri) & Maharashtra (BMC, PMC, MSEDCL) municipal charters.",
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
    statutoryBannerDesc: "This partition matches official Government Citizen Charters and public service guidelines of {state}. Relevant regulatory provisions and official address lines are aligned automatically.",
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
    municipalSlaTitle: "Municipal Legal SLA Targets",
    municipalSlaDesc: "Guaranteed processing timelines under state Right to Public Services acts:",
    rightsSub: "A regional statutory compilation compiled by Civil Liberties and Digital India public documentation.",
    bplWaiverTitle: "BPL Category Fees Waiver Note",
    bplWaiverDesc: "Are you holding a BPL (Below Poverty Line) card? You are completely exempted from paying any fee of Rupees 10 during the draft submittal. Be sure to reference your BPL card number.",
    helplinesSub: "Access primary municipal, district and welfare contacts directly mapped across the corpus.",
    footerText1: "© 2026 NagrikSeva Platform. Dedicated Citizen Assistance and Charter Reference Portal.",
    footerText2: "Built for Digital India & Municipal Transparency Initiative • Multi-State Service",
    modifyTextInputs: "Modify text inputs",
    failedGenTitle: "Unable to Generate Petition"
  },

  bn: {
    brandName: "নাগরিকসেবা",
    brandSubtitle: "নাগরিক অভাব-অভিযোগ ও আরটিআই সহায়তা সেল",
    nationalBadge: "জাতীয় নাগরিক সহায়তা সেল",
    tagline: "পৌরসংস্থা বা পৌরসভার নাগরিক অভাব-অভিযোগ ও তথ্য জানার অধিকার (আরটিআই) আইনের সঠিক খসড়া আবেদনপত্র প্রস্তুত করার নির্ভরযোগ্য পোর্টাল।",
    taglineSub: "সরকারি সিটিজেন চার্টার এবং তথ্য জানার অধিকার আইন ২০০৫-এর নিয়মানুযায়ী পরিচালিত। সম্পূর্ণ নিখরচায় ও স্বচ্ছভাবে চালিত নাগরিক উদ্যোগ।",
    tabCreate: "অভিযোগপত্র ও আরটিআই খসড়া",
    tabRights: "নাগরিক অধিকার নির্দেশিকা",
    tabHelplines: "পৌর ডিরেক্টরি ও হেল্পলাইন",
    tabMyComplaints: "আমার সংরক্ষিত খসড়া",

    // Intake Stepper
    stepLocation: "১. অঞ্চল ও সংশ্লিষ্ট পৌর বিভাগ",
    stepCategory: "২. নাগরিক পরিষেবার ক্যাটাগরি",
    stepDetails: "৩. অভাব-অভিযোগের বিবরণ",
    stepReview: "৪. প্রস্তুতকৃত খসড়া পত্র",

    detectLocation: "আমার অবস্থান শনাক্ত করুন (GPS)",
    detectingLocation: "পৌর এলাকা খোঁজা হচ্ছে...",
    locationDetected: "অবস্থান শনাক্ত হয়েছে",
    selectState: "রাজ্য বা কেন্দ্রশাসিত অঞ্চল নির্বাচন করুন",
    selectDistrict: "পৌরসভা বা পৌরনিগম অঞ্চল নির্বাচন করুন",
    selectCategory: "পরিষেবা প্রদানকারী পৌর বিভাগ নির্বাচন করুন",
    issueDescLabel: "আপনার সমস্যার বিবরণ দিন (মুখে বলুন বা যেকোনো ভাষায় লিখুন)",
    issueDescPlaceholder: "সমস্যার ইতিহাস এবং বিবরণ দিন। যেমন- 'আমাদের ওয়ার্ডে ৪ দিন ধরে পানীয় জলের তীব্র সংকট চলছে এবং ড্রেন উপচে রাস্তা জলমগ্ন হয়ে পড়েছে...'",
    durationLabel: "সমস্যাটি কতদিন ধরে সমাধানহীন অবস্থায় রয়েছে?",
    prevComplaintLabel: "পূর্বে কোনো অভিযোগ দায়ের করা হয়েছিল? (ঐচ্ছিক)",
    prevComplaintPlaceholder: "যেমন: KMC-2026-WTR-828A",
    docTypeLabel: "কোন ধরণের আবেদনপত্র প্রস্তুত করতে চান?",
    docBoth: "অভিযোগপত্র এবং আরটিআই আবেদনপত্র দুই-ই প্রস্তুত করুন",
    docComplaint: "পৌর দপ্তরে জমা দেওয়ার সাধারণ অভিযোগপত্র",
    docRti: "তথ্য জানার অধিকার আইনের ধারা ৬ অনুযায়ী আরটিআই আবেদনপত্র",

    // Help and tips
    knowYourRightsHelp: "আইনসম্মত কার্যপ্রণালী ও সময়ের বাধ্যবাধকতা",
    knowYourRightsText: "এই ব্যবস্থাটি সরাসরি সরকারি সিটিজেন চার্টার এবং তথ্য জানার অধিকার আইনের নিয়মাবলী মিলিয়ে একটি আইনসম্মত খসড়া আবেদনপত্র প্রস্তুত করবে।",

    // Action buttons
    btnNext: "পরবর্তী ধাপে যান",
    btnBack: "পূর্ববর্তী ধাপে যান",
    btnGenerate: "আইনি খসড়া নথি তৈরি করুন",
    btnGenerating: "বিভাগীয় নিয়মাবলী বিশ্লেষণ করা হচ্ছে... নথি খসড়া হচ্ছে...",
    btnReset: "নতুন করে শুরু করুন",
    btnStartOver: "নতুন করে শুরু",

    // Voice mic
    micStart: "মুখে সমস্যা বলতে মাইকে ক্লিক করুন",
    micListening: "শুনছি... আপনার সমস্যার কথা স্পষ্ট করে বলুন",
    micStop: "রেকর্ডিং বন্ধ করুন",
    micNotSupported: "এই ব্রাউজারে ভয়েস সাপোর্ট নেই।",

    // User Profile
    profileTitle: "নাগরিক তথ্য ও অটো-ফিল প্রোফাইল",
    profileSubtitle: "একবার আপনার নাম ও ঠিকানা সেভ করুন। প্রতিটি অভিযোগপত্র ও আরটিআই আবেদনে আপনার বিবরণী স্বয়ংক্রিয়ভাবে বসে যাবে।",
    myAccountBtn: "আমার প্রোফাইল",
    fullName: "সম্পূর্ণ নাম",
    mobileNumber: "মোবাইল নম্বর",
    emailOptional: "ইমেল ঠিকানা (ঐচ্ছিক)",
    fullAddress: "স্থায়ী ঠিকানা / বাড়ির নম্বর",
    wardVillage: "ওয়ার্ড নং / গ্রাম পঞ্চায়েত",
    pincode: "পিন কোড (PIN)",
    bplQuestion: "আপনার কি বিপিএল (BPL) কার্ড রয়েছে?",
    bplCardNo: "বিপিএল কার্ড নম্বর",
    saveProfileBtn: "প্রোফাইল সেভ করুন",
    profileSavedNotice: "প্রোফাইল সেভ হয়েছে! চিঠিতে আপনার নাম-ঠিকানা স্বয়ংক্রিয়ভাবে যুক্ত হবে।",

    // Output screen
    outputHeading: "খসড়া আইনি নথি সফলভাবে প্রস্তুত করা হয়েছে",
    outputSub: "নিচের নথিগুলো ভালোভাবে পড়ে নিন। আপনি এগুলো কপি অথবা ডাউনলোড করে সংশ্লিষ্ট দপ্তরে জমা দিতে পারেন।",
    tabDocComplaint: "অভিযোগ পত্র (Complaint)",
    tabDocRti: "RTI আবেদনপত্র (Sec 6)",
    tabDocSummary: "নাগরিক নির্দেশিকা ও সারসংক্ষেপ",
    btnCopy: "কপি করুন",
    btnCopied: "কপি সম্পন্ন!",
    btnDownload: "ডাউনলোড করুন",
    btnDownloaded: "ডাউনলোড সম্পন্ন!",
    groundingHeader: "অফিসিয়াল নথির তথ্যসূত্র ও উদ্ধৃতিসমূহ",
    groundingAlert: "এই তথ্যসূত্রগুলো নির্দেশ করছে যে আপনার নথিতে উল্লিখিত নিয়মগুলো সম্পূর্ণ বাস্তব এবং আইনসম্মত:",
    expectedRes: "সমাধানের সময়সীমা (সিটিজেন চার্টার):",
    helplinePhone: "সরাসরি বিভাগীয় হেল্পলাইন নাম্বার:",
    portalLink: "অফিসিয়াল পোর্টাল লিংক:",

    // Canned scenarios
    demoScenariosTitle: "পূর্বনির্ধারিত উদাহরণসমূহ",
    demoScenariosSub: "ফর্মটি পরীক্ষা করার জন্য নিচের যেকোনো একটি উদাহরণে ক্লিক করলে তা বিভাগীয় তথ্যসহ স্বয়ংক্রিয়ভাবে পূরণ হয়ে যাবে।",
    demo1Title: "উদাহরণ ১: জল সরবরাহ সংকট",
    demo1Desc: "পৌর এলাকায় ৩ দিন ধরে পাইপের জল না পাওয়ার জন্য জরুরি অভিযোগ।",
    demo2Title: "উদাহরণ ২: পেনশন বিলম্ব",
    demo2Desc: "গত ২ মাসের পুরনো সামাজিক ভাতা আটকে থাকার জন্য আবেদন।",
    demo3Title: "উদাহরণ ৩: রাস্তা মেরামতের RTI",
    demo3Desc: "ওয়ার্ডে বরাদ্দকৃত রাস্তার উন্নয়ন তহবিলের হিসাব জানার জন্য RTI আবেদন।",

    // Rights section
    rightsHeader: "আপনার আইনি ক্ষমতাগুলি জেনে নিন (RTI ধারা ৬ ও সিটিজেন চার্টার)",

    sandboxLabel: "নাগরিক সেবা পোর্টাল সহকারী",
    orOtherStateModel: "জাতীয় / অন্যান্য রাজ্যের মডেল",
    stateSelectSubtext: "* এটি পশ্চিমবঙ্গ ও মহারাষ্ট্রের অফিসিয়াল পৌর সিটিজেন চার্টার ও সেবা অধিকার আইনের সাথে সংযুক্ত।",
    districtDesc: "এটি নোডাল বিভাগের ঠিকানা এবং আরটিআই (RTI) জন কর্তৃপক্ষের লক্ষ্য নির্ধারণ করে।",
    minChars: "ন্যূনতম ১৫ টি অক্ষর",
    durationOption1: "২৪ ঘণ্টার কম সময় ধরে",
    durationOption2: "১ থেকে ৩ দিন ধরে",
    durationOption3: "৩ থেকে ৭ দিন ধরে",
    durationOption4: "১ থেকে ৪ সপ্তাহ ধরে",
    durationOption5: "এক মাসেরও বেশি সময় ধরে (গুরুতর বিলম্বিত প্রতিক্রিয়া)",
    bothDocDesc: "প্রাথমিক নাগরিক অভিযোগ এবং আরটিআই (RTI) স্ট্যাটাস চাহিদা প্রস্তুত করুন।",
    complaintDocDesc: "পৌরসভার সাব-ডিভিশন ডেস্কের জন্য একটি আনুষ্ঠানিক আবেদনপত্র খসড়া করুন।",
    rtiDocDesc: "নথিপত্র অডিট করার জন্য তথ্য জানার অধিকার আইনের ধারা ৬ অনুযায়ী আবেদনপত্র খসড়া করুন।",
    changeDetails: "তথ্য পরিবর্তন করুন",
    statutoryBannerTitle: "সিটিজেন চার্টার এবং এসএলএ (SLA) সমন্বয়",
    statutoryBannerDesc: "এই খসড়াটি {state}-এর সরাসরি নির্দেশিত স্থানীয় পৌর চার্টার এবং জনসেবার অধিকার আইনের সাথে মিলিয়ে তৈরি করা হয়েছে।",
    charterCompliantLabel: "সিটিজেন চার্টার সম্মত",
    statutesCitationLabel: "আইনি ধারা সংযোজিত",
    trustIndexLabel: "ফর্ম বৈধতার সূচক",
    sandboxActiveLabel: "ইন্টারেক্টিভ সম্পাদনা সক্রিয় রয়েছে",
    draftLockedLabel: "ফরমাল পিটিশন পত্র প্রস্তুত",
    btnFinishEditing: "সম্পাদনা সম্পন্ন করুন",
    btnEditDraft: "খসড়াটি সম্পাদনা করুন",
    btnPrintPetition: "পিটিশন প্রিন্ট করুন",
    nodalOfficeTargets: "সংশ্লিষ্ট বিভাগীয় দপ্তরের ঠিকানা",
    daysGuaranteeSLA: "দিনের মধ্যে সমাধানের নিশ্চয়তা (SLA)",
    milestonesTitle: "অভিযোগ জমাদানের পরবর্তী গুরুত্বপূর্ণ ধাপসমূহ",
    milestonesSubtitle: "আপনার নাগরিক অধিকার প্রয়োগ করুন। আপনার প্রস্তুতকৃত খসড়া আবেদনপত্রটি আনুষ্ঠানিকভাবে জমা দেওয়ার জন্য নিচের ধাপসমূহ অনুসরণ করুন:",
    milestonesCompleteText: "টি শেষ হয়েছে (মোট {total} টির মধ্যে)",
    milestoneLabelText: "ধাপ",
    databaseCheckTitle: "সিটিজেন চার্টার ডাটাবেস অনুসন্ধান",
    databaseCheckDesc: "আপনার বিবরণী অনুযায়ী অফিসিয়াল আইন ও সিটিজেন চার্টার থেকে পাওয়া তথ্যসূত্রের মিল সূচক:",
    scanningMatchedRules: "আপনার বিবরণী অনুযায়ী সিটিজেন চার্টার স্ক্যান করা হচ্ছে...",
    municipalSlaTitle: "আইনি সমাধান সময়সীমা (SLA)",
    municipalSlaDesc: "জনসেবা অধিকার আইন অনুযায়ী নাগরিক পরিষেবাদির জন্য সুনির্দিষ্ট সময়সীমা নির্ধারিত আছে:",
    rightsSub: "নাগরিক অধিকার ও ডিজিটাল ইন্ডিয়া পাবলিক নথিপত্র থেকে সংগৃহীত একটি সংবিধিবদ্ধ সংকলন।",
    bplWaiverTitle: "বিপিএল (BPL) কার্ডধারীদের জন্য ফি মকুবের নিয়ম",
    bplWaiverDesc: "আপনার কি বিপিএল (BPL) কার্ড রয়েছে? তাহলে আবেদনপত্র জমা দেওয়ার ১০ টাকার ফি থেকে আপনি সম্পূর্ণ ছাড় পাবেন। আবেদনে আপনার বিপিএল কার্ড নম্বরটি উল্লেখ থাকবে।",
    helplinesSub: "আমাদের তথ্যভাণ্ডারের সাথে যুক্ত প্রধান পৌরসভা, জেলা এবং সমাজকল্যাণ দপ্তরের হেল্পলাইনসমূহ।",
    footerText1: "© ২০২৬ নাগরিকসেবা প্ল্যাটফর্ম। নাগরিক অভিযোগ ও তথ্য সহায়তা সেল।",
    footerText2: "ডিজিটাল ইন্ডিয়া এবং সরকারি স্বচ্ছতা উদ্যোগ • বহু-রাজ্য নাগরিক পোর্টাল",
    modifyTextInputs: "আবেদন তথ্য সংশোধন করুন",
    failedGenTitle: "পিটিশন খসড়া করা যায়নি"
  },

  hi: {
    brandName: "नागरिकसेवा",
    brandSubtitle: "नागरिक शिकायत एवं आरटीआई सहायता पोर्टल",
    nationalBadge: "राष्ट्रीय नागरिक सहायता पहल",
    tagline: "नगर निगम, जल, बिजली, सड़क एवं आरटीआई (RTI) से संबंधित कानूनी रूप से सशक्त औपचारिक आवेदन पत्र तैयार करने का पोर्टल।",
    taglineSub: "आधिकारिक राज्य नागरिक चार्टर एवं सूचना का अधिकार अधिनियम 2005 के अनुसार। पारदर्शी एवं पूर्णतः निःशुल्क।",
    tabCreate: "शिकायत व RTI तैयार करें",
    tabRights: "अपने अधिकार जानें",
    tabHelplines: "हेल्पलाइन एवं निर्देशिका",
    tabMyComplaints: "मेरे सहेजे गए पत्र",

    // Intake Stepper
    stepLocation: "1. क्षेत्र एवं नगर पालिका",
    stepCategory: "2. नागरिक सेवा विभाग",
    stepDetails: "3. समस्या का विवरण",
    stepReview: "4. तैयार आवेदन पत्र",

    detectLocation: "मेरी लोकेशन पता करें (GPS)",
    detectingLocation: "नगर पालिका का पता लगाया जा रहा है...",
    locationDetected: "लोकेशन सफलतापूर्वक पहचानी गई",
    selectState: "राज्य या केंद्र शासित प्रदेश चुनें",
    selectDistrict: "नगर निगम या जिला चुनें",
    selectCategory: "संबंधित विभाग की श्रेणी चुनें",
    issueDescLabel: "अपनी समस्या का विवरण दें (बोलकर बताएं या किसी भी भाषा में लिखें)",
    issueDescPlaceholder: "समस्या का विवरण लिखें। जैसे- 'हमारे वार्ड में पिछले 4 दिनों से नलों में गंदा पानी आ रहा है और सड़क पर जलभराव हो गया है...'",
    durationLabel: "यह समस्या कितने समय से बनी हुई है?",
    prevComplaintLabel: "क्या पहले कोई शिकायत दर्ज कराई गई थी? (ऐच्छिक)",
    prevComplaintPlaceholder: "उदा: KMC-2026-WTR-828A",
    docTypeLabel: "आप किस प्रकार का आवेदन पत्र तैयार करना चाहते हैं?",
    docBoth: "दोनों दस्तावेज (शिकायत पत्र और आरटीआई आवेदन)",
    docComplaint: "शिकायत पत्र (संबंधित अधिकारी को प्रेषित)",
    docRti: "आरटीआई आवेदन (सूचना का अधिकार धारा 6)",

    // Help and tips
    knowYourRightsHelp: "कानूनी ढांचा एवं समय सीमा",
    knowYourRightsText: "यह पोर्टल आधिकारिक नागरिक घोषणा पत्र और आरटीआई नियमों के आधार पर आपका आवेदन तैयार करता है।",

    // Action buttons
    btnNext: "आगे बढ़ें",
    btnBack: "पीछे जाएं",
    btnGenerate: "दस्तावेज तैयार करें",
    btnGenerating: "सरकारी नियमों का मिलान हो रहा है... पत्र तैयार किया जा रहा है...",
    btnReset: "शुरुआत से लिखें",
    btnStartOver: "नया आवेदन",

    // Voice mic
    micStart: "बोलकर समस्या दर्ज करने के लिए माइक दबाएं",
    micListening: "सुन रहे हैं... कृपया स्पष्ट आवाज में अपनी समस्या बताएं",
    micStop: "माइक बंद करें",
    micNotSupported: "इस ब्राउज़र में वॉइस टाइपिंग उपलब्ध नहीं है।",

    // User Profile
    profileTitle: "नागरिक प्रोफाइल एवं स्वतः पूर्ति (Auto-Fill)",
    profileSubtitle: "अपना विवरण एक बार सहेजें। हर शिकायत व आरटीआई आवेदन में आपका नाम, पता और दिनांक स्वतः जुड़ जाएगा।",
    myAccountBtn: "मेरी प्रोफाइल",
    fullName: "पूरा नाम",
    mobileNumber: "मोबाइल नंबर",
    emailOptional: "ईमेल पता (ऐच्छिक)",
    fullAddress: "स्थायी पता / मकान नंबर",
    wardVillage: "वार्ड नं. / ग्राम पंचायत",
    pincode: "पिन कोड (PIN)",
    bplQuestion: "क्या आपके पास बीपीएल (BPL) राशन कार्ड है?",
    bplCardNo: "बीपीएल कार्ड नंबर",
    saveProfileBtn: "प्रोफाइल सहेजें",
    profileSavedNotice: "प्रोफाइल सहेजा गया! आपके पत्रों में विवरण स्वतः भर जाएगा।",

    // Output screen
    outputHeading: "दस्तावेज सफलतापूर्वक तैयार हो गया है",
    outputSub: "नीचे दिए गए आवेदन पत्र की जांच करें। इसे कॉपी, प्रिंट या डाउनलोड करके संबंधित कार्यालय में जमा करें।",
    tabDocComplaint: "शिकायत पत्र (Complaint)",
    tabDocRti: "RTI आवेदन पत्र (Sec 6)",
    tabDocSummary: "नागरिक सारांश एवं निर्देश",
    btnCopy: "कॉपी करें",
    btnCopied: "कॉपी हो गया!",
    btnDownload: "डाउनलोड करें",
    btnDownloaded: "डाउनलोड पूरा हुआ!",
    groundingHeader: "सरकारी संदर्भ एवं नियम",
    groundingAlert: "यह दस्तावेज आधिकारिक नागरिक घोषणा पत्रों के नियमों पर आधारित है:",
    expectedRes: "निवारण समय सीमा (SLA):",
    helplinePhone: "विभागीय डायरेक्ट हेल्पलाइन:",
    portalLink: "आधिकारिक वेब पोर्टल:",

    // Canned scenarios
    demoScenariosTitle: "सामान्य उदाहरण",
    demoScenariosSub: "फॉर्म को तुरंत भरने के लिए नीचे दिए गए किसी भी उदाहरण पर क्लिक करें।",
    demo1Title: "उदाहरण 1: जल आपूर्ति संकट",
    demo1Desc: "वार्ड में 3 दिनों से नलों में पानी न आने की आपातकालीन शिकायत।",
    demo2Title: "उदाहरण 2: पेंशन में देरी",
    demo2Desc: "पिछले 2 महीनों से वृद्धावस्था पेंशन बैंक खाते में न आने पर आरटीआई।",
    demo3Title: "उदाहरण 3: सड़क मरम्मत आरटीआई",
    demo3Desc: "वार्ड की सड़क मरम्मत के लिए आवंटित बजट और टेंडर की जानकारी हेतु।",

    // Rights section
    rightsHeader: "अपने कानूनी अधिकार जानें (RTI धारा 6 व सिटीजन चार्टर)",

    sandboxLabel: "नागरिक सेवा सहायता पोर्टल",
    orOtherStateModel: "राष्ट्रीय / अन्य राज्य मॉडल",
    stateSelectSubtext: "* पश्चिम बंगाल एवं महाराष्ट्र के आधिकारिक नागरिक चार्टर से सीधे जुड़ा हुआ।",
    districtDesc: "यह संबंधित अधिकारी का पता और आरटीआई लोक सूचना अधिकारी का चयन करता है।",
    minChars: "न्यूनतम 15 अक्षर",
    durationOption1: "24 घंटे से कम",
    durationOption2: "1 से 3 दिन",
    durationOption3: "3 से 7 दिन",
    durationOption4: "1 से 4 सप्ताह",
    durationOption5: "एक महीने से अधिक (गंभीर विलंब)",
    bothDocDesc: "प्राथमिक नागरिक शिकायत और आरटीआई स्टेटस मांग पत्र तैयार करें।",
    complaintDocDesc: "संबंधित नगर पालिका कार्यालय के लिए औपचारिक शिकायत पत्र बनाएं।",
    rtiDocDesc: "अभिलेखों की जांच के लिए सूचना का अधिकार अधिनियम धारा 6 का आवेदन तैयार करें।",
    changeDetails: "विवरण बदलें",
    statutoryBannerTitle: "नागरिक चार्टर एवं SLA मिलान",
    statutoryBannerDesc: "{state} के लोक सेवा गारंटी नियमों के अनुसार आपका पत्र तैयार किया गया है।",
    charterCompliantLabel: "सिटीजन चार्टर संगत",
    statutesCitationLabel: "कानूनी धाराएं संलग्न",
    trustIndexLabel: "प्रपत्र वैधता सूचकांक",
    sandboxActiveLabel: "संपादन मोड सक्रिय है",
    draftLockedLabel: "आवेदन पत्र तैयार है",
    btnFinishEditing: "संपादन पूरा करें",
    btnEditDraft: "पत्र में संपादन करें",
    btnPrintPetition: "प्रिंट करें",
    nodalOfficeTargets: "संबंधित कार्यालय का पता",
    daysGuaranteeSLA: "दिनों में समाधान की गारंटी (SLA)",
    milestonesTitle: "आवेदन जमा करने के आवश्यक चरण",
    milestonesSubtitle: "अपने आवेदन को औपचारिक रूप से जमा करने के लिए इन चरणों का पालन करें:",
    milestonesCompleteText: "चरण पूरे हुए (कुल {total} में से)",
    milestoneLabelText: "चरण",
    databaseCheckTitle: "सरकारी नियमों का सत्यापन",
    databaseCheckDesc: "आपकी समस्या के आधार पर आधिकारिक नियमों से मिलान:",
    scanningMatchedRules: "नियमों का मिलान किया जा रहा है...",
    municipalSlaTitle: "कानूनी समाधान समय सीमा (SLA)",
    municipalSlaDesc: "लोक सेवा गारंटी अधिनियम के तहत निर्धारित समय सीमा:",
    rightsSub: "नागरिक अधिकार और डिजिटल इंडिया पब्लिक रिकॉर्ड्स का संकलन।",
    bplWaiverTitle: "बीपीएल (BPL) कार्डधारकों के लिए शुल्क छूट",
    bplWaiverDesc: "क्या आपके पास बीपीएल कार्ड है? आपको आरटीआई आवेदन शुल्क (₹10) से पूरी छूट प्राप्त है।",
    helplinesSub: "प्रमुख नगर निगम, बिजली, जल और समाज कल्याण हेल्पलाइन नंबर।",
    footerText1: "© 2026 नागरिकसेवा प्लेटफॉर्म। नागरिक शिकायत एवं सूचना सहायता केंद्र।",
    footerText2: "डिजिटल इंडिया एवं प्रशासनिक पारदर्शिता पहल • बहु-राज्य नागरिक सेवा",
    modifyTextInputs: "जानकारी संशोधित करें",
    failedGenTitle: "दस्तावेज तैयार नहीं हो सका"
  },

  mr: {
    brandName: "नागरिकसेवा",
    brandSubtitle: "नागरिक तक्रार व माहिती अधिकार (RTI) सहाय्यता कक्ष",
    nationalBadge: "राष्ट्रीय नागरिक सहाय्यता उपक्रम",
    tagline: "महानगरपालिका, पाणी, वीज, रस्ते आणि माहिती अधिकार (RTI) कायद्यानुसार अधिकृत तक्रार अर्ज तयार करणारे पोर्टल.",
    taglineSub: "महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ व माहिती अधिकार २००५ च्या नियमांनुसार. पारदर्शक व मोफत.",
    tabCreate: "तक्रार व RTI अर्ज तयार करा",
    tabRights: "आपले हक्क जाणून घ्या",
    tabHelplines: "हेल्पलाइन व निर्देशिका",
    tabMyComplaints: "माझे जतन केलेले अर्ज",

    // Intake Stepper
    stepLocation: "१. प्रदेश व महानगरपालिका",
    stepCategory: "२. नागरी सेवा विभाग",
    stepDetails: "३. तक्रारीचा तपशील",
    stepReview: "४. तयार झालेला अर्ज",

    detectLocation: "माझे स्थान शोधा (GPS)",
    detectingLocation: "स्थान शोधत आहे...",
    locationDetected: "स्थान निश्चित झाले",
    selectState: "राज्य निवडा",
    selectDistrict: "महानगरपालिका किंवा जिल्हा निवडा",
    selectCategory: "संबंधित विभागाचा प्रकार निवडा",
    issueDescLabel: "आपल्या समस्येचे सविस्तर वर्णन करा (माइकवर बोला किंवा कोणत्याही भाषेत लिहा)",
    issueDescPlaceholder: "समस्येचे वर्णन करा. उदा- 'आमच्या प्रभागात गेल्या ४ दिवसांपासून नळाला पाणी येत नाही आणि गटारे तुंबून रस्त्यावर साचली आहेत...'",
    durationLabel: "ही समस्या किती दिवसांपासून प्रलंबित आहे?",
    prevComplaintLabel: "पूर्वी काही तक्रार नोंदवली होती का? (ऐच्छिक)",
    prevComplaintPlaceholder: "उदा: BMC-2026-WTR-828A",
    docTypeLabel: "कोणता अर्ज तयार करायचा आहे?",
    docBoth: "दोन्ही अर्ज (तक्रार पत्र आणि RTI अर्ज)",
    docComplaint: "तक्रार पत्र (संबंधित अधिकाऱ्यास सादर करण्यासाठी)",
    docRti: "माहिती अधिकार अर्ज (RTI कलम ६ अन्वये)",

    // Help and tips
    knowYourRightsHelp: "कायदेशीर चौकट व मुदत",
    knowYourRightsText: "हे पोर्टल अधिकृत नागरिक सनद आणि लोकसेवा हमी कायद्याच्या आधारे परिपूर्ण अर्ज तयार करते.",

    // Action buttons
    btnNext: "पुढे जा",
    btnBack: "मागे या",
    btnGenerate: "कायदेशीर अर्ज तयार करा",
    btnGenerating: "सरकारी नियमांची पडताळणी सुरू आहे... अर्ज तयार होत आहे...",
    btnReset: "पुन्हा सुरू करा",
    btnStartOver: "नवीन अर्ज",

    // Voice mic
    micStart: "बोलून तक्रार नोंदवण्यासाठी माइक दाबा",
    micListening: "ऐकत आहे... आपली समस्या स्पष्ट आवाजात सांगा",
    micStop: "माइक बंद करा",
    micNotSupported: "या ब्राउझरमध्ये व्हॉइस टायपिंग उपलब्ध नाही.",

    // User Profile
    profileTitle: "नागरिक प्रोफाइल व ऑटो-फिल",
    profileSubtitle: "आपला तपशील एकदा जतन करा. प्रत्येक तक्रार व RTI अर्जात आपले नाव, पत्ता आणि तारीख आपोआप भरली जाईल.",
    myAccountBtn: "माझी प्रोफाइल",
    fullName: "पूर्ण नाव",
    mobileNumber: "मोबाईल नंबर",
    emailOptional: "ईमेल पत्ता (ऐच्छिक)",
    fullAddress: "कायमचा पत्ता / घर क्रमांक",
    wardVillage: "प्रभाग क्र. / गाव / ग्रामपंचायत",
    pincode: "पिन कोड (PIN)",
    bplQuestion: "आपल्याकडे दारिद्र्यरेषेखालील (BPL) रेशन कार्ड आहे का?",
    bplCardNo: "BPL कार्ड क्रमांक",
    saveProfileBtn: "प्रोफाइल सेव्ह करा",
    profileSavedNotice: "प्रोफाइल जतन केले! आपल्या अर्जात तपशील आपोआप भरला जाईल.",

    // Output screen
    outputHeading: "कायदेशीर अर्ज यशस्वीरित्या तयार झाला आहे",
    outputSub: "खालील अर्जाची खात्री करा. हा अर्ज कॉपी, प्रिंट किंवा डाउनलोड करून संबंधित कार्यालयात सादर करा.",
    tabDocComplaint: "तक्रार अर्ज (Complaint)",
    tabDocRti: "RTI माहिती अधिकार अर्ज (Sec 6)",
    tabDocSummary: "नागरिक मार्गदर्शक सारांश",
    btnCopy: "कॉपी करा",
    btnCopied: "कॉपी झाले!",
    btnDownload: "डाउनलोड करा",
    btnDownloaded: "डाउनलोड पूर्ण!",
    groundingHeader: "अधिकृत नियम व कायदेशीर संदर्भ",
    groundingAlert: "हा अर्ज अधिकृत नागरिक सनद आणि सेवा हमी कायद्यानुसार तयार केला आहे:",
    expectedRes: "निवारण हमी कालावधी (SLA):",
    helplinePhone: "थेट विभागीय हेल्पलाइन नंबर:",
    portalLink: "अधिकृत वेब पोर्टल:",

    // Canned scenarios
    demoScenariosTitle: "वास्तविक उदाहरणे",
    demoScenariosSub: "अर्ज त्वरित भरण्यासाठी खालील कोणत्याही उदाहरणावर क्लिक करा.",
    demo1Title: "उदाहरण १: पाणी पुरवठा खंडित",
    demo1Desc: "प्रभागात ३ दिवसांपासून नळाचे पाणी न आल्याबाबतची तातडीची तक्रार.",
    demo2Title: "उदाहरण २: पेन्शन मिळण्यास विलंब",
    demo2Desc: "गेल्या २ महिन्यांचे श्रावणबाळ किंवा निराधार मानधन जमा न झाल्याबाबत.",
    demo3Title: "उदाहरण ३: रस्ते दुरुस्ती RTI",
    demo3Desc: "प्रभागातील रस्त्यांच्या दुरुस्ती खर्चाचा हिशोब व निविदा मिळवण्यासाठी RTI.",

    // Rights section
    rightsHeader: "आपले कायदेशीर हक्क (RTI कलम ६ व महाराष्ट्र लोकसेवा हक्क २०१५)",

    sandboxLabel: "नागरिक सेवा सहाय्यता कक्ष",
    orOtherStateModel: "राष्ट्रीय / इतर राज्य मॉडेल",
    stateSelectSubtext: "* महाराष्ट्र (BMC, PMC, महावितरण) व पश्चिम बंगालच्या अधिकृत नियमांशी थेट संलग्न.",
    districtDesc: "हे संबंधित विभाग आणि माहिती अधिकार जन माहिती अधिकाऱ्याचा पत्ता निश्चित करते.",
    minChars: "किमान १५ अक्षरे",
    durationOption1: "२४ तासांपेक्षा कमी",
    durationOption2: "१ ते ३ दिवस",
    durationOption3: "३ ते ७ दिवस",
    durationOption4: "१ ते ४ आठवडे",
    durationOption5: "एक महिन्यापेक्षा जास्त (गंभीर विलंब)",
    bothDocDesc: "प्राथमिक नागरी तक्रार आणि RTI सद्यस्थिती मागणी अर्ज तयार करा.",
    complaintDocDesc: "महानगरपालिका प्रभागासाठी अधिकृत तक्रार अर्ज तयार करा.",
    rtiDocDesc: "कागदपत्रांच्या तपासणीसाठी माहिती अधिकार कलम ६ अन्वये अर्ज तयार करा.",
    changeDetails: "माहिती बदला",
    statutoryBannerTitle: "लोकसेवा हक्क व SLA समन्वय",
    statutoryBannerDesc: "{state} च्या लोकसेवा हमी कायद्यानुसार आपला अर्ज तयार करण्यात आला आहे.",
    charterCompliantLabel: "नागरिक सनद सुसंगत",
    statutesCitationLabel: "कायदेशीर कलमे संलग्न",
    trustIndexLabel: "अर्ज वैधता निर्देशांक",
    sandboxActiveLabel: "संपादन मोड सुरू आहे",
    draftLockedLabel: "अधिकृत अर्ज तयार आहे",
    btnFinishEditing: "संपादन पूर्ण करा",
    btnEditDraft: "अर्जात बदल करा",
    btnPrintPetition: "प्रिंट करा",
    nodalOfficeTargets: "संबंधित कार्यालयाचा पत्ता",
    daysGuaranteeSLA: "दिवसांत निवारण हमी (SLA)",
    milestonesTitle: "अर्ज सादर करण्याचे आवश्यक टप्पे",
    milestonesSubtitle: "आपला अर्ज अधिकृतपणे सादर करण्यासाठी खालील पायऱ्यांचे अनुसरण करा:",
    milestonesCompleteText: "टप्पे पूर्ण (एकूण {total} पैकी)",
    milestoneLabelText: "टप्पा",
    databaseCheckTitle: "सरकारी नियमांची पडताळणी",
    databaseCheckDesc: "आपल्या समस्येच्या वर्णनानुसार अधिकृत नियमांचे मिलान:",
    scanningMatchedRules: "नियमांची पडताळणी सुरू आहे...",
    municipalSlaTitle: "कायदेशीर निवारण मुदत (SLA)",
    municipalSlaDesc: "महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ नुसार निश्चित कालमर्यादा:",
    rightsSub: "नागरी हक्क व डिजिटल इंडिया सार्वजनिक नियमांचा संकलन संच.",
    bplWaiverTitle: "दारिद्र्यरेषेखालील (BPL) नागरिकांना फी माफी",
    bplWaiverDesc: "आपल्याकडे BPL रेशन कार्ड आहे का? आपल्याला RTI अर्जाच्या १० रुपये शुल्कातून पूर्ण सूट आहे.",
    helplinesSub: "प्रमुख महानगरपालिका, महावितरण, पाणी व समाजकल्याण हेल्पलाइन नंबर.",
    footerText1: "© २०२६ नागरिकसेवा प्लॅटफॉर्म. नागरिक तक्रार व माहिती सहाय्यता कक्ष.",
    footerText2: "डिजिटल इंडिया व प्रशासकीय पारदर्शकता उपक्रम • बहु-राज्य नागरी सेवा",
    modifyTextInputs: "माहिती दुरुस्त करा",
    failedGenTitle: "अर्ज तयार करता आला नाही"
  }
};

const CIVIC_CATEGORIES = [
  {
    id: "water_supply",
    name_en: "Water Supply",
    name_bn: "জল সরবরাহ",
    name_hi: "जल आपूर्ति (पानी)",
    name_mr: "पाणी पुरवठा (नळ)",
    image: "/images/water.jpg",
    icon: Droplet,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
  },
  {
    id: "electricity",
    name_en: "Electricity",
    name_bn: "বিদ্যুৎ পরিষেবা",
    name_hi: "विद्युत (बिजली)",
    name_mr: "वीज पुरवठा (महावितरण)",
    image: "/images/electricity.jpg",
    icon: Zap,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  {
    id: "roads",
    name_en: "Road & Streets",
    name_bn: "রাস্তাঘাট",
    name_hi: "सड़क एवं गड्ढे",
    name_mr: "रस्ते व खड्डे",
    image: "/images/roads.jpg",
    icon: Milestone,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: "garbage",
    name_en: "Garbage Removal",
    name_bn: "আবর্জনা পরিষ্কার",
    name_hi: "कचरा उठाव व सफाई",
    name_mr: "घनकचरा व स्वच्छता",
    image: "/images/garbage.jpg",
    icon: Trash2,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    id: "drainage",
    name_en: "Sewerage Line",
    name_bn: "ড্রেনেজ ও নর্দমা",
    name_hi: "सीवरेज व नाली",
    name_mr: "सांडपाणी व गटार",
    image: "/images/drainage.jpg",
    icon: Waves,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "certificates",
    name_en: "Certificates Office",
    name_bn: "নাগরিক শংসাপত্র",
    name_hi: "जन्म/मृत्यु प्रमाण पत्र",
    name_mr: "जन्म-मृत्यू दाखला",
    image: "/images/certificates.jpg",
    icon: FileBadge,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
  {
    id: "pension",
    name_en: "Pension & Benefits",
    name_bn: "পেনশন ও ভাতা",
    name_hi: "पेंशन एवं सरकारी भत्ता",
    name_mr: "पेन्शन व मानधन",
    image: "/images/pension.jpg",
    icon: Coins,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

export default function App() {
  const [lang, setLang] = useState<LanguageCode>("en");
  const [activeTab, setActiveTab] = useState<"create" | "rights" | "helplines" | "my_complaints">("create");

  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // GPS Location state
  const [isLocating, setIsLocating] = useState(false);
  const [detectedLocationName, setDetectedLocationName] = useState<string | null>(null);

  // User Profile modal state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("nagrik_user_profile");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      name: "",
      phone: "",
      email: "",
      address: "",
      wardVillage: "",
      district: "",
      state: "West Bengal",
      pincode: "",
      isBpl: false,
      bplNumber: "",
    };
  });

  // Saved Complaints list
  const [savedComplaints, setSavedComplaints] = useState<SavedComplaint[]>(() => {
    const saved = localStorage.getItem("nagrik_saved_complaints");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [];
  });

  // Form selections
  const [selectedState, setSelectedState] = useState("West Bengal");
  const [selectedDistrict, setSelectedDistrict] = useState("Kolkata");
  const [selectedCategory, setSelectedCategory] = useState("water_supply");
  const [problemDescription, setProblemDescription] = useState("");
  const [duration, setDuration] = useState("3-7 days");
  const [prevRef, setPrevRef] = useState("");
  const [docType, setDocType] = useState<"complaint" | "rti" | "both">("both");

  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);

  // In-place editable draft buffers
  const [editableComplaint, setEditableComplaint] = useState("");
  const [editableRti, setEditableRti] = useState("");
  const [editableSummary, setEditableSummary] = useState("");
  const [isEditingDraft, setIsEditingDraft] = useState(false);

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
      source_hi?: string;
      source_mr?: string;
      section: string;
      section_bn?: string;
      section_hi?: string;
      section_mr?: string;
      clause: string;
      clause_bn?: string;
      clause_hi?: string;
      clause_mr?: string;
      content: string;
      content_bn?: string;
      content_hi?: string;
      content_mr?: string;
    }>;
    department: {
      departmentName: string;
      departmentName_bn: string;
      departmentName_hi: string;
      departmentName_mr: string;
      portalUrl: string;
      helpline: string;
      expectedResolutionDays: number;
      designation: string;
      designation_bn: string;
      designation_hi: string;
      designation_mr: string;
      address: string;
      address_bn: string;
      address_hi: string;
      address_mr: string;
    } | null;
  } | null>(null);

  const [activeDocSubTab, setActiveDocSubTab] = useState<"complaint" | "rti" | "summary">("complaint");
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState(false);
  const [manualRAGChunks, setManualRAGChunks] = useState<any[]>([]);

  const strings = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  // Interactive step-by-step checklist
  const [checklistItems, setChecklistItems] = useState([
    { id: "print", text_en: "Print 2 copies of the formal Complaint letter (one to submit, one for acknowledgment stamp received)", text_bn: "অভিযোগপত্রের দুটি কপি প্রিন্ট করুন (একটি জমা দেওয়ার জন্য এবং অন্যটি প্রাপ্তির রসিদ স্ট্যাম্প রাখার জন্য)", text_hi: "शिकायत पत्र की 2 प्रतियां प्रिंट करें (एक जमा करने के लिए और एक रसीद की मुहर के लिए)", text_mr: "तक्रार पत्राच्या २ प्रती प्रिंट करा (एक सादर करण्यासाठी व एक पोहोच पावतीसाठी)", done: false },
    { id: "court_fee", text_en: "Affix standard ₹10 Court Fee Stamp or buy a Postal Order (exempted if you fall BPL)", text_bn: "অভিযোগের সাথে ১০ টাকার কোর্ট ফি স্ট্যাম্প বা ইন্ডিয়ান পোস্টাল অর্ডার দিন (বিপিএল হলে সম্পূর্ণ ছাড়)", text_hi: "आरटीआई में ₹10 का कोर्ट फीस स्टैंप या पोस्टल ऑर्डर लगाएं (बीपीएल धारकों को छूट)", text_mr: "₹१० चे कोर्ट फी स्टॅम्प किंवा पोस्टल ऑर्डर जोडा (BPL धारकांना मोफत)", done: false },
    { id: "sign", text_en: "Sign your name and specify contact phone details with permanent address", text_bn: "অভিযোগের শেষে আপনার নাম স্বাক্ষর করুন এবং যোগাযোগের মোবাইল নম্বর ও ঠিকানা লিখুন", text_hi: "आवेदन के नीचे अपने हस्ताक्षर करें और पूरा पता व मोबाइल नंबर दर्ज करें", text_mr: "अर्जाच्या शेवटी आपली स्वाक्षरी, पूर्ण पत्ता आणि फोन नंबर लिहा", done: false },
    { id: "post", text_en: "Submit standard complaint directly, or send the RTI petition via registered post", text_bn: "অভিযোগপত্র সরাসরি জমা দিন, অথবা আরটিআই আবেদনটি রেজিস্টার্ড পোস্টের মাধ্যমে প্রেরণ করুন", text_hi: "पत्र सीधे नगर निगम कार्यालय में जमा करें अथवा स्पीड पोस्ट से भेजें", text_mr: "अर्ज थेट पालिकेत जमा करा किंवा स्पीड पोस्टने पाठवा", done: false },
  ]);

  // Voice speech recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const toggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(strings.micNotSupported);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;

      // Language tag mapping
      const langCodes: Record<LanguageCode, string> = {
        bn: "bn-IN",
        hi: "hi-IN",
        mr: "mr-IN",
        en: "en-IN",
      };
      recognition.lang = langCodes[lang] || "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + " ";
        }
        setProblemDescription((prev) => {
          // If previous was short or empty, replace, else append smoothly
          return transcript.trim();
        });
      };

      recognition.onerror = (err: any) => {
        console.error("Speech recognition error:", err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // GPS Location detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Smart regional boundary heuristics for Indian states
        // West Bengal approx: 21.5°N - 27.3°N, 85.8°E - 89.9°E
        // Maharashtra approx: 15.6°N - 22.0°N, 72.6°E - 80.9°E
        if (latitude >= 21.0 && latitude <= 27.5 && longitude >= 85.0 && longitude <= 90.0) {
          setSelectedState("West Bengal");
          if (latitude >= 22.4 && latitude <= 22.7 && longitude >= 88.2 && longitude <= 88.5) {
            setSelectedDistrict("Kolkata");
            setDetectedLocationName("Kolkata, West Bengal (KMC Area)");
          } else if (latitude >= 22.45 && latitude <= 22.55 && longitude >= 88.2 && longitude <= 88.35) {
            setSelectedDistrict("Maheshtala");
            setDetectedLocationName("Maheshtala, West Bengal");
          } else {
            setSelectedDistrict("Kolkata");
            setDetectedLocationName("West Bengal Municipal Region");
          }
        } else if (latitude >= 15.5 && latitude <= 22.2 && longitude >= 72.5 && longitude <= 81.0) {
          setSelectedState("Maharashtra");
          if (latitude >= 18.8 && latitude <= 19.3 && longitude >= 72.7 && longitude <= 73.1) {
            setSelectedDistrict("Mumbai (BMC)");
            setDetectedLocationName("Mumbai, Maharashtra (BMC Area)");
          } else if (latitude >= 18.4 && latitude <= 18.7 && longitude >= 73.7 && longitude <= 74.0) {
            setSelectedDistrict("Pune (PMC)");
            setDetectedLocationName("Pune, Maharashtra (PMC Area)");
          } else {
            setSelectedDistrict("Mumbai (BMC)");
            setDetectedLocationName("Maharashtra Municipal Region");
          }
        } else {
          setSelectedState("National/General");
          setSelectedDistrict("Central Municipal Area");
          setDetectedLocationName("National / Central India");
        }
        setIsLocating(false);
      },
      (err) => {
        console.warn("Location error:", err);
        setIsLocating(false);
        alert("Unable to retrieve your location. Please select your region from the dropdown.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Save Citizen Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("nagrik_user_profile", JSON.stringify(profile));
    setProfileSavedNotice(true);
    setTimeout(() => {
      setProfileSavedNotice(false);
      setShowProfileModal(false);
    }, 1200);

    // Sync to backend if phone is provided
    if (profile.phone) {
      fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: profile.phone, profile }),
      }).catch((e) => console.log("Profile backend sync error:", e));
    }
  };

  // Auto-fill template placeholders with citizen profile data
  const applyProfileAutoFill = (text: string): string => {
    if (!text) return "";
    let res = text;
    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    if (profile.name) {
      res = res.replace(/\[Your Full Name\]|\[Your Name\]|\[Applicant Name\]/gi, profile.name);
    }
    if (profile.address || profile.wardVillage || profile.district) {
      const fullAddr = [
        profile.address,
        profile.wardVillage ? `Ward/Village: ${profile.wardVillage}` : "",
        profile.district ? `${profile.district}` : "",
        profile.state ? `${profile.state}` : "",
        profile.pincode ? `PIN: ${profile.pincode}` : "",
      ]
        .filter(Boolean)
        .join(", ");
      res = res.replace(/\[Full Postal Address with Ward\/PIN\]|\[Full Postal Address\]|\[Your Address\]/gi, fullAddr);
    }
    if (profile.phone) {
      res = res.replace(/\[Mobile Number\]|\[Phone Number\]|\[Contact Phone\]/gi, profile.phone);
    }
    if (profile.isBpl && profile.bplNumber) {
      res = res.replace(/\[BPL Card Number\]/gi, profile.bplNumber);
    }
    res = res.replace(/\[Date\]/gi, today);
    return res;
  };

  // Debounced RAG Knowledge Preview
  useEffect(() => {
    if (problemDescription.length < 5) return;
    const delayDebounceFn = setTimeout(() => {
      fetch("/api/kb/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: problemDescription,
          category: selectedCategory,
          state: selectedState,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.results) {
            setManualRAGChunks(data.results);
          }
        })
        .catch((err) => console.log("RAG preview err:", err));
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [problemDescription, selectedCategory, selectedState]);

  // Load preset demo cases
  const applyDemoScenario = (sc: number) => {
    if (sc === 1) {
      setSelectedState("West Bengal");
      setSelectedDistrict("Maheshtala");
      setSelectedCategory("water_supply");
      setProblemDescription(
        lang === "bn"
          ? "আমার এলাকায় গত ৩ দিন ধরে কোনো পাইপের জল আসছে না। জলের প্রচণ্ড কষ্ট হচ্ছে, বয়স্ক ও শিশুরা খাওয়ার জল পাচ্ছে না।"
          : lang === "hi"
            ? "हमारे इलाके में पिछले 3 दिनों से नलों में पानी बिल्कुल नहीं आ रहा है। लोग पीने के पानी के लिए परेशान हैं।"
            : lang === "mr"
              ? "आमच्या भागात गेल्या ३ दिवसांपासून नळाला पाणी येत नाही. पिण्याच्या पाण्यासाठी नागरिकांचे मोठे हाल होत आहेत."
              : "For the last 3 days there is absolute no municipal water supply in our ward. Residents and children are facing severe shortage."
      );
      setDuration("3-7 days");
      setPrevRef("");
      setDocType("both");
    } else if (sc === 2) {
      setSelectedState("Maharashtra");
      setSelectedDistrict("Mumbai (BMC)");
      setSelectedCategory("pension");
      setProblemDescription(
        lang === "bn"
          ? "আমার বার্ধক্য পেনশন গত ২ মাস ধরে ব্যাংকে জমা পড়েনি। আমি একজন প্রবীণ নাগরিক এবং অন্য কোনো আয়ের উৎস নেই।"
          : lang === "hi"
            ? "मेरी वृद्धावस्था पेंशन पिछले 2 महीनों से बैंक खाते में जमा नहीं हुई है। मैं एक बुजुर्ग नागरिक हूं।"
            : lang === "mr"
              ? "माझे श्रावणबाळ/संजय गांधी निराधार योजनेचे मासिक मानधन गेल्या २ महिन्यांपासून बँक खात्यात जमा झालेले नाही."
              : "My monthly welfare senior citizen pension has not been credited to my bank account for the last 2 cycles."
      );
      setDuration("1-4 weeks");
      setPrevRef("MH-PENS-5532A");
      setDocType("both");
    } else if (sc === 3) {
      setSelectedState("West Bengal");
      setSelectedDistrict("Kolkata");
      setSelectedCategory("roads");
      setProblemDescription(
        lang === "bn"
          ? "আমি বিগত ২ অর্থবর্ষে আমার ওয়ার্ডের রাস্তা মেরামতের কাজের বরাদ্দকৃত ব্যয়ের হিসাব ও টেন্ডারের নথিপত্র চেয়ে RTI আবেদন করতে চাই।"
          : lang === "hi"
            ? "मैं पिछले 2 वित्तीय वर्षों में हमारे वार्ड की सड़क मरम्मत कार्य के खर्च और टेंडर की जानकारी हेतु आरटीआई दाखिल करना चाहता हूं।"
            : lang === "mr"
              ? "गेल्या २ वर्षांत आमच्या प्रभागातील रस्ते दुरुस्तीसाठी खर्च झालेला निधी व निविदांची माहिती मिळवण्यासाठी RTI अर्ज."
              : "I want to file an RTI application to obtain official expenditure accounts and repair tenders allocated to our ward road works."
      );
      setDuration("More than a month");
      setPrevRef("");
      setDocType("rti");
    }
    setCurrentStep(3);
    setGeneratedResult(null);
  };

  // Generate Document
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
          citizen_name: profile.name,
          citizen_address: [profile.address, profile.wardVillage, profile.district, profile.pincode].filter(Boolean).join(", "),
          citizen_phone: profile.phone,
          citizen_bpl: profile.isBpl ? profile.bplNumber : "",
        }),
      });

      let data: any;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        throw new Error(`Invalid server response: ${textResponse.slice(0, 150)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred building draft documents.");
      }

      const text = data.rawText;

      let complaint = "";
      let rti = "";
      let summary = "";

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

      if (!complaint && !rti && !summary) {
        complaint = text;
        summary = "Submit with Rupees 10 Court Fee Stamp or Indian Postal Order at your local office desk.";
      }

      const finalComplaint = applyProfileAutoFill(complaint || "No complaint letter generated.");
      const finalRti = applyProfileAutoFill(rti || "RTI Application was not drafted or explicitly requested.");
      const finalSummary = summary || "Citizen action guidelines generated.";

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

      // Auto-save to Complaints History Database
      const newSavedItem: SavedComplaint = {
        id: `NS-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        category: selectedCategory,
        state: selectedState,
        district: selectedDistrict,
        description: problemDescription,
        complaintText: finalComplaint,
        rtiText: finalRti,
        summaryText: finalSummary,
      };

      setSavedComplaints((prev) => {
        const updated = [newSavedItem, ...prev];
        localStorage.setItem("nagrik_saved_complaints", JSON.stringify(updated));
        return updated;
      });

      // Save to backend if phone is available
      if (profile.phone) {
        fetch("/api/user/complaints", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ complaint: { ...newSavedItem, phone: profile.phone } }),
        }).catch((e) => console.log("Complaint history sync error:", e));
      }

      setCurrentStep(4);
    } catch (err: any) {
      console.error(err);
      setErrorNotice(err.message || "An unexpected error occurred during draft compilation.");
    } finally {
      setLoading(false);
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

  return (
    <div id="nagrik_seva_root" className="min-h-screen bg-cream flex flex-col justify-between">

      {/* ─── HEADER ────────────────────────────────────────────── */}
      <header className="bg-white/95 backdrop-blur-md border-b border-warm-border sticky top-0 z-50 py-3.5 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">

          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-saffron flex items-center justify-center text-white font-black shadow-md shadow-saffron/20">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-black text-warm-charcoal tracking-tight text-xl block leading-tight">
                {strings.brandName}
              </span>
              <span className="text-xs text-warm-grey font-medium block leading-tight">
                {strings.brandSubtitle}
              </span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">

            {/* 4-Language Selector Dropdown */}
            <div className="relative">
              <select
                id="language_select_dropdown"
                value={lang}
                onChange={(e) => setLang(e.target.value as LanguageCode)}
                className="bg-saffron-50 hover:bg-saffron-light text-saffron-dark font-bold px-3.5 py-2 rounded-full text-xs sm:text-sm border border-saffron-light/60 shadow-xs cursor-pointer focus:outline-none transition-all pr-8 appearance-none"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
              <Globe className="h-4 w-4 text-saffron absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Profile / Auto-fill Button */}
            <button
              id="user_profile_modal_btn"
              onClick={() => setShowProfileModal(true)}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer border shadow-xs ${profile.name
                  ? "bg-sage-light text-sage-dark border-sage/30 hover:bg-sage/20"
                  : "bg-white text-warm-charcoal border-warm-border hover:bg-warm-bg"
                }`}
            >
              <User className="h-4 w-4 text-saffron" />
              <span className="hidden sm:inline">{profile.name ? profile.name.split(" ")[0] : strings.myAccountBtn}</span>
              {profile.name && <CheckCircle className="h-3.5 w-3.5 text-sage" />}
            </button>

            {/* Start Over Button */}
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
                className="px-3.5 py-2 text-xs sm:text-sm bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-full font-bold transition-all cursor-pointer active:scale-95"
              >
                {strings.btnStartOver}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-saffron-50 via-cream-dark to-cream py-12 md:py-16 px-4 border-b border-warm-border">
        {/* Subtle authentic Indian civic architecture overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.50] pointer-events-none"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />

        <div className="relative max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Tricolor top accent stripe */}
          <div className="h-1.5 w-24 bg-gradient-to-r from-tricolor-saffron via-white to-tricolor-green rounded-full mx-auto mb-5 shadow-xs"></div>

          <span className="inline-block text-xs font-bold bg-white text-saffron-dark uppercase tracking-widest px-4 py-1.5 rounded-full mb-3.5 border border-warm-border shadow-xs">
            {strings.nationalBadge}
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-3.5 font-display text-warm-charcoal">
            {strings.brandName}
          </h1>

          <p className="text-warm-grey text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-3 font-normal">
            {strings.tagline}
          </p>
          <p className="text-xs sm:text-sm text-warm-grey/80 flex items-center gap-2 justify-center font-medium">
            <ShieldCheck className="h-4 w-4 text-sage" />
            {strings.taglineSub}
          </p>
        </div>
      </section>

      {/* ─── PRIMARY DASHBOARD ─────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Tab Navigation ── */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { key: "create" as const, icon: <Compass className="h-4 w-4 sm:h-5 sm:w-5" />, label: strings.tabCreate },
            { key: "my_complaints" as const, icon: <History className="h-4 w-4 sm:h-5 sm:w-5" />, label: `${strings.tabMyComplaints} (${savedComplaints.length})` },
            { key: "rights" as const, icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />, label: strings.tabRights },
            { key: "helplines" as const, icon: <Phone className="h-4 w-4 sm:h-5 sm:w-5" />, label: strings.tabHelplines },
          ].map((tab) => (
            <button
              key={tab.key}
              id={`tab_${tab.key}_btn`}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2.5 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm font-bold flex items-center gap-2 rounded-full transition-all cursor-pointer active:scale-95 ${activeTab === tab.key
                  ? "bg-saffron text-white shadow-lg shadow-saffron/20"
                  : "bg-white text-warm-charcoal hover:bg-saffron-50 border border-warm-border shadow-xs hover:shadow-sm"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── CREATE TAB WORKSPACE ── */}
        {activeTab === "create" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">

            {/* Left/Middle Column (Form & Stepper) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Stepper Progress Bar */}
              <div className="card-warm p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-0 w-full sm:w-auto justify-center sm:justify-start">
                  {[1, 2, 3, 4].map((step) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-sm sm:text-base font-display font-black transition-all ${currentStep >= step
                              ? step === 4 && currentStep === 4
                                ? "bg-sage text-white shadow-lg shadow-sage/30"
                                : "bg-saffron text-white shadow-lg shadow-saffron/20"
                              : "bg-warm-bg text-warm-grey border-2 border-warm-border"
                            }`}
                        >
                          {currentStep > step ? <Check className="h-5 w-5" /> : step}
                        </div>
                      </div>
                      {step < 4 && (
                        <div className={`h-0.5 w-6 sm:w-10 mx-1 rounded-full transition-all ${currentStep > step ? "bg-saffron" : "bg-warm-border"
                          }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <span className="text-xs sm:text-sm bg-saffron-50 text-saffron-dark px-3.5 py-1.5 rounded-full font-bold border border-saffron-light/40 text-center">
                  {currentStep === 1 && strings.stepLocation}
                  {currentStep === 2 && strings.stepCategory}
                  {currentStep === 3 && strings.stepDetails}
                  {currentStep === 4 && strings.stepReview}
                </span>
              </div>

              {/* Error Alert */}
              {errorNotice && (
                <div className="p-5 bg-rose-50 text-rose-900 rounded-2xl border border-rose-200 flex items-start gap-3 shadow-sm animate-fade-in-up">
                  <AlertTriangle className="h-6 w-6 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-base">{strings.failedGenTitle}</span>
                    <p className="text-sm mt-1 text-rose-700">{errorNotice}</p>
                  </div>
                </div>
              )}

              {/* Step Content Card */}
              <div className="card-warm p-6 sm:p-8">

                {/* ── STEP 1: REGION & LOCATION ── */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warm-border/50 pb-4">
                      <h2 className="text-2xl font-black font-display flex items-center gap-3 text-warm-charcoal">
                        <div className="p-2 rounded-xl bg-saffron-50 text-saffron-dark">
                          <MapPin className="h-6 w-6" />
                        </div>
                        {strings.stepLocation}
                      </h2>

                      {/* GPS Location Button */}
                      <button
                        id="detect_location_gps_btn"
                        onClick={handleDetectLocation}
                        disabled={isLocating}
                        className="bg-saffron-50 hover:bg-saffron-light text-saffron-dark font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-saffron-light/60 transition-all cursor-pointer active:scale-95 shadow-xs"
                      >
                        <Navigation className={`h-4 w-4 text-saffron ${isLocating ? "animate-spin" : ""}`} />
                        {isLocating ? strings.detectingLocation : strings.detectLocation}
                      </button>
                    </div>

                    {/* Detected Location Banner */}
                    {detectedLocationName && (
                      <div className="p-3.5 bg-sage-light text-sage-dark rounded-xl border border-sage/20 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fade-in">
                        <CheckCircle className="h-4 w-4 text-sage shrink-0" />
                        <span>{strings.locationDetected}: <strong>{detectedLocationName}</strong></span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-warm-charcoal block">
                          {strings.selectState}
                        </label>
                        <select
                          id="state_select_dropdown"
                          value={selectedState}
                          onChange={(e) => {
                            const st = e.target.value;
                            setSelectedState(st);
                            if (st === "Maharashtra") setSelectedDistrict("Mumbai (BMC)");
                            else if (st === "West Bengal") setSelectedDistrict("Kolkata");
                            else setSelectedDistrict("Central Division");
                          }}
                          className="w-full bg-warm-bg border border-warm-border rounded-xl p-4 text-base font-semibold shadow-xs focus:ring-2 focus:ring-saffron/30 focus:border-saffron cursor-pointer transition-all"
                        >
                          <option value="West Bengal">West Bengal / পশ্চিমবঙ্গ (KMC, Siliguri, WBSEDCL)</option>
                          <option value="Maharashtra">Maharashtra / महाराष्ट्र (BMC, PMC, TMC, MSEDCL)</option>
                          <option value="National/General">{strings.orOtherStateModel}</option>
                        </select>
                        <p className="text-xs text-warm-grey mt-1">
                          {strings.stateSelectSubtext}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-warm-charcoal block">
                          {strings.selectDistrict}
                        </label>
                        {selectedState === "West Bengal" ? (
                          <select
                            id="district_select_dropdown"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full bg-warm-bg border border-warm-border rounded-xl p-4 text-base font-semibold shadow-xs focus:ring-2 focus:ring-saffron/30 focus:border-saffron cursor-pointer transition-all"
                          >
                            <option value="Kolkata">Kolkata Corporation Area (KMC)</option>
                            <option value="Maheshtala">Maheshtala Municipality (South 24 Pgs)</option>
                            <option value="Howrah">Howrah Municipal Corporation (HMC)</option>
                            <option value="Siliguri">Siliguri Municipal Board (SMC)</option>
                          </select>
                        ) : selectedState === "Maharashtra" ? (
                          <select
                            id="district_select_dropdown"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full bg-warm-bg border border-warm-border rounded-xl p-4 text-base font-semibold shadow-xs focus:ring-2 focus:ring-saffron/30 focus:border-saffron cursor-pointer transition-all"
                          >
                            <option value="Mumbai (BMC)">Brihanmumbai Municipal Corp (BMC Mumbai)</option>
                            <option value="Pune (PMC)">Pune Municipal Corporation (PMC)</option>
                            <option value="Thane (TMC)">Thane Municipal Corporation (TMC)</option>
                            <option value="Nagpur (NMC)">Nagpur Municipal Corporation (NMC)</option>
                            <option value="Nashik (NMC)">Nashik Municipal Corporation</option>
                            <option value="Pimpri-Chinchwad (PCMC)">Pimpri-Chinchwad Municipal Corp (PCMC)</option>
                          </select>
                        ) : (
                          <input
                            id="district_text_input"
                            type="text"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            placeholder="Enter City, District, or Municipality Name"
                            className="w-full bg-warm-bg border border-warm-border rounded-xl p-4 text-base font-semibold shadow-xs focus:ring-2 focus:ring-saffron/30 focus:border-saffron transition-all"
                          />
                        )}
                        <p className="text-xs text-warm-grey mt-1">
                          {strings.districtDesc}
                        </p>
                      </div>
                    </div>

                    <div className="bg-saffron-50 p-5 rounded-2xl border border-saffron-light/50 flex gap-4 items-start">
                      <div className="bg-saffron/10 p-2.5 rounded-xl shrink-0">
                        <Compass className="h-5 w-5 text-saffron" />
                      </div>
                      <div>
                        <span className="font-bold text-sm block text-saffron-dark">{strings.knowYourRightsHelp}</span>
                        <p className="text-sm mt-1 text-warm-grey leading-relaxed">
                          {strings.knowYourRightsText}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        id="step1_next_btn"
                        onClick={() => setCurrentStep(2)}
                        className="bg-saffron hover:bg-saffron-dark text-white font-bold px-8 py-3.5 rounded-xl text-base flex items-center gap-2 shadow-lg shadow-saffron/20 transition-all cursor-pointer active:scale-95 hover:shadow-xl"
                      >
                        {strings.btnNext}
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: CATEGORY CARDS (With Real Photography) ── */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="flex items-center justify-between border-b border-warm-border/50 pb-4">
                      <h2 className="text-2xl font-black font-display flex items-center gap-3 text-warm-charcoal">
                        <div className="p-2 rounded-xl bg-saffron-50 text-saffron-dark">
                          <Building2 className="h-6 w-6" />
                        </div>
                        {strings.stepCategory}
                      </h2>
                    </div>

                    <p className="text-warm-grey text-sm font-medium">
                      {strings.selectCategory}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {CIVIC_CATEGORIES.map((cat, idx) => {
                        const isSel = selectedCategory === cat.id;
                        const CategoryIcon = cat.icon;
                        const title = lang === "bn" ? cat.name_bn : lang === "hi" ? cat.name_hi : lang === "mr" ? cat.name_mr : cat.name_en;

                        return (
                          <button
                            id={`cat_card_${cat.id}`}
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`group overflow-hidden rounded-2xl border-2 text-left transition-all relative flex flex-col cursor-pointer active:scale-[0.98] animate-fade-in-up stagger-${idx + 1} ${isSel
                                ? "border-saffron bg-saffron-50/50 ring-2 ring-saffron/30 shadow-md"
                                : "border-warm-border bg-white hover:bg-warm-bg hover:border-saffron-light shadow-xs hover:shadow-sm"
                              }`}
                          >
                            {/* Photographic thumbnail */}
                            <div className="relative h-28 w-full overflow-hidden bg-warm-border/40">
                              <img
                                src={cat.image}
                                alt={title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/60 via-transparent to-transparent" />

                              {/* Icon badge over photo */}
                              <div className={`absolute bottom-2.5 left-3 p-2 rounded-xl bg-white shadow-md border ${cat.borderColor}`}>
                                <CategoryIcon className={`h-5 w-5 ${cat.color}`} />
                              </div>

                              {/* Selection badge */}
                              {isSel && (
                                <div className="absolute top-2.5 right-2.5 bg-saffron text-white rounded-full p-1 shadow-md">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                            </div>

                            {/* Card label */}
                            <div className="p-4 flex items-center justify-between">
                              <div>
                                <p className="font-bold text-warm-charcoal text-base group-hover:text-saffron-dark transition-colors">
                                  {title}
                                </p>
                              </div>
                              <ChevronRight className={`h-4 w-4 transition-transform ${isSel ? "text-saffron translate-x-1" : "text-warm-grey"}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex justify-between">
                      <button
                        id="step2_back_btn"
                        onClick={() => setCurrentStep(1)}
                        className="border-2 border-warm-border hover:bg-warm-bg text-warm-charcoal font-bold px-6 py-3 rounded-xl text-base flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                      >
                        <ArrowLeft className="h-5 w-5" />
                        {strings.btnBack}
                      </button>

                      <button
                        id="step2_next_btn"
                        onClick={() => setCurrentStep(3)}
                        className="bg-saffron hover:bg-saffron-dark text-white font-bold px-8 py-3 rounded-xl text-base flex items-center gap-2 shadow-lg shadow-saffron/20 transition-all cursor-pointer active:scale-95 hover:shadow-xl"
                      >
                        {strings.btnNext}
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: GRIEVANCE DETAILS & MULTILINGUAL VOICE MIC ── */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in-up">
                    <h2 className="text-2xl font-black font-display flex items-center gap-3 border-b border-warm-border/50 pb-4 text-warm-charcoal">
                      <div className="p-2 rounded-xl bg-saffron-50 text-saffron-dark">
                        <Edit3 className="h-6 w-6" />
                      </div>
                      {strings.stepDetails}
                    </h2>

                    {/* Problem Description with Mic */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-warm-charcoal">
                          {strings.issueDescLabel}
                        </label>
                        <span className="text-rose-500 text-xs font-semibold">{strings.minChars}</span>
                      </div>

                      <div className="relative">
                        <textarea
                          id="issue_description_textarea"
                          rows={6}
                          value={problemDescription}
                          onChange={(e) => setProblemDescription(e.target.value)}
                          placeholder={strings.issueDescPlaceholder}
                          className={`w-full bg-warm-bg border rounded-xl p-4 pr-14 text-base shadow-xs focus:ring-2 focus:ring-saffron/30 focus:border-saffron font-medium transition-all leading-relaxed ${isListening ? "border-saffron ring-2 ring-saffron/20 bg-saffron-50/20" : "border-warm-border"
                            }`}
                        />

                        {/* Floating Mic Dictation Button */}
                        <div className="absolute right-3 bottom-3.5 flex flex-col items-center">
                          <button
                            id="voice_input_mic_btn"
                            type="button"
                            onClick={toggleVoiceInput}
                            title={isListening ? strings.micStop : strings.micStart}
                            className={`p-3 rounded-full shadow-md transition-all cursor-pointer active:scale-90 flex items-center justify-center ${isListening
                                ? "bg-saffron text-white animate-mic-listening shadow-saffron/40"
                                : "bg-white text-saffron hover:bg-saffron-50 border border-warm-border"
                              }`}
                          >
                            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Live Voice Status Indicator */}
                      {isListening && (
                        <div className="p-3 bg-saffron-50 text-saffron-dark rounded-xl border border-saffron-light/60 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold animate-fade-in">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-saffron"></span>
                            </span>
                            <span>{strings.micListening}</span>
                          </div>

                          {/* Sound wave bars */}
                          <div className="flex items-center gap-1 h-5">
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Duration */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-warm-charcoal block">
                          {strings.durationLabel}
                        </label>
                        <select
                          id="duration_select"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full bg-warm-bg border border-warm-border rounded-xl p-3.5 text-sm font-semibold shadow-xs cursor-pointer focus:ring-2 focus:ring-saffron/30 focus:border-saffron transition-all"
                        >
                          <option value="Less than 24 hours">{strings.durationOption1}</option>
                          <option value="1-3 days">{strings.durationOption2}</option>
                          <option value="3-7 days">{strings.durationOption3}</option>
                          <option value="1-4 weeks">{strings.durationOption4}</option>
                          <option value="More than a month">{strings.durationOption5}</option>
                        </select>
                      </div>

                      {/* Previous complaint Ref ID */}
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-warm-charcoal block">
                          {strings.prevComplaintLabel}
                        </label>
                        <input
                          id="previous_ref_input"
                          type="text"
                          value={prevRef}
                          onChange={(e) => setPrevRef(e.target.value)}
                          placeholder={strings.prevComplaintPlaceholder}
                          className="w-full bg-warm-bg border border-warm-border rounded-xl p-3.5 text-sm font-semibold shadow-xs focus:ring-2 focus:ring-saffron/30 focus:border-saffron transition-all"
                        />
                      </div>
                    </div>

                    {/* Draft type selection */}
                    <div className="space-y-3 bg-warm-bg p-5 rounded-2xl border border-warm-border">
                      <label className="text-sm font-bold text-warm-charcoal block">
                        {strings.docTypeLabel}
                      </label>

                      <div className="space-y-2.5">
                        {[
                          { id: "both", label: strings.docBoth, desc: strings.bothDocDesc, icon: FileCheck },
                          { id: "complaint", label: strings.docComplaint, desc: strings.complaintDocDesc, icon: FileText },
                          { id: "rti", label: strings.docRti, desc: strings.rtiDocDesc, icon: Search },
                        ].map((dt) => {
                          const isSel = docType === dt.id;
                          const DocIcon = dt.icon;
                          return (
                            <label
                              key={dt.id}
                              className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${isSel
                                  ? "border-saffron bg-white shadow-xs"
                                  : "border-transparent bg-transparent hover:bg-white/60"
                                }`}
                            >
                              <input
                                id={`doc_radio_${dt.id}`}
                                type="radio"
                                name="draft_type"
                                checked={isSel}
                                onChange={() => setDocType(dt.id as any)}
                                className="mt-1.5 h-4 w-4 text-saffron accent-saffron cursor-pointer"
                              />
                              <div className="flex-1">
                                <span className="text-sm font-bold text-warm-charcoal flex items-center gap-2">
                                  <DocIcon className="h-4 w-4 text-saffron" />
                                  {dt.label}
                                </span>
                                <span className="text-xs text-warm-grey font-medium mt-0.5 block">{dt.desc}</span>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between">
                      <button
                        id="step3_back_btn"
                        onClick={() => setCurrentStep(2)}
                        className="border-2 border-warm-border hover:bg-warm-bg text-warm-charcoal font-bold px-6 py-3 rounded-xl text-base flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                      >
                        <ArrowLeft className="h-5 w-5" />
                        {strings.btnBack}
                      </button>

                      <button
                        id="step3_generate_btn"
                        disabled={problemDescription.trim().length < 15 || loading}
                        onClick={handleGenerateDocument}
                        className={`font-bold px-8 py-3.5 rounded-xl text-base flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 ${problemDescription.trim().length >= 15 && !loading
                            ? "bg-sage hover:bg-sage-dark text-white shadow-sage/20 hover:shadow-xl"
                            : "bg-warm-bg text-warm-grey/50 cursor-not-allowed shadow-none"
                          }`}
                      >
                        {loading ? strings.btnGenerating : strings.btnGenerate}
                        {loading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: OUTPUT RESULTS ── */}
                {currentStep === 4 && generatedResult && (
                  <div className="space-y-6 animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-border/50 pb-4">
                      <div>
                        <h2 className="text-2xl font-black font-display text-warm-charcoal tracking-tight flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-sage-light text-sage">
                            <CheckCircle className="h-6 w-6" />
                          </div>
                          {strings.outputHeading}
                        </h2>
                        <p className="text-sm text-warm-grey font-medium leading-normal mt-1">
                          {strings.outputSub}
                        </p>
                      </div>
                      <button
                        id="step4_back_btn"
                        onClick={() => setCurrentStep(3)}
                        className="text-sm px-4 py-2 text-warm-grey hover:text-warm-charcoal border border-warm-border rounded-xl font-bold flex items-center gap-2 bg-white cursor-pointer transition-all hover:bg-warm-bg active:scale-95"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {strings.changeDetails}
                      </button>
                    </div>

                    {/* Output Tab Switcher */}
                    <div className="flex bg-warm-bg p-1.5 rounded-2xl gap-1.5 border border-warm-border">
                      {(docType === "complaint" || docType === "both") && (
                        <button
                          id="btn_subtab_complaint"
                          onClick={() => {
                            setActiveDocSubTab("complaint");
                            setIsEditingDraft(false);
                          }}
                          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold transition-all rounded-xl cursor-pointer ${activeDocSubTab === "complaint" ? "bg-white text-warm-charcoal shadow-xs" : "text-warm-grey hover:text-warm-charcoal"
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
                          className={`flex-1 py-2.5 text-xs sm:text-sm font-bold transition-all rounded-xl cursor-pointer ${activeDocSubTab === "rti" ? "bg-white text-warm-charcoal shadow-xs" : "text-warm-grey hover:text-warm-charcoal"
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
                        className={`flex-1 py-2.5 text-xs sm:text-sm font-bold transition-all rounded-xl cursor-pointer ${activeDocSubTab === "summary" ? "bg-white text-warm-charcoal shadow-xs" : "text-warm-grey hover:text-warm-charcoal"
                          }`}
                      >
                        {strings.tabDocSummary}
                      </button>
                    </div>

                    {/* ── Document Preview (Paper Style) ── */}
                    <div className="paper-preview p-6 sm:p-8 overflow-hidden">

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-warm-border/50">
                        {/* Status Label */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-sage-light rounded-full text-xs border border-sage/15">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-sage"></span>
                          </span>
                          <span className="text-sage-dark font-bold">
                            {isEditingDraft ? strings.sandboxActiveLabel : strings.draftLockedLabel}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            id="btn_edit_toggle_draft"
                            onClick={() => setIsEditingDraft(!isEditingDraft)}
                            className={`${isEditingDraft ? "bg-saffron text-white" : "bg-warm-bg hover:bg-warm-border text-warm-charcoal"
                              } px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95`}
                          >
                            <FileText className="h-3.5 w-3.5" />
                            {isEditingDraft ? strings.btnFinishEditing : strings.btnEditDraft}
                          </button>

                          <button
                            id="btn_copy_document"
                            onClick={() => {
                              const curText = activeDocSubTab === "complaint" ? editableComplaint : activeDocSubTab === "rti" ? editableRti : editableSummary;
                              copyTextToClipboard(curText);
                            }}
                            className={`${copiedStatus ? "bg-sage text-white" : "bg-warm-bg hover:bg-warm-border text-warm-charcoal"
                              } px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95`}
                          >
                            {copiedStatus ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            {copiedStatus ? strings.btnCopied : strings.btnCopy}
                          </button>

                          <button
                            id="btn_download_document"
                            onClick={() => {
                              const curText = activeDocSubTab === "complaint" ? editableComplaint : activeDocSubTab === "rti" ? editableRti : editableSummary;
                              const title = activeDocSubTab === "complaint" ? "Complaint Letter" : activeDocSubTab === "rti" ? "RTI Application" : "Citizen Advisory";
                              downloadTextFile(title, curText);
                            }}
                            className={`${downloadStatus ? "bg-sage text-white" : "bg-warm-bg hover:bg-warm-border text-warm-charcoal"
                              } px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95`}
                          >
                            {downloadStatus ? <CheckCircle className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                            {downloadStatus ? strings.btnDownloaded : strings.btnDownload}
                          </button>

                          <button
                            id="btn_print_draft"
                            onClick={() => {
                              window.print();
                            }}
                            className="bg-warm-bg hover:bg-warm-border text-warm-charcoal px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 border border-warm-border"
                          >
                            <Printer className="h-3.5 w-3.5 text-saffron" />
                            {strings.btnPrintPetition}
                          </button>
                        </div>
                      </div>

                      {/* Document Content */}
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
                          className="w-full min-h-[380px] bg-warm-bg border border-warm-border text-warm-charcoal text-sm p-5 focus:ring-2 focus:ring-saffron/30 rounded-xl leading-relaxed resize-y focus:outline-none transition-all"
                        />
                      ) : (
                        <div className="whitespace-pre-wrap max-h-[480px] overflow-y-auto pr-2 leading-relaxed text-warm-charcoal select-text text-sm font-sans">
                          {activeDocSubTab === "complaint" && editableComplaint}
                          {activeDocSubTab === "rti" && editableRti}
                          {activeDocSubTab === "summary" && editableSummary}
                        </div>
                      )}
                    </div>

                    {/* Department metadata */}
                    {generatedResult.department && (
                      <div className="card-warm p-6 space-y-4">
                        <span className="text-warm-grey font-bold block text-xs uppercase tracking-wider">
                          {strings.nodalOfficeTargets}
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <span className="text-warm-grey text-sm block">{strings.expectedRes}</span>
                            <span className="text-saffron-dark font-black text-base flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {generatedResult.department.expectedResolutionDays} {strings.daysGuaranteeSLA}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-warm-grey text-sm block">{strings.helplinePhone}</span>
                            <span className="text-sage font-black text-base flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {generatedResult.department.helpline}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-warm-border text-sm">
                          <p className="font-bold text-warm-charcoal">
                            {lang === "bn" ? generatedResult.department.departmentName_bn : lang === "hi" ? generatedResult.department.departmentName_hi : lang === "mr" ? generatedResult.department.departmentName_mr : generatedResult.department.departmentName}
                          </p>
                          <p className="text-warm-grey mt-1 leading-relaxed">
                            {lang === "bn" ? generatedResult.department.address_bn : lang === "hi" ? generatedResult.department.address_hi : lang === "mr" ? generatedResult.department.address_mr : generatedResult.department.address}
                          </p>
                        </div>

                        <div className="pt-2">
                          <a
                            id="portal_link_anchor"
                            href={generatedResult.department.portalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-saffron-50 border border-warm-border px-5 py-2.5 rounded-xl font-bold text-saffron-dark inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-sm active:scale-95 text-sm"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {strings.portalLink}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Milestones Checklist */}
                    <div className="card-warm p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-warm-border/50 pb-3">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="h-5 w-5 text-saffron" />
                          <h3 className="font-display font-black text-warm-charcoal text-base">
                            {strings.milestonesTitle}
                          </h3>
                        </div>
                        <span className="text-xs text-saffron-dark bg-saffron-50 px-3 py-1 rounded-full font-bold border border-saffron-light/40 select-none">
                          {`${checklistItems.filter(i => i.done).length} / ${checklistItems.length}`}
                        </span>
                      </div>
                      <p className="text-sm text-warm-grey leading-relaxed">
                        {strings.milestonesSubtitle}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {checklistItems.map((item, index) => {
                          const itemText = lang === "bn" ? item.text_bn : lang === "hi" ? item.text_hi : lang === "mr" ? item.text_mr : item.text_en;
                          return (
                            <label
                              key={item.id}
                              className={`flex items-start gap-3.5 p-4 rounded-xl border-2 transition-all cursor-pointer ${item.done ? "border-sage/30 bg-sage-light shadow-xs" : "border-warm-border bg-white hover:bg-warm-bg"
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
                                className="mt-0.5 h-5 w-5 rounded border-warm-border text-sage accent-sage cursor-pointer shrink-0"
                              />
                              <div className="flex-1 select-none">
                                <p className={`text-sm leading-relaxed ${item.done ? "text-warm-grey line-through" : "text-warm-charcoal font-semibold"}`}>
                                  {itemText}
                                </p>
                                <p className="text-xs text-warm-grey/60 mt-1 uppercase tracking-wider font-semibold">
                                  {strings.milestoneLabelText} 0{index + 1}
                                </p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hidden print container */}
                    <div id="printable_legal_document_container" className="hidden whitespace-pre-wrap leading-relaxed text-warm-charcoal bg-white">
                      {activeDocSubTab === "complaint" ? editableComplaint : activeDocSubTab === "rti" ? editableRti : editableSummary}
                    </div>

                    {/* Citations panel */}
                    {generatedResult.sources && generatedResult.sources.length > 0 && (
                      <div className="bg-sage-light p-6 rounded-2xl border border-sage/15 space-y-4">
                        <h4 className="text-sm font-bold text-sage-dark uppercase tracking-wider flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-sage" />
                          {strings.groundingHeader}
                        </h4>
                        <p className="text-sage-dark text-sm leading-relaxed">
                          {strings.groundingAlert}
                        </p>

                        <div className="space-y-2.5 pt-1">
                          {generatedResult.sources.map((source, index) => {
                            const srcTitle = lang === "bn" ? (source.source_bn || source.source) : lang === "hi" ? (source.source_hi || source.source) : lang === "mr" ? (source.source_mr || source.source) : source.source;
                            const srcClause = lang === "bn" ? (source.clause_bn || source.clause) : lang === "hi" ? (source.clause_hi || source.clause) : lang === "mr" ? (source.clause_mr || source.clause) : source.clause;
                            const srcContent = lang === "bn" ? (source.content_bn || source.content) : lang === "hi" ? (source.content_hi || source.content) : lang === "mr" ? (source.content_mr || source.content) : source.content;

                            return (
                              <div key={index} className="bg-white p-4 rounded-xl border border-sage/10 text-sm text-warm-charcoal shadow-xs">
                                <p className="font-bold flex justify-between gap-2">
                                  <span>{index + 1}. {srcTitle}</span>
                                  <span className="text-sage bg-sage-light px-2 py-0.5 rounded-lg text-xs shrink-0">{srcClause}</span>
                                </p>
                                <p className="text-warm-grey mt-2 italic leading-relaxed text-xs border-l-2 border-sage/30 pl-3">
                                  &quot;{srcContent}&quot;
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="pt-2 flex justify-between">
                      <button
                        id="btn_back_to_form"
                        onClick={() => setCurrentStep(3)}
                        className="bg-white hover:bg-warm-bg border-2 border-warm-border text-warm-charcoal font-bold px-6 py-3 rounded-xl text-base transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <ArrowLeft className="h-5 w-5" />
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
                        className="bg-saffron hover:bg-saffron-dark text-white font-bold px-8 py-3 rounded-xl text-base transition-all cursor-pointer shadow-lg shadow-saffron/20 active:scale-95"
                      >
                        {strings.btnReset}
                      </button>
                    </div>

                  </div>
                )}

              </div>

            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="space-y-6">

              {/* Demo Case Studies */}
              <div className="card-warm p-6 space-y-4 bg-gradient-to-br from-white to-saffron-50/30">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-saffron text-white rounded-lg text-xs font-black">
                    DEMO
                  </span>
                  <h3 className="text-lg font-black font-display tracking-tight text-warm-charcoal">
                    {strings.demoScenariosTitle}
                  </h3>
                </div>
                <p className="text-warm-grey text-sm leading-relaxed">
                  {strings.demoScenariosSub}
                </p>

                <div className="space-y-3 pt-1">
                  <button
                    id="demo_scenario_1_btn"
                    onClick={() => applyDemoScenario(1)}
                    className="w-full text-left bg-white hover:bg-saffron-50 border border-warm-border p-4 rounded-xl transition-all cursor-pointer flex items-start gap-3.5 hover:border-saffron-light hover:shadow-xs group active:scale-[0.98]"
                  >
                    <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shrink-0 mt-0.5">
                      <Droplet className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-warm-charcoal group-hover:text-saffron-dark">{strings.demo1Title}</p>
                      <p className="text-xs text-warm-grey mt-1 leading-relaxed">{strings.demo1Desc}</p>
                    </div>
                  </button>

                  <button
                    id="demo_scenario_2_btn"
                    onClick={() => applyDemoScenario(2)}
                    className="w-full text-left bg-white hover:bg-saffron-50 border border-warm-border p-4 rounded-xl transition-all cursor-pointer flex items-start gap-3.5 hover:border-saffron-light hover:shadow-xs group active:scale-[0.98]"
                  >
                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 shrink-0 mt-0.5">
                      <Coins className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-warm-charcoal group-hover:text-saffron-dark">{strings.demo2Title}</p>
                      <p className="text-xs text-warm-grey mt-1 leading-relaxed">{strings.demo2Desc}</p>
                    </div>
                  </button>

                  <button
                    id="demo_scenario_3_btn"
                    onClick={() => applyDemoScenario(3)}
                    className="w-full text-left bg-white hover:bg-saffron-50 border border-warm-border p-4 rounded-xl transition-all cursor-pointer flex items-start gap-3.5 hover:border-saffron-light hover:shadow-xs group active:scale-[0.98]"
                  >
                    <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 shrink-0 mt-0.5">
                      <Milestone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-warm-charcoal group-hover:text-saffron-dark">{strings.demo3Title}</p>
                      <p className="text-xs text-warm-grey mt-1 leading-relaxed">{strings.demo3Desc}</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Real-time RAG Preview */}
              {problemDescription.length >= 8 && (
                <div className="card-warm p-5 space-y-3.5 animate-slide-in">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron"></span>
                    </span>
                    <span className="text-warm-grey font-bold block text-xs uppercase tracking-wider">
                      {strings.databaseCheckTitle}
                    </span>
                  </div>

                  <p className="text-sm text-warm-grey leading-relaxed">
                    {strings.databaseCheckDesc}
                  </p>

                  <div className="space-y-2 pt-1">
                    {manualRAGChunks.length > 0 ? (
                      manualRAGChunks.map((chunk: any, i: number) => {
                        const title = lang === "bn" ? chunk.source_bn : lang === "hi" ? chunk.source_hi : lang === "mr" ? chunk.source_mr : chunk.source;
                        const clause = lang === "bn" ? chunk.clause_bn : lang === "hi" ? chunk.clause_hi : lang === "mr" ? chunk.clause_mr : chunk.clause;
                        const content = lang === "bn" ? chunk.content_bn : lang === "hi" ? chunk.content_hi : lang === "mr" ? chunk.content_mr : chunk.content;

                        return (
                          <div key={i} className="p-3.5 bg-warm-bg border border-warm-border rounded-xl text-xs">
                            <div className="flex justify-between font-bold text-warm-charcoal gap-2">
                              <span className="truncate max-w-[170px]">{title}</span>
                              <span className="text-sage bg-sage-light px-2 py-0.5 rounded-lg shrink-0">{clause}</span>
                            </div>
                            <p className="text-warm-grey mt-2 select-all leading-relaxed italic border-l-2 border-saffron-light pl-2.5">
                              &quot;{content.slice(0, 115)}...&quot;
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-5 bg-warm-bg rounded-xl border border-dashed border-warm-border text-warm-grey text-sm">
                        {strings.scanningMatchedRules}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Municipal SLA Index */}
              <div className="card-warm p-6 space-y-4">
                <span className="text-warm-grey font-bold block text-xs uppercase tracking-wider border-b border-warm-border/50 pb-2.5">
                  {strings.municipalSlaTitle}
                </span>

                <p className="text-sm text-warm-grey leading-relaxed">
                  {strings.municipalSlaDesc}
                </p>

                <div className="space-y-3 text-sm">
                  {[
                    { name_en: "Water Supply Pipeline Burst", name_bn: "জল সরবরাহ পাইপলাইন মেরামতি", name_hi: "पेयजल पाइपलाइन मरम्मत", name_mr: "पाणी पुरवठा वाहिनी दुरुस्ती", sla: "24-48 Hours", color: "bg-sky-50 text-sky-800" },
                    { name_en: "Power Outage / Transformer", name_bn: "বিদ্যুৎ বিভ্রাট / ট্রান্সফরমার", name_hi: "बिजली ब्रेकडाउन / ट्रांसफार्मर", name_mr: "वीज खंडित / ट्रान्सफॉर्मर बिघाड", sla: "4-18 Hours", color: "bg-amber-50 text-amber-800" },
                    { name_en: "Road Potholes Repair", name_bn: "রাস্তার খানাখন্দ সংস্কার", name_hi: "सड़क के गड्ढे भरना", name_mr: "रस्त्यावरील खड्डे बुजवणे", sla: "48h - 14 Days", color: "bg-orange-50 text-orange-800" },
                    { name_en: "Sewerage & Drain De-clog", name_bn: "নর্দমা ও ড্রেন পরিষ্কার", name_hi: "सीवर व नाली सफाई", name_mr: "गटारे व सांडपाणी निचरा", sla: "48 Hours", color: "bg-blue-50 text-blue-800" },
                    { name_en: "Birth & Death Certificate", name_bn: "জন্ম ও মৃত্যু শংসাপত্র প্রদান", name_hi: "जन्म एवं मृत्यु प्रमाण पत्र", name_mr: "जन्म-मृत्यू दाखला वितरण", sla: "7 Days", color: "bg-teal-50 text-teal-800" },
                    { name_en: "RTI Statutory Response", name_bn: "আরটিআই উত্তর প্রদান", name_hi: "आरटीआई सूचना उत्तर", name_mr: "माहिती अधिकार उत्तर", sla: "30 Days (Mandated)", color: "bg-rose-50 text-rose-800" },
                  ].map((item, idx) => {
                    const itemName = lang === "bn" ? item.name_bn : lang === "hi" ? item.name_hi : lang === "mr" ? item.name_mr : item.name_en;
                    return (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-warm-border/30 last:border-0">
                        <span className="text-warm-grey">{itemName}</span>
                        <span className={`font-bold text-xs px-2.5 py-1 rounded-lg ${item.color}`}>{item.sla}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ── MY COMPLAINTS & DRAFTS ARCHIVE TAB ── */}
        {activeTab === "my_complaints" && (
          <div className="card-warm p-6 sm:p-8 space-y-6 animate-fade-in-up">
            <div className="border-b border-warm-border/50 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <h2 className="text-2xl font-black font-display text-warm-charcoal flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-saffron-50 text-saffron-dark">
                    <History className="h-6 w-6" />
                  </div>
                  {strings.tabMyComplaints}
                </h2>
                <p className="text-sm text-warm-grey font-medium leading-relaxed mt-1">
                  All your drafted grievance complaints and RTI petitions are saved here locally for fast re-printing and tracking.
                </p>
              </div>

              <button
                onClick={() => setActiveTab("create")}
                className="bg-saffron hover:bg-saffron-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
              >
                <Plus className="h-4 w-4" />
                {strings.btnStartOver}
              </button>
            </div>

            {savedComplaints.length === 0 ? (
              <div className="text-center py-12 bg-warm-bg rounded-2xl border border-dashed border-warm-border space-y-3">
                <FileText className="h-10 w-10 text-warm-grey mx-auto opacity-50" />
                <p className="font-bold text-warm-charcoal text-base">No saved drafts yet</p>
                <p className="text-sm text-warm-grey max-w-sm mx-auto">
                  When you draft an official complaint or RTI application, it will automatically appear here with full text and tracking ID.
                </p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="bg-saffron hover:bg-saffron-dark text-white font-bold px-6 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  Draft Your First Complaint
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedComplaints.map((item, index) => (
                  <div key={item.id || index} className="p-5 rounded-2xl border border-warm-border bg-white hover:bg-saffron-50/20 hover:shadow-sm transition-all space-y-3">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-saffron-50 text-saffron-dark rounded-lg text-xs font-black">
                          ID: {item.id}
                        </span>
                        <span className="text-xs text-warm-grey font-bold">
                          {item.date} • {item.state} ({item.district})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditableComplaint(item.complaintText);
                            setEditableRti(item.rtiText);
                            setEditableSummary(item.summaryText);
                            setGeneratedResult({
                              complaintText: item.complaintText,
                              rtiText: item.rtiText,
                              summaryText: item.summaryText,
                              department: null,
                              sources: [],
                            });
                            setCurrentStep(4);
                            setActiveTab("create");
                          }}
                          className="px-3.5 py-1.5 bg-saffron-50 hover:bg-saffron text-saffron-dark hover:text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          View Draft
                        </button>

                        <button
                          onClick={() => {
                            downloadTextFile(`Complaint_${item.id}`, item.complaintText || item.rtiText);
                          }}
                          className="p-1.5 text-warm-grey hover:text-warm-charcoal border border-warm-border rounded-lg transition-colors cursor-pointer"
                          title="Download Text File"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-warm-charcoal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── RIGHTS TAB ── */}
        {activeTab === "rights" && (
          <div className="card-warm p-6 sm:p-8 space-y-6 animate-fade-in-up">
            <div className="border-b border-warm-border/50 pb-4">
              <h2 className="text-2xl font-black font-display text-warm-charcoal flex items-center gap-3">
                <div className="p-2 rounded-xl bg-saffron-50 text-saffron-dark">
                  <BookOpen className="h-6 w-6" />
                </div>
                {strings.rightsHeader}
              </h2>
              <p className="text-sm text-warm-grey font-medium leading-relaxed mt-2">
                {strings.rightsSub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title_en: "Maharashtra Right to Public Services Act 2015",
                  title_bn: "মহারাষ্ট্র জনসেবার অধিকার আইন ২০১৫",
                  title_hi: "महाराष्ट्र लोकसेवा हक्क अधिनियम 2015",
                  title_mr: "महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५",
                  time: "3-7 Days Statutory Deadline",
                  law: "Maharashtra Act No. XXXI of 2015",
                  desc_en: "Guarantees time-bound delivery of notified public services by BMC, PMC, TMC, and rural bodies with strict accountability and appellate penalties for delayed officers.",
                  desc_bn: "পৌরসভা ও পঞ্চায়েতের জনসেবা প্রদানে নির্দিষ্ট সময়সীমার আইনি নিশ্চয়তা প্রদান করে। বিলম্ব হলে সংশ্লিষ্ট আধিকারিকের বিরুদ্ধে জরিমানার ব্যবস্থা রয়েছে।",
                  desc_hi: "नगर निगम एवं सरकारी विभागों द्वारा निश्चित समय सीमा में सेवा प्रदान करने की कानूनी गारंटी देता है।",
                  desc_mr: "महानगरपालिका व शासकीय कार्यालयांकडून वेळेत सेवा मिळण्याची कायदेशीर हमी देते. दिरंगाई करणाऱ्या अधिकाऱ्यांवर दंडात्मक कारवाईची तरतूद.",
                  tag: "RTS Maharashtra"
                },
                {
                  title_en: "KMC Water Supply Code & Potability SLA",
                  title_bn: "কলকাতা পৌরনিগম জল সরবরাহ সময়সীমা (SLA)",
                  title_hi: "कोलकाता नगर निगम जल आपूर्ति संहिता",
                  title_mr: "कोलकाता महानगरपालिका पाणी पुरवठा सनद",
                  time: "24 Hours Response",
                  law: "KMC Water Code Rule 3.1",
                  desc_en: "Mandates prompt restoration of pipeline breakdowns within 24 working hours and chlorination testing for dirty/turbid tap lines upon grievance registration.",
                  desc_bn: "২৪ ঘণ্টার মধ্যে পাইপলাইনের বিকল মেরামত এবং দূষিত জলের ক্ষেত্রে ক্লোরিনেশন পরীক্ষার নির্দেশ দেয়।",
                  desc_hi: "24 घंटे में पाइपलाइन लीकेज मरम्मत और दूषित पानी की जांच की गारंटी।",
                  desc_mr: "२४ तासांत पाणी वाहिनी दुरुस्ती व दूषित पाण्याची तपासणी अनिवार्य.",
                  tag: "Water SLA"
                },
                {
                  title_en: "RTI Act 2005 - Section 6(1) Right to Information",
                  title_bn: "RTI ধারা ৬(১) তথ্য চাওয়ার সাধারণ অধিকার",
                  title_hi: "आरटीआई धारा 6(1) सूचना मांगने का मौलिक अधिकार",
                  title_mr: "माहिती अधिकार कलम ६(१) माहिती मागण्याचा अधिकार",
                  time: "30 Days Action",
                  law: "Central RTI Act 2005",
                  desc_en: "Any citizen can demand certified copies of government files, repair expense vouchers, muster rolls, and contractor tenders without stating any personal reason.",
                  desc_bn: "যেকোনো নাগরিক কোনো ব্যক্তিগত কারণ দর্শানো ছাড়াই সরকারি বিল, টেন্ডার ও খরচের সার্টিফায়েড নথি চাইতে পারেন।",
                  desc_hi: "कोई भी नागरिक बिना कारण बताए सरकारी फाइलों, टेंडरों और खर्च के प्रमाणित दस्तावेज मांग सकता है।",
                  desc_mr: "कोणताही नागरिक कारण न देता सरकारी फाइल्स, खर्च आणि निविदांची प्रमाणित प्रत मागू शकतो.",
                  tag: "RTI General"
                },
                {
                  title_en: "RTI Act 2005 - Section 7(1) Life and Liberty Clause",
                  title_bn: "RTI ধারা ৭(১) জীবন ও ব্যক্তিগত স্বাধীনতা সংক্রান্ত ছাড়",
                  title_hi: "आरटीआई धारा 7(1) जीवन एवं स्वतंत्रता आपातकालीन खंड",
                  title_mr: "माहिती अधिकार कलम ७(१) जीवित व स्वातंत्र्याशी संबंधित कलम",
                  time: "48 Hours Action Deadline",
                  law: "Central RTI Act 2005",
                  desc_en: "If requested information directly concerns the fundamental life or bodily liberty of a person, the response must strictly be provided within 48 hours by the PIO.",
                  desc_bn: "তথ্য যদি ব্যক্তির জীবন বা স্বাধীনতার সাথে সম্পর্কিত হয়, তবে ৪৮ ঘণ্টার মধ্যে তথ্য সরবরাহ করতে হবে।",
                  desc_hi: "यदि सूचना किसी व्यक्ति के जीवन या स्वतंत्रता से संबंधित है, तो 48 घंटे में सूचना देना अनिवार्य है।",
                  desc_mr: "माहिती व्यक्तीच्या जीविताशी संबंधित असल्यास ४८ तासांत माहिती देणे बंधनकारक आहे.",
                  tag: "RTI Emergency"
                }
              ].map((record, k) => {
                const title = lang === "bn" ? record.title_bn : lang === "hi" ? record.title_hi : lang === "mr" ? record.title_mr : record.title_en;
                const desc = lang === "bn" ? record.desc_bn : lang === "hi" ? record.desc_hi : lang === "mr" ? record.desc_mr : record.desc_en;

                return (
                  <div key={k} className={`p-5 rounded-2xl border border-warm-border bg-white hover:bg-saffron-50/30 hover:shadow-xs transition-all relative animate-fade-in-up stagger-${k + 1}`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-saffron-50 text-saffron-dark rounded-lg text-xs font-bold">
                        {record.tag}
                      </span>
                      <span className="text-rose-700 font-bold text-xs bg-rose-50 px-2.5 py-1 rounded-lg">
                        {record.time}
                      </span>
                    </div>

                    <h3 className="font-bold text-warm-charcoal text-base mb-1">{title}</h3>
                    <p className="text-xs text-saffron font-semibold mb-3">{record.law}</p>
                    <p className="text-sm text-warm-grey leading-relaxed">{desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="p-5 bg-amber-50 text-amber-900 rounded-2xl border border-amber-200 flex gap-4 items-start leading-relaxed">
              <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-base">{strings.bplWaiverTitle}</span>
                <p className="mt-1.5 text-sm text-amber-800">
                  {strings.bplWaiverDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── HELPLINES TAB ── */}
        {activeTab === "helplines" && (
          <div className="card-warm p-6 sm:p-8 space-y-6 animate-fade-in-up">
            <div className="border-b border-warm-border/50 pb-4">
              <h2 className="text-2xl font-black font-display text-warm-charcoal flex items-center gap-3">
                <div className="p-2 rounded-xl bg-saffron-50 text-saffron-dark">
                  <PhoneCall className="h-6 w-6" />
                </div>
                {strings.tabHelplines}
              </h2>
              <p className="text-sm text-warm-grey font-medium leading-relaxed mt-2">
                {strings.helplinesSub}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  org_en: "Brihanmumbai Corp (BMC) Control",
                  org_bn: "বৃহন্মুম্বাই পৌরনিগম (BMC) হেল্পলাইন",
                  org_hi: "बृहन्मुंबई नगर निगम (बीएमसी) कंट्रोल",
                  org_mr: "बृहन्मुंबई महानगरपालिका (BMC) नियंत्रण कक्ष",
                  number: "1916",
                  purpose_en: "Civic emergencies, water, drainage & roads",
                  purpose_bn: "জরুরি পৌর সমস্যা, জল ও নিকাশি",
                  purpose_hi: "जल, सड़क एवं आपातकालीन सेवाएं",
                  purpose_mr: "पाणी, रस्ते, सांडपाणी व आपत्कालीन तक्रारी",
                  area_en: "Mumbai, Maharashtra",
                  area_bn: "মুম্বাই, মহারাষ্ট্র",
                  area_hi: "मुंबई, महाराष्ट्र",
                  area_mr: "मुंबई, महाराष्ट्र",
                  icon: Building2
                },
                {
                  org_en: "Maharashtra Electricity (MSEDCL / Mahavitaran)",
                  org_bn: "মহাবিতরণ বিদ্যুৎ হেল্পডেস্ক (MSEDCL)",
                  org_hi: "महावितरण विद्युत वितरण हेल्पलाइन",
                  org_mr: "महावितरण वीज तक्रार निवारण कक्ष",
                  number: "1800-233-3435",
                  purpose_en: "Power breakdown, fuse, billing",
                  purpose_bn: "বিদ্যুৎ বিভ্রাট ও বিলিং সংক্রান্ত",
                  purpose_hi: "बिजली ब्रेकडाउन एवं बिल सुधार",
                  purpose_mr: "वीज खंडित, फ्युज व बिलिंग तक्रारी",
                  area_en: "State-wide, Maharashtra",
                  area_bn: "সমগ্র মহারাষ্ট্র",
                  area_hi: "समग्र महाराष्ट्र",
                  area_mr: "संपूर्ण महाराष्ट्र",
                  icon: Zap
                },
                {
                  org_en: "Kolkata Municipal Corporation (KMC)",
                  org_bn: "কলকাতা পৌরনিগম (KMC) হেল্পলাইন",
                  org_hi: "कोलकाता नगर निगम (केएमसी) कंट्रोल",
                  org_mr: "कोलकाता महानगरपालिका (KMC)",
                  number: "1800-103-4444",
                  purpose_en: "Civic grievances, water supply, SWM",
                  purpose_bn: "নাগরিক অভিযোগ ও জল সরবরাহ",
                  purpose_hi: "नागरिक शिकायत एवं जल आपूर्ति",
                  purpose_mr: "नागरी तक्रारी व पाणी पुरवठा",
                  area_en: "Kolkata, West Bengal",
                  area_bn: "কলকাতা, পশ্চিমবঙ্গ",
                  area_hi: "कोलकाता, पश्चिम बंगाल",
                  area_mr: "कोलकाता, पश्चिम बंगाल",
                  icon: Building2
                },
                {
                  org_en: "WB Electricity Support (WBSEDCL)",
                  org_bn: "বিদ্যুৎ পর্ষদ হেল্পডেস্ক (WBSEDCL)",
                  org_hi: "पश्चिम बंगाल विद्युत निगम",
                  org_mr: "पश्चिम बंगाल वीज महामंडळ",
                  number: "19121",
                  purpose_en: "Power disruptions & lines safety",
                  purpose_bn: "বিদ্যুৎ বিভ্রাট ও তারের সুরক্ষা",
                  purpose_hi: "बिजली कटौती एवं सुरक्षा",
                  purpose_mr: "वीज पुरवठा खंडित तक्रारी",
                  area_en: "State-wide, West Bengal",
                  area_bn: "সমগ্র পশ্চিমবঙ্গ",
                  area_hi: "समग्र पश्चिम बंगाल",
                  area_mr: "संपूर्ण पश्चिम बंगाल",
                  icon: Zap
                },
                {
                  org_en: "National Social Assistance Office",
                  org_bn: "জাতীয় সামাজিক সহায়তা কেন্দ্র",
                  org_hi: "राष्ट्रीय सामाजिक सहायता केंद्र",
                  org_mr: "राष्ट्रीय सामाजिक सहाय्यता कक्ष",
                  number: "1800-11-1555",
                  purpose_en: "Senior citizen & widow pensions",
                  purpose_bn: "বার্ধক্য ও বিধবা ভাতা সংক্রান্ত",
                  purpose_hi: "वृद्धावस्था एवं विधवा पेंशन",
                  purpose_mr: "वृद्ध व विधवा पेन्शन चौकशी",
                  area_en: "National / India",
                  area_bn: "জাতীয় / সমগ্র ভারত",
                  area_hi: "राष्ट्रीय / संपूर्ण भारत",
                  area_mr: "राष्ट्रीय / संपूर्ण भारत",
                  icon: Users
                },
                {
                  org_en: "Jal Jeevan Drinking Water Mission",
                  org_bn: "জল জীবন মিশন সহায়তা",
                  org_hi: "जल जीवन मिशन पेयजल डेस्क",
                  org_mr: "जल जीवन मिशन पाणी पुरवठा कक्ष",
                  number: "1800-180-3535",
                  purpose_en: "Potable tap water pipeline schemes",
                  purpose_bn: "পানীয় জল পাইপলাইন সংযোগ",
                  purpose_hi: "पेयजल पाइपलाइन योजना",
                  purpose_mr: "पिण्याचे पाणी पाईपलाईन योजना",
                  area_en: "National / All States",
                  area_bn: "জাতীয় / সকল রাজ্য",
                  area_hi: "राष्ट्रीय / सभी राज्य",
                  area_mr: "राष्ट्रीय / सर्व राज्ये",
                  icon: Waves
                },
              ].map((h, index) => {
                const HelplineIcon = h.icon;
                const org = lang === "bn" ? h.org_bn : lang === "hi" ? h.org_hi : lang === "mr" ? h.org_mr : h.org_en;
                const purpose = lang === "bn" ? h.purpose_bn : lang === "hi" ? h.purpose_hi : lang === "mr" ? h.purpose_mr : h.purpose_en;
                const area = lang === "bn" ? h.area_bn : lang === "hi" ? h.area_hi : lang === "mr" ? h.area_mr : h.area_en;

                return (
                  <div key={index} className={`card-warm p-5 relative overflow-hidden hover:shadow-md transition-all animate-fade-in-up stagger-${index + 1}`}>
                    {/* Tricolor top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tricolor-saffron via-white to-tricolor-green"></div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-saffron-50 text-saffron-dark">
                        <HelplineIcon className="h-5 w-5" />
                      </div>
                      <p className="font-bold text-warm-charcoal text-sm">
                        {org}
                      </p>
                    </div>
                    <p className="text-warm-grey text-xs uppercase tracking-wider font-semibold mb-3">
                      {area} • {purpose}
                    </p>
                    <a
                      href={`tel:${h.number}`}
                      className="text-saffron-dark font-black text-lg flex items-center gap-2 hover:text-saffron transition-colors"
                    >
                      <Phone className="h-5 w-5 text-saffron" />
                      {h.number}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* ─── CITIZEN PROFILE MODAL (Auto-fill Database) ─── */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-warm-charcoal/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl border border-warm-border shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 relative my-8">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-warm-grey hover:text-warm-charcoal hover:bg-warm-bg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-warm-border/60 pb-4">
              <div className="p-2.5 rounded-2xl bg-saffron-50 text-saffron-dark">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display font-black text-xl text-warm-charcoal">
                  {strings.profileTitle}
                </h3>
                <p className="text-xs text-warm-grey mt-0.5">
                  {strings.profileSubtitle}
                </p>
              </div>
            </div>

            {profileSavedNotice && (
              <div className="p-3 bg-sage-light text-sage-dark rounded-xl border border-sage/20 text-xs sm:text-sm font-bold flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-sage" />
                <span>{strings.profileSavedNotice}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-warm-charcoal block text-xs">
                    {strings.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="e.g. Ramesh Chandra Mondal"
                    className="w-full bg-warm-bg border border-warm-border rounded-xl p-3 font-semibold focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-warm-charcoal block text-xs">
                    {strings.mobileNumber} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="e.g. 98301XXXXX"
                    className="w-full bg-warm-bg border border-warm-border rounded-xl p-3 font-semibold focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-warm-charcoal block text-xs">
                  {strings.fullAddress} *
                </label>
                <input
                  type="text"
                  required
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  placeholder="e.g. Flat 3B, Shanti Niketan, Rabindra Sarani"
                  className="w-full bg-warm-bg border border-warm-border rounded-xl p-3 font-semibold focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-warm-charcoal block text-xs">
                    {strings.wardVillage}
                  </label>
                  <input
                    type="text"
                    value={profile.wardVillage}
                    onChange={(e) => setProfile({ ...profile, wardVillage: e.target.value })}
                    placeholder="e.g. Ward 85"
                    className="w-full bg-warm-bg border border-warm-border rounded-xl p-3 font-semibold focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-warm-charcoal block text-xs">
                    City / District
                  </label>
                  <input
                    type="text"
                    value={profile.district}
                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                    placeholder="e.g. Kolkata"
                    className="w-full bg-warm-bg border border-warm-border rounded-xl p-3 font-semibold focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-warm-charcoal block text-xs">
                    {strings.pincode}
                  </label>
                  <input
                    type="text"
                    value={profile.pincode}
                    onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                    placeholder="e.g. 700029"
                    className="w-full bg-warm-bg border border-warm-border rounded-xl p-3 font-semibold focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                  />
                </div>
              </div>

              {/* BPL Checkbox */}
              <div className="p-4 bg-warm-bg rounded-2xl border border-warm-border space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.isBpl}
                    onChange={(e) => setProfile({ ...profile, isBpl: e.target.checked })}
                    className="h-4 w-4 rounded border-warm-border text-saffron accent-saffron cursor-pointer"
                  />
                  <span className="font-bold text-warm-charcoal text-xs sm:text-sm">
                    {strings.bplQuestion}
                  </span>
                </label>

                {profile.isBpl && (
                  <div className="space-y-1.5 pt-1 animate-fade-in">
                    <label className="font-bold text-warm-charcoal block text-xs">
                      {strings.bplCardNo}
                    </label>
                    <input
                      type="text"
                      value={profile.bplNumber}
                      onChange={(e) => setProfile({ ...profile, bplNumber: e.target.value })}
                      placeholder="e.g. WB-BPL-2024-883921"
                      className="w-full bg-white border border-warm-border rounded-xl p-2.5 font-semibold focus:ring-2 focus:ring-saffron/30 focus:border-saffron text-xs sm:text-sm"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-warm-border font-bold text-warm-charcoal hover:bg-warm-bg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-saffron hover:bg-saffron-dark text-white font-bold px-7 py-2.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {strings.saveProfileBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-warm-border bg-white mt-16">
        {/* Tricolor stripe */}
        <div className="h-1 bg-gradient-to-r from-tricolor-saffron via-white to-tricolor-green"></div>
        <div className="py-8 px-4 text-center">
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-3 sm:flex-row text-sm text-warm-grey">
            <p>{strings.footerText1}</p>
            <p>{strings.footerText2}</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
