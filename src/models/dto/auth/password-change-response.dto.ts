import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  name: "PasswordChangeResponseDto",
  description:
    "Data transfer object for what is returned by changing password.",
})
export class PasswordChangeResponseDto {
  @ApiModelProperty({
    description: "user id",
  })
  public id: string;

  @ApiModelProperty({
    description: "user email",
  })
  public email: string;

  @ApiModelProperty({
    description: "Has the users password changed",
  })
  public changed: boolean;
}
