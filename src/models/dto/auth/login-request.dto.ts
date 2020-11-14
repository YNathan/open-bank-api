import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  name: "LoginRequestDto",
  description: "Describes what the login request body looks like",
})
export class LoginRequestDto {
  @ApiModelProperty({
    description: "The users email",
    required: true,
  })
  email: string;

  @ApiModelProperty({
    description: "the users password",
    required: true,
  })
  password: string;
}
