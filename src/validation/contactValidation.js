import zod from "zod"

export const  contactValidationSchema = zod.object({
  name: zod.string({required_error:"name is required !"}).min(3,{message:"name must be of atleast 3 characters"}),
  email: zod.string({required_error:"email is required!"}).email({message:"invalid email"}),
  message: zod.string({required_error:"message is required!"}).min(10,{message:"message must be of atleast 10 characters"}),
})
