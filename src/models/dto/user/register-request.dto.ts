import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Registration request body",
  name: "RegisterRequestDto",
})
export class RegisterRequestDto {
  @ApiModelProperty({
    description: "desired username",
    required: true,
  })
  name: string;

  @ApiModelProperty({
    description: "desired email",
    required: true,
  })
  email: string;

  @ApiModelProperty({
    description: "desired password",
    required: true,
  })
  password: string;
}
