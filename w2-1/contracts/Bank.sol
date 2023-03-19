// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Bank {

    address public owner;
    mapping(address => uint) public deposits;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    receive() external payable {
        deposits[msg.sender] += msg.value;
    }

    function myDeposited() public view returns(uint) {
        return deposits[msg.sender];
    }

    function withdraw(uint amount) public {
        deposits[msg.sender] -= amount;
        safeTransferETH(msg.sender, amount);
    }

    function  withdrawAll() public onlyOwner {
        uint b = address(this).balance;
        payable(owner).transfer(b);
    }

    function safeTransferETH(address to, uint256 value) internal {
        (bool success,) = to.call{value : value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}