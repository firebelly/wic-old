const CallfireClient = require('callfire-api-client-js');
const client = new CallfireClient('b91c7dc2fbce', 'b72d00393cc70f53');

let callfireRun = function() {

    console.log(client);

    client.ready(() => {
        // client.webhooks.deleteWebhook( {id: '31222003'} )

        client.webhooks.findWebhooks({
          // // filter by webhook name
          // name: 'my webhook',
          // // filter by resource
          // resource: 'TextBroadcast',
          // // filter by event
          // event: 'Started',
          // // filter by callback URI
          // callback: 'https://myservice/callback',
          // // filter by enabled flag
          // enabled: true,
          // // search offset
          // offset: 0,
          // return 10 items per request
          limit: 10,
          // return only specific fields
          // fields: 'items(id,name,callback)'
        })
          .then((response) => {
    		  console.log('webhooks left');
    		  console.log(response.obj);
          })
    })



    // 	console.log('is the client ready!');
    //     client.webhooks.createWebhook({
    //       body: {
    //         name: 'inbound sms webhook refactor',
    //         resource: 'InboundText',
    //         events: ['Finished'],
    //         callback: 'http://0ba6dc5a.ngrok.io/makeText'
    //       }
    //     })
    //       .then((response) => {
    // 		  console.log('webhook created...');
    // 		  console.log(response.obj);
    //       })
    //   }
    // );


}


module.exports = callfireRun
