// src/serverApp.ts
import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// src/data/knowledgeBase.ts
var KNOWLEDGE_BASE = [
  {
    id: "wb_water_01",
    source: "Kolkata Municipal Corporation Citizen Charter (2023)",
    source_bn: "\u0995\u09B2\u0995\u09BE\u09A4\u09BE \u09AA\u09CC\u09B0\u09A8\u09BF\u0997\u09AE \u09B8\u09BF\u099F\u09BF\u099C\u09C7\u09A8 \u099A\u09BE\u09B0\u09CD\u099F\u09BE\u09B0 (\u09E8\u09E6\u09E8\u09E9)",
    section: "Water Supply standards",
    section_bn: "\u099C\u09B2 \u09B8\u09B0\u09AC\u09B0\u09BE\u09B9 \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE \u0993 \u09AA\u09B0\u09BF\u09B7\u09C7\u09AC\u09BE\u09B0 \u09AE\u09BE\u09A8\u09A6\u09A3\u09CD\u09A1",
    clause: "Clause 3.1",
    clause_bn: "\u09A7\u09BE\u09B0\u09BE \u09E9.\u09E7",
    content: "The Kolkata Municipal Corporation (KMC) is obligated to provide clean, potable water to all registered holdings. In the event of a total water supply breakdown, the Ward Health Inspector must be notified. Under Clause 3.1, standard pipeline repairs must be conducted and regular supply restored within 24 working hours.",
    content_bn: "\u0995\u09B2\u0995\u09BE\u09A4\u09BE \u09AA\u09CC\u09B0\u09A8\u09BF\u0997\u09AE (KMC) \u09B8\u09AE\u09B8\u09CD\u09A4 \u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u09BF\u09A4 \u09B9\u09CB\u09B2\u09CD\u09A1\u09BF\u0982\u09DF\u09C7 \u09AA\u09B0\u09BF\u099A\u09CD\u099B\u09A8\u09CD\u09A8 \u0993 \u09AA\u09BE\u09A8\u09C0\u09DF \u099C\u09B2 \u09B8\u09B0\u09AC\u09B0\u09BE\u09B9 \u0995\u09B0\u09A4\u09C7 \u09AC\u09BE\u09A7\u09CD\u09AF\u0964 \u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3 \u099C\u09B2 \u09B8\u09B0\u09AC\u09B0\u09BE\u09B9 \u09AC\u09A8\u09CD\u09A7 \u09B9\u0993\u09DF\u09BE\u09B0 \u0995\u09CD\u09B7\u09C7\u09A4\u09CD\u09B0\u09C7 \u09B8\u0982\u09B6\u09CD\u09B2\u09BF\u09B7\u09CD\u099F \u0993\u09DF\u09BE\u09B0\u09CD\u09A1 \u09B9\u09C7\u09B2\u09A5 \u0987\u09A8\u09CD\u09B8\u09AA\u09C7\u0995\u09CD\u099F\u09B0\u0995\u09C7 \u099C\u09BE\u09A8\u09BE\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u09A7\u09BE\u09B0\u09BE \u09E9.\u09E7 \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0, \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 \u09AA\u09BE\u0987\u09AA\u09B2\u09BE\u0987\u09A8 \u09AE\u09C7\u09B0\u09BE\u09AE\u09A4\u09BF\u09B0 \u0995\u09BE\u099C \u098F\u09AC\u0982 \u099C\u09B2 \u09B8\u09B0\u09AC\u09B0\u09BE\u09B9 \u09E8\u09EA \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09B8\u09CD\u09AC\u09BE\u09AD\u09BE\u09AC\u09BF\u0995 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
    keywords: ["water", "supply", "breakdown", "kmc", "pipeline", "repair", "drinking", "tap", "kolkata"]
  },
  {
    id: "wb_water_02",
    source: "West Bengal Municipal Service Rules & Standards",
    source_bn: "\u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 \u09AA\u09CC\u09B0\u09B8\u09C7\u09AC\u09BE \u09A8\u09BF\u09DF\u09AE\u09BE\u09AC\u09B2\u09C0 \u0993 \u09AE\u09BE\u09A8\u09A6\u09A3\u09CD\u09A1",
    section: "Public Health Engineering",
    section_bn: "\u099C\u09A8\u09B8\u09CD\u09AC\u09BE\u09B8\u09CD\u09A5\u09CD\u09AF \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2 \u09AC\u09BF\u09AD\u09BE\u0997",
    clause: "Section 4(II)",
    clause_bn: "\u09A7\u09BE\u09B0\u09BE \u09EA(II)",
    content: "Under Section 4(II), any municipal citizen experiencing water contamination or high iron content in their municipal tap can request safety testing and chlorination. Safe tap-water quality standards require iron content under 0.3 mg/l and zero residual chlorine smell. Action must be taken within 48 to 72 hours of receiving written complaint.",
    content_bn: "\u09A7\u09BE\u09B0\u09BE \u09EA(II) \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0, \u0995\u09CB\u09A8\u09CB \u09A8\u09BE\u0997\u09B0\u09BF\u0995 \u0995\u09B2 \u09A5\u09C7\u0995\u09C7 \u09A6\u09C2\u09B7\u09BF\u09A4 \u099C\u09B2 \u09AC\u09BE \u0985\u09A4\u09BF\u09B0\u09BF\u0995\u09CD\u09A4 \u0986\u09DF\u09B0\u09A8\u09AF\u09C1\u0995\u09CD\u09A4 \u09B2\u09BE\u09B2 \u099C\u09B2 \u09AA\u09C7\u09B2\u09C7 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A4\u09CD\u09A4\u09BE \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE \u0993 \u0995\u09CD\u09B2\u09CB\u09B0\u09BF\u09A8\u09C7\u09B6\u09A8\u09C7\u09B0 \u0985\u09A8\u09C1\u09B0\u09CB\u09A7 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8\u0964 \u09AA\u09BE\u09A8\u09C0\u09DF \u099C\u09B2\u09C7\u09B0 \u09AE\u09BE\u09A8\u09A6\u09A3\u09CD\u09A1 \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0 \u0986\u09DF\u09B0\u09A8 \u09E6.\u09E9 \u09AE\u09BF\u09B2\u09BF\u0997\u09CD\u09B0\u09BE\u09AE/\u09B2\u09BF\u099F\u09BE\u09B0\u09C7\u09B0 \u0995\u09AE \u098F\u09AC\u0982 \u09AC\u09CD\u09AF\u09BE\u0995\u099F\u09C7\u09B0\u09BF\u09DF\u09BE\u09AE\u09C1\u0995\u09CD\u09A4 \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u09B2\u09BF\u0996\u09BF\u09A4 \u0985\u09AD\u09BF\u09AF\u09CB\u0997 \u09AA\u09BE\u0993\u09DF\u09BE\u09B0 \u09EA\u09EE \u09A5\u09C7\u0995\u09C7 \u09ED\u09E8 \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09AA\u09A6\u0995\u09CD\u09B7\u09C7\u09AA \u09A8\u09BF\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
    keywords: ["water", "contamination", "chlorine", "iron", "smell", "chlorination", "dirty", "tap"]
  },
  {
    id: "wb_elec_01",
    source: "West Bengal Electricity Regulatory Commission (WBERC) Performance Standards",
    source_bn: "\u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 \u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09A8\u09BF\u09DF\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3 \u0995\u09AE\u09BF\u09B6\u09A8 (WBERC) \u0995\u09B0\u09CD\u09AE\u0995\u09CD\u09B7\u09AE\u09A4\u09BE \u09AA\u09CD\u09B0\u09AC\u09BF\u09A7\u09BE\u09A8",
    section: "Electricity Supply Guidelines",
    section_bn: "\u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09B8\u09B0\u09AC\u09B0\u09BE\u09B9 \u0997\u09BE\u0987\u09A1\u09B2\u09BE\u0987\u09A8",
    clause: "Regulation 5.2",
    clause_bn: "\u09AA\u09CD\u09B0\u09AC\u09BF\u09A7\u09BE\u09A8 \u09EB.\u09E8",
    content: "Under Regulation 5.2, power interruptions due to line fuse or transformer failure must be resolved by WBSEDCL or CESC within 4 hours in urban areas, and 24 hours in rural areas. Faulty meters must be inspected within 3 working days and replaced within 7 days of deposit fee payment.",
    content_bn: "\u09AA\u09CD\u09B0\u09AC\u09BF\u09A7\u09BE\u09A8 \u09EB.\u09E8 \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0, \u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09B2\u09BE\u0987\u09A8\u09C7\u09B0 \u09AB\u09BF\u0989\u099C \u09AC\u09BE \u099F\u09CD\u09B0\u09BE\u09A8\u09CD\u09B8\u09AB\u09B0\u09AE\u09BE\u09B0 \u09AC\u09BF\u0995\u09B2 \u09B9\u0993\u09DF\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u09B2\u09CB\u09A1\u09B6\u09C7\u09A1\u09BF\u0982 \u09B9\u09B2\u09C7 \u09B6\u09B9\u09B0\u09BE\u099E\u09CD\u099A\u09B2\u09C7 \u09EA \u0998\u09A3\u09CD\u099F\u09BE \u098F\u09AC\u0982 \u0997\u09CD\u09B0\u09BE\u09AE\u09BE\u099E\u09CD\u099A\u09B2\u09C7 \u09E8\u09EA \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 WBSEDCL \u09AC\u09BE CESC-\u0995\u09C7 \u09AA\u09B0\u09BF\u09B7\u09C7\u09AC\u09BE \u09B8\u09CD\u09AC\u09BE\u09AD\u09BE\u09AC\u09BF\u0995 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u09A4\u09CD\u09B0\u09C1\u099F\u09BF\u09AA\u09C2\u09B0\u09CD\u09A3 \u09AE\u09BF\u099F\u09BE\u09B0 \u09E9 \u0995\u09BE\u09B0\u09CD\u09AF\u09A6\u09BF\u09AC\u09B8\u09C7\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09AA\u09B0\u09BF\u09A6\u09B0\u09CD\u09B6\u09A8 \u098F\u09AC\u0982 \u099C\u09AE\u09BE \u09AB\u09BF \u09A6\u09C7\u0993\u09DF\u09BE\u09B0 \u09ED \u09A6\u09BF\u09A8\u09C7\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
    keywords: ["electricity", "power", "fuse", "transformer", "load", "blackout", "meter", "wbsedcl", "cesc"]
  },
  {
    id: "wb_elec_02",
    source: "West Bengal Electricity Safety & Billing Rules",
    source_bn: "\u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 \u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09A8\u09BF\u09B0\u09BE\u09AA\u09A4\u09CD\u09A4\u09BE \u0993 \u09AC\u09BF\u09B2\u09BF\u0982 \u09AC\u09BF\u09A7\u09BF",
    section: "Billing Disputes",
    section_bn: "\u09AC\u09BF\u09B2 \u09B8\u0982\u0995\u09CD\u09B0\u09BE\u09A8\u09CD\u09A4 \u09AC\u09BF\u09B0\u09CB\u09A7 \u09A8\u09BF\u09B7\u09CD\u09AA\u09A4\u09CD\u09A4\u09BF",
    clause: "Section 56(1)",
    clause_bn: "\u09A7\u09BE\u09B0\u09BE \u09EB\u09EC(\u09E7)",
    content: "Section 56(1) of the Electricity Act outlines that no power disconnection can happen without a 15-day clear written notice. If a consumer raises a billing dispute, WBSEDCL must offer a provisional bill correction based on prior 6 months' average consumption pending formal physical testing of the meter.",
    content_bn: "\u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u0986\u0987\u09A8\u09C7\u09B0 \u09A7\u09BE\u09B0\u09BE \u09EB\u09EC(\u09E7) \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0, \u09E7\u09EB \u09A6\u09BF\u09A8\u09C7\u09B0 \u09B8\u09CD\u09AA\u09B7\u09CD\u099F \u09B2\u09BF\u0996\u09BF\u09A4 \u09A8\u09CB\u099F\u09BF\u09B6 \u099B\u09BE\u09DC\u09BE \u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09B8\u0982\u09AF\u09CB\u0997 \u09AC\u09BF\u099A\u09CD\u099B\u09BF\u09A8\u09CD\u09A8 \u0995\u09B0\u09BE \u09AF\u09BE\u09AC\u09C7 \u09A8\u09BE\u0964 \u0997\u09CD\u09B0\u09BE\u09B9\u0995 \u09AC\u09BF\u09B2 \u09A8\u09BF\u09DF\u09C7 \u0986\u09AA\u09A4\u09CD\u09A4\u09BF \u099C\u09BE\u09A8\u09BE\u09B2\u09C7, \u09AE\u09BF\u099F\u09BE\u09B0 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09B0 \u09B8\u09BF\u09A6\u09CD\u09A7\u09BE\u09A8\u09CD\u09A4 \u09AC\u09BF\u099A\u09BE\u09B0\u09BE\u09A7\u09C0\u09A8 \u09A5\u09BE\u0995\u09BE\u0995\u09BE\u09B2\u09C0\u09A8 \u09AA\u09C2\u09B0\u09CD\u09AC\u09AC\u09B0\u09CD\u09A4\u09C0 \u09EC \u09AE\u09BE\u09B8\u09C7\u09B0 \u0997\u09DC \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u09C7\u09B0 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u09A4\u09C7 \u099F\u09CD\u09B0\u09BE\u09DF\u09BE\u09B2 \u09AC\u09BF\u09B2 \u09A6\u09BF\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
    keywords: ["electricity", "bill", "billing", "dispute", "disconnection", "meter", "reading", "charge", "overcharging"]
  },
  {
    id: "wb_road_01",
    source: "West Bengal PWD Roads & Bridges Maintenance Charter",
    source_bn: "\u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 \u09AA\u09BF\u09A1\u09BE\u09AC\u09CD\u09B2\u09C1\u09A1\u09BF (PWD) \u09B0\u09BE\u09B8\u09CD\u09A4\u09BE \u0993 \u09B8\u09C7\u09A4\u09C1 \u09B0\u0995\u09CD\u09B7\u09A3\u09BE\u09AC\u09C7\u0995\u09CD\u09B7\u09A3 \u099A\u09BE\u09B0\u09CD\u099F\u09BE\u09B0",
    section: "Road Repairs & Potholes",
    section_bn: "\u09B0\u09BE\u09B8\u09CD\u09A4\u09BE \u09AE\u09C7\u09B0\u09BE\u09AE\u09A4 \u0993 \u0996\u09BE\u09A8\u09BE\u0996\u09A8\u09CD\u09A6",
    clause: "Section 8A",
    clause_bn: "\u09A7\u09BE\u09B0\u09BE \u09EEA",
    content: "Pothole repairs on key arterial municipal roads must be undertaken in non-monsoon periods and completed within 7 to 14 days of filing a grievance with local PWD division. For rural roads under Pathasree scheme, the turnaround time for repair allocation of funds is 21 working days.",
    content_bn: "\u09AA\u09CD\u09B0\u09A7\u09BE\u09A8 \u09AA\u09CC\u09B0 \u09B0\u09BE\u09B8\u09CD\u09A4\u09BE\u0997\u09C1\u09B2\u09BF\u09B0 \u0996\u09BE\u09A8\u09BE\u0996\u09A8\u09CD\u09A6 \u09AC\u09B0\u09CD\u09B7\u09BE \u09AC\u09BE\u09A6\u09C7 \u0985\u09A8\u09CD\u09AF \u09B8\u09AE\u09DF\u09C7 \u09B8\u09CD\u09A5\u09BE\u09A8\u09C0\u09DF \u09AA\u09BF\u09A1\u09BE\u09AC\u09CD\u09B2\u09C1\u09A1\u09BF \u09A6\u09AA\u09CD\u09A4\u09B0\u09C7 \u0985\u09AD\u09BF\u09AF\u09CB\u0997 \u099C\u09BE\u09A8\u09BE\u09A8\u09CB\u09B0 \u09ED \u09A5\u09C7\u0995\u09C7 \u09E7\u09EA \u09A6\u09BF\u09A8\u09C7\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09AE\u09C7\u09B0\u09BE\u09AE\u09A4 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u09AA\u09A5\u09B6\u09CD\u09B0\u09C0 \u09AA\u09CD\u09B0\u0995\u09B2\u09CD\u09AA\u09C7\u09B0 \u0986\u0993\u09A4\u09BE\u09DF \u0997\u09CD\u09B0\u09BE\u09AE\u09C0\u09A3 \u09B0\u09BE\u09B8\u09CD\u09A4\u09BE \u09AE\u09C7\u09B0\u09BE\u09AE\u09A4\u09C7\u09B0 \u09A4\u09B9\u09AC\u09BF\u09B2 \u09AE\u099E\u09CD\u099C\u09C1\u09B0 \u0995\u09B0\u09BE\u09B0 \u09B8\u09AE\u09DF\u09B8\u09C0\u09AE\u09BE \u09E8\u09E7 \u0995\u09BE\u09B0\u09CD\u09AF\u09A6\u09BF\u09AC\u09B8\u0964",
    keywords: ["road", "street", "pothole", "pave", "pwd", "highway", "broken", "accident", "pathasree"]
  },
  {
    id: "wb_garbage_01",
    source: "Kolkata Municipal Corporation Solid Waste Management Bye-laws",
    source_bn: "\u0995\u09B2\u0995\u09BE\u09A4\u09BE \u09AA\u09CC\u09B0\u09A8\u09BF\u0997\u09AE \u0995\u09A0\u09BF\u09A8 \u09AC\u09B0\u09CD\u099C\u09CD\u09AF \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8\u09BE \u0989\u09AA-\u0986\u0987\u09A8",
    section: "Garbage Clearance",
    section_bn: "\u0986\u09AC\u09B0\u09CD\u099C\u09A8\u09BE \u0985\u09AA\u09B8\u09BE\u09B0\u09A3 \u09AC\u09BF\u09A7\u09BF",
    clause: "Regulation 2018-C",
    clause_bn: "\u09AA\u09CD\u09B0\u09AC\u09BF\u09A7\u09BE\u09A8 \u09E8\u09E6\u09E7\u09EE-C",
    content: "The disposal of solid non-hazardous waste is managed daily. Municipal dustbins must be cleared once every 24 hours. The failure to clear accumulated garbage in neighborhood collection vats within 48 hours is a direct violation of Ward Sanitary Guidelines. Complaining citizens can invoke Clause C to demand clearance.",
    content_bn: "\u0995\u09A0\u09BF\u09A8 \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 \u09AC\u09B0\u09CD\u099C\u09CD\u09AF \u09A6\u09C8\u09A8\u09BF\u0995 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u09A4\u09C7 \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u099C\u09A8\u09AC\u09B9\u09C1\u09B2 \u09A1\u09BE\u09B8\u09CD\u099F\u09AC\u09BF\u09A8\u0997\u09C1\u09B2\u09BF \u09AA\u09CD\u09B0\u09A4\u09BF \u09E8\u09EA \u0998\u09A3\u09CD\u099F\u09BE\u09DF \u0985\u09A8\u09CD\u09A4\u09A4 \u098F\u0995\u09AC\u09BE\u09B0 \u0996\u09BE\u09B2\u09BF \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u09AA\u09BE\u09DC\u09BE\u09B0 \u09AD\u09CD\u09AF\u09BE\u099F \u09A5\u09C7\u0995\u09C7 \u09EA\u09EE \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09AC\u09B0\u09CD\u099C\u09CD\u09AF \u0985\u09AA\u09B8\u09BE\u09B0\u09A3 \u0995\u09B0\u09A4\u09C7 \u09AC\u09CD\u09AF\u09B0\u09CD\u09A5 \u09B9\u0993\u09DF\u09BE \u09B8\u09CD\u09AF\u09BE\u09A8\u09BF\u099F\u09BE\u09B0\u09BF \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6\u09BF\u0995\u09BE\u09B0 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u0995\u09CD\u09B7 \u09B2\u0999\u09CD\u0998\u09A8\u0964 \u09A8\u09BE\u0997\u09B0\u09BF\u0995\u09B0\u09BE \u09A7\u09BE\u09B0\u09BE C \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0 \u0985\u09AC\u09BF\u09B2\u09AE\u09CD\u09AC\u09C7 \u0986\u09AC\u09B0\u09CD\u099C\u09A8\u09BE \u09B8\u09B0\u09BE\u09A8\u09CB\u09B0 \u09A6\u09BE\u09AC\u09BF \u099C\u09BE\u09A8\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8\u0964",
    keywords: ["garbage", "dump", "dustbin", "waste", "cleaning", "vat", "smell", "scraps", "solid waste"]
  },
  {
    id: "wb_drain_01",
    source: "Kolkata Municipal Corporation Sewerage & Drainage Rules",
    source_bn: "\u0995\u09B2\u0995\u09BE\u09A4\u09BE \u09AA\u09CC\u09B0\u09A8\u09BF\u0997\u09AE \u09A8\u09BF\u09B7\u09CD\u0995\u09BE\u09B6\u09A8 \u0993 \u09A8\u09B0\u09CD\u09A6\u09AE\u09BE \u09AA\u09CD\u09B0\u09A3\u09BE\u09B2\u09C0 \u09AC\u09BF\u09A7\u09BF",
    section: "Water Logging & Drain Clogs",
    section_bn: "\u099C\u09B2\u09AE\u0997\u09CD\u09A8\u09A4\u09BE \u0993 \u09A8\u09B0\u09CD\u09A6\u09AE\u09BE \u0985\u09AC\u09B0\u09C1\u09A6\u09CD\u09A7\u09A4\u09BE",
    clause: "Rule 12.3",
    clause_bn: "\u09A8\u09BF\u09DF\u09AE \u09E7\u09E8.\u09E9",
    content: "Blocked water-pipes, sewer overflows, or gully-pit clogs causing active water-logging in residential streets must be cleared within 24 to 48 hours of reporting. If natural heavy monsoon water collects, drainage pumping stations must be operated continuously until water level goes below curb level, as per Rule 12.3.",
    content_bn: "\u0986\u09AC\u09BE\u09B8\u09BF\u0995 \u09B0\u09BE\u09B8\u09CD\u09A4\u09BE\u09DF \u099C\u09B2 \u099C\u09AE\u09C7 \u09A5\u09BE\u0995\u09BE, \u0995\u09BE\u09B2\u09AD\u09BE\u09B0\u09CD\u099F \u0989\u09AA\u099A\u09C7 \u09A8\u09B0\u09CD\u09A6\u09AE\u09BE\u09B0 \u09AA\u09BE\u0987\u09AA \u099C\u09CD\u09AF\u09BE\u09AE \u09B9\u0993\u09DF\u09BE \u09E8\u09EA \u09A5\u09C7\u0995\u09C7 \u09EA\u09EE \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u09AC\u09B0\u09CD\u09B7\u09BE\u09DF \u0985\u09A4\u09BF\u09B0\u09BF\u0995\u09CD\u09A4 \u099C\u09B2 \u099C\u09AE\u09B2\u09C7 \u09AA\u09BE\u09AE\u09CD\u09AA\u09BF\u0982 \u09B8\u09CD\u099F\u09C7\u09B6\u09A8 \u09B2\u09BE\u0997\u09BE\u09A4\u09BE\u09B0 \u09B8\u099A\u09B2 \u09B0\u09C7\u0996\u09C7 \u099C\u09B2 \u09A8\u09BF\u0995\u09BE\u09B6\u09BF \u09B8\u09CD\u09A4\u09B0 \u09A8\u09BE\u09AE\u09BF\u09DF\u09C7 \u0986\u09A8\u09A4\u09C7 \u09B9\u09AC\u09C7, \u09A8\u09BF\u09DF\u09AE \u09E7\u09E8.\u09E9 \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0\u0964",
    keywords: ["drain", "drainage", "sewer", "water-logging", "clog", "flood", "stagnant", "mosquitos"]
  },
  {
    id: "rti_act_01",
    source: "Right to Information Act (RTI) 2005",
    source_bn: "\u09A4\u09A5\u09CD\u09AF \u099C\u09BE\u09A8\u09BE\u09B0 \u0985\u09A7\u09BF\u0995\u09BE\u09B0 \u0986\u0987\u09A8 (RTI) \u09E8\u09E6\u09E6\u09EB",
    section: "Processing and Timelines",
    section_bn: "\u0986\u09AC\u09C7\u09A6\u09A8 \u09AA\u09CD\u09B0\u0995\u09CD\u09B0\u09BF\u09DF\u09BE\u0995\u09B0\u09A3 \u0993 \u09B8\u09AE\u09DF\u09B8\u09C0\u09AE\u09BE",
    clause: "Section 6 & 7",
    clause_bn: "\u09A7\u09BE\u09B0\u09BE \u09EC \u0993 \u09ED",
    content: "Under Section 6(1) of the Right to Information Act 2005, a citizen can file an application requesting information from any Public Authority in English, Hindi, or local language. Under Section 7(1), the Public Information Officer (PIO) must provide the requested information within 30 days of application receipt. If it relates to life and liberty, it must be provided within 48 hours.",
    content_bn: "\u09A4\u09A5\u09CD\u09AF \u099C\u09BE\u09A8\u09BE\u09B0 \u0985\u09A7\u09BF\u0995\u09BE\u09B0 \u0986\u0987\u09A8 \u09E8\u09E6\u09E6\u09EB-\u098F\u09B0 \u09A7\u09BE\u09B0\u09BE \u09EC(\u09E7) \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0, \u09AD\u09BE\u09B0\u09A4\u09C7\u09B0 \u09AF\u09C7\u0995\u09CB\u09A8\u09CB \u09A8\u09BE\u0997\u09B0\u09BF\u0995 \u0987\u0982\u09B0\u09C7\u099C\u09BF, \u09B9\u09BF\u09A8\u09CD\u09A6\u09BF \u09AC\u09BE \u09B8\u09CD\u09A5\u09BE\u09A8\u09C0\u09DF \u09AD\u09BE\u09B7\u09BE\u09DF \u09AF\u09C7\u0995\u09CB\u09A8\u09CB \u099C\u09A8-\u0995\u09B0\u09CD\u09A4\u09C3\u09AA\u0995\u09CD\u09B7\u09C7\u09B0 \u0995\u09BE\u099B\u09C7 \u09A4\u09A5\u09CD\u09AF \u099A\u09C7\u09DF\u09C7 \u0986\u09AC\u09C7\u09A6\u09A8 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8\u0964 \u09A7\u09BE\u09B0\u09BE \u09ED(\u09E7) \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0, \u0986\u09AC\u09C7\u09A6\u09A8 \u09AA\u09CD\u09B0\u09BE\u09AA\u09CD\u09A4\u09BF\u09B0 \u09E9\u09E6 \u09A6\u09BF\u09A8\u09C7\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09A4\u09A5\u09CD\u09AF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u09AC\u09BE\u09A7\u09CD\u09AF\u09A4\u09BE\u09AE\u09C1\u09B2\u0995\u0964 \u09A4\u09A5\u09CD\u09AF \u09AF\u09A6\u09BF \u099C\u09C0\u09AC\u09A8 \u0993 \u09B8\u09CD\u09AC\u09BE\u09A7\u09C0\u09A8\u09A4\u09BE\u09B0 \u09B8\u09BE\u09A5\u09C7 \u099C\u09DC\u09BF\u09A4 \u09B9\u09DF, \u09A4\u09AC\u09C7 \u09A4\u09BE \u09EA\u09EE \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
    keywords: ["rti", "information", "fee", "application", "pio", "rupees", "authority", "records", "fund", "spend", "delay"]
  },
  {
    id: "rti_act_02",
    source: "Right to Information Act (RTI) 2005 - Fee structure",
    source_bn: "\u09A4\u09A5\u09CD\u09AF \u099C\u09BE\u09A8\u09BE\u09B0 \u0985\u09A7\u09BF\u0995\u09BE\u09B0 \u0986\u0987\u09A8 (RTI) \u09E8\u09E6\u09E6\u09EB - \u09AB\u09BF \u0995\u09BE\u09A0\u09BE\u09AE\u09CB",
    section: "Application Fees",
    section_bn: "\u0986\u09AC\u09C7\u09A6\u09A8 \u09AB\u09BF",
    clause: "Section 6 (Fee Clause)",
    clause_bn: "\u09A7\u09BE\u09B0\u09BE \u09EC (\u09AB\u09BF \u09AA\u09CD\u09B0\u09AC\u09BF\u09A7\u09BE\u09A8)",
    content: "A standard application fee of Rupees Ten (Rs. 10/-) is required for filing an RTI. This can be paid via Court Fee Stamp, Demand Draft, Indian Postal Order (IPO), or online portal. Citizens belonging to the Below Poverty Line (BPL) category are completely exempt from paying any application fees upon submitting copy of BPL card.",
    content_bn: "RTI \u0986\u09AC\u09C7\u09A6\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09E7\u09E6 \u099F\u09BE\u0995\u09BE\u09B0 \u0995\u09CB\u09B0\u09CD\u099F \u09AB\u09BF \u09AC\u09BE \u09AA\u09CB\u09B8\u09CD\u099F\u09BE\u09B2 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09AB\u09BF \u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8\u0964 \u09A6\u09BE\u09B0\u09BF\u09A6\u09CD\u09B0\u09CD\u09AF\u09B8\u09C0\u09AE\u09BE\u09B0 \u09A8\u09BF\u099A\u09C7 (BPL) \u09AC\u09B8\u09AC\u09BE\u09B8\u0995\u09BE\u09B0\u09C0 \u09A8\u09BE\u0997\u09B0\u09BF\u0995\u09B0\u09BE \u09AC\u09BF\u09AA\u09BF\u098F\u09B2 \u0995\u09BE\u09B0\u09CD\u09A1\u09C7\u09B0 \u0995\u09AA\u09BF \u099C\u09AE\u09BE \u09A6\u09BF\u09B2\u09C7 \u0995\u09CB\u09A8\u09CB \u0986\u09AC\u09C7\u09A6\u09A8 \u09AB\u09BF \u099B\u09BE\u09DC\u09BE\u0987 \u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3 \u09AC\u09BF\u09A8\u09BE\u09AE\u09C2\u09B2\u09CD\u09AF\u09C7 \u09A4\u09A5\u09CD\u09AF \u09AA\u09BE\u0993\u09DF\u09BE\u09B0 \u0985\u09A7\u09BF\u0995\u09BE\u09B0\u09C0\u0964",
    keywords: ["rti", "fee", "payment", "rupees", "ten", "court", "bpl", "exempt", "poverty", "ipo", "postal"]
  },
  {
    id: "wb_cert_01",
    source: "West Bengal Registration of Births and Deaths Rules (2000)",
    source_bn: "\u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 \u099C\u09A8\u09CD\u09AE \u0993 \u09AE\u09C3\u09A4\u09CD\u09AF\u09C1 \u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u09A8 \u09A8\u09BF\u09DF\u09AE\u09BE\u09AC\u09B2\u09C0 (\u09E8\u09E6\u09E6\u09E6)",
    section: "Issuance of Certificates",
    section_bn: "\u09B6\u0982\u09B8\u09BE\u09AA\u09A4\u09CD\u09B0 \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8",
    clause: "Rule 9(4)",
    clause_bn: "\u09A8\u09BF\u09DF\u09AE \u09EF(\u09EA)",
    content: "Births and deaths must be registered within 21 days of occurrence with local health registrars (KMC, Municipalities, or Panchayats). Certificate issuance takes peak 5-7 working days. Late registrations (after 30 days but under 1 year) require District Registrar permission and late fee, as per Rule 9(4).",
    content_bn: "\u099C\u09A8\u09CD\u09AE \u09AC\u09BE \u09AE\u09C3\u09A4\u09CD\u09AF\u09C1\u09B0 \u09E8\u09E7 \u09A6\u09BF\u09A8\u09C7\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09B8\u09CD\u09A5\u09BE\u09A8\u09C0\u09DF \u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u0995\u09C7\u09B0 (\u0995\u09C7\u098F\u09AE\u09B8\u09BF, \u09AA\u09CC\u09B0\u09B8\u09AD\u09BE \u09AC\u09BE \u09AA\u099E\u09CD\u099A\u09BE\u09DF\u09C7\u09A4) \u0995\u09BE\u099B\u09C7 \u09A8\u09A5\u09BF\u09AD\u09C1\u0995\u09CD\u09A4\u09BF \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u09B6\u0982\u09B8\u09BE\u09AA\u09A4\u09CD\u09B0 \u09EB \u09A5\u09C7\u0995\u09C7 \u09ED \u0995\u09BE\u09B0\u09CD\u09AF\u09A6\u09BF\u09AC\u09B8\u09C7\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09A6\u09C7\u0993\u09DF\u09BE \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09DF\u0964 \u09E9\u09E6 \u09A6\u09BF\u09A8\u09C7\u09B0 \u09AA\u09B0 \u0993 \u09E7 \u09AC\u099B\u09B0\u09C7\u09B0 \u09A8\u09BF\u099A\u09C7\u09B0 \u09AC\u09BF\u09B2\u09AE\u09CD\u09AC\u09BF\u09A4 \u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0989\u09AA\u09AF\u09C1\u0995\u09CD\u09A4 \u0995\u09B0\u09CD\u09A4\u09C3\u09AA\u0995\u09CD\u09B7\u09C7\u09B0 \u0985\u09A8\u09C1\u09AE\u09A4\u09BF \u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8, \u09A8\u09BF\u09DF\u09AE \u09EF(\u09EA) \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0\u0964",
    keywords: ["birth", "death", "certificate", "registration", "delay", "hospital", "delivery", "marriage", "registrar"]
  },
  {
    id: "wb_pension_01",
    source: "Swasthya Sathi & State Pension Benefit Schemes",
    source_bn: "\u09B8\u09CD\u09AC\u09BE\u09B8\u09CD\u09A5\u09CD\u09AF\u09B8\u09BE\u09A5\u09C0 \u0993 \u09AC\u09BE\u09B0\u09CD\u09A7\u0995\u09CD\u09AF \u09B8\u09BE\u09AE\u09BE\u099C\u09BF\u0995 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A4\u09CD\u09A4\u09BE \u09AA\u09C7\u09A8\u09B6\u09A8 \u09B8\u09CD\u0995\u09BF\u09AE",
    section: "Eligibility Criteria",
    section_bn: "\u09AF\u09CB\u0997\u09CD\u09AF\u09A4\u09BE\u09B0 \u09AE\u09BE\u09A8\u09A6\u09A3\u09CD\u09A1",
    clause: "West Bengal Welfare Act (2016)",
    clause_bn: "\u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 \u099C\u09A8\u0995\u09B2\u09CD\u09AF\u09BE\u09A3 \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6\u09BF\u0995\u09BE (\u09E8\u09E6\u09E7\u09EC)",
    content: "Under National Social Assistance Programme (NSAP) and State Indira Gandhi Old Age Pension Scheme in West Bengal, citizens aged 60 and above with household income below state-stipulated guidelines are entitled to a monthly pension. Swasthya Sathi family health insurance provides smart-card coverage up to Rs 5 Lakhs per family annually, registered primarily under the female head of the family.",
    content_bn: "\u099C\u09BE\u09A4\u09C0\u09AF\u09BC \u09B8\u09BE\u09AE\u09BE\u099C\u09BF\u0995 \u09B8\u09B9\u09BE\u09AF\u09BC\u09A4\u09BE \u0995\u09B0\u09CD\u09AE\u09B8\u09C2\u099A\u09BF\u09B0 \u0986\u0993\u09A4\u09BE\u09DF \u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997\u09C7 \u09EC\u09E6 \u09AC\u099B\u09B0 \u09AC\u09BE \u09A4\u09BE\u09B0 \u09AC\u09C7\u09B6\u09BF \u09AC\u09DF\u09B8\u09C0 \u09AC\u09BF\u09AA\u09A8\u09CD\u09A8 \u09A8\u09BE\u0997\u09B0\u09BF\u0995\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AC\u09BE\u09B0\u09CD\u09A7\u0995\u09CD\u09AF \u09B8\u09AE\u09BE\u099C\u0995\u09B2\u09CD\u09AF\u09BE\u09A3 \u09AE\u09BE\u09B8\u09BF\u0995 \u09AA\u09C7\u09A8\u09B6\u09A8 \u09AC\u09B0\u09BE\u09A6\u09CD\u09A6 \u0995\u09B0\u09BE \u09B9\u09DF\u0964 \u09B8\u09CD\u09AC\u09BE\u09B8\u09CD\u09A5\u09CD\u09AF\u09B8\u09BE\u09A5\u09C0 \u09AC\u09C0\u09AE\u09BE\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u09A8\u09BE\u09B0\u09C0 \u09AA\u09CD\u09B0\u09A7\u09BE\u09A8 \u09AA\u09B0\u09BF\u09AC\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AC\u09BE\u09B0\u09CD\u09B7\u09BF\u0995 \u09EB \u09B2\u0995\u09CD\u09B7 \u099F\u09BE\u0995\u09BE \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u0995\u09CD\u09AF\u09BE\u09B6\u09B2\u09C7\u09B8 \u099A\u09BF\u0995\u09BF\u09CE\u09B8\u09BE\u09B0 \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE \u0995\u09BE\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u09AA\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u0964",
    keywords: ["pension", "aged", "monthly", "swasthya sathi", "health", "smart card", "old age", "welfare", "bpl"]
  }
];
function queryKnowledgeBase(userDescription, category) {
  const normDescription = userDescription.toLowerCase();
  const normCategory = category.toLowerCase().replace("_", " ");
  const scoredChunks = KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    if (chunk.keywords.some((kw) => normCategory.includes(kw) || kw.includes(normCategory))) {
      score += 4;
    }
    chunk.keywords.forEach((kw) => {
      if (normDescription.includes(kw)) {
        score += 2;
      }
    });
    const kwInContentMatches = chunk.keywords.filter((kw) => chunk.content.toLowerCase().includes(kw)).length;
    score += kwInContentMatches * 0.1;
    return { chunk, score };
  });
  const results = scoredChunks.filter((item) => item.score > 0.5).sort((a, b) => b.score - a.score).map((item) => item.chunk);
  if (results.length === 0) {
    return KNOWLEDGE_BASE.filter((c) => c.id.startsWith("rti_") || c.id === "rti_act_01" || c.id === "rti_act_02");
  }
  return results.slice(0, 3);
}

// src/data/departments.ts
var DEPARTMENTS_DIRECTORY = {
  "West Bengal": {
    "water_supply": {
      "departmentName": "Kolkata Municipal Corporation - Water Supply Department",
      "departmentName_bn": "\u0995\u09B2\u0995\u09BE\u09A4\u09BE \u09AA\u09CC\u09B0\u09A8\u09BF\u0997\u09AE - \u099C\u09B2 \u09B8\u09B0\u09AC\u09B0\u09BE\u09B9 \u09AC\u09BF\u09AD\u09BE\u0997",
      "portalUrl": "https://www.kmcgov.in/",
      "helpline": "1800-102-4444",
      "expectedResolutionDays": 3,
      "designation": "The Executive Engineer, Water Supply Department",
      "designation_bn": "\u09B8\u09B9\u0995\u09BE\u09B0\u09C0 \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2\u09C0, \u099C\u09B2 \u09B8\u09B0\u09AC\u09B0\u09BE\u09B9 \u09AC\u09BF\u09AD\u09BE\u0997",
      "address": "5, S.N. Banerjee Road, Kolkata, West Bengal - 700013",
      "address_bn": "\u09EB, \u098F\u09B8.\u098F\u09A8. \u09AC\u09CD\u09AF\u09BE\u09A8\u09BE\u09B0\u09CD\u099C\u09C0 \u09B0\u09CB\u09A1, \u0995\u09B2\u0995\u09BE\u09A4\u09BE, \u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 - \u09ED\u09E6\u09E6\u09E6\u09E7\u09E9"
    },
    "electricity": {
      "departmentName": "West Bengal State Electricity Distribution Company Limited (WBSEDCL)",
      "departmentName_bn": "\u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 \u09B0\u09BE\u099C\u09CD\u09AF \u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09AC\u09A8\u09CD\u099F\u09A8 \u09B8\u0982\u09B8\u09CD\u09A5\u09BE \u09B2\u09BF\u09AE\u09BF\u099F\u09C7\u09A1 (WBSEDCL)",
      "portalUrl": "https://www.wbsedcl.in/",
      "helpline": "19121",
      "expectedResolutionDays": 2,
      "designation": "The Assistant Engineer & Station Manager",
      "designation_bn": "\u09B8\u09B9\u0995\u09BE\u09B0\u09C0 \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2\u09C0 \u098F\u09AC\u0982 \u09B8\u09CD\u099F\u09C7\u09B6\u09A8 \u09AE\u09CD\u09AF\u09BE\u09A8\u09C7\u099C\u09BE\u09B0",
      "address": "Bidyut Bhavan, Block DJ, Sector II, Bidhannagar, Kolkata - 700091",
      "address_bn": "\u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09AD\u09AC\u09A8, \u09AC\u09CD\u09B2\u0995 DJ, \u09B8\u09C7\u0995\u09CD\u099F\u09B0 II, \u09AC\u09BF\u09A7\u09BE\u09A8\u09A8\u0997\u09B0, \u0995\u09B2\u0995\u09BE\u09A4\u09BE - \u09ED\u09E6\u09E6\u09E6\u09EF\u09E7"
    },
    "roads": {
      "departmentName": "Public Works Department (PWD), Government of West Bengal",
      "departmentName_bn": "\u0997\u09A3\u09AA\u09C2\u09B0\u09CD\u09A4 \u09AC\u09BF\u09AD\u09BE\u0997 (PWD), \u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 \u09B8\u09B0\u0995\u09BE\u09B0",
      "portalUrl": "https://www.pwdwb.in/",
      "helpline": "1800-345-5555",
      "expectedResolutionDays": 15,
      "designation": "The Executive Engineer, PWD Division",
      "designation_bn": "\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u09B9\u09C0 \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2\u09C0, \u09AA\u09BF\u09A1\u09BE\u09AC\u09CD\u09B2\u09C1\u09A1\u09BF \u09AC\u09BF\u09AD\u09BE\u0997",
      "address": "Nabanita Building, Writers' Buildings, Kolkata - 700001",
      "address_bn": "\u09A8\u09AC\u09BE\u09A8\u09C0 \u09AD\u09AC\u09A8, \u09AE\u09B9\u09BE\u0995\u09B0\u09A3 (\u09B0\u09BE\u0987\u099F\u09BE\u09B0\u09CD\u09B8 \u09AC\u09BF\u09B2\u09CD\u09A1\u09BF\u0982\u09B8), \u0995\u09B2\u0995\u09BE\u09A4\u09BE - \u09ED\u09E6\u09E6\u09E6\u09E6\u09E7"
    },
    "garbage": {
      "departmentName": "Kolkata Municipal Corporation - Solid Waste Management Department",
      "departmentName_bn": "\u0995\u09B2\u0995\u09BE\u09A4\u09BE \u09AA\u09CC\u09B0\u09A8\u09BF\u0997\u09AE - \u0995\u09A0\u09BF\u09A8 \u09AC\u09B0\u09CD\u099C\u09CD\u09AF \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8\u09BE \u09AC\u09BF\u09AD\u09BE\u0997",
      "portalUrl": "https://www.kmcgov.in/",
      "helpline": "1800-103-4444",
      "expectedResolutionDays": 1,
      "designation": "The Chief Engineer, Solid Waste Management",
      "designation_bn": "\u09AA\u09CD\u09B0\u09A7\u09BE\u09A8 \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2\u09C0, \u0995\u09A0\u09BF\u09A8 \u09AC\u09B0\u09CD\u099C\u09CD\u09AF \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE\u09AA\u09A8\u09BE",
      "address": "48, Market Street, Kolkata, West Bengal - 700087",
      "address_bn": "\u09EA\u09EE, \u09AE\u09BE\u09B0\u09CD\u0995\u09C7\u099F \u09B8\u09CD\u099F\u09CD\u09B0\u09BF\u099F, \u0995\u09B2\u0995\u09BE\u09A4\u09BE, \u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 - \u09ED\u09E6\u09E6\u09E6\u09EE\u09ED"
    },
    "drainage": {
      "departmentName": "Kolkata Municipal Corporation - Sewerage and Drainage Department",
      "departmentName_bn": "\u0995\u09B2\u0995\u09BE\u09A4\u09BE \u09AA\u09CC\u09B0\u09A8\u09BF\u0997\u09AE - \u09A8\u09BF\u0995\u09BE\u09B6\u09BF \u0993 \u09A8\u09B0\u09CD\u09A6\u09AE\u09BE \u09AA\u09CD\u09B0\u09A3\u09BE\u09B2\u09C0 \u09AC\u09BF\u09AD\u09BE\u0997",
      "portalUrl": "https://www.kmcgov.in/",
      "helpline": "033-2286-1000",
      "expectedResolutionDays": 5,
      "designation": "The Executive Engineer, Drainage Division",
      "designation_bn": "\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u09B9\u09C0 \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2\u09C0, \u09A8\u09BF\u0995\u09BE\u09B6\u09BF \u09AC\u09BF\u09AD\u09BE\u0997",
      "address": "5, S.N. Banerjee Road, Kolkata, West Bengal - 700013",
      "address_bn": "\u09EB, \u098F\u09B8.\u098F\u09A8. \u09AC\u09CD\u09AF\u09BE\u09A8\u09BE\u09B0\u09CD\u099C\u09C0 \u09B0\u09CB\u09A1, \u0995\u09B2\u0995\u09BE\u09A4\u09BE, \u09AA\u09B6\u09CD\u099A\u09BF\u09AE\u09AC\u0999\u09CD\u0997 - \u09ED\u09E6\u09E6\u09E6\u09E7\u09E9"
    },
    "certificates": {
      "departmentName": "Department of Health & Family Welfare (Birth/Death Registrar)",
      "departmentName_bn": "\u09B8\u09CD\u09AC\u09BE\u09B8\u09CD\u09A5\u09CD\u09AF \u0993 \u09AA\u09B0\u09BF\u09AC\u09BE\u09B0 \u0995\u09B2\u09CD\u09AF\u09BE\u09A3 \u09A6\u09AA\u09CD\u09A4\u09B0 (\u099C\u09A8\u09CD\u09AE-\u09AE\u09C3\u09A4\u09CD\u09AF\u09C1 \u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u0995 \u0995\u09BE\u09B0\u09CD\u09AF\u09BE\u09B2\u09AF\u09BC)",
      "portalUrl": "https://www.wbhealth.gov.in/",
      "helpline": "1800-3134-44222",
      "expectedResolutionDays": 7,
      "designation": "The Sub-Registrar of Births & Deaths",
      "designation_bn": "\u099C\u09A8\u09CD\u09AE \u0993 \u09AE\u09C3\u09A4\u09CD\u09AF\u09C1 \u09B8\u09BE\u09AC-\u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09BE\u09B0",
      "address": "Swasthya Bhawan, GN-29, Sector-V, Salt Lake, Kolkata - 700091",
      "address_bn": "\u09B8\u09CD\u09AC\u09BE\u09B8\u09CD\u09A5\u09CD\u09AF \u09AD\u09AC\u09A8, GN-\u09E8\u09EF, \u09B8\u09C7\u0995\u09CD\u099F\u09B0-V, \u09B8\u09B2\u09CD\u099F\u09B2\u09C7\u0995, \u0995\u09B2\u0995\u09BE\u09A4\u09BE - \u09ED\u09E6\u09E6\u09E6\u09EF\u09E7"
    },
    "pension": {
      "departmentName": "Department of Panchayats & Rural Development / Municipal Affairs",
      "departmentName_bn": "\u09AA\u099E\u09CD\u099A\u09BE\u09AF\u09BC\u09C7\u09A4 \u0993 \u0997\u09CD\u09B0\u09BE\u09AE\u09C0\u09A3 \u0989\u09A8\u09CD\u09A8\u09AF\u09BC\u09A8 \u09A6\u09AA\u09CD\u09A4\u09B0 / \u09AA\u09CC\u09B0 \u09AC\u09BF\u09B7\u09AF\u09BC\u0995 \u09AC\u09BF\u09AD\u09BE\u0997",
      "portalUrl": "https://www.wbprd.gov.in/",
      "helpline": "033-2248-1168",
      "expectedResolutionDays": 30,
      "designation": "The Block Development Officer (BDO) / Municipal Commissioner",
      "designation_bn": "\u09AC\u09CD\u09B2\u0995 \u09A1\u09C7\u09AD\u09C7\u09B2\u09AA\u09AE\u09C7\u09A8\u09CD\u099F \u0985\u09AB\u09BF\u09B8\u09BE\u09B0 (BDO) / \u09AA\u09CC\u09B0 \u0995\u09AE\u09BF\u09B6\u09A8\u09BE\u09B0",
      "address": "Joint Administrative Building, HC-7, Sector-III, Salt Lake, Kolkata - 700106",
      "address_bn": "\u09AF\u09CC\u09A5 \u09AA\u09CD\u09B0\u09B6\u09BE\u09B8\u09A8\u09BF\u0995 \u09AD\u09AC\u09A8, HC-\u09ED, \u09B8\u09C7\u0995\u09CD\u099F\u09B0-III, \u09B8\u09B2\u09CD\u099F\u09B2\u09C7\u0995, \u0995\u09B2\u0995\u09BE\u09A4\u09BE - \u09ED\u09E6\u09E6\u09E7\u09E6\u09EC"
    }
  },
  "National/General": {
    "water_supply": {
      "departmentName": "Public Health Engineering Department (PHED) / Municipal Board",
      "departmentName_bn": "\u099C\u09A8\u09B8\u09CD\u09AC\u09BE\u09B8\u09CD\u09A5\u09CD\u09AF \u0995\u09BE\u09B0\u09BF\u0997\u09B0\u09BF \u09AC\u09BF\u09AD\u09BE\u0997 (PHED) / \u09AA\u09CC\u09B0 \u09AC\u09CB\u09B0\u09CD\u09A1",
      "portalUrl": "https://jaljeevanmission.gov.in/",
      "helpline": "1800-180-3535",
      "expectedResolutionDays": 5,
      "designation": "The Executive Engineer, PHED",
      "designation_bn": "\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u09B9\u09C0 \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2\u09C0, \u09AA\u09BF\u098F\u0987\u099A\u0987\u09A1\u09BF (PHED)",
      "address": "Main Municipal Corporation Office, Central Division",
      "address_bn": "\u09AA\u09CD\u09B0\u09A7\u09BE\u09A8 \u09AA\u09CC\u09B0 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u09B6\u09A8 \u0995\u09BE\u09B0\u09CD\u09AF\u09BE\u09B2\u09AF\u09BC, \u0995\u09C7\u09A8\u09CD\u09A6\u09CD\u09B0\u09C0\u09AF\u09BC \u09AC\u09BF\u09AD\u09BE\u0997"
    },
    "electricity": {
      "departmentName": "State Power Distribution Corporation Limited",
      "departmentName_bn": "\u09B0\u09BE\u099C\u09CD\u09AF \u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09AC\u09A8\u09CD\u099F\u09A8 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u09B6\u09A8 \u09B2\u09BF\u09AE\u09BF\u099F\u09C7\u09A1",
      "portalUrl": "https://www.powergrid.in/",
      "helpline": "1912",
      "expectedResolutionDays": 3,
      "designation": "The Assistant Engineer, Electrical Sub-division",
      "designation_bn": "\u09B8\u09B9\u0995\u09BE\u09B0\u09C0 \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2\u09C0, \u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09B8\u09BE\u09AC-\u09A1\u09BF\u09AD\u09BF\u09B6\u09A8",
      "address": "Main Power Grid Complex, Electricity Head Office",
      "address_bn": "\u09AA\u09CD\u09B0\u09A7\u09BE\u09A8 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 \u0997\u09CD\u09B0\u09BF\u09A1 \u0995\u09AE\u09AA\u09CD\u09B2\u09C7\u0995\u09CD\u09B8, \u0995\u09C7\u09A8\u09CD\u09A6\u09CD\u09B0\u09C0\u09AF\u09BC \u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u0995\u09BE\u09B0\u09CD\u09AF\u09BE\u09B2\u09AF\u09BC"
    },
    "roads": {
      "departmentName": "National Highways Authority of India (NHAI) / Municipal PWD",
      "departmentName_bn": "\u092D\u093E\u0930\u0924\u0940\u092F \u099C\u09BE\u09A4\u09C0\u09AF\u09BC \u09B8\u09A1\u09BC\u0995 \u0995\u09B0\u09CD\u09A4\u09C3\u09AA\u0995\u09CD\u09B7 (NHAI) / \u09AA\u09CC\u09B0 \u09AA\u09BF\u09A1\u09BE\u09AC\u09CD\u09B2\u09C1\u09A1\u09BF (PWD)",
      "portalUrl": "https://nhai.gov.in/",
      "helpline": "1033",
      "expectedResolutionDays": 10,
      "designation": "The Executive Engineer, Public Works Department",
      "designation_bn": "\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u09B9\u09C0 \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2\u09C0, \u099C\u09A8\u09B8\u09C7\u09AC\u09BE \u09AA\u09C2\u09B0\u09CD\u09A4 \u09AC\u09BF\u09AD\u09BE\u0997",
      "address": "PWD Division Office, District HQ",
      "address_bn": "\u09AA\u09BF\u09A1\u09BE\u09AC\u09CD\u09B2\u09C1\u09A1\u09BF \u09B0\u09CB\u09A1 \u09A1\u09BF\u09AD\u09BF\u09B6\u09A8 \u0985\u09AB\u09BF\u09B8, \u099C\u09C7\u09B2\u09BE \u09B8\u09A6\u09B0"
    },
    "garbage": {
      "departmentName": "Municipal Corporation - Health & Sanitation Wing",
      "departmentName_bn": "\u09AA\u09CC\u09B0 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u09B6\u09A8 - \u09B8\u09CD\u09AC\u09BE\u09B8\u09CD\u09A5\u09CD\u09AF \u0993 \u09B8\u09CD\u09AF\u09BE\u09A8\u09BF\u099F\u09C7\u09B6\u09A8 \u09B6\u09BE\u0996\u09BE",
      "portalUrl": "https://swachhbharatmission.gov.in/",
      "helpline": "1969",
      "expectedResolutionDays": 2,
      "designation": "The Sanitary Inspector, Municipal Corporation",
      "designation_bn": "\u09B8\u09CD\u09AF\u09BE\u09A8\u09BF\u099F\u09BE\u09B0\u09BF \u0987\u09A8\u09CD\u09B8\u09AA\u09C7\u0995\u09CD\u099F\u09B0, \u09AA\u09CC\u09B0 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u09B6\u09A8",
      "address": "Local Municipal Ward Office",
      "address_bn": "\u09B8\u09CD\u09A5\u09BE\u09A8\u09C0\u09DF \u09AA\u09CC\u09B0 \u0993\u09DF\u09BE\u09B0\u09CD\u09A1 \u0985\u09AB\u09BF\u09B8"
    },
    "drainage": {
      "departmentName": "Municipal Corporation - Sewerage Division",
      "departmentName_bn": "\u09AA\u09CC\u09B0 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u09B6\u09A8 - \u09A8\u09BF\u0995\u09BE\u09B6\u09BF \u09AC\u09BF\u09AD\u09BE\u0997",
      "portalUrl": "https://www.amrut.gov.in/",
      "helpline": "1800-345-1200",
      "expectedResolutionDays": 4,
      "designation": "The Assistant Engineer, Sewerage & Drainage Wing",
      "designation_bn": "\u09B8\u09B9\u0995\u09BE\u09B0\u09C0 \u09AA\u09CD\u09B0\u0995\u09CC\u09B6\u09B2\u09C0, \u09A8\u09BF\u0995\u09BE\u09B6\u09BF \u0993 \u09A8\u0997\u09CD\u09A8 \u09A8\u09BF\u0995\u09BE\u09B6 \u09B6\u09BE\u0996\u09BE",
      "address": "Municipal Corporation Central Works Office",
      "address_bn": "\u09AA\u09CC\u09B0 \u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u09B6\u09A8 \u0995\u09C7\u09A8\u09CD\u09A6\u09CD\u09B0\u09C0\u09AF\u09BC \u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u0995\u09B8 \u0985\u09AB\u09BF\u09B8"
    },
    "certificates": {
      "departmentName": "Registrar of Births and Deaths, Municipal Office",
      "departmentName_bn": "\u099C\u09A8\u09CD\u09AE \u0993 \u09AE\u09C3\u09A4\u09CD\u09AF\u09C1 \u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u0995, \u09AA\u09CC\u09B0 \u0995\u09BE\u09B0\u09CD\u09AF\u09BE\u09B2\u09AF\u09BC",
      "portalUrl": "https://crsorgi.gov.in/",
      "helpline": "1800-11-0033",
      "expectedResolutionDays": 10,
      "designation": "The Registrar (Birth and Death Registration)",
      "designation_bn": "\u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u0995 (\u099C\u09A8\u09CD\u09AE \u0993 \u09AE\u09C3\u09A4\u09CD\u09AF\u09C1 \u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u09A8)",
      "address": "Local Civil Registry Office, Municipal Building",
      "address_bn": "\u09B8\u09CD\u09A5\u09BE\u09A8\u09C0\u09AF\u09BC \u09B8\u09BF\u09AD\u09BF\u09B2 \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09BF \u0985\u09AB\u09BF\u09B8, \u09AA\u09CC\u09B0 \u09AD\u09AC\u09A8"
    },
    "pension": {
      "departmentName": "Department of Social Welfare & Pension Board",
      "departmentName_bn": "\u09B8\u09AE\u09BE\u099C\u0995\u09B2\u09CD\u09AF\u09BE\u09A3 \u0985\u09A7\u09BF\u09A6\u09AA\u09CD\u09A4\u09B0 \u0993 \u09AA\u09C7\u09A8\u09B6\u09A8 \u09AC\u09CB\u09B0\u09CD\u09A1",
      "portalUrl": "https://nsap.nic.in/",
      "helpline": "1800-11-1555",
      "expectedResolutionDays": 45,
      "designation": "The District Social Welfare Officer",
      "designation_bn": "\u099C\u09C7\u09B2\u09BE \u09B8\u09AE\u09BE\u099C\u0995\u09B2\u09CD\u09AF\u09BE\u09A3 \u0995\u09B0\u09CD\u09AE\u0995\u09B0\u09CD\u09A4\u09BE",
      "address": "District Collectorate, Social Welfare Wing",
      "address_bn": "\u099C\u09C7\u09B2\u09BE \u0995\u09BE\u09B2\u09C7\u0995\u09CD\u099F\u09B0\u09C7\u099F, \u09B8\u09AE\u09BE\u099C\u0995\u09B2\u09CD\u09AF\u09BE\u09A3 \u09B6\u09BE\u0996\u09BE"
    }
  }
};

// src/serverApp.ts
dotenv.config();
var app = express();
app.use(express.json());
app.post("/api/kb/query", (req, res) => {
  try {
    const { description, category } = req.body;
    const results = queryKnowledgeBase(description || "", category || "other");
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/generate-document", async (req, res) => {
  try {
    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      try {
        const envExamplePath = path.resolve(process.cwd(), ".env.example");
        if (fs.existsSync(envExamplePath)) {
          const content2 = fs.readFileSync(envExamplePath, "utf-8");
          const match = content2.match(/GEMINI_API_KEY=["']?([^"'\s]+)["']?/);
          if (match && match[1] && !match[1].startsWith("MY_GEMINI")) {
            apiKey = match[1];
          }
        }
      } catch (e) {
        console.error("Failed to read fallback key from .env.example:", e);
      }
    }
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured. Please configure your environment variable in your Vercel deployment dashboard (Settings > Environment Variables)."
      });
    }
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
    const {
      state,
      city,
      category,
      description,
      duration,
      previous_ref,
      document_type,
      language
    } = req.body;
    if (!state || !category || !description) {
      return res.status(400).json({ error: "Missing state, category or description." });
    }
    const matchedChunks = queryKnowledgeBase(description, category);
    const retrievedContext = matchedChunks.map((chunk) => `[Ref Source ID: ${chunk.id} | Source Document: ${chunk.source} | Section: ${chunk.section} | Clause/Regulation: ${chunk.clause}]
Content: "${chunk.content}"`).join("\n\n");
    const stateObj = DEPARTMENTS_DIRECTORY[state] || DEPARTMENTS_DIRECTORY["National/General"];
    const deptInfo = stateObj[category] || DEPARTMENTS_DIRECTORY["National/General"][category];
    const languageNote = language === "bn" ? "The user requested output in Bengali (\u09AC\u09BE\u0982\u09B2\u09BE). Therefore, while the final official COMPLAINT_DOCUMENT and RTI_DOCUMENT should be formatted in standard formal English for actual submittal, you MUST translate the CITIZEN_SUMMARY fully into elegant, highly polished Kolkata-style Bengali (\u0995\u09B2\u0995\u09BE\u09A4\u09BE \u09B6\u09C8\u09B2\u09C0 \u09AC\u09BE\u0982\u09B2\u09BE). Ensure that under the complaint you also provide a short, readable translation explanation in formal Bengali for the user's understanding. Use native, natural administrative terms like '\u09A4\u09A5\u09CD\u09AF \u099C\u09BE\u09A8\u09BE\u09B0 \u0985\u09A7\u09BF\u0995\u09BE\u09B0 \u0986\u0987\u09A8 \u09E8\u09E6\u09E6\u09EB' (RTI Act 2005), '\u0996\u09B8\u09DC\u09BE' (draft), '\u09AA\u09CC\u09B0\u09B8\u0982\u09B8\u09CD\u09A5\u09BE' (municipal corporation), '\u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE \u09AC\u09BF\u09AD\u09CD\u09B0\u09BE\u099F' (power cuts), '\u0985\u09AD\u09BF\u09AF\u09CB\u0997\u09AA\u09A4\u09CD\u09B0' (complaint letter) instead of any machine-translated or robotic phrasing." : "The user requested output in English. Draft the complaint and RTI documents fully in formal, legally appropriate, and respectful bureaucratic English. Write the summary also in clear and actionable English.";
    const prompt = `
You are 'NagrikSeva' (\u09A8\u09BE\u0997\u09B0\u09BF\u0995 \u09B8\u09C7\u09AC\u09BE), a highly specialized citizen empowerment and grievance drafting model.
Your objective is to generate clear, legally structured, and highly professional complaint letters and/or Right to Information (RTI) applications representing the citizen.

CRITICAL INSTRUCTIONS ON SCOPE AND INTEGRITY:
- You MUST only use and cite facts and rules from the provided grounding context documents below. If the provided context does not have a rule for the specific issue or helpline, advise the user with what is available, but do not hallucinate or make up government sections.
- You are strictly forbidden from writing preambles, introductory conversations, friendly comments, notes, or concluding remarks outside the structured document headers.
- Output ONLY the requested structures under the headers: # COMPLAINT_DOCUMENT, # RTI_DOCUMENT, and # CITIZEN_SUMMARY. 
- You are strictly forbidden from using exclamation marks, informal or colloquial words in English, conversational filler, or decorative bullet points that look like AI-generated list headers.
- Write with the dry, authoritative, and extremely formal persona of a Senior Registrar of Municipal Affairs. Keep everything professional and strictly grounded.

Citizen Input Parameters:
- Selected Indian State/Region: ${state}
- District/City: ${city || "General municipal area"}
- Problem Category: ${category}
- Original User Complaint Description: "${description}"
- Problem Duration/Since: ${duration}
- Previous Complaint Ref ID (if any): ${previous_ref || "None registered yet"}
- Requested Document Format: ${document_type} (options: "complaint", "rti", or "both")

Target Government Department Details:
- Recipient Designation: ${deptInfo ? deptInfo.designation : "The Executive Engineer / Chief Ward Commissioner"}
- Department Name: ${deptInfo ? deptInfo.departmentName : "Public Relations & Grievances Section"}
- Official Headquarter Address: ${deptInfo ? deptInfo.address : "Municipal Corporation Office HQ, " + state}
- Helpline Contact: ${deptInfo ? deptInfo.helpline : "1800-XXX-XXXX"}
- Legal Service SLA Timeline: ${deptInfo ? deptInfo.expectedResolutionDays + " Days" : "As per State Citizens Charter"}

Curated Regional Grounding Context:
---------
${retrievedContext}
---------

Drafting Requirements:
1. Always direct the letter to the correct recipient designation and address specified above.
2. Subject lines must be concise and formal. Reference the exact issues and durations.
3. If "rti" or "both" is specified: Add a dedicated block for Section 6/7 of RTI Act 2005. Formulate 3-4 distinct questions inquiring on status, funds allocated vs. spent on the specific area ward, officer names responsible, and outline a note mentioning payment of Rs 10 court fee / stamp.
4. Grounding and Citations: Explicitly cite sources matching the problem (e.g. citing '${matchedChunks[0]?.source || "Citizen Charter"}' or clauses like '${matchedChunks[0]?.clause || "Section 4"}') inline when discussing resolution deadlines or rights.
5. ${languageNote}
6. Always leave placeholders like [Your Name], [Signature], [Date], [Full Postal Address] at the signatures so the citizen can fill them out easily.
7. Return a structured Markdown formatting with EXACTLY the following clear header markers:

# COMPLAINT_DOCUMENT
(Your generated formal complaint letter matching standard formats, formal salutation, body paragraphs detailing the timeline and citizen charter violations, and signature block)

# RTI_DOCUMENT
(Your generated Right to Information Application under RTI Act 2005, structured perfectly with formal questions, fee notifications, and placeholders - omit this header and content ONLY if document_type is 'complaint' and 'rti' was not requested)

# CITIZEN_SUMMARY
(A clean, bilingual/Bengali/English bulletin outlining 3 action items: How to file, where to post or submit online/offline, helpline contacts, and municipal portal links)
`;
    const content = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.2
        // Low temperature for standard legal drafting consistency
      }
    });
    const responseText = content.text || "No document could be drafted. Please check connection.";
    res.json({
      rawText: responseText,
      sources: matchedChunks.map((c) => ({
        id: c.id,
        source: c.source,
        source_bn: c.source_bn,
        section: c.section,
        section_bn: c.section_bn,
        clause: c.clause,
        clause_bn: c.clause_bn,
        content: c.content,
        content_bn: c.content_bn
      })),
      department: deptInfo || null
    });
  } catch (err) {
    console.error("Paperwork Compilation Error:", err);
    res.status(500).json({ error: err.message || "An error occurred while compiling official drafting paperwork." });
  }
});
var serverApp_default = app;

// api/index.ts
var index_default = serverApp_default;
export {
  index_default as default
};
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
