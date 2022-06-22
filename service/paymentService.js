

const PaymentModel = require('../models/PaymentModel');

const PaymentModelInstance = new PaymentModel;

class PaymentService {
     
    async getPaymentDetails(user_id) {
        try {
            const data = await PaymentModelInstance.getPaymentDetails(user_id);
            return data;
        } catch (err) {
            throw(err);
        }
    };

    async createPaymentDetails(user_id, data) {
        try {
            const payData = await PaymentModelInstance.createPaymentDetails(data);
            await PaymentModelInstance.setPaymentId(user_id, payData.id);
            return payData;
        } catch (err) {
            throw(err);
        }
    };

    async amendPaymentDetails(user_id, body) {
        try {
            await PaymentModelInstance.amendPaymentDetails(user_id, body);
            const data = await PaymentModelInstance.getPaymentDetails(user_id);
            return data;
            
        } catch (err) {
            throw(err);
        }
    }
}

module.exports = PaymentService;