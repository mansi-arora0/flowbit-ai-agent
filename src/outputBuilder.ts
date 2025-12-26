export function buildOutput(
  invoice: any,
  corrections: string[],
  appliedMemory: boolean,
  confidence: number
) {
  return {
    normalizedInvoice: invoice.fields,
    proposedCorrections: corrections,
    requiresHumanReview: confidence < 0.7,
    reasoning: appliedMemory
      ? "Vendor-specific memory applied based on past approved corrections"
      : "No reliable memory found; human review required",
    confidenceScore: confidence,
    memoryUpdates: appliedMemory ? ["reinforced vendor memory"] : [],
    auditTrail: [
      {
        step: "recall",
        timestamp: new Date().toISOString(),
        details: appliedMemory
          ? "Relevant vendor memory recalled"
          : "No memory recalled"
      },
      {
        step: "apply",
        timestamp: new Date().toISOString(),
        details: appliedMemory
          ? "Auto-correction applied"
          : "No auto-correction"
      }
    ]
  };
}
