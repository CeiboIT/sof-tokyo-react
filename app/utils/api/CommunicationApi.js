/**
 * Created by epotignano on 25/01/16.
 */

var apiConsts  = require("../../constants/api").apiConsts;

var CommunicationApi =  {
    async sendMail(params, stream) {
        try {
           let result =  await fetch(apiConsts.apiEndpoint + 'email/new',{
               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   fromEmail : params.fromEmail,
                   fromName : params.fromName,
                   to : apiConsts.ownerEmail,
                   content: params.content,
                   subject: params.subject
               })

           })
            stream.onNext({ data: result._bodyInit })

        }catch(error) {
            console.warn(error);
        }
    }
}

module.exports = CommunicationApi;