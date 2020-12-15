---
title: "Certificate Pinning Case Study"
author: "Radhakrishnan Asokan"
---

A case study on certificate pinning

<!--truncate-->

### Introduction to Certificate Pinning

Certificate pinning is a concept of allowing only the particular domains whose certificates are pinned within the client app instead of allowing all trusted certificates, Certificate Pinning is mainly used to reduce MITM(Man in the Middle) attacks

#### Advantages of Certificate Pinning
* Certificate Pinning protects data tampering even if user installs a malicious CA with/without knowing
* If trusted certificate authority gets compromised due to a security [vulnerability](https://en.wikipedia.org/wiki/Certificate_authority#CA_compromise)

#### Web Certificate Pinning
Web certificate pinning is a dynamic pinning, It was [introduced](https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning) in 2015, Soon after in 2018 it was deprecated, Mainly due to it created new set of vulnerabilities than resolving the actual [problem](https://scotthelme.co.uk/using-security-features-to-do-bad-things/).

#### Mobile Certificate Pinning
Mobile certificate pinning is a static pinning, In which public certificate will be bundled within the app during release and expected to deploy a new app release on certificate expiry.


### Problem associated with Certificate Pinning
Security reachers had [warned](https://scotthelme.co.uk/im-giving-up-on-hpkp/) risk on using HTTP Certificate Pinning

* If the key was accidentally deleted / stolen / hacked, We will face serious application down time [issues](https://www.smashingmagazine.com/be-afraid-of-public-key-pinning/).
* Domain hijacking for Ransom - Hacker may mishandle the certificate.

### What's next ?
[Certificate Transparency(CT)](http://www.certificate-transparency.org/what-is-ct) was introduced in 2018 after deprecation of Web Certificate Pinning, CT is an open source framework for monitoring and auditing certificates,

This standard creates a public logger which records all the issued certificates by the trusted CA, We can monitor these logger to detect mistakenly issued certificates, detect compromised CA and CA dishonesty.

CT in [OpenSSL](http://www.certificate-transparency.org/certificate-transparency-in-openssl), whenever connection is initiated, SSL certificates's timestamp will be used to fetch the certificate from the CT log and compared to establish the connection.


### Conclusion
Though CT is different from certificate pinning, It will effectively replace the certificate pinning without compromising the quality of service.

we are always open to adapt latest technology trends. If there is anything in your mind that WaveMaker should have, do let us know [here](mailto:info@wavemaker.com).

