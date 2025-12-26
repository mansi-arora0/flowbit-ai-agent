type VendorRule = {
  vendor: string;
  trigger: string;
  field: string;
  confidence: number;
};

const vendorMemory: VendorRule[] = [];

export function learnVendorRule(
  vendor: string,
  trigger: string,
  field: string
) {
  const existing = vendorMemory.find(
    r => r.vendor === vendor && r.trigger === trigger && r.field === field
  );

  if (existing) {
    existing.confidence = Math.min(1, existing.confidence + 0.1);
  } else {
    vendorMemory.push({
      vendor,
      trigger,
      field,
      confidence: 0.6
    });
  }
}

export function recallVendorRules(vendor: string) {
  return vendorMemory.filter(r => r.vendor === vendor);
}


export function reinforceRule(vendor: string, trigger: string) {
  const rule = vendorMemory.find(
    r => r.vendor === vendor && r.trigger === trigger
  );
  if (rule) {
    rule.confidence = Math.min(1, rule.confidence + 0.1);
  }
}
