// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract ExpiringDictionary {
    struct EntryInfo{
        address owner;
        uint validUntilTime;
        string data;
        uint etype;
    }
    EntryInfo empty;
    mapping(string => EntryInfo) entries;
    mapping(uint => uint) typesToTTL;
    
    constructor () {
        typesToTTL[0] = 300;
        typesToTTL[1] = 31556952;
    }

    function put(string calldata key, string calldata value, uint etype) public {
        EntryInfo memory entryInfo = entries[key];
        if(entryInfo.owner != address(0)) {
            require(entryInfo.validUntilTime < block.timestamp, "This key still in use");
        }
        entries[key] = EntryInfo({
            owner: msg.sender,
            etype: etype,
            validUntilTime: block.timestamp + typesToTTL[etype],
            data: value
        });
    }

    function get(string calldata key) public view returns (EntryInfo memory) {
        EntryInfo memory entryInfo = entries[key];
        if(entryInfo.validUntilTime <= block.timestamp) {
            return empty;
        }
        return entryInfo;
    }

    //ToDo: add events;
}
