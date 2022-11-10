pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// Bank allows users to deposit native EVM currency.
// After users have stored funds. They can make a
// request to move the funds to another chain. 
// The user will need to provide a Transaction ID
// when making the request to bridge the funds.
contract Bank is Ownable {
    // event Mint(address indexed to, uint256 amount);
    // event Burn(address indexed burner, uint256 value);

    event Stored(address from, uint256 amount);
    event Withdrawn(address to, uint256 amount);

    uint256 public _totalSupply;

    /**
     * @dev Store value in the contract and emit an event. This emit will be
     *      picked up by the BridgeWatcher and sent to the other chain.
     */
    receive() external payable {
        require(msg.value > 0, "Value must be greater than 0");
        emit Stored(msg.sender, msg.value);
    }

    /**
     * @dev Withdraw value from the contract and emit an event. This emit will be
     *      picked up by the BridgeWatcher and sent to the other chain.
     */
    function withdraw(uint256 amount, address wallet) external onlyOwner {
        address payable _wallet = payable(wallet);
        _wallet.transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

}
