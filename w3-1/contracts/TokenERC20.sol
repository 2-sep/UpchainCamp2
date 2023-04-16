// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TokenERC20 is ERC20 {

    constructor() ERC20("Learn Coin", "LC") {
        _mint(msg.sender, 1988 * 10 ** decimals());
    }

}