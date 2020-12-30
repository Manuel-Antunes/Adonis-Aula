import { Secret, SignOptions } from 'jsonwebtoken'

interface JwtConfig {
  secret: Secret
  options: SignOptions
}

const jwtConfig: JwtConfig = {
  secret: 'd965975e8ecc71252e88e7bce6419e5a',
  options: { expiresIn: '7d' },
}

export default jwtConfig
