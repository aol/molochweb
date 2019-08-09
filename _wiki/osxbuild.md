---
title: OSX Build
layout: wiki
permalink: "/osxbuild"
---

<div class="full-height-and-width-container with-footer p-3" markdown="1">

# OSX Build Instructions

---

## Brew dependency fulfillment
```
brew install yara
brew install libmagic
brew install elasticsearch
brew install homebrew/dupes/libpcap
brew install libnet
brew install libnids
brew install libffi
brew install ossp-uuid
brew install libgeoip
brew install libpng
brew install homebrew/versions/node010
```


## Need to work up an easybutton modification to simplify the build, but the following worked for me.
`./configure --with-libpcap=/usr/local/opt/libpcap/ --with-libnids=/usr/local --with-yara=/usr/local --with-GeoIP=/usr/local --with-glib2=no GLIB2_CFLAGS="-I/usr/local/opt/glib/include/glib-2.0 -I/usr/local/opt/glib/lib/glib-2.0/include/" GLIB2_LIBS="-L/usr/local/opt/glib/lib -lglib-2.0 -lgmodule-2.0 -lgobject-2.0 -lgio-2.0 -lgthread-2.0 -L/usr/local/lib" LDFLAGS="-L/usr/local/lib"`


### If you need to uninstall nodejs, and have problems with the back version install, refer to:
`https://gist.github.com/kugaevsky/68a7fa894551da9c310a`


### This is required to use db.pl script

```
cpan
- install JSON
```


</div>
