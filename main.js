const request = require('request');

const [, , cs, hti] = process.argv;

console.log(cs)
console.log(hti)

const channelSecret = cs;

const hotShotItem = JSON.parse(hti) || {
    product: 'Honor Watch Magic czarny',
    oldPrice: '699,00 zł',
    price: '399,00 zł',
    image: 'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2019/4/pr_2019_4_29_12_29_11_213_05.jpg',
    offerUrl: 'https://www.x-kom.pl/goracy_strzal/19526'
};

const { product, price, oldPrice, image, offerUrl } = hotShotItem

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