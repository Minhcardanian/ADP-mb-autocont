# Software Requirements Specification (SRS) for Dormitory Contract Automation using Cardano Aiken

![CI](https://github.com/your-org/adp-mb-autocont/actions/workflows/ci.yml/badge.svg)

**Author:** Bui Quang Minh  
**Date:** *\today*  

## Table of Contents
1. [Introduction](#introduction)  
   1. [Ideology and Context](#ideology-and-context)  
   2. [Problems in Current Dormitory Management](#problems-in-current-dormitory-management)  
2. [Technology Stack](#technology-stack)  
3. [Technical Requirements](#technical-requirements)  
   1. [Contract Automation for Fee Extension](#contract-automation-for-fee-extension)  
   2. [Automated Slashing Mechanism](#automated-slashing-mechanism)  
   3. [Contract Termination and Burning](#contract-termination-and-burning)  
   4. [Web-Based Platform](#web-based-platform)  
4. [Smart Contract Design](#smart-contract-design)  
5. [Milestones for Development](#milestones-for-development)  
6. [Complexity and Scope](#complexity-and-scope)  
   1. [Project Complexity](#project-complexity)  
   2. [Limitations](#limitations)  
7. [Conclusion](#conclusion)  

---

## Introduction

### Ideology and Context
Dormitory management traditionally involves manual contract extensions, fee collections, and enforcement of regulations. This manual approach often leads to inefficiencies, errors, inconsistencies, and conflicts. The adoption of blockchain technology introduces automation, security, and immutable transparency, addressing these operational challenges comprehensively.

Blockchain significantly enhances residential management such as dormitory operations by:
- Ensuring immutable, tamper-proof records.  
- Providing automated and unbiased execution of agreements.  
- Offering complete transparency to residents and administrators.  
- Reducing operational costs and administrative burden.  

This project leverages Cardano's Aiken smart contract language due to its robust functional programming capabilities, precise formal verification methods, and high security standards, making it ideal for sensitive management tasks involving financial transactions and rule enforcement.

### Problems in Current Dormitory Management
Currently, dormitory management faces several critical challenges:

| **Issue**                     | **Impact**                                              |
|-------------------------------|----------------------------------------------------------|
| Manual Contract Extensions    | Frequent delays and errors.                             |
| Inconsistent Rule Enforcement | Disputes and dissatisfaction among residents.           |
| Lack of Transparency          | Mistrust and administrative inefficiencies.             |
| Contract Expiration Disputes  | Unnecessary disputes over contractual obligations.       |

---

## Technology Stack

| **Component**             | **Technology**                                                |
|---------------------------|----------------------------------------------------------------|
| Smart Contracts           | Cardano Aiken                                                 |
| Blockchain Infrastructure | Cardano Testnet/Mainnet                                       |
| Backend                   | Node.js (Express.js)                                          |
| Frontend                  | React.js with Next.js                                         |
| Database                  | PostgreSQL/Firebase                                           |
| Hosting                   | Netlify (Frontend), AWS/Digital Ocean (Backend)               |
| Authentication            | Cardano wallets (Nami, Eternl, Lace)                         |
| **Cardano Library**       | Lucid (for on-chain interactions and scripts)                |
| **API Services**          | Blockfrost (for Cardano network queries)                     |

---

## Technical Requirements

### Contract Automation for Fee Extension
|                                                                        |
|------------------------------------------------------------------------|
| Automatic verification of payments at precise scheduled intervals.     |
| Immediate on-chain updates upon payment confirmation.                  |
| Automatic issuance of penalties and warnings upon missed deadlines.    |
| Contracts must have at least 99.99% uptime.                            |

### Automated Slashing Mechanism
|                                                                        |
|------------------------------------------------------------------------|
| Immediate, transparent penalty application for rule violations.        |
| Governance-controlled adjustable rulesets stored immutably on-chain.   |
| Penalties escalate automatically for repeated violations.              |
| All penalty actions require audit trails recorded on-chain.            |

### Contract Termination and Burning
|                                                                        |
|------------------------------------------------------------------------|
| Automatic contract expiration and burning at a predefined timestamp.   |
| Mandatory settlement of balances and violations prior to termination.  |
| Immutable recording of termination transactions.                        |

### Web-Based Platform
The web-based platform should offer an intuitive, responsive, and user-friendly interface for both residents and Dormitory Management Board (DMB) members. Key UI requirements include:

- A dashboard displaying clear summaries of contract statuses, payment due dates, penalties, and transaction histories.
- Real-time notifications for upcoming payments, overdue statuses, and rule violations.
- Interactive components for rule updates and penalty reviews accessible to DMB members.
- Blockchain-based authentication via integrated Cardano wallets, providing secure user identification and transaction signing.
- Transparent views linked directly to blockchain explorers for verifiable transaction tracking.
- An intuitive navigation system facilitating easy access to all relevant contract details and governance controls.

---

## Smart Contract Design
The smart contract architecture will comprise:
- **Fee Management**: Logic to handle automated fee verification and renewal.  
- **Penalty Enforcement**: On-chain penalty logic triggered by predefined rule violations.  
- **Contract Lifecycle Management**: Mechanisms for automated burning of contracts upon expiration.  
- **Governance Control**: Ability for the DMB to set and adjust penalty and rule parameters securely.  

> **Smart Contract Model:**
> The Aiken smart contract will enforce state transitions based on fee payments, rule violations, and time-based contract expiration. It ensures concurrency handling by requiring correct signatures and inputs on every transaction. All contractual data—such as fee obligations, penalty records, and lifecycle events—are stored or referenced immutably on-chain.

---

## Milestones for Development
Below is a Gantt chart illustrating the timeline for each major phase of the dormitory contract automation project, from initial research and design to final deployment.

**Figure**:  
![Development Milestones and Phases](milestone2.png)

**Weekly Breakdown**:
- **Weeks 1-4 (Research & Design)**
  - Finalize project requirements and success metrics.
  - Outline smart contract logic and identify governance structures.
  - Define penalty and fee extension mechanisms.
- **Weeks 5-8 (Smart Contract Development)**
  - Implement fee extension logic in Aiken.
  - Develop penalty enforcement (slashing) mechanism.
  - Write initial test cases for security and performance.
- **Weeks 9-12 (Web Platform Development)**
  - Establish Node.js backend and database integration.
  - Build React.js frontend with wallet authentication.
  - Integrate on-chain data retrieval via Cardano APIs.
- **Weeks 13-16 (Testing & Deployment)**
  - Conduct full-scale testing on Cardano testnet.
  - Perform security audits and code reviews.
  - Deploy final version to mainnet upon successful testing.

## Aiken Development Basics

The repository includes a `contracts/` directory containing Aiken source files.
Install the [Aiken CLI](https://aiken-lang.org) and compile contracts using:

```bash
aiken build
```

This generates validator scripts that can be deployed or interacted with using
the Lucid library.

## Tasks for Full Production

1. Finalize Lucid-based integration with Cardano testnet using network magic 2.
2. Implement deployment scripts for Aiken contracts with automated network configuration.
3. Develop comprehensive test suite covering contract logic and web platform.
4. Establish CI/CD pipeline for building, testing, and mainnet deployment.
5. Prepare production infrastructure and document operational procedures.
6. Compile and validate basic Aiken contract functions.
7. Document installation of the `aiken` CLI and ensure build scripts check for its presence.

---

## Installation

```bash
git clone https://github.com/your-org/adp-mb-autocont.git
cd adp-mb-autocont
npm install
cp .env.example .env
```
Install the [Aiken](https://aiken-lang.org/) CLI separately and ensure the `aiken` binary is available in your `PATH` for contract compilation.

## Development

- `npm run dev` – start the Express server with hot reload
- `npm run aiken:build` – compile Aiken contracts

## Testing

Run all unit tests with:

```bash
npm test
```

## Build & Deploy

```bash
npm run build
npm start
```

Docker deployment:

```bash
docker compose up --build
```

## API Reference

| Method | Endpoint            | Body                                     | Description                        |
|-------|--------------------|------------------------------------------|------------------------------------|
| POST  | `/api/deploy`      | -                                        | Compile and deploy Aiken contract. |
| POST  | `/api/extend-fee`  | `{ contractAddress, tenantPubKeyHash, amount }` | Extend contract fee period.       |
| POST  | `/api/slash`       | `{ contractAddress, violatorPubKeyHash, reasonCode }` | Apply a slashing penalty. |

---

## Complexity and Scope

### Project Complexity
The project requires addressing advanced blockchain concepts:

- High-security standards and rigorous contract logic validation.
- Dynamic governance structures for flexible administration.
- Automated, verifiable penalty enforcement.
- High-availability requirements for user interactions.

**Assumptions**:
- Reliable internet connectivity for seamless blockchain interactions.
- Adequate blockchain network performance and transaction processing capacity.
- User familiarity with basic blockchain wallet operations.

### Limitations
- Initial deployment limited to testnet to manage risk.
- Performance dependent on Cardano blockchain network congestion.
- Scalability constraints may arise with increased user base.
- Regulatory compliance may limit certain functionalities.

---

## Conclusion
Integrating blockchain technology, specifically Cardano and Aiken, transforms dormitory management by significantly enhancing operational transparency, security, and fairness. Automation of critical processes ensures accuracy, reduces disputes, and creates a reliable, efficient management system.

