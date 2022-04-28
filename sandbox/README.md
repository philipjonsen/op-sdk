This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## User Journey

## BondFi Partner

OlympusDAO runs the script

-> Create treasury
-> MeanFi sends MEAN token to treasury
-> Create bonder
-> Principal Token (SOL)
-> Payout Token (MEAN)
-> Database updated with new bond details.

Output: SOL / MEAN bond created.

---

-> User Purchases SOL
-> User purchases SOL / MEAN bond on OP (Amount 20 SOL)
-> User claims bond instantly (0 days vesting)
-> User receives 20 MEAN.

## ROI on frontend is calculated as follows:

Bond Price: 70.55
Market Price: 72.52

// (Market Price - Bond Price ) / Bond Price
Discount = (72.52 - 70.55) / 70.55 = 0.02792345854004251

// Convert to percentage based
Discount * 100 = 2.792345854004251%

Need to find out the bond price and market price of the payout token...

---

## Finding Max Payout Value for bond screen...

maxPayoutPercent = 100%
payoutMintSupply = 10000

// (Payout Mint Supply _ Max Payout Percent) / 100
(10000 * 100) / 100 = 10,000 tokens
(10000 * 75) / 100 = 7,5000 tokens
