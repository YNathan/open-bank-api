import { ApiModel, ApiModelProperty, IApiModelArgs } from "swagger-express-ts";

@ApiModel({
  description: "Data Transfer Object representing the user",
  name: "Userdto",
})
export class UserDto {
  @ApiModelProperty({
    description: "name of the user",
    required: true,
  })
  name: string;

  @ApiModelProperty({
    description: "user email",
    required: true,
  })
  email: string;

  @ApiModelProperty({
    description: "user password",
    required: false,
  })
  password?: string;

  @ApiModelProperty({
    description: "ID of the user - Appointed by the Database",
  })
  id: string;
}
