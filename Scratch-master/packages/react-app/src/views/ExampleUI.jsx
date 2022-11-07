import { box, Divider } from "antd";
import React, { useState, useEffect } from "react";
import { utils } from "ethers";
import { Button, Card, CardHeader, CardText, CardTitle, Col, Row } from "reactstrap";
import Countdown from "react-countdown";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

import { StakedView, Leaderboard, Playerlist, Wallet } from "../components";

var Web3 = require("web3");

const discordEndpoint =
  "";

export default function ExampleUI({
  address,
  tx,
  readContracts,
  writeContracts,
  localProvider,
  mainnetProvider,
  userProviderAndSigner,
  price,
}) {
  const [totalSupply, settotalSupply] = useState([]);
  const [leaderBoard, setleaderBoard] = useState([]);
  const [lifetimeWinnings, setlifetimeWinnings] = useState(0);
  const [showMoreInfo, setshowMoreInfo] = useState(false);
  const [showHowToPlay, setshowHowToPlay] = useState(false);
  const [showStats, setshowStats] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);
  const [userPolygonAddress, setUserPolygonAddress] = useState("0X");
  const [playerList, setPlayerList] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const result = await readContracts.Lottery.getTotalSupply();
      settotalSupply(utils.formatEther(result));

      const result2 = await readContracts.Lottery.getLeaderBoard();
      setleaderBoard(result2);

      const lw = await readContracts.Lottery.getLifetimeWinnings();
      setlifetimeWinnings(lw);

      const pl = await readContracts.Lottery.getPlayers();
      setPlayerList(pl);
    } catch (e) {
      console.log(e);
    }

    setUserPolygonAddress(address);
  }, [readContracts, writeContracts, address, utils]);

  function postNewEntryToDiscord() {
    axios.post(discordEndpoint, {
      content: "A new entry has been purchased by: " + address,
    });
  }

  function postNewWinnerToDiscord() {
    axios.post(discordEndpoint, {
      content: "A new Mo-Scratch winner is currently being selected by the Scratch Smart Contract...",
    });
  }

  function postConfirmedPaypalUserToDiscord() {
    axios.post(discordEndpoint, {
      content:
        "Player with address: " + userPolygonAddress + " has been confirmed by the Scratch Smart Contract.",
    });
  }

  function postNewPaypalEntryToDiscord() {
    axios.post(discordEndpoint, {
      content: "A new entry has been purchased via with address: " + userPolygonAddress,
    });
  }

  return (
    <div>
      <div
        style={{
          border: "1px solid #cccccc",
          padding: 26,
          width: "80%",
          margin: "auto",
          marginTop: 64,
          background: "light-blue",
        }}
      >
        <div style={{ border: "2px solid #cccccc", padding: "20px", background: "#cc71c3" }}>
          <Card>
            <CardHeader style={{ justifyContent: "center", background: "#ff9c92" }}>
              <CardTitle>
                <span
                  style={{
                    textShadow: "0px 0px 10px #cc71c3",
                    fontSize: "7em",
                    fontWeight: "bold",
                    color: "#ffe94d",
                  }}
                >
                  Scratch{" "}
                </span>
                <p> </p>
              </CardTitle>
            </CardHeader>
            <CardText style={{ padding: "20px", background: "#5a9ded" }}>
              <h6>
                <div
                  style={{
                    border: "2px solid #cc71c3",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid #cc71c3",
                      padding: "20px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        setshowMoreInfo(!showMoreInfo);
                      }}
                      style={{
                        textShadow: "0px 0px 10px #cc71c3",
                        fontSize: "4.0em",
                        fontWeight: "bold",
                        backgroundColor: "#cc71c3",
                        WebkitBoxShadow: "0px 0px 10px black",
                      }}
                    >
                      What is Scratch?
                    </Button>
                  </div>
                  {showMoreInfo && (
                    <div
                      style={{
                        padding: "20px",
                        alignItems: "left",
                        backgroundColor: "#5a9ded",
                      }}
                    >
                      <p>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ✅ <b>Decentralized raffle platform </b>designed to be a means to an end for "unfair" or
                          "shady" betting experiences.
                        </span>
                      </p>
                      <div
                        style={{
                          padding: "20px",
                          alignItems: "left",
                          backgroundColor: "#5a9ded",
                        }}
                      >
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ✅ Designed from the ground up to{" "}
                          <b>remove any possibilities of owner manipulation & foul play</b>
                        </span>
                      </div>

                      <span
                        style={{
                          textShadow: "0px 0px 10px #cc71c3",
                          fontSize: "1.5em",
                          fontWeight: "bold",
                        }}
                      >
                        <p>
                          ✅ <b>Community owned and operated</b>
                        </p>
                      </span>

                      <div
                        style={{
                          padding: "20px",
                          alignItems: "left",
                          backgroundColor: "#5a9ded",
                        }}
                      >
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ✅ <b>Transparent.</b> Every transaction is public and can be viewed on the{" "}
                        </span>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          <a
                            style={{ color: "#ffe94d" }}
                            href="https://mo-scout.com/address/0x18CC20df6494B2eA3333586B7b13E6340FCdE0F2"
                          >
                            Mo-Scout
                          </a>{" "}
                          explorer.
                          <div
                            style={{
                              padding: "20px",
                              alignItems: "left",
                              backgroundColor: "#5a9ded",
                            }}
                          >
                            <p>
                              ✅ %100 open source and available on{" "}
                              <a style={{ color: "#ffe94d" }} href="https://github.com/MineOnliumOfficial/Mo-Contracts">
                                Github
                              </a>
                            </p>
                          </div>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    border: "2px solid #cc71c3",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid #cc71c3",
                      padding: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        setshowHowToPlay(!showHowToPlay);
                      }}
                      style={{
                        textShadow: "0px 0px 10px #cc71c3",
                        fontSize: "4.0em",
                        fontWeight: "bold",
                        backgroundColor: "#cc71c3",
                        WebkitBoxShadow: "0px 0px 10px black",
                      }}
                    >
                      How to Play
                    </Button>
                  </div>
                  {showHowToPlay && (
                    <div
                      style={{
                        padding: "20px",
                        alignItems: "center",
                      }}
                    >
                      <p>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ☞ Players send MO to a Smart Contract, via one of the buttons below, in return for entries
                          into the raffle. <b>(10 MO = 1 entry.)</b>
                        </span>
                      </p>

                      <p>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          ☞ Currently, a winner is selected every three days.
                        </span>
                      </p>

                      <p>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ☞ Once the game is over, the winner is selected at random from a list of current players and
                          is alloted the Prize pool!
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div
                  style={{
                    border: "2px solid #cc71c3",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid #cc71c3",
                      padding: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        setshowStats(!showStats);
                      }}
                      style={{
                        textShadow: "0px 0px 10px #cc71c3",
                        fontSize: "4.0em",
                        fontWeight: "bold",
                        backgroundColor: "#cc71c3",
                        WebkitBoxShadow: "0px 0px 10px black",
                      }}
                    >
                      View Current Game Stats
                    </Button>
                  </div>
                  {showStats && (
                    <div style={{ padding: "20px" }}>
                      <Col>
                        {/* Current Pot Total */}
                        <div style={{ border: "2px solid #cccccc", padding: "20px", background: "#5a9ded" }}>
                          <div style={{ padding: "20px", backgroundColor: "#5a9ded" }}>
                            <div style={{ margin: 8, backgroundColor: "#ff9c92" }}>
                              <h3>
                                {" "}
                                <span
                                  style={{
                                    textShadow: "0px 0px 10px #cc71c3",
                                    fontSize: "1.5em",
                                    fontWeight: "bold",
                                    color: "white",
                                  }}
                                >
                                  Current Pot Total
                                </span>
                              </h3>
                              <Card>
                                <div
                                  style={{ border: "2px solid #cccccc", padding: "20px", backgroundColor: "#5a9ded" }}
                                >
                                  <StakedView balance={totalSupply}></StakedView>
                                </div>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        {/* Lifetime Winnings */}
                        <div style={{ border: "2px solid #cccccc", padding: "20px", background: "#5a9ded" }}>
                          <div style={{ backgroundColor: "#ff9c92" }}>
                            <h3>
                              <span
                                style={{
                                  textShadow: "0px 0px 10px #cc71c3",
                                  fontSize: "1.5em",
                                  fontWeight: "bold",
                                  color: "white",
                                }}
                              >
                                Lifetime Winnings
                              </span>
                            </h3>
                            <div style={{ border: "2px solid #cccccc", padding: "20px", backgroundColor: "#5a9ded" }}>
                              <StakedView balance={utils.formatEther(lifetimeWinnings)}></StakedView>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        {/* Leaderboard */}
                        <div style={{ border: "2px solid #cccccc", padding: "20px", background: "#5a9ded" }}>
                          <div style={{ margin: 8, backgroundColor: "#ff9c92" }}>
                            <h3>
                              <span
                                style={{
                                  textShadow: "0px 0px 10px #cc71c3",
                                  fontSize: "1.5em",
                                  fontWeight: "bold",
                                  color: "white",
                                }}
                              >
                                Leaderboard
                              </span>
                            </h3>
                            <Leaderboard leaderBoard={leaderBoard} />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        {/* Player List */}
                        <div style={{ border: "2px solid #cccccc", padding: "20px", background: "#5a9ded" }}>
                          <div style={{ margin: 8, backgroundColor: "#ff9c92" }}>
                            <h3>
                              <span
                                style={{
                                  textShadow: "0px 0px 10px #cc71c3",
                                  fontSize: "1.5em",
                                  fontWeight: "bold",
                                  color: "white",
                                }}
                              >
                                Player List
                              </span>
                            </h3>
                            <Playerlist playerList={playerList} />
                          </div>
                        </div>
                      </Col>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    border: "2px solid #cc71c3",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid #cc71c3",
                      padding: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      style={{
                        textShadow: "0px 0px 10px #cc71c3",
                        fontSize: "4.0em",
                        fontWeight: "bold",
                        backgroundColor: "#cc71c3",
                        WebkitBoxShadow: "0px 0px 10px black",
                      }}
                    >
                      Support
                    </Button>
                  </div>
                  <div
                    style={{
                      padding: "20px",
                      alignItems: "center",
                    }}
                  >
                    <p>
                      {" "}
                      <span
                        style={{
                          textShadow: "0px 0px 10px #cc71c3",
                          fontSize: "1.5em",
                          fontWeight: "bold",
                        }}
                      >
                        For questions or comments, please dont hesitate to contact us at:{" "}
                        <a style={{ color: "#ffe94d" }} href="mailto:filth@mineonlium.org">
                          filth@mineonlium.org
                        </a>
                        <p></p>
                        <p>
                          Or, join the community on{" "}
                          <a style={{ color: "#ffe94d" }} href="https://discord.gg/4JFjejV4FN">
                            Discord!
                          </a>
                        </p>
                      </span>
                    </p>
                  </div>
                </div>
              </h6>
            </CardText>
          </Card>
          {/* </div> */}
        </div>

        {/* Buy */}
        <div style={{ border: "2px solid #cccccc", padding: "40px", background: "#ff9c92" }}>
          <Row>
            <Col span={12}>
              <Button
                type="primary"
                style={{
                  textShadow: "0px 0px 10px #cc71c3",
                  fontSize: "4.0em",
                  fontWeight: "bold",
                  backgroundColor: "#cc71c3",
                  WebkitBoxShadow: "0px 0px 10px black",
                }}
                onClick={async () => {
                  const result = tx(
                    writeContracts.Lottery.depositEth({
                      value: Web3.utils.toWei("10", "ether"),
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
                <b>Play via Crypto</b>
              </Button>
            </Col>
            {/* <Col span={12}>
              <Button
                type="primary"
                style={{
                  textShadow: "0px 0px 10px #cc71c3",
                  fontSize: "4.0em",
                  fontWeight: "bold",
                  backgroundColor: "#cc71c3",
                  WebkitBoxShadow: "0px 0px 10px black",
                }}
                onClick={async () => {
                  setShowPaypal(true);
                }}
              >
                <b>Play via Paypal (SLOW)</b>
              </Button>

              {showPaypal && (
                <div style={{ border: "2px solid #cccccc", padding: "40px", background: "#ff9c92" }}>
                  <div
                    style={{
                      padding: "20px",
                      alignItems: "left",
                      backgroundColor: "#5a9ded",
                    }}
                  >
                    <span
                      style={{
                        textShadow: "0px 0px 10px #cc71c3",
                        fontSize: "1.5em",
                        fontWeight: "bold",
                      }}
                    >
                      <p>
                        Due to security risks, please allow up to 24 hours for Paypal entries to be confirmed. The
                        confirmation notices are all posted to the #general channel in the community{" "}
                        <a style={{ color: "#ffe94d" }} href="https://discord.gg/pHMTaNdvve">
                          Discord!
                        </a>{" "}
                      </p>

                      <b>Place a valid address on the Polygon network below before submitting your transaction. </b>
                      <p>
                        <p>
                          If you dont have a Wallet, you can use the one we have generated for you here:{" "}
                          <Wallet provider={localProvider} address={address} price={price} color="#ffe94d" />
                          <b> Dont forget to export your Private Key and save it!!!</b>
                        </p>
                        If you need help setting up a new Wallet, you can find information{" "}
                        <a href="https://p2enews.com/news/how-to-create-polygon-wallet-using-metamask/"> here.</a>
                        Feel free to contact us on{" "}
                        <a style={{ color: "#ffe94d" }} href="https://discord.gg/pHMTaNdvve">
                          Discord!
                        </a>{" "}
                        Or email{" "}
                        <a style={{ color: "#ffe94d" }} href="mailto:SafeTradeIO@proton.me">
                          SafeTradeIO@proton.me
                        </a>{" "}
                        for help!
                      </p>
                    </span>
                  </div>
                  <input
                    style={{
                      border: "2px solid #cccccc",
                      padding: "20px",
                      width: "100%",
                    }}
                    type="text"
                    value={userPolygonAddress}
                    onChange={e => setUserPolygonAddress(e.target.value)}
                  />
                  {userPolygonAddress.length > 40 && (
                    <div style={{ border: "2px solid #cccccc", padding: "40px", background: "#ff9c92" }}>
                      <PayPalScriptProvider
                        options={{
                          "client-id": "",
                        }}
                      >
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: "12.00",
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            alert("Dont forget to export your Private Key and save it!!!!");
                            return actions.order.capture().then(details => {
                              postNewPaypalEntryToDiscord();
                            });
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                </div>
              )} */}
            {/* </Col> */}
          </Row>
        </div>

        {/* Pickwinner */}
        {/* only render this div if the logged in account is the owner */}
        {address == "0x5bbfa5724260Cb175cB39b24802A04c3bfe72eb3" && (
          <div>
            <div style={{ border: "2px solid #cccccc", padding: "10px" }}>
              <Button
                style={{ marginTop: 8 }}
                onClick={async () => {
                  const result = tx(writeContracts.Lottery.pickWinner(), update => {
                    console.log("📡 Transaction Update:", update);
                    if (update && (update.status === "confirmed" || update.status === 1)) {
                      postNewWinnerToDiscord();
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
                  });
                  console.log("awaiting metamask/web3 confirm result...", result);
                  console.log(await result);
                }}
              >
                Pick Winner
              </Button>
            </div>
            <div style={{ border: "2px solid #cccccc", padding: "10px" }}>
              <input
                style={{
                  border: "2px solid #cccccc",
                  padding: "20px",
                  width: "100%",
                }}
                type="text"
                value={userPolygonAddress}
                onChange={e => setUserPolygonAddress(e.target.value)}
              />
              <Button
                style={{ marginTop: 8 }}
                onClick={async () => {
                  const result = tx(
                    writeContracts.Lottery.addPaypalUser(userPolygonAddress, {
                      value: Web3.utils.toWei("10", "ether"),
                      nonce: 0,
                    }),
                    update => {
                      console.log("📡 Transaction Update:", update);
                      if (update && (update.status === "confirmed" || update.status === 1)) {
                        postConfirmedPaypalUserToDiscord();
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
                Add External Player
              </Button>
            </div>
            <div style={{ border: "2px solid #cccccc", padding: "10px" }}>
              <input
                style={{
                  border: "2px solid #cccccc",
                  padding: "20px",
                  width: "100%",
                }}
                type="text"
                value={userPolygonAddress}
                onChange={e => setUserPolygonAddress(e.target.value)}
              />
              {/* <Button
                style={{ marginTop: 8 }}
                onClick={async () => {
                  const result = tx(writeContracts.Lottery.addAffliatePlayerEntry(userPolygonAddress), update => {
                    console.log("📡 Transaction Update:", update);
                    if (update && (update.status === "confirmed" || update.status === 1)) {
                      postConfirmedPaypalUserToDiscord();
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
                  });
                  console.log("awaiting metamask/web3 confirm result...", result);
                  console.log(await result);
                }}
              >
                Add Affliate Player
              </Button> */}
            </div>
          </div>
        )}
      </div>
      <Divider />
    </div>
  );
}
