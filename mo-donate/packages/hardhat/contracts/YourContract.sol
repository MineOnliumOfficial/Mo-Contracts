// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import from node_modules @openzeppelin/contracts v4.0
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/** 
  *@title Initial Coin Offerring(ICO) contract
*/
contract YourContract is ERC20, Ownable, ReentrancyGuard {
    uint256 public _totalSupply;
    // constructor() public ERC20("_name", "_symbol") {
    //  // mint to `msg.sender` 
    //  _mint(msg.sender, _amount*(10**uint256(decimals())));
    //  // mint to `_address`
    //  _mint(_address, _amount*(10**uint256(decimals())));
    // }
    
    // Sample constructor
    constructor() ERC20("Mo-Token", "MOT") {
      _mint(msg.sender, 1000000*(10**uint256(decimals())));
    }
    
    /**
      * @param account (type address) address of recipient
      * @param amount (type uint256) amount of token
      * @dev function use to mint token
    */
    function mint(address account, uint256 amount) public onlyOwner returns (bool sucess) {
      require(account != address(0) && amount != uint256(0), "ERC20: function mint invalid input");
      _totalSupply += amount;
      _mint(account, amount);
      return true;
    }

    /** 
      * @param account (type address) address of recipient
      * @param amount (type uint256) amount of token
      * @dev function use to burn token
    */
    function burn(address account, uint256 amount) public onlyOwner returns (bool success) {
      require(account != address(0) && amount != uint256(0), "ERC20: function burn invalid input");
      _burn(account, amount);
       _totalSupply -= amount;
      return true;
    }

     /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    /** 
      * @dev function to buy token with ether
    */
    function buy() public payable nonReentrant returns (bool sucess) {
      require(msg.sender.balance >= msg.value && msg.value != 0 ether, "ICO: function buy invalid input");
      uint256 amount = msg.value
      require(totalSupply() <= 10000 , "ICO: Sold Out :0!!!");
      _transfer(owner(), _msgSender(), amount);
      _totalSupply += amount;w
      return true;
    }

    /** 
      * @param amount (type uint256) amount of ether
      * @dev function use to withdraw ether from contract
    */
    function withdraw(uint256 amount) public onlyOwner returns (bool success) {
      require(amount <= address(this).balance, "ICO: function withdraw invalid input");
      payable(_msgSender()).transfer(amount);
      return true;
    }
}