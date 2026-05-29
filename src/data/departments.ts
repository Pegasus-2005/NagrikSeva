/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DepartmentInfo {
  departmentName: string;
  departmentName_bn: string;
  portalUrl: string;
  helpline: string;
  expectedResolutionDays: number;
  designation: string;
  designation_bn: string;
  address: string;
  address_bn: string;
}

export const DEPARTMENTS_DIRECTORY: Record<string, Record<string, DepartmentInfo>> = {
  "West Bengal": {
    "water_supply": {
      "departmentName": "Kolkata Municipal Corporation - Water Supply Department",
      "departmentName_bn": "কলকাতা পৌরনিগম - জল সরবরাহ বিভাগ",
      "portalUrl": "https://www.kmcgov.in/",
      "helpline": "1800-102-4444",
      "expectedResolutionDays": 3,
      "designation": "The Executive Engineer, Water Supply Department",
      "designation_bn": "সহকারী প্রকৌশলী, জল সরবরাহ বিভাগ",
      "address": "5, S.N. Banerjee Road, Kolkata, West Bengal - 700013",
      "address_bn": "৫, এস.এন. ব্যানার্জী রোড, কলকাতা, পশ্চিমবঙ্গ - ৭০০০১৩"
    },
    "electricity": {
      "departmentName": "West Bengal State Electricity Distribution Company Limited (WBSEDCL)",
      "departmentName_bn": "পশ্চিমবঙ্গ রাজ্য বিদ্যুৎ বন্টন সংস্থা লিমিটেড (WBSEDCL)",
      "portalUrl": "https://www.wbsedcl.in/",
      "helpline": "19121",
      "expectedResolutionDays": 2,
      "designation": "The Assistant Engineer & Station Manager",
      "designation_bn": "সহকারী প্রকৌশলী এবং স্টেশন ম্যানেজার",
      "address": "Bidyut Bhavan, Block DJ, Sector II, Bidhannagar, Kolkata - 700091",
      "address_bn": "বিদ্যুৎ ভবন, ব্লক DJ, সেক্টর II, বিধাননগর, কলকাতা - ৭০০০৯১"
    },
    "roads": {
      "departmentName": "Public Works Department (PWD), Government of West Bengal",
      "departmentName_bn": "গণপূর্ত বিভাগ (PWD), পশ্চিমবঙ্গ সরকার",
      "portalUrl": "https://www.pwdwb.in/",
      "helpline": "1800-345-5555",
      "expectedResolutionDays": 15,
      "designation": "The Executive Engineer, PWD Division",
      "designation_bn": "নির্বাহী প্রকৌশলী, পিডাব্লুডি বিভাগ",
      "address": "Nabanita Building, Writers' Buildings, Kolkata - 700001",
      "address_bn": "নবানী ভবন, মহাকরণ (রাইটার্স বিল্ডিংস), কলকাতা - ৭০০০০১"
    },
    "garbage": {
      "departmentName": "Kolkata Municipal Corporation - Solid Waste Management Department",
      "departmentName_bn": "কলকাতা পৌরনিগম - কঠিন বর্জ্য ব্যবস্থাপনা বিভাগ",
      "portalUrl": "https://www.kmcgov.in/",
      "helpline": "1800-103-4444",
      "expectedResolutionDays": 1,
      "designation": "The Chief Engineer, Solid Waste Management",
      "designation_bn": "প্রধান প্রকৌশলী, কঠিন বর্জ্য ব্যবস্থাপনা",
      "address": "48, Market Street, Kolkata, West Bengal - 700087",
      "address_bn": "৪৮, মার্কেট স্ট্রিট, কলকাতা, পশ্চিমবঙ্গ - ৭০০০৮৭"
    },
    "drainage": {
      "departmentName": "Kolkata Municipal Corporation - Sewerage and Drainage Department",
      "departmentName_bn": "কলকাতা পৌরনিগম - নিকাশি ও নর্দমা প্রণালী বিভাগ",
      "portalUrl": "https://www.kmcgov.in/",
      "helpline": "033-2286-1000",
      "expectedResolutionDays": 5,
      "designation": "The Executive Engineer, Drainage Division",
      "designation_bn": "নির্বাহী প্রকৌশলী, নিকাশি বিভাগ",
      "address": "5, S.N. Banerjee Road, Kolkata, West Bengal - 700013",
      "address_bn": "৫, এস.এন. ব্যানার্জী রোড, কলকাতা, পশ্চিমবঙ্গ - ৭০০০১৩"
    },
    "certificates": {
      "departmentName": "Department of Health & Family Welfare (Birth/Death Registrar)",
      "departmentName_bn": "স্বাস্থ্য ও পরিবার কল্যাণ দপ্তর (জন্ম-মৃত্যু নিবন্ধক কার্যালয়)",
      "portalUrl": "https://www.wbhealth.gov.in/",
      "helpline": "1800-3134-44222",
      "expectedResolutionDays": 7,
      "designation": "The Sub-Registrar of Births & Deaths",
      "designation_bn": "জন্ম ও মৃত্যু সাব-রেজিস্ট্রার",
      "address": "Swasthya Bhawan, GN-29, Sector-V, Salt Lake, Kolkata - 700091",
      "address_bn": "স্বাস্থ্য ভবন, GN-২৯, সেক্টর-V, সল্টলেক, কলকাতা - ৭০০০৯১"
    },
    "pension": {
      "departmentName": "Department of Panchayats & Rural Development / Municipal Affairs",
      "departmentName_bn": "পঞ্চায়েত ও গ্রামীণ উন্নয়ন দপ্তর / পৌর বিষয়ক বিভাগ",
      "portalUrl": "https://www.wbprd.gov.in/",
      "helpline": "033-2248-1168",
      "expectedResolutionDays": 30,
      "designation": "The Block Development Officer (BDO) / Municipal Commissioner",
      "designation_bn": "ব্লক ডেভেলপমেন্ট অফিসার (BDO) / পৌর কমিশনার",
      "address": "Joint Administrative Building, HC-7, Sector-III, Salt Lake, Kolkata - 700106",
      "address_bn": "যৌথ প্রশাসনিক ভবন, HC-৭, সেক্টর-III, সল্টলেক, কলকাতা - ৭০০১০৬"
    },
  },
  "National/General": {
    "water_supply": {
      "departmentName": "Public Health Engineering Department (PHED) / Municipal Board",
      "departmentName_bn": "জনস্বাস্থ্য কারিগরি বিভাগ (PHED) / পৌর বোর্ড",
      "portalUrl": "https://jaljeevanmission.gov.in/",
      "helpline": "1800-180-3535",
      "expectedResolutionDays": 5,
      "designation": "The Executive Engineer, PHED",
      "designation_bn": "নির্বাহী প্রকৌশলী, পিএইচইডি (PHED)",
      "address": "Main Municipal Corporation Office, Central Division",
      "address_bn": "প্রধান পৌর কর্পোরেশন কার্যালয়, কেন্দ্রীয় বিভাগ"
    },
    "electricity": {
      "departmentName": "State Power Distribution Corporation Limited",
      "departmentName_bn": "রাজ্য বিদ্যুৎ বন্টন কর্পোরেশন লিমিটেড",
      "portalUrl": "https://www.powergrid.in/",
      "helpline": "1912",
      "expectedResolutionDays": 3,
      "designation": "The Assistant Engineer, Electrical Sub-division",
      "designation_bn": "সহকারী প্রকৌশলী, বিদ্যুৎ সাব-ডিভিশন",
      "address": "Main Power Grid Complex, Electricity Head Office",
      "address_bn": "প্রধান পাওয়ার গ্রিড কমপ্লেক্স, কেন্দ্রীয় বিদ্যুৎ কার্যালয়"
    },
    "roads": {
      "departmentName": "National Highways Authority of India (NHAI) / Municipal PWD",
      "departmentName_bn": "भारतीय জাতীয় সড়ক কর্তৃপক্ষ (NHAI) / পৌর পিডাব্লুডি (PWD)",
      "portalUrl": "https://nhai.gov.in/",
      "helpline": "1033",
      "expectedResolutionDays": 10,
      "designation": "The Executive Engineer, Public Works Department",
      "designation_bn": "নির্বাহী প্রকৌশলী, জনসেবা পূর্ত বিভাগ",
      "address": "PWD Division Office, District HQ",
      "address_bn": "পিডাব্লুডি রোড ডিভিশন অফিস, জেলা সদর"
    },
    "garbage": {
      "departmentName": "Municipal Corporation - Health & Sanitation Wing",
      "departmentName_bn": "পৌর কর্পোরেশন - স্বাস্থ্য ও স্যানিটেশন শাখা",
      "portalUrl": "https://swachhbharatmission.gov.in/",
      "helpline": "1969",
      "expectedResolutionDays": 2,
      "designation": "The Sanitary Inspector, Municipal Corporation",
      "designation_bn": "স্যানিটারি ইন্সপেক্টর, পৌর কর্পোরেশন",
      "address": "Local Municipal Ward Office",
      "address_bn": "স্থানীয় পৌর ওয়ার্ড অফিস"
    },
    "drainage": {
      "departmentName": "Municipal Corporation - Sewerage Division",
      "departmentName_bn": "পৌর কর্পোরেশন - নিকাশি বিভাগ",
      "portalUrl": "https://www.amrut.gov.in/",
      "helpline": "1800-345-1200",
      "expectedResolutionDays": 4,
      "designation": "The Assistant Engineer, Sewerage & Drainage Wing",
      "designation_bn": "সহকারী প্রকৌশলী, নিকাশি ও নগ্ন নিকাশ শাখা",
      "address": "Municipal Corporation Central Works Office",
      "address_bn": "পৌর কর্পোরেশন কেন্দ্রীয় ওয়ার্কস অফিস"
    },
    "certificates": {
      "departmentName": "Registrar of Births and Deaths, Municipal Office",
      "departmentName_bn": "জন্ম ও মৃত্যু নিবন্ধক, পৌর কার্যালয়",
      "portalUrl": "https://crsorgi.gov.in/",
      "helpline": "1800-11-0033",
      "expectedResolutionDays": 10,
      "designation": "The Registrar (Birth and Death Registration)",
      "designation_bn": "নিবন্ধক (জন্ম ও মৃত্যু নিবন্ধন)",
      "address": "Local Civil Registry Office, Municipal Building",
      "address_bn": "স্থানীয় সিভিল রেজিস্ট্রি অফিস, পৌর ভবন"
    },
    "pension": {
      "departmentName": "Department of Social Welfare & Pension Board",
      "departmentName_bn": "সমাজকল্যাণ অধিদপ্তর ও পেনশন বোর্ড",
      "portalUrl": "https://nsap.nic.in/",
      "helpline": "1800-11-1555",
      "expectedResolutionDays": 45,
      "designation": "The District Social Welfare Officer",
      "designation_bn": "জেলা সমাজকল্যাণ কর্মকর্তা",
      "address": "District Collectorate, Social Welfare Wing",
      "address_bn": "জেলা কালেক্টরেট, সমাজকল্যাণ শাখা"
    }
  }
};
