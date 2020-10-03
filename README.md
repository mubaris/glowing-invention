
Create `.env` file with following content:

```
INFURA=<INFURA_PROJECT_ID>
MNEMONIC=<SEED_KEY_FOR_DEPLOYMENT>
```

Install dependencies: `npm install`

Run the trial run script with `node scripts/run.js`

### Output Example

```
[ 'mkr', 'dai', 'weth', 'usdc' ] 209833592159
[ 'usdc', 'weth', 'usdt' ] 1
[ 'usdt', 'usdc', 'weth', 'mkr' ] 7
[ 'mkr', 'dai' ] 209833592159
[ 'usdt', 'usdc', 'weth', 'wbtc' ] 152397
[ 'wbtc', 'weth', 'dai' ] 3214804568846147406
[ 'usdt', 'usdc', 'weth' ] 2
[ 'weth', 'mkr' ] 395841
```