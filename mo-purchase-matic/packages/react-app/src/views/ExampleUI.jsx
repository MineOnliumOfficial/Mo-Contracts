import { Button, Divider, Input } from "antd";
import React, { useState } from "react";
import axios from "axios";
var Web3 = require("web3");

export default function ExampleUI({
  _totalSupply,
  address,
  // mainnetProvider,
  // localProvider,
  // yourLocalBalance,
  // price,
  tx,
  // readContracts,
  writeContracts,
}) {
  const [amount, setAmount] = useState(0);


  return (
    <div >
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "no", padding: 0, width: 390, margin: "auto", marginTop: 10 }}>
        <div style={{ padding: 4, margin: 8, border: "1px solid #cccccc" }}>
          <h2>Purchase MineOnlium</h2>
          <p>
            <div style={{ padding: 0, margin: 4, border: "no" }}>
            </div>
          </p>

        </div>
        <div style={{ padding: 4, margin: 8, border: "1px solid #cccccc" }}>
          <div style={{ margin: 8 }}>
            <Input
              style={{ backgroundColor:"white", color:"black", width: 50 }} 
              onChange={e => {
                setAmount(e.target.value);
              }}
            /> {" "}/ MO
          </div>
              Cost: {amount} MATIC
          <div style={{ padding: 4, margin: 8, border: "no" }}>
            <Button
              onClick={async () => {
                const result = tx(
                  writeContracts.YourContract.buy({
                    value: Web3.utils.toWei(amount, "ether"),
                    nonce: 0,
                  }),
                  update => {
                    console.log("📡 Transaction Update:", update);
                    if (update && (update.status === "confirmed" || update.status === 1)) {
                      console.log(" 🍾 Transaction " + update.hash + " finished!");
                      console.log(
                        " ⛽️ " +
                          update.gasUsed +
                          "/" +
                          (update.gasLimit || update.gas) +
                          " @ " +
                          parseFloat(update.gasPrice) / 1000000000 +
                          " gwei",
                      );
                    }
                  },
                );
                console.log("awaiting metamask/web3 confirm result...", result);
                console.log(await result);
              }}
            >
              Purchase
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
