// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract ConsumerContract is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 private constant ORACLE_PAYMENT = 1 * LINK_DIVISIBILITY; // 1 * 10**18
    string public CreateInfo;
    string public DeleteInfo;
    string public priviligesInfo;

    event RequestForInfoFulfilled(
        bytes32 indexed requestId,
        string indexed response
    );

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    }

    // Create User
    function registerUser(
        address _oracle,
        string memory _jobId,
        string memory email,
        string memory password
    ) public onlyOwner {
        Chainlink.Request memory req = buildOperatorRequest(
            stringToBytes32(_jobId),
            this.fulfillRegisterUser.selector
        );

        req.add("email", email);
        req.add("password", password);
        sendOperatorRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function fulfillRegisterUser(bytes32 _requestId, string memory _info)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestForInfoFulfilled(_requestId, _info);
        CreateInfo = _info;
    }

    //Delete User
    function deleteUser(
        address _oracle,
        string memory _jobId,
        string memory email
    ) public onlyOwner {
        Chainlink.Request memory req = buildOperatorRequest(
            stringToBytes32(_jobId),
            this.fulfillDeleteUser.selector
        );

        req.add("email", email);
        sendOperatorRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function fulfillDeleteUser(bytes32 _requestId, string memory _info)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestForInfoFulfilled(_requestId, _info);
        DeleteInfo = _info;
    }

    function getPrivileges(
        address _oracle,
        string memory _jobId,
        string memory email,
        string memory university
        
    ) public onlyOwner {
        Chainlink.Request memory req = buildOperatorRequest(
            stringToBytes32(_jobId),
            this.fulfillgetPriviliges.selector
        );
        req.add("email", email);
        req.add("university", university);
        sendOperatorRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function fulfillgetPriviliges(bytes32 _requestId, string memory _info)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestForInfoFulfilled(_requestId, _info);
        priviligesInfo = _info;
    }


    function setPrivilige(
        address _oracle,
        string memory _jobId,
        string memory email,
        string memory university,
        string memory rightName,
        string memory rightValue
        
    ) public onlyOwner {
        Chainlink.Request memory req = buildOperatorRequest(
            stringToBytes32(_jobId),
            this.fulfillsetPriviliges.selector
        );
        req.add("email", email);
        req.add("university", university);
        req.add("rightName", rightName);
        req.add("rightValue", rightValue);
        sendOperatorRequestTo(_oracle, req, ORACLE_PAYMENT);
    }

    function fulfillsetPriviliges(bytes32 _requestId, string memory _info)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestForInfoFulfilled(_requestId, _info);
        priviligesInfo = _info;
    }

    /*
    ========= UTILITY FUNCTIONS ==========
    */

    function contractBalances()
        public
        view
        returns (uint256 eth, uint256 link)
    {
        eth = address(this).balance;

        LinkTokenInterface linkContract = LinkTokenInterface(
            chainlinkTokenAddress()
        );
        link = linkContract.balanceOf(address(this));
    }

    function getChainlinkToken() public view returns (address) {
        return chainlinkTokenAddress();
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer Link"
        );
    }

    function withdrawBalance() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) public onlyOwner {
        cancelChainlinkRequest(
            _requestId,
            _payment,
            _callbackFunctionId,
            _expiration
        );
    }

    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }
}