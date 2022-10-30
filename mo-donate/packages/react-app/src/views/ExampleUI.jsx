import { Button, Divider, Input, Progress } from "antd";
import React, { useState } from "react";
import axios from "axios";
var Web3 = require("web3");

export default function ExampleUI({
  _totalSupply,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [amount, setAmount] = useState(0);

  const discordEndpoint =
    "https://discord.com/api/webhooks/1005312867534381138/HCSbdpiDO8ThIjHsTD_ZO0unDe_4JA3qNyds8X6TtVisqxOIkoebF7f_HCKD_P4WW1W1";

  function postNewEntryToDiscord() {
    axios.post(discordEndpoint, {
      content: "A new entry has been purchased by: " + address,
    });
  }

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>MineOnlium Donation Contract:</h2>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            onChange={e => {
              setAmount(e.target.value);
            }}
          />
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
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
