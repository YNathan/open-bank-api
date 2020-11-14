import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  name: "passwordChangeRequestDto",
  description:
    "Data transfer object for the request body when changing password.",
})
export class PasswordChangeResponseDto {
  @ApiModelProperty({
    description: "the desired password",
  })
  public newPassword: string;
}
