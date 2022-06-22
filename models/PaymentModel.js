const {query} = require("../DB/db");

class PaymentModel {

    async getPaymentDetails(userId) {
        try {
            const data = await query('SELECT * FROM payment_details WHERE id = (SELECT payment_id FROM users WHERE id = $1)', [userId]);
            return data.rows?.length ? data.rows[0] : null;
        } catch (err) {
            throw new Error(err);
        }
    };

    async createPaymentDetails(data) {
        try {
            const { card_type, card_number, expiry_date, name_on_card} = data;
            const payData = await query('INSERT INTO payment_details (card_type, card_number, expiry_date, name_on_card) VALUES ($1, $2, $3, $4) RETURNING *', [card_type, card_number, expiry_date, name_on_card]);
            return payData.rows?.length ? payData.rows[0] : null;

        } catch (err) {
            throw new Error(err);
        }
    };

    async setPaymentId(userId, paymentId) {
        try {
            const data = await query('UPDATE users SET payment_id = $1 WHERE id = $2 RETURNING *', [paymentId, userId]);
            return data.rows?.length ? data.rows[0] : null;

        } catch (err) {
            throw new Error(err);
        }
    };

    async amendPaymentDetails(userId, body) {
        try {
            for(const property in body) {
                await query(`UPDATE payment_details SET ${property} = $1 WHERE id = (SELECT payment_id FROM users WHERE id = $2)`, [body[property], userId]);
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = PaymentModel;