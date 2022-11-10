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

  const discordEndpoint =
    "";

  function postNewEntryToDiscord() {
    axios.post(discordEndpoint, {
      content: "A donation has appeared! From: " + address + " In the ammount of:  " + amount + " MATIC!",
    });
  }

  return (
    <div >
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "no", padding: 0, width: 390, margin: "auto", marginTop: 10 }}>
        
        
      {/*  <h2>MineOnlium Donation Contract:</h2>
      */}
       
        
        <div style={{ padding: 4, margin: 8, border: "1px solid #cccccc" }}>
          <h2>Support MineOnlium! </h2>
          <p>
            <h3>
              Donations are currently only available on the Polygon blockchain via MATIC. Supporters will receive
              several gifts and rewards for their support:
            </h3>
            <div style={{ padding: 0, margin: 4, border: "no" }}>
              <ul
                style={{
                  listStyleType: "1",
                  fontSize: "13px",
                  textAlignLast: "left",
                  padding: 0,
                  marginLeft: 15,
                  
                }}
              >
                <li>A Shoutout on the MineOnlium Discord Server </li>
                <li>1 WMO on Polygon (per 1 MATIC donated) </li>
                <li>1 MO on MineOnlium (per 1 MATIC donated) </li>
                <li>1 MSTR Token on MineOnlium (1 per donation address) </li>
              </ul>
            </div>
          </p>
          <p>Donations are non-refundable and will be used to fund the development of the MineOnlium project. </p>
        </div>
        <div style={{ padding: 4, margin: 8, border: "1px solid #cccccc" }}>
          <h3>Donate:</h3>
          <div style={{ margin: 8 }}>
            <Input
              onChange={e => {
                setAmount(e.target.value);
              }}
            />
          </div>
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
                      postNewEntryToDiscord();
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
              Donate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
