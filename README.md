# unshortener
A serverless API based on CloudFlare Worker for unshorten links

## How to use?
* Go to CloudFlare dashboard
* Open workers page
* Create a new worker
* Use code from [blob/main/worker.js](https://github.com/vlfz/cloudflare-worker-unshortener/blob/main/worker.js)
* Set API token (`const main_token = "API_TOKEN";`)
* Save and deploy

![img](https://i.imgur.com/PhZLRyA.png)
