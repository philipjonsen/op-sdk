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
