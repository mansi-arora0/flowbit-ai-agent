// import { loadJSON } from "./utils/dataLoader";
// import { learnVendorRule, recallVendorRules } from "./memory/vendorMemory";

// const invoices = loadJSON("invoices.json");
// const corrections = loadJSON("human_corrections.json");

// // LEARNING PHASE
// for (const c of corrections) {
//   for (const corr of c.corrections) {
//     if (corr.reason.toLowerCase().includes("leistungsdatum")) {
//       learnVendorRule(c.vendor, "Leistungsdatum", "serviceDate");
//     }
//   }
// }

// // RECALL PHASE
// for (const inv of invoices) {
//   console.log("\nProcessing invoice:", inv.invoiceId, inv.vendor);

//   const rules = recallVendorRules(inv.vendor);
//   console.log("Recalled rules:", rules);

//   for (const rule of rules) {
//     if (
//       inv.fields.serviceDate === null &&
//       inv.rawText.includes(rule.trigger) &&
//       rule.confidence >= 0.6
//     ) {
//       inv.fields.serviceDate = "AUTO_FILLED_FROM_MEMORY";
//       console.log(
//         `✅ Auto-filled serviceDate for ${inv.invoiceId} using vendor memory`
//       );
//     }
//   }
// }


import { loadJSON } from "./utils/dataLoader";
import {
  learnVendorRule,
  recallVendorRules,
  reinforceRule
} from "./memory/vendorMemory";
import { buildOutput } from "./outputBuilder";


const invoices = loadJSON("invoices.json");
const corrections = loadJSON("human_corrections.json");

// LEARN FROM HUMAN CORRECTIONS
for (const c of corrections) {
  for (const corr of c.corrections) {
    if (corr.reason.toLowerCase().includes("leistungsdatum")) {
      learnVendorRule(c.vendor, "Leistungsdatum", "serviceDate");
    }
  }
}

// PROCESS INVOICES
for (const inv of invoices) {
  let appliedMemory = false;
  let confidence = inv.confidence;
  const proposedCorrections: string[] = [];

  const rules = recallVendorRules(inv.vendor);

  for (const rule of rules) {
    if (
      inv.fields.serviceDate === null &&
      inv.rawText.includes(rule.trigger) &&
      rule.confidence >= 0.6
    ) {
      inv.fields.serviceDate = "AUTO_FILLED_FROM_MEMORY";
      proposedCorrections.push("serviceDate auto-filled");
      appliedMemory = true;
      confidence = Math.min(1, confidence + 0.1);
      reinforceRule(inv.vendor, rule.trigger);
    }
  }

  const output = buildOutput(
    inv,
    proposedCorrections,
    appliedMemory,
    confidence
  );

  console.log("\nFINAL OUTPUT FOR", inv.invoiceId);
  console.log(JSON.stringify(output, null, 2));
}
