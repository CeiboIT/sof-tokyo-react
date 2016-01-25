/**
 * Created by epotignano on 25/01/16.
 */

var apiConsts  = require("../../constants/api").apiConsts;

var CommunicationApi =  {
    async sendMail(params, subject) {
        try {
           let result =  await fetch(apiConsts.apiEndpoint + 'email/new',{
               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   fromEmail : params.userEmail,
                   fromName : params.userName,
                   to : apiConsts.ownerEmail,
                   subject : "Request a fashion book of" + school.value,
                   content : "I want to require a book from the school"
               })

           })

            return result._bodyInit;

        }catch(error) {
            console.warn(error);
        }
    }
}

module.exports = CommunicationApi;