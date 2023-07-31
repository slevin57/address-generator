import { ethers } from "ethers";
import dayjs from 'dayjs';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import { createWalletNumber } from '../config/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const createWalletNumber = 10
export function createWallet(number = createWalletNumber) {
    const wallets = [];
    // const prefix = "0x0123";
    const prefix = "0x0";

    console.log("正在生成钱包...");

    for (let i = 0; i < number; i++) {
        let wallet;
        let address;

        do {
            wallet = ethers.Wallet.createRandom();
            address = wallet.address.toLowerCase();
        } while (!address.startsWith(prefix));

        wallets.push({
            index: i + 1,
            address,
            mnemonic: wallet.mnemonic.phrase, // 包含助记词
            privateKey: wallet.privateKey
        });

        console.log(`已生成钱包 ${i + 1}/${number}.`);
    }

    const date = dayjs().format('YYYY-MM-DD');
    const basePath = join(__dirname, "./accounts", `${date}_${Date.now()}.js`);
    fs.writeFileSync(basePath, JSON.stringify(wallets, null, "    "));

    console.log("钱包生成完成。");
}

createWallet();

export default createWallet;

// **
//  * 如果进行批量创建钱包，请配置创建钱包的数量
//  * Create wallets in batches
//  */
// export const createWalletNumber = 10;