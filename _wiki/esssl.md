---
title: Elasticsearch SSL
layout: wiki
permalink: /esssl
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# Elasticsearch SSL

---

Moloch 0.14.1, and later, now supports connecting to Elasticsearch using SSL. So far we've only used [search-guard-ssl](https://github.com/floragunncom/search-guard-ssl) but these instructions should apply to other solutions. You should still use iptables, there is someone on your network, you just don't know it :).

**Try this on a test cluster first!**

* First, visit https://github.com/floragunncom/search-guard-ssl/wiki and find which versions of ES are supported.
* Install the required version of ES everywhere and get Moloch working with normal http
* Create the certs required
  * Simple way: Pay for a REAL single cert and submit SANs for all the nodes (and possible future nodes!)  Now you just have 1 cert to deal with. FTW!!!
  * Harder way but free: https://github.com/floragunncom/search-guard-ssl/wiki/Generate-Keystores
* Create a p12 file (you can do jks files, but keytool is insane)

```
openssl pkcs12 -export -out es.p12 -inkey key.pem -in cert.pem -passout "pass:changeit"
```

* Copy the p12 (or jks) file into the same directory as elasticsearch.yml on ALL the elasticsearch boxes
* Install the seaerch-guard-ssl plugin

```
bin/plugin install com.floragunn/search-guard-ssl/<version>
```

* Add the following to your elasticsearch.yml (See https://github.com/floragunncom/search-guard-ssl/blob/master/searchguard-ssl-config-template.yml for more info)

```
# NODE2NODE

searchguard.ssl.transport.enabled: true
searchguard.ssl.transport.keystore_type: PKCS12
searchguard.ssl.transport.keystore_filepath: es.p12
searchguard.ssl.transport.keystore_password: changeit

searchguard.ssl.transport.truststore_type: PKCS12
searchguard.ssl.transport.truststore_filepath: es.p12
searchguard.ssl.transport.truststore_password: changeit
searchguard.ssl.transport.enforce_hostname_verification: true
searchguard.ssl.transport.resolve_hostname: true

# HTTP

searchguard.ssl.http.enabled: true
searchguard.ssl.http.keystore_type: PKCS12
searchguard.ssl.http.keystore_filepath: es.p12
searchguard.ssl.http.keystore_password: changeit
#searchguard.ssl.http.clientauth_mode: REQUIRE
searchguard.ssl.http.truststore_type: PKCS12
searchguard.ssl.http.truststore_filepath: es.p12
searchguard.ssl.http.truststore_password: changeit
```

* Restart elasticsearch
* Change your Moloch config.ini files for everything to use https


```
elasticsearch = https://HOST:PORT
```

* Restart the Moloch viewer and the Moloch capture everywhere
* $$$ Profit $$$

---

##### Notes:
* When using curl you may need to add the ```--tlsv1.1``` option
* On any host where db.pl runs you'll need to install the ```perl-Crypt-SSLeay``` package
* Currently Moloch doesn't support client auth. **You should still use iptables!**

</div>
