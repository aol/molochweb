---
title: Security
layout: wiki
permalink: "/security"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Reporting Security Bugs

The Moloch project takes security very seriously, but any complex software project is going to have some vulnerabilities.
Please submit any security issues to our HackerOne project (coming soon) or moloch.security@verizonmedia.com, please use [github issues](https://github.com/aol/moloch/issues) or slack for non security issues.


## Scope
Examples of items in scope

* Stored XSS
* Buffer overflow
* UI/API permission checking
* Bypassing forced expressions (excluding when a sessionId is known)

## Out of Scope
Examples of items that are out of scope and maybe should be submitted to our [github issues](https://github.com/aol/moloch/issues) page

* Crash on startup from bad config settings
* Accessing a session using the Moloch sessionId
* Viewing the results of another user's hunt
* Admins configuring bad/dangerous URLs in notifiers or clusters in parliament
* Using md5 for security indicators
* Auth brute force or http-digest weeknesses

# Known Security Issues
Security Issues that are known and are either not fixable or a known limitation of Moloch.

* IP TTL Expiry Attacks - An attacker can manipulate IP TTLs so that Moloch will see packets that the end host will not see.  The only "fix" is to add TTL normalization at the network border.  Future versions of Moloch may try and detect this attack.
* Not all Tunnel protocols are supported by Moloch


# Past Security Issues

{:class="table table-bordered"}
| Vulnerability | Date | First | Last |
| ------------- |-------------| ----- | ----- |
| API doesn't enforce permissions for all end points | 2019/11/19 | 1.0.0 | 2.0.1 |
| rXSS for many UI endpoints on errors | 2019/11/19 | 0.0.0  | 2.0.1 |
| sXSS | 2019/11/19 | 1.5.0 | 2.0.1 |
| Long config vars cause capture array out of bounds| 2019/11/19 | 0.0.0  | 2.0.1 |
| Capture Hash Table DOS | 2019/11/19 | 0.0.0 | 2.0.1 |
| Capture Socks/SSH parser OOB reads | 2019/11/19 |  0.9.0  | 2.0.1 |
| Several APIS vulnerable to CSRF | 2019/11/19 | 1.0.0  | 2.0.1 |
| Notifier token exposure using API to non admins| 2019/11/19 | 1.7.0 | 2.0.1 |
| Packet Hunt detail exposure using API to non admins| 2019/11/19 | 1.6.0 | 2.0.1 |
| Oracle Padding Attacks | 2019/11/19 | 0.6.0 | 2.0.1 |
| rXSS | 2019/01/17 | 1.0.0  | 1.6.2 |



</div>
