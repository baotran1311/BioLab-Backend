import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import { validate } from '~/validators/manuallyValiadate'

const createPostCategoryValidator = validate(
  checkSchema(
    {
      post_category_name: {
        notEmpty: {
          errorMessage: ErrorMessages.category.nameRequired
        },
        isString: {
          errorMessage: ErrorMessages.category.nameInvalid
        },
        trim: true
      }
    },
    ['body']
  )
)

const updatePostCategoryValidator = validate(
  checkSchema(
    {
      post_category_name: {
        optional: true,
        isString: {
          errorMessage: ErrorMessages.category.nameInvalid
        },
        trim: true
      }
    },
    ['body']
  )
)

const postCategoryExistsValidator = validate(
  checkSchema(
    {
      _id: {
        notEmpty: {
          errorMessage: ErrorMessages.category.idRequired
        },
        custom: {
          options: async (value) => {
            const category = await databaseService.categories.findOne({ _id: value })
            if (!category) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.category.notFound
              })
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)

export { createPostCategoryValidator, updatePostCategoryValidator, postCategoryExistsValidator }
