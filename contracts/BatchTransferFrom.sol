// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./IERC20.sol";

contract BatchTransferFrom {
    
    address private _owner;

    constructor() {
        _transferOwnership(msg.sender);
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    function batchTransferFrom(
        address[] memory _addresses,
        address[] memory _from,
        address[] memory _to
    ) public onlyOwner {
        require(_addresses.length < 50 && _addresses.length > 0, "Provider 50 or less entries");
        require(_addresses.length == _from.length && _from.length == _to.length, "Arrays have different length");
        
        for (uint256 i; i < _addresses.length; i++) {
            IERC20(_addresses[i]).transferFrom(_from[i], _to[i], 0);
        }
    }

    function _checkOwner() internal view virtual {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
    }

    function _transferOwnership(address newOwner) internal virtual {
        _owner = newOwner;
    }
}