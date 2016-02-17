/**
 * Created by epotignano on 25/01/16.
 */

var apiConsts  = require("../../constants/api").apiConsts;

var CommunicationApi =  {
    async sendMail(params, stream) {
        try {

            console.warn(JSON.stringify({
                fromEmail : params.fromEmail,
                fromName : params.fromName,
                schools: params.schools
            }));

           let result =  await fetch(apiConsts.apiEndpoint + 'email/new',{
               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   fromEmail : params.fromEmail,
                   fromName : params.fromName,
                   schools: params.schools
               })

           });

            stream.onNext({ data: result._bodyInit })

        }catch(error) {
            JSON.stringify(console.warn(error));
        }
    }
}

module.exports = CommunicationApi;