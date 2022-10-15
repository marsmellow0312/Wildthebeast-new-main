require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "WILD THE BEAST";
const description = "WTB is a collection of 5.000 NFT Beasts a unique digital collection that lives on the polygon blockchain. Each character is born from a unique algorithm, the rarer your BEAST trait, will stronger it is in the game. Your The Beast doubles as your in-game Beast Ecosystem membership card, and grants access to member-only benefits, the first of which is access to THE WILD GAME . Future areas and facilities can be unlocked by the community through roadmap activation. Visit www.WildTheBeast.com for more details.";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

const layerConfigurations = [
  // {
  //   growEditionSizeTo: 5,
  //   layersOrder: [
  //     { name: "24x24 Pixel" },
  //   ],
  // },
  // {
  //   growEditionSizeTo: 5,
  //   layersOrder: [
  //     { name: "Original" },
  //   ],
  // },
  // {
  //   growEditionSizeTo: 5,
  //   layersOrder: [
  //     { name: "Special" },
  //   ],
  // },
  // {
  //   growEditionSizeTo: 6572,
  //   layersOrder: [
  //     { name: "Background" },
  //     { name: "Item" },
  //     { name: "DNA RIP Finger" },
  //     { name: "Hair" },
  //     { name: "Clothes" },
  //     { name: "Hand" },
  //     { name: "Finger" },
  //     { name: "Wrist" },
  //     { name: "Token" },
  //   ],
  // },
  // {
  //   growEditionSizeTo: 5,
  //   layersOrder: [
  //     { name: "Background" },
  //     { name: "Item" },
  //     { name: "DNA RIP Hand" },
  //     { name: "Tattoo" },
  //     { name: "Nails" },
  //     { name: "Hand" },
  //     { name: "Finger" },
  //     { name: "Wrist" },
  //     { name: "Token" },
  //   ],
  // },
  {
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "Background" },
      { name: "Environment" },
      { name: "Fur" },
      { name: "Earring" },
      { name: "Clothes" },
      { name: "Eyes" },
      { name: "Hat" },
      { name: "Mound" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 2005.25,
  height: 2005.25,
  smoothing: true,
};

const extraMetadata = {
  external_url: "https://wildthebeast.com", 
  creator: "KumbangLoncat" // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'polygon'; // only rinkeby, polygon, or ethereum or Mumbai

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'WILD THE BEAST';
const CONTRACT_SYMBOL = 'WTB';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0x627347A67D1538B02B4374a227e6eB18c820D68A';
const TREASURY_ADDRESS = '0x627347A67D1538B02B4374a227e6eB18c820D68A';
const MAX_SUPPLY = 5000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 150.00; // Minting price per NFT. Rinkeby = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const PRESALE_MINT_PRICE = 70.00; // Presale Minting price per NFT. Rinkeby = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 5000; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!
const TEAM_RESERVE = 500; // The number of NFTs that can only be minted by the contract owner for free. CANNOT BE UPDATED!


// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER. 
const PUBLIC_MINT_START_DATE = "2022-10-25T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00
// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-10-14T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 250; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x627347A67D1538B02B4374a227e6eB18c820D68A"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = ["0x627347A67D1538B02B4374a227e6eB18c820D68A","0x6F623193a4ec6530b64fBAB62D7Df8F3F9224b55","0x96A32235B2b2Db3E2B3178864Da0Ac8f718966d8","0x6F623193a4ec6530b64fBAB62D7Df8F3F9224b55","0xcEc1D67D2AE9f99849b974964aAc70C15eBAb336","0x5a4E045Da5aa650BE48F9CCa6eB093A4A75a4849"]; // only update if you want to manually set the whitelisted addresses


// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "The Beast will be released from the cage once you decide to launch on the wildland"; // Replace with what you want the generic descriptions to say.
// const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeibncchird2xjlph5vvus72uzdtcmm4t6rmuhxmi5nrsrgir6dlgyu"; // Replace with your generic image that will display for all NFTs pre-reveal.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeibncchird2xjlph5vvus72uzdtcmm4t6rmuhxmi5nrsrgir6dlgyu"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK") {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "WTB",
  seller_fee_basis_points: 300, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://wildthebeast.com",
  creators: [
    {
      address: "0x627347A67D1538B02B4374a227e6eB18c820D68A",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 5000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  TEAM_RESERVE,
  MINT_PRICE,
  PRESALE_MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
