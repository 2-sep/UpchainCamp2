## 1.合约部署


## 2.问题
1.是什么决定账户去调用代币合约
withdrawA
```
function withdrawA(uint amount) public {
    IERC20 token = IERC20(tokenAddress);
    balances[msg.sender] -= amount;
    token.transfer(msg.sender, amount);
}
```
账户A与withdrawA交互，是合约账户调用代币合约的transfer方法完成转账

withdrawB
```
function withdrawB(uint amount) public {
    IERC20 token = IERC20(tokenAddress);
    balances[msg.sender] -= amount;
    token.approve(address(this), amount);
    token.transferFrom(address(this), msg.sender, amount);
}
```
账户A与withdrawB交互，是账户A调用代币合约的approve方法，进行授权

2.opensea显示不了我在pinata上传的图片，我将json文件中的链接换成别人的图片，可以显示。换成我的图片链接，只有其他属性，不显示图片