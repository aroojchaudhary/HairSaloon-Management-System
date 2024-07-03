import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserSignUpValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string([
      rules.alpha({
        allow: ['space']
      }),
      rules.required()
    ]),
    email: schema.string([
      rules.unique({ table: 'users', column: 'email' }),
      rules.required()
    ]),
    password: schema.string([
      rules.minLength(8),
      rules.maxLength(20),
      rules.required()
    ]),
    face_shape: schema.string.optional({}, [
      rules.alpha()
    ]),
    specialization: schema.string.optional({},[
      rules.alpha({
        allow: ['space']
      }),
    ]),
    role: schema.string.optional({}, [
      rules.alpha()
    ]),
  })
  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'name.alpha': 'The name should contain only characters and spaces',
    'name.required': 'Name field can not be empty',
    'email.unique': 'This email is already exists',
    'email.required': 'Email field can not be empty',
    'password.minLength': 'Password must contain atleast eight characters',
    'password.maxLength': 'Password can contain atmost twenty characters',
    'password.required': 'Password field can not be empty',
    'face_shape.alpha': 'The face_shape should contain only characters',
    'specialization.alpha': 'The specialization should contain only characters and spaces',
    'role.alpha': 'The role should contain only characters',
  }
}