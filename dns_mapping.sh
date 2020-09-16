#!/bin/sh
curl -X PUT 'https://api.nsone.net/v1/zones/proudofmom.com/stage${PR_NUMBER}.proudofmom.com/CNAME' \
-H 'X-NSONE-Key: ${XNSONEKEY}' \
-H 'Content-Type: application/json' \
-H 'Cookie: __cfduid=d3fba17ce77656e5203590e843f78499c1600179264' \
-d '{
    "zone": "proudofmom.com",
    "domain": "stage${PR_NUMBER}.proudofmom.com",
    "type": "CNAME",
    "answers": [
        {
            "answer": [
                "ghs.googlehosted.com"
            ]
        }
    ]
}'