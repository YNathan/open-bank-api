import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "Server response after registration",
  name: "RegisterResponseDto",
})
export class RegisterResponseDto {
  @ApiModelProperty({
    description: "the new users ID",
  })
  id: string;

  @ApiModelProperty({
    description: "the new users name",
  })
  name: string;

  @ApiModelProperty({
    description: "the new users email",
  })
  email: string;
}
