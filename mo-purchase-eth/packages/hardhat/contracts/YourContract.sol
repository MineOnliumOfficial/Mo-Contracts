// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import from node_modules @openzeppelin/contracts v4.0
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/** 
  *@title Purchase contract
*/
contract YourContract is Ownable, ReentrancyGuard {
    uint256 public _totalSupply;
    event Purchase(address sender, uint256 ammount);
    
    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    /** 
      * @dev function to buy Mo with Ether
    */
    function buy() public payable nonReentrant returns (bool sucess) {
      require(msg.sender.balance >= msg.value && msg.value != 0 ether, "invalid input");
      uint256 amount = msg.value;
      _totalSupply += amount;
      emit Purchase(msg.sender, msg.value);
      return true;
    }

    /** 
      * @param amount (type uint256) amount of ether
      * @dev function use to withdraw ether from contract
    */
    function withdraw(uint256 amount) public onlyOwner returns (bool success) {
      require(amount <= address(this).balance, "Donation: function withdraw invalid input");
      payable(_msgSender()).transfer(amount);
      return true;
    }
}