import { checkUserWithUsernameExists } from './auth.service'

export const getNewUniqueUsername = async (name: string) => {
  name = name.split(' ').join('').replace(/\//g, '-') // remove space and replace '/' with '-'

  let userFound = await checkUserWithUsernameExists(name)

  while (userFound) {
    let randomThreeDigitNumber = Math.floor(Math.random() * 900) + 100
    name = name + randomThreeDigitNumber
    userFound = await checkUserWithUsernameExists(name + randomThreeDigitNumber)
  }

  return name
}
