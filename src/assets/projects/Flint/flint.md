---
date: 2018-06-00
title: Flint Programming Language
github: flintlang/fint
external: https://arxiv.org/abs/1904.06534
tech:
  - Swift
  - Ethereum / YUL
description: >
  As part of a UROP, I expanded Flint - a new type-safe, contract-oriented programming language designed for writing robust smart contracts on Ethereum - from a proof of concept. I co-authored the research paper ‘Flint for Safer Smart Contracts’.
company: Imperial College London
highlight: false
---

# The Flint Programming Language

Flint is a new type-safe, contract-oriented programming language specifically designed for writing robust smart contracts on Ethereum.

Medium articles:
[Write Safer Smart Contracts](https://medium.com/@susan.eisenbach/write-safer-smart-contracts-b0c8049f72c5) and
[Flint: A New Language for Safe Smart Contracts on Ethereum](https://medium.com/@fschrans/flint-a-new-language-for-safe-smart-contracts-on-ethereum-a5672137a5c7)

Programming 2018! paper: [Writing Safe Smart Contracts in Flint](https://dl.acm.org/citation.cfm?doid=3191697.3213790)


Current working paper: [Flint for Safer Smart Contracts](https://arxiv.org/abs/1904.06534)

Flint has been developed as part of projects and summer work at [Imperial College Department of Computing](https://www.doc.ic.ac.uk) under the supervision of Professors Susan Eisenbach and Sophia Drossopoulou. Its original developer was Franklin Schrans for his MEng thesis and then continued.

Flint is still under active development and proposes a variety of novel _contract-oriented_ features.

### Caller Protections

[**Caller protections**](https://docs.flintlang.org/caller-protections) require programmers to think about who should be able to call the contract’s sensitive functions. Protections are checked statically for internal calls (unlike Solidity modifiers), and at runtime for calls originating from external contracts.

Example:

```swift
// State declaration
contract Bank {
  var manager: Address
}

// Functions are declared in protection blocks,
// which specify which users are allowed to call them.
Bank :: (manager) { // manager is a state property.

  // Only `manager` of the Bank can call `clear`.
  func clear(address: Address) {
    // body
  }
}

// Anyone can initialize the contract.
Bank :: (any) {
  public init(manager: Address) {
    self.manager = manager
  }
}
```

### Type States
[**Type States**](docs/language_guide.md#type-states) integrate a design pattern of stateful contracts into the language itself, which both require programmers to think about what state a function can be called in but also to prevent vulnerabilities (e.g. Parity Multi-Sig wallet) from mistakes with respect to administrating state. States are checked statically for internal calls (unlike Solidity modifiers), and at runtime for calls originating from external contracts.

Example:
```swift
// Enumeration of states.
contract Auction (Preparing, InProgress) {}

Auction @(Preparing, InProgress) :: caller <- (any) {
  public init() {
    // ...
    become Preparing
  }
}

Auction @(Preparing) :: (beneficiary) {
  public func setBeneficiary(beneficiary: Address) mutates (beneficiary) {
    self.beneficiary = beneficiary
  }

  func openAuction() -> Bool {
    // ...
    become InProgress
  }
}
```

### Immutability by default

**Restricting writes to state** in functions helps programmers more easily reason about the smart contract. A function which writes to the contract’s state needs to be annotated with the `mutates (...)` keyword, giving the list of variables that are mutated.

Example:

```swift
Bank :: (any) {
  func incrementCount() mutates (count) {
    // count is a state property
    count += 1
  }

  func getCount() -> Int {
    return count
  }

  func decrementCount() {
    // error: Use of mutating statement in a nonmutating function
    // count -= 1
  }
}
```

### Asset types

[**Assets**](docs/language_guide.md#assets), such as Ether, are often at the center of smart contracts. Flint puts assets at the forefront through the special _Asset_ trait.

Flint's Asset type ensure a contract's state always truthfully represents its Ether value, preventing attacks such as TheDAO.

A restricted set of atomic operations can be performed on Assets. It is impossible to create, duplicate, or lose Assets (such as Ether) in unprivileged code. This prevents attacks relating to double-spending and re-entrancy.

Example use:

```swift
Bank :: account <- (balances.keys) {
  @payable
   func deposit(implicit value: inout Wei) mutates (balances) {
    // Omitting this line causes a compiler warning: the value received should be recorded.
    balances[address].transfer(&value)
  }

  func withdraw() mutates(account, balances) {
    // balances[account] is automatically set to 0 before transferring.
    send(account, &balances[account])
  }
}
```

The Asset feature is still in development. The [FIP-0001: Introduce the Asset trait](proposals/0001-asset-trait.md) proposal includes more details.

### Safer semantics

In the spirit of reducing vulnerabilities relating to unexpected language semantics, such as wrap-arounds due to integer overflows, Flint aims to provide safer operations. For instance, arithmetic operations on `Int` are safe by default: an overflow/underflow causes the Ethereum transaction to be reverted.
