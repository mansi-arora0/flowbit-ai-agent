# Flowbit AI Agent – Memory-Driven Invoice Processing

## Overview
This project implements a memory-driven learning layer on top of invoice extraction.
The system learns from past human corrections and applies vendor-specific knowledge
to future invoices in an explainable and auditable way.

No ML model training is used; instead, deterministic heuristics with confidence
reinforcement and decay are applied, as required.

---

## Features Implemented

### 1. Vendor Memory
- Learns vendor-specific patterns from human-approved corrections
- Example: For Supplier GmbH, “Leistungsdatum” → `serviceDate`
- Confidence increases with repeated approvals

### 2. Recall & Apply Logic
- Memory is recalled before making decisions
- Auto-corrections applied only when confidence ≥ threshold
- Prevents incorrect memory from dominating

### 3. Decision Logic
- Auto-accept when confidence is high
- Escalates to human review when memory is absent or weak
- Every decision is explainable

### 4. Explainability & Audit Trail
- Clear reasoning provided for every decision
- Audit trail logs recall and application steps
- Confidence score shown per invoice

---

## Tech Stack
- TypeScript (strict mode)
- Node.js
- ts-node (runtime execution)
- File-based persistence (JSON)

---

## Project Structure

    flowbit-ai-agent/
    ├── data/
    │   ├── invoices.json              
    │   ├── purchase_orders.json      
    │   ├── delivery_notes.json        
    │   └── human_corrections.json     
    │
    ├── src/
    │   ├── index.ts                   
    │   ├── outputBuilder.ts           
    │   │
    │   ├── memory/
    │   │   └── vendorMemory.ts        
    │   │
    │   └── utils/
    │       └── dataLoader.ts         
    │
    ├── package.json                 
    ├── package-lock.json              
    ├── tsconfig.json                  
    └── README.md                      
