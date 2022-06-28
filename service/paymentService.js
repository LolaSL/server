

const PaymentModel = require('../models/PaymentModel');

const PaymentModelInstance = new PaymentModel;

class PaymentService {
     
    async getPaymentDetails(userId) {
        try {
            const data = await PaymentModelInstance.getPaymentDetails(userId);
            return data;
        } catch (err) {
            throw(err);
        }
    };

    async createPaymentDetails(userId, data) {
        try {
            const payData = await PaymentModelInstance.createPaymentDetails(data);
            await PaymentModelInstance.setPaymentId(userId, payData.id);
            return payData;
        } catch (err) {
            throw(err);
        }
    };

    async amendPaymentDetails(userId, body) {
        try {
            await PaymentModelInstance.amendPaymentDetails(userId, body);
            const data = await PaymentModelInstance.getPaymentDetails(userId);
            return data;
            
        } catch (err) {
            throw(err);
        }
    }
}

module.exports = PaymentService;