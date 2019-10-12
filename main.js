const request = require('request');

const [, , cs, product, price, oldPrice, image, offerUrl ] = process.argv;

console.log(cs)
console.log(hti)

const channelSecret = cs;

request.post({
    url: 'https://hooks.slack.com/services/' + channelSecret,
    headers: {
        'Content-type': 'application/json',
    },
    body: {
        text: product,
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*${product}*`
                }
            },
            {
                "type": "image",
                "image_url": image,
                "alt_text": product
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `~${oldPrice}~ ${price}`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Poka"
                    },
                    url: offerUrl
                }
            },
            {
                "type": "divider"
            }
        ]
    },
    json: true
}, (err, resp, body) => {
    console.log(err);
    console.log(body, resp.statusCode);
});