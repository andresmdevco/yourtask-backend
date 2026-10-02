import jwt from 'jsonwebtoken';

export const generateJWT = () => {
  const data = {
    name: 'Andrés',
    credit_card: '1236543247658',
    password: 'password',
  };
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '6m',
  });
  return token;
};
