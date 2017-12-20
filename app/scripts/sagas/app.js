import { watchOnLogin, watchOnLogout } from './login'
import { watchOnSignup } from './signup'
import { watchValidateNumber } from './dashboard'

export default function* app() {
  yield [
    watchOnLogin(),
    watchOnLogout(),
    watchOnSignup(),
    watchValidateNumber(),
  ]
}
