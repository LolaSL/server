
const {  pool } = require('../DB/db');

const isValidTokenDb = async ({ token, email, currentDate }) => {
  const { rows } = await pool.query(
    `
      SELECT EXISTS(SELECT * FROM from public."resetTokens"
      WHERE token = $1 AND email = $2 AND expiration > $3 AND used = $4)
    `,
    [token, email, currentDate, false]
  );
  return rows[0].exists;
};

const createResetTokenDb = async ({ email, expireDate, fpSalt }) => {
  await pool.query(
    "INSERT INTO public.\"resetTokens\"  (email, token, expiration ) VALUES ($1, $2, $3)",
    [ email, expireDate, fpSalt]
  );

  return true;
};

const setTokenStatusDb = async (email) => {
  await pool.query(
    "UPDATE public.\"resetTokens\" SET used = $1 where email = $2",
    [true, email]
  );

  return true;
};

const deleteResetTokenDb = async (currentDate) => {
  await pool.query("DELETE public.\"resetTokens\" WHERE expiration <= $1", [
    currentDate,
  ]);
  return true;
};

module.exports = {
  isValidTokenDb,
  createResetTokenDb,
  setTokenStatusDb,
  deleteResetTokenDb,
};
