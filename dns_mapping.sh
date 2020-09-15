#!/bin/sh
curl -X PUT -H "X-NSONE-Key: $XNSONEKEY" -d '{"zone":"proudofmom.com", "domain":"stage$PR_NUMBER.proudofmom.com", "type":"CNAME", "answers":[{"answer":["ghs.googlehosted.com"]}]}' https://api.nsone.net/v1/zones/proudofmom.com/stage$PR_NUMBER.proudofmom.com/CNAME
